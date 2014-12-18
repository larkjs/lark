/**
 * lark - application.test.js.js
 * Copyright(c) 2014 larkjs-team(https://github.com/larkjs)
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var request = require('supertest');
var lark = require('../lib/application');

describe('lib/application.js', function () {
  describe('app instance', function () {
    it('app instanceof lark should equal true', function (done) {
      var app = lark({
        directory: "example/config"
      });
      (app instanceof lark).should.equal(true);
      done();
    })
  })
});

