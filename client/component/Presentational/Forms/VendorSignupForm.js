import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';
import _isNull from 'lodash/isNull';

import ErrorMessageBox from './ErrorMessageBox';
import DisplayLoaderOrButton from '../DisplayLoaderOrButton';

@reduxForm({
    form: 'vendorSignupForm'
})
class VendorSignupForm extends React.Component{
    constructor(){
        super();
        this.state = {
            imagePreview: ''
        };
    }
    render(){
        const {
            handleSubmit,
            pending,
            errors,
            children,
            buttonTitle,
            buttonIcon
        } = this.props;

        const errorMsg = {
            email: _isNull(errors) ? false : errors.email,
            password: _isNull(errors) ? false : errors.password,
            serverError: _isNull(errors) ? '' : errors.errMsg
        };

        return(
                <form onSubmit={handleSubmit}>
                    <div className="paddingBottomTop--big four">
                        <p className="p--darkGray"><i className="fa fa-user-circle" /> Your Account</p>
                    </div>
                    { errorMsg.serverError && <ErrorMessageBox addClassname='form-group--hasError_signup' serverError={errorMsg.serverError} />}
                    <div className={classNames('form-group', {'has-error': errorMsg.email})}>
                        <Field className={classNames('form-control', {'error-border': errorMsg.email})} name="email" component="input" type="text" placeholder="Email*"/>
                        {
                            errorMsg.email && <span className="help-block">{errorMsg.email}</span>
                        }
                    </div>
                    <div className={classNames('form-group', {'has-error': errors.password})}>
                        <Field className={classNames('form-control', {'error-border': errors.password})} name="password" component="input" type="password" placeholder="Password*"/>
                        {
                            errors.password && <span className="help-block">{errors.password}</span>
                        }
                    </div>
                    <div className={classNames('form-group', {'has-error': errors.confirmationPassword})}>
                        <Field className={classNames('form-control', {'error-border': errors.confirmationPassword})} name="confirmationPassword" component="input" type="password" placeholder="Confirm Password*"/>
                        {
                            errors.confirmationPassword && <span className="help-block">{errors.confirmationPassword}</span>
                        }
                    </div>
                    <div className="paddingBottomTop--big one">
                        <p className="p--darkGray"><i className="fa fa-info-circle" /> About Your Company</p>
                    </div>
                    <div className={classNames('form-group', {'has-error': errors.firstName})}>
                      <Field className={classNames('form-control', {'error-border': errors.firstName})} name="firstName" component="input" type="text" placeholder="First Name*"/>
                        {
                            errors.firstName && <span className="help-block">{errors.firstName}</span>
                        }
                    </div>
                    <div className={classNames('form-group', {'has-error': errors.lastName})}>
                      <Field className={classNames('form-control', {'error-border': errors.lastName})} name="lastName" component="input" type="text" placeholder="Last Name*"/>
                        {
                            errors.lastName && <span className="help-block">{errors.lastName}</span>
                        }
                    </div>                
                    <div className={classNames('form-group', {'has-error': errors.phoneNumber})}>
                      <Field className={classNames('form-control', {'error-border': errors.phoneNumber})} name="phoneNumber" component="input" type="text" placeholder="Phone Number*"/>
                        { 
                            errors.phoneNumber && <span className="help-block">{errors.phoneNumber}</span>
                        }            
                    </div>
                    <div className={classNames('form-group', {'has-error': errors.company})}>
                      <Field className={classNames('form-control', {'error-border': errors.company})} name="company" component="input" type="text" placeholder="Company Name*"/>
                        {
                            errors.company && <span className="help-block">{errors.company}</span>
                        }
                    </div>
                    <div className={classNames('form-group', {'has-error': errors.websiteUrl})}>
                      <Field className={classNames('form-control', {'error-border': errors.websiteUrl})} name="websiteUrl" component="input" type="text" placeholder="Website Url"/>
                        {
                            errors.websiteUrl && <span className="help-block">{errors.websiteUrl}</span>
                        }
                    </div>
                    <div className={classNames('form-group', {'has-error': errors.location})}>
                        <Field className={classNames('form-control select--field', {'error-border': errors.location})} name="selectLocation" component="select" placeholder="Location of Headquarters">
                            <option disable hidden value="Location of Headquarters"> Location of Headquarters </option>
                            <option value="first option">The first option</option>
                            <option value="second option">The second option</option>
                        </Field>
                    </div>
                    <div className="paddingBottomTop--big two">
                        <p className="p--darkGray"><i className="fa fa-thumbs-o-up" /> Company Social Media Pages</p>
                    </div>
                    <div className="form-group">
                      <Field className="form-control" name="facebook" component="input" type="text" placeholder="Facebook Page"/>
                    </div>
                    <div className="form-group">
                      <Field className="form-control" name="google" component="input" type="text" placeholder="Google+ Page"/>
                    </div>
                    <div className="form-group">
                      <Field className="form-control" name="linkedin" component="input" type="text" placeholder="Linkedin Page"/>
                    </div>
                    <div className="form-group">
                      <Field className="form-control" name="youtube" component="input" type="text" placeholder="Youtube Channel"/>
                    </div>
                    <div className="form-group">
                      <Field className="form-control" name="twitter" component="input" type="text" placeholder="Twitter Page"/>
                    </div>
                    {children}
                    <div className={classNames('checkbox--white label--small', {'has-error': errors.terms})}>
                        <label><Field className="form-control" name="terms" component="input" type="checkbox"/>{'\u00A0'} I agree to <span>Terms & Conditions</span></label>
                        {
                            errors.terms && <span className="help-block term-error">{errors.terms}</span>
                        }
                    </div>
                    <div className="form-group button--small">
                        <DisplayLoaderOrButton
                            pending={pending}
                            actionUI={<button disabled={pending} className="pull-right btn btn-primary" type="submit"><i className={`fa ${buttonIcon}`} />{buttonTitle}</button>}
                            inlineStyles={{
                                marginLeft: 25
                            }}
                        />
                    </div>
                    <div className="paddingBottomTop--big inquiries">
                        <label>Questions? Call us at 866-304-2402 or email us at advertise@sam.com</label>
                    </div>
              </form>            
        );
    }
}


VendorSignupForm.propTypes = {
    handleSubmit: PropTypes.func,
    errors: PropTypes.object,
    pending: PropTypes.bool.isRequired,
    children: PropTypes.node,
    buttonTitle: PropTypes.string.isRequired,
    buttonIcon: PropTypes.string.isRequired
};

export default { form: VendorSignupForm };
