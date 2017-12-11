import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import _throttle from 'lodash/throttle';

import { saveState } from './localStorage';
import store from './store';
import AppContainer from './component/Container/AppContainer';

// subscribe event will fire every time the state is changing.
// we user throttle function from lodash, creates a throttled function that only invokes func
// at most once per every wait milliseconds
store.subscribe(
    _throttle(() => {
        saveState({
            vendor: store.getState().vendor // we will save an object on the localStorage.
        });
    }, 1000)
);

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);
 
