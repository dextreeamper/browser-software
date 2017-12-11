/**
 * Created by dennismacbookpro on 12/07/2017.
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ResendEmailVerifyLink from '../Presentational/Email/ResendEmailVerifyLink';
import { resendEmailVerify } from '../../actions/vendorAction';

const mapStateToProps = (state) => {
    return {
        jwt: state.vendor.loggedVendor.token,
        pending: state.vendor.processRequest.pending
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        vendorAction: bindActionCreators({
            resendEmailVerify
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResendEmailVerifyLink);

