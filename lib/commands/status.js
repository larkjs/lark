'use strict';

var program = require('commander');
var path    = require('path');

module.exports = function (move_to_app_root) {

    program
        .command('status')
        .description('show app running status')
        .action(function () {
            var larkInfo = move_to_app_root();
            process.env.PM2_HOME = process.cwd();
            var pm = require('lark-bootstrap/lib/processManager');
            pm.cmd('list', function () {
                var list = arguments[1];
                var disp = require('lark-bootstrap/node_modules/pm2/lib/CliUx').dispAsTable;
                disp(list);
                process.exit(0);
            });
        });
};
