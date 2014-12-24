module.exports = function(mvc){
  var demo = mvc.dao.create('demo');
  demo.getData = function () {
    return 'dao'
  };
};

