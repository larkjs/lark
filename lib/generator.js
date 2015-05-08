/**
 * lark - generator.js
 * Copyright(c) 2014 mdemo(https://github.com/demohi)
 * MIT Licensed
 */

'use strict';

var path = require('path');

module.exports = function(command){
    /**
     * Requiring yeoman may cost several seconds,
     * So we'd like to require it when yeoman is indeed needed
     * rather than once this module is required
     **/
    console.log("Starting yeoman generator, please wait...");
    var yeoman = require('generator-lark/node_modules/yeoman-generator');

    var env = yeoman();
    var root = path.dirname(require.resolve('generator-lark/package.json'));
    var cwd = process.cwd();

    process.chdir(root);
    env.lookup();
    process.chdir(cwd);

    env.on('error', function(err){
        console.error(err);
    });

    env.larkPkg = require('../package.json');

    env.run(command);
};
