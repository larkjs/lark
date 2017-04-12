'use strict';

const Lark = require('../../../..');

class User extends Lark.Model {

    constructor(name) {
        super();
        this.name = name || 'Anonymous';
    }

    async getInfo(name) {
        return {
            name: this.name,
            age: $.lib.mosaic(28),
            gender: 'male',
        };
    }

}

module.exports = User;
