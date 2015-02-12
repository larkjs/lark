/**
 * lark - generator.js
 * Copyright(c) 2014 mdemo(https://github.com/demohi)
 * MIT Licensed
 */

'use strict';

var yeoman = require('generator-lark/node_modules/yeoman-generator');
var env = yeoman();

env.lookup();
env.on('error', function(err){
    console.error(err);
});
module.exports = function(command, file){
    env.run(command, file);
};
