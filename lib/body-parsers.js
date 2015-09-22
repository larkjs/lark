/**
 * Lark - lib/body-parsers.js
 * Copyright(c) 2015 larkjs-team
 * MIT Licenced
 **/

'use strict';

var extend      = require('extend');
var path        = require('path');
var Readable    = require('stream').Readable;
var bodyParsers = require('koa-body-parsers');

var defaultTypeList = {
    'text' : ['text', 'text/*'],
    'json' : ['json', 'application/json'],
    'urlencoded' : ['urlencoded', 'application/x-www-form-urlencoded'],
    'multipart' : ['multipart', 'multipart/*'],
    'buffer': ['buffer', 'application/octet-stream'],
    'file' : ['image/*'],
};
var stringTypes = {};
var regexpTypes = [];

var parsers = module.exports = function (app, config) {
    /**
     * Extend app with Koa body parsers
     **/
    bodyParsers(app);

    init(config);

    app.request.__defineSetter__('body', function () {
        throw new Error('ctx.request.body is read only');
    });
    app.request.__defineGetter__('body', function () {
        return this._body;
    });

    app.context.receive = app.request.receive = function * () {
        if (this.request.body) {
            console.warn('ctx.request.receive should be not called after body received and parsed');
            return this.request.body;
        }
        var accepts = [].slice.call(arguments);
        var options = {};
        if (accepts[accepts.length - 1] instanceof Object) {
            options = accepts.pop();
        }
        accepts.forEach(function (accept) {
            if ('string' !== typeof accept) {
                throw new Error('ctx.request.receive only accepts string as accepted types, ' + typeof accept + ' received');
            }
        });
        var type = this.is.apply(this, accepts);
        if (!type) {
            return this.throw('Only accepts ' + accepts.join(' '), 405);
        }
        var mainType = makeMainType(type);
        var receiveConfig = extend(true, {}, config[mainType]);
        receiveConfig = extend(true, receiveConfig, options);
        this.request._body = yield receiveBody(this, mainType, type, receiveConfig);
        return this.request.body;
    };
};

function init (config) {
    config = config || {};
    var configForAll = config['*'];
    delete config['*'];
    var typeList = extend(true, {}, defaultTypeList);
    if (configForAll) {
        for (var name in config) {
            config[name] = extend(true, extend(true, {}, configForAll), config[name]);
            typeList[name] = config[name].types || defaultTypeList[name] || [];
        }
    }
    var typenameList = [];
    for (var key in typeList) {
        var typenames = typeList[key];
        typenames = Array.isArray(typenames) ? typenames : [typenames];
        typenames.forEach(function (item) {
            if (typenameList.indexOf(item) >= 0) {
                throw new Error('Duplicated type name : ' + item);
            }
            typenameList.push(item);
            if ('string' !== typeof item) {
                throw new Error('Type item must be a string, ' + typeof item + ' received');
            }
            if (item.indexOf('*') < 0) {
                stringTypes[item] = key;
            }
            else {
                regexpTypes.push({
                    regexp: new RegExp("^" + item.replace(/\//g, '\\/').replace(/\./g,'\\.').replace(/\*/g, ".*?" + "$")),
                    type: key,
                });
            }
        });
    }
}

function makeMainType (type) {
    var mainType = stringTypes[type];
    if (!mainType) {
        for (var i = 0; i < regexpTypes.length; i++) {
            var item = regexpTypes[i];
            var regexp = item.regexp;
            var typename = item.type;
            if (regexp.test(type)) {
                mainType = typename
                break;
            }
        };
    }
    return mainType;
};

var receivers = {};
var extendedReceivers = {};
module.exports.extend = function (name, handler) {
    if ('string' !== typeof name || !(handler instanceof Function)) {
        throw new Error('Extends on invalid params, name should be a string, ' + typeof name + ' given, handler should be a Function, ' + typeof handler + ' given');
    }
    extendedReceivers[name] = handler;
};

receivers.json = receivers.urlencoded = receivers.text = receivers.buffer  = function * (ctx, config, type, mainType) {
    return yield ctx.request[mainType](config.limit);
};
receivers.file = function * (ctx, config, type, mainType) {
    if (config.saveAs) {
        ctx.req.name = ctx.get('name') || 'userfile';
        ctx.req.fieldname = ctx.get('fieldname') || 'userfile';
        ctx.req.mime = ctx.mimeType = type;
        return yield save(ctx, config.saveAs, ctx.req);
    }
    else {
        return yield readable2buffer(ctx.req);
    }
};
receivers.multipart = function * (ctx, config, type, mainType) {
    var request = ctx.request;
    var parts = request.parts(config);
    var kv = {};
    var part;
    var paramCount = 0;
    var fileCount = 0;
    while (part = yield parts) {
        if (Array.isArray(part)) {
            paramCount++;
            var key = part[0] || 'param_' + paramCount;
            var value = part[1];
        }
        else {
            fileCount++;
            var key = part.fieldname || 'file_' + fileCount;
            var value = {
                filename: part.filename,
                name: part.fieldname,
                mime: part.mime,
                mimeType: part.mimeType,
            };
            if (config.saveAs) {
                part.name = part.fieldname;
                part.args = extend(true, {}, kv);
                value.saveAs = yield save(ctx, config.saveAs, part);
            }
            else {
                value.content = yield readable2buffer(part);
            }
            if (kv[key] !== undefined) {
                return ctx.throw('Duplicated fieldname', 400);
            }
            kv[key] = value;
        }
    }
    return kv;
};


function * receiveBody (ctx, mainType, type, config) {
    if (config.enable === false) {
        return ctx.throw(405);
    }
    return yield (extendedReceivers[type] || receivers[mainType] || extendedReceivers[mainType])(ctx, config, type, mainType);
};

function * readable2buffer (readable) {
    if (!(readable instanceof Readable)) {
        throw new Error('Param readable must be an instance of Readable!');
    }
    return new Promise (function (resolve, reject) {
        var buffer = [];
        readable.on('data', function (chunk) {
            buffer.push(chunk);
        });
        readable.on('end', function () {
            buffer = Buffer.concat(buffer);
            return resolve(buffer);
        });
        readable.on('error', function (e) {
            return reject(e);
        });
    });
}

var rootPath = path.dirname(process.mainModule.filename);
function * save (ctx, saveAs, readable) {
    var savePath;
    if (saveAs instanceof Function) {
        savePath = saveAs(readable);
    }
    else if ('string' === typeof saveAs) {
        savePath = saveAs;
        for (var propname in readable) {
            var prop = readable[propname];
            var proptype = typeof prop;
            if (['string', 'number', 'boolean'].indexOf(proptype) >= 0 && savePath.indexOf(propname)) {
                savePath = savePath.replace(new RegExp('{'+ propname + '}', 'g'), prop);
            }
        }
    }
    savePath = path.join(rootPath, savePath);
    if (savePath.slice(0, rootPath.length) !== rootPath) {
        throw new Error('Error permission denied!');
    }
    yield ctx.save(readable, savePath);
    return savePath;
}
