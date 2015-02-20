var test = require('tape');
var requireDirectory = require('require-directory');

test.createStream().pipe(process.stdout);

requireDirectory(module, './tests');