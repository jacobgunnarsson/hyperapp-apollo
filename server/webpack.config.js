const path = require('path')
const NodemonPlugin = require('nodemon-webpack-plugin')
const webpack = require('webpack')

module.exports = function webpackStuff(env) {
  return {
    entry: ['./src/index.ts'],
    target: 'node',
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
    },
    plugins: [new NodemonPlugin()],
  }
}
