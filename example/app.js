/**
 * Example of using Lark constructing a web app
 **/
'use strict';

const Lark    = require('..');

const app = new Lark();

app.config.use('../configs');
app.config.set('server/port', 8888);

app.router.get('/', async (ctx, next) => {
    ctx.body = 'Here it is ...';
    await next();
});

app.start().then(({ port }) => {
    app.logger.notice(`SERVER[${process.pid}] listening on ${port} ...`);
});

module.exports = app;
