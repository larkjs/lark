/**
 * Example of throwing error
 **/
'use strict';

const debug   = require('debug')('lark.examples.controller.demo.error');


debug('loading ...');

module.exports = {
    GET (ctx, next) {
        throw new Error("This is a faked Error!");
    }
}

debug('loaded!');
