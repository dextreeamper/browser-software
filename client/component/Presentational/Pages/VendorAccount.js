import React from 'react';
import VendorAccountForm from '../VendorAccountForm';
import Breadcrumb from '../Breadcrumb';

class VendorAccount extends React.Component{
    render(){
        return(
            <div id="siteMainVendor">
              <Breadcrumb />
              <div className="well container cus__loginForm">
                  <div className="paddingBottomTop--big">
                      <p className="p--darkGray">You can change your information here, don't forget to save your changes.</p>
                  </div>
                  <VendorAccountForm.form />
              </div>
            </div>
        );
    }
}


export default VendorAccount;

