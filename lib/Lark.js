/**
 * Class Lark
 **/
'use strict';

const assert          = require('assert');
const debug           = require('debug')('lark.Lark');
const path            = require('path');

const Koa             = require('koa');
const LarkConfig      = require('lark-config');
const LarkMVC         = require('lark-mvc');
const LarkRouter      = require('lark-router');
const LarkRoutes      = require('lark-router-config');

const loadPackage     = require('./load-package');
const loadConfigs     = require('./load-configs');
const loadMiddlewares = require('./load-middlewares');

const DEFAULT_CONFIG_DIRECTORY  = path.join(__dirname, '../configs');
const CONFIG_NAME_SERVER_PORT   = 'server/port';

class Lark extends Koa {

    static get DEFAULT_CONFIG_DIRECTORY() { return DEFAULT_CONFIG_DIRECTORY; }
    static get CONFIG_NAME_SERVER_PORT() { return CONFIG_NAME_SERVER_PORT; }

    static get Model() { return LarkMVC.Model; }
    static get Controller() { return LarkMVC.Controller; }
    static get View() { return LarkMVC.View; }

    constructor(...args) {
        debug('constructing');
        super(...args);
        
        /**
         * Initialize properties
         **/
        debug('initialize properties');
        this.package  = loadPackage();
        this.config   = new LarkConfig();
        this.router   = new LarkRouter();
        this.routes   = new LarkRoutes();
        this.mvc      = new LarkMVC();

        debug('constructing done');
    }

    async initialize() {
        if (this._initialized) {
            return this;
        }
        this._initialized = true;

        await loadConfigs(this);
        await loadMiddlewares(this);
    }

    async start() {
        debug('starting an app');
        await this.initialize();

        assert(this.config.has(CONFIG_NAME_SERVER_PORT),
            `No server port found in config["${CONFIG_NAME_SERVER_PORT}"]`);
        const port = this.config.get(Lark.CONFIG_NAME_SERVER_PORT);

        const service = await new Promise(resolve => {
            let server = this.listen(port, () => resolve({port, server}));
        });

        debug('app started!');
        return service;
    }
}

module.exports = Lark;
