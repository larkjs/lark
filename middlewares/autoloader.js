/**
 * Autoloader middleware
 **/
'use strict';

const assert         = require('assert');
const LarkAutoLoader = require('lark-autoloader');

module.exports = (app) => {
    do {
        if (!app.config.has('autoloader')) {
            break;
        }
        const directories = app.config.get('autoloader/directory');
        if (!(directories instanceof Object) || Object.keys(directories).length <= 0) {
            break;
        }
        global.$ = global.$ || {};
        for (const name in directories) {
            assert(!global.$.hasOwnProperty(name), "Setting duplicated name on auto loader");
            global.$[name] = new LarkAutoLoader(directories[name]);
        }
    } while(false);

    return async (ctx, next) => {
        ctx.autoloader = true;
        await next();
    };
};
