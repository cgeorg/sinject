var test = require('tape-catch');

test('inject post-bootstrap', function (t) {
  t.timeoutAfter(100);
  t.plan(1);

  var obj = {}, name = 'obj';

  var sinject = require('../sinject').createNew();
  sinject.bootstrap();
  sinject.provide(name, obj);
  sinject.inject(function (_obj) {
    t.equals(_obj, obj, 'Injected correct object');
  }, name);
});