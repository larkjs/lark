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

    if (app.config.has('autoloader') && global.$) {
        global.$.logger = logger;
    }

    return async (ctx, next) => {
        const now = Date.now();
        ctx.logger = logger;
        ctx.log = logger;
        let error = null;

        try {
            await next();
        }
        catch (e) {
            error = e;
            logger.error(e.stack);
            throw e;
        }
        finally {
            const message = {
                method: ctx.method.toUpperCase(),
                url: ctx.url,
                header: ctx.headers,
                ip: ctx.ip,
                ips: ctx.ips,
                cost: `${Date.now() - now}ms`,
                status: ctx.status,
                length: bytes(Buffer.byteLength(JSON.stringify(ctx.body || ''), 'utf-8')),
            };

            logger.access(JSON.stringify(message));
        }
    };
};
