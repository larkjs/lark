/**
 * lark - application.test.js.js
 * Copyright(c) 2014 larkjs-team(https://github.com/larkjs)
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var lark = require('../lib/application');
var app = require('../example/');
var request = require('supertest').agent(app.run());

var development = {
  environment: 'development',
  port: 3000,
  bootstrap: {enable: false},
  mvc: {path: 'example/models'},
  router: {directory: 'example/controllers'},
  views: {directory: 'example/views'}
};


describe('lib/application.js', function () {
  describe('app', function () {
    it('should be instance of lark', function (done) {
      var app = lark();
      (app instanceof lark).should.be.ok;
      done();
    })
  })
});


describe('lark-router', function () {
    it('should response "dao-dataService-pageService"', function (done) {
      request
        .get('/')
        .expect(200)
        .expect('dao-dataService-pageService', done);
    });
    it('should response "404"', function (done) {
      request
        .get('/user/')
        .expect(404);
      done();
    });
    it('should response "Hello /user/list"', function (done) {
      request
        .get('/user/list')
        .expect(200)
        .expect('Hello /user/list', done);
    });
});


describe('lark-config', function () {
  it('should equal config', function (done) {
    JSON.stringify(app.config).should.equal(JSON.stringify(development));
    done();
  })
});

describe('lark-views', function(){

  it('should response "views/user/index.html', function (done) {
    request
        .get('/user/create')
        .expect(200)
        .expect('<!DOCTYPE html>\n<html>\n<head lang="zh-CN">\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <title>index</title>\n</head>\n<body>\nuser/index.html\n</body>\n</html>\n'
        , done);
  });
});


