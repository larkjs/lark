/**
 * Controller responsing to path '/'
 **/
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GET = undefined;

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const debug = (0, _debug3.default)('lark');

const GET = exports.GET = (() => {
    var ref = _asyncToGenerator(function* (ctx, next) {
        let startTime = Date.now();
        ctx.body = 'Welcome';
        yield next();
        ctx.logger.log('Controller index Method GET is working');
        foo();
    });

    return function GET(_x, _x2) {
        return ref.apply(this, arguments);
    };
})();

/**
 * If you want to read some static data without accessing lark context,
 * use Lark.getInstance() to get the app object
 **/
function foo() {
    let app = _2.default.getInstance();
    app.logger.log('Foo...');
    console.log(app.config);
}

(0, _debug3.default)('examples/controllers/index.js - load');