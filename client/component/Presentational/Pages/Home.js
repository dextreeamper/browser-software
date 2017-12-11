import React from 'react';

import SearchForm from '../Forms/SearchForm';
import request from '../../../../server/libs/request';

class Home extends React.Component{
    testingClientAPI = () => {
        request.get('/api/sample')
            .then((responseData) => {
                console.log('Successful data ', responseData);
            })
            .catch((error) => {
                console.log('Error ', error);
            });
    };
    onSubmit = (values) => {
        console.log(values); 
    };
    render(){
        this.testingClientAPI();

        return(
            <main className="container" role="site-main" id="siteMain">
                <div className="marginBottom--big">
                    <h1 className="hl--white">It’s Time to Unleash Your Software to the Australian NFP Market</h1>
                    <p className="italic p--white p--small">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo</p>
                </div>
                <div className="marginBottom--big">
                    <p className="p--white">What type of software are you looking for?</p>
                    <SearchForm.form onSubmit={this.onSubmit} />
                </div>
                <div>
                    <p className="p--white">Learn which software are fits you best</p>
                    <a href="" className="callToAction">Get Recommendations</a>
                </div>
            </main>
        );
    }
}

export default Home;

