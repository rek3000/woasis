const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    process: require.resolve('process/browser'),
    buffer: require.resolve('buffer/'),
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify'),
    path: require.resolve('path-browserify'),
    os: require.resolve('os-browserify/browser'),
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  return config;
};
