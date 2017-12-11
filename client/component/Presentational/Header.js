import React from 'react';
import { Link, NavLink } from 'react-router-dom';


class Header extends React.Component{
    render(){
        return(
            <header id="siteHeader" className="container">
                <nav> 
                    <div className="siteLogo">
                        <Link to="/">
                            {/*<img src="/images/logo.png" alt="site logo" />*/}
                            BrowseSoftware
                        </Link>
                    </div>
                    <button type="button" className="toggleMenuButton">
                        <i className="fa fa-bars icon--primary" aria-hidden="true"></i>
                        <span>Home</span>
                    </button>
                    <ul className="menu menu--vertical">
                        <li className="menu__link menu__link--login">
                            <Link to="/vendor/signin">Log-in</Link>
                        </li>
                        <li className="menu__link">
                            <Link to="search">Search</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}


export default Header;
