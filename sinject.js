(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.Requester = factory();
  }
}(this, function () {

  function SInject() {
    var objMap = {}; // Would use a Map in ES6 so token can be anything
    var registered = [];
    var debug = false;
    var bootstrapped = false;

    var config = {
      lazyInject: true
    };

    function enableDebugging() {
      debug = true;
    }

    function getObject(token) {
      if (debug && bootstrapped && !config.lazyInject) {
        if (!objMap.hasOwnProperty(token)) {
          console.warn('Token `' + token + '` was requested, but was never provided.');
        }
      }
      return objMap[token];
    }

    function provide(token, obj) {
      if (debug && objMap.hasOwnProperty(token)) {
        console.warn('Token `' + token + '` is being re-defined, from `' + objMap[token] + '` to `' + obj + '`.');
      }
      objMap[token] = obj;
      if(bootstrapped) {
        performInjections();
      }
    }

    function inject(fn/*, tokens */) {
      var tokens = [].slice.call(arguments, 1);
      if(Array.isArray(fn)) {
        tokens = fn.slice(0, fn.length -1);
        fn = fn[fn.length-1];
        if(typeof fn !== 'function') {
          throw new Error('An array was provided for injection (or $inject is used), but the last element was not a function');
        }
      }
      var fnDescription = {tokens: tokens, fn: fn};
      registered.push(fnDescription);
      if (bootstrapped) {
        performInjections();
      }
    }

    function register(token, obj, fn/*, tokens */) {
      var tokens = [].slice.call(arguments, 3);
      provide(token, obj);
      if(arguments.length === 2) {
        fn = obj.$inject;
        if(!fn) {
          throw new Error('register called for token ' + token + ' without inject function, and no $inject function exists');
        }
      }
      inject(fn, tokens);
    }

    function performInject(fnDescription) {
      if(config.lazyInject && fnDescription.tokens) {
        if(fnDescription.tokens.some(function(token) {
            return !objMap.hasOwnProperty(token);
          })) {
          if(debug) {
            console.log('Dependencies are not all ready for function `' + fnDescription.fn + '`, deferring injection.');
          }
          return false;
        }
      }
      //TODO allow return value to do anything?
      fnDescription.fn.apply(undefined, fnDescription.tokens && fnDescription.tokens.map(getObject));
      return true;
    }

    function performInjections() {
      registered = registered.filter(function (fnDescription) {
        return !performInject(fnDescription);
      });
    }

    function bootstrap(_config) {
      //TODO: merge _config into config
      config = _config || config;

      performInjections();
      bootstrapped = true;
    }

    return exports = {
      provide:         provide,
      inject:          inject,
      register:        register,
      bootstrap:       bootstrap,
      enableDebugging: enableDebugging
    };
  }

  var instance = new SInject();
  instance.createNew = function() {
    return new SInject();
  };

  return instance;
}));