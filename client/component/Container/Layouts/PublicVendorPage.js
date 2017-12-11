import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';

import Header from '../../Presentational/Header';

// check if the vendor is logged in - if logged in and then wants to access the the login route,
// redirect it to vendor product.
const PublicVendorPage = ({component: Component, ...rest, isLoggedVendor}) => {
    return (
        <Route {...rest} render={ (matchProps) => (
            isLoggedVendor ? (
                <Redirect to="/vendor/products"/>
            ) : (
                <div id="siteContainer" >
                    <Component {...matchProps} />
                </div>
            )
        )} />
    );
};

PublicVendorPage.propTypes = {
    component: PropTypes.func.isRequired,
    isLoggedVendor: PropTypes.bool.isRequired
};


export default PublicVendorPage;


