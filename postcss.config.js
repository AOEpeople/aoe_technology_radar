const postcssEasyImport = require('postcss-easy-import');
const postcssNested = require('postcss-nested');
const postcssCustomMedia = require('postcss-custom-media');
const postcssCssVariables = require('postcss-css-variables');
const postcssMqPacker = require('css-mqpacker');
const postcssAutoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    postcssEasyImport(),
    postcssNested(),
    postcssCustomMedia(),
    postcssCssVariables(),
    postcssMqPacker(),
    postcssAutoprefixer({
      browsers: '> 5%',
    }),
  ],
};
