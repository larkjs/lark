'use strict';

var program = require('commander');

module.exports = function () {
    /**
     * custom help
     */
    program.on('--help', function () {
        console.log('  Examples:');
        console.log('');
        console.log('    $ lark new lark-app');
        console.log('    $ lark run');
        console.log('    $ lark generate controller user/create.js');
        console.log('');
    });

    program
        .command('list')
        .description('list all processes on PM2')
        .action(function () {
            var pm = require('lark-bootstrap/lib/processManager');
            pm.cmd('list', false, function (err, data) {
                console.log(data);
                pm.cmd('list', true, function (list) {
                    if (list.length === 0) {
                        pm.cmd('kill', true);
                    }
                });
            });
        });
};

/**
 * Print help if exec `lark`
 **/
if (!process.argv.slice(2).length) {
    process.nextTick(function () {
        program.outputHelp();
    });
}
