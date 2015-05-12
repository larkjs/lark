'use strict';

var program       = require('commander');
var fs            = require('fs');
var cmd_generate  = require('./generate');
var cmd_control   = require('./control');
var cmd_default   = require('./default');
var cmd_benchmark = require('./benchmark');

module.exports = function () {
    cmd_options();
    cmd_generate(move_to_app_root);
    cmd_control(move_to_app_root);
    cmd_default(move_to_app_root);
    cmd_benchmark(move_to_app_root);
};

function cmd_options () {
    /**
     * option env
     */
    program.option('-e, --env <env>', 'run in this env, env may be [production|development]');

    /**
     * option port
     */
    program.option('-p, --port <port>', 'run in this port');
}

/**
 * Execute the commands under the app root dir
 **/
function move_to_app_root () {
    var cwd = process.cwd();
    var larkInfo = chdir_to_app_root();
    if (larkInfo === false) {
        console.log("Error! No lark application found");
        console.log("Make sure you are running `lark` under your lark application's directory");
        console.log("     and package.json for your app exists with 'lark-app' set to true");
        return process.exit(1);
    }
    return larkInfo;
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
    if (arguments.lenght == 0) {
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
        info[name] = value;
        fs.writeFileSync('./.lark-default.json', JSON.stringify(info, null, 4));
        return value;
    }
};
