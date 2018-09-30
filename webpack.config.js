var path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
//const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const webpackMode = require('webpack-mode');
const paths = require('./paths');

module.exports =  {
    bail: true,
    entry: {
        vendor: ['react', 'react-dom', 'redux','react-redux','cross-fetch','prop-types','redux-logger',
        'react-loadable','reactstrap','react-router','react-router-config','react-router-dom',
        'react-collapsible','redux-thunk','react-search-input','react-data-grid'],
        main: './index.js'
    },
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'public'),
        chunkFilename: '[name].[chunkhash].bundle.js',
        publicPath: '/'
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
        hints: false
    },
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    context: path.resolve(__dirname, 'src'),
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        //stats: 'errors-only',
        disableHostCheck: true,
        open: true,
        port: 3000,
        compress: true,
	   // host: '0.0.0.0',
        hot: true,
        historyApiFallback: true
    },
    devtool: (webpackMode.isDevelopment) ? 'inline-source-map' : false,
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true,
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'EObjectApiUrl': JSON.stringify('http://ec2-35-180-114-187.eu-west-3.compute.amazonaws.com:8080/http://ec2-35-180-86-175.eu-west-3.compute.amazonaws.com:8080/e-object-core-services'),
            'NonAuthApiUrl': JSON.stringify('http://ec2-35-180-114-187.eu-west-3.compute.amazonaws.com:8081'),
            'mylocalhost': JSON.stringify('http://localhost:8080')
        }),
        new MiniCssExtractPlugin({
            filename:   (webpackMode.isDevelopment) ? '[name].css' : '[name].[hash].css',
            chunkFilename:   (webpackMode.isDevelopment) ? '[id].css' : '[id].[hash].css',
        }),
        new CaseSensitivePathsPlugin(),
        new webpack.LoaderOptionsPlugin({ options: {} }),
        new webpack.NamedModulesPlugin()
    ],
    module: {
        strictExportPresence: true,
        rules: [
        {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                use: [
                  {
                    options: {
                      formatter: eslintFormatter,
                      eslintPath: require.resolve('eslint'),
        
                    },
                    loader: require.resolve('eslint-loader'),
                  },
                ],
                include: paths.appSrc,
        },
        {
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['env', 'stage-0', 'react']
                }
            },
            exclude: /node_modules/,
            include: paths.appSrc
        }, {
            test: /\.html$/,
            use: ['html-loader']
        }, {
            test: /\.(jpg|png|gif|svg)$/,
            use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './assets/img',
                        }
                    }
                ]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader']
        },
        {
            test: /\.(scss|sass|css)$/,
            use: [
                (webpackMode.isDevelopment) ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ],
        }
        ]
    }
}
