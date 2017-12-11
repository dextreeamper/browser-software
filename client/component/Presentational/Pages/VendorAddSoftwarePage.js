import React from 'react';
import PropTypes from 'prop-types';
import _isNil from 'lodash/isNil';

import AddSoftwareForm from '../../Container/Forms/AddSoftwareForm';

const VendorAddSoftwarePage = () => {
    return (
        <div className="container">
            <div className="panel">
                <h1 className="panel__title">Software Information</h1>
                <AddSoftwareForm />
            </div>
        </div>
    );
};


export default VendorAddSoftwarePage;





