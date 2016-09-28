/**
 * Router middleware, dispatches requests to handler modules by their request urls
 **/
'use strict';

const debug   = require('debug')('lark.middlewares.router');

const Router  = require('lark-router');

debug('loading ...');

function router (config = {}, app) {
    debug('initializing router ...');
    const router = new Router(config);
    if ('string' === typeof config.directory) {
        router.load(config.directory);
    }
    return router.routes();
}

debug('loaded!');
module.exports = router;
