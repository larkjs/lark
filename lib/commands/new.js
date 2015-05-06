'use strict';

var program   = require('commander');
var generator = require('../generator');

module.exports = function () {
    /**
     * Command `lark new <appname>`
     **/
    program
        .command('new')
        .alias('n')
        .description('create an application base on lark framework')
        .usage('<app>')
        .action(createApp);
};

/**
 * create app
 * @param app
 */
function createApp(app) {
    if (!app) {
        return;
    }
    generator('lark ' + app);
}
