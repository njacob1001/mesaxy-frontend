const glob = require('glob-all');
const path = require('path');
const webpack = require('webpack');

const srcDir = path.resolve(__dirname, 'src');
const publicDir = path.resolve(__dirname, 'public');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const copyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  context: srcDir,
  entry: {
    main: './index.jsx'
  },
  output: {
    path: publicDir,
    filename: '[name]-[contenthash].js', /* Agregar .[hash] */
    publicPath: './',
    sourceMapFilename: 'main.map'
  },
  devServer: {
    contentBase: publicDir,
    publicPath: '/',
    historyApiFallback: true,
    compress: true,
    open: true,
    port: 3001,
    openPage: ''
  },
  resolve: {
    extensions: ['.jsx', '.webpack.js', '.web.js', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: 'json-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          'postcss-loader',
          'sass-loader'
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
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css'

    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } }
    }),
    new PurifyCSSPlugin({
      paths: glob.sync([
        path.join(__dirname, 'src/*.html'),
        path.join(__dirname, 'src/**/*.jsx')
      ])
    }),
    new HtmlWebpackPlugin({
      title: 'MesaXY',
      filename: 'index.html', /** insertar .[hash] */
      template: path.join(srcDir, 'template.html'),
      description: 'Visualiza el estado de la mesa XY de la universidad Autonoma de Occidente',
      favicon: './assets/img/favicon.ico',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new WebpackPwaManifest({
      name: 'Jacob Gonzalez',
      short_name: 'Jacob',
      description: 'Visualiza el estado de la mesa XY de la universidad Autonoma de Occidente',
      orientation: 'portrait',
      display: 'standalone',
      start_url: 'index.html?utm=homescreen',
      scope: './',
      lang: 'en',
      background_color: '#24243E',
      theme_color: '#24243E',
      icons: [{
        src: path.resolve('src/assets/img/jacob-icon.png'),
        sizes: [16, 32, 64, 96, 128, 192, 256, 384, 512, 1024],
        type: 'img/png'
      }],
      fingerprints: false
    }),
    new copyWebpackPlugin([
      /* { from: 'sw.js' }, */
      { from: 'assets/img/og-image.jpg', to: 'assets/img/og-image.jpg' }
    ]),
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'nombre-de-proyecto',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: true,
        navigateFallback: path.join(publicDir, 'index.html')/* ,
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/], */
      }
    )
  ]
};
