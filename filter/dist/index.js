function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ClickAwayListener = _interopDefault(require('react-click-away-listener'));
var reactBootstrap = require('react-bootstrap');
var multiselectReactDropdown = require('multiselect-react-dropdown');
var Card = _interopDefault(require('react-bootstrap/Card'));
require('!style-loader!css-loader!sass-loader!./Styles/main.scss');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}var AsyncMode=l;var ConcurrentMode=m;var ContextConsumer=k;var ContextProvider=h;var Element=c;var ForwardRef=n;var Fragment=e;var Lazy=t;var Memo=r;var Portal=d;
var Profiler=g;var StrictMode=f;var Suspense=p;var isAsyncMode=function(a){return A(a)||z(a)===l};var isConcurrentMode=A;var isContextConsumer=function(a){return z(a)===k};var isContextProvider=function(a){return z(a)===h};var isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};var isForwardRef=function(a){return z(a)===n};var isFragment=function(a){return z(a)===e};var isLazy=function(a){return z(a)===t};
var isMemo=function(a){return z(a)===r};var isPortal=function(a){return z(a)===d};var isProfiler=function(a){return z(a)===g};var isStrictMode=function(a){return z(a)===f};var isSuspense=function(a){return z(a)===p};
var isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};var typeOf=z;

var reactIs_production_min = {
	AsyncMode: AsyncMode,
	ConcurrentMode: ConcurrentMode,
	ContextConsumer: ContextConsumer,
	ContextProvider: ContextProvider,
	Element: Element,
	ForwardRef: ForwardRef,
	Fragment: Fragment,
	Lazy: Lazy,
	Memo: Memo,
	Portal: Portal,
	Profiler: Profiler,
	StrictMode: StrictMode,
	Suspense: Suspense,
	isAsyncMode: isAsyncMode,
	isConcurrentMode: isConcurrentMode,
	isContextConsumer: isContextConsumer,
	isContextProvider: isContextProvider,
	isElement: isElement,
	isForwardRef: isForwardRef,
	isFragment: isFragment,
	isLazy: isLazy,
	isMemo: isMemo,
	isPortal: isPortal,
	isProfiler: isProfiler,
	isStrictMode: isStrictMode,
	isSuspense: isSuspense,
	isValidElementType: isValidElementType,
	typeOf: typeOf
};

var reactIs_development = createCommonjsModule(function (module, exports) {



if (process.env.NODE_ENV !== "production") {
  (function() {

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}
});

var reactIs = createCommonjsModule(function (module) {

if (process.env.NODE_ENV === 'production') {
  module.exports = reactIs_production_min;
} else {
  module.exports = reactIs_development;
}
});

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes;

var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning$1 = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning$1 = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning$1(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!reactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning$1(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning$1('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has$1(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning$1(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = reactIs;

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

function _extends$1() {
  _extends$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$1.apply(this, arguments);
}

var _ref = /*#__PURE__*/React.createElement("path", {
  d: "M13.67 10.465c.22.22.33.487.33.801 0 .314-.11.581-.33.801l-1.603 1.603c-.22.22-.487.33-.801.33-.314 0-.581-.11-.801-.33L7 10.205 3.535 13.67c-.22.22-.487.33-.801.33-.314 0-.581-.11-.801-.33L.33 12.067c-.22-.22-.33-.487-.33-.801 0-.314.11-.581.33-.801L3.795 7 .33 3.535C.11 3.315 0 3.048 0 2.734c0-.314.11-.581.33-.801L1.933.33c.22-.22.487-.33.801-.33.314 0 .581.11.801.33L7 3.795 10.465.33c.22-.22.487-.33.801-.33.314 0 .581.11.801.33l1.603 1.603c.22.22.33.487.33.801 0 .314-.11.581-.33.801L10.205 7l3.465 3.465z",
  fill: "#3c476f",
  fillOpacity: 0.71
});

function SvgIconClose(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$1({
    width: 14,
    height: 14
  }, props), _ref);
}

function AutoComplete(props) {
  var _useState = React.useState([]),
      autoCompleteArr = _useState[0],
      setAutoAcompleteArr = _useState[1];

  React.useEffect(function () {
    setAutoAcompleteArr(props.autoCompleteArray);
  }, [props.autoCompleteArray]);

  var handleClose = function handleClose(item) {
    props.deleteAutoCompleteElement(item);
  };

  var _onSelect = function onSelect(selectedList, selectedItem, item) {
    props.createAutoCompleteArray(item, selectedList);
  };

  var autoCompleteDiv = autoCompleteArr.map(function (item) {
    var validationClass = "";

    if (item.validated === false) {
      validationClass = "text-danger";
    }

    return /*#__PURE__*/React__default.createElement("div", {
      className: "filter__input",
      key: item
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "filter__input-title"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "filter__label"
    }, /*#__PURE__*/React__default.createElement("span", null, item.name), /*#__PURE__*/React__default.createElement("span", null, "\xA0>\xA0"), /*#__PURE__*/React__default.createElement("span", null, item.type)), /*#__PURE__*/React__default.createElement("div", {
      className: "filter__control"
    }, /*#__PURE__*/React__default.createElement(reactBootstrap.Form.Check, {
      "data-testid": "handleAutoCompleteEnabled-check",
      type: "switch",
      label: "",
      className: item.type.concat(item.name),
      id: item.name.concat(item.type),
      checked: item.enabled,
      onChange: function onChange() {
        props.handleAutoCompleteEnabled(item);
      }
    }), /*#__PURE__*/React__default.createElement("div", {
      role: "presentation",
      "data-testid": "deleteAutoCompleteElement-click",
      onClick: function onClick() {
        handleClose(item);
      }
    }, /*#__PURE__*/React__default.createElement(SvgIconClose, null)))), /*#__PURE__*/React__default.createElement("div", {
      className: "displayFlex multiselect"
    }, /*#__PURE__*/React__default.createElement(multiselectReactDropdown.Multiselect, {
      "data-testid": "autoCompleteSelect",
      id: item.type.concat(item.name),
      disable: !item.enabled,
      options: item.objectArray,
      closeIcon: "close",
      displayValue: "key",
      className: "form-control",
      selectedValues: item.value,
      onSelect: function onSelect(e) {
        _onSelect(e, e[e.length - 1], item);
      }
    })), /*#__PURE__*/React__default.createElement("span", {
      id: "fieldWarning",
      className: validationClass
    }, item.warning));
  });
  return /*#__PURE__*/React__default.createElement("div", null, autoCompleteDiv);
}
AutoComplete.propTypes = {
  autoCompleteArray: propTypes.any,
  deleteAutoCompleteElement: propTypes.any,
  createAutoCompleteArray: propTypes.any,
  handleAutoCompleteEnabled: propTypes.any
};

function FieldComponent(props) {
  var _useState = React.useState([]),
      fieldComponentArr = _useState[0],
      setFieldComponentArr = _useState[1];

  React.useEffect(function () {
    setFieldComponentArr(props.dateTimesArray);
  }, [props.dateTimesArray]);

  var handleClose = function handleClose(item) {
    props.deleteDateTimeElement(item);
  };

  var fieldComponentDiv = fieldComponentArr.map(function (item) {
    var validationClass = "";

    if (item.validated === false) {
      validationClass = "text-danger";
    }

    return /*#__PURE__*/React__default.createElement("div", {
      className: "filter__input",
      key: item
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "filter__input-title",
      key: 1
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "filter__label"
    }, /*#__PURE__*/React__default.createElement(reactBootstrap.Form.Label, null, /*#__PURE__*/React__default.createElement("strong", null, item.name))), /*#__PURE__*/React__default.createElement("div", {
      className: "filter__control"
    }, /*#__PURE__*/React__default.createElement(reactBootstrap.Form.Check, {
      type: "switch",
      id: item.name,
      label: "",
      defaultChecked: item.enabled,
      "data-testid": "handleDateTimeEnabled-check",
      onChange: function onChange() {
        props.handleDateTimeEnabled(item);
      }
    }), /*#__PURE__*/React__default.createElement("div", {
      role: "presentation",
      "data-testid": "deleteDateTimeElement-click",
      onClick: function onClick() {
        handleClose(item);
      }
    }, /*#__PURE__*/React__default.createElement(SvgIconClose, null)))), item.field.map(function (field) {
      return /*#__PURE__*/React__default.createElement("div", {
        key: field + "-" + field.name
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "displayFlex",
        key: field + "," + field.name
      }, /*#__PURE__*/React__default.createElement(reactBootstrap.Form.Text, null, field.column)), /*#__PURE__*/React__default.createElement("div", {
        className: "filter__split",
        key: field
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "date-wrap"
      }, /*#__PURE__*/React__default.createElement(reactBootstrap.Form.Control, {
        disabled: !item.enabled,
        type: "datetime-local",
        value: field.value,
        className: field.name,
        "data-testid": "createDateTimeArray-input",
        onChange: function onChange(e) {
          props.createDateTimeArray(item, field.column, e.target.value);
        }
      }))));
    }), /*#__PURE__*/React__default.createElement("span", {
      id: "fieldWarning",
      className: validationClass
    }, item.warning));
  });
  return /*#__PURE__*/React__default.createElement("div", null, fieldComponentDiv);
}
FieldComponent.propTypes = {
  dateTimesArray: propTypes.any,
  deleteDateTimeElement: propTypes.any,
  handleDateTimeEnabled: propTypes.any,
  createDateTimeArray: propTypes.any
};

function TextComponents(props) {
  var _useState = React.useState([]),
      textComponentArr = _useState[0],
      setTextComponentArr = _useState[1];

  React.useEffect(function () {
    setTextComponentArr(props.textComponentsArray);
  }, [props.textComponentsArray]);
  var textComponentDiv = textComponentArr.map(function (item) {
    var validationClass = "";

    if (item.validated === false) {
      validationClass = "text-danger";
    }

    return /*#__PURE__*/React__default.createElement("div", {
      key: item
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "filter__input"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "filter__input-title"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "filter__label"
    }, /*#__PURE__*/React__default.createElement("span", null, item.name)), /*#__PURE__*/React__default.createElement("div", {
      className: "filter__control"
    }, /*#__PURE__*/React__default.createElement(reactBootstrap.Form.Check, {
      type: "switch",
      label: "",
      id: item.name,
      checked: item.enabled,
      "data-testid": "handleTextComponentEnabled-check",
      onChange: function onChange() {
        props.handleTextComponentEnabled(item);
      }
    }), /*#__PURE__*/React__default.createElement("div", {
      role: "presentation",
      "data-testid": "deleteTextComponentElement-button",
      onClick: function onClick() {
        props.deleteTextComponentElement(item);
      }
    }, /*#__PURE__*/React__default.createElement(SvgIconClose, null)))), /*#__PURE__*/React__default.createElement("div", {
      className: "displayFlex"
    }, /*#__PURE__*/React__default.createElement("input", {
      id: item.name.concat(item.dataType),
      disabled: !item.enabled,
      type: "text",
      defaultValue: item.value,
      className: "form-control",
      "data-testid": "createTextComponentsArray-input",
      onChange: function onChange(e) {
        props.createTextComponentsArray(item, e.target.value);
      }
    })), /*#__PURE__*/React__default.createElement("span", {
      id: "fieldWarning",
      className: validationClass
    }, item.warning)));
  });
  return /*#__PURE__*/React__default.createElement("div", null, textComponentDiv);
}
TextComponents.propTypes = {
  textComponentsArray: propTypes.any,
  handleTextComponentEnabled: propTypes.any,
  deleteTextComponentElement: propTypes.any,
  createTextComponentsArray: propTypes.any
};

function _extends$2() {
  _extends$2 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$2.apply(this, arguments);
}

var _ref$1 = /*#__PURE__*/React.createElement("path", {
  d: "M4 10.667v4h8v-4H4zm9.333-.334v4.334h1.334V5.333c0-.097-.035-.23-.104-.4a1.12 1.12 0 00-.209-.36l-2.927-2.927a1.125 1.125 0 00-.354-.208 1.121 1.121 0 00-.406-.105v4.334a.964.964 0 01-.292.708.964.964 0 01-.708.292h-6a.964.964 0 01-.709-.292.964.964 0 01-.291-.708V1.333H1.333v13.334h1.334v-4.334c0-.277.097-.514.291-.708a.964.964 0 01.709-.292h8.666c.278 0 .514.098.709.292.194.194.291.43.291.708zM9.234 5.234a.32.32 0 00.1-.234V1.667a.32.32 0 00-.1-.235A.32.32 0 009 1.333H7a.32.32 0 00-.234.1.32.32 0 00-.1.234V5c0 .09.034.168.1.234a.32.32 0 00.234.1h2a.32.32 0 00.234-.1zm6.558-.817c.139.333.208.639.208.916V15a.964.964 0 01-.292.708A.964.964 0 0115 16H1a.964.964 0 01-.708-.292A.964.964 0 010 15V1C0 .722.097.486.292.292A.964.964 0 011 0h9.667c.277 0 .583.07.916.208.334.14.598.306.792.5l2.917 2.917c.194.194.36.458.5.792z",
  fill: "#1a4869",
  fillOpacity: 0.749
});

function SvgSaveIcon(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$2({
    width: 16,
    height: 16
  }, props), _ref$1);
}

var RightDrawer = function RightDrawer(props) {
  var _useState = React.useState("none"),
      showSavePopup = _useState[0],
      setShowSavePopup = _useState[1];

  var _useState2 = React.useState(""),
      saveFilterName = _useState2[0],
      setSaveFilterName = _useState2[1];

  var _useState3 = React.useState(""),
      saveFilterWarning = _useState3[0],
      setSaveFilterWarning = _useState3[1];

  var _useState4 = React.useState(""),
      warningLabel = _useState4[0],
      setWarningLabel = _useState4[1];

  var _useState5 = React.useState(""),
      applyFilterWarning = _useState5[0],
      setApplyFilterWarning = _useState5[1];

  var _useState6 = React.useState(""),
      applyfilterWarningClassName = _useState6[0],
      setApplyFilterWariningClassname = _useState6[1];

  var _useState7 = React.useState("none"),
      recentFilterShow = _useState7[0],
      setRecentFilterShow = _useState7[1];

  var _useState8 = React.useState(""),
      filterShow = _useState8[0],
      setFilterShow = _useState8[1];

  React.useEffect(function () {
    setApplyFilterWarning(props.emptyFilterWarning);
    setApplyFilterWariningClassname(props.emptyFilterClassName);
  }, [props.emptyFilterWarning, props.emptyFilterClassName]);
  React.useEffect(function () {
    setWarningLabel(props.saveWarningClassName);
    setSaveFilterWarning(props.saveWarningLabel);
    setShowSavePopup(props.showSavePopUp);
  }, [props.saveWarningClassName, props.saveWarningLabel, props.showSavePopUp]);
  React.useEffect(function () {
    setRecentFilterShow(props.recentFilterShow);
    setFilterShow(props.filterShow);
  }, [props.recentFilterShow, props.filterShow]);

  var registersaveFilterName = function registersaveFilterName(e) {
    setSaveFilterName(e.target.value);
  };

  var cancelSavePopup = function cancelSavePopup() {
    setShowSavePopup("none");
    setSaveFilterWarning("");
    setWarningLabel("");
  };

  var savedFilters = localStorage.getItem("savedFilters");
  savedFilters = savedFilters ? JSON.parse(savedFilters) : [];

  if (savedFilters.length > 2) {
    savedFilters = savedFilters.slice(savedFilters.length - 2, savedFilters.length);
  }

  var recent = savedFilters.map(function (filterArray) {
    return /*#__PURE__*/React__default.createElement("div", {
      role: "presentation",
      className: "recentFilters",
      "data-testid": "recentFilters-div",
      key: filterArray,
      onClick: function onClick() {
        props.addSavedFilters(filterArray);
      }
    }, Object.keys(filterArray)[0]);
  });
  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: recentFilterShow
    },
    className: "filter__content"
  }, /*#__PURE__*/React__default.createElement("div", null, "Recent Filters"), recent), /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: filterShow
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "filter__title"
  }, "Selected Filters", /*#__PURE__*/React__default.createElement("span", {
    className: "filter-count"
  }, props.filterCount)), /*#__PURE__*/React__default.createElement("div", {
    className: "filter__content"
  }, /*#__PURE__*/React__default.createElement(AutoComplete, {
    name: props.name,
    type: props.type,
    enabled: props.enabled,
    dataType: props.dataType,
    options: props.options,
    autoCompleteArray: props.autoCompleteArray,
    deleteAutoCompleteElement: props.deleteAutoCompleteElement,
    handleAutoCompleteEnabled: props.handleAutoCompleteEnabled,
    createAutoCompleteArray: props.createAutoCompleteArray
  }), /*#__PURE__*/React__default.createElement(FieldComponent, {
    dateTimesArray: props.dateTimesArray,
    deleteDateTimeElement: props.deleteDateTimeElement,
    handleDateTimeEnabled: props.handleDateTimeEnabled,
    createDateTimeArray: props.createDateTimeArray,
    addToday: props.addToday,
    addTomorrow: props.addTomorrow,
    addThisMonth: props.addThisMonth,
    addForteenDays: props.addForteenDays,
    addSevenDays: props.addSevenDays,
    addThisWeek: props.addThisWeek,
    addThirtyDays: props.addThirtyDays,
    lastDayChange: props.lastDayChange,
    nextDayChange: props.nextDayChange
  }), /*#__PURE__*/React__default.createElement(TextComponents, {
    textComponentsArray: props.textComponentsArray,
    deleteTextComponentElement: props.deleteTextComponentElement,
    createTextComponentsArray: props.createTextComponentsArray,
    handleTextComponentEnabled: props.handleTextComponentEnabled
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "filter__btn"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "filter__save"
  }, /*#__PURE__*/React__default.createElement(reactBootstrap.Button, {
    className: "button-save",
    variant: "",
    onClick: props.openShowSavePopUp
  }, /*#__PURE__*/React__default.createElement(SvgSaveIcon, null), /*#__PURE__*/React__default.createElement("span", null, "SAVE"))), /*#__PURE__*/React__default.createElement("div", {
    className: "btn-wrap"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: applyfilterWarningClassName
  }, applyFilterWarning), /*#__PURE__*/React__default.createElement(reactBootstrap.Button, {
    variant: "",
    className: "reset",
    onClick: props.resetDrawer
  }, "Reset"), /*#__PURE__*/React__default.createElement(reactBootstrap.Button, {
    variant: "",
    className: "applyFilter",
    "data-testid": "applyFilter-button",
    onClick: function onClick() {
      props.applyFilter();
      props.deleteAutoCompleteElement({});
      props.deleteDateTimeElement({});
      props.deleteTextComponentElement({});
    }
  }, "Apply Filter")), /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: showSavePopup
    },
    className: "popup--save"
  }, /*#__PURE__*/React__default.createElement("h5", null, "Save the Filter"), /*#__PURE__*/React__default.createElement("span", {
    className: warningLabel
  }, saveFilterWarning), /*#__PURE__*/React__default.createElement("label", {
    htmlFor: "saveFilterName"
  }, "Save Filter Name", /*#__PURE__*/React__default.createElement("input", {
    id: "saveFilterName",
    className: "txt",
    value: saveFilterName,
    "data-testid": "registersaveFilterName-input",
    onChange: function onChange(e) {
      return registersaveFilterName(e);
    }
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "btn-wrap"
  }, /*#__PURE__*/React__default.createElement("button", {
    type: "button",
    className: "button",
    "data-testid": "cancelSavePopup-button",
    onClick: function onClick() {
      cancelSavePopup();
    }
  }, "Cancel"), /*#__PURE__*/React__default.createElement("button", {
    type: "button",
    className: "button",
    "data-testid": "saveFilter-button",
    onClick: function onClick() {
      props.saveFilter(saveFilterName);
    }
  }, "Save"))))));
};

RightDrawer.propTypes = {
  emptyFilterWarning: propTypes.any,
  emptyFilterClassName: propTypes.any,
  saveWarningClassName: propTypes.any,
  saveWarningLabel: propTypes.any,
  showSavePopUp: propTypes.any,
  recentFilterShow: propTypes.any,
  filterShow: propTypes.any,
  addSavedFilters: propTypes.any,
  filterCount: propTypes.any,
  name: propTypes.any,
  type: propTypes.any,
  enabled: propTypes.any,
  dataType: propTypes.any,
  options: propTypes.any,
  autoCompleteArray: propTypes.any,
  deleteAutoCompleteElement: propTypes.any,
  handleAutoCompleteEnabled: propTypes.any,
  createAutoCompleteArray: propTypes.any,
  dateTimesArray: propTypes.any,
  deleteDateTimeElement: propTypes.any,
  handleDateTimeEnabled: propTypes.any,
  createDateTimeArray: propTypes.any,
  addToday: propTypes.any,
  addTomorrow: propTypes.any,
  addThisMonth: propTypes.any,
  addForteenDays: propTypes.any,
  addSevenDays: propTypes.any,
  addThisWeek: propTypes.any,
  lastDayChange: propTypes.any,
  nextDayChange: propTypes.any,
  textComponentsArray: propTypes.any,
  deleteTextComponentElement: propTypes.any,
  createTextComponentsArray: propTypes.any,
  handleTextComponentEnabled: propTypes.any,
  openShowSavePopUp: propTypes.any,
  resetDrawer: propTypes.any,
  applyFilter: propTypes.any,
  saveFilter: propTypes.any,
  addThirtyDays: propTypes.any
};

function _extends$3() {
  _extends$3 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$3.apply(this, arguments);
}

var _ref$2 = /*#__PURE__*/React.createElement("path", {
  d: "M9.9.619a.33.33 0 010 .474L5.23 5.897A.313.313 0 015 6a.313.313 0 01-.23-.103L.1 1.093a.33.33 0 010-.474L.601.103A.313.313 0 01.831 0c.088 0 .164.034.231.103L5 4.155 8.938.103A.313.313 0 019.168 0c.087 0 .164.034.23.103L9.9.62z",
  fill: "#1a4869"
});

function SvgDownarrow(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$3({
    width: 10,
    height: 6
  }, props), _ref$2);
}

function LeftDrawer(props) {
  var _useState = React.useState([]),
      leftDrawData = _useState[0],
      setLeftDrawData = _useState[1];

  var _useState2 = React.useState([]),
      leftDrawTemp = _useState2[0],
      setLeftDrawTemp = _useState2[1];

  var _useState3 = React.useState(""),
      showUpArrow = _useState3[0],
      setShowUpArrow = _useState3[1];

  var _useState4 = React.useState("none"),
      showDownArrow = _useState4[0],
      setShowDownArrow = _useState4[1];

  React.useEffect(function () {
    setLeftDrawData(props.filterData.filter);
    setLeftDrawTemp(props.filterData.filter);
    props.filterData.filter.forEach(function (item) {
      if (item.types) {
        item.types.forEach(function (type) {
        });
      }
    });
  }, [props.filterData.filter]);

  var searchFilterHandler = function searchFilterHandler(e) {
    var filteredList = [];
    var searchKey = e.target.value;

    if (leftDrawData) {
      filteredList = leftDrawTemp.filter(function (item) {
        return item.name && item.name.toLowerCase().includes(searchKey.toLowerCase());
      });
    }

    setLeftDrawData(filteredList);
  };

  var handleAccordian = function handleAccordian() {
    if (showUpArrow === "" || showDownArrow === "none") {
      setShowUpArrow("none");
      setShowDownArrow("");
    } else {
      setShowUpArrow("");
      setShowDownArrow("none");
    }
  };

  var accordianHeads = leftDrawData.map(function (item) {
    if (item.types.length) {
      return /*#__PURE__*/React__default.createElement("div", {
        key: item
      }, /*#__PURE__*/React__default.createElement(reactBootstrap.Accordion, null, /*#__PURE__*/React__default.createElement(Card, null, /*#__PURE__*/React__default.createElement(reactBootstrap.Accordion.Toggle, {
        "data-testid": "handleAccordianArrow",
        onClick: function onClick() {
          handleAccordian();
        },
        style: {
          fontWeight: item.weight
        },
        as: Card.Header,
        eventKey: "1"
      }, item.name, /*#__PURE__*/React__default.createElement("div", {
        className: "accordionLeft",
        style: {
          display: showUpArrow
        }
      }, /*#__PURE__*/React__default.createElement(SvgDownarrow, null)), /*#__PURE__*/React__default.createElement("div", {
        className: "accordionRight",
        style: {
          display: showDownArrow
        }
      }, /*#__PURE__*/React__default.createElement(SvgDownarrow, null))), /*#__PURE__*/React__default.createElement(reactBootstrap.Accordion.Collapse, {
        eventKey: "1"
      }, /*#__PURE__*/React__default.createElement(Card.Body, null, /*#__PURE__*/React__default.createElement("ul", {
        className: "firstAccordion",
        key: item
      }, item.types && item.types.map(function (type) {
        return /*#__PURE__*/React__default.createElement("li", {
          role: "presentation",
          style: {
            fontWeight: type.weight
          },
          "data-testid": "firstAccordion",
          onClick: function onClick() {
            props.fromLeftToRight(item.name, type.dataType, type.enabled, type.name, item.field, item.condition, type.dataSource, type.validationMessage, type.options);
          },
          key: type
        }, type.name);
      })))))));
    }

    return /*#__PURE__*/React__default.createElement("div", {
      key: item
    });
  });
  var fieldHeads = leftDrawData.map(function (item) {
    if (item.field.length) {
      return /*#__PURE__*/React__default.createElement("div", {
        className: "fieldHeads",
        key: item
      }, /*#__PURE__*/React__default.createElement("li", {
        role: "presentation",
        style: {
          fontWeight: item.weight
        },
        "data-testid": "fieldHeads",
        onClick: function onClick() {
          props.fromLeftToRight(item.name, item.dataType, item.enabled, item.types, item.field, item.condition, item.dataSource, item.validationMessage, item.options);
        }
      }, item.name));
    }

    return /*#__PURE__*/React__default.createElement("div", {
      key: item
    });
  });
  var normalHeads = leftDrawData.map(function (item) {
    if (!(item.condition.length || item.types.length || item.field.length)) {
      return /*#__PURE__*/React__default.createElement("div", {
        className: "normalHeads",
        key: item
      }, /*#__PURE__*/React__default.createElement("li", {
        role: "presentation",
        style: {
          fontWeight: item.weight
        },
        "data-testid": "normalHeads",
        onClick: function onClick() {
          props.fromLeftToRight(item.name, item.dataType, item.enabled, item.types, item.field, item.condition, item.dataSource, item.validationMessage, item.options);
        }
      }, item.name));
    }

    return /*#__PURE__*/React__default.createElement("div", {
      key: item
    });
  });
  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactBootstrap.Form.Row, null, /*#__PURE__*/React__default.createElement(reactBootstrap.Form.Control, {
    required: true,
    type: "text",
    placeholder: "Search a Filter",
    defaultValue: "",
    className: "customControl",
    "data-testid": "searchFilterHandler-input",
    onChange: searchFilterHandler
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "leftDrawer"
  }, /*#__PURE__*/React__default.createElement("div", null, accordianHeads), /*#__PURE__*/React__default.createElement("div", null, fieldHeads), /*#__PURE__*/React__default.createElement("div", null, normalHeads)));
}
LeftDrawer.propTypes = {
  filterData: propTypes.any,
  fromLeftToRight: propTypes.any
};

function _extends$4() {
  _extends$4 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$4.apply(this, arguments);
}

var _ref$3 = /*#__PURE__*/React.createElement("path", {
  fill: "currentColor",
  d: "M12.83 352h262.34A12.82 12.82 0 00288 339.17v-38.34A12.82 12.82 0 00275.17 288H12.83A12.82 12.82 0 000 300.83v38.34A12.82 12.82 0 0012.83 352zm0-256h262.34A12.82 12.82 0 00288 83.17V44.83A12.82 12.82 0 00275.17 32H12.83A12.82 12.82 0 000 44.83v38.34A12.82 12.82 0 0012.83 96zM432 160H16a16 16 0 00-16 16v32a16 16 0 0016 16h416a16 16 0 0016-16v-32a16 16 0 00-16-16zm0 256H16a16 16 0 00-16 16v32a16 16 0 0016 16h416a16 16 0 0016-16v-32a16 16 0 00-16-16z"
});

function SvgIconLeftAlign(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$4({
    "aria-hidden": "true",
    "data-prefix": "fas",
    "data-icon": "align-left",
    className: "icon-leftAlign_svg__svg-inline--fa icon-leftAlign_svg__fa-align-left icon-leftAlign_svg__fa-w-14",
    viewBox: "0 0 448 512"
  }, props), _ref$3);
}

function _extends$5() {
  _extends$5 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$5.apply(this, arguments);
}

var _ref$4 = /*#__PURE__*/React.createElement("path", {
  d: "M11.783 1.242a.694.694 0 01.217.516.694.694 0 01-.217.515L6.178 7.758l-1.053 1.03A.725.725 0 014.6 9a.725.725 0 01-.527-.212L3.02 7.758.217 5.015A.694.694 0 010 4.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 01.526-.213c.207 0 .382.071.527.213l2.276 2.234L9.677.212A.725.725 0 0110.204 0c.206 0 .382.07.526.212l1.053 1.03z",
  fill: "#15aacc"
});

function SvgIconCheck(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$5({
    width: 12,
    height: 9
  }, props), _ref$4);
}

var SavedFilters = function SavedFilters(props) {
  var _useState = React.useState(false),
      showFilter = _useState[0],
      setShowFilter = _useState[1];

  React.useEffect(function () {
    setShowFilter(props.showFilter);
  }, [props]);
  var keyValue = "";
  var savedFilters = localStorage.getItem("savedFilters");
  savedFilters = savedFilters ? JSON.parse(savedFilters) : [];

  var handleClickAway = function handleClickAway() {
    setShowFilter(false);
    props.handleListFilter();
  };

  var savedFilter = savedFilters.map(function (filterArray) {
    return /*#__PURE__*/React__default.createElement("div", {
      key: filterArray
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "alignLeft"
    }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(SvgIconCheck, null)), /*#__PURE__*/React__default.createElement("div", {
      role: "presentation",
      style: {
        marginLeft: "15px"
      },
      "data-testid": "addSavedFilters-check",
      onClick: function onClick() {
        setShowFilter(false);
        props.handleListFilter();
        props.addSavedFilters(filterArray);
      }
    }, Object.keys(filterArray)[0])));
  });

  if (showFilter) {
    return /*#__PURE__*/React__default.createElement(ClickAwayListener, {
      onClickAway: handleClickAway
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "filter__saved"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "savedFilters"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "text-muted"
    }, "Saved Filters"), /*#__PURE__*/React__default.createElement("ul", {
      key: keyValue,
      className: "leftSpace"
    }, savedFilter))));
  }

  return /*#__PURE__*/React__default.createElement("div", null);
};

SavedFilters.propTypes = {
  handleListFilter: propTypes.any,
  showFilter: propTypes.any,
  addSavedFilters: propTypes.any
};

var chips;
var chipCount;

var MainFilterPanel = function MainFilterPanel(props) {
  var _useState = React.useState(false),
      listFilter = _useState[0],
      setListFilter = _useState[1];

  var _useState2 = React.useState([]),
      chipArray = _useState2[0],
      setChipArray = _useState2[1];

  var _useState3 = React.useState("none"),
      countShow = _useState3[0],
      setCountShow = _useState3[1];

  React.useEffect(function () {
    setChipArray(props.applyFilterChip.applyFilter);

    if (props.applyFilterChip.applyFilter && props.applyFilterChip.applyFilter.length > 0) {
      setCountShow("");
    } else {
      setCountShow("none");
    }
  }, [props.applyFilterChip]);

  var handleListFilter = function handleListFilter() {
    setListFilter(!listFilter);
  };

  if (chipArray) {
    chipCount = chipArray.length;
    chips = chipArray.map(function (item) {
      if (item.type) {
        return /*#__PURE__*/React__default.createElement("div", {
          role: "presentation",
          className: "listContent",
          "data-testid": "typecheck",
          key: item,
          onClick: function onClick() {
            props.addAppliedFilters(chipArray);
          }
        }, /*#__PURE__*/React__default.createElement("span", null, item.name, ":", item.type), item.value.map(function (value) {
          return /*#__PURE__*/React__default.createElement("div", {
            key: value
          }, value.value);
        }));
      }

      if (item.condition) {
        return /*#__PURE__*/React__default.createElement("div", {
          role: "presentation",
          className: "listContent",
          "data-testid": "conditionValue-check",
          key: item,
          onClick: function onClick() {
            props.addAppliedFilters(chipArray);
          }
        }, /*#__PURE__*/React__default.createElement("span", null, item.name), ":", item.condition, item.amount);
      }

      if (item.fieldValue) {
        return /*#__PURE__*/React__default.createElement("div", {
          role: "presentation",
          className: "listContent",
          "data-testid": "fieldValue-check",
          key: item,
          onClick: function onClick() {
            props.addAppliedFilters(chipArray);
          }
        }, /*#__PURE__*/React__default.createElement("span", null, item.fieldValue), item.value);
      }

      return /*#__PURE__*/React__default.createElement("div", {
        role: "presentation",
        className: "listContent",
        "data-testid": "chipCount-check",
        key: item,
        onClick: function onClick() {
          props.addAppliedFilters(chipArray);
        }
      }, /*#__PURE__*/React__default.createElement("span", null, item.name), ":", item.value);
    });
  } else {
    chips = /*#__PURE__*/React__default.createElement("div", null);
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "neo-header"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "displayFlex"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "alignLeft"
  }, /*#__PURE__*/React__default.createElement("div", {
    role: "presentation",
    className: "iconLeft",
    "data-testid": "handleListFilterCheck",
    onClick: handleListFilter
  }, /*#__PURE__*/React__default.createElement(SvgIconLeftAlign, null)), /*#__PURE__*/React__default.createElement(SavedFilters, {
    showFilter: listFilter,
    handleListFilter: handleListFilter,
    addSavedFilters: props.addSavedFilters
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "leftSpace"
  }, "All flights"))), /*#__PURE__*/React__default.createElement("div", {
    className: "secondList"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "displayFlex"
  }, /*#__PURE__*/React__default.createElement("span", {
    style: {
      display: countShow
    },
    className: "listContent"
  }, "count:", chipCount), chips, /*#__PURE__*/React__default.createElement("div", {
    role: "presentation",
    "data-testid": "showDrawer-check",
    onClick: function onClick() {
      props.showDrawer();
    },
    className: "addFilter"
  }, "+ Add Filter"))));
};

MainFilterPanel.propTypes = {
  applyFilterChip: propTypes.any,
  addAppliedFilters: propTypes.any,
  addSavedFilters: propTypes.any,
  showDrawer: propTypes.any
};

function Filter(props) {
  var _useState = React.useState(false),
      showApplyFilter = _useState[0],
      setApplyFilter = _useState[1];

  var _useState2 = React.useState([]),
      autoCompletesValueArray = _useState2[0],
      setAutoCompletesValueArray = _useState2[1];

  var _useState3 = React.useState([]),
      autoCompletesArray = _useState3[0],
      setAutoCompletesArray = _useState3[1];

  var _useState4 = React.useState([]),
      dateTimesArray = _useState4[0],
      setDateTimesArray = _useState4[1];

  var _useState5 = React.useState([]),
      dateTimesValueArray = _useState5[0],
      setDateTimesValueArray = _useState5[1];

  var _useState6 = React.useState([]),
      textComponentsArray = _useState6[0],
      setTextComponentsArray = _useState6[1];

  var _useState7 = React.useState([]),
      textComponentsValueArray = _useState7[0],
      setTextComponentsValueArray = _useState7[1];

  var _useState8 = React.useState({}),
      applyFilterChip = _useState8[0],
      setApplyFilterChip = _useState8[1];

  var _useState9 = React.useState(0),
      filterCount = _useState9[0],
      setFilterCount = _useState9[1];

  var _useState10 = React.useState({}),
      filterData = _useState10[0],
      setFilterData = _useState10[1];

  var _useState11 = React.useState("none"),
      showSavePopUp = _useState11[0],
      setShowSavePopUp = _useState11[1];

  var _useState12 = React.useState(""),
      saveWarningLabel = _useState12[0],
      setSaveWarningLabel = _useState12[1];

  var _useState13 = React.useState(""),
      saveWarningClassName = _useState13[0],
      setSaveWarningClassName = _useState13[1];

  var _useState14 = React.useState(""),
      emptyFilterWarning = _useState14[0],
      setEmptyFilterWarning = _useState14[1];

  var _useState15 = React.useState(""),
      emptyFilterClassName = _useState15[0],
      setEmptyFilterClassName = _useState15[1];

  var _useState16 = React.useState("none"),
      recentFilterShow = _useState16[0],
      setRecentFilterShow = _useState16[1];

  var _useState17 = React.useState(""),
      filterShow = _useState17[0],
      setFilterShow = _useState17[1];

  React.useEffect(function () {
    setFilterData(props.filterData);
  }, [props.filterData]);
  React.useEffect(function () {
    var count = 0;
    count = autoCompletesArray.length + dateTimesArray.length + textComponentsArray.length;
    setFilterCount(count);
  }, [autoCompletesArray, dateTimesArray, textComponentsArray]);

  var showDrawer = function showDrawer() {
    setApplyFilter(true);
  };

  var closeDrawer = function closeDrawer() {
    setApplyFilter(false);
  };

  var openShowSavePopUp = function openShowSavePopUp() {
    setShowSavePopUp("");
  };

  var applyFilter = function applyFilter() {
    if (filterCount > 0) {
      setEmptyFilterClassName("");
      setEmptyFilterWarning("");
      var _applyFilter = {
        applyFilterArray: []
      };
      var tempObj = {
        applyFilter: []
      };
      var obj = [];

      if (autoCompletesValueArray.length > 0) {
        autoCompletesValueArray.forEach(function (item) {
          tempObj.applyFilter.push(item);
          obj.push(_extends({}, item));
        });

        _applyFilter.applyFilterArray.push({
          autoComplete: autoCompletesValueArray
        });
      }

      if (dateTimesValueArray.length > 0) {
        dateTimesValueArray.forEach(function (item) {
          tempObj.applyFilter.push(item);
          obj.push(_extends({}, item));
        });

        _applyFilter.applyFilterArray.push({
          dateTime: dateTimesValueArray
        });
      }

      if (textComponentsValueArray.length > 0) {
        textComponentsValueArray.forEach(function (item) {
          tempObj.applyFilter.push(item);
          obj.push(_extends({}, item));
        });

        _applyFilter.applyFilterArray.push({
          textComponent: textComponentsValueArray
        });
      }

      setApplyFilterChip(tempObj);
      obj.forEach(function (objec) {
        var item = objec;
        delete item.dataType;
        delete item.enabled;
      });
      props.appliedFilters(obj);
      tempObj = {};
      closeDrawer();
    } else {
      setEmptyFilterClassName("text-danger");
      setEmptyFilterWarning("No Filter is being selected");
    }
  };

  var deleteAutoCompleteElement = function deleteAutoCompleteElement(item) {
    filterData.filter.forEach(function (it) {
      it.types.forEach(function (tip) {
        if (tip.name === item.type && item.name === it.name) {
          tip.weight = 400;
        }
      });
    });
    var autoCompleteArray = [].concat(autoCompletesArray);
    var index = autoCompleteArray.findIndex(function (x) {
      return x.name === item.name && x.type === item.type;
    });

    if (index !== -1) {
      autoCompleteArray.splice(index, 1);
    } else {
      autoCompleteArray = [];
    }

    setAutoCompletesArray(autoCompleteArray);
    autoCompleteArray.forEach(function (aut) {
      filterData.filter.forEach(function (fit) {
        if (fit.types && fit.name !== aut.name && fit.weight === 700) {
          fit.weight = 400;
        }
      });
    });
  };

  var deleteDateTimeElement = function deleteDateTimeElement(item) {
    filterData.filter.forEach(function (it) {
      if (it.name === item.name) {
        it.weight = 400;
      }
    });
    filterData.filter.forEach(function (it) {
      if (it.name === item.name) {
        item.weight = 400;
      }
    });
    var dateTimeArray = [].concat(dateTimesArray);
    var index = dateTimeArray.findIndex(function (x) {
      return x.name === item.name;
    });
    dateTimeArray.splice(index, 1);
    dateTimeArray.forEach(function (item) {
      item.field.forEach(function (fieldArray) {
        fieldArray.value = "";
      });
    });
    setDateTimesArray(dateTimeArray);
    filterData.filter.forEach(function (filters) {
      if (filters.name === item.name) {
        item.field.forEach(function (fieldArray) {
          fieldArray.value = "";
        });
      }
    });

    if (item === {}) {
      setDateTimesValueArray([]);
    }
  };

  var deleteTextComponentElement = function deleteTextComponentElement(item) {
    filterData.filter.forEach(function (it) {
      var deleteItem = it;

      if (deleteItem.name === item.name) {
        deleteItem.weight = 400;
      }
    });
    var textComponentArray = [].concat(textComponentsArray);
    var index = textComponentArray.findIndex(function (x) {
      return x.name === item.name && x.dataType === item.dataType;
    });

    if (index !== -1) {
      textComponentArray.splice(index, 1);
    } else {
      textComponentArray = [];
    }

    setTextComponentsArray(textComponentArray);
  };

  var resetDrawer = function resetDrawer() {
    deleteAutoCompleteElement({});
    deleteDateTimeElement({});
    deleteTextComponentElement({});
    setApplyFilterChip({});
    setRecentFilterShow("");
    setFilterShow("none");
  };

  var saveFilter = function saveFilter(value) {
    var obj = [];

    if (value.length > 0) {
      if (!(autoCompletesValueArray.length > 0 || dateTimesValueArray.length > 0 || textComponentsValueArray.length > 0)) {
        setShowSavePopUp("");
        setSaveWarningClassName("text-danger");
        setSaveWarningLabel("No filters selected or values entered");
      } else {
        var savedFilter = {
          filter: []
        };

        if (autoCompletesValueArray.length > 0) {
          var autoCompleteArray = [].concat(autoCompletesArray);
          autoCompleteArray.map(function (item) {
            var newItem = item;
            autoCompletesValueArray.forEach(function (valueItem) {
              if (valueItem.name === item.name && valueItem.type === item.type) {
                newItem.validated = true;
                newItem.warning = "";
              }
            });
            return newItem;
          });
          setAutoCompletesArray(autoCompleteArray);
          var count = 0;
          autoCompletesArray.forEach(function (item) {
            if (item.validated === false) {
              count++;
            }
          });

          if (count === 0) {
            savedFilter.filter.push({
              autoComplete: autoCompletesValueArray
            });
          } else {
            setShowSavePopUp("");
            setSaveWarningClassName("text-danger");
            setSaveWarningLabel("Enter values in every field");
          }
        } else {
          var _autoCompleteArray = [].concat(autoCompletesArray);

          _autoCompleteArray.forEach(function (item) {
            item.validated = false;
          });

          setAutoCompletesArray(_autoCompleteArray);
        }

        if (dateTimesValueArray.length > 0) {
          var dateTimeArray = [].concat(dateTimesArray);
          dateTimeArray.map(function (item) {
            var newItem = item;
            dateTimesValueArray.forEach(function (valueItem) {
              if (valueItem.name === item.name) {
                newItem.validated = true;
                newItem.warning = "";
              }
            });
            return newItem;
          });
          setDateTimesArray(dateTimeArray);
          var _count = 0;
          dateTimesArray.forEach(function (item) {
            if (item.validated === false) {
              _count++;
            }
          });

          if (_count === 0) {
            savedFilter.filter.push({
              dateTime: dateTimesValueArray
            });
          } else {
            setShowSavePopUp("");
            setSaveWarningClassName("text-danger");
            setSaveWarningLabel("Enter values in every field");
          }
        } else {
          var _dateTimeArray = [].concat(dateTimesArray);

          _dateTimeArray.forEach(function (item) {
            item.validated = false;
          });

          setDateTimesArray(_dateTimeArray);
        }

        if (textComponentsValueArray.length > 0) {
          var textComponentArray = [].concat(textComponentsArray);
          textComponentArray.forEach(function (item) {
            textComponentsValueArray.forEach(function (valueItem) {
              if (valueItem.name === item.name) {
                item.validated = true;
                item.warning = "";
              }
            });
          });
          setTextComponentsArray(textComponentArray);
          var _count2 = 0;
          textComponentArray.forEach(function (item) {
            if (item.validated === false) {
              _count2++;
            }
          });

          if (_count2 === 0) {
            savedFilter.filter.push({
              textComponent: textComponentsValueArray
            });
          } else {
            setShowSavePopUp("");
            setSaveWarningClassName("text-danger");
            setSaveWarningLabel("Enter values in every field");
          }
        } else {
          var _textComponentArray = [].concat(textComponentsArray);

          _textComponentArray.forEach(function (item) {
            item.validated = false;
          });

          setTextComponentsArray(_textComponentArray);
        }

        if (savedFilter.filter.length > 0) {
          savedFilter[value] = savedFilter.filter;
          delete savedFilter.filter;
          var savedFilters = localStorage.getItem("savedFilters");
          savedFilters = savedFilters ? JSON.parse(savedFilters) : [];
          savedFilters.push(savedFilter);
          localStorage.setItem("savedFilters", JSON.stringify(savedFilters));
          setShowSavePopUp("none");
          setSaveWarningClassName("");
          setSaveWarningLabel("");
          resetDrawer();
        }
      }
    } else {
      setShowSavePopUp("");
      setSaveWarningClassName("text-danger");
      setSaveWarningLabel("Enter a valid filterName");
    }

    autoCompletesValueArray.forEach(function (item) {
      obj.push(_extends({}, item));
    });
    dateTimesValueArray.forEach(function (item) {
      obj.push(_extends({}, item));
    });
    textComponentsValueArray.forEach(function (item) {
      obj.push(_extends({}, item));
    });
    obj.forEach(function (objec) {
      delete objec.dataType;
      delete objec.enabled;
    });
    props.savedFilters(obj);
  };

  var fromLeftToRight = function fromLeftToRight(name, dataType, enabled, type, field, condition, dataSource, warning, options) {
    setShowSavePopUp("none");
    setSaveWarningLabel("");
    setSaveWarningClassName("");
    setEmptyFilterClassName("");
    setEmptyFilterWarning("");

    if (dataType === "AutoComplete") {
      var value = {
        name: name,
        type: type,
        dataType: dataType,
        enabled: enabled,
        objectArray: []
      };
      filterData.filter.forEach(function (item) {
        if (item.name === value.name) {
          item.weight = 700;
          item.types.forEach(function (tip) {
            if (tip.name === value.type) {
              tip.weight = 600;
            }
          });
        }
      });
      var autoCompleteArray = [].concat(autoCompletesArray);

      if (autoCompleteArray.length > 0) {
        var index = autoCompleteArray.findIndex(function (x) {
          return x.name === value.name && x.type === value.type;
        });

        if (index === -1) {
          autoCompleteArray.push({
            name: name,
            type: type,
            dataType: dataType,
            enabled: enabled,
            objectArray: options,
            validated: false,
            warning: warning
          });
        }
      } else {
        autoCompleteArray.push({
          name: name,
          type: type,
          dataType: dataType,
          enabled: enabled,
          objectArray: options,
          validated: false,
          warning: warning
        });
      }

      setAutoCompletesArray(autoCompleteArray);
    }

    if (dataType === "DateTime") {
      var _value = {
        name: name,
        dataType: dataType,
        enabled: enabled,
        field: field,
        validated: false,
        warning: warning
      };
      filterData.filter.forEach(function (item) {
        if (item.name === _value.name) {
          item.weight = 700;
        }
      });
      var dateTimeArray = [].concat(dateTimesArray);

      if (dateTimeArray.length > 0) {
        var _index = dateTimeArray.findIndex(function (x) {
          return x.name === _value.name && x.field === _value.field;
        });

        if (_index === -1) {
          dateTimeArray.push({
            name: name,
            dataType: dataType,
            enabled: enabled,
            field: field,
            validated: false,
            warning: warning
          });
        }
      } else {
        dateTimeArray.push({
          name: name,
          dataType: dataType,
          enabled: enabled,
          field: field,
          validated: false,
          warning: warning
        });
      }

      setDateTimesArray(dateTimeArray);
    }

    if (dataType === "Text") {
      var _value2 = {
        name: name,
        dataType: dataType,
        enabled: enabled,
        validated: false,
        warning: warning
      };
      filterData.filter.forEach(function (item) {
        if (item.name === _value2.name) {
          item.weight = 700;
        }
      });
      var textComponentArray = [].concat(textComponentsArray);

      if (textComponentArray.length > 0) {
        var _index2 = textComponentArray.findIndex(function (x) {
          return x.name === _value2.name && x.dataType === _value2.dataType;
        });

        if (_index2 === -1) {
          textComponentArray.push({
            name: name,
            dataType: dataType,
            enabled: enabled,
            validated: false,
            warning: warning
          });
        }
      } else {
        textComponentArray.push({
          name: name,
          dataType: dataType,
          enabled: enabled,
          validated: false,
          warning: warning
        });
      }

      setTextComponentsArray(textComponentArray);
    }
  };

  var createAutoCompleteArray = function createAutoCompleteArray(item, valueArray) {
    setShowSavePopUp("none");
    setSaveWarningLabel("");
    setSaveWarningClassName("");
    var autoCompleteArray = [].concat(autoCompletesArray);
    var tempObj = JSON.parse(JSON.stringify(item));
    tempObj.value = valueArray;
    var autoCompleteValueArray = [].concat(autoCompletesValueArray);

    if (autoCompleteValueArray.length > 0) {
      var index_ = autoCompleteValueArray.findIndex(function (x) {
        return x.name === tempObj.name && x.type === tempObj.type;
      });

      if (index_ === -1) {
        autoCompleteValueArray.push({
          name: tempObj.name,
          type: tempObj.type,
          dataType: tempObj.dataType,
          enabled: tempObj.enabled,
          value: tempObj.value
        });
      } else {
        autoCompleteValueArray[index_].value = tempObj.value;
      }

      autoCompleteValueArray.forEach(function (valueItem) {
        autoCompleteArray.forEach(function (item) {
          if (item.name === valueItem.name && item.type === valueItem.type) {
            item.validated = true;
            item.warning = "";
          }
        });
      });
    } else {
      autoCompleteValueArray.push({
        name: tempObj.name,
        type: tempObj.type,
        dataType: tempObj.dataType,
        enabled: tempObj.enabled,
        value: tempObj.value
      });
      autoCompleteValueArray.forEach(function (valueItem) {
        autoCompleteArray.forEach(function (item) {
          if (item.name === valueItem.name && item.type === valueItem.type) {
            item.validated = true;
            item.warning = "";
          }
        });
      });
    }

    setAutoCompletesArray(autoCompleteArray);
    autoCompleteArray = [];
    setAutoCompletesValueArray(autoCompleteValueArray);
  };

  var handleAutoCompleteEnabled = function handleAutoCompleteEnabled(item) {
    var autoCompleteArray = [].concat(autoCompletesArray);
    var index = autoCompleteArray.findIndex(function (x) {
      return x.name === item.name && x.type === item.type;
    });

    if (index !== -1) {
      autoCompleteArray[index].enabled = !autoCompleteArray[index].enabled;
    }

    setAutoCompletesArray(autoCompleteArray);

    if (autoCompletesValueArray.length > 0) {
      var autoCompleteValueArray = [].concat(autoCompletesValueArray);

      var _index3 = autoCompleteValueArray.findIndex(function (x) {
        return x.name === item.name && x.type === item.type;
      });

      autoCompleteValueArray[_index3].enabled = !autoCompleteValueArray[_index3].enabled;
      setAutoCompletesValueArray(autoCompleteValueArray);
    }
  };

  var handleDateTimeEnabled = function handleDateTimeEnabled(item) {
    var dateTimeArray = [].concat(dateTimesArray);
    var index = dateTimeArray.findIndex(function (x) {
      return x.name === item.name && x.field === item.field;
    });

    if (index !== -1) {
      dateTimeArray[index].enabled = !dateTimeArray[index].enabled;
    }

    setDateTimesArray(dateTimeArray);

    if (dateTimesValueArray.length > 0) {
      var dateTimeValueArray = [].concat(dateTimesValueArray);
      var tempArray = [];
      item.field.forEach(function (item) {
        tempArray.push(item.column);
      });

      var _index4 = dateTimeValueArray.findIndex(function (x) {
        return x.name === item.name && tempArray.includes(x.fieldValue);
      });

      if (_index4 !== -1) {
        dateTimeValueArray.forEach(function (item) {
          item.enabled = !item.enabled;
        });
      }

      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  var createDateTimeArray = function createDateTimeArray(item, fieldName, value) {
    setShowSavePopUp("none");
    setSaveWarningLabel("");
    setSaveWarningClassName("");
    var dateTimeArray = [].concat(dateTimesArray);
    var tempObj = JSON.parse(JSON.stringify(item));
    tempObj.fieldValue = fieldName;
    tempObj.value = value;
    var dateTimeValueArray = [].concat(dateTimesValueArray);

    if (dateTimeValueArray.length > 0) {
      var index = dateTimeValueArray.findIndex(function (x) {
        return x.fieldValue === tempObj.fieldValue && x.name === tempObj.name;
      });

      if (index === -1) {
        dateTimeValueArray.push({
          name: tempObj.name,
          dataType: tempObj.dataType,
          enabled: tempObj.enabled,
          fieldValue: tempObj.fieldValue,
          value: tempObj.value
        });
      } else {
        dateTimeValueArray[index].value = tempObj.value;
      }

      dateTimeValueArray.forEach(function (valueItem) {
        dateTimeArray.forEach(function (item) {
          if (item.name === valueItem.name) {
            item.validated = true;
            item.warning = "";
          }
        });
      });
    } else {
      dateTimeValueArray.push({
        name: tempObj.name,
        dataType: tempObj.dataType,
        enabled: tempObj.enabled,
        fieldValue: tempObj.fieldValue,
        value: tempObj.value
      });
      dateTimeValueArray.forEach(function (valueItem) {
        dateTimeArray.forEach(function (item) {
          if (item.name === valueItem.name) {
            item.validated = true;
            item.warning = "";
          }
        });
      });
    }

    setDateTimesValueArray(dateTimeValueArray);
    dateTimeArray = [].concat(dateTimesArray);

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(function (item) {
        item.field.forEach(function (fieldArray) {
          if (fieldArray.column === fieldName) {
            fieldArray.value = value;
          }
        });
      });
      setDateTimesArray(dateTimeArray);
    }

    dateTimeArray = [];
  };

  var getValueOfDate = function getValueOfDate(dateValue) {
    var date = new Date(dateValue);
    var dateTimeFormat = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "numeric",
      seconds: "numeric"
    });

    var _dateTimeFormat$forma = dateTimeFormat.formatToParts(date),
        month = _dateTimeFormat$forma[0].value,
        day = _dateTimeFormat$forma[2].value,
        year = _dateTimeFormat$forma[4].value,
        hour = _dateTimeFormat$forma[6].value,
        minute = _dateTimeFormat$forma[8].value;

    return year + "-" + month + "-" + day + "T" + hour + ":" + minute;
  };

  var addToday = function addToday() {
    var todayDate = new Date();
    var dated = getValueOfDate(todayDate);
    var dateTimeArray = [].concat(dateTimesArray);
    var dateTimeValueArray = [].concat(dateTimesValueArray);

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(function (item) {
        item.field.forEach(function (fieldArray) {
          fieldArray.value = dated;

          if (dateTimeValueArray.length > 1) {
            dateTimeValueArray.forEach(function (item) {
              if (item.fieldValue === fieldArray.column) {
                item.value = dated;
              }
            });
          } else {
            dateTimeValueArray.push({
              name: item.name,
              dataType: item.dataType,
              enabled: item.enabled,
              fieldValue: fieldArray.column,
              value: dated
            });
          }
        });
      });
      setDateTimesArray(dateTimeArray);
      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  var addTomorrow = function addTomorrow() {
    var fromDate = new Date();
    var toDate = new Date();
    fromDate.setDate(fromDate.getDate() + 1);
    toDate.setDate(toDate.getDate() + 1);
    fromDate = getValueOfDate(fromDate);
    toDate = getValueOfDate(toDate);
    var dateTimeArray = [].concat(dateTimesArray);
    var dateTimeValueArray = [].concat(dateTimesValueArray);

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(function (item) {
        item.field[0].value = fromDate;
        item.field[1].value = toDate;
        item.field.forEach(function (fieldArray) {
          if (dateTimeValueArray.length > 1) {
            dateTimeValueArray.forEach(function (arr) {
              if (arr.fieldValue === fieldArray.column) {
                arr.value = fieldArray.value;
              }
            });
          } else {
            dateTimeValueArray.push({
              name: item.name,
              dataType: item.dataType,
              enabled: item.enabled,
              fieldValue: fieldArray.column,
              value: fieldArray.value
            });
          }
        });
      });
      setDateTimesArray(dateTimeArray);
      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  var addThisMonth = function addThisMonth() {
    var today = new Date();
    var fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
    var toDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    fromDate = getValueOfDate(fromDate);
    toDate = getValueOfDate(toDate);
    var dateTimeArray = [].concat(dateTimesArray);
    var dateTimeValueArray = [].concat(dateTimesValueArray);

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(function (item) {
        item.field[0].value = fromDate;
        item.field[1].value = toDate;
        item.field.forEach(function (fieldArray) {
          if (dateTimeValueArray.length > 1) {
            dateTimeValueArray.forEach(function (arr) {
              if (arr.fieldValue === fieldArray.column) {
                arr.value = fieldArray.value;
              }
            });
          } else {
            dateTimeValueArray.push({
              name: item.name,
              dataType: item.dataType,
              enabled: item.enabled,
              fieldValue: fieldArray.column,
              value: fieldArray.value
            });
          }
        });
      });
      setDateTimesArray(dateTimeArray);
      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  var addForteenDays = function addForteenDays() {
    var fromDate = new Date();
    var toDate = new Date();
    fromDate.setDate(fromDate.getDate() + 1);
    toDate.setDate(toDate.getDate() + 14);
    fromDate = getValueOfDate(fromDate);
    toDate = getValueOfDate(toDate);
    var dateTimeArray = [].concat(dateTimesArray);
    var dateTimeValueArray = [].concat(dateTimesValueArray);

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(function (item) {
        item.field[0].value = fromDate;
        item.field[1].value = toDate;
        item.field.forEach(function (fieldArray) {
          if (dateTimeValueArray.length > 1) {
            dateTimeValueArray.forEach(function (arr) {
              if (arr.fieldValue === fieldArray.column) {
                arr.value = fieldArray.value;
              }
            });
          } else {
            dateTimeValueArray.push({
              name: item.name,
              dataType: item.dataType,
              enabled: item.enabled,
              fieldValue: fieldArray.column,
              value: fieldArray.value
            });
          }
        });
      });
      setDateTimesArray(dateTimeArray);
      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  var addSevenDays = function addSevenDays() {
    var fromDate = new Date();
    var toDate = new Date();
    fromDate.setDate(fromDate.getDate() + 1);
    toDate.setDate(toDate.getDate() + 7);
    fromDate = getValueOfDate(fromDate);
    toDate = getValueOfDate(toDate);
    var dateTimeArray = [].concat(dateTimesArray);
    var dateTimeValueArray = [].concat(dateTimesValueArray);

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(function (item) {
        item.field[0].value = fromDate;
        item.field[1].value = toDate;
        item.field.forEach(function (fieldArray) {
          if (dateTimeValueArray.length > 1) {
            dateTimeValueArray.forEach(function (arr) {
              if (arr.fieldValue === fieldArray.column) {
                arr.value = fieldArray.value;
              }
            });
          } else {
            dateTimeValueArray.push({
              name: item.name,
              dataType: item.dataType,
              enabled: item.enabled,
              fieldValue: fieldArray.column,
              value: fieldArray.value
            });
          }
        });
      });
      setDateTimesArray(dateTimeArray);
      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  var addThisWeek = function addThisWeek() {
    var today = new Date();
    var from = today.getDate() - today.getDay();
    var to = from + 6;
    var fromDate = new Date(today.setDate(from)).toUTCString();
    var toDate = new Date(today.setDate(to)).toUTCString();
    fromDate = getValueOfDate(fromDate);
    toDate = getValueOfDate(toDate);
    var dateTimeArray = [].concat(dateTimesArray);
    var dateTimeValueArray = [].concat(dateTimesValueArray);

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(function (item) {
        item.field[0].value = fromDate;
        item.field[1].value = toDate;
        item.field.forEach(function (fieldArray) {
          if (dateTimeValueArray.length > 1) {
            dateTimeValueArray.forEach(function (arr) {
              if (arr.fieldValue === fieldArray.column) {
                arr.value = fieldArray.value;
              }
            });
          } else {
            dateTimeValueArray.push({
              name: item.name,
              dataType: item.dataType,
              enabled: item.enabled,
              fieldValue: fieldArray.column,
              value: fieldArray.value
            });
          }
        });
      });
      setDateTimesArray(dateTimeArray);
      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  var addThirtyDays = function addThirtyDays() {
    var from = new Date();
    var to = new Date();
    from.setDate(from.getDate() + 1);
    to.setDate(to.getDate() + 30);
    var fromDate = getValueOfDate(from);
    var toDate = getValueOfDate(to);
    var dateTimeArray = [].concat(dateTimesArray);
    var dateTimeValueArray = [].concat(dateTimesValueArray);

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(function (item) {
        item.field[0].value = fromDate;
        item.field[1].value = toDate;
        item.field.forEach(function (fieldArray) {
          if (dateTimeValueArray.length > 1) {
            dateTimeValueArray.forEach(function (arr) {
              if (arr.fieldValue === fieldArray.column) {
                arr.value = fieldArray.value;
              }
            });
          } else {
            dateTimeValueArray.push({
              name: item.name,
              dataType: item.dataType,
              enabled: item.enabled,
              fieldValue: fieldArray.column,
              value: fieldArray.value
            });
          }
        });
      });
      setDateTimesArray(dateTimeArray);
      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  var nextDayChange = function nextDayChange(value) {
    if (value === "") {
      value = 1;
    }

    var fromDate = new Date();
    var toDate = new Date();

    if (value !== "0") {
      fromDate.setDate(fromDate.getDate() + 1);
      toDate.setDate(toDate.getDate() + parseInt(value, 10));
    }

    fromDate = getValueOfDate(fromDate);
    toDate = getValueOfDate(toDate);
    var dateTimeArray = [].concat(dateTimesArray);
    var dateTimeValueArray = [].concat(dateTimesValueArray);

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(function (item) {
        var item_ = item;
        item_.field[0].value = fromDate;
        item_.field[1].value = toDate;
        item_.field.forEach(function (fieldArray) {
          if (dateTimeValueArray.length > 1) {
            dateTimeValueArray.forEach(function (arr) {
              var arr_ = arr;

              if (arr_.fieldValue === fieldArray.column) {
                arr_.value = fieldArray.value;
              }
            });
          } else {
            dateTimeValueArray.push({
              name: item_.name,
              dataType: item_.dataType,
              enabled: item_.enabled,
              fieldValue: fieldArray.column,
              value: fieldArray.value
            });
          }
        });
      });
      setDateTimesArray(dateTimeArray);
      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  var lastDayChange = function lastDayChange(value) {
    if (value === "") {
      value = 1;
    }

    var fromDate = new Date();
    var toDate = new Date();

    if (value !== "0") {
      fromDate.setDate(fromDate.getDate() - parseInt(value, 10));
      toDate.setDate(toDate.getDate() - 1);
    }

    fromDate = getValueOfDate(fromDate);
    toDate = getValueOfDate(toDate);
    var dateTimeArray = [].concat(dateTimesArray);
    var dateTimeValueArray = [].concat(dateTimesValueArray);

    if (dateTimeArray.length > 0) {
      dateTimeArray.forEach(function (item) {
        var item_ = item;
        item_.field[0].value = fromDate;
        item_.field[1].value = toDate;
        item_.field.forEach(function (fieldArray) {
          if (dateTimeValueArray.length > 1) {
            dateTimeValueArray.forEach(function (arr) {
              var arr_ = arr;

              if (arr_.fieldValue === fieldArray.column) {
                arr_.value = fieldArray.value;
              }
            });
          } else {
            dateTimeValueArray.push({
              name: item_.name,
              dataType: item_.dataType,
              enabled: item_.enabled,
              fieldValue: fieldArray.column,
              value: fieldArray.value
            });
          }
        });
      });
      setDateTimesArray(dateTimeArray);
      setDateTimesValueArray(dateTimeValueArray);
    }
  };

  var createTextComponentsArray = function createTextComponentsArray(item, value) {
    setShowSavePopUp("none");
    setSaveWarningLabel("");
    setSaveWarningClassName("");
    var textComponentArray = [].concat(textComponentsArray);
    var textComponentValueArray = [].concat(textComponentsValueArray);

    if (textComponentValueArray.length > 0) {
      var index = textComponentValueArray.findIndex(function (x) {
        return x.name === item.name && x.dataType === item.dataType;
      });

      if (index === -1) {
        textComponentValueArray.push({
          name: item.name,
          dataType: item.dataType,
          enabled: item.enabled,
          value: value
        });
      } else {
        textComponentValueArray[index].value = value;
      }

      textComponentValueArray.forEach(function (valueItem) {
        textComponentArray.forEach(function (items) {
          var item_ = items;

          if (item_.name === valueItem.name) {
            item_.validated = true;
            item_.warning = "";
          }
        });
      });
    } else {
      textComponentValueArray.push({
        name: item.name,
        dataType: item.dataType,
        enabled: item.enabled,
        value: value
      });
      textComponentValueArray.forEach(function (valueItem) {
        textComponentArray.forEach(function (textItem) {
          var item_ = textItem;

          if (item_.name === valueItem.name) {
            item_.validated = true;
            item_.warning = "";
          }
        });
      });
    }

    setTextComponentsValueArray(textComponentValueArray);
  };

  var handleTextComponentEnabled = function handleTextComponentEnabled(item) {
    var textComponentArray = [].concat(textComponentsArray);
    var index = textComponentArray.findIndex(function (x) {
      return x.name === item.name && x.dataType === item.dataType;
    });

    if (index !== -1) {
      textComponentArray[index].enabled = !textComponentArray[index].enabled;
    }

    setTextComponentsArray(textComponentArray);
    var textComponentValueArray = [].concat(textComponentsValueArray);

    if (textComponentValueArray.length > 0) {
      var index_ = textComponentValueArray.findIndex(function (x) {
        return x.name === item.name && x.dataType === item.dataType;
      });

      if (index_ !== -1) {
        textComponentValueArray[index_].enabled = !textComponentValueArray[index_].enabled;
      }
    }

    setTextComponentsValueArray(textComponentValueArray);
  };

  var returnOptions = function returnOptions(name, typeName) {
    var options = [];
    filterData.filter.forEach(function (item) {
      if (item.name === name) {
        item.types.forEach(function (type) {
          if (type.name === typeName) {
            options = [].concat(type.options);
          }
        });
      }
    });
    return options;
  };

  var addAppliedFilters = function addAppliedFilters(items) {
    var autoComplete = [];
    var dateTime = [];
    var text = [];
    items.forEach(function (item) {
      if (item.dataType === "AutoComplete") {
        var autoCompleteArray = [].concat(autoComplete);
        var options = returnOptions(item.name, item.type);

        if (autoCompleteArray.length > 0) {
          var index = autoCompleteArray.findIndex(function (x) {
            return x.name === item.name && item.type === x.type;
          });

          if (index === -1) {
            autoCompleteArray.push({
              name: item.name,
              dataType: item.dataType,
              type: item.type,
              enabled: item.enabled,
              value: item.value,
              objectArray: options
            });
          }
        } else {
          autoCompleteArray.push({
            name: item.name,
            dataType: item.dataType,
            type: item.type,
            enabled: item.enabled,
            value: item.value,
            objectArray: options
          });
        }

        autoComplete = autoCompleteArray;
      } else if (item.dataType === "DateTime") {
        var dateTimeArray = [].concat(dateTime);

        if (dateTimeArray.length === 0) {
          dateTimeArray.push({
            name: item.name,
            dataType: item.dataType,
            enabled: item.enabled,
            field: []
          });
          dateTimesValueArray.forEach(function (item_) {
            if (item_.fieldValue) {
              dateTimeArray.forEach(function (dt) {
                dt.field.push({
                  column: item_.fieldValue,
                  value: item_.value
                });
              });
            }
          });
        }

        dateTime = dateTimeArray;
      } else {
        var textComponentArray = [].concat(textComponentsArray);

        if (textComponentArray.length > 0) {
          var _index5 = textComponentArray.findIndex(function (x) {
            return x.name === item.name;
          });

          if (_index5 === -1) {
            textComponentArray.push({
              name: item.name,
              dataType: item.dataType,
              enabled: item.enabled,
              value: item.value
            });
          }
        } else {
          textComponentArray.push({
            name: item.name,
            dataType: item.dataType,
            enabled: item.enabled,
            value: item.value
          });
        }

        text = textComponentArray;
      }

      setAutoCompletesArray(autoComplete);
      setDateTimesArray(dateTime);
      setTextComponentsArray(text);
    });
    setApplyFilter(true);
  };

  var addSavedFilters = function addSavedFilters(item) {
    setFilterShow("");
    setRecentFilterShow("none");
    var autoComplete = [];
    var text = [];
    var tempArr = [];
    var savedFilters = [];
    Object.keys(item).forEach(function (key) {
      item[key].forEach(function (arrays) {
        Object.keys(arrays).forEach(function (key) {
          tempArr.push(arrays[key]);
        });
      });
    });
    var arr = [];
    tempArr.forEach(function (arrays) {
      arrays.forEach(function (array) {
        savedFilters.push(array);
      });
    });
    savedFilters.forEach(function (items) {
      filterData.filter.forEach(function (fil) {
        if (fil.types.length) {
          var index = fil.types.findIndex(function (x) {
            return x.name === items.type && fil.name === items.name;
          });

          if (index !== -1) {
            arr = fil.types[index].options;
          }
        }
      });

      if (items.dataType === "AutoComplete") {
        var autoCompleteArray = [].concat(autoComplete);

        if (autoCompleteArray.length > 0) {
          var index = autoCompleteArray.findIndex(function (x) {
            return x.name === items.name && items.type === x.type;
          });

          if (index === -1) {
            autoCompleteArray.push({
              name: items.name,
              dataType: items.dataType,
              type: items.type,
              enabled: items.enabled,
              value: items.value,
              objectArray: arr
            });
          }
        } else {
          autoCompleteArray.push({
            name: items.name,
            dataType: items.dataType,
            type: items.type,
            enabled: items.enabled,
            value: items.value,
            objectArray: arr
          });
        }

        autoComplete = autoCompleteArray;
      }
    });
    setAutoCompletesArray(autoComplete);
    var saveTempDateTimeArray = [];
    savedFilters.forEach(function (items) {
      if (items.dataType === "DateTime") {
        if (saveTempDateTimeArray.length === 0) {
          saveTempDateTimeArray.push({
            name: items.name,
            dataType: items.dataType,
            enabled: items.enabled,
            field: []
          });
        }
      }
    });
    savedFilters.forEach(function (saved) {
      if (saved.dataType === "DateTime") {
        if (saveTempDateTimeArray.length > 0) {
          saveTempDateTimeArray.forEach(function (filter) {
            filter.field.push({
              column: saved.fieldValue,
              value: saved.value
            });
          });
        }
      }
    });
    setDateTimesArray(saveTempDateTimeArray);
    savedFilters.forEach(function (items) {
      if (items.dataType === "Text") {
        var textComponentArray = [].concat(text);

        if (textComponentArray.length > 0) {
          var index = textComponentArray.findIndex(function (x) {
            return x.name === items.name;
          });

          if (index === -1) {
            textComponentArray.push({
              name: items.name,
              dataType: items.dataType,
              enabled: items.enabled,
              value: items.value
            });
          }
        } else {
          textComponentArray.push({
            name: items.name,
            dataType: items.dataType,
            enabled: items.enabled,
            value: items.value
          });
        }

        text = textComponentArray;
      }
    });
    setTextComponentsArray(text);
    setApplyFilter(true);
  };

  var handleClickAway = function handleClickAway() {
    setApplyFilter(false);
  };

  return /*#__PURE__*/React__default.createElement(ClickAwayListener, {
    onClickAway: handleClickAway
  }, showApplyFilter && /*#__PURE__*/React__default.createElement("div", {
    className: "neo-filter filter--grid"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "filter__wrap"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "filter__list"
  }, /*#__PURE__*/React__default.createElement(LeftDrawer, {
    filterData: filterData,
    fromLeftToRight: fromLeftToRight
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "filter__inputwrap"
  }, /*#__PURE__*/React__default.createElement(RightDrawer, {
    applyFilter: applyFilter,
    saveFilter: saveFilter,
    createAutoCompleteArray: createAutoCompleteArray,
    handleAutoCompleteEnabled: handleAutoCompleteEnabled,
    deleteAutoCompleteElement: deleteAutoCompleteElement,
    autoCompleteArray: autoCompletesArray,
    dateTimesArray: dateTimesArray,
    deleteDateTimeElement: deleteDateTimeElement,
    handleDateTimeEnabled: handleDateTimeEnabled,
    createDateTimeArray: createDateTimeArray,
    addToday: addToday,
    addTomorrow: addTomorrow,
    addThisMonth: addThisMonth,
    addForteenDays: addForteenDays,
    addSevenDays: addSevenDays,
    addThisWeek: addThisWeek,
    addThirtyDays: addThirtyDays,
    lastDayChange: lastDayChange,
    nextDayChange: nextDayChange,
    textComponentsArray: textComponentsArray,
    deleteTextComponentElement: deleteTextComponentElement,
    createTextComponentsArray: createTextComponentsArray,
    handleTextComponentEnabled: handleTextComponentEnabled,
    closeDrawer: closeDrawer,
    resetDrawer: resetDrawer,
    filterCount: filterCount,
    saveWarningClassName: saveWarningClassName,
    saveWarningLabel: saveWarningLabel,
    showSavePopUp: showSavePopUp,
    emptyFilterClassName: emptyFilterClassName,
    emptyFilterWarning: emptyFilterWarning,
    openShowSavePopUp: openShowSavePopUp,
    recentFilterShow: recentFilterShow,
    filterShow: filterShow,
    addSavedFilters: addSavedFilters
  })))), /*#__PURE__*/React__default.createElement(MainFilterPanel, {
    showDrawer: showDrawer,
    applyFilterChip: applyFilterChip,
    addAppliedFilters: addAppliedFilters,
    addSavedFilters: addSavedFilters,
    addingToFavourite: props.addingToFavourite
  }));
}
Filter.propTypes = {
  filterData: propTypes.any,
  addingToFavourite: propTypes.any,
  appliedFilters: propTypes.any,
  savedFilters: propTypes.any
};

module.exports = Filter;
//# sourceMappingURL=index.js.map
