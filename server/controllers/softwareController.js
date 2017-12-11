import db from '../models';
import remove from 'rimraf';

const softwareController = {};

softwareController.post = (req, res) => {

    const {
        name,
        desc,
        price,
        pricingDetails,
        categories
    } = req.body;


    const softwareDoc = new db.Software({
        mainDetails: {
            name,
            desc,
            price,
            pricingDetails
        },
        _vendor: req.user.vendorId,
        _categories: categories // categories accepts strings eg 1,2,3 - we will split it by , to create an array.
    });

    // saving the software.
    softwareDoc.save()
            .then((software) => {
                res.status(200)
                    .json({
                        success: true,
                        message: 'The data is successfully saved.',
                        doc: software
                    });
            })
            .catch(() => {
                res.status(400)
                    .json({
                        errMsg: 'Bad request!'
                    });
            });
};

softwareController.uploadImages = (req, res) => {
    //logo and gallery is an array.
    const { logo, gallery } = req.files;
    const relativeURL =  '/' + 'uploads/softwares' + '/' + req.params.softwareId + '/';
    // we will create logo value for our logo field and update this on existing software.
    const logoObject = {
        URL: relativeURL +  logo[0].filename, // this is absolute URL - local resources
        path: logo[0].path
    };
    // create a gallery array for our gallery field and update this on existing software.
    const galleryArray = gallery.map((file) => {
        return {
            URL: relativeURL + file.filename,
            path: file.path
        };
    });

    // check if there is a software exist, if then check if the _vendor value is equal to decoded token.
    db.Software.findByIdAndUpdate(
        req.params.softwareId,
        {
            $set: {
                'mainDetails.logo': logoObject,
                'mainDetails.gallery': galleryArray
            }
        },
        {
            new: true
        }
    ).where('_vendor').equals(req.accesserId)
        .then((software) => {
            return new Promise((resolve, reject) => {
                if(!software){
                    reject('The software ID is not valid.');
                }

                resolve({
                    success: true,
                    message: 'The software is successfully updated.'
                });
            });
        })
        .then((response) => {
            res.status(200)
                .json(response);
        })
        .catch((error) => {
            // we will delete the created directory. we will use a package called rimraf.
            remove(logo[0].destination, () => console.log('done deleting the directory'));

            res.status(500)
                .json({
                    errMsg: error
                });
        });


};


export default softwareController;

