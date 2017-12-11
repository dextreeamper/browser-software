import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const SigninOrSignoutLink = ({isLogged, onSignout}) => {

    const getLink = () => {
        // if the entity is logged, show the logout button
        if(isLogged){
            return (
                <button type="button" onClick={onSignout}>Vendor Logout</button>
            );
        }

        // if entity is not logged, display the log in link.
        return (
            <NavLink activeClassName="menu__link--active" to="/vendor/signin">Vendor Login</NavLink>
        );
    };

    return(
        <div>
            {getLink()}
        </div>
    );
};


SigninOrSignoutLink.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    onSignout: PropTypes.func.isRequired
};


export default SigninOrSignoutLink;