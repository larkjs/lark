'use strict';

const db = {
    async query(table, name) {
        return new Promise(resolve => {
            const result = {
                name: name,
                age: 28,
                gender: 'male',
            };
            setTimeout(() => resolve(result), 100);
        });
    }
};

module.exports = db;
