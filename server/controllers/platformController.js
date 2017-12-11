import db from '../models';

const platformController = {};

platformController.post = (req, res) => {
    const { title } = req.body;

    const platformDoc = new db.Platform({
        title
    });
 
    // we will save the platform document on the collection.
    platformDoc.save()
                .then((platform) => {
                    // then update the admin based on the adminId.
                    db.Admin.findByIdAndUpdate(
                        req.accesserId,
                        {
                            $push: {
                                '_platforms': platform._id
                            }
                        }
                    ).then((existingAdmin) => {
                        // if successfull, it will return the previous state of the admin document.
                        res.status(200)
                            .json({
                                success: true,
                                message: 'New entry on the success platform',
                                existingAdmin
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(400)
                            .json({
                                errMsg: 'The given I.D is not found'
                            });
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(400)
                        .json({
                            errMsg: 'Bad request!'
                        });
                });
};


export default platformController;
