/**
 * Created by leetdigitalmac01 on 19/06/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';

const NoMatchPage = ({ location }) => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
);

NoMatchPage.propTypes = {
    location: PropTypes.object.isRequired
};


export default NoMatchPage;