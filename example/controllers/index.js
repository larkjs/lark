/**
 * Created by mdemo on 14/12/4.
 */

module.exports = function (router) {
    router.get('/', function *(next) {
        this.log.info('controller:index');
        this.log.info('controller:index2');
        this.body = this.pageServices['demo'].render();
        yield next;
    });
    return router;
};


