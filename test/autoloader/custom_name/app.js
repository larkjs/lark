'use strict';

const agent = require('supertest');
const http  = require('http');

const Lark  = require('../../..');

describe('use no autoload config', () => {

    const oriModule = process.mainModule;
    let app = {};
    let port = {};
    let server = {};
    let request = {};

    before(async () => {
        process.mainModule = module;
        app = new Lark();
        app.config.set('autoloader/name', 'ooooo');
        app.config.set('autoloader/directory', { foo: 'foo', bar: 'bar' });
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

        return request.get('/')
            .expect(404);
    });

    it('should set global var "ooooo"', async () => {
        ooooo.should.be.ok;
        ooooo.foo.should.be.ok;
        ooooo.bar.should.be.ok;
    });
});
