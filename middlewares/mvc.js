/**
 * MVC middleware
 **/
'use strict';

const assert    = require('assert');
const path      = require('path');
const Directory = require('directoryfiles');

module.exports = (app) => {

    const proxy = (controller) => {
        if (!(controller instanceof Function) || controller.MVC_TYPE !== 'Controller') {
            return controller;
        }
        return async (ctx) => {
            return await app.mvc.dispatch(controller, ctx);
        }
    }

    app.config.set('mvc/proxy', proxy);

    const config = app.config.get('mvc') || {};

    const modelDirectoryPath = config.models || 'models';
    const viewDirectoryPath = config.views || 'views';

    const extModule = '.js';
    let modelDirectory = new Directory(modelDirectoryPath);
    modelDirectory.filter(filepath => path.extname(filepath) === extModule)
                  .map(filepath => {return {
                      dirname: path.relative(modelDirectory.path, path.dirname(filepath)),
                      name: path.basename(filepath, extModule),
                      module: require(filepath) };})
                  .each(item => {
                      assert(item.module instanceof Function, `Module of ${item.filepath} should be a Class`);
                      const name = path.join(item.dirname, item.name);
                      app.mvc.use(item.module, { name });
                   });

    return async (ctx, next) => {
        await next();
    }
}

