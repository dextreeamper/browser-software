import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import _isEmpty from 'lodash/isEmpty';

import VerifyingEmailMessage from '../../Presentational/Email/VerifyingEmailMessage';
import ResendEmailVerify from '../ResendEmailVerify';
import { emailVerify } from '../../../actions/vendorAction';
import '../../../sass/1-templates/vendorEmailVerify.sass';


class EmailVerify extends Component {
    constructor(){
        super();
        this.state = {
            message: '',
            errorType: ''
        };

    }
    componentDidMount() {
        const { vendorActions, isLoggedVendor } = this.props;
        // before we will sent this request to the server, we check first the vendor is logged in.
        if(isLoggedVendor){
            // get the email token on the URL parameter
            const emailToken = this.props.match.params.token;
            // get the response message coming from the server.
            vendorAction.emailVerify(emailToken)
                        .then(response => {
                            // if no error.
                            this.setState({
                                message: response
                            });

                        })
                        .catch(error => {
                            this.setState({
                                errorType: error.type,
                                message: error.errMsg
                            });
                        });
        }
    }
    render() {
        const { isLoggedVendor } = this.props;
        const { errorType, message } = this.state;
        // if the vendor is logged in and email verification is success., render this component.
        if(isLoggedVendor && errorType === ''){
            return (
                <VerifyingEmailMessage
                    icon="check" iconErrorState="success"
                    title={message}
                    desc= 'Congratulations! Your new account has been successfully verified'
                    actionElement={ <Link className="buttonLink" to="/vendor/products">Continue</Link> }
                />
            );
        }
        // if there's an error and the error type is equal to already verified.
        if(isLoggedVendor && errorType === 'already-verified') {
            // if not logged in.
            return (
                <VerifyingEmailMessage
                    icon="check" iconErrorState="success"
                    title={message}
                    desc= 'Go back to products listing.'
                    actionElement={ <Link className="buttonLink" to="/vendor/products">Continue</Link> }
                />
            );
        }
        // if the token is already expire.
        if(isLoggedVendor && errorType === 'not-verified'){
            return (
                <VerifyingEmailMessage
                    icon="times" iconErrorState="error"
                    title={message}
                    desc= 'Click the link to resend an email verification.'
                    actionElement={ <ResendEmailVerify/> }
                />
            );
        }
        // if not logged in
        return (
            <div className="container-email-vendor">
                <h1>Signin your account first and then re try confirming your email.</h1>
                <Link to="/vendor/signin">Click to signin</Link>
            </div>
        );
    }
}

EmailVerify.propTypes = {
    vendorActions: PropTypes.object.isRequired,
    isLoggedVendor: PropTypes.bool.isRequired,
    isVerified: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    const { loggedVendor } = state.vendor;
    return {
        isLoggedVendor: !_isEmpty(loggedVendor), // we will check if the vendor is logged in.
        isVerified: _isEmpty(loggedVendor) ? false : loggedVendor.doc.isVerified // check if the account is verified.
    };
};

const mapDispatchToProps = dispatch => {
    return {
        vendorActions: bindActionCreators({
            emailVerify
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerify);



