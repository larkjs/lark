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

    program.command("*").action(function () {
        program.outputHelp();
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
