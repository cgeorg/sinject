var test = require('tape-catch');

test('inject pre-bootstrap', function (t) {
  var sinject = require('./sinject').createNew();

  t.plan(1);

  var obj = {}, name = 'obj';

  sinject.provide(name, obj);
  sinject.inject(function(_obj) {
    t.equals(_obj, obj, 'Injected correct object');
  }, ['obj']);
  sinject.bootstrap();
});

test('inject pre-bootstrap injection before provide', function (t) {
  var sinject = require('./sinject').createNew();

  t.plan(1);

  var obj = {}, name = 'obj';

  sinject.inject(function(_obj) {
    t.equals(_obj, obj, 'Injected correct object');
  }, ['obj']);
  sinject.provide(name, obj);
  sinject.bootstrap();
});

test('inject post-bootstrap', function (t) {
  var sinject = require('./sinject').createNew();

  t.plan(1);

  var obj = {}, name = 'obj';

  sinject.bootstrap();
  sinject.provide(name, obj);
  sinject.inject(function(_obj) {
    t.equals(_obj, obj, 'Injected correct object');
  }, ['obj']);
});