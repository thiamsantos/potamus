var webpack = require('webpack');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: './dist/js',
    filename: 'main.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    })
  ]
}
