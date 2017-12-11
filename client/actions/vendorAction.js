import axios from 'axios';
import {
    REQUEST_VENDOR_SUCCESS,
    REQUEST_VENDOR_PENDING,
    REQUEST_VENDOR_REJECT,
    SAVE_LOGGED_VENDOR,
    UPDATE_LOGGED_VENDOR,
    DESTROY_LOGGED_VENDOR,
    UPDATE_LOGGED_VENDOR_VERIFIED,
    UPDATE_LOGGED_VENDOR_TOKEN,
    UPDATE_LOGGED_VENDOR_JWT
} from '../actionTypes';
import { closeModal } from './interfaceAction';


const pendingVendor = () => {
    return {
        type: REQUEST_VENDOR_PENDING,
        payload: {
            isPending: true
        }
    };
};

const successRequestVendor = () => {
    return {
        type: REQUEST_VENDOR_SUCCESS,
        payload: {
            isPending: false,
        }
    };
};

const rejectVendor = (error) => {
    return {
        type: REQUEST_VENDOR_REJECT,
        payload: {
            isPending: false,
            error
        }
    };
};

/**
 * This will check if the jwt is valid, we will fire a request for authenticating 
 *
 * @param {String} token a jwt string 
 * @param {Function} cb is callback function
 * @returns {Object}
 */

export const jwtVerify = (vendorId, token, refreshToken, cb) => {
    const requestOptions = {
        url: '/api',
        headers: {
            'Authorization': 'JWT ' + token
        }
    };

    return dispatch => {
        return axios(requestOptions)
            .then((response) => {
                // if the jwt is valid, we will invokde the cb
                cb();
            })
            .catch((error) => { 
                const errData = error.response;
                // check if the accessed token has been expired.
                // we will update first the jwt before we invoke the cb.
                if(errData.data.errMsg === 'Accessed token expired!'){
                    return axios({
                        url: '/api/requestJWT',
                        params: {
                            id: vendorId,
                            refreshToken
                        }
                    }).then((response) => {
                        dispatch(successRequestVendor());
                        // update the jwt
                        dispatch(updateLoggedVendorJWT(response.data.jwt));
                        // after updating the newly jwt, invoked the cb.
                        cb();
                    }).catch((error) => {
                        dispatch(rejectVendor(error.response.data)); 
                        return Promise.reject(error.response.data);
                    });
                }
                // if the token is invalid
                return dispatch(rejectVendor(errData.data.errMsg));
            });
    };
};


/**
 * Fire a vendor sign in request to the server
 *
 * @param {String} email is string value from the vendor login form
 * @param {String} password is string value from the vendor login form
 * @param {Function} cb is callback function
 * @returns {Function(*)}
 */
export const vendorSigninRequest = (email, password) => {
    return (dispatch) => {
        dispatch(pendingVendor());
        // return this promise so that on calling this function, we can chain a then method.
        return axios.get('/auth/vendors/sign_in', {
            params: {
                email,
                password
            }
        })
        .then((response) => {
            dispatch(successRequestVendor());
            // we need to persist the logged vendor on the localStorage
            dispatch(
                saveLoggedVendor(
                    {
                        doc: response.data.vendor,
                        token: response.data.token,
                        refreshToken: response.data.refreshToken 
                    }
                )
            );
        })
        .catch((error) => {
            dispatch(rejectVendor(error.response.data));
            return Promise.reject(error.response.data);
        });
    };
};

/**
 * Fire a vendor sign up request to the server
 *
 * @param {Object} vendorData data coming from the form
 * @returns {Promise}
 */
export const vendorSignupRequest = (vendorData) => {
    return dispatch => {
        dispatch(pendingVendor());
        return axios.post('/api/vendors/sign_up', vendorData)
            .then(response => {
                dispatch(successRequestVendor());
                // the return data in here will be the resolve data on a chaing then method. 
                // we need to persist the logged vendor on the localStorage
                dispatch(
                    saveLoggedVendor(
                        {
                            doc: response.data.vendor,
                            token: response.data.token,
                            refreshToken: response.data.refreshToken 
                        }
                    )
                );

            })
            .catch(error => {
                dispatch(rejectVendor(error.response.data));
                // we will return a promise that is already been rejected.
                return Promise.reject(error.response.data);                
            });
    };
};

export const vendorUpdateRequest = (vendorData, token, cb) => {
    return dispatch => {
        dispatch(pendingVendor());
        const requestOptions = {
            url: '/api/vendors/593672f8ae38ba203af44d04/profile',
            headers: {
                'Authorization': 'JWT' + token
            },
            method: 'put',
            data: vendorData
        };
        axios(requestOptions)
            .then((response) => {
                dispatch(successRequestVendor());
                cb(null, response);
            }).catch((error) => {
                dispatch(rejectVendor(error.response.data));
                cb(error);
            });
    };
};
/**
 * When the vendor saves his/her new profile pic, we will sent a request to the server
 *
 * @param {Object} vendorData is the object will be sent to the server.
 * @param {String} token is an encoded text that is included on the request data. It is used for
 *                  telling the Authentication System on the server that a request is coming to the
 *                  logged vendor.
 * @returns {Promise}
 */
export const vendorUpdateAvatarRequest = (cropData, vendorId, refreshToken) => {
    return dispatch => {
        // fire a request for pending vendor request
        dispatch(pendingVendor());
        // creating the request data for the avatar.
        let postData = new FormData();
        postData.append('avatar', cropData.fileUpload);
        postData.append('cropData', JSON.stringify(cropData.cropData));

        // request config
        const requestOptions = {
            url: `/api/vendors/${vendorId}/upload`,
            method: 'put',
            data: postData
        };

        // update the avatar.
        return axios(requestOptions)
            .then((response) => {
                dispatch(successRequestVendor());
                // update the loggedVendor state.
                dispatch(updateLoggedVendor({
                    avatar: response.data.avatarURL
                }));
                // after updating the avatar vendor, close the modal.
                dispatch(closeModal());
            })
            .catch((error) => {
                // else, if the vendor is authenticated but there is an error internally
                dispatch(rejectVendor(error.response.data));
                return Promise.reject(error.response.data);
            });
    };
};

/**
* Used for verifying the email
*
* @param emailToken this is the token that is sent on the email
* @return {Promise}
*/
export const emailVerify = (emailToken) => {
    return dispatch => {
        dispatch(pendingVendor());
        return axios.get('/api/vendors/verifyToken', {
            params: {
                token: emailToken
            }
        })
        .then((response) => {
            dispatch(successRequestVendor());
            dispatch(updateLoggedVendor({
                isVerified: response.data.isVerified
            }));
            return response.data.message;

        })
        .catch( (error) => {
            dispatch(rejectVendor(error.response.data));
            return Promise.reject(error.response.data);
        });
    };
};

/**
 *  Used for requesting a newly email verification
 *
 * @param jwt is used for requesting to an API that is a secured api.
 * @returns {Promise} a newly promise
 */
export const resendEmailVerify = (jwt) => {
    return dispatch => {
        dispatch(pendingVendor());
        const requestConfig = {
            url: '/api/vendors/resendToken',
            headers: {
                'Authorization': 'JWT' + jwt
            },
            method: 'get',
        };

        // return a newly promise based on the request.
        return axios(requestConfig)
            .then((response) => {
                dispatch(successRequestVendor());
                // update the email token of the logged vendor.
                dispatch(updateLoggedVendor({
                    emailToken: response.data.token
                }));
                // return a new data that will be passed on the next method - 'chaining'
                return response.data;
            })
            .catch((error) => {
                dispatch(rejectVendor(error.response.data));
                return Promise.reject(error.response.data);
            });
    };
};

export const saveLoggedVendor = (loggedVendor) => {
    return {
        type: SAVE_LOGGED_VENDOR,
        payload: loggedVendor
    };
};

const updateLoggedVendor = (payload) => {
    return {
        type: UPDATE_LOGGED_VENDOR,
        payload: payload
    };
};

const updateLoggedVendorJWT = (jwt) => {
    return {
        type: UPDATE_LOGGED_VENDOR_JWT,
        payload: jwt
    };
};


export const destroyLoggedVendor = () => {
    return {
        type: DESTROY_LOGGED_VENDOR,
        payload: null
    };
};
