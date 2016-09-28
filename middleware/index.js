/**
 * Exports middlewares
 **/
'use strict';

const debug   = require('debug')('lark.middlewares.index');
const fs      = require('fs');
const utils   = require('lark-utils');

debug('loading ...');

const middlewares = {};
const thisfile = utils.path.basename(__filename);
const filelist = fs.readdirSync(__dirname)
                    .map(name => utils.path.basename(name))
                    .filter(name => name !== thisfile)
                    .filter(name => name[0] !== '.');

for (const filename of filelist) {
    debug('loading middleware ' + filename + ' ...');
    middlewares.__defineGetter__(filename, () => {
        return require('./' + filename);
    });
}

debug('loaded!');

module.exports = middlewares;
