import db from '../models';

const supportController = {};

supportController.post = (req, res) => {
    const { title } = req.body;

    const supportDoc = new db.Support({
        title
    });
 
    // we will save the platform document on the collection.
    supportDoc.save()
                .then((support) => {
                    // then update the admin based on the adminId.
                    db.Admin.findByIdAndUpdate(
                        req.accesserId,
                        {
                            $push: {
                                '_supports': support._id
                            }
                        }
                    ).then((existingAdmin) => {
                        // if successfull, it will return the previous state of the admin document.
                        res.status(200)
                            .json({
                                success: true,
                                message: 'New entry on the software support.',
                                existingAdmin
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


export default supportController;

