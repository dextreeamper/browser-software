import passport from 'passport';
import passportJWT from 'passport-jwt';

// we will use passport JWT for our strategy.
const JwtStrategy = passportJWT.Strategy;
// we assigned the ExtractJWT obj
const ExtractJWT = passportJWT.ExtractJwt;
// create an options
const opts = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJWT.fromAuthHeader()
};

/*
 * this function will return an object that has a property which will be used on our authentication.
 *
 * @param {Object}
 */
const Authenticate = (function(){
    const strategy = new JwtStrategy(opts, (jwtPayload, done) => {
        //If the token has expiration, raise unauthorized
        const expirationDate = new Date(jwtPayload.exp * 1000);
        if(expirationDate < new Date()) {
            return done(null, false);
        }
        // once the user is auth, we will pass the payload on the user prop. we can access it through the req.user.
        const user = jwtPayload.data;
        done(null, user);
    });
    // we will use this strategy to our passport.
    passport.use(strategy);
    // return an object.
    return {
        initialize: () => passport.initialize(),
        authenticate: (cb) => {
            return passport.authenticate(
                'jwt',
                {session: false},
                cb
            );
        }
    };
})();


export default Authenticate;

