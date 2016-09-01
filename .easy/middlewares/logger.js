/**
 * Log middleware
 **/
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _bytes = require('bytes');

var _bytes2 = _interopRequireDefault(_bytes);

var _larkLog = require('lark-log');

var _larkLog2 = _interopRequireDefault(_larkLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const debug = (0, _debug3.default)('lark');

function log(app) {
    debug('middlewares/logger.js - log() called');
    const logger = new _larkLog2.default();
    logger.configure(app.config.log || {});
    app.logger = logger;
    const requestMethod = 'request';
    const responseMethod = 'response';
    if (app.config.log && app.config.log.lark) {
        requestMethod = app.config.log.lark.request || requestMethod;
        responseMethod = app.config.log.lark.response || responseMethod;
    }

    let id = 0;
    return (() => {
        var ref = _asyncToGenerator(function* (ctx, next) {
            debug('middleware/logger.js - middlware start');
            ctx.logger = logger;
            let startTime = Date.now();

            if (!ctx.id) {
                id = (id + 1) % 1000;
                ctx.id = Date.now() * 1000 + id;
            }
            if (logger[requestMethod] instanceof Function) {
                debug('middleware/logger.js - middleware printing request info');
                logger[requestMethod]({
                    ID: ctx.id,
                    METHOD: ctx.method.toUpperCase(),
                    URL: ctx.url,
                    HOST: ctx.host,
                    IP: ctx.ip,
                    HEADER: ctx.header
                });
            }
            yield next();
            if (logger[responseMethod] instanceof Function) {
                debug('middleware/logger.js - middleware printing response info');
                let bodyLength = (ctx.body || "").toString().length;
                logger[responseMethod]({
                    ID: ctx.id,
                    STATUS: ctx.status,
                    TYPE: ctx.type,
                    LENGTH: bodyLength,
                    SIZE: (0, _bytes2.default)(bodyLength),
                    COST: Date.now() - startTime + 'ms',
                    LAST_MODIFIED: ctx.lastModified,
                    ETAG: ctx.etag
                });
            }
            debug('middleware/logger.js - middlware end');
            return;
        });

        return function (_x, _x2) {
            return ref.apply(this, arguments);
        };
    })();
}

debug('middlewares/log.js - load');
exports.default = log;