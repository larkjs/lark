/**
 * main lib of lark
 */
var Application = require('Application')

/**
 * lark interfaces
 */
var promisify = require('./promisify');

Application.promisify = promisify.promisify;
Application.promisifyAll = promisify.promisifyAll;
Application.http = promisify.http;
Application.mvc = require('lark-mvc')
Application.router = require('lark-router')
Application.logging = require('lark-log').logging;

module.exports = Application
