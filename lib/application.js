/**
 * Created by mdemo on 14/12/8.
 */

var koa = require('koa');
var bootstrap = require('lark-bootstrap');
koa.prototype.run = function(){

  if(this.config.bootstrap.enable){
    this.use(bootstrap(this.config.bootstrap));
  }

  var port = this.config.port;
  this.listen(port, function(){
    console.log('lark is running on',port);
  });
};

module.exports = koa;
