Lark
====

Lark is a node.js framework based on [Koa](https://github.com/koajs/koa)

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![NPM downloads][downloads-image]][npm-url]
[![Node.js dependencies][david-image]][david-url]


## Installation

```
$ npm install -g lark
```

  To use Lark you must be running __node 0.12__ or io.js for generator and promise support.
  
  If you don't have the permission to install globally, or your node is not installed globally, use alias to work around :

```
$ npm install lark
$ alias "lark=${YOUR_NODE_PATH} --harmony  `pwd`/node_modules/.bin/lark"
```

  Type `lark`, if lark is correctly installed, you'll see the usage info.

## Quick Start

  The quickest way to get started with lark is to utilize the executable lark to generate an application as shown below:

```
$ lark new lark-app
```

  Lark will create a project name _larkApp_ under the same directory.
  
  Try to run this app.

```
$ lark run
```

## Tutorial

[Tutorial(Chinese Only)](https://github.com/larkjs/lark/wiki/lark.js-%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97) 


## Examples

You can see demo here: https://github.com/larkjs/lark-demo .

## More

You can find more infomation in our [wiki](https://github.com/larkjs/lark/wiki) 

[npm-image]: https://img.shields.io/npm/v/lark.svg?style=flat-square
[npm-url]: https://npmjs.org/package/lark
[travis-image]: https://img.shields.io/travis/larkjs/lark/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/larkjs/lark
[downloads-image]: https://img.shields.io/npm/dm/lark.svg?style=flat-square
[david-image]: https://img.shields.io/david/larkjs/lark.svg?style=flat-square
[david-url]: https://david-dm.org/larkjs/lark
