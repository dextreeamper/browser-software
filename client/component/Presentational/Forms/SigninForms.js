import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';
import _isNull from 'lodash/isNull';

import ErrorMessageBox from './ErrorMessageBox';
import DisplayLoaderOrButton from '../DisplayLoaderOrButton';

@reduxForm({
    form: 'signinForm'
})
class SigninForm extends React.Component{
    render(){
        const { handleSubmit, errors, pending, children } = this.props;

        // we wil create an error object based on the passed errors validation.
        const errorMsg = {
            email: _isNull(errors) ? false : errors.email,
            password: _isNull(errors) ? false : errors.password,
            serverError: _isNull(errors) ? false : errors.errMsg
        };

        return(
            <form onSubmit={handleSubmit}>
                { errorMsg.serverError && <ErrorMessageBox serverError={errorMsg.serverError} />}
                <div className="form-group">
                    <Field className={classNames('form-control', {'error-border': errorMsg.email })} placeholder="Email Address" name="email" component="input" type="text" />
                    {
                        errorMsg.email && <span className="help-block">{errorMsg.email}</span>
                    }
                </div>
                <div className="form-group">
                    <Field className={classNames('form-control', {'error-border': errorMsg.password})} placeholder="Password" name="password" component="input" type="password" />
                    {
                        errorMsg.password && <span className="help-block">{errorMsg.password}</span>
                    }
                </div>
                <div className="form-group">
                    <DisplayLoaderOrButton
                        pending={pending}
                        actionUI={
                            <button className="btn btn-primary" type="submit">Login</button>
                        }
                        inlineStyles={{
                            marginBottom: 50
                        }}
                    />
                    {children}
                </div>
            </form>
        );
    }
}


SigninForm.propTypes = {
    handleSubmit: PropTypes.func,
    errors: PropTypes.object,
    pending: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
};


export default { form: SigninForm };

