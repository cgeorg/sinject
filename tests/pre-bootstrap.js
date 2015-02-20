var test = require('tape-catch');

/*
 * t.timeoutAfter is used when we have an assertion in a callback -
 * otherwise if the callback is never called the test will hang
 */

test('inject pre-bootstrap', function (t) {
  t.timeoutAfter(100);
  t.plan(1);

  var obj = {}, name = 'obj';

  var sinject = require('../sinject').createNew();
  sinject.provide(name, obj);
  sinject.inject(function (_obj) {
    t.equals(_obj, obj, 'Injected correct object');
  }, name);
  sinject.bootstrap();
});

test('inject pre-bootstrap with injection before provide', function (t) {
  t.timeoutAfter(100);
  t.plan(1);

  var obj = {}, name = 'obj';

  var sinject = require('../sinject').createNew();
  sinject.inject(function (_obj) {
    t.equals(_obj, obj, 'Injected correct object');
  }, name);
  sinject.provide(name, obj);
  sinject.bootstrap();
});

test('inject multiple dependencies', function (t) {
  t.timeoutAfter(100);
  t.plan(2);

  var obj = {}, name = 'obj',
    obj2 = {}, name2 = 'obj2';

  var sinject = require('../sinject').createNew();
  sinject.provide(name, obj);
  sinject.provide(name2, obj2);
  sinject.inject(function (_obj, _obj2) {
    t.equals(_obj, obj, 'Injected correct object');
    t.equals(_obj2, obj2, 'Injected correct object');
  }, name, 'obj2');
  sinject.bootstrap();
});
