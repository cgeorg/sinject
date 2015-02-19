var test = require('tape-catch');

/*
 * t.timeoutAfter is used when we have an assertion in a callback -
 * otherwise if the callback is never called the test will hang
 */

test('inject pre-bootstrap', function (t) {
  t.timeoutAfter(100);
  t.plan(1);

  var obj = {}, name = 'obj';

  var sinject = require('./sinject').createNew();
  sinject.provide(name, obj);
  sinject.inject(function (_obj) {
    t.equals(_obj, obj, 'Injected correct object');
  }, ['obj']);
  sinject.bootstrap();
});

test('inject pre-bootstrap with injection before provide', function (t) {
  t.timeoutAfter(100);
  t.plan(1);

  var obj = {}, name = 'obj';

  var sinject = require('./sinject').createNew();
  sinject.inject(function (_obj) {
    t.equals(_obj, obj, 'Injected correct object');
  }, ['obj']);
  sinject.provide(name, obj);
  sinject.bootstrap();
});

test('inject post-bootstrap', function (t) {
  t.timeoutAfter(100);
  t.plan(1);

  var obj = {}, name = 'obj';

  var sinject = require('./sinject').createNew();
  sinject.bootstrap();
  sinject.provide(name, obj);
  sinject.inject(function (_obj) {
    t.equals(_obj, obj, 'Injected correct object');
  }, ['obj']);
});

test('inject post-bootstrap with injection before provide', function (t) {
  t.timeoutAfter(100);
  t.plan(1);

  var obj = {}, name = 'obj';

  var sinject = require('./sinject').createNew();
  sinject.bootstrap();
  sinject.inject(function (_obj) {
    t.equals(_obj, undefined, 'Injected undefined');
  }, ['obj']);
  sinject.provide(name, obj);
});

test('inject circular with provide and inject', function (t) {
  t.timeoutAfter(100);
  t.plan(2);

  var obj1 = {
        inject: function (_obj2) {
          t.equals(_obj2, obj2, 'Injected correct object');
        }
      },
      obj2 = {
        inject: function (_obj1) {
          t.equals(_obj1, obj1, 'Injected correct object');
        }
      };

  var sinject = require('./sinject').createNew();
  sinject.provide('obj1', obj1);
  sinject.inject(obj1.inject, ['obj2']);

  sinject.provide('obj2', obj2);
  sinject.inject(obj2.inject, ['obj1']);

  sinject.bootstrap();
});

test('inject circular with register', function (t) {
  t.timeoutAfter(100);
  t.plan(2);

  var obj1 = {
        inject: function (_obj2) {
          t.equals(_obj2, obj2, 'Injected correct object');
        }
      },
      obj2 = {
        inject: function (_obj1) {
          t.equals(_obj1, obj1, 'Injected correct object');
        }
      };

  var sinject = require('./sinject').createNew();

  sinject.register('obj1', obj1, obj1.inject, ['obj2']);
  sinject.register('obj2', obj2, obj2.inject, ['obj1']);

  sinject.bootstrap();
});