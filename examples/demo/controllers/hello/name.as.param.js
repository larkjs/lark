/**
 * Serve GET /hello/:name
 **/
'use strict';

const debug   = require('debug')('lark.examples.controllers.demo.hello.:name');

debug("loading ...");

module.exports = {
    GET (ctx, next) {
        debug("GET /hello/:name, name is " + ctx.params.name);
        ctx.body = 'Hello, ' + ctx.params.name;
        return next();
    }
}

debug("loaded!");
