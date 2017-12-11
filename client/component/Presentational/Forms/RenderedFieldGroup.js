import React from 'react';

// we will pass this stateless component as the component rendered on our Field component. 
const RenderedFieldGroup = ({
    input,
    meta: {
        touched,
        error
    },
    field: {
        type,
        value,
        isRequired,
    }
}) => {
    return (
        <div>
            <label className="frm__label" htmlFor={input.name}>
                {value}
                {isRequired && <strong>*</strong>}
            </label>            
            {/* check here if the type of field is text or textarea*/}
            {type == 'text' ? (
                 <input {...input} type={type}/>
            ) : (
                 <textarea cols="30" rows="10" {...input}></textarea>
            )}
            {/* for validation, checked if the field has been touched and has an error, display the error assign on this field */}
            {touched &&
             error &&
             <span className="frm--hasError">{error}</span>
            }
        </div>
    );
};

export default RenderedFieldGroup;
