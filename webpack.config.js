const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());

process.env.NODE_ENV = 'production';

module.exports = () => ({
  target: 'node',
  mode: process.env.NODE_ENV,
  bail: true,
  devtool: 'cheap-module-source-map',
  entry: path.resolve(appDirectory, 'src/index.js'),
  output: {
    path: path.resolve(appDirectory, 'dist'),
    pathinfo: false,
    filename: 'index.js',
  },
  infrastructureLogging: {
    level: 'none',
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    modules: ['node_modules'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(appDirectory, 'src'),
          path.resolve(appDirectory, 'node_modules/dm.crypter'),
        ],
        loader: require.resolve('babel-loader'),
        options: {
          customize: require.resolve(
            'babel-preset-react-app/webpack-overrides',
          ),
          presets: [[require.resolve('babel-preset-react-app')]],
          babelrc: false,
          configFile: false,
          cacheDirectory: true,
          cacheCompression: false,
          compact: false,
        },
      },
    ],
  },
  performance: false,
});
