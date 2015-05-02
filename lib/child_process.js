'use strict';

var process = require('child_process')
    , Promise = require('bluebird');

module.exports = {
    spawn: spawn,
    execFile: Promise.promisify(process.execFile)
};


function spawn(cmd, args, opts) {
    opts = opts || {};
    return new Promise(function (resolve, reject) {
        var child = process.spawn(cmd, args);

        if (opts.log || opts.startedLog) {
            if (opts.startedLog) {
                try {
                    var waiting = true;
                    var regex = new RegExp(opts.startedLog);
                } catch(e) {
                    reject(e);
                }
            }
            subscribe('stdout');
            subscribe('stderr');
        }

        if (!opts.startedLog) resolve(child);

        function subscribe(out) {
            child[out].on('data', function (data) {
                if (opts.log) console.log(data);
                if (waiting && regex.test(data)) {
                    waiting = false;
                    setTimeout(function() { resolve(child) });
                }
            });
        }
    });
}
