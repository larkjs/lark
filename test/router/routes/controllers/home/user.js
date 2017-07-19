'use strict';

const Lark  = require('lark');

class User extends Lark.Controller {

    async main(ctx) {
        ctx.body = `Hello, ${ctx.params.name}`;
    }

}

module.exports = User;
