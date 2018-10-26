const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withAssetsImport = require('next-assets-import')
module.exports = withAssetsImport( withSass());
