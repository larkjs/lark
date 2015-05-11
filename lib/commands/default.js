'use strict';

var program = require('commander');
var shell   = require('shelljs');

var exec = shell.exec;

module.exports = function (move_to_app_root) {
    function defualt_env (env) {
        var larkInfo = move_to_app_root();
        if ('string' === typeof env) {
            var set = true;
        }
        else {
            env = larkInfo('env');
        }
        if (env === 'production' || env === 'prod') {
            env = 'production';
            console.log("Default env is " + (set ? "set to " : "") + env);
            set && larkInfo('env', env);
        }
        else if (env === 'development' || env === 'dev') {
            env = 'development';
            console.log("Default env is " + (set ? "set to " : "") + env);
            set && larkInfo('env', env);
        }
        else {
            if (set && env === 'clear') {
                console.log("Default env is cleared");
                larkInfo('env', null);
            }
            else {
                console.log(set ? "Invalid default env, must be production|prod|development|dev" : "Default env is not set yet");
            }
        }
    }

    /**
     * comman default-env
     */
    program
        .command('default-env')
        .alias('de')
        .description('set default running environment for the app')
        .usage('[something]')
        .action(defualt_env);
};

