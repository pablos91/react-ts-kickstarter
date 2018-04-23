var path = require('path');
var webpack = require('webpack');
var InjectHtmlPlugin = require('inject-html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var production = false;

module.exports = function (env) { 
    
    if (typeof(env) != 'undefined')
    {
        console.log (env);
        production = env.prod;
    }
    
    return {


    entry: {
        index: "./src/app.tsx"
    },

    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname + '/dist/'),
        libraryTarget: 'window'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

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
        new InjectHtmlPlugin({
            filename:'./index.html',
            chunks:['index'],
            customInject:[{
                start:'<!-- start:build -->',
                end:'<!-- end:build -->',
                content: (production) ? '<!-- PRODUCTION BUILD -->' : '<!-- DEVELOPMENT BUILD -->'
            }]
        })
    ],
    devServer: {
        host: 'localhost',
        port: 3009
    }
}}