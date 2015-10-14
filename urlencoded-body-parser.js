'use strict';

module.exports = function () {
    return function * (next) {
        if (this.is('urlencoded')) {
            yield this.receive('urlencoded');
        }
        yield next;
    };
};
