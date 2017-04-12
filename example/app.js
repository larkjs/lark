/**
 * Example of using Lark constructing a web app
 **/
'use strict';
process.mainModule = module;

const Lark = require('..');
const app = new Lark();

app.config.use('configs');
app.config.set('server/port', 8888);

app.on('error', (error, ctx) => {
    ctx.logger.error(error.stack);
    ctx.logger.log(error.stack);
});

app.start().then(({ port }) => {
    app.logger.notice(`SERVER[${process.pid}] listening on ${port} ...`);
});

module.exports = app;
