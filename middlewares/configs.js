'use strict';

module.exports = (app) => {
    let configs = app.configs;
    return async (ctx, next) => {
        ctx.configs = configs;
        return await next();
    };
};
