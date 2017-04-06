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
    console.log(error);
});

app.start().then(({ port }) => {
    app.logger.notice(`SERVER[${process.pid}] listening on ${port} ...`);
});

// console.log(JSON.stringify(app.config.config, null, 4));

module.exports = app;
