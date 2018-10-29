const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withAssetsImport = require('next-assets-import');
const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript(withAssetsImport( withSass()));