import { verifyJWToken } from '../libs/auth';

const authController = {};

authController.verifyRequest = (req, res, next) => {
    // we get the token coming from the user.
    const token = (req.method === 'POST') ? req.body.token : req.query.token;

    // we need to verify the token
    verifyJWToken(token)
        .then((decodedToken) => {
            // getting the accesserID on the decoded token.
            req.accesserId = decodedToken.data.vendorId;
            next();
        })
        .catch(() => {
            res.status(400)
                .json({
                    errMsg: 'Invalid auth token provided'
                });
        });
};

export default authController;

