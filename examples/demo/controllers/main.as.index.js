/**
 * URL /
 **/
'use strict';

const debug   = require('debug')('lark.examples.demo.controllers.index');

debug('loading ...');

module.exports = {
    GET (ctx, next) {
        debug("GET /");
        ctx.body = 'It works!';
        return next();
    }
}

debug('loaded!');
