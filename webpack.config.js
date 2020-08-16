const path = require("path");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    //webpack-dev-server directly injects the bundle.js into html file inside the dist folder
    //start does not create update the bundle.js
    //build and dev create update the bundle.js
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }],
  },
};
