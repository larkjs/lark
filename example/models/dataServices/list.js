//var dataService = require('lark-mvc').dataService
var dataService = require('lark-mvc').dataService
var demo = dataService.create('demo')
demo.getData = function () {
  return this.daoServices.demo.getData() + '\n' +
    'demo dataServices is loaded!'
}
module.exports = demo
