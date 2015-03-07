# Changelog

## 0.1.1

### Added convention based injection.

Now, instead of this:
```javascript
var sinject = require('sinject');

var obj = {
    inject: function (obj2) {
      console.log('Hurray!');
    }
  };

sinject.register('obj', obj, obj.inject, 'obj2');
```

You can do this:
```javascript
var sinject = require('sinject');

var obj = {
    $inject: ['obj2', function (obj2) {
      console.log('Hurray!');
    }]
  };

sinject.register('obj', obj);
```
