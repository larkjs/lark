/**
 * Module access control middleware
 **/
'use strict';

import _debug   from 'debug';
import LarkMVC  from 'lark-mvc';

const debug = _debug('lark');

function mvc (app) {
    debug('middlewares/mvc.js - mvc() called');
    const config = app.config.mvc || {};
    return LarkMVC.middleware(config.directory, config);
}

debug('middlewares/mvc.js - load');
export default mvc;
