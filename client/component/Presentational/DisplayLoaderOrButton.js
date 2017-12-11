/**
 * Created by dennismacbookpro on 27/07/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

import '../../sass/1-templates/loader.sass';

const DisplayLoaderOrButton = ({pending, actionUI, inlineStyles}) => {
    if(pending)
        return (
            <div className="loaderContainer" style={inlineStyles}>
                <div className="loader">Loading...</div>
            </div>
        );

    return(
        actionUI
    );
};

DisplayLoaderOrButton.propTypes = {
    pending: PropTypes.bool.isRequired,
    actionUI: PropTypes.node.isRequired,
    inlineStyles: PropTypes.object
};

export default DisplayLoaderOrButton;
