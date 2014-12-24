module.exports = function(mvc){
  var demo = mvc.dataService.create('demo');
  demo.getData = function () {
    return this.daoServices.demo.getData() + '-dataService'
  };
};
