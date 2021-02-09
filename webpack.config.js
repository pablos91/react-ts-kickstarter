var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OfflinePlugin = require('offline-plugin');

var production = false;
var stage = false;
var electron = false;
var environment = 'development';

var getOutputPath = () => {
    return (production) ? path.resolve(__dirname, 'dist') : (stage) ? path.resolve(__dirname, 'stage') : path.resolve(__dirname, 'tmp');
}

var API_URL = {
    production: JSON.stringify('/api'),
    stage: JSON.stringify('/api'),
    development: JSON.stringify('http://localhost:63155')
}

module.exports = function (env) {
    console.log(env);

    if (typeof (env) != 'undefined') {
        production = env.prod;
        stage = env.stage;
        electron = env.electron;
        environment = env.stage ? 'stage' : 'production';
        console.log(`Starting ${environment} build ...`);
    } else {
        console.log(`Starting development server ...`);
    }

    return {

        target: electron ? 'electron-renderer' : 'web',
        mode: environment,

        entry: {
            index: ["regenerator-runtime/runtime", "app.tsx"],
        },

        output: {
            filename: "[name].js",
            path: getOutputPath(),
            jsonpFunction: 'customJsonp',
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"],
            alias: {
                'react-dom': '@hot-loader/react-dom',
            },
            modules: [path.resolve(__dirname, 'src'), 'node_modules']
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
                                hmr: !(production || stage),
                            }
                        },
                        {
                            loader: "css-loader", options: {
                                sourceMap: true
                            },
                        },
                        {
                            loader: "postcss-loader", options: {
                                sourceMap: true
                            },
                        },
                        {
                            loader: "sass-loader", options: {
                                sourceMap: true
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
                    commons: {
                        name: 'commons',
                        chunks: 'initial',
                        minChunks: 2,
                        priority: 10
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
                template: 'src/public/index.html',
                minify: production,
                hash: production,
                title: 'Index',
                chunks: ["vendors", "commons", "index"]
            }),
            new HtmlWebpackPlugin({
                filename: 'otherpage.html',
                template: 'src/public/index.html',
                minify: production,
                hash: production,
                title: 'Othersite',
                chunks: ["vendors", "commons", "otherpage"]
            }),
            new webpack.DefinePlugin({
                'REACT_APP_API_URL': API_URL[environment]
            }),
            new OfflinePlugin({
                responseStrategy: production ? 'cache-first' : 'network-first',
                appShell: 'index.html',
                externals: [], // all the files that comes from outside the webpack
                exclude: ['/api/**'], // exlude from caching an api for example
                autoUpdate: 1000 * 60,
                ServiceWorker: {
                    events: true,
                    navigateFallbackURL: '/',
                },
                AppCache: false
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