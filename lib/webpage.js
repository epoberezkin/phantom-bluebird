'use strict';

var webpage = require('webpage')
    , Promise = require('bluebird');

exports.create = function(opts) {
    var page = webpage.create(opts);
    var open = page.open;
    page.open = openAsync;
    return page;


    function openAsync() { // ... arguments
        var args = Array.prototype.slice.call(arguments);

        return new Promise(function (resolve, reject) {
            args.push(pageOpened);
            open.apply(page, args);

            function pageOpened(status) {
                if (status == 'success') resolve(status);
                else reject(new Error(status));
            }
        });
    };
};
