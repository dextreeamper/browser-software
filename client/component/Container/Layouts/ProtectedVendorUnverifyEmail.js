/**
 * Created by dennismacbookpro on 30/06/2017.
 */
import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import _isNull from 'lodash/isNull';
import { Redirect } from 'react-router-dom';

/** 
 * This is Protected Vendor Confirmation Page, the vendor dont have an access on this page if he/she is not logged in.
 * If not log in, redirect it to the home page, if log in redirect to vendor product list page. 
 */
const ProtectedVendorUnverifyEmail = ({component: Component, ...rest, isLoggedVendor, isVerified}) => {
    return (
        <Route {...rest} render={ (matchProps) => 
            {
            // first we checked if the vendor is authenticated and his/her account has been verified.
            // if authenticated and not verified yet - render this component.
            if(isLoggedVendor && !isVerified){
                return (
                    <div id="siteContainer">
                        <Component {...matchProps} />
                    </div>
                );
            }
            if(isLoggedVendor && isVerified){
                return (
                    <Redirect to="/vendor/products" />
                );
            }
            return (
                <Redirect to="/vendor/signin" />
            );}
        } />
    );
};

ProtectedVendorUnverifyEmail.propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string,
    isLoggedVendor: PropTypes.bool.isRequired,
    isVerified: PropTypes.bool.isRequired
};


export default ProtectedVendorUnverifyEmail;
