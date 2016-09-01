/**
 * Middlewares of lark app
 **/
'use strict';

import _debug   from 'debug';

import config   from './config';
import logger   from './logger';
import mvc      from './mvc';
import router   from './router';

const debug = _debug('lark');

export default { config, logger, mvc, router };
