var objMap = {}; // Would use a Map in ES6 so token can be anything
var registered = [];
var debug = false;
var bootstrapped = false;

function enableDebugging() {
  debug = true;
}

function getObject(token) {
  if (enableDebugging && bootstrapped) {
    if (!objMap.hasOwnProperty(token)) {
      console.warn('Token `' + token + '` was requested, but was never provided.');
    }
  }
  return objMap[token];
}

function provide(token, obj) {
  if (enableDebugging && objMap.hasOwnProperty(token)) {
      console.warn('Token `' + token + '` is being re-defined, from `' + objMap[token] + '` to `' + obj + '`.');
    }
  objMap[token] = obj;
}

function inject(fn, tokens) {
  var fnDescription = {tokens: tokens, fn: fn};
  if (bootstrapped) {
    performInject(fnDescription);
  } else {
    registered.push(fnDescription);
  }
}

function register(token, obj, fn, tokens) {
  provide(token, obj);
  inject(fn, tokens);
}

function performInject(fnDescription) {
  fnDescription.fn.apply(undefined, fnDescription.tokens.map(getObject));
}

function bootstrap() {
  registered.forEach(performInject);
  registered = [];
  bootstrapped = true;
}

module.exports = {
  provide:         provide,
  inject:          inject,
  register:        register,
  bootstrap:       bootstrap,
  enableDebugging: enableDebugging
};
