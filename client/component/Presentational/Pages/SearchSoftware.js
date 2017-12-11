import React from 'react';
import Breadcrumb from '../Breadcrumb';
import SearchSoftwareForm from '../SearchSoftwareForm';

class SearchSoftware extends React.Component {
	render(){
		return(
            <div id="siteMainSoftware">
              <Breadcrumb />
                <div className="paddingBottomTop--big">
                    <h3 className="hl--darkGray">Get recommendations for the best software</h3>
                    <p className="p--darkGray">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. 
                      Proin gravida dolor sit amet lacus accumsan et viverra justo commodo</p>
                </div>
                <div className="lightGray--line"></div>
                <SearchSoftwareForm.form />
            </div>
		);
	}
}

export default SearchSoftware;