const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    host: '192.168.1.70',
    port: 3000,
    open: true,
  },
});
