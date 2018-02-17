const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

const plugins = [
  new ExtractTextPlugin({
    filename: './app.css',
    allChunks: true
  }),
  new webpack.optimize.ModuleConcatenationPlugin()
]

module.exports = function webpackStuff(env) {
  if (env === 'production') {
    plugins.push(
      new UglifyJsPlugin({
        parallel: 4
      })
    )
  }

  return {
    entry: ['./src/index.ts', './styles/app.scss'],
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, './public')
    },
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          include: [path.resolve(__dirname, './')]
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: ['css-loader?importLoaders=1', 'postcss-loader', 'sass-loader']
          })
        }
      ]
    },
    plugins
  }
}
