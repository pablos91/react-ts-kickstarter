var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var production = false;
var stage = false;
var environment = 'development';

var getOutputPath = () => {
    return (production) ? path.resolve(__dirname, 'dist') : (stage) ? path.resolve(__dirname, 'stage') : path.resolve(__dirname, 'tmp');
}

var API_URL = {
    production: JSON.stringify('https://maple.com.pl'),
    stage: JSON.stringify('https://test.maple.com.pl'),
    development: JSON.stringify('http://localhost:63155')
}

module.exports = function (env) {

    if (typeof (env) != 'undefined') {
        production = env.prod;
        stage = env.stage;
        environment = env.stage ? 'stage' : 'production';
        console.log(`Starting ${environment} build ...`);
    } else {
        console.log(`Starting development server ...`);
    }

    return {

        mode: environment,

        entry: {
            index: "./src/app.tsx"
        },

        output: {
            filename: "[name].js",
            path: getOutputPath(),
            jsonpFunction: 'customJsonp',
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: (production || stage) ? false : "source-map",

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"],
            alias: {
                'react-dom': '@hot-loader/react-dom'
            }
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
                    use: [
                        'css-hot-loader',
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: !production,
                            }
                        },
                        {
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
                }
            ]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    },
                    commons: {
                        name: 'commons',
                        chunks: 'initial',
                        minChunks: 2
                    }
                }
            }
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `[name].css`
            }),
            new webpack.ProvidePlugin({
                Promise: "bluebird"
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/tpl/index.html',
                minify: production,
                hash: production,
                title: 'React.TS Kickstarter (change me)',
                chunks: ["vendors", "commons", "index"]
            }),
            new webpack.DefinePlugin({
                'REACT_APP_API_URL': API_URL[environment]
            })
        ],
        devServer: {
            contentBase: path.join(__dirname, 'tmp'),
            host: 'localhost',
            hot: true,
            port: 5000,
            historyApiFallback: true,
            open: 'http://localhost:5000'
        }
    }
}