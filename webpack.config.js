const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const SRC_DIR = path.join(__dirname, '/react-client/src');
const DIST_DIR = path.join(__dirname, '/react-client/dist');

module.exports = {
  entry: ['react-hot-loader/patch', `${SRC_DIR}/index.jsx`],
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        exclude: /node_modules|packages/,
        test: /\.jsx?/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    port: 8080,
    hot: true,
    open: false,
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        // pathRewrite: { '^/api': '' },
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true,
      },
      // '/peerjs': {
      //   target: 'http://localhost:3000',
      //   // ws: true,
      // },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
