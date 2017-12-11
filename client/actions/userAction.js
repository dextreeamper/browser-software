import axios from 'axios'; 

import { REQUEST_USER_SUCCESS, REQUEST_USER_PENDING, REQUEST_USER_REJECT } from '../actionTypes';


const pendingUser = () => {
    return {
        type: REQUEST_USER_PENDING,
        payload: {
            isPending: true,
            success: false
        }
    };
};

export const successAddUser = () => {
    return {
        type: REQUEST_USER_SUCCESS,
        payload: {
            isPending: false,
            success: true
        }
    };
};

export const rejectUser = (error) => {
    return {
        type: REQUEST_USER_REJECT,
        payload: {
            isPending: false,
            success: false,
            error: error
        }
    };
};

export const userSignupRequest = (userData) => {
    return dispatch => { 
        dispatch(pendingUser());
        return axios.post('/api/users', userData);
    };
};
