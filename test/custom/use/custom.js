'use strict';

module.exports = (app) => {
    app.use(async (ctx, next) => {
        ctx.body = 'How are you';
    });
};
