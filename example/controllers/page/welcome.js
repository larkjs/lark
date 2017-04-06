'use strict';

const misc = require('vi-misc');
const Lark = require('../../..');

let count = 0;

class Welcome extends Lark.Controller {

    async main(ctx) {
        ctx.body = `Welcome, you are the ${misc.number.th(count)} people to my site!`;
    }

}

exports.get = Welcome;
