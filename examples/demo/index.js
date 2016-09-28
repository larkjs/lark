/**
 * Example of Lark
 **/
'use strict';
process.mainModule = module;

const debug   = require('debug')('lark.examples.demo');

const Lark    = require('../..');

const app = new Lark().saveInstance();

app.on('error', (error, ctx) => {
    debug("error: " + error.stack);
});

module.exports = app.listen(3000, () => {
    debug('server listening on 3000...');
});
