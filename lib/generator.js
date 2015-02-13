/**
 * lark - generator.js
 * Copyright(c) 2014 mdemo(https://github.com/demohi)
 * MIT Licensed
 */

'use strict';

var yeoman = require('generator-lark/node_modules/yeoman-generator');
var path = require('path');

module.exports = function(command){
    var env = yeoman();
    var root = path.dirname(require.resolve('generator-lark/package.json'));
    var cwd = process.cwd();

    process.chdir(root);
    env.lookup();
    process.chdir(cwd);

    env.on('error', function(err){
        console.error(err);
    });
    env.run(command);
};
