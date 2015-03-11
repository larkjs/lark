module.exports = function (mvc, lark) {
    var demo = mvc.pageService.create('demo');
    demo.render = function () {
        lark.log.info(123);
        return this.dataServices.demo.getData() + '-pageService'
    }
};