/**
 * Example of using Lark constructing a web app
 **/
'use strict';

const debug = require('debug')('lark.example.app');
const Lark  = require('lark');

/**
 * The main entry. Since lark use async methods such as app.start, it's better to use lark in an
 * async function
 **/
async function main() {
    debug('run main');
    process.mainModule = module;

    const app = new Lark();

    debug('preparing app configs');
    await app.config.use('configs');
    app.config.set('server/port', 8888);
    app.on('error', (error, ctx) => {
        ctx.logger.error(error.stack) && ctx.logger.log(error.stack);
    });

    let service = null;

    service = await app.start();

    app.logger.notice(`SERVER[${process.pid}] listening on ${service.port} ...`);
    return service;
}

// main();
module.exports = main;
