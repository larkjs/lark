/**
 * Middleware to print logs
 **/
'use strict';

const bytes     = require('bytes');

const LarkLog   = require('lark-log');

module.exports = (app) => {
    const config = app.config.get('log') || {};
    const logger = new LarkLog(config);
    app.logger = logger;

    return async (ctx, next) => {
        const now = Date.now();
        ctx.logger = logger;
        ctx.log = logger;

        await next();

        const message = {
            method: ctx.method.toUpperCase(),
            url: ctx.url,
            header: ctx.headers,
            ip: ctx.ip,
            ips: ctx.ips,
            cost: `${Date.now() - now}ms`,
            length: bytes(Buffer.byteLength(ctx.body || '', 'utf-8')),
        };

        logger.access(JSON.stringify(message));
    };
};
