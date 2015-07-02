'use strict';

var program       = require('commander');
var fs            = require('fs');
var cmd_generate  = require('./generate');
var cmd_control   = require('./control');
var cmd_status    = require('./status');
var cmd_default   = require('./default');
var cmd_benchmark = require('./benchmark');

module.exports = function () {
    cmd_options();
    cmd_generate(move_to_app_root);
    cmd_control(move_to_app_root);
    cmd_status(move_to_app_root);
    cmd_default(move_to_app_root);
    cmd_benchmark(move_to_app_root);
};

function cmd_options () {
    /**
     * option env
     */
    program.option('-e, --env <env>', 'run in this env, env may be [production|development]');

    /**
     * option force
     **/
    program.option('-P, --no-package', 'run in no package mode, lark will not try to find the app root path by package.json');
}

/**
 * Execute the commands under the app root dir
 **/
function move_to_app_root () {
    process.chdir(process.orig_cwd);
    var _larkInfo = null;
    if (-1 !== process.argv.indexOf('-P') || -1 !== process.argv.indexOf('--no-package')) {
        console.log("Warning! You are running lark in NO-PACKAGE mode...");
        console.log("   Make sure you are running this under the root path of your app");
        console.log("   Or lark would not be able to load process management data, default settings or etc..");
        larkInfo.cwd = process.orig_cwd;
        try {
            larkInfo.pkg = require('./package.json') || null;
        }
        catch (e) {
            larkInfo.pkg = null;
        }
        _larkInfo = larkInfo;
    }
    else {
        _larkInfo = chdir_to_app_root();
    }
    if (_larkInfo === false) {
        console.log("Error! No lark application found");
        console.log("Make sure you are running `lark` under your lark application's directory");
        console.log("     and package.json for your app exists with 'lark-app' set to true");
        return process.exit(1);
    }
    return _larkInfo;
};

function chdir_to_app_root () {
    var cwd = process.cwd();
    var pkg = null;
    try {
        var data = fs.readFileSync('./package.json').toString();
        pkg = JSON.parse(data);
    }
    catch (e) {
        pkg = null;
    }
    if (isLarkPkg(pkg)) {
        larkInfo.cwd = cwd;
        larkInfo.pkg = pkg;
        return larkInfo;
    }
    process.chdir('..');
    if (process.cwd() === cwd) {
        return false;
    }
    else {
        return chdir_to_app_root();
    }
};

function isLarkPkg (pkg) {
    if (!pkg || 'object' !== typeof pkg) {
        return false;
    }
    if (pkg['lark-app'] !== true) {
        return false;
    }
    return true;
};

function larkInfo (name, value) {
    if (arguments.length == 0) {
        throw new Error("larkInfo(name, value = null), name is required");
    }
    var info = {};
    try {
        info = JSON.parse(fs.readFileSync('./.lark-default.json').toString());
    }
    catch (e) {
        fs.writeFileSync('./.lark-default.json', JSON.stringify(info, null, 4));
    }
    if (arguments.length == 1) {
        return info[name] || null;
    }
    else {
        ('undefined' !== typeof value) && (null !== value) ? (info[name] = value) : (delete info[name]);
        fs.writeFileSync('./.lark-default.json', JSON.stringify(info, null, 4));
        return value;
    }
};
