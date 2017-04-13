/**
 * Autoloader middleware
 **/
'use strict';

const assert          = require('assert');
const LarkAutoLoader  = require('lark-autoloader');

module.exports = (app) => {
    if (!app.config.has('autoloader')) {
        return;
    }
    const key = app.config.has('autoloader/name') ? app.config.get('autoloader/name') : '$';
    assert(app.config.has('autoloader/directory'), 'No auto loading directory');
    const directories = app.config.get('autoloader/directory');
    if (!(directories instanceof Object) || Object.keys(directories).length <= 0) {
        return;
    }
    global[key] = global[key] || {};
    for (const name in directories) {
        if (global[key].hasOwnProperty(name)) {
            continue;
        }
        try {
            global[key][name] = new LarkAutoLoader(directories[name]);
        }
        catch (e) {
            global[key][name] = {};
        }
    }
};
