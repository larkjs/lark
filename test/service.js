/**
 * Test the service of Lark App
 **/
'use strict';

const debug   = require('debug')('lark.test.service');
const request = require('supertest');

const app     = require('../examples/demo');

debug('loading ...');

describe('service should response data', () => {
    it('should response "It works!" for GET /', done => {
        request(app).get('/')
            .expect(200, 'It works!')
            .end(done);
    });

    it('should response "Hello, haohao" for GET /hello/haohao', done => {
        request(app).get('/hello/haohao')
            .expect(200, 'Hello, haohao')
            .end(done);
    });

    it('should response 500 for GET /error', done => {
        request(app).get('/error')
              .expect(500, 'Internal Server Error')
              .end(done);
    });

    it('should response 404 for GET /unknown', done => {
        request(app).get('/unknown')
              .expect(404, 'Not Found')
              .end(done);
    });
});

debug('loaded!');
