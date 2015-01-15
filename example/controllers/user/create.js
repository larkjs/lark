/**
 * Created by mdemo on 14/12/4.
 */
module.exports = function (router) {
  router.get('/', function *(next) {
    yield this.render('user/');
    yield next;
  });
  return router;
};
