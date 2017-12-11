/**
 * Created by dennismacbookpro on 30/06/2017.
 */
import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';

 
// check if the vendor is logged in - if logged in and then wants to access the the login route,
// redirect it to vendor product.
const PublicPage = ({component: Component, ...rest, isLoggedVendor}) => {
    return (
        <Route {...rest} render={ (matchProps) => (
            <div id="siteContainer">
                <Component {...matchProps} />
            </div>
        )} />
    );
};

PublicPage.propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string,
    isLoggedVendor: PropTypes.bool.isRequired
};


export default PublicPage;


