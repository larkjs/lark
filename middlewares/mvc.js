/**
 * MVC middleware
 **/
'use strict';

const assert    = require('assert');
const path      = require('path');
const Directory = require('directoryfiles');
const LarkMVC   = require('lark-mvc');
const LarkViews = require('lark-views');

module.exports = (app) => {
    registerControllerProxy(app);
    registerModels(app);
    registerViews(app);
};

function registerControllerProxy(app) {
    const proxy = (controller) => {
        if (!(controller instanceof Function) || controller.MVC_TYPE !== 'Controller') {
            return controller;
        }
        return async (ctx) => {
            return await app.mvc.dispatch(controller, ctx);
        };
    };

    app.config.set('mvc/proxy/controller', proxy);
}

function registerModels(app) {
    if (!app.config.has('mvc/models/path')) {
        return;
    }
    const config = app.config.get('mvc/models');
    let directory = config.path;
    let extList = config.ext || ['js', 'node'];
    assert('string' === typeof directory, 'Models directory path must be a string');
    assert(Array.isArray(extList), 'Model files extname list must be an array');
    extList.forEach(ext => assert('string' === typeof ext, 'Model files extname must be a string'));
    directory = new Directory(directory);
    directory.map(filePath => {
        let extname = path.extname(filePath);
        let name = path.basename(filePath, extname);
        let dirname = path.relative(directory.path, path.dirname(filePath));
        name = path.join(dirname, name);
        extname = extname.slice(1);
        return { filePath, name, extname };
    })
    .filter((file) => {
        return (!file.name.startsWith('.')) && extList.includes(file.extname);
    })
    .each(file => {
        const module = require(file.filePath);
        registerModel(app, module, file.name);
    });
}

function registerModel(app, module, name) {
    if (module instanceof Function && module.MVC_TYPE === LarkMVC.Model.MVC_TYPE) {
        app.mvc.use(module, { name });
        return;
    }
    if (module instanceof Object) {
        for (const key in module) {
            registerModel(app, module[key], path.join(name, key));
        }
    }
    return;
}

function registerViews(app) {
    if (!app.config.has('mvc/views')) {
        return;
    }
    const config = app.config.get('mvc/views');
    const views = new LarkViews(config);

    class View extends LarkMVC.View {
        async render(...args) {
            return await views.render(...args);
        }
    }

    app.mvc.use(View);
}
