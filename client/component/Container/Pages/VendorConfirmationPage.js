import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ResendEmailVerify from '../ResendEmailVerify';

const VendorConfirmationPage = ({email}) => {
    return (
        <div className="container-email-vendor">
            <div className="emailBox">
                <span>
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
                <div className="info">
                    <p>
                        <b>A verification email has been sent to {email}.</b>
                    </p>
                    <p>
                        Check your email and follow the link to finish creating your account.
                    </p>
                    <ResendEmailVerify/>
                </div>
            </div>
        </div>
    );
};

VendorConfirmationPage.propTypes = {
    email: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    return {
        email: state.vendor.loggedVendor.doc.email
    };
};

export default connect(mapStateToProps, null)(VendorConfirmationPage);