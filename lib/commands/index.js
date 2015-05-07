'use strict';

var program         = require('commander');
var pkg             = require('../../package.json');
var cmd_for_global  = require('./global');
var cmd_for_app     = require('./app');

var cwd = process.cwd();
process.on('exit', function () {
    process.chdir(cwd);
});

if (!pkg || !pkg.version) {
    throw new Error("pakage.json is required, version must be set");
    return;
}

program.version(pkg.version);

cmd_for_global();
cmd_for_app();

program
    .command("*")
    .description("show help")
    .action(function () {
        program.outputHelp();
    });


program.parse(process.argv);
