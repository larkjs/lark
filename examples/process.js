'use strict';

module.exports = (ctx, next) => {
    ctx.logger.warn("How are you");
    return next();
};
