Lark
====

Lark is a node.js framework based on [Koa](https://github.com/koajs/koa)

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![NPM downloads][downloads-image]][npm-url]
[![Node.js dependencies][david-image]][david-url]

## Install

Use [npm](https://www.npmjs.com/) to install

```
$ npm install --global lark
```

## CLI - TBD

## Get started

## Detailed Doc

### Initializing and starting an app

Create an instance of Lark, then call listen() to start.

```
const app = new Lark();
app.use(whateverMiddleware());
app.listen(3000);
```

If there is a file `package.json` under the directory of `process.mainModule.filename`, Lark will use attribute `lark` as the options.

```
// package.json
{
  ...
  "lark": "configs"
}
```

How to configure? See [lark-config](https://github.com/larkjs/lark-config).

### Configure middlewares

Lark provides a lot of useful middlewares. You can enable/disable and configure them by configs.

All middlewares wil be load in the following order:

#### config

Clone and bind config to `ctx`;

#### favicon

Handle requests of `/favicon.ico`.
See [koa-favicon](https://www.npmjs.com/package/koa-favicon) for more details

* _path_ [string] [default='static/favicon.ico']

The path to the icon resource.

#### static

Handle static resources requests.
See [koa-static](https://www.npmjs.com/package/koa-static) for more details.

* _path_ [string] [default='/static']

The url prefix to access static resources.

* _directory_ [string] [default='static']

The path of directory to access static resources.

#### log

Initialize logger and bind logger to `app` and `ctx`.
See [lark-log])(https://github.com/larkjs/lark-log) for more details.

_NOTE: If you disabled this middleweare, ctx.logger and app.logger will be no logger accessible_

* _accessMethod_ [string] [default=false]

The name of the menthod to print access logs. If false(or null, '', 0, etc), Lark will not print access logs.

#### router

Dispatch requests to different handlers by their paths.
See [lark-router](https://github.com/larkjs/lark-router) for more details.

* _directory_ [string] [default=undefined]

If set, lark-router will load that directory to generate routers.

[npm-image]: https://img.shields.io/npm/v/lark.svg?style=flat-square
[npm-url]: https://npmjs.org/package/lark
[travis-image]: https://img.shields.io/travis/larkjs/lark/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/larkjs/lark
[downloads-image]: https://img.shields.io/npm/dm/lark.svg?style=flat-square
[david-image]: https://img.shields.io/david/larkjs/lark.svg?style=flat-square
[david-url]: https://david-dm.org/larkjs/lark
[coveralls-image]: https://img.shields.io/codecov/c/github/larkjs/lark.svg?style=flat-square
[coveralls-url]: https://codecov.io/github/larkjs/lark
