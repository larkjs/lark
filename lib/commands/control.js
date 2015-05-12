'use strict';

var program = require('commander');
var shell   = require('shelljs');

var exec = shell.exec;

module.exports = function (move_to_app_root) {
    /**
     * init cmd
     */
    function execCmd(_cmd, config) {
        var larkInfo = move_to_app_root();
        _cmd = _cmd || '';
        var cmd = '';
        var default_env = larkInfo('env');
        if (program.env) {
            cmd += 'NODE_ENV=' + program.env;
        }
        else if(default_env){
            cmd += 'NODE_ENV=' + default_env;
        }
        cmd += ' ' + process.execPath + ' ' + process.execArgv.join(" ") + ' index.js ' + _cmd;
        exec(cmd, {async: false});
    }

    /**
     * command start
     **/
    program
        .command('run')
        .alias('server')
        .alias('start')
        .description('run lark app with watch')
        .usage('<app>')
        .action(function () {
            execCmd();
        });

    /**
     * command restart
     */
    program
        .command('restart')
        .description('restart app')
        .usage('<app>')
        .action(function () {
            execCmd('--lark-restart');
        }); 

    /**
     * command reload
     */
    program
        .command('reload')
        .description('reload app')
        .usage('<app>')
        .action(function () {
            execCmd('--lark-reload');
        });

    /**
     * command stop
     */

    program
        .command('stop')
        .description('stop app')
        .usage('<app>')
        .action(function () {
            execCmd('--lark-stop');
        });

    /**
     * command delete
     */

    program
        .command('delete')
        .description('delete app')
        .usage('<app>')
        .action(function () {
            execCmd('--lark-delete');
        });
};
