/**
 * For the test
 **/
'use strict';

const debug   = require('debug')('lark.examples.test.app');
const utils   = require('lark-utils');

const Lark    = require('../..');

debug('loading ...');

const options = {
    package: utils.path.absolute("package.json", __dirname),
    static: { enable: false },
    router: {
        "directory": utils.path.absolute("actions", __dirname),
    }
}

const options2 = {
    router: {
        directory: [1, 2, 3] // should ignore this
    }
};

const app  = new Lark(options);
const app2 = new Lark(options2);

exports.port1 = app.listen(4000);
exports.port2 = app.listen(4001);
exports.port3 = app.listen(4002);

debug('loaded!');
