/**
 * lark - application.test.js.js
 * Copyright(c) 2014 larkjs-team(https://github.com/larkjs)
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */
var assert = require("assert");
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var cwd = process.cwd();
clear();

var app = require('../example/');
var lark = require('../lib/application');
var request = require('supertest').agent(app.run());
var should = require('should');

var development = {
    port: 3000,
    bootstrap: {enable: false},
    log: {
        files: {
            debug: {
                path: './logs/debug.log',
                options: {
                    encoding: 'utf8'
                }
            }
        }
    },
    mvc: {path: 'models'},
    router: {directory: 'controllers'},
    views: {directory: 'views', map: {ejs:"ejs"}},
    environment: 'development',
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
            .expect('\n<h2>lark</h2>\n\n', done);
    });
});


describe('lark-error-handler', function () {
    it('should response "500"', function (done) {
        request
            .get('/error')
            .expect(500);
        done();
    });
    it('should response "400"', function (done) {
        request
            .get('/badrequest')
            .expect(400);
        done();
    });
});


describe('lark-config', function () {
    it('should equal config', function (done) {
        delete app.config.configPath;
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
    var logger = larkLog;
    
    it('should be instance of Logger', function (done) {
        logger.should.be.an.instanceOf(require('lark-log/lib/Logger'));
        done();
    });

    it('should be "INFO xxx controller:index" in app.log', function (done) {
        var content = fs.readFileSync(path.join(cwd,'logs','app.log'));
        content.should.be.an.instanceOf(Buffer);
        content = content.toString().split('\n').filter(function (line) {
            return line.trim().match(/^INFO:/);
        });
        content.length.should.be.equal(2);
        should(content[0].match(/^INFO: \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} controller:index$/)).be.ok;
        should(content[1].match(/^INFO: \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} controller:index2$/)).be.ok;
        done();
    });
});

function clear () {
    function clearLogs () {
        exec('rm -rf ' + path.join(cwd, 'logs'));
        exec('rm -rf ' + path.join(cwd, 'example/.pm2'));
    };

    clearLogs();
    process.on('exit', clearLogs);
}
