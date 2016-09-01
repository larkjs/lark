/**
 * Example of Lark
 **/
'use strict';

const debug   = require('debug')('lark.examples');

const Lark    = require('..');
const proc    = require('./process');

const app = new Lark({
    log: {
        accessMethod: 'access',
        methods: {
            access: {
                output: 'access',
                level: 4,
            }
        },
        outputs: {
            access: {
                type: 'file',
                path: 'access.log',
                format: '<%- method %>:\t<%- new Date() %>\t<%- content %>',
            }
        }
    }
}).saveInstance();

app.use((ctx, next) => {
    ctx.body = 'hello';
    Lark.getInstance().logger.fatal("Faked Fatal Log");
    return next();
});

app.use(proc);

app.listen(3000);
