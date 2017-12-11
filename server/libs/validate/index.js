/**
 * Set and get validation for specific form, this function called factory function
 *
 * @return {Object}
 */
export const Validate = () => {
    // this will handle the validation function
    let validateFn;

    // setting validation
    const setValidation = fn => validateFn = fn;

    // getting the validation
    const getValidation = () => validateFn;

    // return an APi
    return {
        setValidation,
        getValidation
    };
};

/**
 * validating the form values that is submitted when adding a software
 * 
 * @param {Object} formValues 
 * @return {Object}
 */
export const addSoftware = formValues => {
    const errors ={};
    if(!formValues.name){
        errors.name = 'Name is required.';
    }else if(formValues.name.length < 5){
        errors.name = 'Must be 5 characters or more.';
    }
    if(!formValues.desc){
        errors.desc = 'Description is required.';
    }
    if(!formValues.price){
        errors.price = 'Price is required.';
    }

    return errors;
};
