/**
 * Middlewares of lark app
 **/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _mvc = require('./mvc');

var _mvc2 = _interopRequireDefault(_mvc);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug3.default)('lark');

exports.default = { config: _config2.default, logger: _logger2.default, mvc: _mvc2.default, router: _router2.default };