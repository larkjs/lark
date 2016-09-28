/**
 * middleware for static resources
 **/
'use strict';

const $       = require('lodash');
const debug   = require('debug')('lark.middlewares.static');
const assert  = require('assert');
const mount   = require('koa-mount');
const path    = require('path');
const serve   = require('koa-static');
const utils   = require('lark-utils');

debug('loading ...');

function middleware (config = {}) {
    const prefix    = config.path || '/static';
    const directory = utils.path.absolute(config.directory || 'static');
    assert('string' === typeof prefix, 'Path for static resources must be a string!');
    assert(path.isAbsolute(directory), 'Invalid path for static resources!');
    debug('setting path ' + prefix + ' for static resource in ' + directory);
    return mount(prefix, serve(directory, $.cloneDeep(config)));
}

debug('loaded!');

module.exports = middleware;
