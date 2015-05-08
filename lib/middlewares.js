/**
 * lark.js - lib/middlewares.js
 * Copyright(c) 2014 larkjs-team
 * MIT Licensed
 */

'use strict';

module.exports = {
  mvc: require('lark-mvc'),
  router: require('lark-router'),
  views: require('lark-views'),
  logging: require('lark-log').middleware,
};
