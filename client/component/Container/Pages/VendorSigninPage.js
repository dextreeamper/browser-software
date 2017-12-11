import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SigninForm from '../../Presentational/Forms/SigninForms';
import { validatingDataSignin } from '../../../../server/libs/validation';

class VendorSigninPage extends React.Component {
    constructor(){
        super();
        this.state = {
            successMessage: '',
            errorValidation: {}
        };

    }
    // we will use this for updating the errorValidation state.
    // lets say the server responds an error, that error will be persisted on the state.
    componentWillReceiveProps(nextProps){
        // we check first if the the props have changed.
        if(this.props.serverSideError !== nextProps.serverSideError){
            this.setState({
                errorValidation: nextProps.serverSideError
            });
        }
    }

    /**
     * onSubmit is an event handler for the vendor submit event.
     *
     * @param {Object} formSubmit is the data coming from the vendor login form
     * @return {Void}
     */
    onSubmit = (formSubmit) => {
        const { vendorSigninRequest } = this.props.vendorActions;

        // before we send a request, we will clear the value for our successMessage.
        this.setState({
            successMessage: ''
        });

        // we will check here if the formSubmit is valid.
        const { errors, isValid } = validatingDataSignin(formSubmit);

        if(isValid){
            // send a vendor sign in request to the server.
            return vendorSigninRequest(formSubmit.email, formSubmit.password)
                .then((data) => {
                    // redirect to a page.
                    this.props.history.push('/vendor/softwares');
                });
                // note if the server will respond an error code,
                // the errorValidation state is automatically updated.
        }

        // if the client will response an error code.
        this.setState({
            errorValidation: errors
        });

    };
    render(){
        const { pending } = this.props;
        const { errorValidation } = this.state;
        return(
            <main className="container" id="siteVendorLogin">
                <div className="marginBottom--big">
                    <h1 className="hl--darkGray">Log in to your vendor account</h1>
                    <p className="p--darkGray">Lorem ipsum dolor sit amet, consectetur</p>
                </div>
                <div className="marginBottom--big">
                    <SigninForm.form errors={errorValidation} onSubmit={this.onSubmit} pending={pending} >
                        <Link className={'link--forgot_password'} to="/forgot_password">Forgot Password?</Link>
                        <Link className={'link--signup'} to="/vendor/signup">Sign up as vendor now!</Link>
                    </SigninForm.form>
                </div> 
            </main>
        );
    }
}

VendorSigninPage.propTypes = {
    vendorActions: PropTypes.object.isRequired,
    pending: PropTypes.bool.isRequired,
    serverSideError: PropTypes.object,
    history: PropTypes.object.isRequired
};

export default VendorSigninPage;
