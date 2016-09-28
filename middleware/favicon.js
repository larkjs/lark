/**
 * serve favicon requests
 **/
'use strict';

const $       = require('lodash');
const debug   = require('debug')('lark.middlewares.favicon');
const assert  = require('assert');
const favicon = require('koa-favicon');
const path    = require('path');
const utils   = require('lark-utils');

debug('loading ...');

function middleware (config = {}) {
    const pathname = utils.path.absolute(config.path || '/static/favicon.ico');
    assert(path.isAbsolute(pathname), 'Invalid favicon resource path');
    return favicon(pathname, $.cloneDeep(config));
}

debug('loaded!');

module.exports = middleware;
