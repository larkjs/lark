/**
 * lark.js - lib/application.js
 * Copyright(c) 2014 larkjs-team
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var util = require('util');
var koa = require('koa');
var config = require('lark-config');
var logging = require('lark-log');
var mvc = require('lark-mvc');
var router = require('lark-router');
var views = require('lark-views');
var debug = require('debug')('lark:application');
var clone = require('clone');
var bootstrap = require('./bootstrap');
var errorHandler = require('./errorHandler');
var DEFAULT_PORT = 3000;

/**
 * enable middleware
 * @param config {object}
 * @param key {string}
 * @returns {boolean}
 * default return true
 */
var enable = function (config, key) {
    var result = !(typeof config === 'object' && typeof key === 'string' && config[key] && config[key].enable === false);
    debug('middleware:', key, 'enable', result);
    return result;
};

var configMiddleware = function (config) {
    return function *(next) {
        this.config = config;
        yield next;
    };
};

/**
 * Application constructor
 *
 */

function Application(options) {
    if (!(this instanceof Application)) {
        return new Application(options);
    }
    koa.call(this);
    this.config = config(options);
    if (enable(this.config, 'logging')){
        logging.logging.configure(this.config.logging);
    }
}

util.inherits(Application, koa);



var app = Application.prototype;

/**
 * @param callback {function}
 * @param callback
 */
app.run = function (port, callback) {
    // deep cloning of `this.config`
    var configs = clone(this.config || {});
    if (typeof port === 'number') {
        configs.port = port;
        debug('app will running on', configs.port)
    }else if (typeof port === 'function') {
        callback = port;
        configs.port = DEFAULT_PORT;
        debug('use default port 3000.');
    }else{
        configs.port = DEFAULT_PORT;
        debug('use default port 3000.');
    }
    if (enable(configs, 'bootstrap')) {
        if ('development' == configs.environment) {
            configs.bootstrap = configs.bootstrap || {};
            configs.bootstrap.processManage = configs.bootstrap.processManage || {};
            configs.bootstrap.processManage.enable = false
        }
        if (bootstrap(this, configs.bootstrap).isMaster) {
            return;
        }
    }

    this.use(configMiddleware(configs))
        .use(require('koa-static')('./statics', this.config.static))
        .use(require('koa-bodyparser')());
    if (enable(configs, 'logging')){
        this.use(logging.middleware());
    }
    if (enable(configs, 'errorHandling')) {
        configs.errorHandling = configs.errorHandling || {};
        this.use(errorHandler(configs.errorHandling));
    }
    if (enable(configs, 'mvc')) {
        this.use(mvc.middleware(configs.mvc, this));
    }
    if (enable(configs, 'views')) {
        this.use(views(configs.views));
    }
    if (enable(configs, 'router')) {
        this.use(router(configs.router));
    }
    if (typeof callback === 'function') {
        return this.listen(configs.port, callback(configs.port));
    } else {
        return this.listen(configs.port);
    }
};

/**
 * Use the given middleware `fn` and let it execute first.
 *
 * @param {GeneratorFunction} fn
 * @return {Application} self
 * @api public
 */

app.unshift = function unshift(fn){
  assert(fn && 'GeneratorFunction' == fn.constructor.name, 'app.unshift() requires a generator function');
  debug('unshift %s', fn._name || fn.name || '-');
  this.middleware.unshift(fn);
  return this;
}

/**
 * Module exports.
 */
module.exports = Application;
