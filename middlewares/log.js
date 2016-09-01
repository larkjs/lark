/**
 * Log middleware with Lark-Log
 **/
'use strict';

const $       = require('lodash');
const debug   = require('debug')('lark.middleware.lark-log');
const assert  = require('assert');
const bytes   = require('bytes');

const LarkLogger  = require('lark-log');

debug('loading ...');

function middleware (app, config = {}) {
    debug('middleware() called ...');
    assert(config instanceof Object, 'log middleware config should be an object');
    const logger = new LarkLogger(config);
    debug('lark logger initialized');
    app.logger = logger;

    let accessMethod = config.accessMethod || 'access';
    assert('string' === typeof accessMethod && logger[accessMethod] instanceof Function, 'Access method [' + accessMethod + '] should be a function!');
    debug('access method confirmed');

    debug('middleware() done!');

    return (ctx, next) => {
        debug('middleware of log called ...');
        ctx.logger = logger;
        let startTime = Date.now();
        assert(logger[accessMethod] instanceof Function, 'Access method [' + accessMethod + '] should be a function!');
        const requestInfo = {
            REQUEST_TIME: new Date(),
            METHOD: ctx.method.toUpperCase(),
            URL:    ctx.url,
            HOST:   ctx.host,
            IP:     ctx.ip,
            IPS:    ctx.ips,
            HEADER: ctx.header,
        };

        const printLog = error => {
            debug('printing access log ...');
            const responseTime = Date.now();
            const bodyLength = ctx.body.length;
            const responseInfo = {
                RESPONSE_TIME: new Date(),
                STATUS: ctx.status,
                TYPE:   ctx.type,
                LENGTH: bodyLength,
                SIZE:   bytes(bodyLength),
                COST:   (responseTime - startTime) + 'ms',
                LAST_MODIFIED:  ctx.lastModified,
                ETAG:   ctx.etag,
                ERROR_MESSAGE: error instanceof Error ? error.message || 'Unknown Error' : '',
            }; 
            logger[accessMethod](JSON.stringify($.assign(requestInfo, responseInfo)));
        }

        return next().then(printLog).catch(printLog);
    };
}

debug('loaded!');
module.exports = middleware;
