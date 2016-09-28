/**
 * Config middleware, binds a clone of app.config to ctx
 **/
'use strict';

const $     = require('lodash');
const debug = require('debug')('lark.middlewares.config');

debug('loading ...');

function middleware (config = {}, app = {}) {
    return (ctx, next) => {
        debug('binding config ...');
        ctx.config = $.cloneDeep(app.config);
        return next();
    }    
}

debug('loaded!');
module.exports = middleware;
