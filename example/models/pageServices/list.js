
module.exports = function(mvc){
  var demo = mvc.pageService.create('demo');
  demo.render = function(){
    return this.dataServices.demo.getData() + '-pageService'
  }
};