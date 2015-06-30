'use strict';

var program = require('commander');
var path    = require('path');

module.exports = function (move_to_app_root) {

    program
        .command('list')
        .description('list all processes on PM2')
        .action(function () {
            var larkInfo = move_to_app_root();
            var pm = require('lark-bootstrap/lib/processManager');
            pm.cmd('list', true, function () {
                var list = arguments[1];
                var disp = require('lark-bootstrap/node_modules/pm2/lib/CliUx').dispAsTable;
                disp(list);
            });
        });
};
