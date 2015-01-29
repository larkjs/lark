/**
 * Created by mdemo on 14/12/4.
 */

module.exports = function (router) {
    router.get('/', function *(next) {
        this.body = this.pageServices['demo'].render();
        this.log.debug('debug info log');
        yield next;
    });
    return router;
};


