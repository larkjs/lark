/**
 * Created by mdemo on 14/12/4.
 */
module.exports = function (router) {
  router.get('/', function *(next) {
    this.body = 'Hello /user/list';
    yield next;
  });
  return router;
};
