const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var inProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    entry: {
        app: [
            './src/js/index.js',
            './src/css/main.css',
            'bootstrap/dist/css/bootstrap.css'
        ],
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader"
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'file-loader?name=img/[name].[ext]'
            } 
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        
        new ExtractTextPlugin("css/style.css"),

        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common' // Specify the common bundle's name.
        })
    ],

};


if(inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}
