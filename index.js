/**
 * Module dependencies.
 */
var App = require('./lib/application');

module.exports = function lark(options){
  var app = new App(options);
  return app;
};
