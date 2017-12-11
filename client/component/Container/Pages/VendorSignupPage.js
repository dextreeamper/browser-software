import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import VendorSignupForm from '../../Presentational/Forms/VendorSignupForm';
import { validatingDataSignupVendor } from '../../../../server/libs/validation';

import VendorAccountProfile from '../../Presentational/Vendor/VendorNavLinks';

class VendorSignupPage extends React.Component{
    constructor(){
        super();
        this.state = {
            errorValidation: {}
        };
    }
    componentWillReceiveProps(nextProps){
        // we check first if the the props have changed.
        // Update the errorValidation state . The Value is coming from the error props - error coming to the response.
        if(this.props.serverSideError !== nextProps.serverSideError){
            this.setState({
                errorValidation: nextProps.serverSideError
            });
        }
    }
    shouldComponentUpdate (nextProps) {
        // check if the state of the successSignup is true, it is true we don't need to re-render the component.
        if(this.props.processSuccess !== nextProps.processSuccess) return false;
        // not success
        return true;
    }
    
    /**
     * Submit handler for vendor signup form
     *
     * @param {Object} data coming from the vendor signup form.
     * @return {Void}
     */
    onSubmit = (formSubmit) => {
        // destructure the social medias and listing.
        const {
            firstName,
            lastName,
            email,
            password,
            confirmationPassword,
            phoneNumber,
            company,
            website,
            selectLocation,
            facebook,
            google,
            linkedin,
            youtube,
            twitter,
            terms
        } = formSubmit;

        const { vendorActions } = this.props;
        const { vendorSignupRequest, clearingForm } = vendorActions;
        // initialize the vendorValidation to empty object.
        this.setState({
            errorValidation: {}
        });

        // first we need to check the data send from the form.
        const { errors, isValid } = validatingDataSignupVendor(formSubmit);

        if(isValid){

            const responseData = {
                firstName,
                lastName,
                email,
                password,
                confirmationPassword,
                phoneNumber,
                company,
                website,
                selectLocation,
                socialMedia: {
                    facebookLink: facebook,
                    googleLink: google,
                    linkedinLink: linkedin,
                    youtubeLink: youtube,
                    twitterLink: twitter
                },
                terms
            };
            // do a post request in here, we will pass the this data on the server.
            // this function will return a promise
            return vendorSignupRequest(responseData)
                .then(() => {
                    // whenever the data is submitted, we need to clear the form.
                    clearingForm('vendorSignupForm');

                    // we will redirect it to the confirmation page.
                    this.props.history.push('/vendor/unverifyToken');
                })
                // note if the server will respond an error code,
                // the errorValidation state is automatically updated. - componentWillReceiveProps
        }
        // else if the data is not valid
        this.setState({errorValidation: errors});
    };

    render(){
        const { pending } = this.props;
        const { errorValidation }  = this.state;

        return(
              <div className="well container cus__loginForm">
                  <div className="paddingBottomTop--big">
                      <h3 className="hl--darkGray">Sign up</h3>
                      <p className="p--darkGray">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodoLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.</p>
                  </div>
                  <VendorSignupForm.form
                      buttonTitle="Register"
                      buttonIcon="fa-sign-in"
                      pending={pending}
                      onSubmit={this.onSubmit}
                      errors={errorValidation}
                  >
                      <div className="paddingBottomTop--big three">
                          <p className="p--darkGray"><i className="fa fa-heart" /> Get the Most Out of Your Listing</p>
                      </div>
                      <div className="checkbox--white">
                          <label>
                              <Field className="form-control" name="listing1" component="input" type="checkbox" />
                              {'\u00A0'} I want to learn about generating leads from my listing.
                          </label>
                      </div>
                      <div className="checkbox--white">
                          <label>
                              <Field className="form-control" name="listing2" component="input" type="checkbox" />
                              {'\u00A0'} I use other PPC advertising channels.
                          </label>
                      </div>
                      <div className="checkbox--white">
                          <label>
                              <Field className="form-control" name="listing3" component="input" type="checkbox" />
                              {'\u00A0'} I would like to schedule a free website review.
                          </label>
                      </div>
                  </VendorSignupForm.form>
              </div>
        );
    }
}


VendorSignupPage.propTypes = {
    vendorActions: PropTypes.object.isRequired,
    pending: PropTypes.bool.isRequired,
    processSuccess: PropTypes.bool.isRequired,
    serverSideError: PropTypes.object,
    history: PropTypes.object.isRequired
};

export default VendorSignupPage;

