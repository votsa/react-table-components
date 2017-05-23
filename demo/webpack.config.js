const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  devServer: {
    contentBase: __dirname,
  },
  entry: {
    base_bootstrap: './base_bootstrap/index.jsx',
    material: './material/index.jsx',
  },
  output: {
    filename: './[name]/entry.js',
  },
  module: {
  rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
          }
        }
      ]
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [{
          loader: 'css-loader'
        }],
      })
    }
  ]},
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      'react-table-components': path.join(__dirname, '../src'),
      'styles': path.join(__dirname, '../styles'),
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name]/style.css',
    }),
  ]
};
