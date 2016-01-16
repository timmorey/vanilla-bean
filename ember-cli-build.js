/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles = require('broccoli-static-compiler');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('bower_components/bootstrap-sass/assets/javascripts/bootstrap.js');

  app.import('bower_components/parse/parse.js');

  // Ace (json editor)
  //
  // We import the base js files normally, but the worker js files need to be
  // made available on the server so that ace can load them as needed.
  //
  app.import('bower_components/ace-builds/src-noconflict/ace.js');
  app.import('bower_components/ace-builds/src-noconflict/mode-json.js');
  const aceAssets = pickFiles('bower_components/ace-builds/src-noconflict', {
    srcDir: '/',
    files: ['worker-json.js', 'theme-mono_industrial.js'],
    destDir: '/assets/ace'
  });

  return app.toTree(aceAssets);
};
