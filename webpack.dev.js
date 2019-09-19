const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 3001,
    open: true,
  },
  devtool: 'cheap-module-eval-source-map',
});
