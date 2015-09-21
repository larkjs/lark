/**
 * lark.js - lib/parsers.js
 * Copyright(c) 2015 larkjs-team
 * MIT Licensed
 */

'use strict';

var extend = require('extend');
var path   = require('path');
var bodyParsers = require('koa-body-parsers');
var Readable = require('stream').Readable;

module.exports = function (app, oriConfig) {
    bodyParsers(app);

    var config = makeConfig(oriConfig);
    if (config.enable) {
        return;
    }

    app.request.body = function * (options) {
        var request = this;
        if (request._parsers_body) {
            return request._parsers_body;
        }
        var body;
        var detailedType = request.get('content-type');
        var type = request.is.apply(request, Object.keys(config.types));
        if (!type || 'string' !== typeof type) {
            return;
        }
        if (type.match(/^image\//)) {
            type = 'image/*';
        }
        var typeConfig = config.types[type];
        if (!typeConfig || typeConfig.enable === false) {
            return;
        }
        switch (type) {
            case 'json' :
            case 'urlencoded' :
            case 'text' :
            case 'buffer' :
                body = yield request[type](typeConfig.limit);
                break;
            case 'image/*' :
                var extname = detailedType.split('/')[1];
                request.req.mime = request.req.mimeType = detailedType;
                request.req.name = request.req.name || 'upload_image';
                request.req.filename = request.req.filename || 'upload_image.' + extname;
                if (request.saveAs) {
                    body = yield save(app, request.saveAs, request.req);
                }
                else {
                    body = yield readable2buffer(request.req);
                }
                break;
            case 'multipart' :
                var parts = request.parts(typeConfig);
                var kv = {};
                var part;
                var count = 0;
                while (part = yield parts) {
                    count++;
                    if (Array.isArray(part)) {
                        var key = part[0] || 'key' + count;
                        var value = part[1];
                    }
                    else {
                        var key = part.fieldname || 'file' + count;
                        var value = {
                            filename: part.filename,
                            name: part.fieldname,
                            mime: part.mime,
                            mimeType: part.mimeType,
                        };
                        if (request.saveAs) {
                            value.save = yield save(app, request.saveAs, part);
                        }
                        else {
                            value.content = yield readable2buffer(part);
                        }
                    }
                    if (kv[key] !== undefined) {
                        var error = new Error('Duplicated keys');
                        error.status = 400;
                        throw error;
                    }
                    kv[key] = value;
                }
                body = kv;
                break;
            default:
                break;
        }
        request._parsers_body = body;
        return request._parsers_body;
    };
}

var TYPES = ['json','urlencoded','text','buffer','multipart','image/*'];

function makeConfig (oriConfig) {
    var config = {
        types: {},
    };

    if (!oriConfig || oriConfig.enable === false || !(oriConfig.types instanceof Object)) {
        config.enable = false;
        return config;
    }

    TYPES.forEach(function (type) {
        var itemConfig = extend(true, extend(true , {}, oriConfig.types['*']), oriConfig.types[type] || {});
        config.types[type] = itemConfig;
    });

    if (Object.keys(config.types).length <= 0) {
        config.enable = false;
        return config;
    }

    return config;
}

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
function * save (app, saveAs, readable) {
    if (!(saveAs instanceof Function)) {
        throw new Error('saveAs should be a function to generate save path');
    }
    var savePath = path.join(rootPath, saveAs(readable));
    if (savePath.slice(0, rootPath.length) !== rootPath) {
        throw new Error('Error permission denied!');
    }
    yield app.context.save(readable, savePath);
    return savePath;
}
