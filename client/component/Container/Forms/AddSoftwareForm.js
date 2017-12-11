import { connect } from 'react-redux';

import StandForm from '../../Presentational/Forms/StandardForm';
import { addSoftware } from '../../../../server/libs/validate/index';


// TODO: extract this function to other module.
const onSubmit = formValues => {
    console.log('the form values ', formValues);
};

// TODO: extract this object to another module that handles the same object.
const fields = [
    {
        type: 'text',
        name: 'name',
        value: 'Name of Software',
        isRequired: true
    },
    {
        type: 'textarea',
        name: 'desc',
        value: 'Description',
        isRequired: true
    },
    {
        type: 'text',
        name: 'price',
        value: 'Price',
        isRequired: true
    },
    {
        type: 'text',
        name: 'pricingDetails',
        value: 'Pricing Details',
        isRequired: false
    }
];

/**
   we need to create a object composition for our form
   Default Form requirements:
   - it has field (textbox, radio butotn, textarea ...) - property
   - can do a server request - method
   - can validate - method

   Formula on creating default form:
   defaultForm = field + requester + validator

*/

// TODO: we need to extract this object composition to another module. recommended client/libs directory.
// for creating field
const createFields = state => ({
    fields: state.fields
});

// return an object that has request method (sending request to the server)
const requester = state => ({
    request: state.request 
});

// return an object that has validate method (for validating the form values)
const validator = state => ({
    validate: state.validate
});


// creating our default / standard form using Composition
const standardForm = (state) => {
    // we will return a state that is created on the composition
    return Object.assign(
        {},
        createFields(state),
        requester(state),
        validator(state)
    );
};

// creating an instace of the standardForm
const addSoftwareForm = standardForm({
    fields: fields,
    request: onSubmit,
    validate: addSoftware
});

const mapStateToProps = state => {
    const { processRequest } = state.vendor;
    // return
    return {
        fields: addSoftwareForm.fields,
        validate: addSoftwareForm.validate,
        pending: processRequest.pending,
        serverSideError: processRequest.serverSideError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: addSoftwareForm.request
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StandForm.form);
