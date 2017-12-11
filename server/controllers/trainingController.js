import db from '../models';

const trainingController = {};

trainingController.post = (req, res) => {
    const { title } = req.body;

    const trainingDoc = new db.Training({
        title
    });
 
    // we will save the platform document on the collection.
    trainingDoc.save()
                .then((training) => {
                    // then update the admin based on the adminId.
                    db.Admin.findByIdAndUpdate(
                        req.accesserId,
                        {
                            $push: {
                                '_trainings': training._id
                            }
                        }
                    ).then((existingAdmin) => {
                        // if successfull, it will return the previous state of the admin document.
                        res.status(200)
                            .json({
                                success: true,
                                message: 'New entry on the software training.',
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


export default trainingController;


