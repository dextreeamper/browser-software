import isEmail from 'validator/lib/isEmail';
import _isNil from 'lodash/isNil';
import _isEmpty from 'lodash/isEmpty';
import _isEqual from 'lodash/isEqual';

export const validateSignupInput = (data) => {
    let errors={};
     
    // we first check if the their is a fullname property of the data.
    // always check first if the property is undefined.
    if(_isNil(data.fullname)){
        errors.fullname = 'The field is required.';
    }
    // validation for email
    if(_isNil(data.email)){
        errors.email = 'The field is required.';        
    }else{
        if(!isEmail(data.email))
            errors.email = 'Email is invalid.';
    }
    // validation for password
    if(_isNil(data.password)){
        errors.password = 'The field is required.';
    }
    // validation for confirmationPassword
    if(_isNil(data.confirmationPassword)){
        errors.confirmationPassword = 'The field is required.';
    }
    // validaton if password and confirmation password are match
    if(data.password && data.confirmationPassword){
        if(!_isEqual(data.password, data.confirmationPassword))
            errors.confirmationPassword = 'Passwords must match.';
    }

    return {
        errors,
        isValid: _isEmpty(errors) // we will use a package called ramda for validating the data.
    };
};

/**
 * Validation for Sign-in form
 *
 * @param {Object} data is coming from the sign in form
 * @return {Object} is have errors and isValid property.
 */
export const validatingDataSignin = (data) => {
    let errors = {};

    if(_isNil(data.email) || _isEmpty(data.email)){
        errors.email = 'Email address is required';
    }else{
        if(!isEmail(data.email))
            errors.email = 'Valid Email address is required';
    }
    if(_isNil(data.password) || _isEmpty(data.password)){
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: _isEmpty(errors)
    };

};

/**
 * Validation for Vendor Sign-up form
 *
 * @param {Object} data is coming from the sign in form
 * @return {Object} is have errors and isValid property.
 */
export const validatingDataSignupVendor = (data) => {
    let errors = {};

    if(_isNil(data.firstName) ||  _isEmpty(data.firstName)){
        errors.firstName = 'First name is required';
    }
    if(_isNil(data.lastName) || _isEmpty(data.lastName)){
        errors.lastName = 'Last name is required';
    }
    if(_isNil(data.phoneNumber) || _isEmpty(data.phoneNumber)){
        errors.phoneNumber = 'Phone number is required';
    }
    if(_isNil(data.company) || _isEmpty(data.company)){
        errors.company = 'Company name is required';
    }
    // if(_isNil(data.websiteUrl) || _isEmpty(data.websiteUrl)){
    //     errors.websiteUrl = 'Website Url is required';
    // }
    // validation for email
    if(_isNil(data.email) || _isEmpty(data.email)){
        errors.email = 'Email address is required';
    }else{
        if(!isEmail(data.email))
            errors.email = 'Email is already used';
    }
    if(_isNil(data.terms) || data.terms === false){
        errors.terms = 'You should accept the terms and condition.';
    }
    // validation for password
    if(_isNil(data.password) || _isEmpty(data.password)){
        errors.password = 'The field is required.';
    }
    // validation for confirmationPassword
    if(_isNil(data.confirmationPassword) || _isEmpty(data.confirmationPassword)){
        errors.confirmationPassword = 'The field is required.';
    }
    // validation if password and confirmation password are match
    if(data.password && data.confirmationPassword){
        if(!_isEqual(data.password, data.confirmationPassword))
            errors.confirmationPassword = 'The password and confirmation do not match.';
    }

    return {
        errors,
        isValid: _isEmpty(errors)
    };
    
};

