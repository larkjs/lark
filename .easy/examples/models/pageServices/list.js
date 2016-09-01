'use strict';

module.exports = function (mvc, lark) {
    var demo = mvc.pageService.create('demo');
    demo.render = function () {
        return this.dataServices.demo.getData() + '-pageService';
    };
};