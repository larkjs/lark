'use strict';

const agent = require('supertest');
const http  = require('http');
const Lark  = require('lark');

describe('using routes for router', () => {
    const oriModule = process.mainModule;
    let app = {};
    let port = {};
    let server = {};
    let request = {};

    before(async () => {
        process.mainModule = module;
        app = new Lark();
        app.config.set('log', {});
        app.config.set('server/port', PORT);
        await app.config.use('configs');
        const result = await app.start();
        port = result.port;
        server = result.server;
        request = agent(server);
    });

    after(async () => {
        (server instanceof http.Server) && server.close();
        process.mainModule = oriModule;
    });

    it('should route correctly on /you-are-welcome', (done) => {
        request.get('/you-are-welcome')
            .expect(200)
            .expect('From Welcome')
            .end(done);
    });

    it('should route correctly on /welcome-home/:name', (done) => {
        request.get('/welcome-home/haohao')
            .expect(200)
            .expect('Hello, haohao')
            .end(done);
    });

    it('should route correctly on /welcome-profile/:name', (done) => {
        request.get('/welcome-profile/haohao')
            .expect(200)
            .expect('Hello, haohao, this is the profile page')
            .end(done);
    });

    it('should response 404 on /', (done) => {
        request.get('/')
            .expect(404)
            .end(done);
    });
});
