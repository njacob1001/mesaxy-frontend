const webpack = require('webpack');
const path = require('path');

const srcDir = path.resolve(__dirname, 'src');
const publicDir = path.resolve(__dirname, 'public');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');


module.exports = {
  context: srcDir,
  devtool: 'source-map',
  entry: {
    script: './index.jsx'
  },
  output: {
    path: publicDir,
    filename: '[name].js',
    publicPath: './',
    sourceMapFilename: 'main.map'
  },
  devServer: {
    contentBase: srcDir,
    publicPath: '/',
    historyApiFallback: true,
    compress: true,
    open: true,
    hot: true,
    stats: 'errors-only',
    port: 3000,
    openPage: ''
  },
  resolve: {
    extensions: ['.jsx', '.webpack.js', '.web.js', '.js', '.json']
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: 'json-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          'file-loader?name=[path][name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /\.(ttf|eot|woff2?|mp4|txt|xml)$/,
        use: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'template.html'),
      filename: 'index.html',
      favicon: './assets/img/favicon.ico',
      chunks: ['script']
    }),
    new WebpackPwaManifest({
      name: 'App name here',
      short_name: 'App',
      description: 'description of the App here',
      orientation: 'portrait',
      display: 'standalone',
      start_url: 'index.html?utm=homescreen',
      scope: './',
      lang: 'en',
      background_color: '#D24F56',
      theme_color: '#2279D7',
      icons: [{
        src: path.resolve('src/assets/img/jacob-icon.png'),
        sizes: [16, 32, 64, 96, 128, 192, 256, 384, 512, 1024],
        type: 'img/png'
      }],
      fingerprints: false
    })
  ]
};
