
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/model/underscore.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ec994o1t0FK6Y0DWnJafEhA', 'underscore');
// gameComon/scripts/model/underscore.js

"use strict";

//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function () {
  // Baseline setup
  // --------------
  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = window; //this; //modified
  // Save the previous value of the `_` variable.

  var previousUnderscore = root._; // Establish the object that gets returned to break out of a loop iteration.

  var breaker = {}; // Save bytes in the minified (but not gzipped) version:

  var ArrayProto = Array.prototype,
      ObjProto = Object.prototype,
      FuncProto = Function.prototype; // Create quick reference variables for speed access to core prototypes.

  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      concat = ArrayProto.concat,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty; // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.

  var nativeForEach = ArrayProto.forEach,
      nativeMap = ArrayProto.map,
      nativeReduce = ArrayProto.reduce,
      nativeReduceRight = ArrayProto.reduceRight,
      nativeFilter = ArrayProto.filter,
      nativeEvery = ArrayProto.every,
      nativeSome = ArrayProto.some,
      nativeIndexOf = ArrayProto.indexOf,
      nativeLastIndexOf = ArrayProto.lastIndexOf,
      nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeBind = FuncProto.bind; // Create a safe reference to the Underscore object for use below.

  var _ = function _(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  }; // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.


  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }

    exports._ = _;
  } else {
    root._ = _;
  } // Current version.


  _.VERSION = '1.5.2'; // Collection Functions
  // --------------------
  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.

  var each = _.each = _.forEach = function (obj, iterator, context) {
    if (obj == null) return;

    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);

      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
  }; // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.


  _.map = _.collect = function (obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function (value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value'; // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.

  _.reduce = _.foldl = _.inject = function (obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];

    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }

    each(obj, function (value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  }; // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.


  _.reduceRight = _.foldr = function (obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];

    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }

    var length = obj.length;

    if (length !== +length) {
      var keys = _.keys(obj);

      length = keys.length;
    }

    each(obj, function (value, index, list) {
      index = keys ? keys[--length] : --length;

      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  }; // Return the first value which passes a truth test. Aliased as `detect`.


  _.find = _.detect = function (obj, iterator, context) {
    var result;
    any(obj, function (value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  }; // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.


  _.filter = _.select = function (obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function (value, index, list) {
      if (iterator.call(context, value, index, list)) results.push(value);
    });
    return results;
  }; // Return all the elements for which a truth test fails.


  _.reject = function (obj, iterator, context) {
    return _.filter(obj, function (value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  }; // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.


  _.every = _.all = function (obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function (value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  }; // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.


  var any = _.some = _.any = function (obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function (value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  }; // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.


  _.contains = _.include = function (obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function (value) {
      return value === target;
    });
  }; // Invoke a method (with arguments) on every item in a collection.


  _.invoke = function (obj, method) {
    var args = slice.call(arguments, 2);

    var isFunc = _.isFunction(method);

    return _.map(obj, function (value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  }; // Convenience version of a common use case of `map`: fetching a property.


  _.pluck = function (obj, key) {
    return _.map(obj, function (value) {
      return value[key];
    });
  }; // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.


  _.where = function (obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? void 0 : [];
    return _[first ? 'find' : 'filter'](obj, function (value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }

      return true;
    });
  }; // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.


  _.findWhere = function (obj, attrs) {
    return _.where(obj, attrs, true);
  }; // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)


  _.max = function (obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }

    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {
      computed: -Infinity,
      value: -Infinity
    };
    each(obj, function (value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed > result.computed && (result = {
        value: value,
        computed: computed
      });
    });
    return result.value;
  }; // Return the minimum element (or element-based computation).


  _.min = function (obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }

    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {
      computed: Infinity,
      value: Infinity
    };
    each(obj, function (value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {
        value: value,
        computed: computed
      });
    });
    return result.value;
  }; // Shuffle an array, using the modern version of the 
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).


  _.shuffle = function (obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function (value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  }; // Sample **n** random values from an array.
  // If **n** is not specified, returns a single random element from the array.
  // The internal `guard` argument allows it to work with `map`.


  _.sample = function (obj, n, guard) {
    if (arguments.length < 2 || guard) {
      return obj[_.random(obj.length - 1)];
    }

    return _.shuffle(obj).slice(0, Math.max(0, n));
  }; // An internal function to generate lookup iterators.


  var lookupIterator = function lookupIterator(value) {
    return _.isFunction(value) ? value : function (obj) {
      return obj[value];
    };
  }; // Sort the object's values by a criterion produced by an iterator.


  _.sortBy = function (obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function (value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function (left, right) {
      var a = left.criteria;
      var b = right.criteria;

      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }

      return left.index - right.index;
    }), 'value');
  }; // An internal function used for aggregate "group by" operations.


  var group = function group(behavior) {
    return function (obj, value, context) {
      var result = {};
      var iterator = value == null ? _.identity : lookupIterator(value);
      each(obj, function (value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  }; // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.


  _.groupBy = group(function (result, key, value) {
    (_.has(result, key) ? result[key] : result[key] = []).push(value);
  }); // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.

  _.indexBy = group(function (result, key, value) {
    result[key] = value;
  }); // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.

  _.countBy = group(function (result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  }); // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.

  _.sortedIndex = function (array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0,
        high = array.length;

    while (low < high) {
      var mid = low + high >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }

    return low;
  }; // Safely create a real, live array from anything iterable.


  _.toArray = function (obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  }; // Return the number of elements in an object.


  _.size = function (obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  }; // Array Functions
  // ---------------
  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.


  _.first = _.head = _.take = function (array, n, guard) {
    if (array == null) return void 0;
    return n == null || guard ? array[0] : slice.call(array, 0, n);
  }; // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.


  _.initial = function (array, n, guard) {
    return slice.call(array, 0, array.length - (n == null || guard ? 1 : n));
  }; // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.


  _.last = function (array, n, guard) {
    if (array == null) return void 0;

    if (n == null || guard) {
      return array[array.length - 1];
    } else {
      return slice.call(array, Math.max(array.length - n, 0));
    }
  }; // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.


  _.rest = _.tail = _.drop = function (array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  }; // Trim out all falsy values from an array.


  _.compact = function (array) {
    return _.filter(array, _.identity);
  }; // Internal implementation of a recursive `flatten` function.


  var flatten = function flatten(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }

    each(input, function (value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  }; // Flatten out an array, either recursively (by default), or just one level.


  _.flatten = function (array, shallow) {
    return flatten(array, shallow, []);
  }; // Return a version of the array that does not contain the specified value(s).


  _.without = function (array) {
    return _.difference(array, slice.call(arguments, 1));
  }; // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.


  _.uniq = _.unique = function (array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }

    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function (value, index) {
      if (isSorted ? !index || seen[seen.length - 1] !== value : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  }; // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.


  _.union = function () {
    return _.uniq(_.flatten(arguments, true));
  }; // Produce an array that contains every item shared between all the
  // passed-in arrays.


  _.intersection = function (array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function (item) {
      return _.every(rest, function (other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  }; // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.


  _.difference = function (array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function (value) {
      return !_.contains(rest, value);
    });
  }; // Zip together multiple lists into a single array -- elements that share
  // an index go together.


  _.zip = function () {
    var length = _.max(_.pluck(arguments, "length").concat(0));

    var results = new Array(length);

    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }

    return results;
  }; // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.


  _.object = function (list, values) {
    if (list == null) return {};
    var result = {};

    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }

    return result;
  }; // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.


  _.indexOf = function (array, item, isSorted) {
    if (array == null) return -1;
    var i = 0,
        length = array.length;

    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }

    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);

    for (; i < length; i++) {
      if (array[i] === item) return i;
    }

    return -1;
  }; // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.


  _.lastIndexOf = function (array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;

    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }

    var i = hasIndex ? from : array.length;

    while (i--) {
      if (array[i] === item) return i;
    }

    return -1;
  }; // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).


  _.range = function (start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }

    step = arguments[2] || 1;
    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while (idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  }; // Function (ahem) Functions
  // ------------------
  // Reusable constructor function for prototype setting.


  var ctor = function ctor() {}; // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.


  _.bind = function (func, context) {
    var args, _bound;

    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError();
    args = slice.call(arguments, 2);
    return _bound = function bound() {
      if (!(this instanceof _bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor();
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  }; // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.


  _.partial = function (func) {
    var args = slice.call(arguments, 1);
    return function () {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  }; // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.


  _.bindAll = function (obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error("bindAll must be passed function names");
    each(funcs, function (f) {
      obj[f] = _.bind(obj[f], obj);
    });
    return obj;
  }; // Memoize an expensive function by storing its results.


  _.memoize = function (func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function () {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : memo[key] = func.apply(this, arguments);
    };
  }; // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.


  _.delay = function (func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function () {
      return func.apply(null, args);
    }, wait);
  }; // Defers a function, scheduling it to run after the current call stack has
  // cleared.


  _.defer = function (func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  }; // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.


  _.throttle = function (func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});

    var later = function later() {
      previous = options.leading === false ? 0 : new Date();
      timeout = null;
      result = func.apply(context, args);
    };

    return function () {
      var now = new Date();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;

      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }

      return result;
    };
  }; // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.


  _.debounce = function (func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function () {
      context = this;
      args = arguments;
      timestamp = new Date();

      var later = function later() {
        var last = new Date() - timestamp;

        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
        }
      };

      var callNow = immediate && !timeout;

      if (!timeout) {
        timeout = setTimeout(later, wait);
      }

      if (callNow) result = func.apply(context, args);
      return result;
    };
  }; // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.


  _.once = function (func) {
    var ran = false,
        memo;
    return function () {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  }; // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.


  _.wrap = function (func, wrapper) {
    return function () {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  }; // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.


  _.compose = function () {
    var funcs = arguments;
    return function () {
      var args = arguments;

      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }

      return args[0];
    };
  }; // Returns a function that will only be executed after being called N times.


  _.after = function (times, func) {
    return function () {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  }; // Object Functions
  // ----------------
  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`


  _.keys = nativeKeys || function (obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];

    for (var key in obj) {
      if (_.has(obj, key)) keys.push(key);
    }

    return keys;
  }; // Retrieve the values of an object's properties.


  _.values = function (obj) {
    var keys = _.keys(obj);

    var length = keys.length;
    var values = new Array(length);

    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }

    return values;
  }; // Convert an object into a list of `[key, value]` pairs.


  _.pairs = function (obj) {
    var keys = _.keys(obj);

    var length = keys.length;
    var pairs = new Array(length);

    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }

    return pairs;
  }; // Invert the keys and values of an object. The values must be serializable.


  _.invert = function (obj) {
    var result = {};

    var keys = _.keys(obj);

    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }

    return result;
  }; // Return a sorted list of the function names available on the object.
  // Aliased as `methods`


  _.functions = _.methods = function (obj) {
    var names = [];

    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }

    return names.sort();
  }; // Extend a given object with all the properties in passed-in object(s).


  _.extend = function (obj) {
    each(slice.call(arguments, 1), function (source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  }; // Return a copy of the object only containing the whitelisted properties.


  _.pick = function (obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function (key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  }; // Return a copy of the object without the blacklisted properties.


  _.omit = function (obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));

    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }

    return copy;
  }; // Fill in a given object with default properties.


  _.defaults = function (obj) {
    each(slice.call(arguments, 1), function (source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  }; // Create a (shallow-cloned) duplicate of an object.


  _.clone = function (obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  }; // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.


  _.tap = function (obj, interceptor) {
    interceptor(obj);
    return obj;
  }; // Internal recursive comparison function for `isEqual`.


  var eq = function eq(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b; // A strict comparison is necessary because `null == undefined`.

    if (a == null || b == null) return a === b; // Unwrap any wrapped objects.

    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped; // Compare `[[Class]]` names.

    var className = toString.call(a);
    if (className != toString.call(b)) return false;

    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);

      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : a == 0 ? 1 / a == 1 / b : a == +b;

      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.

      case '[object RegExp]':
        return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
    }

    if (typeof a != 'object' || typeof b != 'object') return false; // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    var length = aStack.length;

    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    } // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.


    var aCtor = a.constructor,
        bCtor = b.constructor;

    if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor)) {
      return false;
    } // Add the first object to the stack of traversed objects.


    aStack.push(a);
    bStack.push(b);
    var size = 0,
        result = true; // Recursively compare objects and arrays.

    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;

      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++; // Deep compare each member.

          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      } // Ensure that both objects contain the same number of properties.


      if (result) {
        for (key in b) {
          if (_.has(b, key) && !size--) break;
        }

        result = !size;
      }
    } // Remove the first object from the stack of traversed objects.


    aStack.pop();
    bStack.pop();
    return result;
  }; // Perform a deep comparison to check if two objects are equal.


  _.isEqual = function (a, b) {
    return eq(a, b, [], []);
  }; // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.


  _.isEmpty = function (obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;

    for (var key in obj) {
      if (_.has(obj, key)) return false;
    }

    return true;
  }; // Is a given value a DOM element?


  _.isElement = function (obj) {
    return !!(obj && obj.nodeType === 1);
  }; // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray


  _.isArray = nativeIsArray || function (obj) {
    return toString.call(obj) == '[object Array]';
  }; // Is a given variable an object?


  _.isObject = function (obj) {
    return obj === Object(obj);
  }; // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.


  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function (name) {
    _['is' + name] = function (obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  }); // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.

  if (!_.isArguments(arguments)) {
    _.isArguments = function (obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  } // Optimize `isFunction` if appropriate.


  if (typeof /./ !== 'function') {
    _.isFunction = function (obj) {
      return typeof obj === 'function';
    };
  } // Is a given object a finite number?


  _.isFinite = function (obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  }; // Is the given value `NaN`? (NaN is the only number which does not equal itself).


  _.isNaN = function (obj) {
    return _.isNumber(obj) && obj != +obj;
  }; // Is a given value a boolean?


  _.isBoolean = function (obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  }; // Is a given value equal to null?


  _.isNull = function (obj) {
    return obj === null;
  }; // Is a given variable undefined?


  _.isUndefined = function (obj) {
    return obj === void 0;
  }; // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).


  _.has = function (obj, key) {
    return hasOwnProperty.call(obj, key);
  }; // Utility Functions
  // -----------------
  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.


  _.noConflict = function () {
    root._ = previousUnderscore;
    return this;
  }; // Keep the identity function around for default iterators.


  _.identity = function (value) {
    return value;
  }; // Run a function **n** times.


  _.times = function (n, iterator, context) {
    var accum = Array(Math.max(0, n));

    for (var i = 0; i < n; i++) {
      accum[i] = iterator.call(context, i);
    }

    return accum;
  }; // Return a random integer between min and max (inclusive).


  _.random = function (min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }

    return min + Math.floor(Math.random() * (max - min + 1));
  }; // List of HTML entities for escaping.


  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape); // Regexes containing the keys and values listed immediately above.

  var entityRegexes = {
    escape: new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  }; // Functions for escaping and unescaping strings to/from HTML interpolation.

  _.each(['escape', 'unescape'], function (method) {
    _[method] = function (string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function (match) {
        return entityMap[method][match];
      });
    };
  }); // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.


  _.result = function (object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  }; // Add your own custom functions to the Underscore object.


  _.mixin = function (obj) {
    each(_.functions(obj), function (name) {
      var func = _[name] = obj[name];

      _.prototype[name] = function () {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  }; // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.


  var idCounter = 0;

  _.uniqueId = function (prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  }; // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.


  _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  }; // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.

  var noMatch = /(.)^/; // Certain characters need to be escaped so that they can be put into a
  // string literal.

  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\t': 't',
    "\u2028": 'u2028',
    "\u2029": 'u2029'
  };
  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g; // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.

  _.template = function (text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings); // Combine delimiters into one regular expression via alternation.

    var matcher = new RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g'); // Compile the template source, escaping string literals appropriately.

    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, function (match) {
        return '\\' + escapes[match];
      });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }

      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }

      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      index = offset + match.length;
      return match;
    });
    source += "';\n"; // If a variable is not specified, place data values in local scope.

    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
    source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);

    var template = function template(data) {
      return render.call(this, data, _);
    }; // Provide the compiled function source as a convenience for precompilation.


    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';
    return template;
  }; // Add a "chain" function, which will delegate to the wrapper.


  _.chain = function (obj) {
    return _(obj).chain();
  }; // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  // Helper function to continue chaining intermediate results.


  var result = function result(obj) {
    return this._chain ? _(obj).chain() : obj;
  }; // Add all of the Underscore functions to the wrapper object.


  _.mixin(_); // Add all mutator Array functions to the wrapper.


  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
    var method = ArrayProto[name];

    _.prototype[name] = function () {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  }); // Add all accessor Array functions to the wrapper.

  each(['concat', 'join', 'slice'], function (name) {
    var method = ArrayProto[name];

    _.prototype[name] = function () {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {
    // Start chaining a wrapped Underscore object.
    chain: function chain() {
      this._chain = true;
      return this;
    },
    // Extracts the result from a wrapped and chained object.
    value: function value() {
      return this._wrapped;
    }
  });
}).call(void 0);

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JpcHRzXFxtb2RlbFxcdW5kZXJzY29yZS5qcyJdLCJuYW1lcyI6WyJyb290Iiwid2luZG93IiwicHJldmlvdXNVbmRlcnNjb3JlIiwiXyIsImJyZWFrZXIiLCJBcnJheVByb3RvIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJPYmpQcm90byIsIk9iamVjdCIsIkZ1bmNQcm90byIsIkZ1bmN0aW9uIiwicHVzaCIsInNsaWNlIiwiY29uY2F0IiwidG9TdHJpbmciLCJoYXNPd25Qcm9wZXJ0eSIsIm5hdGl2ZUZvckVhY2giLCJmb3JFYWNoIiwibmF0aXZlTWFwIiwibWFwIiwibmF0aXZlUmVkdWNlIiwicmVkdWNlIiwibmF0aXZlUmVkdWNlUmlnaHQiLCJyZWR1Y2VSaWdodCIsIm5hdGl2ZUZpbHRlciIsImZpbHRlciIsIm5hdGl2ZUV2ZXJ5IiwiZXZlcnkiLCJuYXRpdmVTb21lIiwic29tZSIsIm5hdGl2ZUluZGV4T2YiLCJpbmRleE9mIiwibmF0aXZlTGFzdEluZGV4T2YiLCJsYXN0SW5kZXhPZiIsIm5hdGl2ZUlzQXJyYXkiLCJpc0FycmF5IiwibmF0aXZlS2V5cyIsImtleXMiLCJuYXRpdmVCaW5kIiwiYmluZCIsIm9iaiIsIl93cmFwcGVkIiwiZXhwb3J0cyIsIm1vZHVsZSIsIlZFUlNJT04iLCJlYWNoIiwiaXRlcmF0b3IiLCJjb250ZXh0IiwibGVuZ3RoIiwiaSIsImNhbGwiLCJjb2xsZWN0IiwicmVzdWx0cyIsInZhbHVlIiwiaW5kZXgiLCJsaXN0IiwicmVkdWNlRXJyb3IiLCJmb2xkbCIsImluamVjdCIsIm1lbW8iLCJpbml0aWFsIiwiYXJndW1lbnRzIiwiVHlwZUVycm9yIiwiZm9sZHIiLCJmaW5kIiwiZGV0ZWN0IiwicmVzdWx0IiwiYW55Iiwic2VsZWN0IiwicmVqZWN0IiwiYWxsIiwiaWRlbnRpdHkiLCJjb250YWlucyIsImluY2x1ZGUiLCJ0YXJnZXQiLCJpbnZva2UiLCJtZXRob2QiLCJhcmdzIiwiaXNGdW5jIiwiaXNGdW5jdGlvbiIsImFwcGx5IiwicGx1Y2siLCJrZXkiLCJ3aGVyZSIsImF0dHJzIiwiZmlyc3QiLCJpc0VtcHR5IiwiZmluZFdoZXJlIiwibWF4IiwiTWF0aCIsIkluZmluaXR5IiwiY29tcHV0ZWQiLCJtaW4iLCJzaHVmZmxlIiwicmFuZCIsInNodWZmbGVkIiwicmFuZG9tIiwic2FtcGxlIiwibiIsImd1YXJkIiwibG9va3VwSXRlcmF0b3IiLCJzb3J0QnkiLCJjcml0ZXJpYSIsInNvcnQiLCJsZWZ0IiwicmlnaHQiLCJhIiwiYiIsImdyb3VwIiwiYmVoYXZpb3IiLCJncm91cEJ5IiwiaGFzIiwiaW5kZXhCeSIsImNvdW50QnkiLCJzb3J0ZWRJbmRleCIsImFycmF5IiwibG93IiwiaGlnaCIsIm1pZCIsInRvQXJyYXkiLCJ2YWx1ZXMiLCJzaXplIiwiaGVhZCIsInRha2UiLCJsYXN0IiwicmVzdCIsInRhaWwiLCJkcm9wIiwiY29tcGFjdCIsImZsYXR0ZW4iLCJpbnB1dCIsInNoYWxsb3ciLCJvdXRwdXQiLCJpc0FyZ3VtZW50cyIsIndpdGhvdXQiLCJkaWZmZXJlbmNlIiwidW5pcSIsInVuaXF1ZSIsImlzU29ydGVkIiwic2VlbiIsInVuaW9uIiwiaW50ZXJzZWN0aW9uIiwiaXRlbSIsIm90aGVyIiwiemlwIiwib2JqZWN0IiwiZnJvbSIsImhhc0luZGV4IiwicmFuZ2UiLCJzdGFydCIsInN0b3AiLCJzdGVwIiwiY2VpbCIsImlkeCIsImN0b3IiLCJmdW5jIiwiYm91bmQiLCJzZWxmIiwicGFydGlhbCIsImJpbmRBbGwiLCJmdW5jcyIsIkVycm9yIiwiZiIsIm1lbW9pemUiLCJoYXNoZXIiLCJkZWxheSIsIndhaXQiLCJzZXRUaW1lb3V0IiwiZGVmZXIiLCJ0aHJvdHRsZSIsIm9wdGlvbnMiLCJ0aW1lb3V0IiwicHJldmlvdXMiLCJsYXRlciIsImxlYWRpbmciLCJEYXRlIiwibm93IiwicmVtYWluaW5nIiwiY2xlYXJUaW1lb3V0IiwidHJhaWxpbmciLCJkZWJvdW5jZSIsImltbWVkaWF0ZSIsInRpbWVzdGFtcCIsImNhbGxOb3ciLCJvbmNlIiwicmFuIiwid3JhcCIsIndyYXBwZXIiLCJjb21wb3NlIiwiYWZ0ZXIiLCJ0aW1lcyIsInBhaXJzIiwiaW52ZXJ0IiwiZnVuY3Rpb25zIiwibWV0aG9kcyIsIm5hbWVzIiwiZXh0ZW5kIiwic291cmNlIiwicHJvcCIsInBpY2siLCJjb3B5Iiwib21pdCIsImRlZmF1bHRzIiwiY2xvbmUiLCJpc09iamVjdCIsInRhcCIsImludGVyY2VwdG9yIiwiZXEiLCJhU3RhY2siLCJiU3RhY2siLCJjbGFzc05hbWUiLCJTdHJpbmciLCJnbG9iYWwiLCJtdWx0aWxpbmUiLCJpZ25vcmVDYXNlIiwiYUN0b3IiLCJjb25zdHJ1Y3RvciIsImJDdG9yIiwicG9wIiwiaXNFcXVhbCIsImlzU3RyaW5nIiwiaXNFbGVtZW50Iiwibm9kZVR5cGUiLCJuYW1lIiwiaXNGaW5pdGUiLCJpc05hTiIsInBhcnNlRmxvYXQiLCJpc051bWJlciIsImlzQm9vbGVhbiIsImlzTnVsbCIsImlzVW5kZWZpbmVkIiwibm9Db25mbGljdCIsImFjY3VtIiwiZmxvb3IiLCJlbnRpdHlNYXAiLCJlc2NhcGUiLCJ1bmVzY2FwZSIsImVudGl0eVJlZ2V4ZXMiLCJSZWdFeHAiLCJqb2luIiwic3RyaW5nIiwicmVwbGFjZSIsIm1hdGNoIiwicHJvcGVydHkiLCJtaXhpbiIsImlkQ291bnRlciIsInVuaXF1ZUlkIiwicHJlZml4IiwiaWQiLCJ0ZW1wbGF0ZVNldHRpbmdzIiwiZXZhbHVhdGUiLCJpbnRlcnBvbGF0ZSIsIm5vTWF0Y2giLCJlc2NhcGVzIiwiZXNjYXBlciIsInRlbXBsYXRlIiwidGV4dCIsImRhdGEiLCJzZXR0aW5ncyIsInJlbmRlciIsIm1hdGNoZXIiLCJvZmZzZXQiLCJ2YXJpYWJsZSIsImUiLCJjaGFpbiIsIl9jaGFpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLENBQUMsWUFBVztBQUVWO0FBQ0E7QUFFQTtBQUNB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QUFBLEtBQUssRUFBRSxpQkFBVztBQUNoQixXQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNBLGFBQU8sSUFBUDtBQUNELEtBTm1CO0FBUXBCO0FBQ0FwTixJQUFBQSxLQUFLLEVBQUUsaUJBQVc7QUFDaEIsYUFBTyxLQUFLWixRQUFaO0FBQ0Q7QUFYbUIsR0FBdEI7QUFlRCxDQXR2Q0QsRUFzdkNHUyxJQXR2Q0giLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICAgICBVbmRlcnNjb3JlLmpzIDEuNS4yXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcbi8vICAgICAoYykgMjAwOS0yMDEzIEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4vLyAgICAgVW5kZXJzY29yZSBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cblxuKGZ1bmN0aW9uKCkge1xuXG4gIC8vIEJhc2VsaW5lIHNldHVwXG4gIC8vIC0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gRXN0YWJsaXNoIHRoZSByb290IG9iamVjdCwgYHdpbmRvd2AgaW4gdGhlIGJyb3dzZXIsIG9yIGBleHBvcnRzYCBvbiB0aGUgc2VydmVyLlxuICB2YXIgcm9vdCA9IHdpbmRvdzsgLy90aGlzOyAvL21vZGlmaWVkXG5cbiAgLy8gU2F2ZSB0aGUgcHJldmlvdXMgdmFsdWUgb2YgdGhlIGBfYCB2YXJpYWJsZS5cbiAgdmFyIHByZXZpb3VzVW5kZXJzY29yZSA9IHJvb3QuXztcblxuICAvLyBFc3RhYmxpc2ggdGhlIG9iamVjdCB0aGF0IGdldHMgcmV0dXJuZWQgdG8gYnJlYWsgb3V0IG9mIGEgbG9vcCBpdGVyYXRpb24uXG4gIHZhciBicmVha2VyID0ge307XG5cbiAgLy8gU2F2ZSBieXRlcyBpbiB0aGUgbWluaWZpZWQgKGJ1dCBub3QgZ3ppcHBlZCkgdmVyc2lvbjpcbiAgdmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsIE9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZSwgRnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4gIC8vIENyZWF0ZSBxdWljayByZWZlcmVuY2UgdmFyaWFibGVzIGZvciBzcGVlZCBhY2Nlc3MgdG8gY29yZSBwcm90b3R5cGVzLlxuICB2YXJcbiAgICBwdXNoICAgICAgICAgICAgID0gQXJyYXlQcm90by5wdXNoLFxuICAgIHNsaWNlICAgICAgICAgICAgPSBBcnJheVByb3RvLnNsaWNlLFxuICAgIGNvbmNhdCAgICAgICAgICAgPSBBcnJheVByb3RvLmNvbmNhdCxcbiAgICB0b1N0cmluZyAgICAgICAgID0gT2JqUHJvdG8udG9TdHJpbmcsXG4gICAgaGFzT3duUHJvcGVydHkgICA9IE9ialByb3RvLmhhc093blByb3BlcnR5O1xuXG4gIC8vIEFsbCAqKkVDTUFTY3JpcHQgNSoqIG5hdGl2ZSBmdW5jdGlvbiBpbXBsZW1lbnRhdGlvbnMgdGhhdCB3ZSBob3BlIHRvIHVzZVxuICAvLyBhcmUgZGVjbGFyZWQgaGVyZS5cbiAgdmFyXG4gICAgbmF0aXZlRm9yRWFjaCAgICAgID0gQXJyYXlQcm90by5mb3JFYWNoLFxuICAgIG5hdGl2ZU1hcCAgICAgICAgICA9IEFycmF5UHJvdG8ubWFwLFxuICAgIG5hdGl2ZVJlZHVjZSAgICAgICA9IEFycmF5UHJvdG8ucmVkdWNlLFxuICAgIG5hdGl2ZVJlZHVjZVJpZ2h0ICA9IEFycmF5UHJvdG8ucmVkdWNlUmlnaHQsXG4gICAgbmF0aXZlRmlsdGVyICAgICAgID0gQXJyYXlQcm90by5maWx0ZXIsXG4gICAgbmF0aXZlRXZlcnkgICAgICAgID0gQXJyYXlQcm90by5ldmVyeSxcbiAgICBuYXRpdmVTb21lICAgICAgICAgPSBBcnJheVByb3RvLnNvbWUsXG4gICAgbmF0aXZlSW5kZXhPZiAgICAgID0gQXJyYXlQcm90by5pbmRleE9mLFxuICAgIG5hdGl2ZUxhc3RJbmRleE9mICA9IEFycmF5UHJvdG8ubGFzdEluZGV4T2YsXG4gICAgbmF0aXZlSXNBcnJheSAgICAgID0gQXJyYXkuaXNBcnJheSxcbiAgICBuYXRpdmVLZXlzICAgICAgICAgPSBPYmplY3Qua2V5cyxcbiAgICBuYXRpdmVCaW5kICAgICAgICAgPSBGdW5jUHJvdG8uYmluZDtcblxuICAvLyBDcmVhdGUgYSBzYWZlIHJlZmVyZW5jZSB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QgZm9yIHVzZSBiZWxvdy5cbiAgdmFyIF8gPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgXykgcmV0dXJuIG9iajtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgXykpIHJldHVybiBuZXcgXyhvYmopO1xuICAgIHRoaXMuX3dyYXBwZWQgPSBvYmo7XG4gIH07XG5cbiAgLy8gRXhwb3J0IHRoZSBVbmRlcnNjb3JlIG9iamVjdCBmb3IgKipOb2RlLmpzKiosIHdpdGhcbiAgLy8gYmFja3dhcmRzLWNvbXBhdGliaWxpdHkgZm9yIHRoZSBvbGQgYHJlcXVpcmUoKWAgQVBJLiBJZiB3ZSdyZSBpblxuICAvLyB0aGUgYnJvd3NlciwgYWRkIGBfYCBhcyBhIGdsb2JhbCBvYmplY3QgdmlhIGEgc3RyaW5nIGlkZW50aWZpZXIsXG4gIC8vIGZvciBDbG9zdXJlIENvbXBpbGVyIFwiYWR2YW5jZWRcIiBtb2RlLlxuICBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBfO1xuICAgIH1cbiAgICBleHBvcnRzLl8gPSBfO1xuICB9IGVsc2Uge1xuICAgIHJvb3QuXyA9IF87XG4gIH1cblxuICAvLyBDdXJyZW50IHZlcnNpb24uXG4gIF8uVkVSU0lPTiA9ICcxLjUuMic7XG5cbiAgLy8gQ29sbGVjdGlvbiBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBUaGUgY29ybmVyc3RvbmUsIGFuIGBlYWNoYCBpbXBsZW1lbnRhdGlvbiwgYWthIGBmb3JFYWNoYC5cbiAgLy8gSGFuZGxlcyBvYmplY3RzIHdpdGggdGhlIGJ1aWx0LWluIGBmb3JFYWNoYCwgYXJyYXlzLCBhbmQgcmF3IG9iamVjdHMuXG4gIC8vIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBmb3JFYWNoYCBpZiBhdmFpbGFibGUuXG4gIHZhciBlYWNoID0gXy5lYWNoID0gXy5mb3JFYWNoID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuO1xuICAgIGlmIChuYXRpdmVGb3JFYWNoICYmIG9iai5mb3JFYWNoID09PSBuYXRpdmVGb3JFYWNoKSB7XG4gICAgICBvYmouZm9yRWFjaChpdGVyYXRvciwgY29udGV4dCk7XG4gICAgfSBlbHNlIGlmIChvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IG9iai5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaikgPT09IGJyZWFrZXIpIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXlzW2ldXSwga2V5c1tpXSwgb2JqKSA9PT0gYnJlYWtlcikgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIHJlc3VsdHMgb2YgYXBwbHlpbmcgdGhlIGl0ZXJhdG9yIHRvIGVhY2ggZWxlbWVudC5cbiAgLy8gRGVsZWdhdGVzIHRvICoqRUNNQVNjcmlwdCA1KioncyBuYXRpdmUgYG1hcGAgaWYgYXZhaWxhYmxlLlxuICBfLm1hcCA9IF8uY29sbGVjdCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHJlc3VsdHM7XG4gICAgaWYgKG5hdGl2ZU1hcCAmJiBvYmoubWFwID09PSBuYXRpdmVNYXApIHJldHVybiBvYmoubWFwKGl0ZXJhdG9yLCBjb250ZXh0KTtcbiAgICBlYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICByZXN1bHRzLnB1c2goaXRlcmF0b3IuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGxpc3QpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICB2YXIgcmVkdWNlRXJyb3IgPSAnUmVkdWNlIG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZSc7XG5cbiAgLy8gKipSZWR1Y2UqKiBidWlsZHMgdXAgYSBzaW5nbGUgcmVzdWx0IGZyb20gYSBsaXN0IG9mIHZhbHVlcywgYWthIGBpbmplY3RgLFxuICAvLyBvciBgZm9sZGxgLiBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgcmVkdWNlYCBpZiBhdmFpbGFibGUuXG4gIF8ucmVkdWNlID0gXy5mb2xkbCA9IF8uaW5qZWN0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRvciwgbWVtbywgY29udGV4dCkge1xuICAgIHZhciBpbml0aWFsID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XG4gICAgaWYgKG9iaiA9PSBudWxsKSBvYmogPSBbXTtcbiAgICBpZiAobmF0aXZlUmVkdWNlICYmIG9iai5yZWR1Y2UgPT09IG5hdGl2ZVJlZHVjZSkge1xuICAgICAgaWYgKGNvbnRleHQpIGl0ZXJhdG9yID0gXy5iaW5kKGl0ZXJhdG9yLCBjb250ZXh0KTtcbiAgICAgIHJldHVybiBpbml0aWFsID8gb2JqLnJlZHVjZShpdGVyYXRvciwgbWVtbykgOiBvYmoucmVkdWNlKGl0ZXJhdG9yKTtcbiAgICB9XG4gICAgZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgaWYgKCFpbml0aWFsKSB7XG4gICAgICAgIG1lbW8gPSB2YWx1ZTtcbiAgICAgICAgaW5pdGlhbCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZW1vID0gaXRlcmF0b3IuY2FsbChjb250ZXh0LCBtZW1vLCB2YWx1ZSwgaW5kZXgsIGxpc3QpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghaW5pdGlhbCkgdGhyb3cgbmV3IFR5cGVFcnJvcihyZWR1Y2VFcnJvcik7XG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG5cbiAgLy8gVGhlIHJpZ2h0LWFzc29jaWF0aXZlIHZlcnNpb24gb2YgcmVkdWNlLCBhbHNvIGtub3duIGFzIGBmb2xkcmAuXG4gIC8vIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGByZWR1Y2VSaWdodGAgaWYgYXZhaWxhYmxlLlxuICBfLnJlZHVjZVJpZ2h0ID0gXy5mb2xkciA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0b3IsIG1lbW8sIGNvbnRleHQpIHtcbiAgICB2YXIgaW5pdGlhbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xuICAgIGlmIChvYmogPT0gbnVsbCkgb2JqID0gW107XG4gICAgaWYgKG5hdGl2ZVJlZHVjZVJpZ2h0ICYmIG9iai5yZWR1Y2VSaWdodCA9PT0gbmF0aXZlUmVkdWNlUmlnaHQpIHtcbiAgICAgIGlmIChjb250ZXh0KSBpdGVyYXRvciA9IF8uYmluZChpdGVyYXRvciwgY29udGV4dCk7XG4gICAgICByZXR1cm4gaW5pdGlhbCA/IG9iai5yZWR1Y2VSaWdodChpdGVyYXRvciwgbWVtbykgOiBvYmoucmVkdWNlUmlnaHQoaXRlcmF0b3IpO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gb2JqLmxlbmd0aDtcbiAgICBpZiAobGVuZ3RoICE9PSArbGVuZ3RoKSB7XG4gICAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgfVxuICAgIGVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIGluZGV4ID0ga2V5cyA/IGtleXNbLS1sZW5ndGhdIDogLS1sZW5ndGg7XG4gICAgICBpZiAoIWluaXRpYWwpIHtcbiAgICAgICAgbWVtbyA9IG9ialtpbmRleF07XG4gICAgICAgIGluaXRpYWwgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVtbyA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgbWVtbywgb2JqW2luZGV4XSwgaW5kZXgsIGxpc3QpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghaW5pdGlhbCkgdGhyb3cgbmV3IFR5cGVFcnJvcihyZWR1Y2VFcnJvcik7XG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBmaXJzdCB2YWx1ZSB3aGljaCBwYXNzZXMgYSB0cnV0aCB0ZXN0LiBBbGlhc2VkIGFzIGBkZXRlY3RgLlxuICBfLmZpbmQgPSBfLmRldGVjdCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0O1xuICAgIGFueShvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgaWYgKGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBsaXN0KSkge1xuICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyB0aGF0IHBhc3MgYSB0cnV0aCB0ZXN0LlxuICAvLyBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgZmlsdGVyYCBpZiBhdmFpbGFibGUuXG4gIC8vIEFsaWFzZWQgYXMgYHNlbGVjdGAuXG4gIF8uZmlsdGVyID0gXy5zZWxlY3QgPSBmdW5jdGlvbihvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiByZXN1bHRzO1xuICAgIGlmIChuYXRpdmVGaWx0ZXIgJiYgb2JqLmZpbHRlciA9PT0gbmF0aXZlRmlsdGVyKSByZXR1cm4gb2JqLmZpbHRlcihpdGVyYXRvciwgY29udGV4dCk7XG4gICAgZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgaWYgKGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBsaXN0KSkgcmVzdWx0cy5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICAvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyBmb3Igd2hpY2ggYSB0cnV0aCB0ZXN0IGZhaWxzLlxuICBfLnJlamVjdCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIHJldHVybiAhaXRlcmF0b3IuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGxpc3QpO1xuICAgIH0sIGNvbnRleHQpO1xuICB9O1xuXG4gIC8vIERldGVybWluZSB3aGV0aGVyIGFsbCBvZiB0aGUgZWxlbWVudHMgbWF0Y2ggYSB0cnV0aCB0ZXN0LlxuICAvLyBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgZXZlcnlgIGlmIGF2YWlsYWJsZS5cbiAgLy8gQWxpYXNlZCBhcyBgYWxsYC5cbiAgXy5ldmVyeSA9IF8uYWxsID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGl0ZXJhdG9yIHx8IChpdGVyYXRvciA9IF8uaWRlbnRpdHkpO1xuICAgIHZhciByZXN1bHQgPSB0cnVlO1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHJlc3VsdDtcbiAgICBpZiAobmF0aXZlRXZlcnkgJiYgb2JqLmV2ZXJ5ID09PSBuYXRpdmVFdmVyeSkgcmV0dXJuIG9iai5ldmVyeShpdGVyYXRvciwgY29udGV4dCk7XG4gICAgZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgaWYgKCEocmVzdWx0ID0gcmVzdWx0ICYmIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBsaXN0KSkpIHJldHVybiBicmVha2VyO1xuICAgIH0pO1xuICAgIHJldHVybiAhIXJlc3VsdDtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgaWYgYXQgbGVhc3Qgb25lIGVsZW1lbnQgaW4gdGhlIG9iamVjdCBtYXRjaGVzIGEgdHJ1dGggdGVzdC5cbiAgLy8gRGVsZWdhdGVzIHRvICoqRUNNQVNjcmlwdCA1KioncyBuYXRpdmUgYHNvbWVgIGlmIGF2YWlsYWJsZS5cbiAgLy8gQWxpYXNlZCBhcyBgYW55YC5cbiAgdmFyIGFueSA9IF8uc29tZSA9IF8uYW55ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGl0ZXJhdG9yIHx8IChpdGVyYXRvciA9IF8uaWRlbnRpdHkpO1xuICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiByZXN1bHQ7XG4gICAgaWYgKG5hdGl2ZVNvbWUgJiYgb2JqLnNvbWUgPT09IG5hdGl2ZVNvbWUpIHJldHVybiBvYmouc29tZShpdGVyYXRvciwgY29udGV4dCk7XG4gICAgZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgaWYgKHJlc3VsdCB8fCAocmVzdWx0ID0gaXRlcmF0b3IuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGxpc3QpKSkgcmV0dXJuIGJyZWFrZXI7XG4gICAgfSk7XG4gICAgcmV0dXJuICEhcmVzdWx0O1xuICB9O1xuXG4gIC8vIERldGVybWluZSBpZiB0aGUgYXJyYXkgb3Igb2JqZWN0IGNvbnRhaW5zIGEgZ2l2ZW4gdmFsdWUgKHVzaW5nIGA9PT1gKS5cbiAgLy8gQWxpYXNlZCBhcyBgaW5jbHVkZWAuXG4gIF8uY29udGFpbnMgPSBfLmluY2x1ZGUgPSBmdW5jdGlvbihvYmosIHRhcmdldCkge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChuYXRpdmVJbmRleE9mICYmIG9iai5pbmRleE9mID09PSBuYXRpdmVJbmRleE9mKSByZXR1cm4gb2JqLmluZGV4T2YodGFyZ2V0KSAhPSAtMTtcbiAgICByZXR1cm4gYW55KG9iaiwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gdGFyZ2V0O1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIEludm9rZSBhIG1ldGhvZCAod2l0aCBhcmd1bWVudHMpIG9uIGV2ZXJ5IGl0ZW0gaW4gYSBjb2xsZWN0aW9uLlxuICBfLmludm9rZSA9IGZ1bmN0aW9uKG9iaiwgbWV0aG9kKSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgdmFyIGlzRnVuYyA9IF8uaXNGdW5jdGlvbihtZXRob2QpO1xuICAgIHJldHVybiBfLm1hcChvYmosIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gKGlzRnVuYyA/IG1ldGhvZCA6IHZhbHVlW21ldGhvZF0pLmFwcGx5KHZhbHVlLCBhcmdzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBtYXBgOiBmZXRjaGluZyBhIHByb3BlcnR5LlxuICBfLnBsdWNrID0gZnVuY3Rpb24ob2JqLCBrZXkpIHtcbiAgICByZXR1cm4gXy5tYXAob2JqLCBmdW5jdGlvbih2YWx1ZSl7IHJldHVybiB2YWx1ZVtrZXldOyB9KTtcbiAgfTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBmaWx0ZXJgOiBzZWxlY3Rpbmcgb25seSBvYmplY3RzXG4gIC8vIGNvbnRhaW5pbmcgc3BlY2lmaWMgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8ud2hlcmUgPSBmdW5jdGlvbihvYmosIGF0dHJzLCBmaXJzdCkge1xuICAgIGlmIChfLmlzRW1wdHkoYXR0cnMpKSByZXR1cm4gZmlyc3QgPyB2b2lkIDAgOiBbXTtcbiAgICByZXR1cm4gX1tmaXJzdCA/ICdmaW5kJyA6ICdmaWx0ZXInXShvYmosIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYXR0cnMpIHtcbiAgICAgICAgaWYgKGF0dHJzW2tleV0gIT09IHZhbHVlW2tleV0pIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIENvbnZlbmllbmNlIHZlcnNpb24gb2YgYSBjb21tb24gdXNlIGNhc2Ugb2YgYGZpbmRgOiBnZXR0aW5nIHRoZSBmaXJzdCBvYmplY3RcbiAgLy8gY29udGFpbmluZyBzcGVjaWZpYyBga2V5OnZhbHVlYCBwYWlycy5cbiAgXy5maW5kV2hlcmUgPSBmdW5jdGlvbihvYmosIGF0dHJzKSB7XG4gICAgcmV0dXJuIF8ud2hlcmUob2JqLCBhdHRycywgdHJ1ZSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBtYXhpbXVtIGVsZW1lbnQgb3IgKGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxuICAvLyBDYW4ndCBvcHRpbWl6ZSBhcnJheXMgb2YgaW50ZWdlcnMgbG9uZ2VyIHRoYW4gNjUsNTM1IGVsZW1lbnRzLlxuICAvLyBTZWUgW1dlYktpdCBCdWcgODA3OTddKGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD04MDc5NylcbiAgXy5tYXggPSBmdW5jdGlvbihvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgaWYgKCFpdGVyYXRvciAmJiBfLmlzQXJyYXkob2JqKSAmJiBvYmpbMF0gPT09ICtvYmpbMF0gJiYgb2JqLmxlbmd0aCA8IDY1NTM1KSB7XG4gICAgICByZXR1cm4gTWF0aC5tYXguYXBwbHkoTWF0aCwgb2JqKTtcbiAgICB9XG4gICAgaWYgKCFpdGVyYXRvciAmJiBfLmlzRW1wdHkob2JqKSkgcmV0dXJuIC1JbmZpbml0eTtcbiAgICB2YXIgcmVzdWx0ID0ge2NvbXB1dGVkIDogLUluZmluaXR5LCB2YWx1ZTogLUluZmluaXR5fTtcbiAgICBlYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICB2YXIgY29tcHV0ZWQgPSBpdGVyYXRvciA/IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBsaXN0KSA6IHZhbHVlO1xuICAgICAgY29tcHV0ZWQgPiByZXN1bHQuY29tcHV0ZWQgJiYgKHJlc3VsdCA9IHt2YWx1ZSA6IHZhbHVlLCBjb21wdXRlZCA6IGNvbXB1dGVkfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdC52YWx1ZTtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIG1pbmltdW0gZWxlbWVudCAob3IgZWxlbWVudC1iYXNlZCBjb21wdXRhdGlvbikuXG4gIF8ubWluID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGlmICghaXRlcmF0b3IgJiYgXy5pc0FycmF5KG9iaikgJiYgb2JqWzBdID09PSArb2JqWzBdICYmIG9iai5sZW5ndGggPCA2NTUzNSkge1xuICAgICAgcmV0dXJuIE1hdGgubWluLmFwcGx5KE1hdGgsIG9iaik7XG4gICAgfVxuICAgIGlmICghaXRlcmF0b3IgJiYgXy5pc0VtcHR5KG9iaikpIHJldHVybiBJbmZpbml0eTtcbiAgICB2YXIgcmVzdWx0ID0ge2NvbXB1dGVkIDogSW5maW5pdHksIHZhbHVlOiBJbmZpbml0eX07XG4gICAgZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgdmFyIGNvbXB1dGVkID0gaXRlcmF0b3IgPyBpdGVyYXRvci5jYWxsKGNvbnRleHQsIHZhbHVlLCBpbmRleCwgbGlzdCkgOiB2YWx1ZTtcbiAgICAgIGNvbXB1dGVkIDwgcmVzdWx0LmNvbXB1dGVkICYmIChyZXN1bHQgPSB7dmFsdWUgOiB2YWx1ZSwgY29tcHV0ZWQgOiBjb21wdXRlZH0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQudmFsdWU7XG4gIH07XG5cbiAgLy8gU2h1ZmZsZSBhbiBhcnJheSwgdXNpbmcgdGhlIG1vZGVybiB2ZXJzaW9uIG9mIHRoZSBcbiAgLy8gW0Zpc2hlci1ZYXRlcyBzaHVmZmxlXShodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Zpc2hlcuKAk1lhdGVzX3NodWZmbGUpLlxuICBfLnNodWZmbGUgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgcmFuZDtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBzaHVmZmxlZCA9IFtdO1xuICAgIGVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmFuZCA9IF8ucmFuZG9tKGluZGV4KyspO1xuICAgICAgc2h1ZmZsZWRbaW5kZXggLSAxXSA9IHNodWZmbGVkW3JhbmRdO1xuICAgICAgc2h1ZmZsZWRbcmFuZF0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2h1ZmZsZWQ7XG4gIH07XG5cbiAgLy8gU2FtcGxlICoqbioqIHJhbmRvbSB2YWx1ZXMgZnJvbSBhbiBhcnJheS5cbiAgLy8gSWYgKipuKiogaXMgbm90IHNwZWNpZmllZCwgcmV0dXJucyBhIHNpbmdsZSByYW5kb20gZWxlbWVudCBmcm9tIHRoZSBhcnJheS5cbiAgLy8gVGhlIGludGVybmFsIGBndWFyZGAgYXJndW1lbnQgYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgbWFwYC5cbiAgXy5zYW1wbGUgPSBmdW5jdGlvbihvYmosIG4sIGd1YXJkKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyIHx8IGd1YXJkKSB7XG4gICAgICByZXR1cm4gb2JqW18ucmFuZG9tKG9iai5sZW5ndGggLSAxKV07XG4gICAgfVxuICAgIHJldHVybiBfLnNodWZmbGUob2JqKS5zbGljZSgwLCBNYXRoLm1heCgwLCBuKSk7XG4gIH07XG5cbiAgLy8gQW4gaW50ZXJuYWwgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgbG9va3VwIGl0ZXJhdG9ycy5cbiAgdmFyIGxvb2t1cEl0ZXJhdG9yID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKHZhbHVlKSA/IHZhbHVlIDogZnVuY3Rpb24ob2JqKXsgcmV0dXJuIG9ialt2YWx1ZV07IH07XG4gIH07XG5cbiAgLy8gU29ydCB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uIHByb2R1Y2VkIGJ5IGFuIGl0ZXJhdG9yLlxuICBfLnNvcnRCeSA9IGZ1bmN0aW9uKG9iaiwgdmFsdWUsIGNvbnRleHQpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSBsb29rdXBJdGVyYXRvcih2YWx1ZSk7XG4gICAgcmV0dXJuIF8ucGx1Y2soXy5tYXAob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICBjcml0ZXJpYTogaXRlcmF0b3IuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGxpc3QpXG4gICAgICB9O1xuICAgIH0pLnNvcnQoZnVuY3Rpb24obGVmdCwgcmlnaHQpIHtcbiAgICAgIHZhciBhID0gbGVmdC5jcml0ZXJpYTtcbiAgICAgIHZhciBiID0gcmlnaHQuY3JpdGVyaWE7XG4gICAgICBpZiAoYSAhPT0gYikge1xuICAgICAgICBpZiAoYSA+IGIgfHwgYSA9PT0gdm9pZCAwKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEgPCBiIHx8IGIgPT09IHZvaWQgMCkgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxlZnQuaW5kZXggLSByaWdodC5pbmRleDtcbiAgICB9KSwgJ3ZhbHVlJyk7XG4gIH07XG5cbiAgLy8gQW4gaW50ZXJuYWwgZnVuY3Rpb24gdXNlZCBmb3IgYWdncmVnYXRlIFwiZ3JvdXAgYnlcIiBvcGVyYXRpb25zLlxuICB2YXIgZ3JvdXAgPSBmdW5jdGlvbihiZWhhdmlvcikge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmosIHZhbHVlLCBjb250ZXh0KSB7XG4gICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICB2YXIgaXRlcmF0b3IgPSB2YWx1ZSA9PSBudWxsID8gXy5pZGVudGl0eSA6IGxvb2t1cEl0ZXJhdG9yKHZhbHVlKTtcbiAgICAgIGVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGtleSA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBvYmopO1xuICAgICAgICBiZWhhdmlvcihyZXN1bHQsIGtleSwgdmFsdWUpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH07XG5cbiAgLy8gR3JvdXBzIHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24uIFBhc3MgZWl0aGVyIGEgc3RyaW5nIGF0dHJpYnV0ZVxuICAvLyB0byBncm91cCBieSwgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGNyaXRlcmlvbi5cbiAgXy5ncm91cEJ5ID0gZ3JvdXAoZnVuY3Rpb24ocmVzdWx0LCBrZXksIHZhbHVlKSB7XG4gICAgKF8uaGFzKHJlc3VsdCwga2V5KSA/IHJlc3VsdFtrZXldIDogKHJlc3VsdFtrZXldID0gW10pKS5wdXNoKHZhbHVlKTtcbiAgfSk7XG5cbiAgLy8gSW5kZXhlcyB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uLCBzaW1pbGFyIHRvIGBncm91cEJ5YCwgYnV0IGZvclxuICAvLyB3aGVuIHlvdSBrbm93IHRoYXQgeW91ciBpbmRleCB2YWx1ZXMgd2lsbCBiZSB1bmlxdWUuXG4gIF8uaW5kZXhCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwga2V5LCB2YWx1ZSkge1xuICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gIH0pO1xuXG4gIC8vIENvdW50cyBpbnN0YW5jZXMgb2YgYW4gb2JqZWN0IHRoYXQgZ3JvdXAgYnkgYSBjZXJ0YWluIGNyaXRlcmlvbi4gUGFzc1xuICAvLyBlaXRoZXIgYSBzdHJpbmcgYXR0cmlidXRlIHRvIGNvdW50IGJ5LCBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGVcbiAgLy8gY3JpdGVyaW9uLlxuICBfLmNvdW50QnkgPSBncm91cChmdW5jdGlvbihyZXN1bHQsIGtleSkge1xuICAgIF8uaGFzKHJlc3VsdCwga2V5KSA/IHJlc3VsdFtrZXldKysgOiByZXN1bHRba2V5XSA9IDE7XG4gIH0pO1xuXG4gIC8vIFVzZSBhIGNvbXBhcmF0b3IgZnVuY3Rpb24gdG8gZmlndXJlIG91dCB0aGUgc21hbGxlc3QgaW5kZXggYXQgd2hpY2hcbiAgLy8gYW4gb2JqZWN0IHNob3VsZCBiZSBpbnNlcnRlZCBzbyBhcyB0byBtYWludGFpbiBvcmRlci4gVXNlcyBiaW5hcnkgc2VhcmNoLlxuICBfLnNvcnRlZEluZGV4ID0gZnVuY3Rpb24oYXJyYXksIG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICBpdGVyYXRvciA9IGl0ZXJhdG9yID09IG51bGwgPyBfLmlkZW50aXR5IDogbG9va3VwSXRlcmF0b3IoaXRlcmF0b3IpO1xuICAgIHZhciB2YWx1ZSA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqKTtcbiAgICB2YXIgbG93ID0gMCwgaGlnaCA9IGFycmF5Lmxlbmd0aDtcbiAgICB3aGlsZSAobG93IDwgaGlnaCkge1xuICAgICAgdmFyIG1pZCA9IChsb3cgKyBoaWdoKSA+Pj4gMTtcbiAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgYXJyYXlbbWlkXSkgPCB2YWx1ZSA/IGxvdyA9IG1pZCArIDEgOiBoaWdoID0gbWlkO1xuICAgIH1cbiAgICByZXR1cm4gbG93O1xuICB9O1xuXG4gIC8vIFNhZmVseSBjcmVhdGUgYSByZWFsLCBsaXZlIGFycmF5IGZyb20gYW55dGhpbmcgaXRlcmFibGUuXG4gIF8udG9BcnJheSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghb2JqKSByZXR1cm4gW107XG4gICAgaWYgKF8uaXNBcnJheShvYmopKSByZXR1cm4gc2xpY2UuY2FsbChvYmopO1xuICAgIGlmIChvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCkgcmV0dXJuIF8ubWFwKG9iaiwgXy5pZGVudGl0eSk7XG4gICAgcmV0dXJuIF8udmFsdWVzKG9iaik7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gYW4gb2JqZWN0LlxuICBfLnNpemUgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiAwO1xuICAgIHJldHVybiAob2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGgpID8gb2JqLmxlbmd0aCA6IF8ua2V5cyhvYmopLmxlbmd0aDtcbiAgfTtcblxuICAvLyBBcnJheSBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gR2V0IHRoZSBmaXJzdCBlbGVtZW50IG9mIGFuIGFycmF5LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIHRoZSBmaXJzdCBOXG4gIC8vIHZhbHVlcyBpbiB0aGUgYXJyYXkuIEFsaWFzZWQgYXMgYGhlYWRgIGFuZCBgdGFrZWAuIFRoZSAqKmd1YXJkKiogY2hlY2tcbiAgLy8gYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgXy5tYXBgLlxuICBfLmZpcnN0ID0gXy5oZWFkID0gXy50YWtlID0gZnVuY3Rpb24oYXJyYXksIG4sIGd1YXJkKSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwpIHJldHVybiB2b2lkIDA7XG4gICAgcmV0dXJuIChuID09IG51bGwpIHx8IGd1YXJkID8gYXJyYXlbMF0gOiBzbGljZS5jYWxsKGFycmF5LCAwLCBuKTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGV2ZXJ5dGhpbmcgYnV0IHRoZSBsYXN0IGVudHJ5IG9mIHRoZSBhcnJheS4gRXNwZWNpYWxseSB1c2VmdWwgb25cbiAgLy8gdGhlIGFyZ3VtZW50cyBvYmplY3QuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gYWxsIHRoZSB2YWx1ZXMgaW5cbiAgLy8gdGhlIGFycmF5LCBleGNsdWRpbmcgdGhlIGxhc3QgTi4gVGhlICoqZ3VhcmQqKiBjaGVjayBhbGxvd3MgaXQgdG8gd29yayB3aXRoXG4gIC8vIGBfLm1hcGAuXG4gIF8uaW5pdGlhbCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCAwLCBhcnJheS5sZW5ndGggLSAoKG4gPT0gbnVsbCkgfHwgZ3VhcmQgPyAxIDogbikpO1xuICB9O1xuXG4gIC8vIEdldCB0aGUgbGFzdCBlbGVtZW50IG9mIGFuIGFycmF5LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIHRoZSBsYXN0IE5cbiAgLy8gdmFsdWVzIGluIHRoZSBhcnJheS4gVGhlICoqZ3VhcmQqKiBjaGVjayBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBfLm1hcGAuXG4gIF8ubGFzdCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gdm9pZCAwO1xuICAgIGlmICgobiA9PSBudWxsKSB8fCBndWFyZCkge1xuICAgICAgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgTWF0aC5tYXgoYXJyYXkubGVuZ3RoIC0gbiwgMCkpO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZXR1cm5zIGV2ZXJ5dGhpbmcgYnV0IHRoZSBmaXJzdCBlbnRyeSBvZiB0aGUgYXJyYXkuIEFsaWFzZWQgYXMgYHRhaWxgIGFuZCBgZHJvcGAuXG4gIC8vIEVzcGVjaWFsbHkgdXNlZnVsIG9uIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBQYXNzaW5nIGFuICoqbioqIHdpbGwgcmV0dXJuXG4gIC8vIHRoZSByZXN0IE4gdmFsdWVzIGluIHRoZSBhcnJheS4gVGhlICoqZ3VhcmQqKlxuICAvLyBjaGVjayBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBfLm1hcGAuXG4gIF8ucmVzdCA9IF8udGFpbCA9IF8uZHJvcCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCAobiA9PSBudWxsKSB8fCBndWFyZCA/IDEgOiBuKTtcbiAgfTtcblxuICAvLyBUcmltIG91dCBhbGwgZmFsc3kgdmFsdWVzIGZyb20gYW4gYXJyYXkuXG4gIF8uY29tcGFjdCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKGFycmF5LCBfLmlkZW50aXR5KTtcbiAgfTtcblxuICAvLyBJbnRlcm5hbCBpbXBsZW1lbnRhdGlvbiBvZiBhIHJlY3Vyc2l2ZSBgZmxhdHRlbmAgZnVuY3Rpb24uXG4gIHZhciBmbGF0dGVuID0gZnVuY3Rpb24oaW5wdXQsIHNoYWxsb3csIG91dHB1dCkge1xuICAgIGlmIChzaGFsbG93ICYmIF8uZXZlcnkoaW5wdXQsIF8uaXNBcnJheSkpIHtcbiAgICAgIHJldHVybiBjb25jYXQuYXBwbHkob3V0cHV0LCBpbnB1dCk7XG4gICAgfVxuICAgIGVhY2goaW5wdXQsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBpZiAoXy5pc0FycmF5KHZhbHVlKSB8fCBfLmlzQXJndW1lbnRzKHZhbHVlKSkge1xuICAgICAgICBzaGFsbG93ID8gcHVzaC5hcHBseShvdXRwdXQsIHZhbHVlKSA6IGZsYXR0ZW4odmFsdWUsIHNoYWxsb3csIG91dHB1dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXRwdXQucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfTtcblxuICAvLyBGbGF0dGVuIG91dCBhbiBhcnJheSwgZWl0aGVyIHJlY3Vyc2l2ZWx5IChieSBkZWZhdWx0KSwgb3IganVzdCBvbmUgbGV2ZWwuXG4gIF8uZmxhdHRlbiA9IGZ1bmN0aW9uKGFycmF5LCBzaGFsbG93KSB7XG4gICAgcmV0dXJuIGZsYXR0ZW4oYXJyYXksIHNoYWxsb3csIFtdKTtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSB2ZXJzaW9uIG9mIHRoZSBhcnJheSB0aGF0IGRvZXMgbm90IGNvbnRhaW4gdGhlIHNwZWNpZmllZCB2YWx1ZShzKS5cbiAgXy53aXRob3V0ID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICByZXR1cm4gXy5kaWZmZXJlbmNlKGFycmF5LCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICB9O1xuXG4gIC8vIFByb2R1Y2UgYSBkdXBsaWNhdGUtZnJlZSB2ZXJzaW9uIG9mIHRoZSBhcnJheS4gSWYgdGhlIGFycmF5IGhhcyBhbHJlYWR5XG4gIC8vIGJlZW4gc29ydGVkLCB5b3UgaGF2ZSB0aGUgb3B0aW9uIG9mIHVzaW5nIGEgZmFzdGVyIGFsZ29yaXRobS5cbiAgLy8gQWxpYXNlZCBhcyBgdW5pcXVlYC5cbiAgXy51bmlxID0gXy51bmlxdWUgPSBmdW5jdGlvbihhcnJheSwgaXNTb3J0ZWQsIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgaWYgKF8uaXNGdW5jdGlvbihpc1NvcnRlZCkpIHtcbiAgICAgIGNvbnRleHQgPSBpdGVyYXRvcjtcbiAgICAgIGl0ZXJhdG9yID0gaXNTb3J0ZWQ7XG4gICAgICBpc1NvcnRlZCA9IGZhbHNlO1xuICAgIH1cbiAgICB2YXIgaW5pdGlhbCA9IGl0ZXJhdG9yID8gXy5tYXAoYXJyYXksIGl0ZXJhdG9yLCBjb250ZXh0KSA6IGFycmF5O1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgdmFyIHNlZW4gPSBbXTtcbiAgICBlYWNoKGluaXRpYWwsIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xuICAgICAgaWYgKGlzU29ydGVkID8gKCFpbmRleCB8fCBzZWVuW3NlZW4ubGVuZ3RoIC0gMV0gIT09IHZhbHVlKSA6ICFfLmNvbnRhaW5zKHNlZW4sIHZhbHVlKSkge1xuICAgICAgICBzZWVuLnB1c2godmFsdWUpO1xuICAgICAgICByZXN1bHRzLnB1c2goYXJyYXlbaW5kZXhdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICAvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHVuaW9uOiBlYWNoIGRpc3RpbmN0IGVsZW1lbnQgZnJvbSBhbGwgb2ZcbiAgLy8gdGhlIHBhc3NlZC1pbiBhcnJheXMuXG4gIF8udW5pb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXy51bmlxKF8uZmxhdHRlbihhcmd1bWVudHMsIHRydWUpKTtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgZXZlcnkgaXRlbSBzaGFyZWQgYmV0d2VlbiBhbGwgdGhlXG4gIC8vIHBhc3NlZC1pbiBhcnJheXMuXG4gIF8uaW50ZXJzZWN0aW9uID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICB2YXIgcmVzdCA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICByZXR1cm4gXy5maWx0ZXIoXy51bmlxKGFycmF5KSwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgcmV0dXJuIF8uZXZlcnkocmVzdCwgZnVuY3Rpb24ob3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIF8uaW5kZXhPZihvdGhlciwgaXRlbSkgPj0gMDtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIFRha2UgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBvbmUgYXJyYXkgYW5kIGEgbnVtYmVyIG9mIG90aGVyIGFycmF5cy5cbiAgLy8gT25seSB0aGUgZWxlbWVudHMgcHJlc2VudCBpbiBqdXN0IHRoZSBmaXJzdCBhcnJheSB3aWxsIHJlbWFpbi5cbiAgXy5kaWZmZXJlbmNlID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICB2YXIgcmVzdCA9IGNvbmNhdC5hcHBseShBcnJheVByb3RvLCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgIHJldHVybiBfLmZpbHRlcihhcnJheSwgZnVuY3Rpb24odmFsdWUpeyByZXR1cm4gIV8uY29udGFpbnMocmVzdCwgdmFsdWUpOyB9KTtcbiAgfTtcblxuICAvLyBaaXAgdG9nZXRoZXIgbXVsdGlwbGUgbGlzdHMgaW50byBhIHNpbmdsZSBhcnJheSAtLSBlbGVtZW50cyB0aGF0IHNoYXJlXG4gIC8vIGFuIGluZGV4IGdvIHRvZ2V0aGVyLlxuICBfLnppcCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBsZW5ndGggPSBfLm1heChfLnBsdWNrKGFyZ3VtZW50cywgXCJsZW5ndGhcIikuY29uY2F0KDApKTtcbiAgICB2YXIgcmVzdWx0cyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdHNbaV0gPSBfLnBsdWNrKGFyZ3VtZW50cywgJycgKyBpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gQ29udmVydHMgbGlzdHMgaW50byBvYmplY3RzLiBQYXNzIGVpdGhlciBhIHNpbmdsZSBhcnJheSBvZiBgW2tleSwgdmFsdWVdYFxuICAvLyBwYWlycywgb3IgdHdvIHBhcmFsbGVsIGFycmF5cyBvZiB0aGUgc2FtZSBsZW5ndGggLS0gb25lIG9mIGtleXMsIGFuZCBvbmUgb2ZcbiAgLy8gdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICBfLm9iamVjdCA9IGZ1bmN0aW9uKGxpc3QsIHZhbHVlcykge1xuICAgIGlmIChsaXN0ID09IG51bGwpIHJldHVybiB7fTtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGxpc3QubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgcmVzdWx0W2xpc3RbaV1dID0gdmFsdWVzW2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0W2xpc3RbaV1bMF1dID0gbGlzdFtpXVsxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBJZiB0aGUgYnJvd3NlciBkb2Vzbid0IHN1cHBseSB1cyB3aXRoIGluZGV4T2YgKEknbSBsb29raW5nIGF0IHlvdSwgKipNU0lFKiopLFxuICAvLyB3ZSBuZWVkIHRoaXMgZnVuY3Rpb24uIFJldHVybiB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgYW5cbiAgLy8gaXRlbSBpbiBhbiBhcnJheSwgb3IgLTEgaWYgdGhlIGl0ZW0gaXMgbm90IGluY2x1ZGVkIGluIHRoZSBhcnJheS5cbiAgLy8gRGVsZWdhdGVzIHRvICoqRUNNQVNjcmlwdCA1KioncyBuYXRpdmUgYGluZGV4T2ZgIGlmIGF2YWlsYWJsZS5cbiAgLy8gSWYgdGhlIGFycmF5IGlzIGxhcmdlIGFuZCBhbHJlYWR5IGluIHNvcnQgb3JkZXIsIHBhc3MgYHRydWVgXG4gIC8vIGZvciAqKmlzU29ydGVkKiogdG8gdXNlIGJpbmFyeSBzZWFyY2guXG4gIF8uaW5kZXhPZiA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBpc1NvcnRlZCkge1xuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gLTE7XG4gICAgdmFyIGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgaWYgKGlzU29ydGVkKSB7XG4gICAgICBpZiAodHlwZW9mIGlzU29ydGVkID09ICdudW1iZXInKSB7XG4gICAgICAgIGkgPSAoaXNTb3J0ZWQgPCAwID8gTWF0aC5tYXgoMCwgbGVuZ3RoICsgaXNTb3J0ZWQpIDogaXNTb3J0ZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaSA9IF8uc29ydGVkSW5kZXgoYXJyYXksIGl0ZW0pO1xuICAgICAgICByZXR1cm4gYXJyYXlbaV0gPT09IGl0ZW0gPyBpIDogLTE7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChuYXRpdmVJbmRleE9mICYmIGFycmF5LmluZGV4T2YgPT09IG5hdGl2ZUluZGV4T2YpIHJldHVybiBhcnJheS5pbmRleE9mKGl0ZW0sIGlzU29ydGVkKTtcbiAgICBmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSBpZiAoYXJyYXlbaV0gPT09IGl0ZW0pIHJldHVybiBpO1xuICAgIHJldHVybiAtMTtcbiAgfTtcblxuICAvLyBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgbGFzdEluZGV4T2ZgIGlmIGF2YWlsYWJsZS5cbiAgXy5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBmcm9tKSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwpIHJldHVybiAtMTtcbiAgICB2YXIgaGFzSW5kZXggPSBmcm9tICE9IG51bGw7XG4gICAgaWYgKG5hdGl2ZUxhc3RJbmRleE9mICYmIGFycmF5Lmxhc3RJbmRleE9mID09PSBuYXRpdmVMYXN0SW5kZXhPZikge1xuICAgICAgcmV0dXJuIGhhc0luZGV4ID8gYXJyYXkubGFzdEluZGV4T2YoaXRlbSwgZnJvbSkgOiBhcnJheS5sYXN0SW5kZXhPZihpdGVtKTtcbiAgICB9XG4gICAgdmFyIGkgPSAoaGFzSW5kZXggPyBmcm9tIDogYXJyYXkubGVuZ3RoKTtcbiAgICB3aGlsZSAoaS0tKSBpZiAoYXJyYXlbaV0gPT09IGl0ZW0pIHJldHVybiBpO1xuICAgIHJldHVybiAtMTtcbiAgfTtcblxuICAvLyBHZW5lcmF0ZSBhbiBpbnRlZ2VyIEFycmF5IGNvbnRhaW5pbmcgYW4gYXJpdGhtZXRpYyBwcm9ncmVzc2lvbi4gQSBwb3J0IG9mXG4gIC8vIHRoZSBuYXRpdmUgUHl0aG9uIGByYW5nZSgpYCBmdW5jdGlvbi4gU2VlXG4gIC8vIFt0aGUgUHl0aG9uIGRvY3VtZW50YXRpb25dKGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS9mdW5jdGlvbnMuaHRtbCNyYW5nZSkuXG4gIF8ucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDw9IDEpIHtcbiAgICAgIHN0b3AgPSBzdGFydCB8fCAwO1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgICBzdGVwID0gYXJndW1lbnRzWzJdIHx8IDE7XG5cbiAgICB2YXIgbGVuZ3RoID0gTWF0aC5tYXgoTWF0aC5jZWlsKChzdG9wIC0gc3RhcnQpIC8gc3RlcCksIDApO1xuICAgIHZhciBpZHggPSAwO1xuICAgIHZhciByYW5nZSA9IG5ldyBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUoaWR4IDwgbGVuZ3RoKSB7XG4gICAgICByYW5nZVtpZHgrK10gPSBzdGFydDtcbiAgICAgIHN0YXJ0ICs9IHN0ZXA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJhbmdlO1xuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIChhaGVtKSBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gUmV1c2FibGUgY29uc3RydWN0b3IgZnVuY3Rpb24gZm9yIHByb3RvdHlwZSBzZXR0aW5nLlxuICB2YXIgY3RvciA9IGZ1bmN0aW9uKCl7fTtcblxuICAvLyBDcmVhdGUgYSBmdW5jdGlvbiBib3VuZCB0byBhIGdpdmVuIG9iamVjdCAoYXNzaWduaW5nIGB0aGlzYCwgYW5kIGFyZ3VtZW50cyxcbiAgLy8gb3B0aW9uYWxseSkuIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBGdW5jdGlvbi5iaW5kYCBpZlxuICAvLyBhdmFpbGFibGUuXG4gIF8uYmluZCA9IGZ1bmN0aW9uKGZ1bmMsIGNvbnRleHQpIHtcbiAgICB2YXIgYXJncywgYm91bmQ7XG4gICAgaWYgKG5hdGl2ZUJpbmQgJiYgZnVuYy5iaW5kID09PSBuYXRpdmVCaW5kKSByZXR1cm4gbmF0aXZlQmluZC5hcHBseShmdW5jLCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgIGlmICghXy5pc0Z1bmN0aW9uKGZ1bmMpKSB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICAgIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgcmV0dXJuIGJvdW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgYm91bmQpKSByZXR1cm4gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgIGN0b3IucHJvdG90eXBlID0gZnVuYy5wcm90b3R5cGU7XG4gICAgICB2YXIgc2VsZiA9IG5ldyBjdG9yO1xuICAgICAgY3Rvci5wcm90b3R5cGUgPSBudWxsO1xuICAgICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkoc2VsZiwgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICBpZiAoT2JqZWN0KHJlc3VsdCkgPT09IHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUGFydGlhbGx5IGFwcGx5IGEgZnVuY3Rpb24gYnkgY3JlYXRpbmcgYSB2ZXJzaW9uIHRoYXQgaGFzIGhhZCBzb21lIG9mIGl0c1xuICAvLyBhcmd1bWVudHMgcHJlLWZpbGxlZCwgd2l0aG91dCBjaGFuZ2luZyBpdHMgZHluYW1pYyBgdGhpc2AgY29udGV4dC5cbiAgXy5wYXJ0aWFsID0gZnVuY3Rpb24oZnVuYykge1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgIH07XG4gIH07XG5cbiAgLy8gQmluZCBhbGwgb2YgYW4gb2JqZWN0J3MgbWV0aG9kcyB0byB0aGF0IG9iamVjdC4gVXNlZnVsIGZvciBlbnN1cmluZyB0aGF0XG4gIC8vIGFsbCBjYWxsYmFja3MgZGVmaW5lZCBvbiBhbiBvYmplY3QgYmVsb25nIHRvIGl0LlxuICBfLmJpbmRBbGwgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgZnVuY3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMCkgdGhyb3cgbmV3IEVycm9yKFwiYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lc1wiKTtcbiAgICBlYWNoKGZ1bmNzLCBmdW5jdGlvbihmKSB7IG9ialtmXSA9IF8uYmluZChvYmpbZl0sIG9iaik7IH0pO1xuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gTWVtb2l6ZSBhbiBleHBlbnNpdmUgZnVuY3Rpb24gYnkgc3RvcmluZyBpdHMgcmVzdWx0cy5cbiAgXy5tZW1vaXplID0gZnVuY3Rpb24oZnVuYywgaGFzaGVyKSB7XG4gICAgdmFyIG1lbW8gPSB7fTtcbiAgICBoYXNoZXIgfHwgKGhhc2hlciA9IF8uaWRlbnRpdHkpO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBrZXkgPSBoYXNoZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiBfLmhhcyhtZW1vLCBrZXkpID8gbWVtb1trZXldIDogKG1lbW9ba2V5XSA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBEZWxheXMgYSBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIG51bWJlciBvZiBtaWxsaXNlY29uZHMsIGFuZCB0aGVuIGNhbGxzXG4gIC8vIGl0IHdpdGggdGhlIGFyZ3VtZW50cyBzdXBwbGllZC5cbiAgXy5kZWxheSA9IGZ1bmN0aW9uKGZ1bmMsIHdhaXQpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpeyByZXR1cm4gZnVuYy5hcHBseShudWxsLCBhcmdzKTsgfSwgd2FpdCk7XG4gIH07XG5cbiAgLy8gRGVmZXJzIGEgZnVuY3Rpb24sIHNjaGVkdWxpbmcgaXQgdG8gcnVuIGFmdGVyIHRoZSBjdXJyZW50IGNhbGwgc3RhY2sgaGFzXG4gIC8vIGNsZWFyZWQuXG4gIF8uZGVmZXIgPSBmdW5jdGlvbihmdW5jKSB7XG4gICAgcmV0dXJuIF8uZGVsYXkuYXBwbHkoXywgW2Z1bmMsIDFdLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpKTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIHdoZW4gaW52b2tlZCwgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBhdCBtb3N0IG9uY2VcbiAgLy8gZHVyaW5nIGEgZ2l2ZW4gd2luZG93IG9mIHRpbWUuIE5vcm1hbGx5LCB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uIHdpbGwgcnVuXG4gIC8vIGFzIG11Y2ggYXMgaXQgY2FuLCB3aXRob3V0IGV2ZXIgZ29pbmcgbW9yZSB0aGFuIG9uY2UgcGVyIGB3YWl0YCBkdXJhdGlvbjtcbiAgLy8gYnV0IGlmIHlvdSdkIGxpa2UgdG8gZGlzYWJsZSB0aGUgZXhlY3V0aW9uIG9uIHRoZSBsZWFkaW5nIGVkZ2UsIHBhc3NcbiAgLy8gYHtsZWFkaW5nOiBmYWxzZX1gLiBUbyBkaXNhYmxlIGV4ZWN1dGlvbiBvbiB0aGUgdHJhaWxpbmcgZWRnZSwgZGl0dG8uXG4gIF8udGhyb3R0bGUgPSBmdW5jdGlvbihmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gICAgdmFyIGNvbnRleHQsIGFyZ3MsIHJlc3VsdDtcbiAgICB2YXIgdGltZW91dCA9IG51bGw7XG4gICAgdmFyIHByZXZpb3VzID0gMDtcbiAgICBvcHRpb25zIHx8IChvcHRpb25zID0ge30pO1xuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcHJldmlvdXMgPSBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlID8gMCA6IG5ldyBEYXRlO1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlO1xuICAgICAgaWYgKCFwcmV2aW91cyAmJiBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlKSBwcmV2aW91cyA9IG5vdztcbiAgICAgIHZhciByZW1haW5pbmcgPSB3YWl0IC0gKG5vdyAtIHByZXZpb3VzKTtcbiAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGlmIChyZW1haW5pbmcgPD0gMCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICBwcmV2aW91cyA9IG5vdztcbiAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQgJiYgb3B0aW9ucy50cmFpbGluZyAhPT0gZmFsc2UpIHtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuICAvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG4gIC8vIE4gbWlsbGlzZWNvbmRzLiBJZiBgaW1tZWRpYXRlYCBpcyBwYXNzZWQsIHRyaWdnZXIgdGhlIGZ1bmN0aW9uIG9uIHRoZVxuICAvLyBsZWFkaW5nIGVkZ2UsIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nLlxuICBfLmRlYm91bmNlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgdmFyIHRpbWVvdXQsIGFyZ3MsIGNvbnRleHQsIHRpbWVzdGFtcCwgcmVzdWx0O1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHRpbWVzdGFtcCA9IG5ldyBEYXRlKCk7XG4gICAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxhc3QgPSAobmV3IERhdGUoKSkgLSB0aW1lc3RhbXA7XG4gICAgICAgIGlmIChsYXN0IDwgd2FpdCkge1xuICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0IC0gbGFzdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICAgIGlmICghdGltZW91dCkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgICB9XG4gICAgICBpZiAoY2FsbE5vdykgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIGF0IG1vc3Qgb25lIHRpbWUsIG5vIG1hdHRlciBob3dcbiAgLy8gb2Z0ZW4geW91IGNhbGwgaXQuIFVzZWZ1bCBmb3IgbGF6eSBpbml0aWFsaXphdGlvbi5cbiAgXy5vbmNlID0gZnVuY3Rpb24oZnVuYykge1xuICAgIHZhciByYW4gPSBmYWxzZSwgbWVtbztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAocmFuKSByZXR1cm4gbWVtbztcbiAgICAgIHJhbiA9IHRydWU7XG4gICAgICBtZW1vID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgZnVuYyA9IG51bGw7XG4gICAgICByZXR1cm4gbWVtbztcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgdGhlIGZpcnN0IGZ1bmN0aW9uIHBhc3NlZCBhcyBhbiBhcmd1bWVudCB0byB0aGUgc2Vjb25kLFxuICAvLyBhbGxvd2luZyB5b3UgdG8gYWRqdXN0IGFyZ3VtZW50cywgcnVuIGNvZGUgYmVmb3JlIGFuZCBhZnRlciwgYW5kXG4gIC8vIGNvbmRpdGlvbmFsbHkgZXhlY3V0ZSB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXG4gIF8ud3JhcCA9IGZ1bmN0aW9uKGZ1bmMsIHdyYXBwZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncyA9IFtmdW5jXTtcbiAgICAgIHB1c2guYXBwbHkoYXJncywgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB3cmFwcGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgaXMgdGhlIGNvbXBvc2l0aW9uIG9mIGEgbGlzdCBvZiBmdW5jdGlvbnMsIGVhY2hcbiAgLy8gY29uc3VtaW5nIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZ1bmN0aW9uIHRoYXQgZm9sbG93cy5cbiAgXy5jb21wb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZ1bmNzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgZm9yICh2YXIgaSA9IGZ1bmNzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGFyZ3MgPSBbZnVuY3NbaV0uYXBwbHkodGhpcywgYXJncyldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFyZ3NbMF07XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgYWZ0ZXIgYmVpbmcgY2FsbGVkIE4gdGltZXMuXG4gIF8uYWZ0ZXIgPSBmdW5jdGlvbih0aW1lcywgZnVuYykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICgtLXRpbWVzIDwgMSkge1xuICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgLy8gT2JqZWN0IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gUmV0cmlldmUgdGhlIG5hbWVzIG9mIGFuIG9iamVjdCdzIHByb3BlcnRpZXMuXG4gIC8vIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBPYmplY3Qua2V5c2BcbiAgXy5rZXlzID0gbmF0aXZlS2V5cyB8fCBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqICE9PSBPYmplY3Qob2JqKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBvYmplY3QnKTtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIGlmIChfLmhhcyhvYmosIGtleSkpIGtleXMucHVzaChrZXkpO1xuICAgIHJldHVybiBrZXlzO1xuICB9O1xuXG4gIC8vIFJldHJpZXZlIHRoZSB2YWx1ZXMgb2YgYW4gb2JqZWN0J3MgcHJvcGVydGllcy5cbiAgXy52YWx1ZXMgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgdmFsdWVzID0gbmV3IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWVzW2ldID0gb2JqW2tleXNbaV1dO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuXG4gIC8vIENvbnZlcnQgYW4gb2JqZWN0IGludG8gYSBsaXN0IG9mIGBba2V5LCB2YWx1ZV1gIHBhaXJzLlxuICBfLnBhaXJzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIHBhaXJzID0gbmV3IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcGFpcnNbaV0gPSBba2V5c1tpXSwgb2JqW2tleXNbaV1dXTtcbiAgICB9XG4gICAgcmV0dXJuIHBhaXJzO1xuICB9O1xuXG4gIC8vIEludmVydCB0aGUga2V5cyBhbmQgdmFsdWVzIG9mIGFuIG9iamVjdC4gVGhlIHZhbHVlcyBtdXN0IGJlIHNlcmlhbGl6YWJsZS5cbiAgXy5pbnZlcnQgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcmVzdWx0W29ialtrZXlzW2ldXV0gPSBrZXlzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiBhIHNvcnRlZCBsaXN0IG9mIHRoZSBmdW5jdGlvbiBuYW1lcyBhdmFpbGFibGUgb24gdGhlIG9iamVjdC5cbiAgLy8gQWxpYXNlZCBhcyBgbWV0aG9kc2BcbiAgXy5mdW5jdGlvbnMgPSBfLm1ldGhvZHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgbmFtZXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoXy5pc0Z1bmN0aW9uKG9ialtrZXldKSkgbmFtZXMucHVzaChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZXMuc29ydCgpO1xuICB9O1xuXG4gIC8vIEV4dGVuZCBhIGdpdmVuIG9iamVjdCB3aXRoIGFsbCB0aGUgcHJvcGVydGllcyBpbiBwYXNzZWQtaW4gb2JqZWN0KHMpLlxuICBfLmV4dGVuZCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGVhY2goc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgICAgICBvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIFJldHVybiBhIGNvcHkgb2YgdGhlIG9iamVjdCBvbmx5IGNvbnRhaW5pbmcgdGhlIHdoaXRlbGlzdGVkIHByb3BlcnRpZXMuXG4gIF8ucGljayA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBjb3B5ID0ge307XG4gICAgdmFyIGtleXMgPSBjb25jYXQuYXBwbHkoQXJyYXlQcm90bywgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICBlYWNoKGtleXMsIGZ1bmN0aW9uKGtleSkge1xuICAgICAgaWYgKGtleSBpbiBvYmopIGNvcHlba2V5XSA9IG9ialtrZXldO1xuICAgIH0pO1xuICAgIHJldHVybiBjb3B5O1xuICB9O1xuXG4gICAvLyBSZXR1cm4gYSBjb3B5IG9mIHRoZSBvYmplY3Qgd2l0aG91dCB0aGUgYmxhY2tsaXN0ZWQgcHJvcGVydGllcy5cbiAgXy5vbWl0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGNvcHkgPSB7fTtcbiAgICB2YXIga2V5cyA9IGNvbmNhdC5hcHBseShBcnJheVByb3RvLCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmICghXy5jb250YWlucyhrZXlzLCBrZXkpKSBjb3B5W2tleV0gPSBvYmpba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIGNvcHk7XG4gIH07XG5cbiAgLy8gRmlsbCBpbiBhIGdpdmVuIG9iamVjdCB3aXRoIGRlZmF1bHQgcHJvcGVydGllcy5cbiAgXy5kZWZhdWx0cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGVhY2goc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgICAgICBpZiAob2JqW3Byb3BdID09PSB2b2lkIDApIG9ialtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gQ3JlYXRlIGEgKHNoYWxsb3ctY2xvbmVkKSBkdXBsaWNhdGUgb2YgYW4gb2JqZWN0LlxuICBfLmNsb25lID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gICAgcmV0dXJuIF8uaXNBcnJheShvYmopID8gb2JqLnNsaWNlKCkgOiBfLmV4dGVuZCh7fSwgb2JqKTtcbiAgfTtcblxuICAvLyBJbnZva2VzIGludGVyY2VwdG9yIHdpdGggdGhlIG9iaiwgYW5kIHRoZW4gcmV0dXJucyBvYmouXG4gIC8vIFRoZSBwcmltYXJ5IHB1cnBvc2Ugb2YgdGhpcyBtZXRob2QgaXMgdG8gXCJ0YXAgaW50b1wiIGEgbWV0aG9kIGNoYWluLCBpblxuICAvLyBvcmRlciB0byBwZXJmb3JtIG9wZXJhdGlvbnMgb24gaW50ZXJtZWRpYXRlIHJlc3VsdHMgd2l0aGluIHRoZSBjaGFpbi5cbiAgXy50YXAgPSBmdW5jdGlvbihvYmosIGludGVyY2VwdG9yKSB7XG4gICAgaW50ZXJjZXB0b3Iob2JqKTtcbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIEludGVybmFsIHJlY3Vyc2l2ZSBjb21wYXJpc29uIGZ1bmN0aW9uIGZvciBgaXNFcXVhbGAuXG4gIHZhciBlcSA9IGZ1bmN0aW9uKGEsIGIsIGFTdGFjaywgYlN0YWNrKSB7XG4gICAgLy8gSWRlbnRpY2FsIG9iamVjdHMgYXJlIGVxdWFsLiBgMCA9PT0gLTBgLCBidXQgdGhleSBhcmVuJ3QgaWRlbnRpY2FsLlxuICAgIC8vIFNlZSB0aGUgW0hhcm1vbnkgYGVnYWxgIHByb3Bvc2FsXShodHRwOi8vd2lraS5lY21hc2NyaXB0Lm9yZy9kb2t1LnBocD9pZD1oYXJtb255OmVnYWwpLlxuICAgIGlmIChhID09PSBiKSByZXR1cm4gYSAhPT0gMCB8fCAxIC8gYSA9PSAxIC8gYjtcbiAgICAvLyBBIHN0cmljdCBjb21wYXJpc29uIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIGBudWxsID09IHVuZGVmaW5lZGAuXG4gICAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHJldHVybiBhID09PSBiO1xuICAgIC8vIFVud3JhcCBhbnkgd3JhcHBlZCBvYmplY3RzLlxuICAgIGlmIChhIGluc3RhbmNlb2YgXykgYSA9IGEuX3dyYXBwZWQ7XG4gICAgaWYgKGIgaW5zdGFuY2VvZiBfKSBiID0gYi5fd3JhcHBlZDtcbiAgICAvLyBDb21wYXJlIGBbW0NsYXNzXV1gIG5hbWVzLlxuICAgIHZhciBjbGFzc05hbWUgPSB0b1N0cmluZy5jYWxsKGEpO1xuICAgIGlmIChjbGFzc05hbWUgIT0gdG9TdHJpbmcuY2FsbChiKSkgcmV0dXJuIGZhbHNlO1xuICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XG4gICAgICAvLyBTdHJpbmdzLCBudW1iZXJzLCBkYXRlcywgYW5kIGJvb2xlYW5zIGFyZSBjb21wYXJlZCBieSB2YWx1ZS5cbiAgICAgIGNhc2UgJ1tvYmplY3QgU3RyaW5nXSc6XG4gICAgICAgIC8vIFByaW1pdGl2ZXMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgb2JqZWN0IHdyYXBwZXJzIGFyZSBlcXVpdmFsZW50OyB0aHVzLCBgXCI1XCJgIGlzXG4gICAgICAgIC8vIGVxdWl2YWxlbnQgdG8gYG5ldyBTdHJpbmcoXCI1XCIpYC5cbiAgICAgICAgcmV0dXJuIGEgPT0gU3RyaW5nKGIpO1xuICAgICAgY2FzZSAnW29iamVjdCBOdW1iZXJdJzpcbiAgICAgICAgLy8gYE5hTmBzIGFyZSBlcXVpdmFsZW50LCBidXQgbm9uLXJlZmxleGl2ZS4gQW4gYGVnYWxgIGNvbXBhcmlzb24gaXMgcGVyZm9ybWVkIGZvclxuICAgICAgICAvLyBvdGhlciBudW1lcmljIHZhbHVlcy5cbiAgICAgICAgcmV0dXJuIGEgIT0gK2EgPyBiICE9ICtiIDogKGEgPT0gMCA/IDEgLyBhID09IDEgLyBiIDogYSA9PSArYik7XG4gICAgICBjYXNlICdbb2JqZWN0IERhdGVdJzpcbiAgICAgIGNhc2UgJ1tvYmplY3QgQm9vbGVhbl0nOlxuICAgICAgICAvLyBDb2VyY2UgZGF0ZXMgYW5kIGJvb2xlYW5zIHRvIG51bWVyaWMgcHJpbWl0aXZlIHZhbHVlcy4gRGF0ZXMgYXJlIGNvbXBhcmVkIGJ5IHRoZWlyXG4gICAgICAgIC8vIG1pbGxpc2Vjb25kIHJlcHJlc2VudGF0aW9ucy4gTm90ZSB0aGF0IGludmFsaWQgZGF0ZXMgd2l0aCBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnNcbiAgICAgICAgLy8gb2YgYE5hTmAgYXJlIG5vdCBlcXVpdmFsZW50LlxuICAgICAgICByZXR1cm4gK2EgPT0gK2I7XG4gICAgICAvLyBSZWdFeHBzIGFyZSBjb21wYXJlZCBieSB0aGVpciBzb3VyY2UgcGF0dGVybnMgYW5kIGZsYWdzLlxuICAgICAgY2FzZSAnW29iamVjdCBSZWdFeHBdJzpcbiAgICAgICAgcmV0dXJuIGEuc291cmNlID09IGIuc291cmNlICYmXG4gICAgICAgICAgICAgICBhLmdsb2JhbCA9PSBiLmdsb2JhbCAmJlxuICAgICAgICAgICAgICAgYS5tdWx0aWxpbmUgPT0gYi5tdWx0aWxpbmUgJiZcbiAgICAgICAgICAgICAgIGEuaWdub3JlQ2FzZSA9PSBiLmlnbm9yZUNhc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYSAhPSAnb2JqZWN0JyB8fCB0eXBlb2YgYiAhPSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlO1xuICAgIC8vIEFzc3VtZSBlcXVhbGl0eSBmb3IgY3ljbGljIHN0cnVjdHVyZXMuIFRoZSBhbGdvcml0aG0gZm9yIGRldGVjdGluZyBjeWNsaWNcbiAgICAvLyBzdHJ1Y3R1cmVzIGlzIGFkYXB0ZWQgZnJvbSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLCBhYnN0cmFjdCBvcGVyYXRpb24gYEpPYC5cbiAgICB2YXIgbGVuZ3RoID0gYVN0YWNrLmxlbmd0aDtcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIC8vIExpbmVhciBzZWFyY2guIFBlcmZvcm1hbmNlIGlzIGludmVyc2VseSBwcm9wb3J0aW9uYWwgdG8gdGhlIG51bWJlciBvZlxuICAgICAgLy8gdW5pcXVlIG5lc3RlZCBzdHJ1Y3R1cmVzLlxuICAgICAgaWYgKGFTdGFja1tsZW5ndGhdID09IGEpIHJldHVybiBiU3RhY2tbbGVuZ3RoXSA9PSBiO1xuICAgIH1cbiAgICAvLyBPYmplY3RzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWl2YWxlbnQsIGJ1dCBgT2JqZWN0YHNcbiAgICAvLyBmcm9tIGRpZmZlcmVudCBmcmFtZXMgYXJlLlxuICAgIHZhciBhQ3RvciA9IGEuY29uc3RydWN0b3IsIGJDdG9yID0gYi5jb25zdHJ1Y3RvcjtcbiAgICBpZiAoYUN0b3IgIT09IGJDdG9yICYmICEoXy5pc0Z1bmN0aW9uKGFDdG9yKSAmJiAoYUN0b3IgaW5zdGFuY2VvZiBhQ3RvcikgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5pc0Z1bmN0aW9uKGJDdG9yKSAmJiAoYkN0b3IgaW5zdGFuY2VvZiBiQ3RvcikpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEFkZCB0aGUgZmlyc3Qgb2JqZWN0IHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICBhU3RhY2sucHVzaChhKTtcbiAgICBiU3RhY2sucHVzaChiKTtcbiAgICB2YXIgc2l6ZSA9IDAsIHJlc3VsdCA9IHRydWU7XG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIGFuZCBhcnJheXMuXG4gICAgaWYgKGNsYXNzTmFtZSA9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAvLyBDb21wYXJlIGFycmF5IGxlbmd0aHMgdG8gZGV0ZXJtaW5lIGlmIGEgZGVlcCBjb21wYXJpc29uIGlzIG5lY2Vzc2FyeS5cbiAgICAgIHNpemUgPSBhLmxlbmd0aDtcbiAgICAgIHJlc3VsdCA9IHNpemUgPT0gYi5sZW5ndGg7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIC8vIERlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXMuXG4gICAgICAgIHdoaWxlIChzaXplLS0pIHtcbiAgICAgICAgICBpZiAoIShyZXN1bHQgPSBlcShhW3NpemVdLCBiW3NpemVdLCBhU3RhY2ssIGJTdGFjaykpKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBEZWVwIGNvbXBhcmUgb2JqZWN0cy5cbiAgICAgIGZvciAodmFyIGtleSBpbiBhKSB7XG4gICAgICAgIGlmIChfLmhhcyhhLCBrZXkpKSB7XG4gICAgICAgICAgLy8gQ291bnQgdGhlIGV4cGVjdGVkIG51bWJlciBvZiBwcm9wZXJ0aWVzLlxuICAgICAgICAgIHNpemUrKztcbiAgICAgICAgICAvLyBEZWVwIGNvbXBhcmUgZWFjaCBtZW1iZXIuXG4gICAgICAgICAgaWYgKCEocmVzdWx0ID0gXy5oYXMoYiwga2V5KSAmJiBlcShhW2tleV0sIGJba2V5XSwgYVN0YWNrLCBiU3RhY2spKSkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIEVuc3VyZSB0aGF0IGJvdGggb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIG51bWJlciBvZiBwcm9wZXJ0aWVzLlxuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBmb3IgKGtleSBpbiBiKSB7XG4gICAgICAgICAgaWYgKF8uaGFzKGIsIGtleSkgJiYgIShzaXplLS0pKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgPSAhc2l6ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVtb3ZlIHRoZSBmaXJzdCBvYmplY3QgZnJvbSB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnBvcCgpO1xuICAgIGJTdGFjay5wb3AoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFBlcmZvcm0gYSBkZWVwIGNvbXBhcmlzb24gdG8gY2hlY2sgaWYgdHdvIG9iamVjdHMgYXJlIGVxdWFsLlxuICBfLmlzRXF1YWwgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGVxKGEsIGIsIFtdLCBbXSk7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiBhcnJheSwgc3RyaW5nLCBvciBvYmplY3QgZW1wdHk/XG4gIC8vIEFuIFwiZW1wdHlcIiBvYmplY3QgaGFzIG5vIGVudW1lcmFibGUgb3duLXByb3BlcnRpZXMuXG4gIF8uaXNFbXB0eSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKF8uaXNBcnJheShvYmopIHx8IF8uaXNTdHJpbmcob2JqKSkgcmV0dXJuIG9iai5sZW5ndGggPT09IDA7XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikgaWYgKF8uaGFzKG9iaiwga2V5KSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgYSBET00gZWxlbWVudD9cbiAgXy5pc0VsZW1lbnQgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gISEob2JqICYmIG9iai5ub2RlVHlwZSA9PT0gMSk7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhbiBhcnJheT9cbiAgLy8gRGVsZWdhdGVzIHRvIEVDTUE1J3MgbmF0aXZlIEFycmF5LmlzQXJyYXlcbiAgXy5pc0FycmF5ID0gbmF0aXZlSXNBcnJheSB8fCBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YXJpYWJsZSBhbiBvYmplY3Q/XG4gIF8uaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbiAgfTtcblxuICAvLyBBZGQgc29tZSBpc1R5cGUgbWV0aG9kczogaXNBcmd1bWVudHMsIGlzRnVuY3Rpb24sIGlzU3RyaW5nLCBpc051bWJlciwgaXNEYXRlLCBpc1JlZ0V4cC5cbiAgZWFjaChbJ0FyZ3VtZW50cycsICdGdW5jdGlvbicsICdTdHJpbmcnLCAnTnVtYmVyJywgJ0RhdGUnLCAnUmVnRXhwJ10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBfWydpcycgKyBuYW1lXSA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PSAnW29iamVjdCAnICsgbmFtZSArICddJztcbiAgICB9O1xuICB9KTtcblxuICAvLyBEZWZpbmUgYSBmYWxsYmFjayB2ZXJzaW9uIG9mIHRoZSBtZXRob2QgaW4gYnJvd3NlcnMgKGFoZW0sIElFKSwgd2hlcmVcbiAgLy8gdGhlcmUgaXNuJ3QgYW55IGluc3BlY3RhYmxlIFwiQXJndW1lbnRzXCIgdHlwZS5cbiAgaWYgKCFfLmlzQXJndW1lbnRzKGFyZ3VtZW50cykpIHtcbiAgICBfLmlzQXJndW1lbnRzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gISEob2JqICYmIF8uaGFzKG9iaiwgJ2NhbGxlZScpKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gT3B0aW1pemUgYGlzRnVuY3Rpb25gIGlmIGFwcHJvcHJpYXRlLlxuICBpZiAodHlwZW9mICgvLi8pICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgXy5pc0Z1bmN0aW9uID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9O1xuICB9XG5cbiAgLy8gSXMgYSBnaXZlbiBvYmplY3QgYSBmaW5pdGUgbnVtYmVyP1xuICBfLmlzRmluaXRlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIGlzRmluaXRlKG9iaikgJiYgIWlzTmFOKHBhcnNlRmxvYXQob2JqKSk7XG4gIH07XG5cbiAgLy8gSXMgdGhlIGdpdmVuIHZhbHVlIGBOYU5gPyAoTmFOIGlzIHRoZSBvbmx5IG51bWJlciB3aGljaCBkb2VzIG5vdCBlcXVhbCBpdHNlbGYpLlxuICBfLmlzTmFOID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIF8uaXNOdW1iZXIob2JqKSAmJiBvYmogIT0gK29iajtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGEgYm9vbGVhbj9cbiAgXy5pc0Jvb2xlYW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSB0cnVlIHx8IG9iaiA9PT0gZmFsc2UgfHwgdG9TdHJpbmcuY2FsbChvYmopID09ICdbb2JqZWN0IEJvb2xlYW5dJztcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGVxdWFsIHRvIG51bGw/XG4gIF8uaXNOdWxsID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gbnVsbDtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhcmlhYmxlIHVuZGVmaW5lZD9cbiAgXy5pc1VuZGVmaW5lZCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IHZvaWQgMDtcbiAgfTtcblxuICAvLyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgY2hlY2tpbmcgaWYgYW4gb2JqZWN0IGhhcyBhIGdpdmVuIHByb3BlcnR5IGRpcmVjdGx5XG4gIC8vIG9uIGl0c2VsZiAoaW4gb3RoZXIgd29yZHMsIG5vdCBvbiBhIHByb3RvdHlwZSkuXG4gIF8uaGFzID0gZnVuY3Rpb24ob2JqLCBrZXkpIHtcbiAgICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSk7XG4gIH07XG5cbiAgLy8gVXRpbGl0eSBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBSdW4gVW5kZXJzY29yZS5qcyBpbiAqbm9Db25mbGljdCogbW9kZSwgcmV0dXJuaW5nIHRoZSBgX2AgdmFyaWFibGUgdG8gaXRzXG4gIC8vIHByZXZpb3VzIG93bmVyLiBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBVbmRlcnNjb3JlIG9iamVjdC5cbiAgXy5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgcm9vdC5fID0gcHJldmlvdXNVbmRlcnNjb3JlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIEtlZXAgdGhlIGlkZW50aXR5IGZ1bmN0aW9uIGFyb3VuZCBmb3IgZGVmYXVsdCBpdGVyYXRvcnMuXG4gIF8uaWRlbnRpdHkgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICAvLyBSdW4gYSBmdW5jdGlvbiAqKm4qKiB0aW1lcy5cbiAgXy50aW1lcyA9IGZ1bmN0aW9uKG4sIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgdmFyIGFjY3VtID0gQXJyYXkoTWF0aC5tYXgoMCwgbikpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSBhY2N1bVtpXSA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgaSk7XG4gICAgcmV0dXJuIGFjY3VtO1xuICB9O1xuXG4gIC8vIFJldHVybiBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIGFuZCBtYXggKGluY2x1c2l2ZSkuXG4gIF8ucmFuZG9tID0gZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgICBpZiAobWF4ID09IG51bGwpIHtcbiAgICAgIG1heCA9IG1pbjtcbiAgICAgIG1pbiA9IDA7XG4gICAgfVxuICAgIHJldHVybiBtaW4gKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xuICB9O1xuXG4gIC8vIExpc3Qgb2YgSFRNTCBlbnRpdGllcyBmb3IgZXNjYXBpbmcuXG4gIHZhciBlbnRpdHlNYXAgPSB7XG4gICAgZXNjYXBlOiB7XG4gICAgICAnJic6ICcmYW1wOycsXG4gICAgICAnPCc6ICcmbHQ7JyxcbiAgICAgICc+JzogJyZndDsnLFxuICAgICAgJ1wiJzogJyZxdW90OycsXG4gICAgICBcIidcIjogJyYjeDI3OydcbiAgICB9XG4gIH07XG4gIGVudGl0eU1hcC51bmVzY2FwZSA9IF8uaW52ZXJ0KGVudGl0eU1hcC5lc2NhcGUpO1xuXG4gIC8vIFJlZ2V4ZXMgY29udGFpbmluZyB0aGUga2V5cyBhbmQgdmFsdWVzIGxpc3RlZCBpbW1lZGlhdGVseSBhYm92ZS5cbiAgdmFyIGVudGl0eVJlZ2V4ZXMgPSB7XG4gICAgZXNjYXBlOiAgIG5ldyBSZWdFeHAoJ1snICsgXy5rZXlzKGVudGl0eU1hcC5lc2NhcGUpLmpvaW4oJycpICsgJ10nLCAnZycpLFxuICAgIHVuZXNjYXBlOiBuZXcgUmVnRXhwKCcoJyArIF8ua2V5cyhlbnRpdHlNYXAudW5lc2NhcGUpLmpvaW4oJ3wnKSArICcpJywgJ2cnKVxuICB9O1xuXG4gIC8vIEZ1bmN0aW9ucyBmb3IgZXNjYXBpbmcgYW5kIHVuZXNjYXBpbmcgc3RyaW5ncyB0by9mcm9tIEhUTUwgaW50ZXJwb2xhdGlvbi5cbiAgXy5lYWNoKFsnZXNjYXBlJywgJ3VuZXNjYXBlJ10sIGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIF9bbWV0aG9kXSA9IGZ1bmN0aW9uKHN0cmluZykge1xuICAgICAgaWYgKHN0cmluZyA9PSBudWxsKSByZXR1cm4gJyc7XG4gICAgICByZXR1cm4gKCcnICsgc3RyaW5nKS5yZXBsYWNlKGVudGl0eVJlZ2V4ZXNbbWV0aG9kXSwgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGVudGl0eU1hcFttZXRob2RdW21hdGNoXTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIElmIHRoZSB2YWx1ZSBvZiB0aGUgbmFtZWQgYHByb3BlcnR5YCBpcyBhIGZ1bmN0aW9uIHRoZW4gaW52b2tlIGl0IHdpdGggdGhlXG4gIC8vIGBvYmplY3RgIGFzIGNvbnRleHQ7IG90aGVyd2lzZSwgcmV0dXJuIGl0LlxuICBfLnJlc3VsdCA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICBpZiAob2JqZWN0ID09IG51bGwpIHJldHVybiB2b2lkIDA7XG4gICAgdmFyIHZhbHVlID0gb2JqZWN0W3Byb3BlcnR5XTtcbiAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKHZhbHVlKSA/IHZhbHVlLmNhbGwob2JqZWN0KSA6IHZhbHVlO1xuICB9O1xuXG4gIC8vIEFkZCB5b3VyIG93biBjdXN0b20gZnVuY3Rpb25zIHRvIHRoZSBVbmRlcnNjb3JlIG9iamVjdC5cbiAgXy5taXhpbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGVhY2goXy5mdW5jdGlvbnMob2JqKSwgZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyIGZ1bmMgPSBfW25hbWVdID0gb2JqW25hbWVdO1xuICAgICAgXy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbdGhpcy5fd3JhcHBlZF07XG4gICAgICAgIHB1c2guYXBwbHkoYXJncywgYXJndW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5jYWxsKHRoaXMsIGZ1bmMuYXBwbHkoXywgYXJncykpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBHZW5lcmF0ZSBhIHVuaXF1ZSBpbnRlZ2VyIGlkICh1bmlxdWUgd2l0aGluIHRoZSBlbnRpcmUgY2xpZW50IHNlc3Npb24pLlxuICAvLyBVc2VmdWwgZm9yIHRlbXBvcmFyeSBET00gaWRzLlxuICB2YXIgaWRDb3VudGVyID0gMDtcbiAgXy51bmlxdWVJZCA9IGZ1bmN0aW9uKHByZWZpeCkge1xuICAgIHZhciBpZCA9ICsraWRDb3VudGVyICsgJyc7XG4gICAgcmV0dXJuIHByZWZpeCA/IHByZWZpeCArIGlkIDogaWQ7XG4gIH07XG5cbiAgLy8gQnkgZGVmYXVsdCwgVW5kZXJzY29yZSB1c2VzIEVSQi1zdHlsZSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLCBjaGFuZ2UgdGhlXG4gIC8vIGZvbGxvd2luZyB0ZW1wbGF0ZSBzZXR0aW5ncyB0byB1c2UgYWx0ZXJuYXRpdmUgZGVsaW1pdGVycy5cbiAgXy50ZW1wbGF0ZVNldHRpbmdzID0ge1xuICAgIGV2YWx1YXRlICAgIDogLzwlKFtcXHNcXFNdKz8pJT4vZyxcbiAgICBpbnRlcnBvbGF0ZSA6IC88JT0oW1xcc1xcU10rPyklPi9nLFxuICAgIGVzY2FwZSAgICAgIDogLzwlLShbXFxzXFxTXSs/KSU+L2dcbiAgfTtcblxuICAvLyBXaGVuIGN1c3RvbWl6aW5nIGB0ZW1wbGF0ZVNldHRpbmdzYCwgaWYgeW91IGRvbid0IHdhbnQgdG8gZGVmaW5lIGFuXG4gIC8vIGludGVycG9sYXRpb24sIGV2YWx1YXRpb24gb3IgZXNjYXBpbmcgcmVnZXgsIHdlIG5lZWQgb25lIHRoYXQgaXNcbiAgLy8gZ3VhcmFudGVlZCBub3QgdG8gbWF0Y2guXG4gIHZhciBub01hdGNoID0gLyguKV4vO1xuXG4gIC8vIENlcnRhaW4gY2hhcmFjdGVycyBuZWVkIHRvIGJlIGVzY2FwZWQgc28gdGhhdCB0aGV5IGNhbiBiZSBwdXQgaW50byBhXG4gIC8vIHN0cmluZyBsaXRlcmFsLlxuICB2YXIgZXNjYXBlcyA9IHtcbiAgICBcIidcIjogICAgICBcIidcIixcbiAgICAnXFxcXCc6ICAgICAnXFxcXCcsXG4gICAgJ1xccic6ICAgICAncicsXG4gICAgJ1xcbic6ICAgICAnbicsXG4gICAgJ1xcdCc6ICAgICAndCcsXG4gICAgJ1xcdTIwMjgnOiAndTIwMjgnLFxuICAgICdcXHUyMDI5JzogJ3UyMDI5J1xuICB9O1xuXG4gIHZhciBlc2NhcGVyID0gL1xcXFx8J3xcXHJ8XFxufFxcdHxcXHUyMDI4fFxcdTIwMjkvZztcblxuICAvLyBKYXZhU2NyaXB0IG1pY3JvLXRlbXBsYXRpbmcsIHNpbWlsYXIgdG8gSm9obiBSZXNpZydzIGltcGxlbWVudGF0aW9uLlxuICAvLyBVbmRlcnNjb3JlIHRlbXBsYXRpbmcgaGFuZGxlcyBhcmJpdHJhcnkgZGVsaW1pdGVycywgcHJlc2VydmVzIHdoaXRlc3BhY2UsXG4gIC8vIGFuZCBjb3JyZWN0bHkgZXNjYXBlcyBxdW90ZXMgd2l0aGluIGludGVycG9sYXRlZCBjb2RlLlxuICBfLnRlbXBsYXRlID0gZnVuY3Rpb24odGV4dCwgZGF0YSwgc2V0dGluZ3MpIHtcbiAgICB2YXIgcmVuZGVyO1xuICAgIHNldHRpbmdzID0gXy5kZWZhdWx0cyh7fSwgc2V0dGluZ3MsIF8udGVtcGxhdGVTZXR0aW5ncyk7XG5cbiAgICAvLyBDb21iaW5lIGRlbGltaXRlcnMgaW50byBvbmUgcmVndWxhciBleHByZXNzaW9uIHZpYSBhbHRlcm5hdGlvbi5cbiAgICB2YXIgbWF0Y2hlciA9IG5ldyBSZWdFeHAoW1xuICAgICAgKHNldHRpbmdzLmVzY2FwZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuaW50ZXJwb2xhdGUgfHwgbm9NYXRjaCkuc291cmNlLFxuICAgICAgKHNldHRpbmdzLmV2YWx1YXRlIHx8IG5vTWF0Y2gpLnNvdXJjZVxuICAgIF0uam9pbignfCcpICsgJ3wkJywgJ2cnKTtcblxuICAgIC8vIENvbXBpbGUgdGhlIHRlbXBsYXRlIHNvdXJjZSwgZXNjYXBpbmcgc3RyaW5nIGxpdGVyYWxzIGFwcHJvcHJpYXRlbHkuXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgc291cmNlID0gXCJfX3ArPSdcIjtcbiAgICB0ZXh0LnJlcGxhY2UobWF0Y2hlciwgZnVuY3Rpb24obWF0Y2gsIGVzY2FwZSwgaW50ZXJwb2xhdGUsIGV2YWx1YXRlLCBvZmZzZXQpIHtcbiAgICAgIHNvdXJjZSArPSB0ZXh0LnNsaWNlKGluZGV4LCBvZmZzZXQpXG4gICAgICAgIC5yZXBsYWNlKGVzY2FwZXIsIGZ1bmN0aW9uKG1hdGNoKSB7IHJldHVybiAnXFxcXCcgKyBlc2NhcGVzW21hdGNoXTsgfSk7XG5cbiAgICAgIGlmIChlc2NhcGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJytcXG4oKF9fdD0oXCIgKyBlc2NhcGUgKyBcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjtcbiAgICAgIH1cbiAgICAgIGlmIChpbnRlcnBvbGF0ZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGludGVycG9sYXRlICsgXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjtcbiAgICAgIH1cbiAgICAgIGlmIChldmFsdWF0ZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInO1xcblwiICsgZXZhbHVhdGUgKyBcIlxcbl9fcCs9J1wiO1xuICAgICAgfVxuICAgICAgaW5kZXggPSBvZmZzZXQgKyBtYXRjaC5sZW5ndGg7XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG4gICAgc291cmNlICs9IFwiJztcXG5cIjtcblxuICAgIC8vIElmIGEgdmFyaWFibGUgaXMgbm90IHNwZWNpZmllZCwgcGxhY2UgZGF0YSB2YWx1ZXMgaW4gbG9jYWwgc2NvcGUuXG4gICAgaWYgKCFzZXR0aW5ncy52YXJpYWJsZSkgc291cmNlID0gJ3dpdGgob2JqfHx7fSl7XFxuJyArIHNvdXJjZSArICd9XFxuJztcblxuICAgIHNvdXJjZSA9IFwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiICtcbiAgICAgIFwicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIiArXG4gICAgICBzb3VyY2UgKyBcInJldHVybiBfX3A7XFxuXCI7XG5cbiAgICB0cnkge1xuICAgICAgcmVuZGVyID0gbmV3IEZ1bmN0aW9uKHNldHRpbmdzLnZhcmlhYmxlIHx8ICdvYmonLCAnXycsIHNvdXJjZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZS5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cblxuICAgIGlmIChkYXRhKSByZXR1cm4gcmVuZGVyKGRhdGEsIF8pO1xuICAgIHZhciB0ZW1wbGF0ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiByZW5kZXIuY2FsbCh0aGlzLCBkYXRhLCBfKTtcbiAgICB9O1xuXG4gICAgLy8gUHJvdmlkZSB0aGUgY29tcGlsZWQgZnVuY3Rpb24gc291cmNlIGFzIGEgY29udmVuaWVuY2UgZm9yIHByZWNvbXBpbGF0aW9uLlxuICAgIHRlbXBsYXRlLnNvdXJjZSA9ICdmdW5jdGlvbignICsgKHNldHRpbmdzLnZhcmlhYmxlIHx8ICdvYmonKSArICcpe1xcbicgKyBzb3VyY2UgKyAnfSc7XG5cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH07XG5cbiAgLy8gQWRkIGEgXCJjaGFpblwiIGZ1bmN0aW9uLCB3aGljaCB3aWxsIGRlbGVnYXRlIHRvIHRoZSB3cmFwcGVyLlxuICBfLmNoYWluID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIF8ob2JqKS5jaGFpbigpO1xuICB9O1xuXG4gIC8vIE9PUFxuICAvLyAtLS0tLS0tLS0tLS0tLS1cbiAgLy8gSWYgVW5kZXJzY29yZSBpcyBjYWxsZWQgYXMgYSBmdW5jdGlvbiwgaXQgcmV0dXJucyBhIHdyYXBwZWQgb2JqZWN0IHRoYXRcbiAgLy8gY2FuIGJlIHVzZWQgT08tc3R5bGUuIFRoaXMgd3JhcHBlciBob2xkcyBhbHRlcmVkIHZlcnNpb25zIG9mIGFsbCB0aGVcbiAgLy8gdW5kZXJzY29yZSBmdW5jdGlvbnMuIFdyYXBwZWQgb2JqZWN0cyBtYXkgYmUgY2hhaW5lZC5cblxuICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gY29udGludWUgY2hhaW5pbmcgaW50ZXJtZWRpYXRlIHJlc3VsdHMuXG4gIHZhciByZXN1bHQgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gdGhpcy5fY2hhaW4gPyBfKG9iaikuY2hhaW4oKSA6IG9iajtcbiAgfTtcblxuICAvLyBBZGQgYWxsIG9mIHRoZSBVbmRlcnNjb3JlIGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlciBvYmplY3QuXG4gIF8ubWl4aW4oXyk7XG5cbiAgLy8gQWRkIGFsbCBtdXRhdG9yIEFycmF5IGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlci5cbiAgZWFjaChbJ3BvcCcsICdwdXNoJywgJ3JldmVyc2UnLCAnc2hpZnQnLCAnc29ydCcsICdzcGxpY2UnLCAndW5zaGlmdCddLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIG1ldGhvZCA9IEFycmF5UHJvdG9bbmFtZV07XG4gICAgXy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBvYmogPSB0aGlzLl93cmFwcGVkO1xuICAgICAgbWV0aG9kLmFwcGx5KG9iaiwgYXJndW1lbnRzKTtcbiAgICAgIGlmICgobmFtZSA9PSAnc2hpZnQnIHx8IG5hbWUgPT0gJ3NwbGljZScpICYmIG9iai5sZW5ndGggPT09IDApIGRlbGV0ZSBvYmpbMF07XG4gICAgICByZXR1cm4gcmVzdWx0LmNhbGwodGhpcywgb2JqKTtcbiAgICB9O1xuICB9KTtcblxuICAvLyBBZGQgYWxsIGFjY2Vzc29yIEFycmF5IGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlci5cbiAgZWFjaChbJ2NvbmNhdCcsICdqb2luJywgJ3NsaWNlJ10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgbWV0aG9kID0gQXJyYXlQcm90b1tuYW1lXTtcbiAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5jYWxsKHRoaXMsIG1ldGhvZC5hcHBseSh0aGlzLl93cmFwcGVkLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9KTtcblxuICBfLmV4dGVuZChfLnByb3RvdHlwZSwge1xuXG4gICAgLy8gU3RhcnQgY2hhaW5pbmcgYSB3cmFwcGVkIFVuZGVyc2NvcmUgb2JqZWN0LlxuICAgIGNoYWluOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX2NoYWluID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvLyBFeHRyYWN0cyB0aGUgcmVzdWx0IGZyb20gYSB3cmFwcGVkIGFuZCBjaGFpbmVkIG9iamVjdC5cbiAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fd3JhcHBlZDtcbiAgICB9XG5cbiAgfSk7XG5cbn0pLmNhbGwodGhpcyk7XG4iXX0=