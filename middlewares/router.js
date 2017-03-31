/**
 * Middleware to route requests
 **/
'use strict';

const LarkRouter  = require('lark-router');

module.exports = (app) => {
    return app.router.routes();
};
