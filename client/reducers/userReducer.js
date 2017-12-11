import { REQUEST_USER_SUCCESS, REQUEST_USER_PENDING, REQUEST_USER_REJECT } from '../actionTypes';


const processRequest = (state={
    pending: false,
    success: false,
    error: null
}, action) => {

    switch(action.type){
    case REQUEST_USER_PENDING: {
        return {
            ...state,
            pending: action.payload.isPending
        };
    }
    case REQUEST_USER_SUCCESS: {
        return {
            ...state,
            pending: action.payload.isPending,
            success: true
        };
    }
    case REQUEST_USER_REJECT: {
        return {
            ...state,
            pending: action.payload.isPending,
            error: action.payload.error
        };
    }
    default: {
        return state;
    }
    }
};

const reducer = (state={}, action) => {
    return {
        processRequest: processRequest(
            state.processRequest,
            action
        )
    };
};

export default reducer;
