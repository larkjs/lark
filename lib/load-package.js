/**
 * Load configs from package.json
 * If key 'lark' exists in package.json, lark will use
 * package['lark'] as the config source.
 **/
'use strict';

const misc    = require('vi-misc');

const PACKAGE_JSON = 'package.json';

module.exports = () => {
    let appPackage = null;
    const packagePath = misc.path.absolute(PACKAGE_JSON);
    try {
        appPackage = require(packagePath);
    }
    catch (error) {
        appPackage = {};
    }
    appPackage.lark = appPackage.lark || {};
    return appPackage;
};
