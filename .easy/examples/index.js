/**
 * Main module of Lark App
 **/
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _ = require('..');

var _2 = _interopRequireDefault(_);

var _package = require('./package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug3.default)('lark');

const app = new _2.default();

app.configure(_package2.default['lark-config']);

app.on('error', error => {
    console.log(error.stack);
});

if (!module.parent) {
    app.listen(3000, () => {
        console.log('Pid ' + process.pid + ' listening at 3000 ...');
    });
}

debug('examples/index.js - load');
exports.default = app;