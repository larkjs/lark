/**
 * Log middleware with Lark-Log
 **/
'use strict';

const $       = require('lodash');
const debug   = require('debug')('lark.middlewares.log');
const assert  = require('assert');
const bytes   = require('bytes');
const utils   = require('lark-utils');

const LarkLogger  = require('lark-log');

debug('loading ...');

function middleware (config = {}, app = null) {
    debug('middleware() called ...');
    assert(config instanceof Object, 'log middleware config should be an object');
    assert(null !== app, 'Internal Error!');
    const logger = new LarkLogger(config);
    debug('lark logger initialized');
    app.logger = logger;

    let accessMethod = config.accessMethod || 'notice';
    assert('string' === typeof accessMethod && logger[accessMethod] instanceof Function, 'Access method [' + accessMethod + '] should be a function!');
    debug('access method confirmed');

    debug('middleware() done!');

    return (ctx, next) => {
        debug('middleware of log called ...');
        ctx.logger = logger;
        let startTime = new Date();
        assert(logger[accessMethod] instanceof Function, 'Access method [' + accessMethod + '] should be a function!');
        const requestInfo = {
            REQUEST_TIME: utils.time.format('YYYY-MM-DD HH:II:SS.UUU', startTime),
            METHOD: ctx.method.toUpperCase(),
            URL:    ctx.url,
            HOST:   ctx.host,
            IP:     ctx.ip,
            IPS:    ctx.ips,
            HEADER: ctx.header,
        };

        const printLog = error => {
            debug('printing access log ...');
            const responseTime = new Date();
            const bodyLength = (ctx.body || '').length;
            const responseInfo = {
                RESPONSE_TIME: utils.time.format('YYYY-MM-DD HH:II:SS.UUU', responseTime),
                STATUS: ctx.status,
                TYPE:   ctx.type,
                LENGTH: bodyLength,
                SIZE:   bytes(bodyLength),
                COST:   (responseTime.getTime() - startTime.getTime()) + 'ms',
                LAST_MODIFIED:  ctx.lastModified,
                ETAG:   ctx.etag,
                ERROR_MESSAGE: error instanceof Error ? error.message : '',
            }; 
            logger[accessMethod](JSON.stringify($.assign(requestInfo, responseInfo)));

            if (error instanceof Error) throw error;
        }

        return next().then(printLog).catch(printLog);
    };
}

debug('loaded!');
module.exports = middleware;
