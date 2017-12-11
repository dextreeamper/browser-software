import jwt from 'jsonwebtoken';
import _reduce from 'lodash/reduce';
import crypto from 'crypto';

// this function will verify the token pass from the client.
export const verifyJWToken = (token) => 
{
    // it will return a promise either a resolve/success or a rejhect
    return new Promise((resolve, reject) =>
    {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => 
        {
            if (err || !decodedToken)
            {
                return reject(err);
            }

            console.log(err);

            resolve(decodedToken);
        });
    });
};

// this function will return a token based on the details/payload.
export const createJWToken = (details) =>
{
    // we will check if the details is of type object.
    if (typeof details !== 'object')
    {
        details = {};
    }
    
    // check if there is maxage propery on the details, if arent, add a aproperty.
    if (!details.maxAge || typeof details.maxAge !== 'number')
    {
        details.maxAge = 3600;
    }
    
    // check if there is password prop on the obj which of type function,
    // if there is, dont pass it to a sessionData.
    details.sessionData = _reduce(
        details.sessionData || {},        
        (memo, val, key) =>
        {
            if (typeof val !== 'function' && key !== 'password')
            {
                // if not password oftype function, pass the key as a prop of memo obj.
                memo[key] = val;
            }
            return memo;
        }, 
        {}, 
    );
    
    // this will create our jwtwebtoken based on the payload pas and JWT_SECRET.
    const token = jwt.sign(
        {
            data: details.sessionData
        }, 
        process.env.JWT_SECRET, 
        {
            expiresIn: details.maxAge,
            algorithm: 'HS256'
        }
    );

    return token;
};



/**
 *  It will return an object that we can use on creating refreshToken and validating it.
 * we use here a revealing module pattern. and we automatically evaluate the function
 * this create their own scope, the variable that we are using inside is only declare there.
 *
 * @type {Object} refreshToken
 */
export const refreshTokens = (function(){
    // create an object, this will handler all the refresh tokens.
    // Private variable
    const refreshTokens = {};

    // this is Public variable. we will set here the functions.
    const refreshTokenFunctions = {};

    /**
     * We will create the property and add it on the object - this refresh token is only associated into 1 user.
     * @param {Object} refreshToken
     */
    refreshTokenFunctions.creatingToken = (value) => {
        // create a refresh token.
        const refreshToken = crypto.randomBytes(16).toString('hex');
        // assigned the token in a specific user, the value will be an ID
        refreshTokens[refreshToken] = value;

        return refreshToken;
    };

    /**
     *  Verifying the passed token.
     * @param id
     * @param refreshToken
     * @returns {boolean}
     */
    refreshTokenFunctions.isTokenValid = (id, refreshToken) => {
        // check if the submit refreshToken is exist on the object and verified if the value is equal to the pass id. (associated on the user)
        if((refreshToken in refreshTokens) && (refreshTokens[refreshToken] === id)){
            return true;
        }
        // else
        return false;
    };

    /**
     * Used for deleting the refresh token of the user.
     *
     * @param {Promise}
     */
    refreshTokenFunctions.deletingToken = (refreshToken) => {
        return new Promise((resolve, reject) => {
            // check if the submit refresh token is on the token list.
            if(refreshToken in refreshTokens){
                // delete the token
                delete refreshTokens[refreshToken];
                resolve('Successfully deleted the token');
            }else{
                reject('Invalid refresh token');
            }
        });
    };

    return refreshTokenFunctions;
})();



