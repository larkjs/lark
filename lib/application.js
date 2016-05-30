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
var path = require('path');
var clone = require('clone');
var pm = require('./pm');
var parsers = require('./body-parsers');
var DEFAULT_PORT = 3000;

/**
 * enable middleware
 * @param config {object}
 * @param key {string}
 * @param defaultValue {boolean} default value for config[key].enable
 * @returns {boolean}
 * default return true
 */
var enable = function (config, key, defaultValue) {
    if (false !== defaultValue) {
        defaultValue = true;
    }
    var result = defaultValue;
    if (typeof config === 'object' && typeof key === 'string' && config[key] && 'boolean' === typeof config[key].enable) {
        result = config[key].enable;
    }
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
    /**
     * Extend Koa
     **/
    koa.call(this);
    this.config = config(options);
    if (enable(this.config, 'logging')){
        logging.logging.configure(this.config.logging);
    }
    parsers(this, this.config.parsers);
}

util.inherits(Application, koa);

var app = Application.prototype;

/**
 * @param callback {function}
 * @param callback
 */
app.run = function (port, callback) {
    var configs = clone(this.config || {});
    if (typeof port === 'number') {
        configs.port = port;
        debug('app will running on', configs.port)
    }else if (typeof port === 'function') {
        callback = port;
    }
    if (typeof configs.port !== 'number') {
        configs.port = DEFAULT_PORT;
        debug('use default port ' + DEFAULT_PORT + '.');
    }
    if (enable(configs, 'bootstrap')) {
        configs.bootstrap = configs.bootstrap || {};
        configs.bootstrap.processManage = configs.bootstrap.processManage || {};
        if ('development' === configs.environment) {
            configs.bootstrap.processManage.enable = false;
            configs.bootstrap.processManage.instances = 1;
        }
        if (process.argv.indexOf('background') >= 2) {
            configs.bootstrap.processManage.background = true;
        }
        var pmConfig = configs.bootstrap.processManage;
        var _config = {
            'background':     true,
            'daemon-dirname': path.dirname(process.mainModule.filename),
            'log-file':       pmConfig.outputLog,
            'err-log-file':   pmConfig.errorLog,
            'control-prefix': pmConfig.larkArgPrefix,
        };
        pm.configure(_config);
        if (!pm.isWorker) {
            return;
        }
    }

    if (process.larkArgv && (process.larkArgv.delete || process.larkArgv.stop || process.larkArgv.kill)) {
        return;
    }

    this.use(configMiddleware(configs))
        .use(require('koa-static')('./statics', this.config.static))
    if (enable(configs, 'parsers')){
        this.use(parsers.middleware(configs.parsers));
    }
    if (enable(configs, 'logging')){
        this.use(logging.middleware(configs.logging)); 
    }
    if (enable(configs, 'mvc')) {
        this.use(mvc.middleware(configs.mvc, this));
    }
    if (enable(configs, 'views')) {
        this.use(views(configs.views));
    }
    if (enable(configs, 'router')) {
        this.use(router.call(this, configs.router));
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
