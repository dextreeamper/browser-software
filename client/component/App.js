import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter, Route } from 'react-router-redux';
import { Switch } from 'react-router-dom';
import { history } from '../store';
// importing our pages layout
import PublicVendorRoute from './Container/Layouts/PublicVendorPage';
import ProtectedVendorRoute from './Container/Layouts/ProtectedVendorPage';
import ProtectedVendorUnverifyEmailRoute from './Container/Layouts/ProtectedVendorUnverifyEmail';
import PublicRoute from './Container/Layouts/PublicPage';
import Header from './Presentational/Header';
import Footer from './Presentational/Footer';
import Breadcrumb from './Presentational/Breadcrumb';
// importing our pages container
import Home from './Presentational/Pages/Home';
import VisibleVendorPage from './Container/Pages/VisibleVendorPage';
import VendorAccountPage from './Container/Pages/VendorAccountPage';
import VendorConfirmationPage from './Container/Pages/VendorConfirmationPage';
import VendorSoftwaresPage from './Container/Pages/VendorProductListing';
import VendorAddSoftwarePage from './Presentational/Pages/VendorAddSoftwarePage';
import EmailVerify from './Container/Pages/EmailVerify';
import NoMatchPage from './Presentational/Pages/NoMatchPage';
// importing the sass here
import '../sass/1-templates/index.sass';

const App = ({isLoggedVendor, isVerified, vendorActions}) => {
    return(
        <ConnectedRouter history={history}>
            <div>
                <Header />    
                <Breadcrumb isLoggedVendor={isLoggedVendor} />
                <Switch>
                    {/*Anonymous Pages*/}
                    <PublicRoute exact isLoggedVendor={isLoggedVendor} path="/" component={Home} />

                    {/*Routes for Vendor*/}
                    <PublicVendorRoute exact isLoggedVendor={isLoggedVendor} path="/vendor/signin" component={VisibleVendorPage} />
                    <PublicVendorRoute exact isLoggedVendor={isLoggedVendor} path="/vendor/signup" component={VisibleVendorPage} />
                    <PublicRoute isLoggedVendor={isLoggedVendor} exact path="/vendor/verifyToken/:token" component={EmailVerify} />
                    <ProtectedVendorRoute exact isLoggedVendor={isLoggedVendor} isVerified={isVerified} path="/vendor/account/:vendorId" component={VendorAccountPage}/>
                    <ProtectedVendorRoute exact isLoggedVendor={isLoggedVendor} isVerified={isVerified} path="/vendor/softwares" component={VendorSoftwaresPage} />
                    <ProtectedVendorRoute exact isLoggedVendor={isLoggedVendor} isVerified={isVerified} path="/vendor/softwares/add" component={VendorAddSoftwarePage} />
                    <ProtectedVendorUnverifyEmailRoute exact isLoggedVendor={isLoggedVendor} isVerified={isVerified} path="/vendor/unverifyToken" component={VendorConfirmationPage}/>
                    {/*Error Pages*/}
                    <PublicRoute isLoggedVendor={isLoggedVendor} component={NoMatchPage}/>
                </Switch>
                <Footer
                    destroyLoggedVendor={vendorActions.destroyLoggedVendor}
                    isLoggedVendor={isLoggedVendor}
                    history={history}
                />
            </div>
        </ConnectedRouter>
    ); 
};

App.propTypes = {
    isLoggedVendor: PropTypes.bool.isRequired,
    isVerified: PropTypes.bool.isRequired,
    vendorActions: PropTypes.object.isRequired
}


export default App;
