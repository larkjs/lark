/**
 * Custom middlewares loaded here
 **/
'use strict';

module.exports = (app) => {

    const middlewares = app._custom_middlewares;

    for (let middleware of middlewares) {
        app._use(middleware);
    }

    return async (ctx, next) => {
        ctx.customized = true;
        await next();
    };
};
