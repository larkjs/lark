/**
 * Config middleware, binds a clone of app.config to ctx
 **/
'use strict';

import $        from 'lodash';
import _debug   from 'debug';

const debug = _debug('lark');

function config (app) {
    debug('middlewares/config.js - config() called');
    return async (ctx, next) => {
        debug('middlewares/config.js - middleware start');
        ctx.config = $.cloneDeep(app.config);
        await next();
        debug('middlewares/config.js - middleware end');
        return;
    };
}

debug('middlewares/config.js - load');
export default config;
