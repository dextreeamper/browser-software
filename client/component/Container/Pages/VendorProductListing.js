/**
 * Created by leetdigitalmac01 on 19/06/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* importing some custom lib*/
import { destroyLoggedVendor } from '../../../actions/vendorAction';

/* importing some components*/
import AddSoftwareLink from '../../Presentational/Software/AddSoftwareLink';

class VendorProductListing extends React.Component{
    render(){
        const { firstName, avatar } = this.props.vendor;
        return(
            <div>
                <div className="container profileBox">
                    <div className="profile">
                        <div className="sampleAvatar">
                            <img src={avatar === undefined ? '/images/vendor_account_profile.png' : avatar } alt="profile"/>
                        </div>
                    </div>
                    <h3>Hi <span>{firstName}</span>, welcome back!</h3>
                    <p>
                        <a href="">ipsum dolor sit amet, consectetur</a>
                    </p>
                    <AddSoftwareLink />
                </div>
                <div id="siteMainVendor" className="container vendorAccount">
                    <div className="product--listing">
                        <div className="paddingBottomTop--small">
                            <p className="p--darkGray"><i className="fa fa-th-list"></i> Product List</p>
                        </div>
                        <div className="software--product">
                            <div className="software--img">
                                <img src={avatar} alt="profile"/>
                            </div>
                            <div className="software--desc">
                                <h1 className="software--title"><a href="#">Music Studio Animation</a></h1>
                                <p className="software--author">by dernypixels</p>
                                <p className="software--details">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at sagittis nisl. Etiam euismod porttitor semper. Nulla interdum nisl dui, et tempus magna varius at. Morbi nulla elit, euismod non aliquam et, molestie in metus.</p>
                                <div className="software--category">
                                    <p className="p--darkGray">
                                        <i className="fa fa-hashtag"></i> <span>category</span>
                                    </p>
                                </div>
                            </div>
                            <div className="software--actions">
                                <button className="button remove--btn"><i className="fa fa-trash-o"/> remove</button>
                                <button className="button update--btn"><i className="fa fa-pencil-square-o"/> update</button>
                            </div>
                            <div className="border--dotted"></div>
                        </div>
                        <div className="software--product">
                            <div className="software--img">
                                <img src="/images/p1.png" alt="profile"/>
                            </div>
                            <div className="software--desc">
                                <h1 className="software--title"><a href="#">Park My Cloud</a></h1>
                                <p className="software--author">by dernypixels</p>
                                <p className="software--details">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at sagittis nisl. Etiam euismod porttitor semper. Nulla interdum nisl dui, et tempus magna varius at. Morbi nulla elit, euismod non aliquam et, molestie in metus.</p>
                                <div className="software--category">
                                    <p className="p--darkGray">
                                        <i className="fa fa-hashtag"></i> <span>category</span>
                                    </p>
                                </div>
                            </div>
                            <div className="software--actions">
                                <button className="button remove--btn"><i className="fa fa-trash-o"/> remove</button>
                                <button className="button update--btn"><i className="fa fa-pencil-square-o"/> update</button>
                            </div>
                            <div className="border--dotted"></div>
                        </div>
                        <div className="software--product">
                            <div className="software--img">
                                <img src="/images/p2.png" alt="profile"/>
                            </div>
                            <div className="software--desc">
                                <h1 className="software--title"><a href="#">CloudWith.Me</a></h1>
                                <p className="software--author">by dernypixels</p>
                                <p className="software--details">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at sagittis nisl. Etiam euismod porttitor semper. Nulla interdum nisl dui, et tempus magna varius at. Morbi nulla elit, euismod non aliquam et, molestie in metus.</p>
                                <div className="software--category">
                                    <p className="p--darkGray">
                                        <i className="fa fa-hashtag"></i> <span>category</span>
                                    </p>
                                </div>
                            </div>
                            <div className="software--actions">

                                <button className="button remove--btn"><i className="fa fa-trash-o"/> remove</button>
                                <button className="button update--btn"><i className="fa fa-pencil-square-o"/> update</button>
                            </div>
                            <div className="border--dotted"></div>
                        </div>
                        <div className="page--pagination">
                            <a href="#" className="previous">&laquo; Previous</a>
                            <a href="#" className="next">Next &raquo;</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

VendorProductListing.propTypes = {
    vendorActions: PropTypes.object.isRequired,
    vendor: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        vendor: state.vendor.loggedVendor.doc
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        vendorActions: bindActionCreators({
            destroyLoggedVendor
        }, dispatch) 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorProductListing);
