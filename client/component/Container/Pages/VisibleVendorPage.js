/**
 * Created by Dennis Cual on 18/06/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reset } from 'redux-form';

import VendorSigninPage from './VendorSigninPage';
import VendorSignupPage from './VendorSignupPage';

import { vendorSigninRequest, vendorSignupRequest } from '../../../actions/vendorAction';

class VisibleVendorPage extends React.Component{
    render(){
        const { vendorActions, pending, serverSideError, history, success } = this.props;
        // we will render a component based on the current URL of the app.
        const renderedComponent = this.props.match.path === '/vendor/signin' ? (
            <VendorSigninPage history={history} vendorActions={vendorActions} pending={pending} serverSideError={serverSideError} />
        ) : (<VendorSignupPage history={history} vendorActions={vendorActions} pending={pending} processSuccess={success} serverSideError={serverSideError} />);

        return(
            <div id="siteMainVendor">
                {renderedComponent}
            </div>
        );
    }
}

VisibleVendorPage.propTypes = {
    vendorActions: PropTypes.object.isRequired,
    pending: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    serverSideError: PropTypes.object,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

// map state to props
const mapStateToProps = (state) => {
    return{
        pending: state.vendor.processRequest.pending,
        success: state.vendor.processRequest.success,
        serverSideError: state.vendor.processRequest.serverSideError
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        vendorActions: bindActionCreators({
            vendorSigninRequest,
            vendorSignupRequest,
            clearingForm: (formName) => {
                return reset(formName);
            }
        }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(VisibleVendorPage);


