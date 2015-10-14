/**
 * lark - promisify.js
 * Copyright(c) 2014 mdemo(https://github.com/demohi)
 * MIT Licensed
 */

'use strict';

const thenifyAll = require('thenify-all');
const got = require('got');
const http = thenifyAll(got, {}, [
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
