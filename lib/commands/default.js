'use strict';

var program = require('commander');

var shortMap = {
    'production':  ['pro', 'prod', 'product'],
    'development': ['dev', 'develop']
};

module.exports = function (move_to_app_root) {
    function defualt_env (env) {
        var larkInfo = move_to_app_root();
        if ('string' === typeof env && env.length > 0) {
            var set = true;
        }
        else {
            env = larkInfo('env');
        }
        for (var name in shortMap) {
            var alias = Array.isArray(shortMap[name]) ? shortMap[name] : [shortMap[name]];
            if (alias.indexOf(env) >= 0) {
                env = name;
                break;
            }
        };
        if (set && env === 'clear') {
            console.log("Default env is cleared");
            larkInfo('env', null);
            return;
        }
        if (set) {
            larkInfo('env', env);
            env = '[' + env + ']';
        }
        else if (!env) {
            env = 'not set yet';
        }
        console.log("Default env is " + (set ? "set to " : "") + env);
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

