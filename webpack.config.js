const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  outDir: path.resolve(__dirname, 'dist'),
  src: path.resolve(__dirname, 'src')
};

module.exports = {
  entry: `${paths.src}/index.jsx`,
  output: {
    publicPath: '/',
    path: paths.outDir,
    filename: 'main.js'
  },

  devServer: {
    compress: true,
    contentBase: paths.outDir,
    historyApiFallback: true,
    useLocalIp: true,
    host: '0.0.0.0',
    overlay: {
      warnings: true,
      errors: true
    }
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/,
        include: paths.src,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          // Save disk space when time isn't as important
          cacheCompression: true,
          compact: true
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'testing'
    })
  ]
};
