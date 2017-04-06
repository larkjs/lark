'use strict';

const Lark    = require('../../../..');

class PostDataController extends Lark.Controller {

    async main(ctx) {
        ctx.body = {
            data: 'OK',
        };
    }

}

module.exports = PostDataController;
