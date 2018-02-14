const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'examples'),
  entry: {
    app: './app.jsx',
  },
  output: {
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'examples'),
    port: 8000,
  },
  module: {
    rules: [
      {
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
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'react-table-components': path.resolve(__dirname, 'src'),
      api: path.resolve(__dirname, 'examples/api'),
    },
    extensions: ['.js', '.jsx', '.css'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('develop'),
    }),
  ],
};
