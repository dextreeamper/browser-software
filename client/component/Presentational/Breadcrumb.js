import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import VendorNav from '../Container/Vendor/VendorNav';

class Breadcrumb extends React.Component {
    render(){
        return(
            <div id="breadcrumb--container">
                <ul className="breadcrumb">
                    <li className="link--breadcrumb">
                        <i className="fa fa-home"></i><Link to="/"> Home</Link>
                    </li>
                    <li className="link--breadcrumb"><Link to="/vendor">Vendor</Link></li>
                    <li className="link--breadcrumb active"><Link to="/vendor">Vendor Login</Link></li>
                </ul>
                { this.props.isLoggedVendor && <VendorNav /> }
          </div>
        );
    }
}

Breadcrumb.propTypes = {
    isLoggedVendor: PropTypes.bool
};

export default Breadcrumb;