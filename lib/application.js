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
var bootstrap = require('./bootstrap');
var middlewares = require('./middlewares');
var promisify = require('./promisify');

/**
 * enable middleware
 * @param config {object}
 * @param key {string}
 * @returns {boolean}
 * default return true
 */
var enable = function(config, key) {
    return !(typeof config === 'object' && typeof key === 'string' && config[key] && config[key].enable === false);
}

var configMiddleware = function(config){
    return function *(next){
        this.config = config;
        yield next;
    };
}

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
    if (typeof this.config.port !== 'number') {
        console.error('If you want use app.run, you need config port');
        throw new Error('If you want use app.run, you need config port');
    }
    if (enable(this.config, 'bootstrap')) {
        if(bootstrap(this, this.config.bootstrap).isMaster) {
            return;
        }
    }
    this.use(configMiddleware(this.config));
    if (enable(this.config, 'mvc')) {
        this.use(middlewares.mvc.middleware(this.config.mvc));
    }
    if (enable(this.config, 'router')) {
        this.use(middlewares.router(this.config.router));
    }
    this.listen(this.config.port, callback(this.config.port));
};


/**
 * Module exports.
 */
module.exports = Application;
