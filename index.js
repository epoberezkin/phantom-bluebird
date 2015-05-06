'use strict';

module.exports = pb;

var MODULES = ['webpage', 'child_process'];

MODULES.forEach(function (moduleName) {
    pb[moduleName] = require('./lib/' + moduleName);
})

function pb() {
    MODULES.forEach(function (moduleName) {
        var module = pb[moduleName];
        require.stub(moduleName, module);
        global.require.stub(moduleName, module);
    });
}
