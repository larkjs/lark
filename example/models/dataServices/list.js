var dataService = require('lark-mvc').dataService;
var demo = dataService.create('demo');
demo.getData = function () {
  return this.daoServices.demo.getData() + '-dataService'
};
module.exports = demo;
