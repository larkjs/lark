/**
 * Load middlewares according to the config
 **/
'use strict';

const assert  = require('assert');
const debug   = require('debug')('lark.load-middlewares');
const misc    = require('vi-misc');

module.exports = async (app) => {
    debug('load middlewares');
    if (!app.config.has('bootstrap/middlewares')) {
        debug('no middlewares in config');
        return;
    }
    const middlewares = app.config.get('bootstrap/middlewares');
    for (let middlewareName of middlewares) {
        if (middlewareName.startsWith('.')) {
            middlewareName = misc.path.absolute(middlewareName);
        }
        let middlewareGenerator = require(middlewareName);
        assert(middlewareGenerator instanceof Function,
            `middleware generator ${middlewareName} should be a Function `);
        let middleware = middlewareGenerator(app);
        if (middleware instanceof Promise) {
            middleware = await middleware;
        }
        if (middleware instanceof Function) {
            app.use(middleware);
        }
    }
};
