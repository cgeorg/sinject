# sinject

sinject is a simple injection framework for javascript.  It supports cyclical dependency for frameworks such as CycleJS.

## Usage

```javascript
var sinject = require('sinject');

function module1() {
    var myThing1 = {
        inject: function(myThing2) {
            console.log('got mything2: ' + myThing2.hey);
        },
        hey: 'thing 1'
    };
    sinject.register('myThing1', myThing1, myThing1.inject, 'myThing2');
    return myThing1;
}

function module2() {
    var myThing2 = {
        inject: function(myThing1) {
            console.log('got mything1: ' + myThing1.hey);
        },
        hey: 'thing 2'
    };
    sinject.register('myThing2', myThing2, myThing2.inject, 'myThing1');
    return myThing2;
}

//Load our modules
module1();
module2();

//Bootstrap
sinject.bootstrap();
```
