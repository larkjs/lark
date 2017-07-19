'use strict';

const Lark  = require('lark');

class User extends Lark.Controller {

    async main(ctx) {
        ctx.body = `Hello, ${ctx.params.name}, this is the profile page`;
    }

}

module.exports = User;
