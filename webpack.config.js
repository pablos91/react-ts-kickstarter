var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var production = false;
var stage = false;
var environment = 'development';

var getOutputPath = () => {
    return (production) ? path.resolve(__dirname, 'dist') : (stage) ? path.resolve(__dirname, 'stage') : path.resolve(__dirname, 'tmp');
}

var API_URL = {
    production: JSON.stringify('https://ikea-egift-ws.loyaltypoint.pl'),
    stage: JSON.stringify('https://ikea-egift-ws-stage.loyaltypoint.pl'),
    development: JSON.stringify('http://localhost:63155')
}

module.exports = function (env) { 

    
    
    if (typeof(env) != 'undefined')
    {
        console.log (env);
        production = env.prod;
        stage = env.stage;
        environment = env.stage ? 'stage' : 'production';
    }
    
    return {

    mode: environment,

    entry: {
        index: "./src/app.tsx"
    },

    output: {
        filename: "[name].js",
        path: getOutputPath(),
        libraryTarget: 'window'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: (production || stage) ? false : "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            logInfoToStdOut: true,
                            logLevel: 'info'
                        }
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: "css-loader", options: {
                            sourceMap: !production
                        },
                    },
                    {
                        loader: "postcss-loader", options: {
                            sourceMap: !production
                        },
                    },
                    {
                        loader: "sass-loader", options: {
                            sourceMap: !production
                        }
                    }]

                })
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './content/'
                        }
                    }
                ]
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({ jQuery: 'jquery', $: 'jquery', jquery: 'jquery' }),
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/tpl/index.html',
            minify: production,
            hash: production,
            title: 'React.TS Kickstarter (change me)'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'tmp'),
        host: 'localhost',
        port: 5000,
        historyApiFallback: true,
        open: 'http://localhost:5000'
    }
}}