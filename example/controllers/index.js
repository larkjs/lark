/**
 * Created by mdemo on 14/12/4.
 */

module.exports = function (router) {
  router.get('/', function *(next) {
    this.body = this.pageServices['demo'].render();
    yield next;
  });
  return router;
};
