const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withAssetsImport = require('next-assets-import');
const withTypescript = require('@zeit/next-typescript');
const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack');
const path = require('path');

module.exports = withTypescript(withAssetsImport( withSass({
    webpack(config) {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
        config.resolve.alias = {
            'components': path.resolve('./components'),
            'static': path.resolve('./static'),
        }
        return config;
      }
})));