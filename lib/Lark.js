/**
 * Defination of class Lark
 **/
'use strict';

const $         = require('lodash');
const debug     = require('debug')('lark.Lark');
const assert    = require('assert');
const extend    = require('extend');
const instances = require('save-instance');
const path      = require('path');

const Koa         = require('koa');

const larkConfig  = require('lark-config');
const utils       = require('lark-utils');

const middleware  = require('../middleware');

debug('loading ...');

/**
 * Define the Lark
 **/
class Lark extends Koa {
    constructor (options = {}) {
        debug('constructing a new Lark instance ...');
        super();
        try {
            this.package = require(utils.path.absolute(options.package || 'package.json'));
        }
        catch (e) {
            this.package = {};
        }

        const configInPackage = larkConfig($.cloneDeep(this.package.lark || {}));
        options = larkConfig(options);

        options = extend(true, configInPackage, options);

        debug('loading configs ...');
        this.config = larkConfig(options);

        debug('loading lark middlewares which runs before user middlewares ...');

        this._loadInternalMiddlewares(['config', 'favicon', 'log', 'static']);

        debug('middlewares loaded!');
    }
    _loadInternalMiddlewares (middlewareList) {
        debug('loading internal middlewares ...');
        const loadedMiddlewares = [];

        for (let name of middlewareList) {
            if (isDisabled(this.config[name])) {
                continue;
            }
            debug('loading middleware ' + name);            
            this.use(middleware[name](this.config[name] || {}, this));
        }
    }
    listen (...args) {
        if (!this._larkMiddlewaresLoaded) {
            debug('loading lark middlewares which runs after user middlewares ...');
            this._loadInternalMiddlewares(['router']);
        }
        this._larkMiddlewaresLoaded = true;
        debug('listening ...');
        return super.listen(...args);
    }
}
instances(Lark);

/**
 * Test if a middleware is disabled by config
 **/
function isDisabled (config = {}) {
    if (config && config.enable === false) {
        return true;
    }
    return false;
}

debug('loaded!');
module.exports = Lark;
