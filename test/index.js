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
var assert = require("assert");

var development = {
    environment: 'development',
    port: 3000,
    bootstrap: {enable: false},
    log: {
        files: {
            debug: {
                path: './example/logs/debug.log',
                options: {
                    encoding: 'utf8'
                }
            }
        }
    },
    mvc: {path: 'example/models'},
    router: {directory: 'example/controllers'},
    views: {directory: 'example/views', map: {ejs:"ejs"}}
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
            .expect('<h2>lark</h2>', done);
    });
});


describe('lark-config', function () {
    it('should equal config', function (done) {
        JSON.stringify(app.config).should.equal(JSON.stringify(development));
        done();
    })
});

describe('lark-views', function () {

    it('should response "views/user/index.html', function (done) {
        request
            .get('/user/create')
            .expect(200)
            .expect(/user create/, done);
    });
});


describe('lark-log', function () {
    it('should equal without config', function () {
        var logger = lark.log();
        var o = logger.info('hello');
        assert.equal(o['message'], 'hello');
        assert.equal(o['file'], 'index.js');
        assert.equal(o['level'], 3);
        assert.equal(o['title'], 'info');
    });

});
