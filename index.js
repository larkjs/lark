/**
 * main lib of lark
 */
var Application = require('./lib/application')
/**
 * promise helper
 */
var promisify = require('./lib/promisify');

/**
 * lark interfaces
 */
Application.promisify = promisify.promisify;
Application.promisifyAll = promisify.promisifyAll;
Application.http = promisify.http;
Application.mvc = require('lark-mvc');
Application.router = require('lark-router');
Application.logging = require('lark-log').logging;

module.exports = Application;
