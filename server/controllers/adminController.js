import db from '../models';
import { createJWToken } from '../libs/auth';

const adminController = {};

adminController.register = (req, res) => {
    const { fullname } = req.body;

    const adminDoc = new db.Admin({
        fullname
    });

    adminDoc.save()
            .then((admin) => {
                res.status(200)
                    .json({
                        success: true,
                        message: 'The data is successfully saved.',
                        token: createJWToken({
                            sessionData: admin,
                            maxAge: 3600
                        })
                    });
            })
            .catch((error) => {
                console.log(error);
                res.status(400)
                    .json({
                        message: 'Bad request!'
                    });
            });
};


export default adminController;
