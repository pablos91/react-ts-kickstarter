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
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin("[name].css"),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/tpl/index.html',
                minify: production,
                hash: production,
                title: 'React.TS Kickstarter (change me)'
            }),
            new webpack.DefinePlugin({
                'REACT_APP_API_URL': API_URL[environment]
            })
        ],
        devServer: {
            contentBase: path.join(__dirname, 'tmp'),
            host: 'localhost',
            port: 5000,
            historyApiFallback: true,
            open: 'http://localhost:5000'
        }
    }
}