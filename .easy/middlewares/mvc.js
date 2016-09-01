/**
 * Module access control middleware
 **/
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _larkMvc = require('lark-mvc');

var _larkMvc2 = _interopRequireDefault(_larkMvc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug3.default)('lark');

function mvc(app) {
    debug('middlewares/mvc.js - mvc() called');
    const config = app.config.mvc || {};
    return _larkMvc2.default.middleware(config.directory, config);
}

debug('middlewares/mvc.js - load');
exports.default = mvc;