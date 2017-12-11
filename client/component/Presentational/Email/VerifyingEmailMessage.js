import React from 'react';
import PropTypes from 'prop-types';

const VerifyingEmailMessage = ({icon, iconErrorState, title, desc, actionElement}) => {
    return (
        <div className="container-email-vendor">
            <div className="emailBox emailBox--small">
                <span>
                    <i className={`fa fa-${icon} icon--${iconErrorState}`} aria-hidden="true"></i>
                </span>
                <div className="info">
                    <p>
                        <b>{title}</b>
                    </p>
                    <p>{desc}</p>
                    {actionElement}
                </div>
            </div>
        </div>
    );
};

VerifyingEmailMessage.propTypes = {
    icon: PropTypes.string.isRequired,
    iconErrorState: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    actionElement: PropTypes.element.isRequired
};

export default VerifyingEmailMessage;