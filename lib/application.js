/**
 * Created by mdemo on 14/12/8.
 */

var koa = require('koa');
var router = require('lark-router');
koa.prototype.run = function(){

  if(!(this.config && this.config.router && this.config.router.enable === false)){
    this.use(router(this.config.router));
  }

  var port = this.config.port;
  this.listen(port, function(){
    console.log('lark is running on',port);
  });
};

module.exports = koa;
