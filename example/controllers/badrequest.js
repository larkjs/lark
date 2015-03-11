/**
 * Created by mdemo on 14/12/4.
 */

module.exports = function (router) {
    router.get('/error', function *(next) {
        return this.throw(new Error("Faked Error"), 400);
    });
    return router;
};


