/**
 * lark.js - lib/errorHandler.js
 * Copyright(c) 2014 larkjs-team
 * MIT Licensed
 */

'use strict';

module.exports = function (options) {
    return errorHandler;
};

function * errorHandler (next) {
    try {
        yield next;
    }
    catch (e) {
        handle(e, this);
        throw e;
    }
};

/**
 * Log the error message
 * Will not handle response here, let koa take care of it
 **/
function handle (error, me) {
    if (!me || !me.log) {
        return;
    }
    var message = error;
    if (error instanceof Error) {
        message = error.message;
    }
    if ('function' === typeof me.log.error) {
        me.log.error(message);
    }
    else if ('function' === typeof me.log.warn) {
        me.log.warn(message);
    }
    else if ('function' === typeof me.log.warning) {
        me.log.warning(message);
    }
    else if ('function' === typeof me.log.notice) {
        me.log.notice(message);
    }
    else {
        console.log(message);
    }
};
