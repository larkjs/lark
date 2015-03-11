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
var debug = require('debug')('lark:application');
var clone = require('clone');
var log = require('lark-log');
var bootstrap = require('./bootstrap');
var errorHandler = require('./errorHandler');
var middlewares = require('./middlewares');
var promisify = require('./promisify');

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

var logMiddleware = function (config){
    return function *(next){
        this.log = log(config);
        yield next;
    }
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
}

util.inherits(Application, koa);

Application.promisify = promisify.promisify;
Application.promisifyAll = promisify.promisifyAll;
Application.http = promisify.http;
Application.mvc = middlewares.mvc;
Application.router = middlewares.router;
Application.log = log;

var app = Application.prototype;

/**
 * @param callback {function}
 * @param callback
 */
app.run = function (port, callback) {
    // deep cloning of `this.config`
    var configs = clone(this.config);
    if (port && typeof port === 'number') {
        configs.port = port;
        debug('app will running on', configs.port)
    }
    if (port && typeof port === 'function') {
        callback = port;
    }
    if (typeof configs.port !== 'number') {
        throw new Error('If you want use app.run, you need config port');
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
        .use(require('koa-static')('./statics'))

    if (enable(configs, 'log')){
        this.use(logMiddleware(configs.log));
    }
    if (enable(configs, 'errorHandling')) {
        this.use(errorHandler(configs.errorHandling));
    }
    if (enable(configs, 'mvc')) {
        this.use(middlewares.mvc.middleware(configs.mvc));
    }
    if (enable(configs, 'views')) {
        this.use(middlewares.views(configs.views));
    }
    if (enable(configs, 'router')) {
        this.use(middlewares.router(configs.router));
    }
    if (typeof callback === 'function') {
        return this.listen(configs.port, callback(configs.port));
    } else {
        return this.listen(configs.port);
    }
};


/**
 * Module exports.
 */
module.exports = Application;
