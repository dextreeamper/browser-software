import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../../../sass/1-templates/vendor/vendorNavLinks.sass';

const VendorNavLinks = ({email, vendorId, vendorActions, avatar}) => {
    const onSignout = (e) => {
        e.preventDefault();
        // to signout, destroy the logged vendor.
        vendorActions.destroyLoggedVendor();
    };

    return(
        <div className="vendor-nav">
            <img src={avatar}/>
            <div className="tooltip">
                <div className="tooltip__header">
                    <p>Signed in as</p>
                    <p>{email}</p>
                </div>
                <div className="tooltip__divider"></div>
                <ul className="tooltip__links">
                    <li>
                        <Link to='/vendor/softwares'> Product Listings </Link>
                    </li>
                    <li>
                        <Link to={`/vendor/account/${vendorId}`}> Settings </Link>
                    </li>
                    <li><a onClick={onSignout}>Sign out</a></li>
                </ul>
            </div>
        </div>
    );
};

VendorNavLinks.propTypes = {
    email: PropTypes.string.isRequired,
    vendorId: PropTypes.string.isRequired,
    vendorActions: PropTypes.object.isRequired,
    avatar: PropTypes.string.isRequired
};

export default VendorNavLinks;
