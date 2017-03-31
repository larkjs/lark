/**
 * Defination of class Lark
 **/
'use strict';

const assert      = require('assert');
const misc        = require('vi-misc');
const path        = require('path');

const Koa         = require('koa');
const LarkConfig  = require('lark-config');
const LarkRouter  = require('lark-router');

class Lark extends Koa {

    constructor(...args) {
        super(...args);
        try {
            this.pkg = require(path.join(misc.path.root, 'package.json'));
            this.pkg = this.pkg['lark'] || {};
        }
        catch (e) {
            this.pkg = {};
        }
        this._custom_middlewares = [];
        this._servers = [];
        this.config = new LarkConfig(this.pkg['configs'] || path.join(__dirname, '../configs'));
        this.router = new LarkRouter();
    }

    start(options = {}) {
        for (const key in options) {
            this.config.set(key, options[key]);
        }

        const middlewares = this.config.get('bootstrap/middlewares');
        for (const middlewareName of middlewares) {
            let middleware = null;
            let candidates = [middlewareName, misc.path.absolute(middlewareName),
                path.join(__dirname, '../middlewares', middlewareName)];
            for (let name of candidates) {
                try { middleware = require(name); } catch (e) { middleware = null; continue; }
                break;
            }
            assert(middleware instanceof Function, `Middleware ${middlewareName} is not a function`);
            this.use(middleware(this));
        }

        assert(this.config.has('server/port'), 'No server port found int config["server/port"]');
        return new Promise(resolve => {
            const port = this.config.get('server/port');
            let server = null;
            server = this.listen(port, () => {
                resolve({port, server});
            });
            this._servers.push(server);
        });
    }
}

module.exports = Lark;
