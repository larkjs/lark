/**
 * Module dependencies.
 */
var config = require('lark-config');
var App = require('./lib/application');


module.exports = function lark(options){
  var options = options || {};
  var directory = options.directory || 'configs';
  var app = App();
  app.config = config({
    env: app.env,
    directory: directory
  });
  return app;
};


