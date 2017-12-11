import React from 'react';
import Breadcrumb from '../Breadcrumb';

class Softwares extends React.Component{
    render(){
        return(
            <div id="siteAllSoftware">
              <Breadcrumb />
              <div>This is softwares listing</div>
              <div className="form-group button--small">
                <button className="pull-right btn btn-primary" type="submit"> Add a software</button>
              </div>
              <div className="modal--container">
                  <div id="myModal" className="modal">
                    <div className="modal-content">
                      <span className="close">&times;</span>
                      <div className="paddingBottomTop--big">
                        <p className="p--darkGray"><i className="fa fa-desktop"></i> About Your Software</p>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
        );
    }
}


export default Softwares;

