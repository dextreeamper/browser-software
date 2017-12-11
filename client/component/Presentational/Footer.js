import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';

import SigninOrSignoutLink from './SigninOrSignoutLink';
import SubscribeForm from './Forms/SubscribeForm';

class Footer extends React.Component{
    onSubmit = (values) => {
    };
    signOutVendor = () => {
        this.props.destroyLoggedVendor();
        // redirect to vendor signin.
        this.props.history.push('/vendor/signin');
    };
    render(){
        return(
            <footer id="siteFooter" className="container">
                <div className="row group">
                    <div className="marginBottom--small row__col-3">
                        <span className="text text--large"> Join our mailing list </span>
                        <SubscribeForm.form onSubmit={this.onSubmit} />            
                    </div>
                    <div className="marginBottom--small row__col-3">
                        <span className="text text--large">Link</span>
                        <ul className="menu menu--vertical footerMenu">
                            <li className="menu__link">
                                <NavLink activeClassName="menu__link--active" to="/about">About</NavLink>
                            </li>
                            <li className="menu__link">
                                <NavLink activeClassName="menu__link--active" to="/listing">Listing</NavLink>
                            </li>
                            <li className="menu__link">
                                <NavLink activeClassName="menu__link--active" to="/contact">Contact</NavLink>
                            </li>
                            <li className="menu__link">
                                <NavLink activeClassName="menu__link--active" to="/legal">Legal</NavLink>
                            </li>
                            <li className="menu__link">
                                <NavLink activeClassName="menu__link--active" to="/user">User</NavLink>
                            </li>
                            <li className="menu__link">
                                <SigninOrSignoutLink onSignout={this.signOutVendor} isLogged={this.props.isLoggedVendor} />
                            </li>
                        </ul>
                    </div>
                    <div className="marginBottom--small row__col-3">
                        <span className="text text--large">Contacts</span>
                        <span className="text">901 North Glebe Road <br/> Suite 1010 Arlington, <br/> VA 22203</span>
                        <span className="text">(703) 994-4500 <br /> <a href="">info@capterra.com</a></span>                                                
                    </div>
                    <div className="marginBottom--small row__col-3">
                        <span className="text text--large">Social</span>            
                        <ul className="menu menu--horizontal socialMenu">
                            <li className="menu__link">
                                <a href="">
                                    <i className="fa fa-facebook-square"></i>
                                </a>
                            </li>
                            <li className="menu__link">
                                <a href="">
                                    <i className="fa fa-cog"></i>
                                </a>
                            </li>
                            <li className="menu__link">
                                <a href="">
                                    <i className="fa fa-google-plus-square"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <p className="dottedLine"></p>
                <span className="text text--small">
                    Copyright 2016. SAM4NFP's. All rights reserved.
                </span>
            </footer>
        ); 
    }
}

Footer.propTypes = {
    isLoggedVendor: PropTypes.bool.isRequired,
    destroyLoggedVendor: PropTypes.func.isRequired,
    history: PropTypes.object
};

export default Footer;


