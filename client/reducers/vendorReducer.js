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

// return an active vendor state.
const loggedVendor = (state={}, action) => {
    switch(action.type){
    case SAVE_LOGGED_VENDOR: {
        return action.payload;
    }
    case UPDATE_LOGGED_VENDOR: {
        // we will create a newly state of document object
        // retrieve the existing values of the doc object.
        const document = {
            ...state.doc
        };
        // get the key name - this will be the key that we will update on the loggedVendor State.
        const key = Object.keys(action.payload)[0];
        // we will update the value of the key based on the payload keys
        // like updating avatar prop/key
        document[key] = action.payload[key];

        return {
            ...state,
            doc: document
        };
    }
    case UPDATE_LOGGED_VENDOR_TOKEN: {
        return {
            ...state,
            doc: {
                ...state.doc,
                emailToken: action.payload
            }
        };
    }
    case UPDATE_LOGGED_VENDOR_JWT: {
        return {
            ...state,
            token: action.payload
        };
    }
    case DESTROY_LOGGED_VENDOR: {
        return action.payload;
    }
    default: {
        return state;
    }
    }
};

// return a REST process request state eg pending.
const processRequest = (state={
    pending: false,
    success: false,
    serverSideError: null
}, action) => {

    switch(action.type){
    case REQUEST_VENDOR_PENDING: {
        return {
            ...state,
            pending: action.payload.isPending,
            success: false
        };
    }
    case REQUEST_VENDOR_SUCCESS: {
        return {
            ...state,
            pending: action.payload.isPending,
            success: true,
            serverSideError: null
        };
    }
    case REQUEST_VENDOR_REJECT: {
        return {
            ...state,
            pending: action.payload.isPending,
            success: false,
            serverSideError: action.payload.error
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
        ),
        loggedVendor: loggedVendor(
            state.loggedVendor,
            action
        )
    };
};

export default reducer;
