
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/model/async.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}(function (process,global){
"use strict";
cc._RF.push(module, '35852wUtjRNI6/OdR5fjH33', 'async');
// gameComon/scripts/model/async.js

"use strict";

/*!
 * async
 * https://github.com/caolan/async
 *
 * Copyright 2010-2014 Caolan McMahon
 * Released under the MIT license
 */
(function () {
  var async = {};

  function noop() {} // global on the server, window in the browser


  var root, previous_async;

  if (typeof window == 'object' && this === window) {
    root = window;
  } else if (typeof global == 'object' && this === global) {
    root = global;
  } else {
    root = this;
  }

  if (root != null) {
    previous_async = root.async;
  }

  async.noConflict = function () {
    root.async = previous_async;
    return async;
  };

  function only_once(fn) {
    var called = false;
    return function () {
      if (called) throw new Error("Callback was already called.");
      called = true;
      fn.apply(this, arguments);
    };
  }

  function _once(fn) {
    var called = false;
    return function () {
      if (called) return;
      called = true;
      fn.apply(this, arguments);
    };
  } //// cross-browser compatiblity functions ////


  var _toString = Object.prototype.toString;

  var _isArray = Array.isArray || function (obj) {
    return _toString.call(obj) === '[object Array]';
  };

  function _isArrayLike(arr) {
    return _isArray(arr) || // has a positive integer length property
    typeof arr.length === "number" && arr.length >= 0 && arr.length % 1 === 0;
  }

  function _each(coll, iterator) {
    return _isArrayLike(coll) ? _arrayEach(coll, iterator) : _forEachOf(coll, iterator);
  }

  function _arrayEach(arr, iterator) {
    var index = -1,
        length = arr.length;

    while (++index < length) {
      iterator(arr[index], index, arr);
    }
  }

  function _map(arr, iterator) {
    var index = -1,
        length = arr.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iterator(arr[index], index, arr);
    }

    return result;
  }

  function _range(count) {
    return _map(Array(count), function (v, i) {
      return i;
    });
  }

  function _reduce(arr, iterator, memo) {
    _arrayEach(arr, function (x, i, a) {
      memo = iterator(memo, x, i, a);
    });

    return memo;
  }

  function _forEachOf(object, iterator) {
    _arrayEach(_keys(object), function (key) {
      iterator(object[key], key);
    });
  }

  var _keys = Object.keys || function (obj) {
    var keys = [];

    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        keys.push(k);
      }
    }

    return keys;
  };

  function _keyIterator(coll) {
    var i = -1;
    var len;
    var keys;

    if (_isArrayLike(coll)) {
      len = coll.length;
      return function next() {
        i++;
        return i < len ? i : null;
      };
    } else {
      keys = _keys(coll);
      len = keys.length;
      return function next() {
        i++;
        return i < len ? keys[i] : null;
      };
    }
  }

  function _baseSlice(arr, start) {
    start = start || 0;
    var index = -1;
    var length = arr.length;

    if (start) {
      length -= start;
      length = length < 0 ? 0 : length;
    }

    var result = Array(length);

    while (++index < length) {
      result[index] = arr[index + start];
    }

    return result;
  }

  function _withoutIndex(iterator) {
    return function (value, index, callback) {
      return iterator(value, callback);
    };
  } //// exported async module functions ////
  //// nextTick implementation with browser-compatible fallback ////
  // capture the global reference to guard against fakeTimer mocks


  var _setImmediate;

  if (typeof setImmediate === 'function') {
    _setImmediate = setImmediate;
  }

  if (typeof process === 'undefined' || !process.nextTick) {
    if (_setImmediate) {
      async.nextTick = function (fn) {
        // not a direct alias for IE10 compatibility
        _setImmediate(fn);
      };

      async.setImmediate = async.nextTick;
    } else {
      async.nextTick = function (fn) {
        setTimeout(fn, 0);
      };

      async.setImmediate = async.nextTick;
    }
  } else {
    async.nextTick = process.nextTick;

    if (_setImmediate) {
      async.setImmediate = function (fn) {
        // not a direct alias for IE10 compatibility
        _setImmediate(fn);
      };
    } else {
      async.setImmediate = async.nextTick;
    }
  }

  async.forEach = async.each = function (arr, iterator, callback) {
    return async.eachOf(arr, _withoutIndex(iterator), callback);
  };

  async.forEachSeries = async.eachSeries = function (arr, iterator, callback) {
    return async.eachOfSeries(arr, _withoutIndex(iterator), callback);
  };

  async.forEachLimit = async.eachLimit = function (arr, limit, iterator, callback) {
    return _eachOfLimit(limit)(arr, _withoutIndex(iterator), callback);
  };

  async.forEachOf = async.eachOf = function (object, iterator, callback) {
    callback = _once(callback || noop);
    object = object || [];
    var size = _isArrayLike(object) ? object.length : _keys(object).length;
    var completed = 0;

    if (!size) {
      return callback(null);
    }

    _each(object, function (value, key) {
      iterator(object[key], key, only_once(done));
    });

    function done(err) {
      if (err) {
        callback(err);
      } else {
        completed += 1;

        if (completed >= size) {
          callback(null);
        }
      }
    }
  };

  async.forEachOfSeries = async.eachOfSeries = function (obj, iterator, callback) {
    callback = _once(callback || noop);
    obj = obj || [];

    var nextKey = _keyIterator(obj);

    var key = nextKey();

    function iterate() {
      var sync = true;

      if (key === null) {
        return callback(null);
      }

      iterator(obj[key], key, only_once(function (err) {
        if (err) {
          callback(err);
        } else {
          key = nextKey();

          if (key === null) {
            return callback(null);
          } else {
            if (sync) {
              async.nextTick(iterate);
            } else {
              iterate();
            }
          }
        }
      }));
      sync = false;
    }

    iterate();
  };

  async.forEachOfLimit = async.eachOfLimit = function (obj, limit, iterator, callback) {
    _eachOfLimit(limit)(obj, iterator, callback);
  };

  function _eachOfLimit(limit) {
    return function (obj, iterator, callback) {
      callback = _once(callback || noop);
      obj = obj || [];

      var nextKey = _keyIterator(obj);

      if (limit <= 0) {
        return callback(null);
      }

      var done = false;
      var running = 0;
      var errored = false;

      (function replenish() {
        if (done && running <= 0) {
          return callback(null);
        }

        while (running < limit && !errored) {
          var key = nextKey();

          if (key === null) {
            done = true;

            if (running <= 0) {
              callback(null);
            }

            return;
          }

          running += 1;
          iterator(obj[key], key, only_once(function (err) {
            running -= 1;

            if (err) {
              callback(err);
              errored = true;
            } else {
              replenish();
            }
          }));
        }
      })();
    };
  }

  function doParallel(fn) {
    return function (obj, iterator, callback) {
      return fn(async.eachOf, obj, iterator, callback);
    };
  }

  function doParallelLimit(limit, fn) {
    return function (obj, iterator, callback) {
      return fn(_eachOfLimit(limit), obj, iterator, callback);
    };
  }

  function doSeries(fn) {
    return function (obj, iterator, callback) {
      return fn(async.eachOfSeries, obj, iterator, callback);
    };
  }

  function _asyncMap(eachfn, arr, iterator, callback) {
    callback = _once(callback || noop);
    var results = [];
    eachfn(arr, function (value, index, callback) {
      iterator(value, function (err, v) {
        results[index] = v;
        callback(err);
      });
    }, function (err) {
      callback(err, results);
    });
  }

  async.map = doParallel(_asyncMap);
  async.mapSeries = doSeries(_asyncMap);

  async.mapLimit = function (arr, limit, iterator, callback) {
    return _mapLimit(limit)(arr, iterator, callback);
  };

  function _mapLimit(limit) {
    return doParallelLimit(limit, _asyncMap);
  } // reduce only has a series version, as doing reduce in parallel won't
  // work in many situations.


  async.inject = async.foldl = async.reduce = function (arr, memo, iterator, callback) {
    async.eachOfSeries(arr, function (x, i, callback) {
      iterator(memo, x, function (err, v) {
        memo = v;
        callback(err);
      });
    }, function (err) {
      callback(err || null, memo);
    });
  };

  async.foldr = async.reduceRight = function (arr, memo, iterator, callback) {
    var reversed = _map(arr, function (x) {
      return x;
    }).reverse();

    async.reduce(reversed, memo, iterator, callback);
  };

  function _filter(eachfn, arr, iterator, callback) {
    var results = [];
    arr = _map(arr, function (x, i) {
      return {
        index: i,
        value: x
      };
    });
    eachfn(arr, function (x, index, callback) {
      iterator(x.value, function (v) {
        if (v) {
          results.push(x);
        }

        callback();
      });
    }, function () {
      callback(_map(results.sort(function (a, b) {
        return a.index - b.index;
      }), function (x) {
        return x.value;
      }));
    });
  }

  async.select = async.filter = doParallel(_filter);
  async.selectSeries = async.filterSeries = doSeries(_filter);

  function _reject(eachfn, arr, iterator, callback) {
    var results = [];
    arr = _map(arr, function (x, i) {
      return {
        index: i,
        value: x
      };
    });
    eachfn(arr, function (x, index, callback) {
      iterator(x.value, function (v) {
        if (!v) {
          results.push(x);
        }

        callback();
      });
    }, function () {
      callback(_map(results.sort(function (a, b) {
        return a.index - b.index;
      }), function (x) {
        return x.value;
      }));
    });
  }

  async.reject = doParallel(_reject);
  async.rejectSeries = doSeries(_reject);

  function _detect(eachfn, arr, iterator, main_callback) {
    eachfn(arr, function (x, index, callback) {
      iterator(x, function (result) {
        if (result) {
          main_callback(x);
          main_callback = noop;
        } else {
          callback();
        }
      });
    }, function () {
      main_callback();
    });
  }

  async.detect = doParallel(_detect);
  async.detectSeries = doSeries(_detect);

  async.any = async.some = function (arr, iterator, main_callback) {
    async.eachOf(arr, function (x, _, callback) {
      iterator(x, function (v) {
        if (v) {
          main_callback(true);
          main_callback = noop;
        }

        callback();
      });
    }, function () {
      main_callback(false);
    });
  };

  async.all = async.every = function (arr, iterator, main_callback) {
    async.eachOf(arr, function (x, _, callback) {
      iterator(x, function (v) {
        if (!v) {
          main_callback(false);
          main_callback = noop;
        }

        callback();
      });
    }, function () {
      main_callback(true);
    });
  };

  async.sortBy = function (arr, iterator, callback) {
    async.map(arr, function (x, callback) {
      iterator(x, function (err, criteria) {
        if (err) {
          callback(err);
        } else {
          callback(null, {
            value: x,
            criteria: criteria
          });
        }
      });
    }, function (err, results) {
      if (err) {
        return callback(err);
      } else {
        callback(null, _map(results.sort(comparator), function (x) {
          return x.value;
        }));
      }
    });

    function comparator(left, right) {
      var a = left.criteria,
          b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }
  };

  async.auto = function (tasks, callback) {
    callback = _once(callback || noop);

    var keys = _keys(tasks);

    var remainingTasks = keys.length;

    if (!remainingTasks) {
      return callback(null);
    }

    var results = {};
    var listeners = [];

    function addListener(fn) {
      listeners.unshift(fn);
    }

    function removeListener(fn) {
      for (var i = 0; i < listeners.length; i += 1) {
        if (listeners[i] === fn) {
          listeners.splice(i, 1);
          return;
        }
      }
    }

    function taskComplete() {
      remainingTasks--;

      _arrayEach(listeners.slice(0), function (fn) {
        fn();
      });
    }

    addListener(function () {
      if (!remainingTasks) {
        callback(null, results);
      }
    });

    _arrayEach(keys, function (k) {
      var task = _isArray(tasks[k]) ? tasks[k] : [tasks[k]];

      function taskCallback(err) {
        var args = _baseSlice(arguments, 1);

        if (args.length <= 1) {
          args = args[0];
        }

        if (err) {
          var safeResults = {};

          _arrayEach(_keys(results), function (rkey) {
            safeResults[rkey] = results[rkey];
          });

          safeResults[k] = args;
          callback(err, safeResults);
        } else {
          results[k] = args;
          async.setImmediate(taskComplete);
        }
      }

      var requires = task.slice(0, Math.abs(task.length - 1)) || []; // prevent dead-locks

      var len = requires.length;
      var dep;

      while (len--) {
        if (!(dep = tasks[requires[len]])) {
          throw new Error('Has inexistant dependency');
        }

        if (_isArray(dep) && !!~dep.indexOf(k)) {
          throw new Error('Has cyclic dependencies');
        }
      }

      function ready() {
        return _reduce(requires, function (a, x) {
          return a && results.hasOwnProperty(x);
        }, true) && !results.hasOwnProperty(k);
      }

      if (ready()) {
        task[task.length - 1](taskCallback, results);
      } else {
        addListener(listener);
      }

      function listener() {
        if (ready()) {
          removeListener(listener);
          task[task.length - 1](taskCallback, results);
        }
      }
    });
  };

  async.retry = function (times, task, callback) {
    var DEFAULT_TIMES = 5;
    var attempts = []; // Use defaults if times not passed

    if (typeof times === 'function') {
      callback = task;
      task = times;
      times = DEFAULT_TIMES;
    } // Make sure times is a number


    times = parseInt(times, 10) || DEFAULT_TIMES;

    function wrappedTask(wrappedCallback, wrappedResults) {
      function retryAttempt(task, finalAttempt) {
        return function (seriesCallback) {
          task(function (err, result) {
            seriesCallback(!err || finalAttempt, {
              err: err,
              result: result
            });
          }, wrappedResults);
        };
      }

      while (times) {
        attempts.push(retryAttempt(task, !(times -= 1)));
      }

      async.series(attempts, function (done, data) {
        data = data[data.length - 1];
        (wrappedCallback || callback)(data.err, data.result);
      });
    } // If a callback is passed, run this as a controll flow


    return callback ? wrappedTask() : wrappedTask;
  };

  async.waterfall = function (tasks, callback) {
    callback = _once(callback || noop);

    if (!_isArray(tasks)) {
      var err = new Error('First argument to waterfall must be an array of functions');
      return callback(err);
    }

    if (!tasks.length) {
      return callback();
    }

    function wrapIterator(iterator) {
      return function (err) {
        if (err) {
          callback.apply(null, arguments);
        } else {
          var args = _baseSlice(arguments, 1);

          var next = iterator.next();

          if (next) {
            args.push(wrapIterator(next));
          } else {
            args.push(callback);
          }

          ensureAsync(iterator).apply(null, args);
        }
      };
    }

    wrapIterator(async.iterator(tasks))();
  };

  function _parallel(eachfn, tasks, callback) {
    callback = callback || noop;
    var results = _isArrayLike(tasks) ? [] : {};
    eachfn(tasks, function (task, key, callback) {
      task(function (err) {
        var args = _baseSlice(arguments, 1);

        if (args.length <= 1) {
          args = args[0];
        }

        results[key] = args;
        callback(err);
      });
    }, function (err) {
      callback(err, results);
    });
  }

  async.parallel = function (tasks, callback) {
    _parallel(async.eachOf, tasks, callback);
  };

  async.parallelLimit = function (tasks, limit, callback) {
    _parallel(_eachOfLimit(limit), tasks, callback);
  };

  async.series = function (tasks, callback) {
    callback = callback || noop;
    var results = _isArrayLike(tasks) ? [] : {};
    async.eachOfSeries(tasks, function (task, key, callback) {
      task(function (err) {
        var args = _baseSlice(arguments, 1);

        if (args.length <= 1) {
          args = args[0];
        }

        results[key] = args;
        callback(err);
      });
    }, function (err) {
      callback(err, results);
    });
  };

  async.iterator = function (tasks) {
    function makeCallback(index) {
      function fn() {
        if (tasks.length) {
          tasks[index].apply(null, arguments);
        }

        return fn.next();
      }

      fn.next = function () {
        return index < tasks.length - 1 ? makeCallback(index + 1) : null;
      };

      return fn;
    }

    return makeCallback(0);
  };

  async.apply = function (fn) {
    var args = _baseSlice(arguments, 1);

    return function () {
      return fn.apply(null, args.concat(_baseSlice(arguments)));
    };
  };

  function _concat(eachfn, arr, fn, callback) {
    var result = [];
    eachfn(arr, function (x, index, cb) {
      fn(x, function (err, y) {
        result = result.concat(y || []);
        cb(err);
      });
    }, function (err) {
      callback(err, result);
    });
  }

  async.concat = doParallel(_concat);
  async.concatSeries = doSeries(_concat);

  async.whilst = function (test, iterator, callback) {
    if (test()) {
      iterator(function (err) {
        if (err) {
          return callback(err);
        }

        async.whilst(test, iterator, callback);
      });
    } else {
      callback(null);
    }
  };

  async.doWhilst = function (iterator, test, callback) {
    iterator(function (err) {
      if (err) {
        return callback(err);
      }

      var args = _baseSlice(arguments, 1);

      if (test.apply(null, args)) {
        async.doWhilst(iterator, test, callback);
      } else {
        callback(null);
      }
    });
  };

  async.until = function (test, iterator, callback) {
    if (!test()) {
      iterator(function (err) {
        if (err) {
          return callback(err);
        }

        async.until(test, iterator, callback);
      });
    } else {
      callback(null);
    }
  };

  async.doUntil = function (iterator, test, callback) {
    iterator(function (err) {
      if (err) {
        return callback(err);
      }

      var args = _baseSlice(arguments, 1);

      if (!test.apply(null, args)) {
        async.doUntil(iterator, test, callback);
      } else {
        callback(null);
      }
    });
  };

  function _queue(worker, concurrency, payload) {
    if (concurrency == null) {
      concurrency = 1;
    } else if (concurrency === 0) {
      throw new Error('Concurrency must not be zero');
    }

    function _insert(q, data, pos, callback) {
      if (callback != null && typeof callback !== "function") {
        throw new Error("task callback must be a function");
      }

      q.started = true;

      if (!_isArray(data)) {
        data = [data];
      }

      if (data.length === 0 && q.idle()) {
        // call drain immediately if there are no tasks
        return async.setImmediate(function () {
          q.drain();
        });
      }

      _arrayEach(data, function (task) {
        var item = {
          data: task,
          callback: callback || noop
        };

        if (pos) {
          q.tasks.unshift(item);
        } else {
          q.tasks.push(item);
        }

        if (q.tasks.length === q.concurrency) {
          q.saturated();
        }
      });

      async.setImmediate(q.process);
    }

    function _next(q, tasks) {
      return function () {
        workers -= 1;
        var args = arguments;

        _arrayEach(tasks, function (task) {
          task.callback.apply(task, args);
        });

        if (q.tasks.length + workers === 0) {
          q.drain();
        }

        q.process();
      };
    }

    var workers = 0;
    var q = {
      tasks: [],
      concurrency: concurrency,
      saturated: noop,
      empty: noop,
      drain: noop,
      started: false,
      paused: false,
      push: function push(data, callback) {
        _insert(q, data, false, callback);
      },
      kill: function kill() {
        q.drain = noop;
        q.tasks = [];
      },
      unshift: function unshift(data, callback) {
        _insert(q, data, true, callback);
      },
      process: function process() {
        if (!q.paused && workers < q.concurrency && q.tasks.length) {
          while (workers < q.concurrency && q.tasks.length) {
            var tasks = payload ? q.tasks.splice(0, payload) : q.tasks.splice(0, q.tasks.length);

            var data = _map(tasks, function (task) {
              return task.data;
            });

            if (q.tasks.length === 0) {
              q.empty();
            }

            workers += 1;
            var cb = only_once(_next(q, tasks));
            worker(data, cb);
          }
        }
      },
      length: function length() {
        return q.tasks.length;
      },
      running: function running() {
        return workers;
      },
      idle: function idle() {
        return q.tasks.length + workers === 0;
      },
      pause: function pause() {
        q.paused = true;
      },
      resume: function resume() {
        if (q.paused === false) {
          return;
        }

        q.paused = false;
        var resumeCount = Math.min(q.concurrency, q.tasks.length); // Need to call q.process once per concurrent
        // worker to preserve full concurrency after pause

        for (var w = 1; w <= resumeCount; w++) {
          async.setImmediate(q.process);
        }
      }
    };
    return q;
  }

  async.queue = function (worker, concurrency) {
    var q = _queue(function (items, cb) {
      worker(items[0], cb);
    }, concurrency, 1);

    return q;
  };

  async.priorityQueue = function (worker, concurrency) {
    function _compareTasks(a, b) {
      return a.priority - b.priority;
    }

    function _binarySearch(sequence, item, compare) {
      var beg = -1,
          end = sequence.length - 1;

      while (beg < end) {
        var mid = beg + (end - beg + 1 >>> 1);

        if (compare(item, sequence[mid]) >= 0) {
          beg = mid;
        } else {
          end = mid - 1;
        }
      }

      return beg;
    }

    function _insert(q, data, priority, callback) {
      if (callback != null && typeof callback !== "function") {
        throw new Error("task callback must be a function");
      }

      q.started = true;

      if (!_isArray(data)) {
        data = [data];
      }

      if (data.length === 0) {
        // call drain immediately if there are no tasks
        return async.setImmediate(function () {
          q.drain();
        });
      }

      _arrayEach(data, function (task) {
        var item = {
          data: task,
          priority: priority,
          callback: typeof callback === 'function' ? callback : noop
        };
        q.tasks.splice(_binarySearch(q.tasks, item, _compareTasks) + 1, 0, item);

        if (q.tasks.length === q.concurrency) {
          q.saturated();
        }

        async.setImmediate(q.process);
      });
    } // Start with a normal queue


    var q = async.queue(worker, concurrency); // Override push to accept second parameter representing priority

    q.push = function (data, priority, callback) {
      _insert(q, data, priority, callback);
    }; // Remove unshift function


    delete q.unshift;
    return q;
  };

  async.cargo = function (worker, payload) {
    return _queue(worker, 1, payload);
  };

  function _console_fn(name) {
    return function (fn) {
      var args = _baseSlice(arguments, 1);

      fn.apply(null, args.concat([function (err) {
        var args = _baseSlice(arguments, 1);

        if (typeof console !== 'undefined') {
          if (err) {
            if (console.error) {
              console.error(err);
            }
          } else if (console[name]) {
            _arrayEach(args, function (x) {
              console[name](x);
            });
          }
        }
      }]));
    };
  }

  async.log = _console_fn('log');
  async.dir = _console_fn('dir');
  /*async.info = _console_fn('info');
  async.warn = _console_fn('warn');
  async.error = _console_fn('error');*/

  async.memoize = function (fn, hasher) {
    var memo = {};
    var queues = {};

    hasher = hasher || function (x) {
      return x;
    };

    function memoized() {
      var args = _baseSlice(arguments);

      var callback = args.pop();
      var key = hasher.apply(null, args);

      if (key in memo) {
        async.nextTick(function () {
          callback.apply(null, memo[key]);
        });
      } else if (key in queues) {
        queues[key].push(callback);
      } else {
        queues[key] = [callback];
        fn.apply(null, args.concat([function () {
          memo[key] = _baseSlice(arguments);
          var q = queues[key];
          delete queues[key];

          for (var i = 0, l = q.length; i < l; i++) {
            q[i].apply(null, arguments);
          }
        }]));
      }
    }

    memoized.memo = memo;
    memoized.unmemoized = fn;
    return memoized;
  };

  async.unmemoize = function (fn) {
    return function () {
      return (fn.unmemoized || fn).apply(null, arguments);
    };
  };

  function _times(mapper) {
    return function (count, iterator, callback) {
      mapper(_range(count), iterator, callback);
    };
  }

  async.times = _times(async.map);
  async.timesSeries = _times(async.mapSeries);

  async.timesLimit = function (count, limit, iterator, callback) {
    return async.mapLimit(_range(count), limit, iterator, callback);
  };

  async.seq = function ()
  /* functions... */
  {
    var fns = arguments;
    return function () {
      var that = this;

      var args = _baseSlice(arguments);

      var callback = args.slice(-1)[0];

      if (typeof callback == 'function') {
        args.pop();
      } else {
        callback = noop;
      }

      async.reduce(fns, args, function (newargs, fn, cb) {
        fn.apply(that, newargs.concat([function () {
          var err = arguments[0];

          var nextargs = _baseSlice(arguments, 1);

          cb(err, nextargs);
        }]));
      }, function (err, results) {
        callback.apply(that, [err].concat(results));
      });
    };
  };

  async.compose = function ()
  /* functions... */
  {
    return async.seq.apply(null, Array.prototype.reverse.call(arguments));
  };

  function _applyEach(eachfn, fns
  /*args...*/
  ) {
    function go() {
      var that = this;

      var args = _baseSlice(arguments);

      var callback = args.pop();
      return eachfn(fns, function (fn, _, cb) {
        fn.apply(that, args.concat([cb]));
      }, callback);
    }

    if (arguments.length > 2) {
      var args = _baseSlice(arguments, 2);

      return go.apply(this, args);
    } else {
      return go;
    }
  }

  async.applyEach = function ()
  /*fns, args...*/
  {
    var args = _baseSlice(arguments);

    return _applyEach.apply(null, [async.eachOf].concat(args));
  };

  async.applyEachSeries = function ()
  /*fns, args...*/
  {
    var args = _baseSlice(arguments);

    return _applyEach.apply(null, [async.eachOfSeries].concat(args));
  };

  async.forever = function (fn, callback) {
    var done = only_once(callback || noop);
    var task = ensureAsync(fn);

    function next(err) {
      if (err) {
        return done(err);
      }

      task(next);
    }

    next();
  };

  function ensureAsync(fn) {
    return function ()
    /*...args, callback*/
    {
      var args = _baseSlice(arguments);

      var callback = args.pop();
      args.push(function () {
        var innerArgs = arguments;

        if (sync) {
          async.setImmediate(function () {
            callback.apply(null, innerArgs);
          });
        } else {
          callback.apply(null, innerArgs);
        }
      });
      var sync = true;
      fn.apply(this, args);
      sync = false;
    };
  }

  async.ensureAsync = ensureAsync; // Node.js

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = async;
  } // AMD / RequireJS
  else if (typeof define !== 'undefined' && define.amd) {
      define([], function () {
        return async;
      });
    } // included directly via <script> tag
    else {
        root.async = async;
      }
})();

cc._RF.pop();

}).call(this,require("C:/CocosDashboard_1.0.12/resources/.editors/Creator/2.4.4/resources/app.asar/node_modules/process/browser.js"),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9hc3NldHNcXGdhbWVDb21vblxcc2NyaXB0c1xcbW9kZWxcXGFzeW5jLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0MsYUFBWTtBQUVULE1BQUksS0FBSyxHQUFHLEVBQVo7O0FBQ0EsV0FBUyxJQUFULEdBQWdCLENBQUUsQ0FIVCxDQUtUOzs7QUFDQSxNQUFJLElBQUosRUFBVSxjQUFWOztBQUVBLE1BQUksT0FBTyxNQUFQLElBQWlCLFFBQWpCLElBQTZCLFNBQVMsTUFBMUMsRUFBa0Q7QUFDOUMsSUFBQSxJQUFJLEdBQUcsTUFBUDtBQUNILEdBRkQsTUFHSyxJQUFJLE9BQU8sTUFBUCxJQUFpQixRQUFqQixJQUE2QixTQUFTLE1BQTFDLEVBQWtEO0FBQ25ELElBQUEsSUFBSSxHQUFHLE1BQVA7QUFDSCxHQUZJLE1BR0E7QUFDRCxJQUFBLElBQUksR0FBRyxJQUFQO0FBQ0g7O0FBRUQsTUFBSSxJQUFJLElBQUksSUFBWixFQUFrQjtBQUNoQixJQUFBLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBdEI7QUFDRDs7QUFFRCxFQUFBLEtBQUssQ0FBQyxVQUFOLEdBQW1CLFlBQVk7QUFDM0IsSUFBQSxJQUFJLENBQUMsS0FBTCxHQUFhLGNBQWI7QUFDQSxXQUFPLEtBQVA7QUFDSCxHQUhEOztBQUtBLFdBQVMsU0FBVCxDQUFtQixFQUFuQixFQUF1QjtBQUNuQixRQUFJLE1BQU0sR0FBRyxLQUFiO0FBQ0EsV0FBTyxZQUFXO0FBQ2QsVUFBSSxNQUFKLEVBQVksTUFBTSxJQUFJLEtBQUosQ0FBVSw4QkFBVixDQUFOO0FBQ1osTUFBQSxNQUFNLEdBQUcsSUFBVDtBQUNBLE1BQUEsRUFBRSxDQUFDLEtBQUgsQ0FBUyxJQUFULEVBQWUsU0FBZjtBQUNILEtBSkQ7QUFLSDs7QUFFRCxXQUFTLEtBQVQsQ0FBZSxFQUFmLEVBQW1CO0FBQ2YsUUFBSSxNQUFNLEdBQUcs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QUFDcEMsUUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLFFBQVEsSUFBSSxJQUFiLENBQXBCO0FBQ0EsUUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLEVBQUQsQ0FBdEI7O0FBQ0EsYUFBUyxJQUFULENBQWMsR0FBZCxFQUFtQjtBQUNmLFVBQUksR0FBSixFQUFTO0FBQ0wsZUFBTyxJQUFJLENBQUMsR0FBRCxDQUFYO0FBQ0g7O0FBQ0QsTUFBQSxJQUFJLENBQUMsSUFBRCxDQUFKO0FBQ0g7O0FBQ0QsSUFBQSxJQUFJO0FBQ1AsR0FWRDs7QUFZQSxXQUFTLFdBQVQsQ0FBcUIsRUFBckIsRUFBeUI7QUFDckIsV0FBTztBQUFVO0FBQXVCO0FBQ3BDLFVBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFELENBQXJCOztBQUNBLFVBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFMLEVBQWY7QUFDQSxNQUFBLElBQUksQ0FBQyxJQUFMLENBQVUsWUFBWTtBQUNsQixZQUFJLFNBQVMsR0FBRyxTQUFoQjs7QUFDQSxZQUFJLElBQUosRUFBVTtBQUNOLFVBQUEsS0FBSyxDQUFDLFlBQU4sQ0FBbUIsWUFBWTtBQUMzQixZQUFBLFFBQVEsQ0FBQyxLQUFULENBQWUsSUFBZixFQUFxQixTQUFyQjtBQUNILFdBRkQ7QUFHSCxTQUpELE1BSU87QUFDSCxVQUFBLFFBQVEsQ0FBQyxLQUFULENBQWUsSUFBZixFQUFxQixTQUFyQjtBQUNIO0FBQ0osT0FURDtBQVVBLFVBQUksSUFBSSxHQUFHLElBQVg7QUFDQSxNQUFBLEVBQUUsQ0FBQyxLQUFILENBQVMsSUFBVCxFQUFlLElBQWY7QUFDQSxNQUFBLElBQUksR0FBRyxLQUFQO0FBQ0gsS0FoQkQ7QUFpQkg7O0FBRUQsRUFBQSxLQUFLLENBQUMsV0FBTixHQUFvQixXQUFwQixDQTlvQ1MsQ0FncENUOztBQUNBLE1BQUksT0FBTyxNQUFQLEtBQWtCLFdBQWxCLElBQWlDLE1BQU0sQ0FBQyxPQUE1QyxFQUFxRDtBQUNqRCxJQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLEtBQWpCO0FBQ0gsR0FGRCxDQUdBO0FBSEEsT0FJSyxJQUFJLE9BQU8sTUFBUCxLQUFrQixXQUFsQixJQUFpQyxNQUFNLENBQUMsR0FBNUMsRUFBaUQ7QUFDbEQsTUFBQSxNQUFNLENBQUMsRUFBRCxFQUFLLFlBQVk7QUFDbkIsZUFBTyxLQUFQO0FBQ0gsT0FGSyxDQUFOO0FBR0gsS0FKSSxDQUtMO0FBTEssU0FNQTtBQUNELFFBQUEsSUFBSSxDQUFDLEtBQUwsR0FBYSxLQUFiO0FBQ0g7QUFFSixDQS9wQ0EsR0FBRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOltudWxsXX0=