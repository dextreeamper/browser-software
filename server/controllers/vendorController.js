import db from '../models';
import remove from 'rimraf';
import crypto from 'crypto';

import { validatingDataSignupVendor } from '../libs/validation';
import { createJWToken, refreshTokens } from '../libs/auth';
import { croppingImage, sendEmailThroughSendgrid } from '../libs/tools';
import { uploadAvatar } from '../libs/uploadFile';

const vendorController = {};

const unableToProcessMsg = 'We are unable to process your request at this time. Please try again later.';

// for adding vendor api.
vendorController.register = (req, res) => {
    const { 
        firstName, 
        lastName, 
        email, 
        password, 
        phoneNumber, 
        company,
        socialMedia,
        websiteURL,
        selectLocation,  
        accountID,
        listingSubscription,
        terms
    } = req.body;
 
    // validate our data ursing the validateSignupForVendor
    let { errors, isValid } = validatingDataSignupVendor(req.body);

    if(isValid){

        const vendorDoc = new db.Vendor({
            vendorDetails: {
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                company
            },
            otherDetails: {
                socialMedia,
                website: websiteURL,
                location: selectLocation,
                terms,
                listingSubscription
            },
            _accountPlan_id: accountID
        });

        // we now verify the data and save the new resource.
        vendorDoc.save()
                .then((vendor) => {
                    // if successful saved the vendor - we will create a token document.
                    const token = new db.Token({
                        _vendorId: vendor._id,
                        token: crypto.randomBytes(16).toString('hex') 
                    });

                    // we will save it to the token collection.
                    token
                        .save()
                        .then((token) => {
                            // config for sendgrid email request 
                            const fromEmail = 'test@example.com';
                            const toEmail = vendor.vendorDetails.email;
                            const subject = 'Account Verification Token';
                            const content = 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/vendor/verifyToken\/' + token.token + '.\n';

                            // we will send the email through send grid. give the email information.
                            sendEmailThroughSendgrid({
                                from: fromEmail,
                                to: toEmail,
                                subject,
                                content
                            })
                            .then(() => {
                                res.status(200).send({
                                    success: true,
                                    message: 'A verification email has been sent to ' + vendor.vendorDetails.email + '.',
                                    vendor: {
                                        firstName: vendor.vendorDetails.firstName,
                                        lastName: vendor.vendorDetails.lastName,
                                        email: vendor.vendorDetails.email,
                                        vendorId: vendor._id,
                                        phoneNumber: vendor.vendorDetails.phoneNumber,
                                        company: vendor.vendorDetails.company,
                                        otherDetails: vendor.otherDetails,
                                        avatar: vendor.vendorDetails.avatar.URL,
                                        isVerified: vendor.isVerified,
                                        emailToken: token.token
                                    },
                                    refreshToken: refreshTokens.creatingToken(vendor._id.toString()), // the vendorId is an ObjectId type, convert it to string. // the value of is the refresh token/ this key is used for searchinf if the key is on the object.
                                    token: createJWToken({
                                        sessionData: {
                                            vendorId: vendor._id
                                        },
                                        maxAge: 300 // its recommended that the access token has a short lifetime.
                                    })
                                });
                            })
                            .catch(() => {
                                // if the sendgrid will response an error, we should delete the saved docs - vendor & token.
                                vendor.remove((error) => {
                                    if(error) return res.status(500).send({ type:'vendor-delete', errMsg: unableToProcessMsg });
                                });
                                token.remove((error) => {
                                    if(error) return res.status(500).send({ type:'token-delete', errMsg: unableToProcessMsg });
                                });
                                // sendggrid error
                                res.status(500).send({ type:'sendgrid-send', errMsg: unableToProcessMsg });
                            });
                        })
                        .catch(() => { // if there is an error on saving the token.
                            res.status(500).send({ type:'token-delete', errMsg: unableToProcessMsg });
                        });
                        
                })
                .catch(() => {
                    res.status(400)
                        .send({
                            errMsg: 'The email is already used.'
                        });
                });        
    }
    // if the data are not valid.
    else{
        //sending a status 400 bad request!
        res.status(400)
            .send({
                errMsg: errors
            });
    }

};


// send email verification when successfull sign-up.
vendorController.verifyEmailToken = (req, res) => {
    // get the token on param which is included on the request string.
    const { token } = req.query;

    // retrieve a token doc based on the passed token.
    db.Token.findOne(
        {
            token
        }
    ).then((token) => {
        if(!token){
            return res.status(400).send({
                type: 'not-verified',
                errMsg: 'We were unable to find a valid token. Your token my have expired.'
            });
        }

        // if we found a token, find a matching vendor.
      db.Vendor.findOneAndUpdate(
            {
                _id: token._vendorId
            },
            {
                $set: {
                    isVerified: true
                }
            }
        ).then((vendor) => {
            // if there is no found vendor
            if(!vendor) return res.status(400).send({ errMsg: 'We were unable to find a vendor for this token.' });
            // if vendor is already been verifiend
            if(vendor.isVerified) return res.status(400).send({type: 'already-verified', errMsg: 'The vendor is already been verified.' });
            // if there is a found vendor and not yet verified.
            res.status(200)
                .send({
                    success: true,
                    message: 'The account has been verified',
                    isVerified: true
                });

        }).catch((error) => {
            res.status(500)
                .send({
                    errMsg: error.message
                });
        });
    }).catch((error) => {
        res.status(500)
            .send({
                errMsg: error.message
            });
    });
};

// resend token 
vendorController.resendToken = (req, res) => {
    // retrieve a vendor based on the jwt token. check if the user is exist.
    db.Vendor.findOne({
        _id: req.user.vendorId
    }).then((vendor) => {
        // check first if there is a vendor.
        if(!vendor){
            return res.status(400).send({errMsg: unableToProcessMsg});
        }
        // get the vendor email.
        const email = vendor.vendorDetails.email;
        // create a newly token associated for this account.
        const token = new db.Token({
            _vendorId: vendor._id,
            token: crypto.randomBytes(16).toString('hex')
        });

        token
            .save()
            .then((token) => {
                // config for sendgrid email request
                const fromEmail = 'test@example.com';
                const toEmail = email;
                const subject = 'Resend Account Verification Token';
                const content = 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/vendor/verifyToken\/' + token.token + '.\n';

                // we will send the email through send grid. give the email information.
                sendEmailThroughSendgrid({
                    from: fromEmail,
                    to: toEmail,
                    subject,
                    content
                }).then(() => {
                    res.status(200)
                        .send({
                            success: true,
                            message: 'A verification email has been sent to ' + email + '.',
                            token: token.token
                        });
                }).catch(() => {
                    // if the sendgrid will response an error, we should delete the saved token - token.
                    token.remove((error) => {
                        if(error) return res.status(500).send({ type:'token-delete', errMsg: unableToProcessMsg });
                    });
                    // sendggrid error
                    res.status(500).send({ type:'sendgrid-send', errMsg: unableToProcessMsg });
                });
            })
            .catch(() => { // if there is an error on saving the token.
                res.status(500).send({ type:'token-delete', errMsg: unableToProcessMsg });
            });


    }).catch(() => {
        res.status(500)
            .send({
                errMsg: unableToProcessMsg
            });
    });
};

/*
 create an email update API
 */
vendorController.updateEmail = (req, res) => {
    const { email } = req.body;

    /* check if the given i.d and the email is associated to the requested vendor.
     * the email sent by the vendor is equal to its current account.
     * don't run the email validator.
     * this solution is suitable when the vendor is trying to update its email which is the same on its current email.
     */
    db.Vendor.findOneAndUpdate(
        {
            _id: req.user.vendorId,
            'vendorDetails.email': email
        },
        {
            $set: {
                'vendorDetails.email': email
            }
        }
    )
        .then((updateVendor) => {
            if(updateVendor){
                res.status(200)
                    .send({
                        success: true,
                        message: 'The email is successfully updated'
                    });
            }else{
                // run the validation when the requested email is not the same on his current email.
                db.Vendor.findOneAndUpdate(
                    {
                        _id: req.user.vendorId
                    },
                    {
                        $set: {
                            'vendorDetails.email': email
                        }
                    },
                    {
                        runValidators: true
                    }
                )
                    .then((updateVendor) => {
                        // if successfull
                        if(updateVendor){
                            res.status(200)
                                .send({
                                    success: true,
                                    message: 'The email is successfully updated'
                                });
                        }
                    })
                    .catch((error) => {
                        // if the email is already used. because we want to run the validation in here.
                        res.status(400)
                            .send({
                                errMsg: error.errors['vendorDetails.email'].message
                            });
                    });
            }
        })
        // internal server error.
        .catch(() => {
            res.status(500)
                .send({
                    errMsg: unableToProcessMsg
                });
        });
};

/*
 * create an update password api.
 */
vendorController.updatePassword = (req, res) => {
    // get the keys
    const { oldPassword, newPassword } = req.body;

    db.Vendor
        .findById(req.user.vendorId) // we need to check first if there is a document been retrieve based on the id.
        // check if the pass password is equal to the vendor current password.
        // the second param is the resolve object that will pass on the next then function.
        .then(retrievedVendor => retrievedVendor.comparePassword(oldPassword, retrievedVendor))
        .then(vendor => {
            // once the pass password is correct or equal to the retrieved vendor, we will modify the current password into new one.
            vendor.vendorDetails.password = newPassword;
            // then we want to update the newly value of password.
            // dont run the validation when updating a password because we dont need to check the email.
            vendor.save({ validateBeforeSave: false }, (err, updatedVendor) => {
                if (err){
                    // we need to return this statement so that the rest statement will not execute.
                    return res.status(500)
                        .send({
                            message: err
                        });
                }
                res.status(200)
                    .send({
                        success: true,
                        message: 'The password is successfully updated.',
                        doc: updatedVendor
                    });
            });
        })
        .catch(() => {
            res.status(401)
                .send({
                    errMsg: 'The password is incorrect.'
                });
        });
};

// updating the vendor update profile information.
vendorController.updateProfile = (req, res) => {
    const {
        firstName,
        lastName,
        phoneNumber,
        company,
        socialMedia,
        websiteURL,
        selectLocation,
    } = req.body;

    const { facebookLink, googleLink, linkedinLink, youtubeLink, twitterLink } = socialMedia;

    // validate our data ursing the validateSignupForVendor
    let { errors, isValid } = validatingDataSignupVendor({...req.body, terms: true});

    if(isValid){
        // updating the information
        db.Vendor.findOneAndUpdate(
            {
                _id: req.user.vendorId
            },
            {
                $set: {
                    'vendorDetails.firstName': firstName,
                    'vendorDetails.lastName': lastName,
                    'vendorDetails.phoneNumber': phoneNumber,
                    'vendorDetails.company': company,
                    'otherDetails.socialMedia': {
                        facebookLink,
                        googleLink,
                        linkedinLink,
                        youtubeLink,
                        twitterLink
                    },
                    'otherDetails.website': websiteURL,
                    'otherDetails.location': selectLocation
                }
            },
            { new: true }
        )
        .then((vendor) => {
            if(!vendor){
                res.status(400)
                    .send({
                        errMsg: 'The vendor I.D is not valid!'
                    });
            }

            // send a successfull response.
            res.status(200)
                .send({
                    success: true,
                    message: 'The vendor is successfully updated.',
                    vendor
                });
        });
    }else{
        //sending a status 400 bad request!
        res.status(400)
            .send({
                errMsg: errors
            });
    }
};


vendorController.uploadAvatar = (req, res) => {
    // setting the information that will be used on cropping an image.
    const parseCropData = JSON.parse(req.body.cropData); // we will use this for cropping
    const avatarDest = './server/public/uploads/vendors'; // the avatar Destination
    const tempImagePath = `${req.file.destination}/${req.file.filename}`; // temporary image path

    // get the newly cropped avatar.
    const { imageName, imagePath } = croppingImage(req.file, tempImagePath, parseCropData, avatarDest, () => {
        // we will delete the temporary image.
        remove(tempImagePath, () => console.log(''));
    });

    // URL for the avatar.
    const avatarURL = '/' + 'uploads/vendors' + '/' + imageName;

    // because of the token that we are using, technically once the vendor consume this api,
    // theres no need to check if the given i.d is exist because , the given token is valid.
    db.Vendor
        .findOneAndUpdate(
        {
            _id: req.params.vendorId
        },
        {
            $set: {
                'vendorDetails.avatar': {
                    URL: avatarURL,
                    path: imagePath
                }
            }
        }
        )
        .then((existingVendor) => {
            if(!existingVendor){
                res.status(400)
                    .send({
                        errMsg: 'The vendor I.D is not valid!'
                    });
            }

            // remove the existing avatar which is associated on this vendor, check first
            // if the vendor has an avatar.
            if(existingVendor.vendorDetails.avatar.path){
                remove(existingVendor.vendorDetails.avatar.path, () => console.log(''));
            }

            res.status(200)
                .send({
                    success: true,
                    message: 'The vendor is successfully updated.',
                    avatarURL
                });
        })
        .catch(() => {
            // if there is an server error.
            remove(imagePath, () => console.log(''));
            res.status(500)
                .send({
                    errMsg: unableToProcessMsg
                });
        });
};

// creating the route middeware for login..
vendorController.login = (req, res) => {
    // get the params on the query object.
    const { email, password } = req.query;
    db.Vendor.findByEmail(email)
                .then((vendor) => vendor.comparePassword(password, {
                    firstName: vendor.vendorDetails.firstName,
                    lastName: vendor.vendorDetails.lastName,
                    email: vendor.vendorDetails.email,
                    vendorId: vendor._id,
                    phoneNumber: vendor.vendorDetails.phoneNumber,
                    company: vendor.vendorDetails.company,
                    otherDetails: vendor.otherDetails,
                    avatar: vendor.vendorDetails.avatar.URL,
                    isVerified: vendor.isVerified
                })) 
                .then((vendor)  => {
                    // if the vendor is already been verified, we dont need to retrieve the token
                    if(vendor.isVerified){
                        return res.status(200)
                           .send({
                               success: true,
                               message: 'You have successfully logged in.',
                               vendor: vendor,
                               token: createJWToken({
                                   sessionData: {
                                       vendorId: vendor.vendorId
                                   },
                                   maxAge: 300
                               }),
                               refreshToken: refreshTokens.creatingToken(vendor.vendorId.toString()) // the vendorId is an ObjectId type, convert it to string. // the value of is the refresh token/ this key is used for searchinf if the key is on the object.
                           });
                    }
                    // if the vendor is not yer verified, we need to fetch the email token.
                    // retrive the token associated on this account.
                    db.Token.findOne({
                        _vendorId: vendor.vendorId
                    }
                    ).then((token) => {
                        if(!token){return res.status(400).send({type: 'no-token', errMsg: 'We were unable to find a vendor for this token.'});}

                        res.status(200)
                            .send({
                                success: true,
                                message: 'You have successfully logged in.',
                                vendor: {
                                    ...vendor,
                                    emailToken: token.token
                                },
                                token: createJWToken({
                                    sessionData: {
                                        vendorId: vendor.vendorId
                                    },
                                    maxAge: 300
                                }),
                                refreshToken: refreshTokens.creatingToken(vendor.vendorId.toString())
                            });
                    }).catch(() => {
                        res.status(500)
                            .send({
                                errMsg: unableToProcessMsg
                            });
                    });
                })
                .catch((err) => { // if the email and password is invalid.
                    res.status(401)
                        .send({
                            errMsg: err
                        });
                });
};
// this api is used for requesting a newly jwt.
vendorController.requestToken = (req, res) => {
    // get this data on the query string parameter on the route
    const { id, refreshToken } = req.query;
    // check if the submit refreshToken is exist on the object and verified if the value is equal to the pass id.
    if(refreshTokens.isTokenValid(id, refreshToken)){
        return res.status(200)
            .send({
                success: true,
                jwt: createJWToken({
                    sessionData: {
                        vendorId: id
                    },
                    maxAge: 300
                })
            });
    }
    // else
    res.status(500)
        .send({
            errMsg: unableToProcessMsg
        });
};
// for deleting a token, we will use it for rejecting the rights of the user for accessing a Private API's
vendorController.deletingToken = (req, res) => {
    const { refreshToken }  = req.query;
    // delete the token
    refreshTokens.deletingToken(refreshToken)
        .then((data) => {
            res.status(200)
                .send({
                    success: true,
                    message: data
                });
        })
        .catch(() => {
            res.sendStatus(401);
        });
};

export default vendorController;

