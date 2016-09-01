/**
 * Config middleware, binds a clone of app.config to ctx
 **/
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const debug = (0, _debug3.default)('lark');

function config(app) {
    debug('middlewares/config.js - config() called');
    return (() => {
        var ref = _asyncToGenerator(function* (ctx, next) {
            debug('middlewares/config.js - middleware start');
            ctx.config = _lodash2.default.cloneDeep(app.config);
            yield next();
            debug('middlewares/config.js - middleware end');
            return;
        });

        return function (_x, _x2) {
            return ref.apply(this, arguments);
        };
    })();
}

debug('middlewares/config.js - load');
exports.default = config;