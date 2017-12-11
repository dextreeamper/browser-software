/**
 * Created by dennismacbookpro on 23/08/2017.
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _isEmpty from 'lodash/isEmpty';

import App from '../App';
import { destroyLoggedVendor } from '../../actions/vendorAction';

const mapStateToProps = (state) => {
    const loggedVendor = state.vendor.loggedVendor;
    return {
        isLoggedVendor: !_isEmpty(loggedVendor), // we will check if the vendor is logged in.
        isVerified: !_isEmpty(loggedVendor) ? loggedVendor.doc.isVerified : false // check if the account is verified.
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        vendorActions: bindActionCreators({
            destroyLoggedVendor
        }, dispatch) 
    };
};


export default connect(mapStateToProps, mapDispatchToProps )(App);
