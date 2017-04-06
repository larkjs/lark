/**
 * Middleware to route requests
 **/
'use strict';

const assert      = require('assert');
const LarkRoutes  = require('lark-router-config');

module.exports = (app) => {
    const config = app.config.get('routes');
    assert(config instanceof Object, 'No routes found');
    assert('string' === typeof config.directory, 'No routing handlers directory found');

    if (config.routes) {
        app.routes.use(config.routes);
    }
    else {
        app.routes.use(config.directory);
    }

    config.proxy = (target) => {
        app.mvc.use(target);
        return async (ctx) => {
            return await app.mvc.dispatch(target, ctx);
        };
    };

    app.routes.inject(app.router, config);

    return app.router.routes();
};
