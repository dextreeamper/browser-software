require('manakin').global; // sets colors globally, for the `console` object.

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import router from './routes';

// importing the package that we will use for the webpack
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';
// importing local module.
import Auth from './libs/authenticate';

// ------------------------------------------------------- CONNECTION CONFIGURATION ------------------------------------------ //
mongoose.Promise = global.Promise;

// we will connect our app to mongodb in this file.
// example of connection - we are using mongoose package.
mongoose.connect(process.env.DB_HOST);

// we will check in here the status of our mongodb connection.
mongoose.connection // once function tells that we will register the event on this object and we listen only once.
        .once('open', () => console.success('The connection to the database is established!'))
        .on('error', (error) => console.error('Connection error: ', error)); // on function registering an event and listenting always.

// creating our express app.
const app = express();

// serve the static file using the built-in middleware.
app.use(express.static(path.join(__dirname, 'public')));

// ------------------------------------------------------- WEBPACK CONFIGURATION ---------------------------------------------- //
// middleware used for webpack
const compiler = webpack(webpackConfig);
// webpackMiddleware takes a webpack compiler - we use here our webpackConfig
// this will connect our webpack into the instance running server.
app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));


// --------------------------------------------------------- EXPRESS MIDDLEWARE -------------------------------------------------- //
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
// this will parse all the request json data.
app.use(bodyParser.json());
// this is to initialize the passport so that we can use it for our authentication.
app.use(Auth.initialize());
// middleware for our auth and api routes including the verification
app.use('/auth', router.auth);
app.use('/api', router.api);

// if the client will request a page, we want our server will send the index.html for a response
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});


export default app;
