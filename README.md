# phantom-bluebird

Core phantom modules promisified with [bluebird](https://github.com/petkaantonov/bluebird/blob/master/API.md)


## Usage

```
npm install phantom-bluebird --save
```

It is NOT a node module.

This module can be used in phantomjs scripts to use promise api instead of non-standard callback api of phantomjs modules.


## webpage module

Same as phantomjs [webpage module](http://phantomjs.org/api/webpage/), but method `open` is promisified.

```
var pb = require('phantom-bluebird');
var webpage = pb.webpage;
// or var webpage = require('phantom-bluebird/lib/webpage');

var page = webpage.create();

page.open('http://example.com')
.then(function (status) {
    console.log('Page title:', page.title);
})
.catch(function (err) {
    console.log('Can\'t open page');
})
.finally(function() {
    phantom.exit(); 
});
```

Only open method of page object is promisified at the moment.


## child_process module

Same as phantom [child_process module](http://phantomjs.org/api/child_process/), but methods are promisified.

`spawn` method supports additional options (see example below).


```
var pb = require('phantom-bluebird');
var spawn = pb.child_process.spawn;
// or var spawn = require('phantom-bluebird/lib/child_process').spawn;

spawn('node', ['--harmony', 'app'], {
    log: true,
    // with this option child process stdout and stderr are logged to console
    startedLog: 'started'
    // promise will resolve when child process logs string containing "started"
    // without 'startedLog' option, promise will resolve immediately
})
.bind({})
.then(function (child) {
    console.log('app started');
    this.app = child;
})
.then(function () {
    // ... do something, e.g. open page
})
.finally(function () {
    this.app.kill();
    phantom.exit();
});
```

TODO: example for `execFile` method.
