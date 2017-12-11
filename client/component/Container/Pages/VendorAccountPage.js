/**
 * Created by leetdigitalmac01 on 19/06/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reset } from 'redux-form';

import ModalCropper from '../../Presentational/ModalAvatarCropper';
import VendorProfileBox from '../../Presentational/Vendor/VendorProfileBox';
import { openModal, closeModal } from '../../../actions/interfaceAction';

//import VendorSignupForm from '../../Presentational/Forms/VendorSignupForm';
import { validatingDataSignupVendor } from '../../../../server/libs/validation';

// here is the actions
import { jwtVerify, vendorUpdateRequest, vendorUpdateAvatarRequest } from '../../../actions/vendorAction';

class VendorAccountPage extends React.Component{
    constructor(){
        super();
        this.state = {
            fileUpload: '',
            errorValidation: {},
            successMessage: ''
        };
    }
    // applying the server side error on the state of this component
    componentWillReceiveProps(nextProps){
        // we check first if the the props have changed.
        // Update the errorValidation state . The Value is coming from the error props - error coming to the response.
        if(this.props.serverSideError !== nextProps.serverSideError){
            this.setState({
                errorValidation: nextProps.serverSideError
            });
        }
    }

    onDrop = (files) => {
        // modify the fileUpload state, get the URL of the image.
        this.setState({
            fileUpload: files[0]
        });

        // opening the modal
        this.props.userInterface.openModal();

    };
    /**
     * When the vendor saves his/her new profile pic, we will sent a request to the server
     *
     * @param {Object} cropData is the object will be passed coming from the cropper.
     */
    handleCroppedImage = (cropData) => {
        const { vendorUpdateAvatarRequest, jwtVerify } = this.props.vendorActions;
        const { token, vendor, refreshToken } = this.props;

        // creating the crop avatar object, it holds the crop data information and the fileupload state.
        const cropAvatarData = {
            cropData,
            fileUpload: this.state.fileUpload
        };

        // send a request for uploading the new avatar.
        // but before we sent, we check if the token is valid and not expired
        jwtVerify(vendor.vendorId, token, refreshToken, () => vendorUpdateAvatarRequest(cropAvatarData, vendor.vendorId));

    };
    /**
     * Submit handler for vendor signup form
     *
     * @param {Object} data coming from the vendor signup form.
     * @return {Void}
     */
    onSubmit = (formSubmit) => {
        // we are destructuring the form submit data. we will use this for creating our request data.
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            company,
            websiteURL,
            selectLocation,
            facebook,
            google,
            linkedin,
            youtube,
            twitter
        } = formSubmit;
        const { vendorActions } = this.props;
        const { vendorUpdateRequest, clearingForm } = vendorActions;
        // initialize the vendorValidation to empty object.
        this.setState({
            errorValidation: {},
            successMessage: ''
        });

        // first we need to check the data send from the form. - we explicitly declare the terms in here in to true.
        const { errors, isValid } = validatingDataSignupVendor({...formSubmit, terms: true});

        if(isValid){
            // request data.
            const requestData = {
                firstName,
                lastName,
                email,
                phoneNumber,
                company,
                websiteURL,
                selectLocation,
                socialMedia: {
                    facebookLink: facebook,
                    googleLink: google,
                    linkedinLink: linkedin,
                    youtubeLink: youtube,
                    twitterLink: twitter
                }
            };
            // do a post request in here, we will pass the this data on the server.
            // this function will return a promise
            vendorUpdateRequest(requestData, (error, data) => {
                if(!error){
                    // retrive the message value coming from the server's response.
                    this.setState({
                        successMessage: data.data.message
                    });
                    // whenever the data is submitted, we need to clear the form.
                    clearingForm('vendorSignupForm');
                }
            });

        }
        // if the server will response an error code.
        this.setState({
            errorValidation: errors
        });
    };
    //
    getAvatarURL = () => {
        // const { cropImageURL } = this.state;
        const { vendor } = this.props;

        // if there is a content of the cropImageURL
        // if(cropImageURL) return cropImageURL;
        if(vendor.avatar) return vendor.avatar;

        return '/images/vendor_account_profile.png';
    };
    render(){
        const { fileUpload, errorValidation } = this.state;
        const { isModalOpen, userInterface, pending } = this.props;
        // if the avatar prop is mpty, we will use this image.
        const avatarSource = this.getAvatarURL();
        return(
            <div>
                <VendorProfileBox
                    onDrop={this.onDrop}
                    avatarSource={avatarSource}
                />
                <div id="siteMainVendor" className="container vendorAccount">
                    <div className="borderLine--light well cus__loginForm ">
                        <p>
                            You change your your information here, don't forget to save your changes.
                        </p>
                        <div className="paddingBottom--big">
                        </div>
                    </div>
                </div>
                <ModalCropper
                    handleCroppedImage={this.handleCroppedImage}
                    urlImage={fileUpload.preview}
                    isOpen={isModalOpen}
                    pending={pending}
                    closeModal={userInterface.closeModal}
                    serverSideError={errorValidation}
                />
            </div>
        );
    }
}

VendorAccountPage.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    userInterface: PropTypes.object.isRequired,
    vendorActions: PropTypes.object.isRequired,
    pending: PropTypes.bool.isRequired,
    serverSideError: PropTypes.object,
    token: PropTypes.string.isRequired,
    refreshToken: PropTypes.string.isRequired,
    vendor: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return{
        isModalOpen: state.userInterface.processingModal.isModalOpen,
        pending: state.vendor.processRequest.pending,
        serverSideError: state.vendor.processRequest.serverSideError,
        token: state.vendor.loggedVendor.token,
        refreshToken: state.vendor.loggedVendor.refreshToken,
        vendor: state.vendor.loggedVendor.doc
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userInterface: bindActionCreators({
            openModal,
            closeModal
        }, dispatch),
        vendorActions: bindActionCreators({
            vendorUpdateRequest,
            vendorUpdateAvatarRequest,
            jwtVerify,
            clearingForm: (formName) => {
                return reset(formName);
            }
        }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(VendorAccountPage);


                            // <VendorSignupForm.form
                            //     buttonTitle="Save Changes"
                            //     buttonIcon="fa-save"
                            //     pending={pending}
                            //     errors={errorValidation}
                            //     successMessage={successMessage}
                            //     onSubmit={this.onSubmit}
                            // />

