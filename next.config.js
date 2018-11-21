const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withAssetsImport = require('next-assets-import');
const withTypescript = require('@zeit/next-typescript');
const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack');
const path = require('path');
const withCSS = require('@zeit/next-css')

module.exports = withCSS(withTypescript(
  withAssetsImport(
    withSass({
      webpack(config) {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
        config.resolve.alias = {
            'actions': path.resolve('./actions'),
            'api': path.resolve('./api'),
            'components': path.resolve('./components'),
            'constans': path.resolve('./constans'),
            'containers': path.resolve('./containers'),
            'forms': path.resolve('./forms'),
            'helpers': path.resolve('./helpers'),
            'locales': path.resolve('./locales'),
            'pages': path.resolve('./pages'),
            'redux-config': path.resolve('./redux-config'),
            'sass': path.resolve('./sass'),
            'services': path.resolve('./services'),
            'shared': path.resolve('./shared'),
            'static': path.resolve('./static')
        }
        return config;
      }
    })
  )
));