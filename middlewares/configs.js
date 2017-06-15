'use strict';

module.exports = (app) => {
    let config = app.config;
    return async (ctx, next) => {
        ctx.config = config;
        return await next();
    };
};
