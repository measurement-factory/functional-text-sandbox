/*eslint-env node*/
var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "deploy-result"),
        libraryTarget: "umd",
        filename: "bundle.js"
    },
    plugins: [
        new webpack.optimize.DedupePlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    "babel-loader"
                ]
            }
        ]
    },
    devtool: "source-map"
};
