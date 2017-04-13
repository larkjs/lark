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

    if (app.config.has('mvc/proxy/controller')) {
        config.proxy = app.config.get('mvc/proxy/controller');
    }

    app.routes.inject(app.router, config);

    return app.router.routes();
};
