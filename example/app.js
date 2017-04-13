/**
 * Example of using Lark constructing a web app
 **/
'use strict';
process.mainModule = module;

global.LARK_TEST = true;

const Lark = require('..');
const app = new Lark();

app.config.use('configs');
app.config.set('server/port', 8888);

app.on('error', (error, ctx) => ctx.logger.error(error.stack) && ctx.logger.log(error.stack));

module.exports = app.start()
    .then(({ port, server }) => {
        app.logger.notice(`SERVER[${process.pid}] listening on ${port} ...`);
        return { port, server };
    })
    .catch(e => app.logger.error(e.stack) && app.logger.log(e.stack));
