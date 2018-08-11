'use strict';

var fs = require('fs');
var path = require('path');
var SVGO = require('svgo');

var svgo = new SVGO({
  plugins: [{
    removeUselessStrokeAndFill: false
  }]
});

module.exports.register = function (Handlebars) {

  /**
  * {{inline}}
  *
  * Inlines code from an external file.
  * The first parameter requires a path to the file you want to embed.
  *
  * NOTE: SVGs are optimized using svgo. If you are including CSS or JS,
  * use the following configuration for html-minifier:
  *   {
  *     minifyJS: true,
  *     minifyCSS: true
  *   }
  *
  *  Output is HTML escaped by default. To skip escaping use the "triple-stash": {{{
  *
  * @syntax:
  *   {{ inline [file] }}
  * @usage:
  *   {{{inline 'path/to/file.svg'}}}
  */

  Handlebars.registerHelper('inline', function (src) {

    var content = fs.readFileSync(src, 'utf8');
    var extension = path.extname(src).replace(/^(\.)/gm, '');
    var output;

    switch (extension) {
      case 'svg':
        svgo.optimize(content, function (result) {
          output = result.data;
        });
        break;

      default:
        output = content;

    }

    return output;

  });

};
