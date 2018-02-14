const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-table-components.min.js',
    library: 'ReactTableComponents',
    libraryTarget: 'umd',
  },
  externals: {
    react: {
      root: 'React',
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react',
    },
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
          },
        },
      ],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new LodashModuleReplacementPlugin({
      shorthands: true,
      collections: true,
      paths: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {
        comments: false,
      },
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false,
      },
    }),
    new FileManagerPlugin({
      onEnd: [
        {
          copy: [
            {
              source: 'src/styles/index.css',
              destination: 'dist/react-table-components.min.css',
            },
            {
              source: 'src/styles/*',
              destination: 'lib/styles/',
            },
          ],
        },
      ],
    }),
  ],
};
