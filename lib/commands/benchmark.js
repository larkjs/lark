'use strict';

var program = require('commander');
var shell   = require('shelljs');

var exec = shell.exec;
var exit = shell.exit;
var which = shell.which;

module.exports = function (move_to_app_root) {
    function benchmarkHelper() {
        var larkInfo = move_to_app_root();
        var port = program.port || 3000;
        if (!which('wrk')) {
            console.log('You need install wrk before use lark benchmark');
            exit(1);
        }
        if (!fs.existsSync('benchmarks/run.sh')) {
            console.log('You need benchmarks/run.sh ');
            exit(1);
        }
        console.log('wrk will test with port:%s', port);
        exit(exec('sh benchmarks/run.sh index.js ' + port).code);
    }

    program
        .command('benchmark')
        .alias('b')
        .description('benchmark test (you need installed wrk)')
        .action(benchmarkHelper); 
};
