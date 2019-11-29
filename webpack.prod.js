const path = require('path');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[hash:20].js',
    path: buildPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          presets: ['env'],
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              // translates CSS into CommonJS
              loader: 'css-loader',
            },
            {
              // Runs compiled CSS through postcss for vendor prefixing
              loader: 'postcss-loader',
            },
            {
              // compiles Sass to CSS
              loader: 'sass-loader',
            },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|webp|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:20].[ext]',
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
        options: {
          removingTagAttrs: ['xmlns'],
        },
      },
      {
        test: /\.woff?$/,
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[hash:20].[ext]',
        },
      },
      {
        test: /\.woff2?$/,
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[hash:20].[ext]',
        },
      },
      {
        test: /\.ya?ml$/,
        loader: ['json-loader', 'js-yaml-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyURLs: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
      },
    }),
    new CleanWebpackPlugin(buildPath),
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: './src/assets/logo.png',
      // The prefix for all image files (might be a folder or a name)
      prefix: 'icons-[hash]/',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
      // Inject the html into the html-webpack-plugin
      inject: true,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: '#008cd2',
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      title: 'Nikolai Nolan',

      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: true,
        appleIcon: { offset: 10 },
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
    new RobotstxtPlugin(),
    new ExtractTextPlugin('styles.[hash].css', {
      allChunks: true,
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
    }),
    new StyleExtHtmlWebpackPlugin(),
    new CopyPlugin([
      { from: './src/original', to: 'original' },
    ]),
  ],
};
