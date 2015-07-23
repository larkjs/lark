console.log("Set main module to example/index.js");
process.mainModule = module;

var lark = require('..');
var app = module.exports = lark({
        directory: "config"
    });
    app.run(3000, function(port){
        console.log('running on', port);
    });
