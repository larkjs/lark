/**
 * Defination of class Lark
 **/
'use strict';

const $         = require('lodash');
const debug     = require('debug')('lark.Lark');
const instances = require('save-instance');
const path      = require('path');

const Koa         = require('koa');
const larkConfig  = require('lark-config');

const log     = require('../middlewares/log');

debug('loading ...');

/**
 * Define the Lark
 **/
class Lark extends Koa {
    constructor (options = null) {
        debug('constructing a new Lark instance ...');
        super();
        try {
            this.package = require(path.join(path.dirname(process.mainModule.filename), 'package.json'));
        }
        catch (e) {
            this.package = {};
        }

        if (!options && this.package.lark) {
            options = this.pacakge.lark.config || this.pacakge.lark.configs;
        }

        debug('loading configs ...');
        this.config = larkConfig(options);

        debug('loading lark middlewares which runs before user middlewares ...');
        if (!isDisabled(this.config.log)) {
            debug('loading lark middleware lark-log');
            this.use(log(this, this.config.log));
        }
    }
    listen (...args) {
        if (!this._larkMiddlewaresLoaded) {
            debug('loading lark middlewares which runs after user middlewares ...');
        }
        this._larkMiddlewaresLoaded = true;
        debug('listening ...');
        super.listen(...args);
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

/**
 * Bind middlewares as static properties of Lark for quick access
 **/
Lark.logger = log;

debug('loaded!');
module.exports = Lark;
