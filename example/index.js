console.log("Set main module to example/index.js");
process.mainModule = module;

var lark = require('..');
var app = module.exports = lark({
        directory: "config"
    });
if (!module.parent) { // 如果是test中requre启动就不执行下面的run
    app.run(3000, function(port){
        console.log('running on', port);
    });
}
