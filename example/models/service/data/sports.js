'use strict';

const Lark = require('../../../..');

const name = 'SPORT';

class Sport extends Lark.Model {
    get type() {
        return 'Sport';
    }
}

class Soccer extends Sport {
    get name() {
        return 'SOCCER';
    }
}

class Tennis extends Sport {
    get name() {
        return 'TENNIS';
    }
}

module.exports = { name, Sport, Soccer, Tennis };
