/**
 * Middleware to print logs
 **/
'use strict';

const assert    = require('assert');
const bytes     = require('bytes');

const LarkLog   = require('lark-log');

module.exports = (app) => {
    assert(app.config.has('log'), 'No log config found!');
    const config = app.config.get('log');
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
            logger.error(e.stack);
            error = e;
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

            if (error instanceof Error) {
                message.error = error.message;
            }

            logger.access(JSON.stringify(message));
        }
    };
};
