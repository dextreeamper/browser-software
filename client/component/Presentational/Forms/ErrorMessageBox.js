/**
 * Created by dennismacbookpro on 14/07/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import  '../../../sass/1-templates/form.sass';

const ErrorMessageBox = ({serverError, addClassname}) => {
    return (
        <div className={`form-group--hasError ${addClassname}`}>
             <p className="help-block">{serverError}</p>
        </div>
    );
};

ErrorMessageBox.propTypes = {
    serverError: PropTypes.string.isRequired,
    addClassname: PropTypes.string
};

export default ErrorMessageBox;