/**
 * lark - promisify.js
 * Copyright(c) 2014 mdemo(https://github.com/demohi)
 * MIT Licensed
 */

'use strict';

var thenifyAll = require('thenify-all');
var got = require('got');
var http = thenifyAll(got, {}, [
    'get',
    'post',
    'put',
    'patch',
    'head',
    'delete'
]);

exports.promisify = thenifyAll.thenify;
exports.promisifyAll = thenifyAll;
exports.http = http;
