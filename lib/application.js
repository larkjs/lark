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
var http = require('http');
var middlewares = require('./middlewares');

/**
 * Application constructor
 *
 */

function Application(options) {
  if (!(this instanceof Application)) return new Application(options);
  koa.call(this);
  this.config = config(options);
}

util.inherits(Application, koa);

var app = Application.prototype;

/**
 * run the application
 * use middleware
 */
app.run = function (callback) {
  this.listen(port,callback(port));
};

app.listen = function(){
  this.use(middlewares.mvc.middleware(this.config.mvc));
  this.use(middlewares.router(this.config.router));
  //this.use(middlewares.bootstrap(this, this.config.bootstrap));
  var server = http.createServer(this.callback());
  return server.listen.apply(server, arguments);
};

function checkConfig(config, key) {
  return !(config && config[key] && config[key]['enable'] === false);
}

/**
 * Module exports.
 */
module.exports = Application;
