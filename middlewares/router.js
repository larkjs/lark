/**
 * Router middleware, dispatches requests to handler modules by their request urls
 **/
'use strict';

import _debug   from 'debug';

import Router   from 'lark-router';

const debug = _debug('lark');

function router (app) {
    debug('middlewares/router.js - router() called');
    const config = app.config.router || {};
    const router = new Router(config);
    router.load(config.directory);
    return router.routes();
}

debug('middlewares/router.js - load');
export default router;
