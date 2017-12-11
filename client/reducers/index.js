import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import user from './userReducer';
import vendor from './vendorReducer';
import userInterface from './interfaceReducer';

export default combineReducers({
    vendor,
    user,
    userInterface,
    form: formReducer
});

