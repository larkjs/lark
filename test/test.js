/**
 * Test the service of Lark App
 **/
'use strict';

const debug   = require('debug')('lark.test.test');
const request = require('supertest');

const app     = require('../examples/test/app');

debug('loading ...');

describe('lark app listening on 2 ports', () => {
    it('should response 200 for port 1', done => {
        request(app.port1).get('/')
            .expect(200, 'It works!')
            .end(done);
    });
});

debug('loaded!');
