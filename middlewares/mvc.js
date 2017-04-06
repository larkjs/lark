/**
 * MVC middleware
 **/
'use strict';

module.exports = (app) => {

    return async (ctx, next) => {
        await next();
    }

}
