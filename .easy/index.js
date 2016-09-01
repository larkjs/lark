/**
 * Main file of Lark
 **/
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _larkConfig = require('lark-config');

var _larkConfig2 = _interopRequireDefault(_larkConfig);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _saveInstance = require('save-instance');

var _saveInstance2 = _interopRequireDefault(_saveInstance);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _middlewares = require('./middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug3.default)('lark');

class Lark extends _koa2.default {
    constructor() {
        let name = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

        debug('index.js - Lark construct() called');
        super();

        name === null ? this.saveInstance() : this.saveInstance(name);
        this._config = (0, _larkConfig2.default)(_path2.default.join(__dirname, 'conf'));
    }
    get config() {
        return _lodash2.default.cloneDeep(this._config);
    }
    configure() {
        let config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        debug('index.js - Lark configure() called');
        config = (0, _larkConfig2.default)(config);
        if (config.options) {
            config = (0, _larkConfig2.default)(config, config.options);
        }
        this._config = _lodash2.default.merge(this.config, config);
    }
    listen() {
        debug('index.js - Lark listen() called');
        this.use(_middlewares2.default.config(this));
        this.use(_middlewares2.default.logger(this));
        this.use(_middlewares2.default.mvc(this));
        this.use(_middlewares2.default.router(this));

        super.listen.apply(this, arguments);
    }
}
(0, _saveInstance2.default)(Lark);

exports.default = Lark;
