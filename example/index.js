/**
 * Created by mdemo on 14/12/8.
 */
var lark = require('..');
var http = lark.http;
var app = module.exports = lark({
  directory: "example/config"
});

app.run(3000, function(port){
  console.log('running on', port);
});

//http.get('http://www.baidu.com').then(function(res){
//  console.log(res[1].statusCode);//200
//});
//
//http.get('http://www.baidu.com', function(err, data, res){
//  console.log(res.statusCode);//200
//});

