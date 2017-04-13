'use strict';

const db = global.$.lib.db;

const user = {
    async getInfoByName(name) {
        const info = await db.query('user', name);
        return info;
    }
};

module.exports = user;
