import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

@reduxForm({
    form: 'searchForm'
})
class SearchForm extends React.Component{
    render(){
        const { handleSubmit } = this.props;
        return(
            <form onSubmit={handleSubmit}>
                <Field className="form__field" type="text" name="search" placeholder="Search" component="input" />
                <button type="button" className="btn btn--primary">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    <span>Search</span>
                </button>
            </form>
        );
    }
}

SearchForm.propTypes = {
    handleSubmit: PropTypes.func
};

export default{
    form: SearchForm
};
