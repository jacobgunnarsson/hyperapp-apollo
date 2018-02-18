const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

const plugins = [
  new ExtractTextPlugin({
    filename: './app.css',
    allChunks: true,
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
]

module.exports = function webpackStuff(env) {
  if (env === 'production') {
    plugins.push(
      new UglifyJsPlugin({
        parallel: 4,
        uglifyOptions: {
          compress: {
            passes: 2,
            drop_console: true,
          },
        },
      }),
    )
  }

  return {
    entry: {
      './app': './src/index.ts',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'public')
    },
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          include: [path.resolve(__dirname, './')],
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: ['css-loader?importLoaders=1', 'postcss-loader', 'sass-loader'],
          }),
        },
      ],
    },
    devServer: {
      historyApiFallback: {
        index: 'index.html'
      },
    },
    plugins,
  }
}
