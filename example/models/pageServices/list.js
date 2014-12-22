<<<<<<< HEAD
var pageService = require('lark-mvc').pageService;
var demo = pageService.create('demo');
=======
var pageService = require('lark-mvc').pageService
var demo = pageService.create('demo')
>>>>>>> master
demo.render = function () {
  return this.dataServices.demo.getData() + '-pageService'
};
module.exports = demo;
