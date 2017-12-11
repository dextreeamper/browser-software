/**
 * Created by dennismacbookpro on 14/07/2017.
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _isNil from 'lodash/isNil';

import VendorNavLinks from '../../Presentational/Vendor/VendorNavLinks';
import { destroyLoggedVendor } from '../../../actions/vendorAction';

const mapStateToProps = (state) => {
    const { doc } = state.vendor.loggedVendor;

    return {
        email: doc.email,
        vendorId: doc.vendorId,
        avatar: !_isNil(doc.avatar) ? doc.avatar : '/images/vendor_account_profile.png'
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        vendorActions: bindActionCreators({
            destroyLoggedVendor
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorNavLinks);
