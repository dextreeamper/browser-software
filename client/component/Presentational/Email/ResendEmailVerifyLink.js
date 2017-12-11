/**
 * Created by dennismacbookpro on 13/07/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import DisplayLoaderOrButton from '../DisplayLoaderOrButton';

class ResendEmailVerifyLink extends React.Component {
    constructor(){
        super();
        this.state = {
            message: ''
        };
    }
    onResendEmail = () => {
        const { jwt, vendorAction } = this.props;
        const { resendEmailVerify} = vendorAction;
        resendEmailVerify(jwt)
            .then((data) => {
                this.setState({
                    message: data.message
                });
            })
            .catch((error) => {
                this.setState({
                    message: error.message
                });
            });
    };
    render(){
        let messageUI;
        if(this.state.message){
            messageUI = (
                <p>{this.state.message}</p>
            );
        }
        return (
            <div className="resendLink-box">
                <DisplayLoaderOrButton
                    pending={this.props.pending}
                    actionUI={<button onClick={this.onResendEmail} className="buttonLink">Resend verification email</button>}
                    inlineStyles={{
                        marginLeft: 25
                    }}
                />
                {messageUI}
            </div>
        );
    }
}

ResendEmailVerifyLink.propTypes = {
    vendorAction: PropTypes.object.isRequired,
    jwt: PropTypes.string.isRequired,
    pending: PropTypes.bool.isRequired
};

export default ResendEmailVerifyLink;