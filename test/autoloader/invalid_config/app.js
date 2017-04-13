'use strict';

const agent = require('supertest');
const http  = require('http');

const Lark  = require('../../..');

describe('use wrong autoload config', () => {

    const oriModule = process.mainModule;
    let app = {};
    let port = {};
    let server = {};
    let request = {};

    before(async () => {
        process.mainModule = module;
        app = new Lark();
        app.config.set('autoloader/directory', 'How are you');
        app.config.set('server/port', PORT);
        const result = await app.start();
        port = result.port;
        server = result.server;
        request = agent(server);
    });

    after(async () => {
        server.close();
        process.mainModule = oriModule;
    });

    it('should be ok', async () => {
        app.should.be.an.instanceof(Lark);
        port.should.be.exactly(PORT);
        server.should.be.an.instanceof(http.Server);

        request.get('/')
            .expect(404);
    });
});
