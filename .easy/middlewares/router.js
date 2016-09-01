/**
 * Router middleware, dispatches requests to handler modules by their request urls
 **/
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _larkRouter = require('lark-router');

var _larkRouter2 = _interopRequireDefault(_larkRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug3.default)('lark');

function router(app) {
    debug('middlewares/router.js - router() called');
    const config = app.config.router || {};
    const router = new _larkRouter2.default(config);
    router.load(config.directory);
    return router.routes();
}

debug('middlewares/router.js - load');
exports.default = router;