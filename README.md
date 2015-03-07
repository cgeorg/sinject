# sinject

sinject is a simple injection framework for javascript.  It was built because circular dependencies and module loaders
don't play nicely together, and neither do circular dependencies and constructor injection.

Are circular dependencies considered harmful?  Well, they can be a code smell in some architectures.  With a
unidirectional application approach however, cyclical dependency is a sign of a truly reactive architecture.  For an
example of such an architecture, check out [CycleJS](https://github.com/staltz/cycle).

That said, sinject will work just fine in an any architecture - it's real lightweight and flexible.  Check out the
example below.

[![npm version](https://badge.fury.io/js/sinject.svg)](http://badge.fury.io/js/sinject)
[![Dependency Status](https://david-dm.org/cgeorg/sinject.svg)](https://david-dm.org/cgeorg/sinject)
[![devDependency Status](https://david-dm.org/cgeorg/sinject/dev-status.svg)](https://david-dm.org/cgeorg/sinject#info=devDependencies)

## Usage

```javascript
var sinject = require('sinject');

function module1() {
    var myThing1 = {
        $inject: ['myThing2', function(myThing2) {
            console.log('got mything2: ' + myThing2.hey);
        }],
        hey: 'thing 1'
    };
    sinject.register('myThing1', myThing1);
    return myThing1;
}

function module2() {
    var myThing2 = {
        inject: ['myThing1', function(myThing1) {
            console.log('got mything1: ' + myThing1.hey);
        }],
        hey: 'thing 2'
    };
    sinject.register('myThing2', myThing2);
    return myThing2;
}

//Load our modules
module1();
module2();

//Bootstrap
sinject.bootstrap();
```

## Installation

`npm install sinject`