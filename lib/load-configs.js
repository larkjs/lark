/**
 * Load default configs
 **/
'use strict';

const debug = require('debug')('lark.load-configs');
const path  = require('path');

module.exports = async (app) => {
    debug('loading');
    const configObject = app.config.config;
    app.config.reset();
    await app.config.use(path.join(__dirname, '../configs'));
    await app.config.use(app.package.lark.configs);
    await app.config.use(configObject);
    debug('done');
};
