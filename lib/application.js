/**
 * Created by mdemo on 14/12/8.
 */

var koa = require('koa');
var router = require('lark-router');
var mvc = require('lark-mvc');
var bootstrap = require('lark-bootstrap');
koa.prototype.run = function(){

  this.use(mvc.middleware());

  if(!(this.config && this.config.router && this.config.router.enable === false)){
    this.use(router(this.config.router));
  }
  this.use(bootstrap(this));
  var port = this.config.port;
  this.listen(port, function(){
    console.log('lark is running on',port);
  });
};

module.exports = koa;
