var pageService = require('lark-mvc').pageService;
var demo = pageService.create('demo');
demo.render = function () {
  return this.dataServices.demo.getData() + '-pageService'
};
module.exports = demo;
