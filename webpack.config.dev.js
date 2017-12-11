import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// we will use extract plugin to compile the sass file into a separate file.
const extractPlugin = new ExtractTextPlugin({
    // after compiling it, we want the sass file into named main.css
    filename: 'main.css'
});


export default {
    // we can use source map for debugging.
    devtool: 'eval-source-map',
    entry: [
        'babel-regenerator-runtime',
        'webpack-hot-middleware/client',
        path.join(__dirname, '/client/index.js')],
    output: {
        // middleware will serve this file in memory instead of creating the actual bundle file.
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                use: ['react-hot-loader', 'babel-loader']
                
            },
            {
                test: /\.sass$/,
                use: [
                    { loader: 'style-loader', options: { sourceMap: true } },
                    { loader: 'css-loader', options: { sourceMap: true } },
                    // { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { souceMap: true } }
                ]
                // use: extractPlugin.extract(a{
                //     use: ['css-loader', 'sass-loader'] 
                // })
            }
        ]
    },
    plugins: [
        extractPlugin,
        new webpack.NoEmitOnErrorsPlugin(), // to display the error in nice information.
        new webpack.optimize.OccurrenceOrderPlugin(), // for consistent build hashes
        new webpack.HotModuleReplacementPlugin() // to use the hot reloading features.,
    ],
    resolve: {
        extensions: ['.js']
    }
};
