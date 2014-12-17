/**
 * lark.js - lib/application.js
 * Copyright(c) 2014 larkjs-team
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */

var util = require('util');
var koa = require('koa');
var config = require('lark-config');
var middlewares = require('./middlewares');

/**
 * Application constructor
 *
 */

function Application(options) {
  if (!(this instanceof Application)) return new Application(options);
  koa.call(this);
  this.use(config(this, options));
}

util.inherits(Application, koa);

var app = Application.prototype;

/**
 * run the application
 * use middleware
 */
app.run = function () {
  if (checkConfig(this.configs, 'mvc')) {
    this.use(middlewares.mvc.middleware());
  }

  if (checkConfig(this.configs, 'router')) {
    this.use(middlewares.router(this.configs.router));
  }

  if (checkConfig(this.configs, 'bootstrap')) {
    this.use(middlewares.bootstrap(this));
  }
  var port = this.configs.port;
  this.listen(port, function () {
    console.log('lark is running on', port);
  });
};

function checkConfig(config, key) {
  return !(config && config[key] && config[key]['enable'] === false);
}

/**
 * Module exports.
 */
module.exports = Application;
