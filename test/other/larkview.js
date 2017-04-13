'use strict';

const LarkMVC = require('lark-mvc');
const Lark    = require('../..');

describe('class Lark', () => {
    it('should have correct properties', async () => {
        Lark.Controller.should.be.exactly(LarkMVC.Controller);
        Lark.Model.should.be.exactly(LarkMVC.Model);
        Lark.View.should.be.exactly(LarkMVC.View);
    });
});
