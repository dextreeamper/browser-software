import db from '../models';

import { validateSignupInput } from '../libs/validation';

const userController = {};

userController.post = (req, res) => {
    
    const { fullname, email, password } = req.body;

    // checking if the input are validated. it will return an object
    const { errors, isValid } = validateSignupInput(req.body);
    
    // check if the data pass is validated.
    if(!isValid){
        res.status(400)
            .send(errors);
    }
    // else check if the email is already exist.exist
    else{
        // this data will pass as document on the user collection.
        const user = db.User({
            fullname,
            email,
            password
        });

        // we are saving the data on the server
        user.save()
            .then(() => {
                res.status(200)
                    .send({
                        success: true,
                        message: 'The request is successfull.'
                    });
            })
            .catch((error) => {
                res.status(400)
                    .send({
                        email: error.errors.email.message
                    });
            });
    }
};

userController.login = (req, res, next) => {
    // get the query string parameters pass in the route
    const { email, password } = req.query;

    // we are checking if the username and password is exist to one of the document saved on the db.
    //
    // we need to retrieve the document based on the email pass.
    db.User.findOne({email})
            .then(user => {
                // if their is email exist on the db, execute this.
                if(user){
                    // check if the password retrieve is similar to the password sent from the login form.
                    db.User.checkIfPasswordCorrect(password, user.password, (error, result) => {
                        // if there is an error on the script.
                        if(error){
                            return next(error);
                        }

                        // check the value of the result.
                        if(result){
                            res.status(200)
                                .send({
                                    message: 'The email and password is correct.'
                                });
                        }else{
                            res.status(401)
                                .send({
                                    errMsg: 'The email/password is invalid.'
                                });
                        }

                    });
                }
                else{ // if there is no email, send an unauthorize error message.
                    res.status(401)
                        .send({
                            message: 'The email/password is invalid.'
                        });
                }
            })
            .catch(err => {
                res.status(400)
                    .send({
                        errMsg: err.message
                    });
            });
};

export default userController;
