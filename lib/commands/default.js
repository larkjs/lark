'use strict';

var program = require('commander');

var commandsShortMap = {
    'env' : {
        'production':  ['pro', 'prod', 'product'],
        'development': ['dev', 'develop']
    }
};

module.exports = function (move_to_app_root) {
    function defaults (key, value, clear) {
        var larkInfo = move_to_app_root();
        if (!key || key.length < 1) {
            return showUsage();
        }
        if (value && value.length > 0) {
            var set = true;
        }
        else {
            value = larkInfo(key);
        }
        var shortMap = commandsShortMap[key];
        if (shortMap) {
            for (var name in shortMap) {
                var alias = Array.isArray(shortMap[name]) ? shortMap[name] : [shortMap[name]];
                if (alias.indexOf(value) >= 0) {
                    value = name;
                    break;
                }
            }
        }
        if (clear) {
            console.log("Default " + key + " is cleared");
            larkInfo(key, null);
            return;
        }
        if (set) {
            larkInfo(key, value);
            value = '[' + value + ']';
        }
        else if (!value) {
            value = 'not set yet';
        }
        console.log("Default " + key + " is " + (set ? "set to " : "") + value);
    }

    /**
     * comman set
     */
    program
        .command('env [env]')
        .description('set a default env for this app')
        .action(function (env) {
            defaults('env', env);
        })

    program
        .command('default <key> [value]')
        .description('set the default variable for this app')
        .action(function (key, value) {
            defaults(key, value);
        });

    program
        .command('clear <key>')
        .description('clear the default variable for this app')
        .action(function (key) {
            defaults(key, null, true);
        });
};

