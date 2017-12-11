import Auth from '../libs/authenticate';

// this middleware is used for authenticating a request, it is returning a middleware.
export default () => {
    return (req, res,next) => {
        // this will return a middleware, we will pass the req, res, next.
        Auth.authenticate((error, user, info) => {
            // if jwt is invalid
            if(user === false && info && info.message === 'jwt malformed'){
                return res.status(401)
                    .send({
                        errMsg: 'Invalid token!'
                    });
            }else if(user === false && info && info.message === 'jwt expired'){
                return res.status(401)
                    .send({
                        errMsg: 'Accessed token expired!'
                    });
            }

            // adding user prop in request object.
            req.user = user;

            // if the token is valid and not expired, just invoke the next function
            // to continue in other route.
            return next();
        })(req, res, next);
    };
};

