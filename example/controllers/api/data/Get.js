'use strict';

const Lark    = require('../../../..');

class GetDataController extends Lark.Controller {

    async main(ctx) {
        ctx.body = {
            data: 'This is your data',
        };
    }

}

module.exports = GetDataController;
