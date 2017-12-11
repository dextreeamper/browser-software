import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import RenderedFieldGroup from './RenderedFieldGroup';
import '../../../sass/1-templates/components/formSet.sass';
import { Validate } from '../../../../server/libs/validate';

// creating an instance of Validate Module
const addSoftwareValidate = Validate();


/**
 * This will transform the array of field object into array of rendered fields - html element  
 *
 * @param fields 
 * @return {Array}
 */
const creatingRenderedFieldGroups = fields => {
    const renderedFields = fields.map((field, i) => {
        return <Field
                   component={RenderedFieldGroup}
                   name={field.name}
                   field={field}
                   key={i}
        />
    });

    return renderedFields;
};

// A stateless form component.
let Form = ({fields, validate, handleSubmit, pending}) => {
    // setting the validation for this form.
    addSoftwareValidate.setValidation(validate);
    return (
        <form className="frm" onSubmit={handleSubmit}>
            {creatingRenderedFieldGroups(fields)}
            <div className="frm__group"> 
                <input className="frm__button" type="submit" value="Add Software"/>
            </div>
        </form>
    );
};

// HOC 
Form = reduxForm({
    // a unique name for the form
    form: 'form',
    validate: addSoftwareValidate.getValidation()
})(Form);

// TODO: add proptypes for this component

Form.propTypes = {
    fields: PropTypes.array.isRequired,
    validate: PropTypes.func.isRequired,
    pending: PropTypes.bool.isRequired,
    serverSideError: PropTypes.object,
    handleSubmit: PropTypes.func
};


export default {
    form: Form
};
