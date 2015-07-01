/**
 * lark.js - lib/middlewares.js
 * Copyright(c) 2014 larkjs-team
 * MIT Licensed
 */

'use strict';

var path = require('path');

process.env.PM2_HOME = path.dirname(process.mainModule.filename);

module.exports = require('lark-bootstrap');
