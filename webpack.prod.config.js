var webpack = require("webpack");

const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const paths = require('./paths');

module.exports = require('./webpack.config.js') ;
module.exports.optimization = {
    minimize: true,
    splitChunks: {
        cacheGroups: {
            vendor: {
                chunks: 'initial',
                name: 'vendor',
                test: /node_modules/,
                enforce: true
              }
        }
    },
    runtimeChunk: true,
    minimizer: [
        new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
            compress: {
                drop_console: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                dead_code: true,
                if_return: true,
                join_vars: true,
                warnings: false
              },
              output: {
                comments: false,
                ascii_only: true
              },
              ecma: 6,
              mangle: true
        },
        sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
            canPrint: true
          }),
          new webpack.optimize.AggressiveMergingPlugin(),
          new CompressionPlugin({   
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
          })
    ]
};

delete module.exports.devtool;
module.exports.plugins.pop;

module.exports.plugins.concat([
    new CleanWebpackPlugin(['public']),
    new webpack.DefinePlugin({
        'EObjectApiUrl': JSON.stringify('http://ec2-35-180-114-187.eu-west-3.compute.amazonaws.com:8080/http://ec2-35-180-86-175.eu-west-3.compute.amazonaws.com:8080/e-object-core-services'),
        'NonAuthApiUrl': JSON.stringify('http://ec2-35-180-114-187.eu-west-3.compute.amazonaws.com:8081'),
    }),
    new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id].[hash].css"
    }),
    new ManifestPlugin({
        fileName: 'asset-manifest.json',
    }),
    new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
]);

module.exports.module.rules.forEach(rule => {
    delete rule.exclude;
    return rule;
});