'use strict';

const Lark  = require('lark');

class Welcome extends Lark.Controller {

    async main(ctx) {
        ctx.body = 'From Welcome';
    }

}

module.exports = Welcome;
