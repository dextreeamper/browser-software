import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

@reduxForm({
    form: 'subscribeForm'
})
class SubscribeForm extends React.Component{
    render(){
        const { handleSubmit } = this.props;
        return(
            <form onSubmit={handleSubmit}>
                <div className="form subscribeForm">
                    <Field className="form__field" type="email" name="email" placeholder="Email Address" component="input"/>
                    <button className="btn btn--small">Subscribe</button>
                </div>
            </form>
        );
    }
}

SubscribeForm.propTypes = {
    handleSubmit: PropTypes.func
};

export default {
    form: SubscribeForm
};
