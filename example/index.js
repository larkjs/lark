/**
 * Created by mdemo on 14/12/8.
 */
var lark = require('..');
var app = module.exports = lark({
  directory: "example/config"
});

app.listen(app.config.port, function () {
  console.log('running on', app.config.port);
});
