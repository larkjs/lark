
global.PORT = 8848;

const agent   = require('supertest');
const http    = require('http');
const LarkMVC = require('lark-mvc');

const Lark  = require('..');
const app   = require('../example/app');

describe('lark app service', () => {
    let port = {};
    let server = {};
    let request = {};

    before(async () => {
        const result = await app;
        port = result.port;
        server = result.server;
        request = agent(server);
    });

    it('should start a server on 8888', (done) => {
        port.should.be.exactly(8888);
        server.should.be.an.instanceof(http.Server);
        done();
    });

    it('should response html on GET /page/welcome', (done) => {
        return request.get('/page/welcome')
            .expect(200)
            .expect('<h1>Welcome to my site, Anonymous</h1>\n', done);
    });

    it('should response json on GET /api/data', (done) => {
        return request.get('/api/data')
            .expect(200)
            .expect('{"name":"Anonymous","age":"********","gender":"male"}', done);
    });

    it('should response html on GET /', (done) => {
        return request.get('/')
            .expect(200)
            .expect('Welcome to the default page', done);
    });

    it('should response json on POST /api/data', (done) => {
        return request.post('/api/data')
            .expect(200)
            .expect('{"data":"OK"}', done);
    });

    it('should response 500 on GET /error', (done) => {
        return request.get('/error')
            .expect(500, done)
    });
});

