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
var http = require('http');
var clone = require('clone');
var bootstrap = require('./bootstrap');
var middlewares = require('./middlewares');
var promisify = require('./promisify');

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

Application.promisify = promisify.promisify;
Application.promisifyAll = promisify.promisifyAll;
Application.http = promisify.http;

var app = Application.prototype;
/**
 * @param port {number}
 * @param callback {function}
 * @returns {*|Server}
 */
app.listen = function () {
    var server = http.createServer(this.callback());
    return server.listen.apply(server, arguments);
};

/**
 * @param callback {function}
 * @param callback
 */
app.run = function (callback) {
    // deep cloning of `this.config`
    var configs = clone(this.config);

    if (typeof configs.port !== 'number') {
        throw new Error('If you want use app.run, you need config port');
    }
    if (enable(configs, 'bootstrap')) {
        if(bootstrap(this, configs.bootstrap).isMaster) return;
    }
    this.use(configMiddleware(configs));
    if (enable(configs, 'mvc')) {
        this.use(middlewares.mvc.middleware(configs.mvc));
    }
    if (enable(configs, 'views')){
        this.use(middlewares.views(configs.views));
    }
    if (enable(configs, 'router')) {
        this.use(middlewares.router(configs.router));
    }
    this.listen(configs.port, callback(configs.port));
};

/**
 * enable middleware
 * @param config {object}
 * @param key {string}
 * @returns {boolean}
 * default return true
 */
function enable(config, key) {
    return !(typeof config === 'object' && typeof key === 'string' && config[key] && config[key]['enable'] === false);
}

function configMiddleware(config){
    return function *(next){
        this.config = config;
        yield next;
    }
}

/**
 * Module exports.
 */
module.exports = Application;
