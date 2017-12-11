import db from '../models';

const categoryController = {};

categoryController.post = (req, res) => {
    const { 
        name,
        keyFunctions
    } = req.body;

    const categoryDoc = new db.Category({
        name,
        keyFunctions,
        _creator: req.accesserId
    });

    // adding category.
    categoryDoc.save()
                .then((category) => {
                    res.status(200)
                        .json({
                            success: true,
                            message: 'The data is successfully saved.',
                            doc: category
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

export default categoryController;
