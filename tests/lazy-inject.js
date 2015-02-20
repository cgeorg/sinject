var test = require('tape-catch');

test('inject post-bootstrap with lazyInject with injection before provide', function (t) {
  t.timeoutAfter(100);
  t.plan(1);

  var obj = {}, name = 'obj';

  var sinject = require('../sinject').createNew();
  sinject.bootstrap({
    lazyInject: true
  });
  sinject.inject(function (_obj) {
    t.equals(_obj, obj, 'Injected undefined');
  }, name);
  sinject.provide(name, obj);
});

test('inject post-bootstrap with lazyInject with injection after provide', function (t) {
  t.timeoutAfter(100);
  t.plan(1);

  var obj = {}, name = 'obj';

  var sinject = require('../sinject').createNew();
  sinject.bootstrap({
    lazyInject: true
  });
  sinject.provide(name, obj);
  sinject.inject(function (_obj) {
    t.equals(_obj, obj, 'Injected undefined');
  }, name);
});

test('inject post-bootstrap with lazyInject without provide', function (t) {
  t.plan(1);

  var obj = {}, name = 'obj';

  var sinject = require('../sinject').createNew();
  sinject.bootstrap({
    lazyInject: true
  });
  sinject.inject(function (_obj) {
    t.fail('Should not have injected without dependency');
  }, name);
  setTimeout(function() {
    t.pass('Inject did not happen without dependency');
  }, 100);
});

test('inject post-bootstrap without lazyInject with injection before provide', function (t) {
  t.timeoutAfter(100);
  t.plan(1);

  var obj = {}, name = 'obj';

  var sinject = require('../sinject').createNew();
  sinject.bootstrap({
    lazyInject: false
  });
  sinject.inject(function (_obj) {
    t.equals(_obj, undefined, 'Injected undefined');
  }, name);
  sinject.provide(name, obj);
});

test('inject post-bootstrap without lazyInject with injection after provide', function (t) {
  t.timeoutAfter(100);
  t.plan(1);

  var obj = {}, name = 'obj';

  var sinject = require('../sinject').createNew();
  sinject.bootstrap({
    lazyInject: false
  });
  sinject.provide(name, obj);
  sinject.inject(function (_obj) {
    t.equals(_obj, obj, 'Injected undefined');
  }, name);
});