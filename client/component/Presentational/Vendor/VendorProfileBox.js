/**
 * Created by leetdigitalmac01 on 19/06/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';

const VendorProfileBox = ({ avatarSource, onDrop }) => {
    let dropzoneRef;
    return (
        <div>
            <div className="container profileBox">
                <div className="profile">
                    <div className="sampleAvatar">
                        <Dropzone
                            className="dropzone"
                            onDrop={onDrop.bind(this)}
                            multiple={false}
                            accept="image/*"
                            ref={(node) => { dropzoneRef = node; }}
                        >
                            <img src={avatarSource}  alt="Vendor Avatar"/>
                        </Dropzone>
                        <div className="actionButton">
                            <button type="button" onClick={() => {dropzoneRef.open();} }><i className="fa fa-pencil"></i></button>
                            <button type="button"><i className="fa fa-trash"></i></button>
                        </div>
                    </div>
                </div>
                <h1>Vendor Name</h1>
                <p>
                    <a href="">ipsum dolor sit amet, consectetur</a>
                </p>
                <Link style={{backgroundColor: '#5fcf80'}} to="/vendor/softwares"> View Listings </Link>
            </div> 
        </div>
    );
};

VendorProfileBox.propTypes = {
    avatarSource: PropTypes.string.isRequired,
    onDrop: PropTypes.func
};


export default VendorProfileBox;
