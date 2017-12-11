import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { loadState } from './localStorage';
import rootReducer from './reducers/index';

const logger = createLogger({
    // options
});

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const capturedActions = routerMiddleware(history);
// declaring our middlewares that we want to use in our store.
const middlewares = applyMiddleware(capturedActions, thunk, logger);
// load up the the state that is persisted on the local storage
const persistedState = loadState();

// creating our store.
const store = createStore(
    rootReducer,
    persistedState,
    middlewares
);


export default store;
