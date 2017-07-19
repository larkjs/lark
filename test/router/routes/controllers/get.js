'use strict';

const Lark  = require('lark');

class Index extends Lark.Controller {

    async main(ctx) {
        ctx.body = 'This should never be shown';
    }

}

module.exports = Index;
