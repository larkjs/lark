'use strict';

var cmd_new  = require('./new');
var cmd_help = require('./help');

module.exports = function () {
    cmd_new();
    cmd_help();
};
