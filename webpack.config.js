var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var Dotenv = require('dotenv-webpack');

var production = process.env.NODE_ENV == "production";

var getOutputPath = () => {
    return (production) ? path.resolve(__dirname, 'dist') : path.resolve(__dirname, 'tmp');
}

module.exports = ({ target, electron }) => {

    let environment = target ?? "development";

    console.log(`Starting ${process.env.NODE_ENV} build for ${environment} environment ...`);

    return {

        target: electron ? 'electron-renderer' : 'web',
        mode: production ? "production" : "development",

        entry: {
            index: ["regenerator-runtime/runtime", "app.tsx"],
        },

        output: {
            filename: "[name].js",
            path: getOutputPath(),
            //: 'customJsonp',
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
                        {
                            loader: MiniCssExtractPlugin.loader
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
                    test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|pdf)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'content/[name].[hash][ext]'
                    }
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
            new Dotenv({
                path: `./.env.${environment}`
            }),
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
            // if you need another entries, you have to uncomment below code and point to the entrypoint
            // new HtmlWebpackPlugin({
            //     filename: 'otherpage.html',
            //     template: 'src/public/index.html',
            //     minify: production,
            //     hash: production,
            //     title: 'Othersite',
            //     chunks: ["vendors", "commons", "otherpage"]
            // })
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'tmp'),
            },
            host: 'localhost',
            hot: true,
            port: 5000,
            historyApiFallback: true,
            open: 'http://localhost:5000'
        }
    }
}