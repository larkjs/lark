/**
 * Created by mdemo on 14/12/4.
 */
module.exports = function(router){
  router.get('/', function *(){
    this.body = 'Hello /user/list';
  });
  return router;
};
