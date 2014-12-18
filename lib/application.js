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

app.listen = function(){
  if(enable(this.config, 'mvc')){
    this.use(middlewares.mvc.middleware(this.config.mvc));
  }
  if(enable(this.config, 'router')){
    this.use(middlewares.router(this.config.router));
  }
  if(enable(this.config, 'bootstrap')){
    this.use(middlewares.bootstrap(this, this.config.bootstrap));
  }
  var server = http.createServer(this.callback());
  return server.listen.apply(server, arguments);
};

function enable(config, key) {
  return !(config && config[key] && config[key]['enable'] === false);
}

/**
 * Module exports.
 */
module.exports = Application;
