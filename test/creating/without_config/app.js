'use strict';

const agent = require('supertest');
const http  = require('http');

const Lark  = require('../../..');

describe('creating without config', () => {

    const oriModule = process.mainModule;
    let app = {};
    let server = {};

    before(async () => {
        process.mainModule = module;
        app = new Lark();
        app.config.remove('bootstrap/middlewares');
    });

    after(async () => {
        (server instanceof http.Server) && server.close();
        process.mainModule = oriModule;
    });

    it('should throw error that port is not configured', async () => {
        let error = {};
        try { await app.start() } catch (e) { error = e }
        error.should.be.an.instanceof(Error)
             .with.property('message', 'No server port found in config["server/port"]');
    });

    it('should work with port configured', async () => {
        app.config.set('server/port', PORT);
        const result = await app.start();
        server = result.server;
        result.port.should.be.exactly(PORT);
        result.server.should.be.instanceof(http.Server);
        const request = agent(server);
        return request.get('/').expect(200);
    });
});
