/**
 * Created by dennismacbookpro on 3/08/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Cropper from 'react-cropper';
import classNames from 'classnames';
import DisplayLoaderOrButton from './DisplayLoaderOrButton';
import _isEmpty from 'lodash/isEmpty';

class ModalCropper extends React.Component{
    constructor(){
        super();
        this.state = {
            croppingData: {},
            cropImageURL: ''
        };

    }
    closeModal = () => {
        // closing the modal via the close button.
        this.props.closeModal();
    };
    /**
     * This is an event handler that will trigger whenever we crop the image
     */
    onCrop = () => {
        // update the state.
        this.setState({
            croppingData: this.cropper.getData(true),
            cropImageURkkL: this.cropper.getCroppedCanvas().toDataURL()
        });
    };
    onSaveProfile = () => {
        // we will pass the croppingData state on this handler
        this.props.handleCroppedImage(this.state.croppingData, this.state.cropImageURL);
    };
    render(){
        const { isOpen, urlImage, pending, serverSideError } = this.props;

        const portalClassName = classNames(
            'ReactModalPortal',
            {
                'isOpen': isOpen,
                'isClose': !isOpen
            }
        );

        return(
            <Modal
                isOpen={isOpen}
                // onAfterOpen={afterOpenFn}
                onRequestClose={this.closeModal}
                closeTimeoutMS={200}
                contentLabel="Modal"
                portalClassName={portalClassName}
                overlayClassName="ReactModal__Overlay"
                className="ReactModal__Content"
            >
                <header className="modal__header">
                    <p>Crop for your new profile picture</p>
                    <button className="button--noBorder" type="button" onClick={this.closeModal}>
                        <i className="fa fa-times"></i>
                    </button>
                </header>
                <div className="modal__body">
                    <Cropper
                        ref={cropper => { this.cropper = cropper; }}
                        src={urlImage}
                        className="cropper-preview"
                        viewMode={3}
                        zoomable={false}
                        scalabe={false}
                        movable={false}
                        guides={false}
                        autoCropArea={1}
                        crop={this.onCrop}
                    />
                </div>
                <footer className="modal__footer">
                    { /* we will check if this prop is not a language type of object */
                      !_isEmpty(serverSideError) && 
                      <div className="error">
                          <span>
                              {serverSideError.errMsg}
                          </span>
                      </div>
                    }
                    <DisplayLoaderOrButton
                        pending={pending}
                        actionUI={
                            <button onClick={this.onSaveProfile} className="btn" type="button">Set new profile picture</button>
                        }
                        inlineStyles={{
                            marginRight: 27
                        }}
                    />
                </footer>
            </Modal>
        );
    }
}

ModalCropper.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    urlImage: PropTypes.string,
    handleCroppedImage: PropTypes.func.isRequired,
    pending: PropTypes.bool.isRequired,
    serverSideError: PropTypes.object
};

export default ModalCropper;
