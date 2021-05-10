(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of cache-manager software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in cache-manager License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var _window$fsUtils = window.fsUtils,
    getUserDataPath = _window$fsUtils.getUserDataPath,
    readJsonSync = _window$fsUtils.readJsonSync,
    makeDirSync = _window$fsUtils.makeDirSync,
    writeFileSync = _window$fsUtils.writeFileSync,
    copyFile = _window$fsUtils.copyFile,
    downloadFile = _window$fsUtils.downloadFile,
    writeFile = _window$fsUtils.writeFile,
    deleteFile = _window$fsUtils.deleteFile,
    rmdirSync = _window$fsUtils.rmdirSync,
    unzip = _window$fsUtils.unzip,
    isOutOfStorage = _window$fsUtils.isOutOfStorage;
var checkNextPeriod = false;
var writeCacheFileList = null;
var startWrite = false;
var nextCallbacks = [];
var callbacks = [];
var cleaning = false;
var suffix = 0;
var REGEX = /^https?:\/\/.*/;
var cacheManager = {
  cacheDir: 'gamecaches',
  cachedFileName: 'cacheList.json',
  // whether or not cache asset into user's storage space
  cacheEnabled: true,
  // whether or not auto clear cache when storage ran out
  autoClear: true,
  // cache one per cycle
  cacheInterval: 500,
  deleteInterval: 500,
  writeFileInterval: 2000,
  // whether or not storage space has run out
  outOfStorage: false,
  tempFiles: null,
  cachedFiles: null,
  cacheQueue: {},
  version: '1.0',
  getCache: function getCache(url) {
    return this.cachedFiles.has(url) ? this.cachedFiles.get(url).url : '';
  },
  getTemp: function getTemp(url) {
    return this.tempFiles.has(url) ? this.tempFiles.get(url) : '';
  },
  init: function init() {
    this.cacheDir = getUserDataPath() + '/' + this.cacheDir;
    var cacheFilePath = this.cacheDir + '/' + this.cachedFileName;
    var result = readJsonSync(cacheFilePath);

    if (result instanceof Error || !result.version) {
      if (!(result instanceof Error)) rmdirSync(this.cacheDir, true);
      this.cachedFiles = new cc.AssetManager.Cache();
      makeDirSync(this.cacheDir, true);
      writeFileSync(cacheFilePath, JSON.stringify({
        files: this.cachedFiles._map,
        version: this.version
      }), 'utf8');
    } else {
      this.cachedFiles = new cc.AssetManager.Cache(result.files);
    }

    this.tempFiles = new cc.AssetManager.Cache();
  },
  updateLastTime: function updateLastTime(url) {
    if (this.cachedFiles.has(url)) {
      var cache = this.cachedFiles.get(url);
      cache.lastTime = Date.now();
    }
  },
  _write: function _write() {
    writeCacheFileList = null;
    startWrite = true;
    writeFile(this.cacheDir + '/' + this.cachedFileName, JSON.stringify({
      files: this.cachedFiles._map,
      version: this.version
    }), 'utf8', function () {
      startWrite = false;

      for (var i = 0, j = callbacks.length; i < j; i++) {
        callbacks[i]();
      }

      callbacks.length = 0;
      callbacks.push.apply(callbacks, nextCallbacks);
      nextCallbacks.length = 0;
    });
  },
  writeCacheFile: function writeCacheFile(cb) {
    if (!writeCacheFileList) {
      writeCacheFileList = setTimeout(this._write.bind(this), this.writeFileInterval);

      if (startWrite === true) {
        cb && nextCallbacks.push(cb);
      } else {
        cb && callbacks.push(cb);
      }
    } else {
      cb && callbacks.push(cb);
    }
  },
  _cache: function _cache() {
    var self = this;

    for (var id in this.cacheQueue) {
      var callback = function callback(err) {
        checkNextPeriod = false;

        if (err) {
          if (isOutOfStorage(err.message)) {
            self.outOfStorage = true;
            self.autoClear && self.clearLRU();
            return;
          }
        } else {
          self.cachedFiles.add(id, {
            bundle: cacheBundleRoot,
            url: localPath,
            lastTime: time
          });
          delete self.cacheQueue[id];
          self.writeCacheFile();
        }

        if (!cc.js.isEmptyObject(self.cacheQueue)) {
          checkNextPeriod = true;
          setTimeout(self._cache.bind(self), self.cacheInterval);
        }
      };

      var _this$cacheQueue$id = this.cacheQueue[id],
          srcUrl = _this$cacheQueue$id.srcUrl,
          isCopy = _this$cacheQueue$id.isCopy,
          cacheBundleRoot = _this$cacheQueue$id.cacheBundleRoot;
      var time = Date.now().toString();
      var localPath = '';

      if (cacheBundleRoot) {
        localPath = "".concat(this.cacheDir, "/").concat(cacheBundleRoot, "/").concat(time).concat(suffix++).concat(cc.path.extname(id));
      } else {
        localPath = "".concat(this.cacheDir, "/").concat(time).concat(suffix++).concat(cc.path.extname(id));
      }

      if (!isCopy) {
        downloadFile(srcUrl, localPath, null, callback);
      } else {
        copyFile(srcUrl, localPath, callback);
      }

      return;
    }

    checkNextPeriod = false;
  },
  cacheFile: function cacheFile(id, srcUrl, cacheEnabled, cacheBundleRoot, isCopy) {
    cacheEnabled = cacheEnabled !== undefined ? cacheEnabled : this.cacheEnabled;
    if (!cacheEnabled || this.cacheQueue[id] || this.cachedFiles.has(id)) return;
    this.cacheQueue[id] = {
      srcUrl: srcUrl,
      cacheBundleRoot: cacheBundleRoot,
      isCopy: isCopy
    };

    if (!checkNextPeriod) {
      checkNextPeriod = true;

      if (!this.outOfStorage) {
        setTimeout(this._cache.bind(this), this.cacheInterval);
      } else {
        checkNextPeriod = false;
      }
    }
  },
  clearCache: function clearCache() {
    var _this = this;

    rmdirSync(this.cacheDir, true);
    this.cachedFiles = new cc.AssetManager.Cache();
    makeDirSync(this.cacheDir, true);
    var cacheFilePath = this.cacheDir + '/' + this.cachedFileName;
    this.outOfStorage = false;
    writeFileSync(cacheFilePath, JSON.stringify({
      files: this.cachedFiles._map,
      version: this.version
    }), 'utf8');
    cc.assetManager.bundles.forEach(function (bundle) {
      if (REGEX.test(bundle.base)) _this.makeBundleFolder(bundle.name);
    });
  },
  clearLRU: function clearLRU() {
    if (cleaning) return;
    cleaning = true;
    var caches = [];
    var self = this;
    this.cachedFiles.forEach(function (val, key) {
      if (val.bundle === 'internal') return;
      if (self._isZipFile(key) && cc.assetManager.bundles.find(function (bundle) {
        return bundle.base.indexOf(val.url) !== -1;
      })) return;
      caches.push({
        originUrl: key,
        url: val.url,
        lastTime: val.lastTime
      });
    });
    caches.sort(function (a, b) {
      return a.lastTime - b.lastTime;
    });
    caches.length = Math.floor(this.cachedFiles.count / 3);
    if (caches.length === 0) return;

    for (var i = 0, l = caches.length; i < l; i++) {
      this.cachedFiles.remove(caches[i].originUrl);
    }

    this.writeCacheFile(function () {
      function deferredDelete() {
        var item = caches.pop();

        if (self._isZipFile(item.originUrl)) {
          rmdirSync(item.url, true);

          self._deleteFileCB();
        } else {
          deleteFile(item.url, self._deleteFileCB.bind(self));
        }

        if (caches.length > 0) {
          setTimeout(deferredDelete, self.deleteInterval);
        } else {
          cleaning = false;
        }
      }

      setTimeout(deferredDelete, self.deleteInterval);
    });
  },
  removeCache: function removeCache(url) {
    if (this.cachedFiles.has(url)) {
      var self = this;
      var path = this.cachedFiles.remove(url).url;
      this.writeCacheFile(function () {
        if (self._isZipFile(url)) {
          rmdirSync(path, true);

          self._deleteFileCB();
        } else {
          deleteFile(path, self._deleteFileCB.bind(self));
        }
      });
    }
  },
  _deleteFileCB: function _deleteFileCB(err) {
    if (!err) this.outOfStorage = false;
  },
  makeBundleFolder: function makeBundleFolder(bundleName) {
    makeDirSync(this.cacheDir + '/' + bundleName, true);
  },
  unzipAndCacheBundle: function unzipAndCacheBundle(id, zipFilePath, cacheBundleRoot, onComplete) {
    var time = Date.now().toString();
    var targetPath = "".concat(this.cacheDir, "/").concat(cacheBundleRoot, "/").concat(time).concat(suffix++);
    var self = this;
    makeDirSync(targetPath, true);
    unzip(zipFilePath, targetPath, function (err) {
      if (err) {
        rmdirSync(targetPath, true);

        if (isOutOfStorage(err.message)) {
          self.outOfStorage = true;
          self.autoClear && self.clearLRU();
        }

        onComplete && onComplete(err);
        return;
      }

      self.cachedFiles.add(id, {
        bundle: cacheBundleRoot,
        url: targetPath,
        lastTime: time
      });
      self.writeCacheFile();
      onComplete && onComplete(null, targetPath);
    });
  },
  _isZipFile: function _isZipFile(url) {
    return url.slice(-4) === '.zip';
  }
};
cc.assetManager.cacheManager = module.exports = cacheManager;

},{}],3:[function(require,module,exports){
"use strict";

var cacheManager = require('../cache-manager');

var _window$fsUtils = window.fsUtils,
    fs = _window$fsUtils.fs,
    downloadFile = _window$fsUtils.downloadFile,
    readText = _window$fsUtils.readText,
    readArrayBuffer = _window$fsUtils.readArrayBuffer,
    readJson = _window$fsUtils.readJson,
    loadSubpackage = _window$fsUtils.loadSubpackage,
    getUserDataPath = _window$fsUtils.getUserDataPath;
var REGEX = /^https?:\/\/.*/;
var downloader = cc.assetManager.downloader;
var parser = cc.assetManager.parser;
var presets = cc.assetManager.presets;
var isSubDomain = __globalAdapter.isSubContext;
downloader.maxConcurrency = 8;
downloader.maxRequestsPerFrame = 64;
presets['scene'].maxConcurrency = 10;
presets['scene'].maxRequestsPerFrame = 64;
var SUBCONTEXT_ROOT, REMOTE_SERVER_ROOT;
var subpackages = {},
    remoteBundles = {};

function downloadScript(url, options, onComplete) {
  if (typeof options === 'function') {
    onComplete = options;
    options = null;
  }

  if (REGEX.test(url)) {
    onComplete && onComplete(new Error('Can not load remote scripts'));
  } else {
    __cocos_require__(url);

    onComplete && onComplete(null);
  }
}

function handleZip(url, options, onComplete) {
  var cachedUnzip = cacheManager.cachedFiles.get(url);

  if (cachedUnzip) {
    cacheManager.updateLastTime(url);
    onComplete && onComplete(null, cachedUnzip.url);
  } else if (REGEX.test(url)) {
    downloadFile(url, null, options.header, options.onFileProgress, function (err, downloadedZipPath) {
      if (err) {
        onComplete && onComplete(err);
        return;
      }

      cacheManager.unzipAndCacheBundle(url, downloadedZipPath, options.__cacheBundleRoot__, onComplete);
    });
  } else {
    cacheManager.unzipAndCacheBundle(url, url, options.__cacheBundleRoot__, onComplete);
  }
}

function downloadDomAudio(url, options, onComplete) {
  if (typeof options === 'function') {
    onComplete = options;
    options = null;
  }

  var dom = document.createElement('audio');
  dom.src = url; // HACK: wechat does not callback when load large number of assets

  onComplete && onComplete(null, dom);
}

function download(url, func, options, onFileProgress, onComplete) {
  var result = transformUrl(url, options);

  if (result.inLocal) {
    func(result.url, options, onComplete);
  } else if (result.inCache) {
    cacheManager.updateLastTime(url);
    func(result.url, options, function (err, data) {
      if (err) {
        cacheManager.removeCache(url);
      }

      onComplete(err, data);
    });
  } else {
    downloadFile(url, null, options.header, onFileProgress, function (err, path) {
      if (err) {
        onComplete(err, null);
        return;
      }

      func(path, options, function (err, data) {
        if (!err) {
          cacheManager.tempFiles.add(url, path);
          cacheManager.cacheFile(url, path, options.cacheEnabled, options.__cacheBundleRoot__, true);
        }

        onComplete(err, data);
      });
    });
  }
}

function parseArrayBuffer(url, options, onComplete) {
  readArrayBuffer(url, onComplete);
}

function parseText(url, options, onComplete) {
  readText(url, onComplete);
}

function parseJson(url, options, onComplete) {
  readJson(url, onComplete);
}

function downloadText(url, options, onComplete) {
  download(url, parseText, options, options.onFileProgress, onComplete);
}

var downloadJson = !isSubDomain ? function (url, options, onComplete) {
  download(url, parseJson, options, options.onFileProgress, onComplete);
} : function (url, options, onComplete) {
  var _transformUrl = transformUrl(url, options),
      url = _transformUrl.url;

  url = url.slice(SUBCONTEXT_ROOT.length + 1); // remove subcontext root in url

  var content = __cocos_require__(cc.path.changeExtname(url, '.js'));

  onComplete && onComplete(null, content);
};
var loadFont = !isSubDomain ? function (url, options, onComplete) {
  var fontFamily = __globalAdapter.loadFont(url);

  onComplete(null, fontFamily || 'Arial');
} : function (url, options, onComplete) {
  onComplete(null, 'Arial');
};

function doNothing(content, options, onComplete) {
  onComplete(null, content);
}

function downloadAsset(url, options, onComplete) {
  download(url, doNothing, options, options.onFileProgress, onComplete);
}

function subdomainTransformUrl(url, options, onComplete) {
  var _transformUrl2 = transformUrl(url, options),
      url = _transformUrl2.url;

  onComplete(null, url);
}

function downloadBundle(nameOrUrl, options, onComplete) {
  var bundleName = cc.path.basename(nameOrUrl);
  var version = options.version || cc.assetManager.downloader.bundleVers[bundleName];

  if (subpackages[bundleName]) {
    var config = "subpackages/".concat(bundleName, "/config.").concat(version ? version + '.' : '', "json");
    loadSubpackage(bundleName, options.onFileProgress, function (err) {
      if (err) {
        onComplete(err, null);
        return;
      }

      downloadJson(config, options, function (err, data) {
        data && (data.base = "subpackages/".concat(bundleName, "/"));
        onComplete(err, data);
      });
    });
  } else {
    var js, url;

    if (REGEX.test(nameOrUrl) || !isSubDomain && nameOrUrl.startsWith(getUserDataPath())) {
      url = nameOrUrl;
      js = "src/scripts/".concat(bundleName, "/index.js");
      cacheManager.makeBundleFolder(bundleName);
    } else {
      if (remoteBundles[bundleName]) {
        url = "".concat(REMOTE_SERVER_ROOT, "remote/").concat(bundleName);
        js = "src/scripts/".concat(bundleName, "/index.js");
        cacheManager.makeBundleFolder(bundleName);
      } else {
        url = "assets/".concat(bundleName);
        js = "assets/".concat(bundleName, "/index.js");
      }
    }

    __cocos_require__(js);

    options.__cacheBundleRoot__ = bundleName;
    var config = "".concat(url, "/config.").concat(version ? version + '.' : '', "json");
    downloadJson(config, options, function (err, data) {
      if (err) {
        onComplete && onComplete(err);
        return;
      }

      if (data.isZip) {
        var zipVersion = data.zipVersion;
        var zipUrl = "".concat(url, "/res.").concat(zipVersion ? zipVersion + '.' : '', "zip");
        handleZip(zipUrl, options, function (err, unzipPath) {
          if (err) {
            onComplete && onComplete(err);
            return;
          }

          data.base = unzipPath + '/res/'; // PATCH: for android alipay version before v10.1.95 (v10.1.95 included)
          // to remove in the future

          var sys = cc.sys;

          if (sys.platform === sys.ALIPAY_GAME && sys.os === sys.OS_ANDROID) {
            var resPath = unzipPath + 'res/';

            if (fs.accessSync({
              path: resPath
            })) {
              data.base = resPath;
            }
          }

          onComplete && onComplete(null, data);
        });
      } else {
        data.base = url + '/';
        onComplete && onComplete(null, data);
      }
    });
  }
}

;
var originParsePVRTex = parser.parsePVRTex;

var parsePVRTex = function parsePVRTex(file, options, onComplete) {
  readArrayBuffer(file, function (err, data) {
    if (err) return onComplete(err);
    originParsePVRTex(data, options, onComplete);
  });
};

var originParsePKMTex = parser.parsePKMTex;

var parsePKMTex = function parsePKMTex(file, options, onComplete) {
  readArrayBuffer(file, function (err, data) {
    if (err) return onComplete(err);
    originParsePKMTex(data, options, onComplete);
  });
};

function parsePlist(url, options, onComplete) {
  readText(url, function (err, file) {
    var result = null;

    if (!err) {
      result = cc.plistParser.parse(file);
      if (!result) err = new Error('parse failed');
    }

    onComplete && onComplete(err, result);
  });
}

var downloadImage = isSubDomain ? subdomainTransformUrl : downloadAsset;
downloader.downloadDomAudio = downloadDomAudio;
downloader.downloadScript = downloadScript;
parser.parsePVRTex = parsePVRTex;
parser.parsePKMTex = parsePKMTex;
downloader.register({
  '.js': downloadScript,
  // Audio
  '.mp3': downloadAsset,
  '.ogg': downloadAsset,
  '.wav': downloadAsset,
  '.m4a': downloadAsset,
  // Image
  '.png': downloadImage,
  '.jpg': downloadImage,
  '.bmp': downloadImage,
  '.jpeg': downloadImage,
  '.gif': downloadImage,
  '.ico': downloadImage,
  '.tiff': downloadImage,
  '.image': downloadImage,
  '.webp': downloadImage,
  '.pvr': downloadAsset,
  '.pkm': downloadAsset,
  '.font': downloadAsset,
  '.eot': downloadAsset,
  '.ttf': downloadAsset,
  '.woff': downloadAsset,
  '.svg': downloadAsset,
  '.ttc': downloadAsset,
  // Txt
  '.txt': downloadAsset,
  '.xml': downloadAsset,
  '.vsh': downloadAsset,
  '.fsh': downloadAsset,
  '.atlas': downloadAsset,
  '.tmx': downloadAsset,
  '.tsx': downloadAsset,
  '.plist': downloadAsset,
  '.fnt': downloadAsset,
  '.json': downloadJson,
  '.ExportJson': downloadAsset,
  '.binary': downloadAsset,
  '.bin': downloadAsset,
  '.dbbin': downloadAsset,
  '.skel': downloadAsset,
  '.mp4': downloadAsset,
  '.avi': downloadAsset,
  '.mov': downloadAsset,
  '.mpg': downloadAsset,
  '.mpeg': downloadAsset,
  '.rm': downloadAsset,
  '.rmvb': downloadAsset,
  'bundle': downloadBundle,
  'default': downloadText
});
parser.register({
  '.png': downloader.downloadDomImage,
  '.jpg': downloader.downloadDomImage,
  '.bmp': downloader.downloadDomImage,
  '.jpeg': downloader.downloadDomImage,
  '.gif': downloader.downloadDomImage,
  '.ico': downloader.downloadDomImage,
  '.tiff': downloader.downloadDomImage,
  '.image': downloader.downloadDomImage,
  '.webp': downloader.downloadDomImage,
  '.pvr': parsePVRTex,
  '.pkm': parsePKMTex,
  '.font': loadFont,
  '.eot': loadFont,
  '.ttf': loadFont,
  '.woff': loadFont,
  '.svg': loadFont,
  '.ttc': loadFont,
  // Audio
  '.mp3': downloadDomAudio,
  '.ogg': downloadDomAudio,
  '.wav': downloadDomAudio,
  '.m4a': downloadDomAudio,
  // Txt
  '.txt': parseText,
  '.xml': parseText,
  '.vsh': parseText,
  '.fsh': parseText,
  '.atlas': parseText,
  '.tmx': parseText,
  '.tsx': parseText,
  '.fnt': parseText,
  '.plist': parsePlist,
  '.binary': parseArrayBuffer,
  '.bin': parseArrayBuffer,
  '.dbbin': parseArrayBuffer,
  '.skel': parseArrayBuffer,
  '.ExportJson': parseJson
});
var transformUrl = !isSubDomain ? function (url, options) {
  var inLocal = false;
  var inCache = false;
  var isInUserDataPath = url.startsWith(getUserDataPath());

  if (isInUserDataPath) {
    inLocal = true;
  } else if (REGEX.test(url)) {
    if (!options.reload) {
      var cache = cacheManager.cachedFiles.get(url);

      if (cache) {
        inCache = true;
        url = cache.url;
      } else {
        var tempUrl = cacheManager.tempFiles.get(url);

        if (tempUrl) {
          inLocal = true;
          url = tempUrl;
        }
      }
    }
  } else {
    inLocal = true;
  }

  return {
    url: url,
    inLocal: inLocal,
    inCache: inCache
  };
} : function (url, options) {
  if (!REGEX.test(url)) {
    url = SUBCONTEXT_ROOT + '/' + url;
  }

  return {
    url: url
  };
};

if (!isSubDomain) {
  cc.assetManager.transformPipeline.append(function (task) {
    var input = task.output = task.input;

    for (var i = 0, l = input.length; i < l; i++) {
      var item = input[i];
      var options = item.options;

      if (!item.config) {
        if (item.ext === 'bundle') continue;
        options.cacheEnabled = options.cacheEnabled !== undefined ? options.cacheEnabled : false;
      } else {
        options.__cacheBundleRoot__ = item.config.name;
      }
    }
  });
  var originInit = cc.assetManager.init;

  cc.assetManager.init = function (options) {
    originInit.call(cc.assetManager, options);
    options.subpackages && options.subpackages.forEach(function (x) {
      return subpackages[x] = 'subpackages/' + x;
    });
    options.remoteBundles && options.remoteBundles.forEach(function (x) {
      return remoteBundles[x] = true;
    });
    REMOTE_SERVER_ROOT = options.server || '';
    if (REMOTE_SERVER_ROOT && !REMOTE_SERVER_ROOT.endsWith('/')) REMOTE_SERVER_ROOT += '/';
    cacheManager.init();
  };
} else {
  var originInit = cc.assetManager.init;

  cc.assetManager.init = function (options) {
    originInit.call(cc.assetManager, options);
    SUBCONTEXT_ROOT = options.subContextRoot || '';
  };
}

},{"../cache-manager":2}],4:[function(require,module,exports){
"use strict";

var Audio = cc._Audio;

if (Audio) {
  var originGetDuration = Audio.prototype.getDuration;
  Object.assign(Audio.prototype, {
    _createElement: function _createElement() {
      var elem = this._src._nativeAsset; // Reuse dom audio element

      if (!this._element) {
        this._element = __globalAdapter.createInnerAudioContext();
      }

      this._element.src = elem.src;
    },
    destroy: function destroy() {
      if (this._element) {
        this._element.destroy();

        this._element = null;
      }
    },
    setCurrentTime: function setCurrentTime(num) {
      var self = this;
      this._src && this._src._ensureLoaded(function () {
        self._element.seek(num);
      });
    },
    stop: function stop() {
      var self = this;
      this._src && this._src._ensureLoaded(function () {
        // HACK: some platforms won't set currentTime to 0 when stop audio
        self._element.seek(0);

        self._element.stop();

        self._unbindEnded();

        self.emit('stop');
        self._state = Audio.State.STOPPED;
      });
    },
    _bindEnded: function _bindEnded() {
      var elem = this._element;

      if (elem && elem.onEnded && !this._onended._binded) {
        this._onended._binded = true;
        elem.onEnded(this._onended);
      }
    },
    _unbindEnded: function _unbindEnded() {
      var elem = this._element;

      if (elem && elem.offEnded && this._onended._binded) {
        this._onended._binded = false;
        elem.offEnded && elem.offEnded(this._onended);
      }
    },
    getDuration: function getDuration() {
      var duration = originGetDuration.call(this); // HACK: in mini game, if dynamicly load audio, can't get duration from audioClip
      // because duration is not coming from audio deserialization

      duration = duration || (this._element ? this._element.duration : 0);
      return duration;
    },
    // adapt some special operations on web platform
    _touchToPlay: function _touchToPlay() {},
    _forceUpdatingState: function _forceUpdatingState() {}
  });
}

},{}],5:[function(require,module,exports){
"use strict";

if (cc && cc.audioEngine) {
  cc.audioEngine._maxAudioInstance = 10;
}

},{}],6:[function(require,module,exports){
"use strict";

var inputManager = cc.internal.inputManager;
var globalAdapter = window.__globalAdapter;
Object.assign(inputManager, {
  setAccelerometerEnabled: function setAccelerometerEnabled(isEnable) {
    var scheduler = cc.director.getScheduler();
    scheduler.enableForTarget(this);

    if (isEnable) {
      this._registerAccelerometerEvent();

      scheduler.scheduleUpdate(this);
    } else {
      this._unregisterAccelerometerEvent();

      scheduler.unscheduleUpdate(this);
    }
  },
  // No need to adapt
  // setAccelerometerInterval (interval) {  },
  _registerAccelerometerEvent: function _registerAccelerometerEvent() {
    this._accelCurTime = 0;
    var self = this;
    this._acceleration = new cc.Acceleration();
    globalAdapter.startAccelerometer(function (res) {
      self._acceleration.x = res.x;
      self._acceleration.y = res.y;
      self._acceleration.z = res.y;
    });
  },
  _unregisterAccelerometerEvent: function _unregisterAccelerometerEvent() {
    this._accelCurTime = 0;
    globalAdapter.stopAccelerometer();
  }
});

},{}],7:[function(require,module,exports){
"use strict";

(function () {
  if (!(cc && cc.EditBox)) {
    return;
  }

  var EditBox = cc.EditBox;
  var js = cc.js;
  var KeyboardReturnType = EditBox.KeyboardReturnType;
  var MAX_VALUE = 65535;
  var KEYBOARD_HIDE_TIME = 600;
  var _hideKeyboardTimeout = null;
  var _currentEditBoxImpl = null;

  function getKeyboardReturnType(type) {
    switch (type) {
      case KeyboardReturnType.DEFAULT:
      case KeyboardReturnType.DONE:
        return 'done';

      case KeyboardReturnType.SEND:
        return 'send';

      case KeyboardReturnType.SEARCH:
        return 'search';

      case KeyboardReturnType.GO:
        return 'go';

      case KeyboardReturnType.NEXT:
        return 'next';
    }

    return 'done';
  }

  var BaseClass = EditBox._ImplClass;

  function MiniGameEditBoxImpl() {
    BaseClass.call(this);
    this._eventListeners = {
      onKeyboardInput: null,
      onKeyboardConfirm: null,
      onKeyboardComplete: null
    };
  }

  js.extend(MiniGameEditBoxImpl, BaseClass);
  EditBox._ImplClass = MiniGameEditBoxImpl;
  Object.assign(MiniGameEditBoxImpl.prototype, {
    init: function init(delegate) {
      if (!delegate) {
        cc.error('EditBox init failed');
        return;
      }

      this._delegate = delegate;
    },
    beginEditing: function beginEditing() {
      var _this = this;

      // In case multiply register events
      if (this._editing) {
        return;
      }

      this._ensureKeyboardHide(function () {
        var delegate = _this._delegate;

        _this._showKeyboard();

        _this._registerKeyboardEvent();

        _this._editing = true;
        _currentEditBoxImpl = _this;
        delegate.editBoxEditingDidBegan();
      });
    },
    endEditing: function endEditing() {
      this._hideKeyboard();

      var cbs = this._eventListeners;
      cbs.onKeyboardComplete && cbs.onKeyboardComplete();
    },
    _registerKeyboardEvent: function _registerKeyboardEvent() {
      var self = this;
      var delegate = this._delegate;
      var cbs = this._eventListeners;

      cbs.onKeyboardInput = function (res) {
        if (delegate._string !== res.value) {
          delegate.editBoxTextChanged(res.value);
        }
      };

      cbs.onKeyboardConfirm = function (res) {
        delegate.editBoxEditingReturn();
        var cbs = self._eventListeners;
        cbs.onKeyboardComplete && cbs.onKeyboardComplete();
      };

      cbs.onKeyboardComplete = function () {
        self._editing = false;
        _currentEditBoxImpl = null;

        self._unregisterKeyboardEvent();

        delegate.editBoxEditingDidEnded();
      };

      __globalAdapter.onKeyboardInput(cbs.onKeyboardInput);

      __globalAdapter.onKeyboardConfirm(cbs.onKeyboardConfirm);

      __globalAdapter.onKeyboardComplete(cbs.onKeyboardComplete);
    },
    _unregisterKeyboardEvent: function _unregisterKeyboardEvent() {
      var cbs = this._eventListeners;

      if (cbs.onKeyboardInput) {
        __globalAdapter.offKeyboardInput(cbs.onKeyboardInput);

        cbs.onKeyboardInput = null;
      }

      if (cbs.onKeyboardConfirm) {
        __globalAdapter.offKeyboardConfirm(cbs.onKeyboardConfirm);

        cbs.onKeyboardConfirm = null;
      }

      if (cbs.onKeyboardComplete) {
        __globalAdapter.offKeyboardComplete(cbs.onKeyboardComplete);

        cbs.onKeyboardComplete = null;
      }
    },
    _otherEditing: function _otherEditing() {
      return !!_currentEditBoxImpl && _currentEditBoxImpl !== this && _currentEditBoxImpl._editing;
    },
    _ensureKeyboardHide: function _ensureKeyboardHide(cb) {
      var otherEditing = this._otherEditing();

      if (!otherEditing && !_hideKeyboardTimeout) {
        return cb();
      }

      if (_hideKeyboardTimeout) {
        clearTimeout(_hideKeyboardTimeout);
      }

      if (otherEditing) {
        _currentEditBoxImpl.endEditing();
      }

      _hideKeyboardTimeout = setTimeout(function () {
        _hideKeyboardTimeout = null;
        cb();
      }, KEYBOARD_HIDE_TIME);
    },
    _showKeyboard: function _showKeyboard() {
      var delegate = this._delegate;
      var multiline = delegate.inputMode === EditBox.InputMode.ANY;
      var maxLength = delegate.maxLength < 0 ? MAX_VALUE : delegate.maxLength;

      __globalAdapter.showKeyboard({
        defaultValue: delegate._string,
        maxLength: maxLength,
        multiple: multiline,
        confirmHold: false,
        confirmType: getKeyboardReturnType(delegate.returnType),
        success: function success(res) {},
        fail: function fail(res) {
          cc.warn(res.errMsg);
        }
      });
    },
    _hideKeyboard: function _hideKeyboard() {
      __globalAdapter.hideKeyboard({
        success: function success(res) {},
        fail: function fail(res) {
          cc.warn(res.errMsg);
        }
      });
    }
  });
})();

},{}],8:[function(require,module,exports){
"use strict";

var inputManager = cc.internal.inputManager;
var renderer = cc.renderer;
var game = cc.game;
var dynamicAtlasManager = cc.dynamicAtlasManager;
var originRun = game.run;
Object.assign(game, {
  _banRunningMainLoop: __globalAdapter.isSubContext,
  _firstSceneLaunched: false,
  run: function run() {
    var _this = this;

    cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
      _this._firstSceneLaunched = true;
    });
    originRun.apply(this, arguments);
  },
  setFrameRate: function setFrameRate(frameRate) {
    this.config.frameRate = frameRate;

    if (__globalAdapter.setPreferredFramesPerSecond) {
      __globalAdapter.setPreferredFramesPerSecond(frameRate);
    } else {
      if (this._intervalId) {
        window.cancelAnimFrame(this._intervalId);
      }

      this._intervalId = 0;
      this._paused = true;

      this._setAnimFrame();

      this._runMainLoop();
    }
  },
  _runMainLoop: function _runMainLoop() {
    if (this._banRunningMainLoop) {
      return;
    }

    var self = this,
        _callback,
        config = self.config,
        director = cc.director,
        skip = true,
        frameRate = config.frameRate;

    cc.debug.setDisplayStats(config.showFPS);

    _callback = function callback() {
      if (!self._paused) {
        self._intervalId = window.requestAnimFrame(_callback);

        if (frameRate === 30 && !__globalAdapter.setPreferredFramesPerSecond) {
          skip = !skip;

          if (skip) {
            return;
          }
        }

        director.mainLoop();
      }
    };

    self._intervalId = window.requestAnimFrame(_callback);
    self._paused = false;
  },
  _initRenderer: function _initRenderer() {
    // Avoid setup to be called twice.
    if (this._rendererInitialized) return; // frame and container are useless on minigame platform

    this.frame = this.container = document.createElement("DIV");
    var localCanvas;

    if (__globalAdapter.isSubContext) {
      localCanvas = window.sharedCanvas || __globalAdapter.getSharedCanvas();
    } else {
      localCanvas = canvas;
    }

    this.canvas = localCanvas;

    this._determineRenderType(); // WebGL context created successfully


    if (this.renderType === this.RENDER_TYPE_WEBGL) {
      var opts = {
        'stencil': true,
        // MSAA is causing serious performance dropdown on some browsers.
        'antialias': cc.macro.ENABLE_WEBGL_ANTIALIAS,
        'alpha': cc.macro.ENABLE_TRANSPARENT_CANVAS,
        'preserveDrawingBuffer': false
      };
      renderer.initWebGL(localCanvas, opts);
      this._renderContext = renderer.device._gl; // Enable dynamic atlas manager by default

      if (!cc.macro.CLEANUP_IMAGE_CACHE && dynamicAtlasManager) {
        dynamicAtlasManager.enabled = true;
      }
    }

    if (!this._renderContext) {
      this.renderType = this.RENDER_TYPE_CANVAS; // Could be ignored by module settings

      renderer.initCanvas(localCanvas);
      this._renderContext = renderer.device._ctx;
    }

    this._rendererInitialized = true;
  },
  _initEvents: function _initEvents() {
    // register system events
    if (this.config.registerSystemEvent) {
      inputManager.registerSystemEvent(this.canvas);
    }

    var hidden = false;

    function onHidden() {
      if (!hidden) {
        hidden = true;
        game.emit(game.EVENT_HIDE);
      }
    }

    function onShown(res) {
      if (hidden) {
        hidden = false;

        if (game.renderType === game.RENDER_TYPE_WEBGL) {
          game._renderContext.finish();
        }

        game.emit(game.EVENT_SHOW, res);
      }
    }

    __globalAdapter.onAudioInterruptionEnd && __globalAdapter.onAudioInterruptionEnd(function () {
      if (cc.audioEngine) cc.audioEngine._restore();
    });
    __globalAdapter.onAudioInterruptionBegin && __globalAdapter.onAudioInterruptionBegin(function () {
      if (cc.audioEngine) cc.audioEngine._break();
    }); // Maybe not support in open data context

    __globalAdapter.onShow && __globalAdapter.onShow(onShown);
    __globalAdapter.onHide && __globalAdapter.onHide(onHidden);
    this.on(game.EVENT_HIDE, function () {
      game.pause();
    });
    this.on(game.EVENT_SHOW, function () {
      game.resume();
    });
  },
  end: function end() {} // mini game platform not support this api

});

},{}],9:[function(require,module,exports){
"use strict";

var mgr = cc.internal.inputManager;
var canvasPosition = {
  left: 0,
  top: 0,
  width: window.innerWidth,
  height: window.innerHeight
};

if (mgr) {
  Object.assign(mgr, {
    _updateCanvasBoundingRect: function _updateCanvasBoundingRect() {},
    registerSystemEvent: function registerSystemEvent(element) {
      if (this._isRegisterEvent) return;
      this._glView = cc.view;
      var self = this; //register touch event

      var _touchEventsMap = {
        onTouchStart: this.handleTouchesBegin,
        onTouchMove: this.handleTouchesMove,
        onTouchEnd: this.handleTouchesEnd,
        onTouchCancel: this.handleTouchesCancel
      };

      var registerTouchEvent = function registerTouchEvent(eventName) {
        var handler = _touchEventsMap[eventName];

        __globalAdapter[eventName](function (event) {
          if (!event.changedTouches) return;
          handler.call(self, self.getTouchesByEvent(event, canvasPosition));
        });
      };

      for (var eventName in _touchEventsMap) {
        registerTouchEvent(eventName);
      }

      this._isRegisterEvent = true;
    }
  });
}

},{}],10:[function(require,module,exports){
"use strict";

Object.assign(cc.screen, {
  autoFullScreen: function autoFullScreen(element, onFullScreenChange) {// Not support on mini game
  }
});

},{}],11:[function(require,module,exports){
"use strict";

var Texture2D = cc.Texture2D;

if (Texture2D) {
  Object.assign(Texture2D.prototype, {
    initWithElement: function initWithElement(element) {
      if (!element) return;
      this._image = element;
      this.handleLoadedTexture();
    }
  });
}

},{}],12:[function(require,module,exports){
"use strict";

function adaptSys(sys, env) {
  if (!env) {
    env = __globalAdapter.getSystemInfoSync();
  }

  sys.isNative = false;
  sys.isBrowser = false;
  sys.isMobile = true;
  sys.language = env.language.substr(0, 2);
  sys.languageCode = env.language.toLowerCase();
  var system = env.system.toLowerCase();
  var platform = env.platform;
  platform = platform.toLowerCase();

  if (platform === "android") {
    sys.os = sys.OS_ANDROID;
  } else if (platform === "ios") {
    sys.os = sys.OS_IOS;
  } // Adaptation to Android P


  if (system === 'android p') {
    system = 'android p 9.0';
  }

  var version = /[\d\.]+/.exec(system);
  sys.osVersion = version ? version[0] : system;
  sys.osMainVersion = parseInt(sys.osVersion);
  sys.browserType = null;
  sys.browserVersion = null;
  var w = env.windowWidth;
  var h = env.windowHeight;
  var ratio = env.pixelRatio || 1;
  sys.windowPixelResolution = {
    width: ratio * w,
    height: ratio * h
  };
  sys.localStorage = window.localStorage;

  var _supportWebGL = __globalAdapter.isSubContext ? false : true;

  ;
  var _supportWebp = false;

  try {
    var _canvas = document.createElement("canvas");

    _supportWebp = _canvas.toDataURL('image/webp').startsWith('data:image/webp');
  } catch (err) {}

  sys.capabilities = {
    "canvas": true,
    "opengl": !!_supportWebGL,
    "webp": _supportWebp
  };
  sys.__audioSupport = {
    ONLY_ONE: false,
    WEB_AUDIO: false,
    DELAY_CREATE_CTX: false,
    format: ['.mp3']
  };
}

module.exports = adaptSys;

},{}],13:[function(require,module,exports){
"use strict";

function adaptContainerStrategy(containerStrategyProto) {
  containerStrategyProto._setupContainer = function (view, width, height) {
    // Setup pixel ratio for retina display
    var devicePixelRatio = view._devicePixelRatio = 1;

    if (view.isRetinaEnabled()) {
      devicePixelRatio = view._devicePixelRatio = Math.min(view._maxPixelRatio, window.devicePixelRatio || 1);
    } // size of sharedCanvas is readonly in subContext


    if (__globalAdapter.isSubContext) {
      return;
    }

    var locCanvas = cc.game.canvas; // Setup canvas

    width *= devicePixelRatio;
    height *= devicePixelRatio; // FIX: black screen on Baidu platform
    // reset canvas size may call gl.clear(), especially when you call cc.director.loadScene()

    if (locCanvas.width !== width || locCanvas.height !== height) {
      locCanvas.width = width;
      locCanvas.height = height;
    }
  };
}

module.exports = adaptContainerStrategy;

},{}],14:[function(require,module,exports){
"use strict";

function adaptView(viewProto) {
  Object.assign(viewProto, {
    _adjustViewportMeta: function _adjustViewportMeta() {// minigame not support
    },
    setRealPixelResolution: function setRealPixelResolution(width, height, resolutionPolicy) {
      // Reset the resolution size and policy
      this.setDesignResolutionSize(width, height, resolutionPolicy);
    },
    enableAutoFullScreen: function enableAutoFullScreen(enabled) {
      cc.warn('cc.view.enableAutoFullScreen() is not supported on minigame platform.');
    },
    isAutoFullScreenEnabled: function isAutoFullScreenEnabled() {
      return false;
    },
    setCanvasSize: function setCanvasSize() {
      cc.warn('cc.view.setCanvasSize() is not supported on minigame platform.');
    },
    setFrameSize: function setFrameSize() {
      cc.warn('frame size is readonly on minigame platform.');
    },
    _initFrameSize: function _initFrameSize() {
      var locFrameSize = this._frameSize;

      if (__globalAdapter.isSubContext) {
        var sharedCanvas = window.sharedCanvas || __globalAdapter.getSharedCanvas();

        locFrameSize.width = sharedCanvas.width;
        locFrameSize.height = sharedCanvas.height;
      } else {
        locFrameSize.width = window.innerWidth;
        locFrameSize.height = window.innerHeight;
      }
    }
  });
}

module.exports = adaptView;

},{}],15:[function(require,module,exports){
"use strict";

var adapter = window.__globalAdapter;
Object.assign(adapter, {
  adaptSys: require('./BaseSystemInfo'),
  adaptView: require('./View'),
  adaptContainerStrategy: require('./ContainerStrategy')
});

},{"./BaseSystemInfo":12,"./ContainerStrategy":13,"./View":14}],16:[function(require,module,exports){
"use strict";

require('./Audio');

require('./AudioEngine');

require('./DeviceMotionEvent');

require('./Editbox');

require('./Game');

require('./InputManager');

require('./AssetManager');

require('./Screen');

require('./Texture2D');

require('./misc');

},{"./AssetManager":3,"./Audio":4,"./AudioEngine":5,"./DeviceMotionEvent":6,"./Editbox":7,"./Game":8,"./InputManager":9,"./Screen":10,"./Texture2D":11,"./misc":17}],17:[function(require,module,exports){
"use strict";

cc.macro.DOWNLOAD_MAX_CONCURRENT = 10;

},{}],18:[function(require,module,exports){
"use strict";

var utils = {
  /**
   * @param {Object} target 
   * @param {Object} origin 
   * @param {String} methodName 
   * @param {String} targetMethodName 
   */
  cloneMethod: function cloneMethod(target, origin, methodName, targetMethodName) {
    if (origin[methodName]) {
      targetMethodName = targetMethodName || methodName;
      target[targetMethodName] = origin[methodName].bind(origin);
    }
  }
};
module.exports = utils;

},{}],19:[function(require,module,exports){
"use strict";

function DOMParser(options) {
  this.options = options || {
    locator: {}
  };
}

DOMParser.prototype.parseFromString = function (source, mimeType) {
  var options = this.options;
  var sax = new XMLReader();
  var domBuilder = options.domBuilder || new DOMHandler(); //contentHandler and LexicalHandler

  var errorHandler = options.errorHandler;
  var locator = options.locator;
  var defaultNSMap = options.xmlns || {};
  var isHTML = /\/x?html?$/.test(mimeType); //mimeType.toLowerCase().indexOf('html') > -1;

  var entityMap = isHTML ? htmlEntity.entityMap : {
    'lt': '<',
    'gt': '>',
    'amp': '&',
    'quot': '"',
    'apos': "'"
  };

  if (locator) {
    domBuilder.setDocumentLocator(locator);
  }

  sax.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
  sax.domBuilder = options.domBuilder || domBuilder;

  if (isHTML) {
    defaultNSMap[''] = 'http://www.w3.org/1999/xhtml';
  }

  defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace';

  if (source) {
    sax.parse(source, defaultNSMap, entityMap);
  } else {
    sax.errorHandler.error("invalid doc source");
  }

  return domBuilder.doc;
};

function buildErrorHandler(errorImpl, domBuilder, locator) {
  if (!errorImpl) {
    if (domBuilder instanceof DOMHandler) {
      return domBuilder;
    }

    errorImpl = domBuilder;
  }

  var errorHandler = {};
  var isCallback = errorImpl instanceof Function;
  locator = locator || {};

  function build(key) {
    var fn = errorImpl[key];

    if (!fn && isCallback) {
      fn = errorImpl.length == 2 ? function (msg) {
        errorImpl(key, msg);
      } : errorImpl;
    }

    errorHandler[key] = fn && function (msg) {
      fn('[xmldom ' + key + ']\t' + msg + _locator(locator));
    } || function () {};
  }

  build('warning');
  build('error');
  build('fatalError');
  return errorHandler;
} //console.log('#\n\n\n\n\n\n\n####')

/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler 
 * 
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */


function DOMHandler() {
  this.cdata = false;
}

function position(locator, node) {
  node.lineNumber = locator.lineNumber;
  node.columnNumber = locator.columnNumber;
}
/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */


DOMHandler.prototype = {
  startDocument: function startDocument() {
    this.doc = new DOMImplementation().createDocument(null, null, null);

    if (this.locator) {
      this.doc.documentURI = this.locator.systemId;
    }
  },
  startElement: function startElement(namespaceURI, localName, qName, attrs) {
    var doc = this.doc;
    var el = doc.createElementNS(namespaceURI, qName || localName);
    var len = attrs.length;
    appendElement(this, el);
    this.currentElement = el;
    this.locator && position(this.locator, el);

    for (var i = 0; i < len; i++) {
      var namespaceURI = attrs.getURI(i);
      var value = attrs.getValue(i);
      var qName = attrs.getQName(i);
      var attr = doc.createAttributeNS(namespaceURI, qName);
      this.locator && position(attrs.getLocator(i), attr);
      attr.value = attr.nodeValue = value;
      el.setAttributeNode(attr);
    }
  },
  endElement: function endElement(namespaceURI, localName, qName) {
    var current = this.currentElement;
    var tagName = current.tagName;
    this.currentElement = current.parentNode;
  },
  startPrefixMapping: function startPrefixMapping(prefix, uri) {},
  endPrefixMapping: function endPrefixMapping(prefix) {},
  processingInstruction: function processingInstruction(target, data) {
    var ins = this.doc.createProcessingInstruction(target, data);
    this.locator && position(this.locator, ins);
    appendElement(this, ins);
  },
  ignorableWhitespace: function ignorableWhitespace(ch, start, length) {},
  characters: function characters(chars, start, length) {
    chars = _toString.apply(this, arguments); //console.log(chars)

    if (chars) {
      if (this.cdata) {
        var charNode = this.doc.createCDATASection(chars);
      } else {
        var charNode = this.doc.createTextNode(chars);
      }

      if (this.currentElement) {
        this.currentElement.appendChild(charNode);
      } else if (/^\s*$/.test(chars)) {
        this.doc.appendChild(charNode); //process xml
      }

      this.locator && position(this.locator, charNode);
    }
  },
  skippedEntity: function skippedEntity(name) {},
  endDocument: function endDocument() {
    this.doc.normalize();
  },
  setDocumentLocator: function setDocumentLocator(locator) {
    if (this.locator = locator) {
      // && !('lineNumber' in locator)){
      locator.lineNumber = 0;
    }
  },
  //LexicalHandler
  comment: function comment(chars, start, length) {
    chars = _toString.apply(this, arguments);
    var comm = this.doc.createComment(chars);
    this.locator && position(this.locator, comm);
    appendElement(this, comm);
  },
  startCDATA: function startCDATA() {
    //used in characters() methods
    this.cdata = true;
  },
  endCDATA: function endCDATA() {
    this.cdata = false;
  },
  startDTD: function startDTD(name, publicId, systemId) {
    var impl = this.doc.implementation;

    if (impl && impl.createDocumentType) {
      var dt = impl.createDocumentType(name, publicId, systemId);
      this.locator && position(this.locator, dt);
      appendElement(this, dt);
    }
  },

  /**
   * @see org.xml.sax.ErrorHandler
   * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
   */
  warning: function warning(error) {
    console.warn('[xmldom warning]\t' + error, _locator(this.locator));
  },
  error: function error(_error) {
    console.error('[xmldom error]\t' + _error, _locator(this.locator));
  },
  fatalError: function fatalError(error) {
    console.error('[xmldom fatalError]\t' + error, _locator(this.locator));
    throw error;
  }
};

function _locator(l) {
  if (l) {
    return '\n@' + (l.systemId || '') + '#[line:' + l.lineNumber + ',col:' + l.columnNumber + ']';
  }
}

function _toString(chars, start, length) {
  if (typeof chars == 'string') {
    return chars.substr(start, length);
  } else {
    //java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
    if (chars.length >= start + length || start) {
      return new java.lang.String(chars, start, length) + '';
    }

    return chars;
  }
}
/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */


"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function (key) {
  DOMHandler.prototype[key] = function () {
    return null;
  };
});
/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */

function appendElement(hander, node) {
  if (!hander.currentElement) {
    hander.doc.appendChild(node);
  } else {
    hander.currentElement.appendChild(node);
  }
} //appendChild and setAttributeNS are preformance key
//if(typeof require == 'function'){


var htmlEntity = require('./entities');

var XMLReader = require('./sax').XMLReader;

var DOMImplementation = exports.DOMImplementation = require('./dom').DOMImplementation;

exports.XMLSerializer = require('./dom').XMLSerializer;
exports.DOMParser = DOMParser; //}

},{"./dom":20,"./entities":21,"./sax":22}],20:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 */
function copy(src, dest) {
  for (var p in src) {
    dest[p] = src[p];
  }
}
/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */


function _extends(Class, Super) {
  var pt = Class.prototype;

  if (!(pt instanceof Super)) {
    var t = function t() {};

    ;
    t.prototype = Super.prototype;
    t = new t(); // copy(pt,t);

    for (var p in pt) {
      t[p] = pt[p];
    }

    Class.prototype = pt = t;
  }

  if (pt.constructor != Class) {
    if (typeof Class != 'function') {
      console.error("unknow Class:" + Class);
    }

    pt.constructor = Class;
  }
}

var htmlns = 'http://www.w3.org/1999/xhtml'; // Node Types

var NodeType = {};
var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
var TEXT_NODE = NodeType.TEXT_NODE = 3;
var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
var NOTATION_NODE = NodeType.NOTATION_NODE = 12; // ExceptionCode

var ExceptionCode = {};
var ExceptionMessage = {};
var INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
var DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
var WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
var NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
var NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10); //level2

var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
var SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
var INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
var NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
var INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);

function DOMException(code, message) {
  if (message instanceof Error) {
    var error = message;
  } else {
    error = this;
    Error.call(this, ExceptionMessage[code]);
    this.message = ExceptionMessage[code];
    if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
  }

  error.code = code;
  if (message) this.message = this.message + ": " + message;
  return error;
}

;
DOMException.prototype = Error.prototype;
copy(ExceptionCode, DOMException);
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */

function NodeList() {}

;
NodeList.prototype = {
  /**
   * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
   * @standard level1
   */
  length: 0,

  /**
   * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
   * @standard level1
   * @param index  unsigned long 
   *   Index into the collection.
   * @return Node
   * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
   */
  item: function item(index) {
    return this[index] || null;
  },
  toString: function toString(isHTML, nodeFilter) {
    for (var buf = [], i = 0; i < this.length; i++) {
      serializeToString(this[i], buf, isHTML, nodeFilter);
    }

    return buf.join('');
  }
};

function LiveNodeList(node, refresh) {
  this._node = node;
  this._refresh = refresh;

  _updateLiveList(this);
}

function _updateLiveList(list) {
  var inc = list._node._inc || list._node.ownerDocument._inc;

  if (list._inc != inc) {
    var ls = list._refresh(list._node); //console.log(ls.length)


    __set__(list, 'length', ls.length); //copy(ls,list);


    for (var p in ls) {
      list[p] = ls[p];
    }

    list._inc = inc;
  }
}

LiveNodeList.prototype.item = function (i) {
  _updateLiveList(this);

  return this[i];
};

_extends(LiveNodeList, NodeList);
/**
 * 
 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities 
 */


function NamedNodeMap() {}

;

function _findNodeIndex(list, node) {
  var i = list.length;

  while (i--) {
    if (list[i] === node) {
      return i;
    }
  }
}

function _addNamedNode(el, list, newAttr, oldAttr) {
  if (oldAttr) {
    list[_findNodeIndex(list, oldAttr)] = newAttr;
  } else {
    list[list.length++] = newAttr;
  }

  if (el) {
    newAttr.ownerElement = el;
    var doc = el.ownerDocument;

    if (doc) {
      oldAttr && _onRemoveAttribute(doc, el, oldAttr);

      _onAddAttribute(doc, el, newAttr);
    }
  }
}

function _removeNamedNode(el, list, attr) {
  //console.log('remove attr:'+attr)
  var i = _findNodeIndex(list, attr);

  if (i >= 0) {
    var lastIndex = list.length - 1;

    while (i < lastIndex) {
      list[i] = list[++i];
    }

    list.length = lastIndex;

    if (el) {
      var doc = el.ownerDocument;

      if (doc) {
        _onRemoveAttribute(doc, el, attr);

        attr.ownerElement = null;
      }
    }
  } else {
    throw DOMException(NOT_FOUND_ERR, new Error(el.tagName + '@' + attr));
  }
}

NamedNodeMap.prototype = {
  length: 0,
  item: NodeList.prototype.item,
  getNamedItem: function getNamedItem(key) {
    //		if(key.indexOf(':')>0 || key == 'xmlns'){
    //			return null;
    //		}
    //console.log()
    var i = this.length;

    while (i--) {
      var attr = this[i]; //console.log(attr.nodeName,key)

      if (attr.nodeName == key) {
        return attr;
      }
    }
  },
  setNamedItem: function setNamedItem(attr) {
    var el = attr.ownerElement;

    if (el && el != this._ownerElement) {
      throw new DOMException(INUSE_ATTRIBUTE_ERR);
    }

    var oldAttr = this.getNamedItem(attr.nodeName);

    _addNamedNode(this._ownerElement, this, attr, oldAttr);

    return oldAttr;
  },

  /* returns Node */
  setNamedItemNS: function setNamedItemNS(attr) {
    // raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
    var el = attr.ownerElement,
        oldAttr;

    if (el && el != this._ownerElement) {
      throw new DOMException(INUSE_ATTRIBUTE_ERR);
    }

    oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);

    _addNamedNode(this._ownerElement, this, attr, oldAttr);

    return oldAttr;
  },

  /* returns Node */
  removeNamedItem: function removeNamedItem(key) {
    var attr = this.getNamedItem(key);

    _removeNamedNode(this._ownerElement, this, attr);

    return attr;
  },
  // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
  //for level2
  removeNamedItemNS: function removeNamedItemNS(namespaceURI, localName) {
    var attr = this.getNamedItemNS(namespaceURI, localName);

    _removeNamedNode(this._ownerElement, this, attr);

    return attr;
  },
  getNamedItemNS: function getNamedItemNS(namespaceURI, localName) {
    var i = this.length;

    while (i--) {
      var node = this[i];

      if (node.localName == localName && node.namespaceURI == namespaceURI) {
        return node;
      }
    }

    return null;
  }
};
/**
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
 */

function DOMImplementation(
/* Object */
features) {
  this._features = {};

  if (features) {
    for (var feature in features) {
      this._features = features[feature];
    }
  }
}

;
DOMImplementation.prototype = {
  hasFeature: function hasFeature(
  /* string */
  feature,
  /* string */
  version) {
    var versions = this._features[feature.toLowerCase()];

    if (versions && (!version || version in versions)) {
      return true;
    } else {
      return false;
    }
  },
  // Introduced in DOM Level 2:
  createDocument: function createDocument(namespaceURI, qualifiedName, doctype) {
    // raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
    var doc = new Document();
    doc.implementation = this;
    doc.childNodes = new NodeList();
    doc.doctype = doctype;

    if (doctype) {
      doc.appendChild(doctype);
    }

    if (qualifiedName) {
      var root = doc.createElementNS(namespaceURI, qualifiedName);
      doc.appendChild(root);
    }

    return doc;
  },
  // Introduced in DOM Level 2:
  createDocumentType: function createDocumentType(qualifiedName, publicId, systemId) {
    // raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
    var node = new DocumentType();
    node.name = qualifiedName;
    node.nodeName = qualifiedName;
    node.publicId = publicId;
    node.systemId = systemId; // Introduced in DOM Level 2:
    //readonly attribute DOMString        internalSubset;
    //TODO:..
    //  readonly attribute NamedNodeMap     entities;
    //  readonly attribute NamedNodeMap     notations;

    return node;
  }
};
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {}

;
Node.prototype = {
  firstChild: null,
  lastChild: null,
  previousSibling: null,
  nextSibling: null,
  attributes: null,
  parentNode: null,
  childNodes: null,
  ownerDocument: null,
  nodeValue: null,
  namespaceURI: null,
  prefix: null,
  localName: null,
  // Modified in DOM Level 2:
  insertBefore: function insertBefore(newChild, refChild) {
    //raises 
    return _insertBefore(this, newChild, refChild);
  },
  replaceChild: function replaceChild(newChild, oldChild) {
    //raises 
    this.insertBefore(newChild, oldChild);

    if (oldChild) {
      this.removeChild(oldChild);
    }
  },
  removeChild: function removeChild(oldChild) {
    return _removeChild(this, oldChild);
  },
  appendChild: function appendChild(newChild) {
    return this.insertBefore(newChild, null);
  },
  hasChildNodes: function hasChildNodes() {
    return this.firstChild != null;
  },
  cloneNode: function cloneNode(deep) {
    return _cloneNode(this.ownerDocument || this, this, deep);
  },
  // Modified in DOM Level 2:
  normalize: function normalize() {
    var child = this.firstChild;

    while (child) {
      var next = child.nextSibling;

      if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
        this.removeChild(next);
        child.appendData(next.data);
      } else {
        child.normalize();
        child = next;
      }
    }
  },
  // Introduced in DOM Level 2:
  isSupported: function isSupported(feature, version) {
    return this.ownerDocument.implementation.hasFeature(feature, version);
  },
  // Introduced in DOM Level 2:
  hasAttributes: function hasAttributes() {
    return this.attributes.length > 0;
  },
  lookupPrefix: function lookupPrefix(namespaceURI) {
    var el = this;

    while (el) {
      var map = el._nsMap; //console.dir(map)

      if (map) {
        for (var n in map) {
          if (map[n] == namespaceURI) {
            return n;
          }
        }
      }

      el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
    }

    return null;
  },
  // Introduced in DOM Level 3:
  lookupNamespaceURI: function lookupNamespaceURI(prefix) {
    var el = this;

    while (el) {
      var map = el._nsMap; //console.dir(map)

      if (map) {
        if (prefix in map) {
          return map[prefix];
        }
      }

      el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
    }

    return null;
  },
  // Introduced in DOM Level 3:
  isDefaultNamespace: function isDefaultNamespace(namespaceURI) {
    var prefix = this.lookupPrefix(namespaceURI);
    return prefix == null;
  }
};

function _xmlEncoder(c) {
  return c == '<' && '&lt;' || c == '>' && '&gt;' || c == '&' && '&amp;' || c == '"' && '&quot;' || '&#' + c.charCodeAt() + ';';
}

copy(NodeType, Node);
copy(NodeType, Node.prototype);
/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */

function _visitNode(node, callback) {
  if (callback(node)) {
    return true;
  }

  if (node = node.firstChild) {
    do {
      if (_visitNode(node, callback)) {
        return true;
      }
    } while (node = node.nextSibling);
  }
}

function Document() {}

function _onAddAttribute(doc, el, newAttr) {
  doc && doc._inc++;
  var ns = newAttr.namespaceURI;

  if (ns == 'http://www.w3.org/2000/xmlns/') {
    //update namespace
    el._nsMap[newAttr.prefix ? newAttr.localName : ''] = newAttr.value;
  }
}

function _onRemoveAttribute(doc, el, newAttr, remove) {
  doc && doc._inc++;
  var ns = newAttr.namespaceURI;

  if (ns == 'http://www.w3.org/2000/xmlns/') {
    //update namespace
    delete el._nsMap[newAttr.prefix ? newAttr.localName : ''];
  }
}

function _onUpdateChild(doc, el, newChild) {
  if (doc && doc._inc) {
    doc._inc++; //update childNodes

    var cs = el.childNodes;

    if (newChild) {
      cs[cs.length++] = newChild;
    } else {
      //console.log(1)
      var child = el.firstChild;
      var i = 0;

      while (child) {
        cs[i++] = child;
        child = child.nextSibling;
      }

      cs.length = i;
    }
  }
}
/**
 * attributes;
 * children;
 * 
 * writeable properties:
 * nodeValue,Attr:value,CharacterData:data
 * prefix
 */


function _removeChild(parentNode, child) {
  var previous = child.previousSibling;
  var next = child.nextSibling;

  if (previous) {
    previous.nextSibling = next;
  } else {
    parentNode.firstChild = next;
  }

  if (next) {
    next.previousSibling = previous;
  } else {
    parentNode.lastChild = previous;
  }

  _onUpdateChild(parentNode.ownerDocument, parentNode);

  return child;
}
/**
 * preformance key(refChild == null)
 */


function _insertBefore(parentNode, newChild, nextChild) {
  var cp = newChild.parentNode;

  if (cp) {
    cp.removeChild(newChild); //remove and update
  }

  if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
    var newFirst = newChild.firstChild;

    if (newFirst == null) {
      return newChild;
    }

    var newLast = newChild.lastChild;
  } else {
    newFirst = newLast = newChild;
  }

  var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;
  newFirst.previousSibling = pre;
  newLast.nextSibling = nextChild;

  if (pre) {
    pre.nextSibling = newFirst;
  } else {
    parentNode.firstChild = newFirst;
  }

  if (nextChild == null) {
    parentNode.lastChild = newLast;
  } else {
    nextChild.previousSibling = newLast;
  }

  do {
    newFirst.parentNode = parentNode;
  } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));

  _onUpdateChild(parentNode.ownerDocument || parentNode, parentNode); //console.log(parentNode.lastChild.nextSibling == null)


  if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
    newChild.firstChild = newChild.lastChild = null;
  }

  return newChild;
}

function _appendSingleChild(parentNode, newChild) {
  var cp = newChild.parentNode;

  if (cp) {
    var pre = parentNode.lastChild;
    cp.removeChild(newChild); //remove and update

    var pre = parentNode.lastChild;
  }

  var pre = parentNode.lastChild;
  newChild.parentNode = parentNode;
  newChild.previousSibling = pre;
  newChild.nextSibling = null;

  if (pre) {
    pre.nextSibling = newChild;
  } else {
    parentNode.firstChild = newChild;
  }

  parentNode.lastChild = newChild;

  _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);

  return newChild; //console.log("__aa",parentNode.lastChild.nextSibling == null)
}

Document.prototype = {
  //implementation : null,
  nodeName: '#document',
  nodeType: DOCUMENT_NODE,
  doctype: null,
  documentElement: null,
  _inc: 1,
  insertBefore: function insertBefore(newChild, refChild) {
    //raises 
    if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
      var child = newChild.firstChild;

      while (child) {
        var next = child.nextSibling;
        this.insertBefore(child, refChild);
        child = next;
      }

      return newChild;
    }

    if (this.documentElement == null && newChild.nodeType == ELEMENT_NODE) {
      this.documentElement = newChild;
    }

    return _insertBefore(this, newChild, refChild), newChild.ownerDocument = this, newChild;
  },
  removeChild: function removeChild(oldChild) {
    if (this.documentElement == oldChild) {
      this.documentElement = null;
    }

    return _removeChild(this, oldChild);
  },
  // Introduced in DOM Level 2:
  importNode: function importNode(importedNode, deep) {
    return _importNode(this, importedNode, deep);
  },
  // Introduced in DOM Level 2:
  getElementById: function getElementById(id) {
    var rtv = null;

    _visitNode(this.documentElement, function (node) {
      if (node.nodeType == ELEMENT_NODE) {
        if (node.getAttribute('id') == id) {
          rtv = node;
          return true;
        }
      }
    });

    return rtv;
  },
  //document factory method:
  createElement: function createElement(tagName) {
    var node = new Element();
    node.ownerDocument = this;
    node.nodeName = tagName;
    node.tagName = tagName;
    node.childNodes = new NodeList();
    var attrs = node.attributes = new NamedNodeMap();
    attrs._ownerElement = node;
    return node;
  },
  createDocumentFragment: function createDocumentFragment() {
    var node = new DocumentFragment();
    node.ownerDocument = this;
    node.childNodes = new NodeList();
    return node;
  },
  createTextNode: function createTextNode(data) {
    var node = new Text();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  },
  createComment: function createComment(data) {
    var node = new Comment();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  },
  createCDATASection: function createCDATASection(data) {
    var node = new CDATASection();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  },
  createProcessingInstruction: function createProcessingInstruction(target, data) {
    var node = new ProcessingInstruction();
    node.ownerDocument = this;
    node.tagName = node.target = target;
    node.nodeValue = node.data = data;
    return node;
  },
  createAttribute: function createAttribute(name) {
    var node = new Attr();
    node.ownerDocument = this;
    node.name = name;
    node.nodeName = name;
    node.localName = name;
    node.specified = true;
    return node;
  },
  createEntityReference: function createEntityReference(name) {
    var node = new EntityReference();
    node.ownerDocument = this;
    node.nodeName = name;
    return node;
  },
  // Introduced in DOM Level 2:
  createElementNS: function createElementNS(namespaceURI, qualifiedName) {
    var node = new Element();
    var pl = qualifiedName.split(':');
    var attrs = node.attributes = new NamedNodeMap();
    node.childNodes = new NodeList();
    node.ownerDocument = this;
    node.nodeName = qualifiedName;
    node.tagName = qualifiedName;
    node.namespaceURI = namespaceURI;

    if (pl.length == 2) {
      node.prefix = pl[0];
      node.localName = pl[1];
    } else {
      //el.prefix = null;
      node.localName = qualifiedName;
    }

    attrs._ownerElement = node;
    return node;
  },
  // Introduced in DOM Level 2:
  createAttributeNS: function createAttributeNS(namespaceURI, qualifiedName) {
    var node = new Attr();
    var pl = qualifiedName.split(':');
    node.ownerDocument = this;
    node.nodeName = qualifiedName;
    node.name = qualifiedName;
    node.namespaceURI = namespaceURI;
    node.specified = true;

    if (pl.length == 2) {
      node.prefix = pl[0];
      node.localName = pl[1];
    } else {
      //el.prefix = null;
      node.localName = qualifiedName;
    }

    return node;
  }
};

_extends(Document, Node);

function Element() {
  this._nsMap = {};
}

;
Element.prototype = {
  nodeType: ELEMENT_NODE,
  hasAttribute: function hasAttribute(name) {
    return this.getAttributeNode(name) != null;
  },
  getAttribute: function getAttribute(name) {
    var attr = this.getAttributeNode(name);
    return attr && attr.value || '';
  },
  getAttributeNode: function getAttributeNode(name) {
    return this.attributes.getNamedItem(name);
  },
  setAttribute: function setAttribute(name, value) {
    var attr = this.ownerDocument.createAttribute(name);
    attr.value = attr.nodeValue = "" + value;
    this.setAttributeNode(attr);
  },
  removeAttribute: function removeAttribute(name) {
    var attr = this.getAttributeNode(name);
    attr && this.removeAttributeNode(attr);
  },
  //four real opeartion method
  appendChild: function appendChild(newChild) {
    if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return this.insertBefore(newChild, null);
    } else {
      return _appendSingleChild(this, newChild);
    }
  },
  setAttributeNode: function setAttributeNode(newAttr) {
    return this.attributes.setNamedItem(newAttr);
  },
  setAttributeNodeNS: function setAttributeNodeNS(newAttr) {
    return this.attributes.setNamedItemNS(newAttr);
  },
  removeAttributeNode: function removeAttributeNode(oldAttr) {
    //console.log(this == oldAttr.ownerElement)
    return this.attributes.removeNamedItem(oldAttr.nodeName);
  },
  //get real attribute name,and remove it by removeAttributeNode
  removeAttributeNS: function removeAttributeNS(namespaceURI, localName) {
    var old = this.getAttributeNodeNS(namespaceURI, localName);
    old && this.removeAttributeNode(old);
  },
  hasAttributeNS: function hasAttributeNS(namespaceURI, localName) {
    return this.getAttributeNodeNS(namespaceURI, localName) != null;
  },
  getAttributeNS: function getAttributeNS(namespaceURI, localName) {
    var attr = this.getAttributeNodeNS(namespaceURI, localName);
    return attr && attr.value || '';
  },
  setAttributeNS: function setAttributeNS(namespaceURI, qualifiedName, value) {
    var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
    attr.value = attr.nodeValue = "" + value;
    this.setAttributeNode(attr);
  },
  getAttributeNodeNS: function getAttributeNodeNS(namespaceURI, localName) {
    return this.attributes.getNamedItemNS(namespaceURI, localName);
  },
  getElementsByTagName: function getElementsByTagName(tagName) {
    return new LiveNodeList(this, function (base) {
      var ls = [];

      _visitNode(base, function (node) {
        if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)) {
          ls.push(node);
        }
      });

      return ls;
    });
  },
  getElementsByTagNameNS: function getElementsByTagNameNS(namespaceURI, localName) {
    return new LiveNodeList(this, function (base) {
      var ls = [];

      _visitNode(base, function (node) {
        if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)) {
          ls.push(node);
        }
      });

      return ls;
    });
  }
};
Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;

_extends(Element, Node);

function Attr() {}

;
Attr.prototype.nodeType = ATTRIBUTE_NODE;

_extends(Attr, Node);

function CharacterData() {}

;
CharacterData.prototype = {
  data: '',
  substringData: function substringData(offset, count) {
    return this.data.substring(offset, offset + count);
  },
  appendData: function appendData(text) {
    text = this.data + text;
    this.nodeValue = this.data = text;
    this.length = text.length;
  },
  insertData: function insertData(offset, text) {
    this.replaceData(offset, 0, text);
  },
  appendChild: function appendChild(newChild) {
    throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
  },
  deleteData: function deleteData(offset, count) {
    this.replaceData(offset, count, "");
  },
  replaceData: function replaceData(offset, count, text) {
    var start = this.data.substring(0, offset);
    var end = this.data.substring(offset + count);
    text = start + text + end;
    this.nodeValue = this.data = text;
    this.length = text.length;
  }
};

_extends(CharacterData, Node);

function Text() {}

;
Text.prototype = {
  nodeName: "#text",
  nodeType: TEXT_NODE,
  splitText: function splitText(offset) {
    var text = this.data;
    var newText = text.substring(offset);
    text = text.substring(0, offset);
    this.data = this.nodeValue = text;
    this.length = text.length;
    var newNode = this.ownerDocument.createTextNode(newText);

    if (this.parentNode) {
      this.parentNode.insertBefore(newNode, this.nextSibling);
    }

    return newNode;
  }
};

_extends(Text, CharacterData);

function Comment() {}

;
Comment.prototype = {
  nodeName: "#comment",
  nodeType: COMMENT_NODE
};

_extends(Comment, CharacterData);

function CDATASection() {}

;
CDATASection.prototype = {
  nodeName: "#cdata-section",
  nodeType: CDATA_SECTION_NODE
};

_extends(CDATASection, CharacterData);

function DocumentType() {}

;
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;

_extends(DocumentType, Node);

function Notation() {}

;
Notation.prototype.nodeType = NOTATION_NODE;

_extends(Notation, Node);

function Entity() {}

;
Entity.prototype.nodeType = ENTITY_NODE;

_extends(Entity, Node);

function EntityReference() {}

;
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;

_extends(EntityReference, Node);

function DocumentFragment() {}

;
DocumentFragment.prototype.nodeName = "#document-fragment";
DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;

_extends(DocumentFragment, Node);

function ProcessingInstruction() {}

ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;

_extends(ProcessingInstruction, Node);

function XMLSerializer() {}

XMLSerializer.prototype.serializeToString = function (node, isHtml, nodeFilter) {
  return nodeSerializeToString.call(node, isHtml, nodeFilter);
};

Node.prototype.toString = nodeSerializeToString;

function nodeSerializeToString(isHtml, nodeFilter) {
  var buf = [];
  var refNode = this.nodeType == 9 && this.documentElement || this;
  var prefix = refNode.prefix;
  var uri = refNode.namespaceURI;

  if (uri && prefix == null) {
    //console.log(prefix)
    var prefix = refNode.lookupPrefix(uri);

    if (prefix == null) {
      //isHTML = true;
      var visibleNamespaces = [{
        namespace: uri,
        prefix: null
      } //{namespace:uri,prefix:''}
      ];
    }
  }

  serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces); //console.log('###',this.nodeType,uri,prefix,buf.join(''))

  return buf.join('');
}

function needNamespaceDefine(node, isHTML, visibleNamespaces) {
  var prefix = node.prefix || '';
  var uri = node.namespaceURI;

  if (!prefix && !uri) {
    return false;
  }

  if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace" || uri == 'http://www.w3.org/2000/xmlns/') {
    return false;
  }

  var i = visibleNamespaces.length; //console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)

  while (i--) {
    var ns = visibleNamespaces[i]; // get namespace prefix
    //console.log(node.nodeType,node.tagName,ns.prefix,prefix)

    if (ns.prefix == prefix) {
      return ns.namespace != uri;
    }
  } //console.log(isHTML,uri,prefix=='')
  //if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
  //	return false;
  //}
  //node.flag = '11111'
  //console.error(3,true,node.flag,node.prefix,node.namespaceURI)


  return true;
}

function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
  if (nodeFilter) {
    node = nodeFilter(node);

    if (node) {
      if (typeof node == 'string') {
        buf.push(node);
        return;
      }
    } else {
      return;
    } //buf.sort.apply(attrs, attributeSorter);

  }

  switch (node.nodeType) {
    case ELEMENT_NODE:
      if (!visibleNamespaces) visibleNamespaces = [];
      var startVisibleNamespaces = visibleNamespaces.length;
      var attrs = node.attributes;
      var len = attrs.length;
      var child = node.firstChild;
      var nodeName = node.tagName;
      isHTML = htmlns === node.namespaceURI || isHTML;
      buf.push('<', nodeName);

      for (var i = 0; i < len; i++) {
        // add namespaces for attributes
        var attr = attrs.item(i);

        if (attr.prefix == 'xmlns') {
          visibleNamespaces.push({
            prefix: attr.localName,
            namespace: attr.value
          });
        } else if (attr.nodeName == 'xmlns') {
          visibleNamespaces.push({
            prefix: '',
            namespace: attr.value
          });
        }
      }

      for (var i = 0; i < len; i++) {
        var attr = attrs.item(i);

        if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
          var prefix = attr.prefix || '';
          var uri = attr.namespaceURI;
          var ns = prefix ? ' xmlns:' + prefix : " xmlns";
          buf.push(ns, '="', uri, '"');
          visibleNamespaces.push({
            prefix: prefix,
            namespace: uri
          });
        }

        serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
      } // add namespace for current node		


      if (needNamespaceDefine(node, isHTML, visibleNamespaces)) {
        var prefix = node.prefix || '';
        var uri = node.namespaceURI;
        var ns = prefix ? ' xmlns:' + prefix : " xmlns";
        buf.push(ns, '="', uri, '"');
        visibleNamespaces.push({
          prefix: prefix,
          namespace: uri
        });
      }

      if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
        buf.push('>'); //if is cdata child node

        if (isHTML && /^script$/i.test(nodeName)) {
          while (child) {
            if (child.data) {
              buf.push(child.data);
            } else {
              serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
            }

            child = child.nextSibling;
          }
        } else {
          while (child) {
            serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
            child = child.nextSibling;
          }
        }

        buf.push('</', nodeName, '>');
      } else {
        buf.push('/>');
      } // remove added visible namespaces
      //visibleNamespaces.length = startVisibleNamespaces;


      return;

    case DOCUMENT_NODE:
    case DOCUMENT_FRAGMENT_NODE:
      var child = node.firstChild;

      while (child) {
        serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
        child = child.nextSibling;
      }

      return;

    case ATTRIBUTE_NODE:
      return buf.push(' ', node.name, '="', node.value.replace(/[<&"]/g, _xmlEncoder), '"');

    case TEXT_NODE:
      return buf.push(node.data.replace(/[<&]/g, _xmlEncoder));

    case CDATA_SECTION_NODE:
      return buf.push('<![CDATA[', node.data, ']]>');

    case COMMENT_NODE:
      return buf.push("<!--", node.data, "-->");

    case DOCUMENT_TYPE_NODE:
      var pubid = node.publicId;
      var sysid = node.systemId;
      buf.push('<!DOCTYPE ', node.name);

      if (pubid) {
        buf.push(' PUBLIC "', pubid);

        if (sysid && sysid != '.') {
          buf.push('" "', sysid);
        }

        buf.push('">');
      } else if (sysid && sysid != '.') {
        buf.push(' SYSTEM "', sysid, '">');
      } else {
        var sub = node.internalSubset;

        if (sub) {
          buf.push(" [", sub, "]");
        }

        buf.push(">");
      }

      return;

    case PROCESSING_INSTRUCTION_NODE:
      return buf.push("<?", node.target, " ", node.data, "?>");

    case ENTITY_REFERENCE_NODE:
      return buf.push('&', node.nodeName, ';');
    //case ENTITY_NODE:
    //case NOTATION_NODE:

    default:
      buf.push('??', node.nodeName);
  }
}

function _importNode(doc, node, deep) {
  var node2;

  switch (node.nodeType) {
    case ELEMENT_NODE:
      node2 = node.cloneNode(false);
      node2.ownerDocument = doc;
    //var attrs = node2.attributes;
    //var len = attrs.length;
    //for(var i=0;i<len;i++){
    //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
    //}

    case DOCUMENT_FRAGMENT_NODE:
      break;

    case ATTRIBUTE_NODE:
      deep = true;
      break;
    //case ENTITY_REFERENCE_NODE:
    //case PROCESSING_INSTRUCTION_NODE:
    ////case TEXT_NODE:
    //case CDATA_SECTION_NODE:
    //case COMMENT_NODE:
    //	deep = false;
    //	break;
    //case DOCUMENT_NODE:
    //case DOCUMENT_TYPE_NODE:
    //cannot be imported.
    //case ENTITY_NODE:
    //case NOTATION_NODE：
    //can not hit in level3
    //default:throw e;
  }

  if (!node2) {
    node2 = node.cloneNode(false); //false
  }

  node2.ownerDocument = doc;
  node2.parentNode = null;

  if (deep) {
    var child = node.firstChild;

    while (child) {
      node2.appendChild(_importNode(doc, child, deep));
      child = child.nextSibling;
    }
  }

  return node2;
} //
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};


function _cloneNode(doc, node, deep) {
  var node2 = new node.constructor();

  for (var n in node) {
    var v = node[n];

    if (_typeof(v) != 'object') {
      if (v != node2[n]) {
        node2[n] = v;
      }
    }
  }

  if (node.childNodes) {
    node2.childNodes = new NodeList();
  }

  node2.ownerDocument = doc;

  switch (node2.nodeType) {
    case ELEMENT_NODE:
      var attrs = node.attributes;
      var attrs2 = node2.attributes = new NamedNodeMap();
      var len = attrs.length;
      attrs2._ownerElement = node2;

      for (var i = 0; i < len; i++) {
        node2.setAttributeNode(_cloneNode(doc, attrs.item(i), true));
      }

      break;
      ;

    case ATTRIBUTE_NODE:
      deep = true;
  }

  if (deep) {
    var child = node.firstChild;

    while (child) {
      node2.appendChild(_cloneNode(doc, child, deep));
      child = child.nextSibling;
    }
  }

  return node2;
}

function __set__(object, key, value) {
  object[key] = value;
} //do dynamic


try {
  if (Object.defineProperty) {
    var getTextContent = function getTextContent(node) {
      switch (node.nodeType) {
        case ELEMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          var buf = [];
          node = node.firstChild;

          while (node) {
            if (node.nodeType !== 7 && node.nodeType !== 8) {
              buf.push(getTextContent(node));
            }

            node = node.nextSibling;
          }

          return buf.join('');

        default:
          return node.nodeValue;
      }
    };

    Object.defineProperty(LiveNodeList.prototype, 'length', {
      get: function get() {
        _updateLiveList(this);

        return this.$$length;
      }
    });
    Object.defineProperty(Node.prototype, 'textContent', {
      get: function get() {
        return getTextContent(this);
      },
      set: function set(data) {
        switch (this.nodeType) {
          case ELEMENT_NODE:
          case DOCUMENT_FRAGMENT_NODE:
            while (this.firstChild) {
              this.removeChild(this.firstChild);
            }

            if (data || String(data)) {
              this.appendChild(this.ownerDocument.createTextNode(data));
            }

            break;

          default:
            //TODO:
            this.data = data;
            this.value = data;
            this.nodeValue = data;
        }
      }
    });

    __set__ = function __set__(object, key, value) {
      //console.log(value)
      object['$$' + key] = value;
    };
  }
} catch (e) {//ie8
} //if(typeof require == 'function'){


exports.DOMImplementation = DOMImplementation;
exports.XMLSerializer = XMLSerializer; //}

},{}],21:[function(require,module,exports){
"use strict";

exports.entityMap = {
  lt: '<',
  gt: '>',
  amp: '&',
  quot: '"',
  apos: "'",
  Agrave: "À",
  Aacute: "Á",
  Acirc: "Â",
  Atilde: "Ã",
  Auml: "Ä",
  Aring: "Å",
  AElig: "Æ",
  Ccedil: "Ç",
  Egrave: "È",
  Eacute: "É",
  Ecirc: "Ê",
  Euml: "Ë",
  Igrave: "Ì",
  Iacute: "Í",
  Icirc: "Î",
  Iuml: "Ï",
  ETH: "Ð",
  Ntilde: "Ñ",
  Ograve: "Ò",
  Oacute: "Ó",
  Ocirc: "Ô",
  Otilde: "Õ",
  Ouml: "Ö",
  Oslash: "Ø",
  Ugrave: "Ù",
  Uacute: "Ú",
  Ucirc: "Û",
  Uuml: "Ü",
  Yacute: "Ý",
  THORN: "Þ",
  szlig: "ß",
  agrave: "à",
  aacute: "á",
  acirc: "â",
  atilde: "ã",
  auml: "ä",
  aring: "å",
  aelig: "æ",
  ccedil: "ç",
  egrave: "è",
  eacute: "é",
  ecirc: "ê",
  euml: "ë",
  igrave: "ì",
  iacute: "í",
  icirc: "î",
  iuml: "ï",
  eth: "ð",
  ntilde: "ñ",
  ograve: "ò",
  oacute: "ó",
  ocirc: "ô",
  otilde: "õ",
  ouml: "ö",
  oslash: "ø",
  ugrave: "ù",
  uacute: "ú",
  ucirc: "û",
  uuml: "ü",
  yacute: "ý",
  thorn: "þ",
  yuml: "ÿ",
  nbsp: " ",
  iexcl: "¡",
  cent: "¢",
  pound: "£",
  curren: "¤",
  yen: "¥",
  brvbar: "¦",
  sect: "§",
  uml: "¨",
  copy: "©",
  ordf: "ª",
  laquo: "«",
  not: "¬",
  shy: "­­",
  reg: "®",
  macr: "¯",
  deg: "°",
  plusmn: "±",
  sup2: "²",
  sup3: "³",
  acute: "´",
  micro: "µ",
  para: "¶",
  middot: "·",
  cedil: "¸",
  sup1: "¹",
  ordm: "º",
  raquo: "»",
  frac14: "¼",
  frac12: "½",
  frac34: "¾",
  iquest: "¿",
  times: "×",
  divide: "÷",
  forall: "∀",
  part: "∂",
  exist: "∃",
  empty: "∅",
  nabla: "∇",
  isin: "∈",
  notin: "∉",
  ni: "∋",
  prod: "∏",
  sum: "∑",
  minus: "−",
  lowast: "∗",
  radic: "√",
  prop: "∝",
  infin: "∞",
  ang: "∠",
  and: "∧",
  or: "∨",
  cap: "∩",
  cup: "∪",
  'int': "∫",
  there4: "∴",
  sim: "∼",
  cong: "≅",
  asymp: "≈",
  ne: "≠",
  equiv: "≡",
  le: "≤",
  ge: "≥",
  sub: "⊂",
  sup: "⊃",
  nsub: "⊄",
  sube: "⊆",
  supe: "⊇",
  oplus: "⊕",
  otimes: "⊗",
  perp: "⊥",
  sdot: "⋅",
  Alpha: "Α",
  Beta: "Β",
  Gamma: "Γ",
  Delta: "Δ",
  Epsilon: "Ε",
  Zeta: "Ζ",
  Eta: "Η",
  Theta: "Θ",
  Iota: "Ι",
  Kappa: "Κ",
  Lambda: "Λ",
  Mu: "Μ",
  Nu: "Ν",
  Xi: "Ξ",
  Omicron: "Ο",
  Pi: "Π",
  Rho: "Ρ",
  Sigma: "Σ",
  Tau: "Τ",
  Upsilon: "Υ",
  Phi: "Φ",
  Chi: "Χ",
  Psi: "Ψ",
  Omega: "Ω",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  omicron: "ο",
  pi: "π",
  rho: "ρ",
  sigmaf: "ς",
  sigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  thetasym: "ϑ",
  upsih: "ϒ",
  piv: "ϖ",
  OElig: "Œ",
  oelig: "œ",
  Scaron: "Š",
  scaron: "š",
  Yuml: "Ÿ",
  fnof: "ƒ",
  circ: "ˆ",
  tilde: "˜",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
  zwnj: "‌",
  zwj: "‍",
  lrm: "‎",
  rlm: "‏",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  sbquo: "‚",
  ldquo: "“",
  rdquo: "”",
  bdquo: "„",
  dagger: "†",
  Dagger: "‡",
  bull: "•",
  hellip: "…",
  permil: "‰",
  prime: "′",
  Prime: "″",
  lsaquo: "‹",
  rsaquo: "›",
  oline: "‾",
  euro: "€",
  trade: "™",
  larr: "←",
  uarr: "↑",
  rarr: "→",
  darr: "↓",
  harr: "↔",
  crarr: "↵",
  lceil: "⌈",
  rceil: "⌉",
  lfloor: "⌊",
  rfloor: "⌋",
  loz: "◊",
  spades: "♠",
  clubs: "♣",
  hearts: "♥",
  diams: "♦"
}; //for(var  n in exports.entityMap){console.log(exports.entityMap[n].charCodeAt())}

},{}],22:[function(require,module,exports){
"use strict";

//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
//[5]   	Name	   ::=   	NameStartChar (NameChar)*
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/; //\u10000-\uEFFFF

var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
var tagNamePattern = new RegExp('^' + nameStartChar.source + nameChar.source + '*(?:\:' + nameStartChar.source + nameChar.source + '*)?$'); //var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')
//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE

var S_TAG = 0; //tag name offerring

var S_ATTR = 1; //attr name offerring 

var S_ATTR_SPACE = 2; //attr name end and space offer

var S_EQ = 3; //=space?

var S_ATTR_NOQUOT_VALUE = 4; //attr value(no quot value only)

var S_ATTR_END = 5; //attr value end and no space(quot end)

var S_TAG_SPACE = 6; //(attr value end || tag end ) && (space offer)

var S_TAG_CLOSE = 7; //closed el<el />

function XMLReader() {}

XMLReader.prototype = {
  parse: function parse(source, defaultNSMap, entityMap) {
    var domBuilder = this.domBuilder;
    domBuilder.startDocument();

    _copy(defaultNSMap, defaultNSMap = {});

    _parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);

    domBuilder.endDocument();
  }
};

function _parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
  function fixedFromCharCode(code) {
    // String.prototype.fromCharCode does not supports
    // > 2 bytes unicode chars directly
    if (code > 0xffff) {
      code -= 0x10000;
      var surrogate1 = 0xd800 + (code >> 10),
          surrogate2 = 0xdc00 + (code & 0x3ff);
      return String.fromCharCode(surrogate1, surrogate2);
    } else {
      return String.fromCharCode(code);
    }
  }

  function entityReplacer(a) {
    var k = a.slice(1, -1);

    if (k in entityMap) {
      return entityMap[k];
    } else if (k.charAt(0) === '#') {
      return fixedFromCharCode(parseInt(k.substr(1).replace('x', '0x')));
    } else {
      errorHandler.error('entity not found:' + a);
      return a;
    }
  }

  function appendText(end) {
    //has some bugs
    if (end > start) {
      var xt = source.substring(start, end).replace(/&#?\w+;/g, entityReplacer);
      locator && position(start);
      domBuilder.characters(xt, 0, end - start);
      start = end;
    }
  }

  function position(p, m) {
    while (p >= lineEnd && (m = linePattern.exec(source))) {
      lineStart = m.index;
      lineEnd = lineStart + m[0].length;
      locator.lineNumber++; //console.log('line++:',locator,startPos,endPos)
    }

    locator.columnNumber = p - lineStart + 1;
  }

  var lineStart = 0;
  var lineEnd = 0;
  var linePattern = /.*(?:\r\n?|\n)|.*$/g;
  var locator = domBuilder.locator;
  var parseStack = [{
    currentNSMap: defaultNSMapCopy
  }];
  var closeMap = {};
  var start = 0;

  while (true) {
    try {
      var tagStart = source.indexOf('<', start);

      if (tagStart < 0) {
        if (!source.substr(start).match(/^\s*$/)) {
          var doc = domBuilder.doc;
          var text = doc.createTextNode(source.substr(start));
          doc.appendChild(text);
          domBuilder.currentElement = text;
        }

        return;
      }

      if (tagStart > start) {
        appendText(tagStart);
      }

      switch (source.charAt(tagStart + 1)) {
        case '/':
          var end = source.indexOf('>', tagStart + 3);
          var tagName = source.substring(tagStart + 2, end);
          var config = parseStack.pop();

          if (end < 0) {
            tagName = source.substring(tagStart + 2).replace(/[\s<].*/, ''); //console.error('#@@@@@@'+tagName)

            errorHandler.error("end tag name: " + tagName + ' is not complete:' + config.tagName);
            end = tagStart + 1 + tagName.length;
          } else if (tagName.match(/\s</)) {
            tagName = tagName.replace(/[\s<].*/, '');
            errorHandler.error("end tag name: " + tagName + ' maybe not complete');
            end = tagStart + 1 + tagName.length;
          } //console.error(parseStack.length,parseStack)
          //console.error(config);


          var localNSMap = config.localNSMap;
          var endMatch = config.tagName == tagName;
          var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase();

          if (endIgnoreCaseMach) {
            domBuilder.endElement(config.uri, config.localName, tagName);

            if (localNSMap) {
              for (var prefix in localNSMap) {
                domBuilder.endPrefixMapping(prefix);
              }
            }

            if (!endMatch) {
              errorHandler.fatalError("end tag name: " + tagName + ' is not match the current start tagName:' + config.tagName);
            }
          } else {
            parseStack.push(config);
          }

          end++;
          break;
        // end elment

        case '?':
          // <?...?>
          locator && position(tagStart);
          end = parseInstruction(source, tagStart, domBuilder);
          break;

        case '!':
          // <!doctype,<![CDATA,<!--
          locator && position(tagStart);
          end = parseDCC(source, tagStart, domBuilder, errorHandler);
          break;

        default:
          locator && position(tagStart);
          var el = new ElementAttributes();
          var currentNSMap = parseStack[parseStack.length - 1].currentNSMap; //elStartEnd

          var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
          var len = el.length;

          if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
            el.closed = true;

            if (!entityMap.nbsp) {
              errorHandler.warning('unclosed xml attribute');
            }
          }

          if (locator && len) {
            var locator2 = copyLocator(locator, {}); //try{//attribute position fixed

            for (var i = 0; i < len; i++) {
              var a = el[i];
              position(a.offset);
              a.locator = copyLocator(locator, {});
            } //}catch(e){console.error('@@@@@'+e)}


            domBuilder.locator = locator2;

            if (appendElement(el, domBuilder, currentNSMap)) {
              parseStack.push(el);
            }

            domBuilder.locator = locator;
          } else {
            if (appendElement(el, domBuilder, currentNSMap)) {
              parseStack.push(el);
            }
          }

          if (el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed) {
            end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
          } else {
            end++;
          }

      }
    } catch (e) {
      errorHandler.error('element parse error: ' + e); //errorHandler.error('element parse error: '+e);

      end = -1; //throw e;
    }

    if (end > start) {
      start = end;
    } else {
      //TODO: 这里有可能sax回退，有位置错误风险
      appendText(Math.max(tagStart, start) + 1);
    }
  }
}

function copyLocator(f, t) {
  t.lineNumber = f.lineNumber;
  t.columnNumber = f.columnNumber;
  return t;
}
/**
 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */


function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
  var attrName;
  var value;
  var p = ++start;
  var s = S_TAG; //status

  while (true) {
    var c = source.charAt(p);

    switch (c) {
      case '=':
        if (s === S_ATTR) {
          //attrName
          attrName = source.slice(start, p);
          s = S_EQ;
        } else if (s === S_ATTR_SPACE) {
          s = S_EQ;
        } else {
          //fatalError: equal must after attrName or space after attrName
          throw new Error('attribute equal must after attrName');
        }

        break;

      case '\'':
      case '"':
        if (s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE
        ) {
            //equal
            if (s === S_ATTR) {
              errorHandler.warning('attribute value must after "="');
              attrName = source.slice(start, p);
            }

            start = p + 1;
            p = source.indexOf(c, start);

            if (p > 0) {
              value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
              el.add(attrName, value, start - 1);
              s = S_ATTR_END;
            } else {
              //fatalError: no end quot match
              throw new Error('attribute value no end \'' + c + '\' match');
            }
          } else if (s == S_ATTR_NOQUOT_VALUE) {
          value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer); //console.log(attrName,value,start,p)

          el.add(attrName, value, start); //console.dir(el)

          errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ')!!');
          start = p + 1;
          s = S_ATTR_END;
        } else {
          //fatalError: no equal before
          throw new Error('attribute value must after "="');
        }

        break;

      case '/':
        switch (s) {
          case S_TAG:
            el.setTagName(source.slice(start, p));

          case S_ATTR_END:
          case S_TAG_SPACE:
          case S_TAG_CLOSE:
            s = S_TAG_CLOSE;
            el.closed = true;

          case S_ATTR_NOQUOT_VALUE:
          case S_ATTR:
          case S_ATTR_SPACE:
            break;
          //case S_EQ:

          default:
            throw new Error("attribute invalid close char('/')");
        }

        break;

      case '':
        //end document
        //throw new Error('unexpected end of input')
        errorHandler.error('unexpected end of input');

        if (s == S_TAG) {
          el.setTagName(source.slice(start, p));
        }

        return p;

      case '>':
        switch (s) {
          case S_TAG:
            el.setTagName(source.slice(start, p));

          case S_ATTR_END:
          case S_TAG_SPACE:
          case S_TAG_CLOSE:
            break;
          //normal

          case S_ATTR_NOQUOT_VALUE: //Compatible state

          case S_ATTR:
            value = source.slice(start, p);

            if (value.slice(-1) === '/') {
              el.closed = true;
              value = value.slice(0, -1);
            }

          case S_ATTR_SPACE:
            if (s === S_ATTR_SPACE) {
              value = attrName;
            }

            if (s == S_ATTR_NOQUOT_VALUE) {
              errorHandler.warning('attribute "' + value + '" missed quot(")!!');
              el.add(attrName, value.replace(/&#?\w+;/g, entityReplacer), start);
            } else {
              if (currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !value.match(/^(?:disabled|checked|selected)$/i)) {
                errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
              }

              el.add(value, value, start);
            }

            break;

          case S_EQ:
            throw new Error('attribute value missed!!');
        } //			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))


        return p;

      /*xml space '\x20' | #x9 | #xD | #xA; */

      case "\x80":
        c = ' ';

      default:
        if (c <= ' ') {
          //space
          switch (s) {
            case S_TAG:
              el.setTagName(source.slice(start, p)); //tagName

              s = S_TAG_SPACE;
              break;

            case S_ATTR:
              attrName = source.slice(start, p);
              s = S_ATTR_SPACE;
              break;

            case S_ATTR_NOQUOT_VALUE:
              var value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
              errorHandler.warning('attribute "' + value + '" missed quot(")!!');
              el.add(attrName, value, start);

            case S_ATTR_END:
              s = S_TAG_SPACE;
              break;
            //case S_TAG_SPACE:
            //case S_EQ:
            //case S_ATTR_SPACE:
            //	void();break;
            //case S_TAG_CLOSE:
            //ignore warning
          }
        } else {
          //not space
          //S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
          //S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
          switch (s) {
            //case S_TAG:void();break;
            //case S_ATTR:void();break;
            //case S_ATTR_NOQUOT_VALUE:void();break;
            case S_ATTR_SPACE:
              var tagName = el.tagName;

              if (currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
                errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
              }

              el.add(attrName, attrName, start);
              start = p;
              s = S_ATTR;
              break;

            case S_ATTR_END:
              errorHandler.warning('attribute space is required"' + attrName + '"!!');

            case S_TAG_SPACE:
              s = S_ATTR;
              start = p;
              break;

            case S_EQ:
              s = S_ATTR_NOQUOT_VALUE;
              start = p;
              break;

            case S_TAG_CLOSE:
              throw new Error("elements closed character '/' and '>' must be connected to");
          }
        }

    } //end outer switch
    //console.log('p++',p)


    p++;
  }
}
/**
 * @return true if has new namespace define
 */


function appendElement(el, domBuilder, currentNSMap) {
  var tagName = el.tagName;
  var localNSMap = null; //var currentNSMap = parseStack[parseStack.length-1].currentNSMap;

  var i = el.length;

  while (i--) {
    var a = el[i];
    var qName = a.qName;
    var value = a.value;
    var nsp = qName.indexOf(':');

    if (nsp > 0) {
      var prefix = a.prefix = qName.slice(0, nsp);
      var localName = qName.slice(nsp + 1);
      var nsPrefix = prefix === 'xmlns' && localName;
    } else {
      localName = qName;
      prefix = null;
      nsPrefix = qName === 'xmlns' && '';
    } //can not set prefix,because prefix !== ''


    a.localName = localName; //prefix == null for no ns prefix attribute 

    if (nsPrefix !== false) {
      //hack!!
      if (localNSMap == null) {
        localNSMap = {}; //console.log(currentNSMap,0)

        _copy(currentNSMap, currentNSMap = {}); //console.log(currentNSMap,1)

      }

      currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
      a.uri = 'http://www.w3.org/2000/xmlns/';
      domBuilder.startPrefixMapping(nsPrefix, value);
    }
  }

  var i = el.length;

  while (i--) {
    a = el[i];
    var prefix = a.prefix;

    if (prefix) {
      //no prefix attribute has no namespace
      if (prefix === 'xml') {
        a.uri = 'http://www.w3.org/XML/1998/namespace';
      }

      if (prefix !== 'xmlns') {
        a.uri = currentNSMap[prefix || '']; //{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
      }
    }
  }

  var nsp = tagName.indexOf(':');

  if (nsp > 0) {
    prefix = el.prefix = tagName.slice(0, nsp);
    localName = el.localName = tagName.slice(nsp + 1);
  } else {
    prefix = null; //important!!

    localName = el.localName = tagName;
  } //no prefix element has default namespace


  var ns = el.uri = currentNSMap[prefix || ''];
  domBuilder.startElement(ns, localName, tagName, el); //endPrefixMapping and startPrefixMapping have not any help for dom builder
  //localNSMap = null

  if (el.closed) {
    domBuilder.endElement(ns, localName, tagName);

    if (localNSMap) {
      for (prefix in localNSMap) {
        domBuilder.endPrefixMapping(prefix);
      }
    }
  } else {
    el.currentNSMap = currentNSMap;
    el.localNSMap = localNSMap; //parseStack.push(el);

    return true;
  }
}

function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
  if (/^(?:script|textarea)$/i.test(tagName)) {
    var elEndStart = source.indexOf('</' + tagName + '>', elStartEnd);
    var text = source.substring(elStartEnd + 1, elEndStart);

    if (/[&<]/.test(text)) {
      if (/^script$/i.test(tagName)) {
        //if(!/\]\]>/.test(text)){
        //lexHandler.startCDATA();
        domBuilder.characters(text, 0, text.length); //lexHandler.endCDATA();

        return elEndStart; //}
      } //}else{//text area


      text = text.replace(/&#?\w+;/g, entityReplacer);
      domBuilder.characters(text, 0, text.length);
      return elEndStart; //}
    }
  }

  return elStartEnd + 1;
}

function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
  //if(tagName in closeMap){
  var pos = closeMap[tagName];

  if (pos == null) {
    //console.log(tagName)
    pos = source.lastIndexOf('</' + tagName + '>');

    if (pos < elStartEnd) {
      //忘记闭合
      pos = source.lastIndexOf('</' + tagName);
    }

    closeMap[tagName] = pos;
  }

  return pos < elStartEnd; //} 
}

function _copy(source, target) {
  for (var n in source) {
    target[n] = source[n];
  }
}

function parseDCC(source, start, domBuilder, errorHandler) {
  //sure start with '<!'
  var next = source.charAt(start + 2);

  switch (next) {
    case '-':
      if (source.charAt(start + 3) === '-') {
        var end = source.indexOf('-->', start + 4); //append comment source.substring(4,end)//<!--

        if (end > start) {
          domBuilder.comment(source, start + 4, end - start - 4);
          return end + 3;
        } else {
          errorHandler.error("Unclosed comment");
          return -1;
        }
      } else {
        //error
        return -1;
      }

    default:
      if (source.substr(start + 3, 6) == 'CDATA[') {
        var end = source.indexOf(']]>', start + 9);
        domBuilder.startCDATA();
        domBuilder.characters(source, start + 9, end - start - 9);
        domBuilder.endCDATA();
        return end + 3;
      } //<!DOCTYPE
      //startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 


      var matchs = split(source, start);
      var len = matchs.length;

      if (len > 1 && /!doctype/i.test(matchs[0][0])) {
        var name = matchs[1][0];
        var pubid = len > 3 && /^public$/i.test(matchs[2][0]) && matchs[3][0];
        var sysid = len > 4 && matchs[4][0];
        var lastMatch = matchs[len - 1];
        domBuilder.startDTD(name, pubid && pubid.replace(/^(['"])(.*?)\1$/, '$2'), sysid && sysid.replace(/^(['"])(.*?)\1$/, '$2'));
        domBuilder.endDTD();
        return lastMatch.index + lastMatch[0].length;
      }

  }

  return -1;
}

function parseInstruction(source, start, domBuilder) {
  var end = source.indexOf('?>', start);

  if (end) {
    var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);

    if (match) {
      var len = match[0].length;
      domBuilder.processingInstruction(match[1], match[2]);
      return end + 2;
    } else {
      //error
      return -1;
    }
  }

  return -1;
}
/**
 * @param source
 */


function ElementAttributes(source) {}

ElementAttributes.prototype = {
  setTagName: function setTagName(tagName) {
    if (!tagNamePattern.test(tagName)) {
      throw new Error('invalid tagName:' + tagName);
    }

    this.tagName = tagName;
  },
  add: function add(qName, value, offset) {
    if (!tagNamePattern.test(qName)) {
      throw new Error('invalid attribute:' + qName);
    }

    this[this.length++] = {
      qName: qName,
      value: value,
      offset: offset
    };
  },
  length: 0,
  getLocalName: function getLocalName(i) {
    return this[i].localName;
  },
  getLocator: function getLocator(i) {
    return this[i].locator;
  },
  getQName: function getQName(i) {
    return this[i].qName;
  },
  getURI: function getURI(i) {
    return this[i].uri;
  },
  getValue: function getValue(i) {
    return this[i].value;
  } //	,getIndex:function(uri, localName)){
  //		if(localName){
  //			
  //		}else{
  //			var qName = uri
  //		}
  //	},
  //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
  //	getType:function(uri,localName){}
  //	getType:function(i){},

};

function split(source, start) {
  var match;
  var buf = [];
  var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
  reg.lastIndex = start;
  reg.exec(source); //skip <

  while (match = reg.exec(source)) {
    buf.push(match);
    if (match[1]) return buf;
  }
}

exports.XMLReader = XMLReader;

},{}],23:[function(require,module,exports){
"use strict";

var _global = GameGlobal;
var adapter = _global.__globalAdapter = {};
Object.assign(adapter, {
  init: function init() {
    require('./wrapper/builtin');

    _global.DOMParser = require('../../common/xmldom/dom-parser').DOMParser;

    require('./wrapper/unify');

    require('./wrapper/fs-utils');

    require('../../common/engine/globalAdapter');

    require('./wrapper/systemInfo');
  },
  adaptEngine: function adaptEngine() {
    require('../../common/engine');

    require('./wrapper/engine');

    require('./wrapper/sub-context-adapter');
  },
  handleSystemInfo: function handleSystemInfo(cb) {
    if (swan.getOpenDataContext) {
      swan.getOpenDataContext().postMessage({
        fromAdapter: true,
        event: 'main-context-info',
        sysInfo: __globalAdapter.getSystemInfoSync(),
        // send system info to open data context
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio
      });
      cb && cb();
    } else {
      swan.onMessage(function (data) {
        if (data.fromAdapter) {
          if (data.event === 'main-context-info') {
            GameGlobal._env = data.sysInfo; // revieve system info from main context

            Object.defineProperties(window, {
              'innerWidth': {
                value: data.innerWidth,
                enumerable: true
              },
              'innerHeight': {
                value: data.innerHeight,
                enumerable: true
              },
              'devicePixelRatio': {
                value: data.devicePixelRatio,
                enumerable: true
              }
            });
            cb && cb();
          }
        }
      });
    }
  }
});

},{"../../common/engine":16,"../../common/engine/globalAdapter":15,"../../common/xmldom/dom-parser":19,"./wrapper/builtin":51,"./wrapper/engine":64,"./wrapper/fs-utils":65,"./wrapper/sub-context-adapter":1,"./wrapper/systemInfo":66,"./wrapper/unify":67}],24:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HTMLAudioElement2 = _interopRequireDefault(require("./HTMLAudioElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SN_SEED = 1;
var _innerAudioContextMap = {};

var AudioMock = /*#__PURE__*/function () {
  function AudioMock() {
    _classCallCheck(this, AudioMock);
  }

  _createClass(AudioMock, [{
    key: "play",
    value: function play() {}
  }, {
    key: "pause",
    value: function pause() {}
  }, {
    key: "stop",
    value: function stop() {}
  }, {
    key: "seek",
    value: function seek() {}
  }, {
    key: "destroy",
    value: function destroy() {}
  }, {
    key: "onCanplay",
    value: function onCanplay() {}
  }, {
    key: "offCanplay",
    value: function offCanplay() {}
  }, {
    key: "onEnded",
    value: function onEnded() {}
  }, {
    key: "offEnded",
    value: function offEnded() {}
  }, {
    key: "onError",
    value: function onError() {}
  }, {
    key: "offError",
    value: function offError() {}
  }, {
    key: "onPause",
    value: function onPause() {}
  }, {
    key: "offPause",
    value: function offPause() {}
  }, {
    key: "onPlay",
    value: function onPlay() {}
  }, {
    key: "offPlay",
    value: function offPlay() {}
  }, {
    key: "onSeeked",
    value: function onSeeked() {}
  }, {
    key: "offSeeked",
    value: function offSeeked() {}
  }, {
    key: "onSeeking",
    value: function onSeeking() {}
  }, {
    key: "offSeeking",
    value: function offSeeking() {}
  }, {
    key: "onStop",
    value: function onStop() {}
  }, {
    key: "offStop",
    value: function offStop() {}
  }, {
    key: "onTimeUpdate",
    value: function onTimeUpdate() {}
  }, {
    key: "offTimeUpdate",
    value: function offTimeUpdate() {}
  }, {
    key: "offWaiting",
    value: function offWaiting() {}
  }, {
    key: "onWaitin",
    value: function onWaitin() {}
  }]);

  return AudioMock;
}();

var Audio = /*#__PURE__*/function (_HTMLAudioElement) {
  _inherits(Audio, _HTMLAudioElement);

  var _super = _createSuper(Audio);

  function Audio(url) {
    var _this;

    _classCallCheck(this, Audio);

    _this = _super.call(this);
    _this._$sn = SN_SEED++;
    _this.readyState = Audio.HAVE_NOTHING;
    var innerAudioContext = swan.createInnerAudioContext ? swan.createInnerAudioContext() : new AudioMock();
    _innerAudioContextMap[_this._$sn] = innerAudioContext;
    _this._canplayEvents = ['load', 'loadend', 'canplay', 'canplaythrough', 'loadedmetadata'];
    innerAudioContext.onCanplay(function () {
      _this._loaded = true;
      _this.readyState = Audio.HAVE_CURRENT_DATA;

      _this._canplayEvents.forEach(function (type) {
        _this.dispatchEvent({
          type: type
        });
      });
    });
    innerAudioContext.onPlay(function () {
      _this._paused = _innerAudioContextMap[_this._$sn].paused;

      _this.dispatchEvent({
        type: 'play'
      });
    });
    innerAudioContext.onPause(function () {
      _this._paused = _innerAudioContextMap[_this._$sn].paused;

      _this.dispatchEvent({
        type: 'pause'
      });
    });
    innerAudioContext.onEnded(function () {
      _this._paused = _innerAudioContextMap[_this._$sn].paused;

      if (_innerAudioContextMap[_this._$sn].loop === false) {
        _this.dispatchEvent({
          type: 'ended'
        });
      }

      _this.readyState = Audio.HAVE_ENOUGH_DATA;
    });
    innerAudioContext.onError(function () {
      _this._paused = _innerAudioContextMap[_this._$sn].paused;

      _this.dispatchEvent({
        type: 'error'
      });
    });

    if (url) {
      _this.src = url;
    } else {
      _this._src = '';
    }

    _this._loop = innerAudioContext.loop;
    _this._autoplay = innerAudioContext.autoplay;
    _this._paused = innerAudioContext.paused;
    _this._volume = innerAudioContext.volume;
    _this._muted = false;
    return _this;
  }

  _createClass(Audio, [{
    key: "addEventListener",
    value: function addEventListener(type, listener) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      type = String(type).toLowerCase();

      _get(_getPrototypeOf(Audio.prototype), "addEventListener", this).call(this, type, listener, options);

      if (this._loaded && this._canplayEvents.indexOf(type) !== -1) {
        this.dispatchEvent({
          type: type
        });
      }
    }
  }, {
    key: "load",
    value: function load() {// console.warn('HTMLAudioElement.load() is not implemented.')
      // weixin doesn't need call load() manually
    }
  }, {
    key: "play",
    value: function play() {
      _innerAudioContextMap[this._$sn].play();
    }
  }, {
    key: "resume",
    value: function resume() {
      _innerAudioContextMap[this._$sn].resume();
    }
  }, {
    key: "pause",
    value: function pause() {
      _innerAudioContextMap[this._$sn].pause();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _innerAudioContextMap[this._$sn].destroy();
    }
  }, {
    key: "canPlayType",
    value: function canPlayType() {
      var mediaType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (typeof mediaType !== 'string') {
        return '';
      }

      if (mediaType.indexOf('audio/mpeg') > -1 || mediaType.indexOf('audio/mp4')) {
        return 'probably';
      }

      return '';
    }
  }, {
    key: "cloneNode",
    value: function cloneNode() {
      var newAudio = new Audio();
      newAudio.loop = this.loop;
      newAudio.autoplay = this.autoplay;
      newAudio.src = this.src;
      return newAudio;
    }
  }, {
    key: "currentTime",
    get: function get() {
      return _innerAudioContextMap[this._$sn].currentTime;
    },
    set: function set(value) {
      _innerAudioContextMap[this._$sn].seek(value);
    }
  }, {
    key: "duration",
    get: function get() {
      return _innerAudioContextMap[this._$sn].duration;
    }
  }, {
    key: "src",
    get: function get() {
      return this._src;
    },
    set: function set(value) {
      this._src = value;
      this._loaded = false;
      this.readyState = Audio.HAVE_NOTHING;
      var innerAudioContext = _innerAudioContextMap[this._$sn];
      innerAudioContext.src = value;
    }
  }, {
    key: "loop",
    get: function get() {
      return this._loop;
    },
    set: function set(value) {
      this._loop = value;
      _innerAudioContextMap[this._$sn].loop = value;
    }
  }, {
    key: "autoplay",
    get: function get() {
      return this._autoplay;
    },
    set: function set(value) {
      this._autoplay = value;
      _innerAudioContextMap[this._$sn].autoplay = value;
    }
  }, {
    key: "paused",
    get: function get() {
      return this._paused;
    }
  }, {
    key: "volume",
    get: function get() {
      return this._volume;
    },
    set: function set(value) {
      this._volume = value;

      if (!this._muted) {
        _innerAudioContextMap[this._$sn].volume = value;
      }
    }
  }, {
    key: "muted",
    get: function get() {
      return this._muted;
    },
    set: function set(value) {
      this._muted = value;

      if (value) {
        _innerAudioContextMap[this._$sn].volume = 0;
      } else {
        _innerAudioContextMap[this._$sn].volume = this._volume;
      }
    }
  }]);

  return Audio;
}(_HTMLAudioElement2["default"]);

exports["default"] = Audio;
Audio.HAVE_NOTHING = 0;
Audio.HAVE_METADATA = 1;
Audio.HAVE_CURRENT_DATA = 2;
Audio.HAVE_FUTURE_DATA = 3;
Audio.HAVE_ENOUGH_DATA = 4;
module.exports = exports["default"];

},{"./HTMLAudioElement":36}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.btoa = btoa;
exports.atob = atob;

/* eslint-disable */
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
  this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError'; // encoder
// [https://gist.github.com/999166] by [https://github.com/nignag]

function btoa(input) {
  var str = String(input);
  var output = '';

  for ( // initialize result and counter
  var block, charCode, idx = 0, map = chars; // if the next str index does not exist:
  //   change the mapping table to "="
  //   check if d has no fractional digits
  str.charAt(idx | 0) || (map = '=', idx % 1); // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
  output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
    charCode = str.charCodeAt(idx += 3 / 4);

    if (charCode > 0xFF) {
      throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
    }

    block = block << 8 | charCode;
  }

  return output;
} // decoder
// [https://gist.github.com/1020396] by [https://github.com/atk]


function atob(input) {
  var str = String(input).replace(/=+$/, '');

  if (str.length % 4 === 1) {
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }

  var output = '';

  for ( // initialize result and counters
  var bc = 0, bs, buffer, idx = 0; // get next character
  buffer = str.charAt(idx++); // character found in table? initialize bit storage and add its ascii value;
  ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, // and if not first of each 4 characters,
  // convert the first 8 bits to one ascii character
  bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }

  return output;
}

},{}],26:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HTMLElement2 = _interopRequireDefault(require("./HTMLElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Body = /*#__PURE__*/function (_HTMLElement) {
  _inherits(Body, _HTMLElement);

  var _super = _createSuper(Body);

  function Body() {
    _classCallCheck(this, Body);

    // 为了性能, 此处不按照标准的DOM层级关系设计
    // 将 body 设置为 0级, parent元素为null
    return _super.call(this, 'body', 0);
  }

  return Body;
}(_HTMLElement2["default"]);

exports["default"] = Body;
module.exports = exports["default"];

},{"./HTMLElement":38}],27:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Canvas;

var Mixin = _interopRequireWildcard(require("./util/mixin"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable */
// import HTMLCanvasElement from './HTMLCanvasElement'
// TODO
var hasModifiedCanvasPrototype = false;
var hasInit2DContextConstructor = false;
var hasInitWebGLContextConstructor = false;

function Canvas() {
  var canvas = swan.createCanvas();
  var _getContext = canvas.getContext; // canvas.__proto__.__proto__.__proto__ = new HTMLCanvasElement()

  if (!('tagName' in canvas)) {
    canvas.tagName = 'CANVAS';
  }

  canvas.type = 'canvas';
  Mixin.parentNode(canvas);
  Mixin.style(canvas);
  Mixin.classList(canvas);
  Mixin.clientRegion(canvas);
  Mixin.offsetRegion(canvas);

  canvas.focus = function () {};

  canvas.blur = function () {};

  canvas.addEventListener = function (type, listener) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    // console.log('canvas.addEventListener', type);
    document.addEventListener(type, listener, options);
  };

  canvas.removeEventListener = function (type, listener) {
    // console.log('canvas.removeEventListener', type);
    document.removeEventListener(type, listener);
  };

  canvas.dispatchEvent = function () {
    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    console.log('canvas.dispatchEvent', event.type, event); // nothing to do
  };

  return canvas;
}

module.exports = exports["default"];

},{"./util/mixin":61}],28:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HTMLElement2 = _interopRequireDefault(require("./HTMLElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DocumentElement = /*#__PURE__*/function (_HTMLElement) {
  _inherits(DocumentElement, _HTMLElement);

  var _super = _createSuper(DocumentElement);

  function DocumentElement() {
    _classCallCheck(this, DocumentElement);

    return _super.call(this, 'html', 0);
  }

  return DocumentElement;
}(_HTMLElement2["default"]);

exports["default"] = DocumentElement;
module.exports = exports["default"];

},{"./HTMLElement":38}],29:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Node2 = _interopRequireDefault(require("./Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Element = /*#__PURE__*/function (_Node) {
  _inherits(Element, _Node);

  var _super = _createSuper(Element);

  function Element() {
    var _this;

    _classCallCheck(this, Element);

    _this = _super.call(this);
    _this.className = '';
    _this.children = [];
    return _this;
  }

  _createClass(Element, [{
    key: "setAttribute",
    value: function setAttribute(name, value) {
      this[name] = value;
    }
  }, {
    key: "getAttribute",
    value: function getAttribute(name) {
      return this[name];
    }
  }, {
    key: "setAttributeNS",
    value: function setAttributeNS(name, value) {
      this[name] = value;
    }
  }, {
    key: "getAttributeNS",
    value: function getAttributeNS(name) {
      return this[name];
    }
  }]);

  return Element;
}(_Node2["default"]);

exports["default"] = Element;
module.exports = exports["default"];

},{"./Node":44}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("./util/index.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function Event(type) {
  _classCallCheck(this, Event);

  this.cancelBubble = false;
  this.cancelable = false;
  this.target = null;
  this.currentTarget = null;
  this.preventDefault = _index.noop;
  this.stopPropagation = _index.noop;
  this.type = type;
  this.timeStamp = Date.now();
};

exports["default"] = Event;
module.exports = exports["default"];

},{"./util/index.js":59}],31:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Event2 = _interopRequireDefault(require("../Event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MouseEvent = /*#__PURE__*/function (_Event) {
  _inherits(MouseEvent, _Event);

  var _super = _createSuper(MouseEvent);

  function MouseEvent(type) {
    _classCallCheck(this, MouseEvent);

    return _super.call(this, type);
  }

  return MouseEvent;
}(_Event2["default"]);

exports["default"] = MouseEvent;
module.exports = exports["default"];

},{"../Event":30}],32:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("../util/index.js");

var _Event2 = _interopRequireDefault(require("../Event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PointerEvent = /*#__PURE__*/function (_Event) {
  _inherits(PointerEvent, _Event);

  var _super = _createSuper(PointerEvent);

  function PointerEvent(type) {
    var _this;

    _classCallCheck(this, PointerEvent);

    _this = _super.call(this, type);
    _this.target = window.canvas;
    _this.currentTarget = window.canvas;
    return _this;
  }

  return PointerEvent;
}(_Event2["default"]);

exports["default"] = PointerEvent;
var CLONE_PROPS = [// MouseEvent
'bubbles', 'cancelable', 'view', 'detail', 'screenX', 'screenY', 'clientX', 'clientY', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey', 'button', 'relatedTarget', // PointerEvent
'pointerId', 'width', 'height', 'pressure', 'tiltX', 'tiltY', 'pointerType', 'hwTimestamp', 'isPrimary', // event instance
'pageX', 'pageY', 'timeStamp'];
var CLONE_DEFAULTS = [// MouseEvent
false, false, null, null, 0, 0, 0, 0, false, false, false, false, 0, null, // DOM Level 3
0, // PointerEvent
0, 0, 0, 0, 0, 0, '', 0, false, // event instance
0, 0, 0];
var POINTER_TYPE = 'touch';

function touchToPointer(type, touch, rawEvent) {
  var e = new PointerEvent(type);

  for (var i = 0; i < CLONE_PROPS.length; i++) {
    var p = CLONE_PROPS[i];
    e[p] = touch[p] || CLONE_DEFAULTS[i];
  }

  e.type = type;
  e.target = window.canvas;
  e.currentTarget = window.canvas;
  e.buttons = typeToButtons(type);
  e.which = e.buttons;
  e.pointerId = (touch.identifier || 0) + 2;
  e.bubbles = true;
  e.cancelable = true; // e.detail = this.clickCount;

  e.button = 0;
  e.width = (touch.radiusX || 0.5) * 2;
  e.height = (touch.radiusY || 0.5) * 2;
  e.pressure = touch.force || 0.5;
  e.isPrimary = isPrimaryPointer(touch);
  e.pointerType = POINTER_TYPE; // forward modifier keys

  e.altKey = rawEvent.altKey;
  e.ctrlKey = rawEvent.ctrlKey;
  e.metaKey = rawEvent.metaKey;
  e.shiftKey = rawEvent.shiftKey;

  if (rawEvent.preventDefault) {
    e.preventDefault = function () {
      rawEvent.preventDefault();
    };
  }

  return e;
}

function typeToButtons(type) {
  var ret = 0;

  if (type === 'touchstart' || type === 'touchmove' || type === 'pointerdown' || type === 'pointermove') {
    ret = 1;
  }

  return ret;
}

var firstPointer = null;

function isPrimaryPointer(touch) {
  return firstPointer === touch.identifier;
}

function setPrimaryPointer(touch) {
  if (firstPointer === null) {
    firstPointer = touch.identifier;
  }
}

function removePrimaryPointer(touch) {
  if (firstPointer === touch.identifier) {
    firstPointer = null;
  }
}

function eventHandlerFactory(type) {
  return function (rawEvent) {
    var changedTouches = rawEvent.changedTouches;

    for (var i = 0; i < changedTouches.length; i++) {
      var touch = changedTouches[i];

      if (i === 0 && type === 'pointerdown') {
        setPrimaryPointer(touch);
      } else if (type === 'pointerup' || type === 'pointercancel') {
        removePrimaryPointer(touch);
      }

      var event = touchToPointer(type, touch, rawEvent);
      document.dispatchEvent(event);
    }
  };
}

if (swan.onTouchStart) {
  swan.onTouchStart(eventHandlerFactory('pointerdown'));
  swan.onTouchMove(eventHandlerFactory('pointermove'));
  swan.onTouchEnd(eventHandlerFactory('pointerup'));
  swan.onTouchCancel(eventHandlerFactory('pointercancel'));
}

module.exports = exports["default"];

},{"../Event":30,"../util/index.js":59}],33:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("../util/index.js");

var _Event2 = _interopRequireDefault(require("../Event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TouchEvent = /*#__PURE__*/function (_Event) {
  _inherits(TouchEvent, _Event);

  var _super = _createSuper(TouchEvent);

  function TouchEvent(type) {
    var _this;

    _classCallCheck(this, TouchEvent);

    _this = _super.call(this, type);
    _this.touches = [];
    _this.targetTouches = [];
    _this.changedTouches = [];
    _this.target = window.canvas;
    _this.currentTarget = window.canvas;
    return _this;
  }

  return TouchEvent;
}(_Event2["default"]);

exports["default"] = TouchEvent;

function eventHandlerFactory(type) {
  return function (rawEvent) {
    var event = new TouchEvent(type);
    event.changedTouches = rawEvent.changedTouches;
    event.touches = rawEvent.touches;
    event.targetTouches = Array.prototype.slice.call(rawEvent.touches);
    event.timeStamp = rawEvent.timeStamp;
    document.dispatchEvent(event);
  };
}

if (swan.onTouchStart) {
  swan.onTouchStart(eventHandlerFactory('touchstart'));
  swan.onTouchMove(eventHandlerFactory('touchmove'));
  swan.onTouchEnd(eventHandlerFactory('touchend'));
  swan.onTouchCancel(eventHandlerFactory('touchcancel'));
}

module.exports = exports["default"];

},{"../Event":30,"../util/index.js":59}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TouchEvent", {
  enumerable: true,
  get: function get() {
    return _TouchEvent["default"];
  }
});
Object.defineProperty(exports, "PointerEvent", {
  enumerable: true,
  get: function get() {
    return _PointerEvent["default"];
  }
});
Object.defineProperty(exports, "MouseEvent", {
  enumerable: true,
  get: function get() {
    return _MouseEvent["default"];
  }
});

var _TouchEvent = _interopRequireDefault(require("./TouchEvent"));

var _PointerEvent = _interopRequireDefault(require("./PointerEvent"));

var _MouseEvent = _interopRequireDefault(require("./MouseEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./MouseEvent":31,"./PointerEvent":32,"./TouchEvent":33}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable */
var _events = new WeakMap();

var EventTarget = /*#__PURE__*/function () {
  function EventTarget() {
    _classCallCheck(this, EventTarget);

    _events.set(this, {});
  }

  _createClass(EventTarget, [{
    key: "addEventListener",
    value: function addEventListener(type, listener) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var events = _events.get(this);

      if (!events) {
        events = {};

        _events.set(this, events);
      }

      if (!events[type]) {
        events[type] = [];
      }

      events[type].push(listener);

      if (options.capture) {// console.warn('EventTarget.addEventListener: options.capture is not implemented.')
      }

      if (options.once) {// console.warn('EventTarget.addEventListener: options.once is not implemented.')
      }

      if (options.passive) {// console.warn('EventTarget.addEventListener: options.passive is not implemented.')
      }
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, listener) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var events = _events.get(this);

      if (events) {
        var listeners = events[type];

        if (listeners && listeners.length > 0) {
          for (var i = listeners.length; i--; i > 0) {
            if (listeners[i] === listener) {
              listeners.splice(i, 1);
              break;
            }
          }
        }
      }
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var listeners = _events.get(this)[event.type];

      if (listeners) {
        for (var i = 0; i < listeners.length; i++) {
          listeners[i](event);
        }
      }
    }
  }]);

  return EventTarget;
}();

exports["default"] = EventTarget;
module.exports = exports["default"];

},{}],36:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HTMLMediaElement2 = _interopRequireDefault(require("./HTMLMediaElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var HTMLAudioElement = /*#__PURE__*/function (_HTMLMediaElement) {
  _inherits(HTMLAudioElement, _HTMLMediaElement);

  var _super = _createSuper(HTMLAudioElement);

  function HTMLAudioElement() {
    _classCallCheck(this, HTMLAudioElement);

    return _super.call(this, 'audio');
  }

  return HTMLAudioElement;
}(_HTMLMediaElement2["default"]);

exports["default"] = HTMLAudioElement;
module.exports = exports["default"];

},{"./HTMLMediaElement":40}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Canvas = _interopRequireDefault(require("./Canvas"));

var _HTMLElement = _interopRequireDefault(require("./HTMLElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
// import HTMLElement from './HTMLElement';
// export default class HTMLCanvasElement extends HTMLElement
// {
//     constructor(){
//         super('canvas')
//     }
// };
GameGlobal.screencanvas = GameGlobal.screencanvas || new _Canvas["default"]();
var canvas = GameGlobal.screencanvas;
var canvasConstructor = canvas.constructor; // canvasConstructor.__proto__.__proto__ = new HTMLElement();

var _default = canvasConstructor;
exports["default"] = _default;
module.exports = exports["default"];

},{"./Canvas":27,"./HTMLElement":38}],38:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("./util/index.js");

var Mixin = _interopRequireWildcard(require("./util/mixin"));

var _Element2 = _interopRequireDefault(require("./Element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var HTMLElement = /*#__PURE__*/function (_Element) {
  _inherits(HTMLElement, _Element);

  var _super = _createSuper(HTMLElement);

  function HTMLElement() {
    var _this;

    var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var level = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, HTMLElement);

    _this = _super.call(this);
    _this.className = '';
    _this.childern = [];
    _this.focus = _index.noop;
    _this.blur = _index.noop;
    _this.insertBefore = _index.noop;
    _this.appendChild = _index.noop;
    _this.removeChild = _index.noop;
    _this.remove = _index.noop;
    _this.innerHTML = '';
    _this.tagName = tagName.toUpperCase();
    Mixin.parentNode(_assertThisInitialized(_this), level);
    Mixin.style(_assertThisInitialized(_this));
    Mixin.classList(_assertThisInitialized(_this));
    Mixin.clientRegion(_assertThisInitialized(_this));
    Mixin.offsetRegion(_assertThisInitialized(_this));
    Mixin.scrollRegion(_assertThisInitialized(_this));
    return _this;
  }

  return HTMLElement;
}(_Element2["default"]);

exports["default"] = HTMLElement;
module.exports = exports["default"];

},{"./Element":29,"./util/index.js":59,"./util/mixin":61}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HTMLElement = _interopRequireDefault(require("./HTMLElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
// import HTMLElement from './HTMLElement';
// export default class HTMLImageElement extends HTMLElement
// {
//     constructor(){
//         super('img')
//     }
// };
var imageConstructor = swan.createImage().constructor; // imageConstructor.__proto__.__proto__ = new HTMLElement();

var _default = imageConstructor;
exports["default"] = _default;
module.exports = exports["default"];

},{"./HTMLElement":38}],40:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HTMLElement2 = _interopRequireDefault(require("./HTMLElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var HTMLMediaElement = /*#__PURE__*/function (_HTMLElement) {
  _inherits(HTMLMediaElement, _HTMLElement);

  var _super = _createSuper(HTMLMediaElement);

  function HTMLMediaElement(tagName) {
    _classCallCheck(this, HTMLMediaElement);

    return _super.call(this, tagName);
  }

  _createClass(HTMLMediaElement, [{
    key: "addTextTrack",
    value: function addTextTrack() {}
  }, {
    key: "captureStream",
    value: function captureStream() {}
  }, {
    key: "fastSeek",
    value: function fastSeek() {}
  }, {
    key: "load",
    value: function load() {}
  }, {
    key: "pause",
    value: function pause() {}
  }, {
    key: "play",
    value: function play() {}
  }]);

  return HTMLMediaElement;
}(_HTMLElement2["default"]);

exports["default"] = HTMLMediaElement;
module.exports = exports["default"];

},{"./HTMLElement":38}],41:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HTMLMediaElement2 = _interopRequireDefault(require("./HTMLMediaElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var HTMLVideoElement = /*#__PURE__*/function (_HTMLMediaElement) {
  _inherits(HTMLVideoElement, _HTMLMediaElement);

  var _super = _createSuper(HTMLVideoElement);

  function HTMLVideoElement() {
    _classCallCheck(this, HTMLVideoElement);

    return _super.call(this, 'video');
  }

  return HTMLVideoElement;
}(_HTMLMediaElement2["default"]);

exports["default"] = HTMLVideoElement;
;
module.exports = exports["default"];

},{"./HTMLMediaElement":40}],42:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var Mixin = _interopRequireWildcard(require("./util/mixin"));

var _HTMLImageElement = _interopRequireDefault(require("./HTMLImageElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable */
function _default() {
  var image = swan.createImage(); // image.__proto__.__proto__.__proto__ = new HTMLImageElement();

  if (!('tagName' in image)) {
    image.tagName = 'IMG';
  }

  Mixin.parentNode(image);
  Mixin.classList(image);
  return image;
}

;
module.exports = exports["default"];

},{"./HTMLImageElement":39,"./util/mixin":61}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */
var ImageBitmap = function ImageBitmap() {// TODO

  _classCallCheck(this, ImageBitmap);
};

exports["default"] = ImageBitmap;
module.exports = exports["default"];

},{}],44:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _EventTarget2 = _interopRequireDefault(require("./EventTarget.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Node = /*#__PURE__*/function (_EventTarget) {
  _inherits(Node, _EventTarget);

  var _super = _createSuper(Node);

  function Node() {
    var _this;

    _classCallCheck(this, Node);

    _this = _super.call(this);
    _this.childNodes = [];
    return _this;
  }

  _createClass(Node, [{
    key: "appendChild",
    value: function appendChild(node) {
      this.childNodes.push(node); // if (node instanceof Node) {
      //   this.childNodes.push(node)
      // } else {
      //   throw new TypeError('Failed to executed \'appendChild\' on \'Node\': parameter 1 is not of type \'Node\'.')
      // }
    }
  }, {
    key: "cloneNode",
    value: function cloneNode() {
      var copyNode = Object.create(this);
      Object.assign(copyNode, this);
      return copyNode;
    }
  }, {
    key: "removeChild",
    value: function removeChild(node) {
      var index = this.childNodes.findIndex(function (child) {
        return child === node;
      });

      if (index > -1) {
        return this.childNodes.splice(index, 1);
      }

      return null;
    }
  }]);

  return Node;
}(_EventTarget2["default"]);

exports["default"] = Node;
module.exports = exports["default"];

},{"./EventTarget.js":35}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */
var WebGLRenderingContext = function WebGLRenderingContext() {// TODO

  _classCallCheck(this, WebGLRenderingContext);
};

exports["default"] = WebGLRenderingContext;
module.exports = exports["default"];

},{}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable */
var _socketTask = new WeakMap();

var WebSocket = /*#__PURE__*/function () {
  function WebSocket(url) {
    var _this = this;

    var protocols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, WebSocket);

    this.binaryType = ''; // TODO 更新 binaryType

    this.bufferedAmount = 0; // TODO 更新 bufferedAmount

    this.extensions = '';
    this.onclose = null;
    this.onerror = null;
    this.onmessage = null;
    this.onopen = null;
    this.protocol = ''; // TODO 小程序内目前获取不到，实际上需要根据服务器选择的 sub-protocol 返回

    this.readyState = 3;

    if (typeof url !== 'string' || !/(^ws:\/\/)|(^wss:\/\/)/.test(url)) {
      throw new TypeError("Failed to construct 'WebSocket': The URL '".concat(url, "' is invalid"));
    }

    this.url = url;
    this.readyState = WebSocket.CONNECTING;
    var socketTask = swan.connectSocket({
      url: url,
      protocols: Array.isArray(protocols) ? protocols : [protocols]
    });

    _socketTask.set(this, socketTask);

    socketTask.onClose(function (res) {
      _this.readyState = WebSocket.CLOSED;

      if (typeof _this.onclose === 'function') {
        _this.onclose(res);
      }
    });
    socketTask.onMessage(function (res) {
      if (typeof _this.onmessage === 'function') {
        _this.onmessage(res);
      }
    });
    socketTask.onOpen(function () {
      _this.readyState = WebSocket.OPEN;

      if (typeof _this.onopen === 'function') {
        _this.onopen();
      }
    });
    socketTask.onError(function (res) {
      if (typeof _this.onerror === 'function') {
        _this.onerror(new Error(res.errMsg));
      }
    });
    return this;
  }

  _createClass(WebSocket, [{
    key: "close",
    value: function close(code, reason) {
      this.readyState = WebSocket.CLOSING;

      var socketTask = _socketTask.get(this);

      socketTask.close({
        code: code,
        reason: reason
      });
    }
  }, {
    key: "send",
    value: function send(data) {
      if (typeof data !== 'string' && !(data instanceof ArrayBuffer)) {
        throw new TypeError("Failed to send message: The data ".concat(data, " is invalid"));
      }

      var socketTask = _socketTask.get(this);

      socketTask.send({
        data: data
      });
    }
  }]);

  return WebSocket;
}();

exports["default"] = WebSocket;
WebSocket.CONNECTING = 0; // The connection is not yet open.

WebSocket.OPEN = 1; // The connection is open and ready to communicate.

WebSocket.CLOSING = 2; // The connection is in the process of closing.

WebSocket.CLOSED = 3; // The connection is closed or couldn't be opened.

module.exports = exports["default"];

},{}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "performance", {
  enumerable: true,
  get: function get() {
    return _performance["default"];
  }
});
exports.ontouchend = exports.ontouchmove = exports.ontouchstart = exports.scrollY = exports.scrollX = exports.screen = exports.devicePixelRatio = exports.innerHeight = exports.innerWidth = void 0;

var _performance = _interopRequireDefault(require("./performance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
var _ref = swan.getSystemInfoSync ? swan.getSystemInfoSync() : {
  screenWidth: 0,
  screenHeight: 0,
  devicePixelRatio: 1
},
    screenWidth = _ref.screenWidth,
    screenHeight = _ref.screenHeight,
    devicePixelRatio = _ref.devicePixelRatio; // Mock data


exports.devicePixelRatio = devicePixelRatio;
var innerWidth = screenWidth;
exports.innerWidth = innerWidth;
var innerHeight = screenHeight;
exports.innerHeight = innerHeight;
var screen = {
  width: screenWidth,
  height: screenHeight,
  availWidth: innerWidth,
  availHeight: innerHeight,
  availLeft: 0,
  availTop: 0
};
exports.screen = screen;
var scrollX = 0;
exports.scrollX = scrollX;
var scrollY = 0;
exports.scrollY = scrollY;
var ontouchstart = null;
exports.ontouchstart = ontouchstart;
var ontouchmove = null;
exports.ontouchmove = ontouchmove;
var ontouchend = null;
exports.ontouchend = ontouchend;

},{"./performance":55}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable */
var Worker = /*#__PURE__*/function () {
  function Worker(file) {
    var _this = this;

    _classCallCheck(this, Worker);

    this.onmessage = null; // 目前 微信小游戏中 Worker 最大并发数量限制为 1 个，
    // 所以创建新Worker前, 需要结束现有的 Worker.terminate

    if (Worker.previousWorker) {
      Worker.previousWorker.terminate();
    }

    Worker.previousWorker = this;
    this._file = file;
    this._worker = swan.createWorker(file);

    this._worker.onMessage(function (res) {
      if (_this.onmessage) {
        _this.onmessage({
          target: _this,
          data: res
        });
      }
    });
  }

  _createClass(Worker, [{
    key: "postMessage",
    value: function postMessage(message, transferList) {
      this._worker.postMessage(message, transferList);
    }
  }, {
    key: "terminate",
    value: function terminate() {
      this._worker.terminate();

      Worker.previousWorker = null;
    }
  }]);

  return Worker;
}();

exports["default"] = Worker;
Worker.previousWorker = null; // export default function(file) {
//     const worker = swan.createWorker(file)
//     return worker
// }

module.exports = exports["default"];

},{}],49:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _EventTarget2 = _interopRequireDefault(require("./EventTarget.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _url = new WeakMap();

var _method = new WeakMap();

var _requestHeader = new WeakMap();

var _responseHeader = new WeakMap();

var _requestTask = new WeakMap();

var fs;

function _triggerEvent(type) {
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  event.target = event.target || this;

  if (typeof this["on".concat(type)] === 'function') {
    this["on".concat(type)].call(this, event);
  }
}

function _changeReadyState(readyState) {
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  this.readyState = readyState;
  event.readyState = readyState;

  _triggerEvent.call(this, 'readystatechange', event);
}

function _isRelativePath(url) {
  return !/^(http|https|ftp|wxfile):\/\/.*/i.test(url);
}

var XMLHttpRequest = /*#__PURE__*/function (_EventTarget) {
  _inherits(XMLHttpRequest, _EventTarget);

  var _super = _createSuper(XMLHttpRequest);

  function XMLHttpRequest() {
    var _this;

    _classCallCheck(this, XMLHttpRequest);

    _this = _super.call(this);
    /*
     * TODO 这一批事件应该是在 XMLHttpRequestEventTarget.prototype 上面的
     */

    _this.onabort = null;
    _this.onerror = null;
    _this.onload = null;
    _this.onloadstart = null;
    _this.onprogress = null;
    _this.ontimeout = null;
    _this.onloadend = null;
    _this.onreadystatechange = null;
    _this.readyState = 0;
    _this.response = null;
    _this.responseText = null;
    _this.responseType = '';
    _this.responseXML = null;
    _this.status = 0;
    _this.statusText = '';
    _this.upload = {};
    _this.withCredentials = false;

    _requestHeader.set(_assertThisInitialized(_this), {
      'content-type': 'application/x-www-form-urlencoded'
    });

    _responseHeader.set(_assertThisInitialized(_this), {});

    return _this;
  }

  _createClass(XMLHttpRequest, [{
    key: "abort",
    value: function abort() {
      var myRequestTask = _requestTask.get(this);

      if (myRequestTask) {
        myRequestTask.abort();
      }
    }
  }, {
    key: "getAllResponseHeaders",
    value: function getAllResponseHeaders() {
      var responseHeader = _responseHeader.get(this);

      return Object.keys(responseHeader).map(function (header) {
        return "".concat(header, ": ").concat(responseHeader[header]);
      }).join('\n');
    }
  }, {
    key: "getResponseHeader",
    value: function getResponseHeader(header) {
      return _responseHeader.get(this)[header];
    }
  }, {
    key: "open",
    value: function open(method, url
    /* async, user, password 这几个参数在小程序内不支持*/
    ) {
      _method.set(this, method);

      _url.set(this, url);

      _changeReadyState.call(this, XMLHttpRequest.OPENED);
    }
  }, {
    key: "overrideMimeType",
    value: function overrideMimeType() {}
  }, {
    key: "send",
    value: function send() {
      var _this2 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (this.readyState !== XMLHttpRequest.OPENED) {
        throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
      } else {
        var url = _url.get(this);

        var header = _requestHeader.get(this);

        var responseType = this.responseType;

        var relative = _isRelativePath(url);

        var encoding;

        if (responseType === 'arraybuffer') {// encoding = 'binary'
        } else {
          encoding = 'utf8';
        }

        delete this.response;
        this.response = null;

        var onSuccess = function onSuccess(_ref) {
          var data = _ref.data,
              statusCode = _ref.statusCode,
              header = _ref.header;
          statusCode = statusCode === undefined ? 200 : statusCode;

          if (typeof data !== 'string' && !(data instanceof ArrayBuffer)) {
            try {
              data = JSON.stringify(data);
            } catch (e) {
              data = data;
            }
          }

          _this2.status = statusCode;

          if (header) {
            _responseHeader.set(_this2, header);
          }

          _triggerEvent.call(_this2, 'loadstart');

          _changeReadyState.call(_this2, XMLHttpRequest.HEADERS_RECEIVED);

          _changeReadyState.call(_this2, XMLHttpRequest.LOADING);

          _this2.response = data;

          if (data instanceof ArrayBuffer) {
            Object.defineProperty(_this2, 'responseText', {
              enumerable: true,
              configurable: true,
              get: function get() {
                throw "InvalidStateError : responseType is " + this.responseType;
              }
            });
          } else {
            Object.defineProperty(_this2, 'responseText', {
              enumerable: true,
              configurable: true,
              value: data
            });
          }

          _changeReadyState.call(_this2, XMLHttpRequest.DONE);

          _triggerEvent.call(_this2, 'load');

          _triggerEvent.call(_this2, 'loadend');
        };

        var onFail = function onFail(_ref2) {
          var errMsg = _ref2.errMsg;

          // TODO 规范错误
          if (errMsg.indexOf('abort') !== -1) {
            _triggerEvent.call(_this2, 'abort');
          } else {
            _triggerEvent.call(_this2, 'error', {
              message: errMsg
            });
          }

          _triggerEvent.call(_this2, 'loadend');

          if (relative) {
            // 用户即使没监听error事件, 也给出相应的警告
            console.warn(errMsg);
          }
        };

        if (relative) {
          var options = {
            'filePath': url,
            'success': onSuccess,
            'fail': onFail
          };

          if (encoding) {
            options['encoding'] = encoding;
          }

          if (!fs) {
            fs = swan.getFileSystemManager();
          }

          fs.readFile(options);
          return;
        }

        swan.request({
          data: data,
          url: url,
          method: _method.get(this),
          header: header,
          responseType: responseType,
          success: onSuccess,
          fail: onFail
        });
      }
    }
  }, {
    key: "setRequestHeader",
    value: function setRequestHeader(header, value) {
      var myHeader = _requestHeader.get(this);

      myHeader[header] = value;

      _requestHeader.set(this, myHeader);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(type, listener) {
      var _this3 = this;

      if (typeof listener !== 'function') {
        return;
      }

      this['on' + type] = function () {
        var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        event.target = event.target || _this3;
        listener.call(_this3, event);
      };
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, listener) {
      if (this['on' + type] === listener) {
        this['on' + type] = null;
      }
    }
  }]);

  return XMLHttpRequest;
}(_EventTarget2["default"]); // TODO 没法模拟 HEADERS_RECEIVED 和 LOADING 两个状态


exports["default"] = XMLHttpRequest;
XMLHttpRequest.UNSEND = 0;
XMLHttpRequest.OPENED = 1;
XMLHttpRequest.HEADERS_RECEIVED = 2;
XMLHttpRequest.LOADING = 3;
XMLHttpRequest.DONE = 4;
module.exports = exports["default"];

},{"./EventTarget.js":35}],50:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var window = _interopRequireWildcard(require("./window"));

var _Event = _interopRequireDefault(require("./Event"));

var _HTMLElement = _interopRequireDefault(require("./HTMLElement"));

var _HTMLVideoElement = _interopRequireDefault(require("./HTMLVideoElement"));

var _Image = _interopRequireDefault(require("./Image"));

var _Audio = _interopRequireDefault(require("./Audio"));

var _Canvas = _interopRequireDefault(require("./Canvas"));

var _DocumentElement = _interopRequireDefault(require("./DocumentElement"));

var _Body = _interopRequireDefault(require("./Body"));

require("./EventIniter/index.js");

var _location = _interopRequireDefault(require("./location"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable */
var events = {};
var document = {
  readyState: 'complete',
  visibilityState: 'visible',
  // 'visible' , 'hidden'
  hidden: false,
  fullscreen: true,
  URL: _location["default"].href,
  location: window.location,
  scripts: [],
  style: {},
  ontouchstart: null,
  ontouchmove: null,
  ontouchend: null,
  onvisibilitychange: null,
  parentNode: null,
  parentElement: null,
  createElement: function createElement(tagName) {
    tagName = tagName.toLowerCase();

    if (tagName === 'canvas') {
      return new _Canvas["default"]();
    } else if (tagName === 'audio') {
      return new _Audio["default"]();
    } else if (tagName === 'img') {
      return new _Image["default"]();
    } else if (tagName === 'video') {
      return new _HTMLVideoElement["default"]();
    }

    return new _HTMLElement["default"](tagName);
  },
  createElementNS: function createElementNS(nameSpace, tagName) {
    return this.createElement(tagName);
  },
  createTextNode: function createTextNode(text) {
    // TODO: Do we need the TextNode Class ???
    return text;
  },
  getElementById: function getElementById(id) {
    if (id === window.canvas.id) {
      return window.canvas;
    }

    return null;
  },
  getElementsByTagName: function getElementsByTagName(tagName) {
    tagName = tagName.toLowerCase();

    if (tagName === 'head') {
      return [document.head];
    } else if (tagName === 'body') {
      return [document.body];
    } else if (tagName === 'canvas') {
      return [window.canvas];
    }

    return [];
  },
  getElementsByTagNameNS: function getElementsByTagNameNS(nameSpace, tagName) {
    return this.getElementsByTagName(tagName);
  },
  getElementsByName: function getElementsByName(tagName) {
    if (tagName === 'head') {
      return [document.head];
    } else if (tagName === 'body') {
      return [document.body];
    } else if (tagName === 'canvas') {
      return [window.canvas];
    }

    return [];
  },
  querySelector: function querySelector(query) {
    if (query === 'head') {
      return document.head;
    } else if (query === 'body') {
      return document.body;
    } else if (query === 'canvas') {
      return window.canvas;
    } else if (query === "#".concat(window.canvas.id)) {
      return window.canvas;
    }

    return null;
  },
  querySelectorAll: function querySelectorAll(query) {
    if (query === 'head') {
      return [document.head];
    } else if (query === 'body') {
      return [document.body];
    } else if (query === 'canvas') {
      return [window.canvas];
    }

    return [];
  },
  addEventListener: function addEventListener(type, listener) {
    if (!events[type]) {
      events[type] = [];
    }

    events[type].push(listener);
  },
  removeEventListener: function removeEventListener(type, listener) {
    var listeners = events[type];

    if (listeners && listeners.length > 0) {
      for (var i = listeners.length; i--; i > 0) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1);
          break;
        }
      }
    }
  },
  dispatchEvent: function dispatchEvent(event) {
    var type = event.type;
    var listeners = events[type];

    if (listeners) {
      for (var i = 0; i < listeners.length; i++) {
        listeners[i](event);
      }
    }

    if (event.target && typeof event.target['on' + type] === 'function') {
      event.target['on' + type](event);
    }
  }
};
document.documentElement = new _DocumentElement["default"]();
document.head = new _HTMLElement["default"]('head');
document.body = new _Body["default"]();

function onVisibilityChange(visible) {
  return function () {
    document.visibilityState = visible ? 'visible' : 'hidden';
    var hidden = !visible;

    if (document.hidden === hidden) {
      return;
    }

    document.hidden = hidden;
    var event = new _Event["default"]('visibilitychange');
    event.target = document;
    event.timeStamp = Date.now();
    document.dispatchEvent(event);
  };
}

if (swan.onHide) {
  swan.onHide(onVisibilityChange(false));
  swan.onShow(onVisibilityChange(true));
}

var _default = document;
exports["default"] = _default;
module.exports = exports["default"];

},{"./Audio":24,"./Body":26,"./Canvas":27,"./DocumentElement":28,"./Event":30,"./EventIniter/index.js":34,"./HTMLElement":38,"./HTMLVideoElement":41,"./Image":42,"./location":53,"./window":62}],51:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _$window = _interopRequireWildcard(require("./window"));

var _document = _interopRequireDefault(require("./document"));

var _isDevtool = _interopRequireDefault(require("./util/isDevtool"));

var _HTMLElement = _interopRequireDefault(require("./HTMLElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable */
// Avoid being static analyzed in webpack
var _window = _$window;
var global = GameGlobal;
GameGlobal.global = GameGlobal.global || global;

function inject() {
  _window.document = _document["default"];

  _window.addEventListener = function (type, listener) {
    _window.document.addEventListener(type, listener);
  };

  _window.removeEventListener = function (type, listener) {
    _window.document.removeEventListener(type, listener);
  };

  _window.dispatchEvent = _window.document.dispatchEvent;

  if ((0, _isDevtool["default"])()) {
    for (var key in _window) {
      var descriptor = Object.getOwnPropertyDescriptor(global, key);

      if (!descriptor || descriptor.configurable === true) {
        Object.defineProperty(window, key, {
          value: _window[key]
        });
      }
    }

    for (var _key in _window.document) {
      var _descriptor = Object.getOwnPropertyDescriptor(global.document, _key);

      if (!_descriptor || _descriptor.configurable === true) {
        Object.defineProperty(global.document, _key, {
          value: _window.document[_key]
        });
      }
    }

    window.parent = window;
  } else {
    for (var _key2 in _window) {
      global[_key2] = _window[_key2];
    }

    global.window = global;
    global.top = global.parent = global;
  }
}

if (swan.getSharedCanvas) {
  var sharedCanvas = swan.getSharedCanvas(); //     sharedCanvas.__proto__.__proto__ = new HTMLCanvasElement;

  if (!_window.sharedCanvas) {
    // 兼容微信
    _window.sharedCanvas = sharedCanvas;
  }

  sharedCanvas.addEventListener = _window.addEventListener;
  sharedCanvas.removeEventListener = _window.removeEventListener;
}

if (!GameGlobal.__isAdapterInjected) {
  GameGlobal.__isAdapterInjected = true;
  inject();
}

},{"./HTMLElement":38,"./document":50,"./util/isDevtool":60,"./window":62}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint-disable */
var localStorage = {
  get length() {
    var _swan$getStorageInfoS = swan.getStorageInfoSync(),
        keys = _swan$getStorageInfoS.keys;

    return keys.length;
  },

  key: function key(n) {
    var _swan$getStorageInfoS2 = swan.getStorageInfoSync(),
        keys = _swan$getStorageInfoS2.keys;

    return keys[n];
  },
  getItem: function getItem(key) {
    var value = swan.getStorageSync(key);
    return value === "" ? null : value;
  },
  setItem: function setItem(key, value) {
    return swan.setStorageSync(key, value);
  },
  removeItem: function removeItem(key) {
    swan.removeStorageSync(key);
  },
  clear: function clear() {
    swan.clearStorageSync();
  }
};
var _default = localStorage;
exports["default"] = _default;
module.exports = exports["default"];

},{}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint-disable */
var location = {
  href: 'game.js',
  search: '',
  hash: '',
  reload: function reload() {},
  replace: function replace(href) {
    this.href = href;
  }
};
var _default = location;
exports["default"] = _default;
module.exports = exports["default"];

},{}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("./util/index.js");

/* eslint-disable */
// TODO 开放域下用 userAgent
var systemInfo = swan.getSystemInfoSync && swan.getSystemInfoSync();
var system = systemInfo && systemInfo.system || '';
var platform = systemInfo && systemInfo.platform || '';
var language = systemInfo && systemInfo.language || '"zh_CN"';
var android = system.toLowerCase().indexOf('android') !== -1;
var uaDesc = android ? 'Android; CPU Android 6.0' : 'iPhone; CPU iPhone OS 10_3_1 like Mac OS X';
var ua = "Mozilla/5.0 (".concat(uaDesc, ") AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 MicroMessenger/6.6.0 SwanGame NetType/WIFI Language/").concat(language);
var navigator = {
  platform: platform,
  language: language,
  appVersion: "5.0 (".concat(uaDesc, ") AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"),
  userAgent: ua,
  onLine: true,
  // TODO 用 swan.getNetworkStateChange 和 swan.onNetworkStateChange 来返回真实的状态
  // TODO 用 swan.getLocation 来封装 geolocation
  geolocation: {
    getCurrentPosition: _index.noop,
    watchPosition: _index.noop,
    clearWatch: _index.noop
  }
};

if (swan.onNetworkStatusChange) {
  swan.onNetworkStatusChange(function (event) {
    navigator.onLine = event.isConnected;
  });
}

var _default = navigator;
exports["default"] = _default;
module.exports = exports["default"];

},{"./util/index.js":59}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isDevtool = _interopRequireDefault(require("./util/isDevtool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
var performance;

if (swan.getPerformance) {
  var swanPerf = swan.getPerformance();
  var initTime = swanPerf.now();
  var clientPerfAdapter = Object.assign({}, swanPerf, {
    now: function now() {
      return (swanPerf.now() - initTime) / 1000;
    }
  });
  performance = (0, _isDevtool["default"])() ? swanPerf : clientPerfAdapter;
} else {
  performance = {};
  performance.now = Date.now;
}

var _default = performance;
exports["default"] = _default;
module.exports = exports["default"];

},{"./util/isDevtool":60}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CommonComputedStyle = _interopRequireDefault(require("./CommonComputedStyle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
function getCanvasComputedStyle(canvas) {
  var rect = canvas.getBoundingClientRect();
  var style = Object.assign(_CommonComputedStyle["default"], {
    "display": "inline",
    "position": "static",
    "inlineSize": rect.width + "px",
    "perspectiveOrigin": rect.width / 2 + "px " + rect.height / 2 + "px",
    "transformOrigin": rect.width / 2 + "px " + rect.height / 2 + "px",
    "webkitLogicalWidth": rect.width + "px",
    "webkitLogicalHeight": rect.height + "px",
    "width": rect.width + "px",
    "height": rect.height + "px"
  });
  return style;
}

var _default = getCanvasComputedStyle;
exports["default"] = _default;
module.exports = exports["default"];

},{"./CommonComputedStyle":57}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint-disable */
var style = {
  "0": "animation-delay",
  "1": "animation-direction",
  "2": "animation-duration",
  "3": "animation-fill-mode",
  "4": "animation-iteration-count",
  "5": "animation-name",
  "6": "animation-play-state",
  "7": "animation-timing-function",
  "8": "background-attachment",
  "9": "background-blend-mode",
  "10": "background-clip",
  "11": "background-color",
  "12": "background-image",
  "13": "background-origin",
  "14": "background-position",
  "15": "background-repeat",
  "16": "background-size",
  "17": "border-bottom-color",
  "18": "border-bottom-left-radius",
  "19": "border-bottom-right-radius",
  "20": "border-bottom-style",
  "21": "border-bottom-width",
  "22": "border-collapse",
  "23": "border-image-outset",
  "24": "border-image-repeat",
  "25": "border-image-slice",
  "26": "border-image-source",
  "27": "border-image-width",
  "28": "border-left-color",
  "29": "border-left-style",
  "30": "border-left-width",
  "31": "border-right-color",
  "32": "border-right-style",
  "33": "border-right-width",
  "34": "border-top-color",
  "35": "border-top-left-radius",
  "36": "border-top-right-radius",
  "37": "border-top-style",
  "38": "border-top-width",
  "39": "bottom",
  "40": "box-shadow",
  "41": "box-sizing",
  "42": "break-after",
  "43": "break-before",
  "44": "break-inside",
  "45": "caption-side",
  "46": "clear",
  "47": "clip",
  "48": "color",
  "49": "content",
  "50": "cursor",
  "51": "direction",
  "52": "display",
  "53": "empty-cells",
  "54": "float",
  "55": "font-family",
  "56": "font-kerning",
  "57": "font-size",
  "58": "font-stretch",
  "59": "font-style",
  "60": "font-variant",
  "61": "font-variant-ligatures",
  "62": "font-variant-caps",
  "63": "font-variant-numeric",
  "64": "font-variant-east-asian",
  "65": "font-weight",
  "66": "height",
  "67": "image-rendering",
  "68": "isolation",
  "69": "justify-items",
  "70": "justify-self",
  "71": "left",
  "72": "letter-spacing",
  "73": "line-height",
  "74": "list-style-image",
  "75": "list-style-position",
  "76": "list-style-type",
  "77": "margin-bottom",
  "78": "margin-left",
  "79": "margin-right",
  "80": "margin-top",
  "81": "max-height",
  "82": "max-width",
  "83": "min-height",
  "84": "min-width",
  "85": "mix-blend-mode",
  "86": "object-fit",
  "87": "object-position",
  "88": "offset-distance",
  "89": "offset-path",
  "90": "offset-rotate",
  "91": "opacity",
  "92": "orphans",
  "93": "outline-color",
  "94": "outline-offset",
  "95": "outline-style",
  "96": "outline-width",
  "97": "overflow-anchor",
  "98": "overflow-wrap",
  "99": "overflow-x",
  "100": "overflow-y",
  "101": "padding-bottom",
  "102": "padding-left",
  "103": "padding-right",
  "104": "padding-top",
  "105": "pointer-events",
  "106": "position",
  "107": "resize",
  "108": "right",
  "109": "scroll-behavior",
  "110": "speak",
  "111": "table-layout",
  "112": "tab-size",
  "113": "text-align",
  "114": "text-align-last",
  "115": "text-decoration",
  "116": "text-decoration-line",
  "117": "text-decoration-style",
  "118": "text-decoration-color",
  "119": "text-decoration-skip-ink",
  "120": "text-underline-position",
  "121": "text-indent",
  "122": "text-rendering",
  "123": "text-shadow",
  "124": "text-size-adjust",
  "125": "text-overflow",
  "126": "text-transform",
  "127": "top",
  "128": "touch-action",
  "129": "transition-delay",
  "130": "transition-duration",
  "131": "transition-property",
  "132": "transition-timing-function",
  "133": "unicode-bidi",
  "134": "vertical-align",
  "135": "visibility",
  "136": "white-space",
  "137": "widows",
  "138": "width",
  "139": "will-change",
  "140": "word-break",
  "141": "word-spacing",
  "142": "word-wrap",
  "143": "z-index",
  "144": "zoom",
  "145": "-webkit-appearance",
  "146": "backface-visibility",
  "147": "-webkit-border-horizontal-spacing",
  "148": "-webkit-border-image",
  "149": "-webkit-border-vertical-spacing",
  "150": "-webkit-box-align",
  "151": "-webkit-box-decoration-break",
  "152": "-webkit-box-direction",
  "153": "-webkit-box-flex",
  "154": "-webkit-box-flex-group",
  "155": "-webkit-box-lines",
  "156": "-webkit-box-ordinal-group",
  "157": "-webkit-box-orient",
  "158": "-webkit-box-pack",
  "159": "-webkit-box-reflect",
  "160": "column-count",
  "161": "column-gap",
  "162": "column-rule-color",
  "163": "column-rule-style",
  "164": "column-rule-width",
  "165": "column-span",
  "166": "column-width",
  "167": "align-content",
  "168": "align-items",
  "169": "align-self",
  "170": "flex-basis",
  "171": "flex-grow",
  "172": "flex-shrink",
  "173": "flex-direction",
  "174": "flex-wrap",
  "175": "justify-content",
  "176": "-webkit-font-smoothing",
  "177": "grid-auto-columns",
  "178": "grid-auto-flow",
  "179": "grid-auto-rows",
  "180": "grid-column-end",
  "181": "grid-column-start",
  "182": "grid-template-areas",
  "183": "grid-template-columns",
  "184": "grid-template-rows",
  "185": "grid-row-end",
  "186": "grid-row-start",
  "187": "grid-column-gap",
  "188": "grid-row-gap",
  "189": "-webkit-highlight",
  "190": "hyphens",
  "191": "-webkit-hyphenate-character",
  "192": "-webkit-line-break",
  "193": "-webkit-line-clamp",
  "194": "-webkit-locale",
  "195": "-webkit-margin-before-collapse",
  "196": "-webkit-margin-after-collapse",
  "197": "-webkit-mask-box-image",
  "198": "-webkit-mask-box-image-outset",
  "199": "-webkit-mask-box-image-repeat",
  "200": "-webkit-mask-box-image-slice",
  "201": "-webkit-mask-box-image-source",
  "202": "-webkit-mask-box-image-width",
  "203": "-webkit-mask-clip",
  "204": "-webkit-mask-composite",
  "205": "-webkit-mask-image",
  "206": "-webkit-mask-origin",
  "207": "-webkit-mask-position",
  "208": "-webkit-mask-repeat",
  "209": "-webkit-mask-size",
  "210": "order",
  "211": "perspective",
  "212": "perspective-origin",
  "213": "-webkit-print-color-adjust",
  "214": "-webkit-rtl-ordering",
  "215": "shape-outside",
  "216": "shape-image-threshold",
  "217": "shape-margin",
  "218": "-webkit-tap-highlight-color",
  "219": "-webkit-text-combine",
  "220": "-webkit-text-decorations-in-effect",
  "221": "-webkit-text-emphasis-color",
  "222": "-webkit-text-emphasis-position",
  "223": "-webkit-text-emphasis-style",
  "224": "-webkit-text-fill-color",
  "225": "-webkit-text-orientation",
  "226": "-webkit-text-security",
  "227": "-webkit-text-stroke-color",
  "228": "-webkit-text-stroke-width",
  "229": "transform",
  "230": "transform-origin",
  "231": "transform-style",
  "232": "-webkit-user-drag",
  "233": "-webkit-user-modify",
  "234": "user-select",
  "235": "-webkit-writing-mode",
  "236": "-webkit-app-region",
  "237": "buffered-rendering",
  "238": "clip-path",
  "239": "clip-rule",
  "240": "mask",
  "241": "filter",
  "242": "flood-color",
  "243": "flood-opacity",
  "244": "lighting-color",
  "245": "stop-color",
  "246": "stop-opacity",
  "247": "color-interpolation",
  "248": "color-interpolation-filters",
  "249": "color-rendering",
  "250": "fill",
  "251": "fill-opacity",
  "252": "fill-rule",
  "253": "marker-end",
  "254": "marker-mid",
  "255": "marker-start",
  "256": "mask-type",
  "257": "shape-rendering",
  "258": "stroke",
  "259": "stroke-dasharray",
  "260": "stroke-dashoffset",
  "261": "stroke-linecap",
  "262": "stroke-linejoin",
  "263": "stroke-miterlimit",
  "264": "stroke-opacity",
  "265": "stroke-width",
  "266": "alignment-baseline",
  "267": "baseline-shift",
  "268": "dominant-baseline",
  "269": "text-anchor",
  "270": "writing-mode",
  "271": "vector-effect",
  "272": "paint-order",
  "273": "d",
  "274": "cx",
  "275": "cy",
  "276": "x",
  "277": "y",
  "278": "r",
  "279": "rx",
  "280": "ry",
  "281": "caret-color",
  "282": "line-break",
  "display": "inline",
  "dominantBaseline": "auto",
  "emptyCells": "show",
  "fill": "rgb(0, 0, 0)",
  "fillOpacity": "1",
  "fillRule": "nonzero",
  "filter": "none",
  "flex": "0 1 auto",
  "flexBasis": "auto",
  "flexDirection": "row",
  "flexFlow": "row nowrap",
  "flexGrow": "0",
  "flexShrink": "1",
  "flexWrap": "nowrap",
  "float": "none",
  "floodColor": "rgb(0, 0, 0)",
  "floodOpacity": "1",
  "font": "normal normal 400 normal 16px / normal \"PingFang SC\"",
  "fontDisplay": "",
  "fontFamily": "\"PingFang SC\"",
  "fontFeatureSettings": "normal",
  "fontKerning": "auto",
  "fontSize": "16px",
  "fontStretch": "100%",
  "fontStyle": "normal",
  "fontVariant": "normal",
  "fontVariantCaps": "normal",
  "fontVariantEastAsian": "normal",
  "fontVariantLigatures": "normal",
  "fontVariantNumeric": "normal",
  "fontVariationSettings": "normal",
  "fontWeight": "400",
  "grid": "none / none / none / row / auto / auto",
  "gridArea": "auto / auto / auto / auto",
  "gridAutoColumns": "auto",
  "gridAutoFlow": "row",
  "gridAutoRows": "auto",
  "gridColumn": "auto / auto",
  "gridColumnEnd": "auto",
  "gridColumnGap": "0px",
  "gridColumnStart": "auto",
  "gridGap": "0px 0px",
  "gridRow": "auto / auto",
  "gridRowEnd": "auto",
  "gridRowGap": "0px",
  "gridRowStart": "auto",
  "gridTemplate": "none / none / none",
  "gridTemplateAreas": "none",
  "gridTemplateColumns": "none",
  "gridTemplateRows": "none",
  "height": "0px",
  "hyphens": "manual",
  "imageRendering": "auto",
  "inlineSize": "0px",
  "isolation": "auto",
  "justifyContent": "normal",
  "justifyItems": "normal",
  "justifySelf": "auto",
  "left": "auto",
  "letterSpacing": "normal",
  "lightingColor": "rgb(255, 255, 255)",
  "lineBreak": "auto",
  "lineHeight": "normal",
  "listStyle": "disc outside none",
  "listStyleImage": "none",
  "listStylePosition": "outside",
  "listStyleType": "disc",
  "margin": "0px",
  "marginBottom": "0px",
  "marginLeft": "0px",
  "marginRight": "0px",
  "marginTop": "0px",
  "marker": "",
  "markerEnd": "none",
  "markerMid": "none",
  "markerStart": "none",
  "mask": "none",
  "maskType": "luminance",
  "maxBlockSize": "none",
  "maxHeight": "none",
  "maxInlineSize": "none",
  "maxWidth": "none",
  "maxZoom": "",
  "minBlockSize": "0px",
  "minHeight": "0px",
  "minInlineSize": "0px",
  "minWidth": "0px",
  "minZoom": "",
  "mixBlendMode": "normal",
  "objectFit": "fill",
  "objectPosition": "50% 50%",
  "offset": "none 0px auto 0deg",
  "offsetDistance": "0px",
  "offsetPath": "none",
  "offsetRotate": "auto 0deg",
  "opacity": "1",
  "order": "0",
  "orientation": "",
  "orphans": "2",
  "outline": "rgb(0, 0, 0) none 0px",
  "outlineColor": "rgb(0, 0, 0)",
  "outlineOffset": "0px",
  "outlineStyle": "none",
  "outlineWidth": "0px",
  "overflow": "visible",
  "overflowAnchor": "auto",
  "overflowWrap": "normal",
  "overflowX": "visible",
  "overflowY": "visible",
  "overscrollBehavior": "auto auto",
  "overscrollBehaviorX": "auto",
  "overscrollBehaviorY": "auto",
  "padding": "0px",
  "paddingBottom": "0px",
  "paddingLeft": "0px",
  "paddingRight": "0px",
  "paddingTop": "0px",
  "page": "",
  "pageBreakAfter": "auto",
  "pageBreakBefore": "auto",
  "pageBreakInside": "auto",
  "paintOrder": "fill stroke markers",
  "perspective": "none",
  "perspectiveOrigin": "0px 0px",
  "placeContent": "normal normal",
  "placeItems": "normal normal",
  "placeSelf": "auto auto",
  "pointerEvents": "auto",
  "position": "static",
  "quotes": "",
  "r": "0px",
  "resize": "none",
  "right": "auto",
  "rx": "auto",
  "ry": "auto",
  "scrollBehavior": "auto",
  "shapeImageThreshold": "0",
  "shapeMargin": "0px",
  "shapeOutside": "none",
  "shapeRendering": "auto",
  "size": "",
  "speak": "normal",
  "src": "",
  "stopColor": "rgb(0, 0, 0)",
  "stopOpacity": "1",
  "stroke": "none",
  "strokeDasharray": "none",
  "strokeDashoffset": "0px",
  "strokeLinecap": "butt",
  "strokeLinejoin": "miter",
  "strokeMiterlimit": "4",
  "strokeOpacity": "1",
  "strokeWidth": "1px",
  "tabSize": "8",
  "tableLayout": "auto",
  "textAlign": "start",
  "textAlignLast": "auto",
  "textAnchor": "start",
  "textCombineUpright": "none",
  "textDecoration": "none solid rgb(0, 0, 0)",
  "textDecorationColor": "rgb(0, 0, 0)",
  "textDecorationLine": "none",
  "textDecorationSkipInk": "auto",
  "textDecorationStyle": "solid",
  "textIndent": "0px",
  "textOrientation": "mixed",
  "textOverflow": "clip",
  "textRendering": "auto",
  "textShadow": "none",
  "textSizeAdjust": "auto",
  "textTransform": "none",
  "textUnderlinePosition": "auto",
  "top": "auto",
  "touchAction": "auto",
  "transform": "none",
  "transformBox": "view-box",
  "transformOrigin": "0px 0px",
  "transformStyle": "flat",
  "transition": "all 0s ease 0s",
  "transitionDelay": "0s",
  "transitionDuration": "0s",
  "transitionProperty": "all",
  "transitionTimingFunction": "ease",
  "unicodeBidi": "normal",
  "unicodeRange": "",
  "userSelect": "auto",
  "userZoom": "",
  "vectorEffect": "none",
  "verticalAlign": "baseline",
  "visibility": "visible",
  "webkitAppRegion": "no-drag",
  "webkitAppearance": "none",
  "webkitBorderAfter": "0px none rgb(0, 0, 0)",
  "webkitBorderAfterColor": "rgb(0, 0, 0)",
  "webkitBorderAfterStyle": "none",
  "webkitBorderAfterWidth": "0px",
  "webkitBorderBefore": "0px none rgb(0, 0, 0)",
  "webkitBorderBeforeColor": "rgb(0, 0, 0)",
  "webkitBorderBeforeStyle": "none",
  "webkitBorderBeforeWidth": "0px",
  "webkitBorderEnd": "0px none rgb(0, 0, 0)",
  "webkitBorderEndColor": "rgb(0, 0, 0)",
  "webkitBorderEndStyle": "none",
  "webkitBorderEndWidth": "0px",
  "webkitBorderHorizontalSpacing": "0px",
  "webkitBorderImage": "none",
  "webkitBorderStart": "0px none rgb(0, 0, 0)",
  "webkitBorderStartColor": "rgb(0, 0, 0)",
  "webkitBorderStartStyle": "none",
  "webkitBorderStartWidth": "0px",
  "webkitBorderVerticalSpacing": "0px",
  "webkitBoxAlign": "stretch",
  "webkitBoxDecorationBreak": "slice",
  "webkitBoxDirection": "normal",
  "webkitBoxFlex": "0",
  "webkitBoxFlexGroup": "1",
  "webkitBoxLines": "single",
  "webkitBoxOrdinalGroup": "1",
  "webkitBoxOrient": "horizontal",
  "webkitBoxPack": "start",
  "webkitBoxReflect": "none",
  "webkitColumnBreakAfter": "auto",
  "webkitColumnBreakBefore": "auto",
  "webkitColumnBreakInside": "auto",
  "webkitFontSizeDelta": "",
  "webkitFontSmoothing": "auto",
  "webkitHighlight": "none",
  "webkitHyphenateCharacter": "auto",
  "webkitLineBreak": "auto",
  "webkitLineClamp": "none",
  "webkitLocale": "auto",
  "webkitLogicalHeight": "0px",
  "webkitLogicalWidth": "0px",
  "webkitMarginAfter": "0px",
  "webkitMarginAfterCollapse": "collapse",
  "webkitMarginBefore": "0px",
  "webkitMarginBeforeCollapse": "collapse",
  "webkitMarginBottomCollapse": "collapse",
  "webkitMarginCollapse": "",
  "webkitMarginEnd": "0px",
  "webkitMarginStart": "0px",
  "webkitMarginTopCollapse": "collapse",
  "webkitMask": "",
  "webkitMaskBoxImage": "none",
  "webkitMaskBoxImageOutset": "0px",
  "webkitMaskBoxImageRepeat": "stretch",
  "webkitMaskBoxImageSlice": "0 fill",
  "webkitMaskBoxImageSource": "none",
  "webkitMaskBoxImageWidth": "auto",
  "webkitMaskClip": "border-box",
  "webkitMaskComposite": "source-over",
  "webkitMaskImage": "none",
  "webkitMaskOrigin": "border-box",
  "webkitMaskPosition": "0% 0%",
  "webkitMaskPositionX": "0%",
  "webkitMaskPositionY": "0%",
  "webkitMaskRepeat": "repeat",
  "webkitMaskRepeatX": "",
  "webkitMaskRepeatY": "",
  "webkitMaskSize": "auto",
  "webkitMaxLogicalHeight": "none",
  "webkitMaxLogicalWidth": "none",
  "webkitMinLogicalHeight": "0px",
  "webkitMinLogicalWidth": "0px",
  "webkitPaddingAfter": "0px",
  "webkitPaddingBefore": "0px",
  "webkitPaddingEnd": "0px",
  "webkitPaddingStart": "0px",
  "webkitPerspectiveOriginX": "",
  "webkitPerspectiveOriginY": "",
  "webkitPrintColorAdjust": "economy",
  "webkitRtlOrdering": "logical",
  "webkitRubyPosition": "before",
  "webkitTapHighlightColor": "rgba(0, 0, 0, 0.4)",
  "webkitTextCombine": "none",
  "webkitTextDecorationsInEffect": "none",
  "webkitTextEmphasis": "",
  "webkitTextEmphasisColor": "rgb(0, 0, 0)",
  "webkitTextEmphasisPosition": "over right",
  "webkitTextEmphasisStyle": "none",
  "webkitTextFillColor": "rgb(0, 0, 0)",
  "webkitTextOrientation": "vertical-right",
  "webkitTextSecurity": "none",
  "webkitTextStroke": "",
  "webkitTextStrokeColor": "rgb(0, 0, 0)",
  "webkitTextStrokeWidth": "0px",
  "webkitTransformOriginX": "",
  "webkitTransformOriginY": "",
  "webkitTransformOriginZ": "",
  "webkitUserDrag": "auto",
  "webkitUserModify": "read-only",
  "webkitWritingMode": "horizontal-tb",
  "whiteSpace": "normal",
  "widows": "2",
  "width": "0px",
  "willChange": "auto",
  "wordBreak": "normal",
  "wordSpacing": "0px",
  "wordWrap": "normal",
  "writingMode": "horizontal-tb",
  "x": "0px",
  "y": "0px",
  "zIndex": "auto",
  "zoom": "1"
};
var _default = style;
exports["default"] = _default;
module.exports = exports["default"];

},{}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CommonComputedStyle = _interopRequireDefault(require("./CommonComputedStyle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
function getImageComputedStyle(image) {
  var width = image.width;
  var height = image.height;
  var style = Object.assign(_CommonComputedStyle["default"], {
    "display": "inline",
    "position": "static",
    "inlineSize": width + "px",
    "perspectiveOrigin": width / 2 + "px " + height / 2 + "px",
    "transformOrigin": width / 2 + "px " + height / 2 + "px",
    "webkitLogicalWidth": width + "px",
    "webkitLogicalHeight": height + "px",
    "width": width + "px",
    "height": height + "px"
  });
  return style;
}

var _default = getImageComputedStyle;
exports["default"] = _default;
module.exports = exports["default"];

},{"./CommonComputedStyle":57}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;

/* eslint-disable */
function noop() {}

},{}],60:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/* eslint-disable */
var isDevtool = false;

if (swan.getSystemInfoSync) {
  var _swan$getSystemInfoSy = swan.getSystemInfoSync(),
      platform = _swan$getSystemInfoSy.platform;

  isDevtool = platform === 'devtools';
} else {
  var descriptor = Object.getOwnPropertyDescriptor(global, 'window'); // 开发者工具无法重定义 window

  isDevtool = !(!descriptor || descriptor.configurable === true);
}

function _default() {
  return isDevtool;
}

module.exports = exports["default"];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parentNode = parentNode;
exports.style = style;
exports.clientRegion = clientRegion;
exports.offsetRegion = offsetRegion;
exports.scrollRegion = scrollRegion;
exports.classList = classList;

var _WindowProperties = require("../WindowProperties");

/* eslint-disable */
function parentNode(obj, level) {
  if (!('parentNode' in obj)) {
    var _parent;

    if (level === 0) {
      _parent = function _parent() {
        // return document
        return null;
      };
    } else if (level === 1) {
      _parent = function _parent() {
        return document.documentElement;
      };
    } else {
      _parent = function _parent() {
        return document.body;
      };
    }

    Object.defineProperty(obj, 'parentNode', {
      enumerable: true,
      get: _parent
    });
  }

  if (!('parentElement' in obj)) {
    var _parent2;

    if (level === 0) {
      _parent2 = function _parent2() {
        return null;
      };
    } else if (level === 1) {
      _parent2 = function _parent2() {
        return document.documentElement;
      };
    } else {
      _parent2 = function _parent2() {
        return document.body;
      };
    }

    Object.defineProperty(obj, 'parentElement', {
      enumerable: true,
      get: _parent2
    });
  }
}

function style(obj) {
  obj.style = obj.style || {};
  Object.assign(obj.style, {
    top: '0px',
    left: '0px',
    width: _WindowProperties.innerWidth + 'px',
    height: _WindowProperties.innerHeight + 'px',
    margin: '0px',
    padding: '0px',
    removeProperty: function removeProperty() {},
    setProperty: function setProperty() {}
  });
}

function clientRegion(obj) {
  if (!('clientLeft' in obj)) {
    obj.clientLeft = 0;
    obj.clientTop = 0;
  }

  if (!('clientWidth' in obj)) {
    obj.clientWidth = _WindowProperties.innerWidth;
    obj.clientHeight = _WindowProperties.innerHeight;
  }

  if (!('getBoundingClientRect' in obj)) {
    obj.getBoundingClientRect = function () {
      var ret = {
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        width: this.clientWidth,
        height: this.clientHeight
      };
      ret.right = ret.width;
      ret.bottom = ret.height;
      return ret;
    };
  }
}

function offsetRegion(obj) {
  if (!('offsetLeft' in obj)) {
    obj.offsetLeft = 0;
    obj.offsetTop = 0;
  }

  if (!('offsetWidth' in obj)) {
    obj.offsetWidth = _WindowProperties.innerWidth;
    obj.offsetHeight = _WindowProperties.innerHeight;
  }
}

function scrollRegion(obj) {
  if (!('scrollLeft' in obj)) {
    obj.scrollLeft = 0;
    obj.scrollTop = 0;
  }

  if (!('scrollWidth' in obj)) {
    obj.scrollWidth = _WindowProperties.innerWidth;
    obj.scrollHeight = _WindowProperties.innerHeight;
  }
}

function classList(obj) {
  var noop = function noop() {};

  obj.classList = [];
  obj.classList.add = noop;
  obj.classList.remove = noop;
  obj.classList.contains = noop;
  obj.classList.toggle = noop;
}

},{"../WindowProperties":47}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  canvas: true,
  alert: true,
  focus: true,
  blur: true,
  getComputedStyle: true,
  scrollTo: true,
  scrollBy: true,
  setTimeout: true,
  clearTimeout: true,
  setInterval: true,
  clearInterval: true,
  requestAnimationFrame: true,
  cancelAnimationFrame: true,
  navigator: true,
  XMLHttpRequest: true,
  WebSocket: true,
  Worker: true,
  Image: true,
  ImageBitmap: true,
  Audio: true,
  HTMLElement: true,
  HTMLImageElement: true,
  HTMLCanvasElement: true,
  HTMLMediaElement: true,
  HTMLAudioElement: true,
  HTMLVideoElement: true,
  WebGLRenderingContext: true,
  TouchEvent: true,
  PointerEvent: true,
  MouseEvent: true,
  localStorage: true,
  location: true,
  btoa: true,
  atob: true
};
exports.alert = alert;
exports.focus = focus;
exports.blur = blur;
exports.getComputedStyle = getComputedStyle;
exports.scrollTo = scrollTo;
exports.scrollBy = scrollBy;
Object.defineProperty(exports, "navigator", {
  enumerable: true,
  get: function get() {
    return _navigator["default"];
  }
});
Object.defineProperty(exports, "XMLHttpRequest", {
  enumerable: true,
  get: function get() {
    return _XMLHttpRequest["default"];
  }
});
Object.defineProperty(exports, "WebSocket", {
  enumerable: true,
  get: function get() {
    return _WebSocket["default"];
  }
});
Object.defineProperty(exports, "Worker", {
  enumerable: true,
  get: function get() {
    return _Worker["default"];
  }
});
Object.defineProperty(exports, "Image", {
  enumerable: true,
  get: function get() {
    return _Image["default"];
  }
});
Object.defineProperty(exports, "ImageBitmap", {
  enumerable: true,
  get: function get() {
    return _ImageBitmap["default"];
  }
});
Object.defineProperty(exports, "Audio", {
  enumerable: true,
  get: function get() {
    return _Audio["default"];
  }
});
Object.defineProperty(exports, "HTMLElement", {
  enumerable: true,
  get: function get() {
    return _HTMLElement["default"];
  }
});
Object.defineProperty(exports, "HTMLImageElement", {
  enumerable: true,
  get: function get() {
    return _HTMLImageElement["default"];
  }
});
Object.defineProperty(exports, "HTMLCanvasElement", {
  enumerable: true,
  get: function get() {
    return _HTMLCanvasElement["default"];
  }
});
Object.defineProperty(exports, "HTMLMediaElement", {
  enumerable: true,
  get: function get() {
    return _HTMLMediaElement["default"];
  }
});
Object.defineProperty(exports, "HTMLAudioElement", {
  enumerable: true,
  get: function get() {
    return _HTMLAudioElement["default"];
  }
});
Object.defineProperty(exports, "HTMLVideoElement", {
  enumerable: true,
  get: function get() {
    return _HTMLVideoElement["default"];
  }
});
Object.defineProperty(exports, "WebGLRenderingContext", {
  enumerable: true,
  get: function get() {
    return _WebGLRenderingContext["default"];
  }
});
Object.defineProperty(exports, "TouchEvent", {
  enumerable: true,
  get: function get() {
    return _index.TouchEvent;
  }
});
Object.defineProperty(exports, "PointerEvent", {
  enumerable: true,
  get: function get() {
    return _index.PointerEvent;
  }
});
Object.defineProperty(exports, "MouseEvent", {
  enumerable: true,
  get: function get() {
    return _index.MouseEvent;
  }
});
Object.defineProperty(exports, "localStorage", {
  enumerable: true,
  get: function get() {
    return _localStorage["default"];
  }
});
Object.defineProperty(exports, "location", {
  enumerable: true,
  get: function get() {
    return _location["default"];
  }
});
Object.defineProperty(exports, "btoa", {
  enumerable: true,
  get: function get() {
    return _Base.btoa;
  }
});
Object.defineProperty(exports, "atob", {
  enumerable: true,
  get: function get() {
    return _Base.atob;
  }
});
exports.cancelAnimationFrame = exports.requestAnimationFrame = exports.clearInterval = exports.setInterval = exports.clearTimeout = exports.setTimeout = exports.canvas = void 0;

var _Canvas = _interopRequireDefault(require("./Canvas"));

var _CommonComputedStyle = _interopRequireDefault(require("./style/CommonComputedStyle"));

var _ImageComputedStyle = _interopRequireDefault(require("./style/ImageComputedStyle"));

var _CanvasComputedStyle = _interopRequireDefault(require("./style/CanvasComputedStyle"));

var _Event = _interopRequireDefault(require("./Event"));

var _isDevtool = _interopRequireDefault(require("./util/isDevtool"));

var _navigator = _interopRequireDefault(require("./navigator"));

var _XMLHttpRequest = _interopRequireDefault(require("./XMLHttpRequest"));

var _WebSocket = _interopRequireDefault(require("./WebSocket"));

var _Worker = _interopRequireDefault(require("./Worker"));

var _Image = _interopRequireDefault(require("./Image"));

var _ImageBitmap = _interopRequireDefault(require("./ImageBitmap"));

var _Audio = _interopRequireDefault(require("./Audio"));

var _HTMLElement = _interopRequireDefault(require("./HTMLElement"));

var _HTMLImageElement = _interopRequireDefault(require("./HTMLImageElement"));

var _HTMLCanvasElement = _interopRequireDefault(require("./HTMLCanvasElement"));

var _HTMLMediaElement = _interopRequireDefault(require("./HTMLMediaElement"));

var _HTMLAudioElement = _interopRequireDefault(require("./HTMLAudioElement"));

var _HTMLVideoElement = _interopRequireDefault(require("./HTMLVideoElement"));

var _WebGLRenderingContext = _interopRequireDefault(require("./WebGLRenderingContext"));

var _index = require("./EventIniter/index.js");

var _localStorage = _interopRequireDefault(require("./localStorage"));

var _location = _interopRequireDefault(require("./location"));

var _Base = require("./Base64.js");

var _WindowProperties = require("./WindowProperties");

Object.keys(_WindowProperties).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _WindowProperties[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WindowProperties[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
// export { default as FileReader } from './FileReader'  // TODO: FileReader adaption blocks in BAIDU_DEV_TOOL
// 暴露全局的 canvas
GameGlobal.screencanvas = GameGlobal.screencanvas || new _Canvas["default"]();
var canvas = GameGlobal.screencanvas;
exports.canvas = canvas;

function getComputedStyle(dom) {
  var tagName = dom.tagName;

  if (tagName === "CANVAS") {
    return (0, _CanvasComputedStyle["default"])(dom);
  } else if (tagName === "IMG") {
    return (0, _ImageComputedStyle["default"])(dom);
  }

  return _CommonComputedStyle["default"];
}

function scrollTo(x, y) {// x = Math.min(window.innerWidth, Math.max(0, x));
  // y = Math.min(window.innerHeight, Math.max(0, y));
  // We can't scroll the page of WeChatTinyGame, so it'll always be 0.
  // window.scrollX = 0;
  // window.scrollY = 0;
}

function scrollBy(dx, dy) {
  window.scrollTo(window.scrollX + dx, window.scrollY + dy);
}

function alert(msg) {
  console.log(msg);
}

function focus() {}

function blur() {}

if ((0, _isDevtool["default"])() && swan.getPerformance) {
  var wxPerf = swan.getPerformance();
  var consoleTimers = {};

  console.time = function (name) {
    consoleTimers[name] = wxPerf.now();
  };

  console.timeEnd = function (name) {
    var timeStart = consoleTimers[name];

    if (!timeStart) {
      return;
    }

    var timeElapsed = wxPerf.now() - timeStart;
    console.log(name + ": " + timeElapsed / 1000 + "ms");
    delete consoleTimers[name];
  };
}

function eventHandlerFactory() {
  return function (res) {
    var event = new _Event["default"]('resize');
    event.target = window;
    event.timeStamp = Date.now();
    event.res = res;
    event.windowWidth = res.windowWidth;
    event.windowHeight = res.windowHeight;
    document.dispatchEvent(event);
  };
} // TODO
// swan.onWindowResize(eventHandlerFactory())


var _setTimeout = setTimeout;
exports.setTimeout = _setTimeout;
var _clearTimeout = clearTimeout;
exports.clearTimeout = _clearTimeout;
var _setInterval = setInterval;
exports.setInterval = _setInterval;
var _clearInterval = clearInterval;
exports.clearInterval = _clearInterval;
var _requestAnimationFrame = requestAnimationFrame;
exports.requestAnimationFrame = _requestAnimationFrame;
var _cancelAnimationFrame = cancelAnimationFrame;
exports.cancelAnimationFrame = _cancelAnimationFrame;

},{"./Audio":24,"./Base64.js":25,"./Canvas":27,"./Event":30,"./EventIniter/index.js":34,"./HTMLAudioElement":36,"./HTMLCanvasElement":37,"./HTMLElement":38,"./HTMLImageElement":39,"./HTMLMediaElement":40,"./HTMLVideoElement":41,"./Image":42,"./ImageBitmap":43,"./WebGLRenderingContext":45,"./WebSocket":46,"./WindowProperties":47,"./Worker":48,"./XMLHttpRequest":49,"./localStorage":52,"./location":53,"./navigator":54,"./style/CanvasComputedStyle":56,"./style/CommonComputedStyle":57,"./style/ImageComputedStyle":58,"./util/isDevtool":60}],63:[function(require,module,exports){
"use strict";

if (cc.Texture2D) {
  cc.Texture2D.prototype._checkPackable = function () {
    var dynamicAtlas = cc.dynamicAtlasManager;
    if (!dynamicAtlas) return;

    if (this._isCompressed()) {
      this._packable = false;
      return;
    }

    var w = this.width,
        h = this.height;

    if (!this._image || w > dynamicAtlas.maxFrameSize || h > dynamicAtlas.maxFrameSize || this._getHash() !== dynamicAtlas.Atlas.DEFAULT_HASH) {
      this._packable = false;
      return;
    } // HACK: Can't tell if it's a Canvas or an Image by instanceof on Baidu.


    if (this._image && this._image.getContext) {
      this._packable = true;
    }
  };
}

},{}],64:[function(require,module,exports){
"use strict";

require('./Texture2D');

},{"./Texture2D":63}],65:[function(require,module,exports){
"use strict";

/****************************************************************************
 Copyright (c) 2017-2019 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var fs = swan.getFileSystemManager ? swan.getFileSystemManager() : null;
var outOfStorageRegExp = /file size over/;
var fsUtils = {
  fs: fs,
  isOutOfStorage: function isOutOfStorage(errMsg) {
    return outOfStorageRegExp.test(errMsg);
  },
  getUserDataPath: function getUserDataPath() {
    return swan.env.USER_DATA_PATH;
  },
  checkFsValid: function checkFsValid() {
    if (!fs) {
      console.warn('can not get the file system!');
      return false;
    }

    return true;
  },
  deleteFile: function deleteFile(filePath, onComplete) {
    fs.unlink({
      filePath: filePath,
      success: function success() {
        onComplete && onComplete(null);
      },
      fail: function fail(res) {
        console.warn("Delete file failed: path: ".concat(filePath, " message: ").concat(res.errMsg));
        onComplete && onComplete(new Error(res.errMsg));
      }
    });
  },
  downloadFile: function downloadFile(remoteUrl, filePath, header, onProgress, onComplete) {
    var options = {
      url: remoteUrl,
      success: function success(res) {
        if (res.statusCode === 200) {
          onComplete && onComplete(null, res.tempFilePath || res.filePath);
        } else {
          if (res.filePath) {
            fsUtils.deleteFile(res.filePath);
          }

          console.warn("Download file failed: path: ".concat(remoteUrl, " message: ").concat(res.statusCode));
          onComplete && onComplete(new Error(res.statusCode), null);
        }
      },
      fail: function fail(res) {
        console.warn("Download file failed: path: ".concat(remoteUrl, " message: ").concat(res.errMsg));
        onComplete && onComplete(new Error(res.errMsg), null);
      }
    };
    if (filePath) options.filePath = filePath;
    if (header) options.header = header;
    var task = swan.downloadFile(options);
    onProgress && task.onProgressUpdate(onProgress);
  },
  saveFile: function saveFile(srcPath, destPath, onComplete) {
    swan.saveFile({
      tempFilePath: srcPath,
      filePath: destPath,
      success: function success(res) {
        onComplete && onComplete(null);
      },
      fail: function fail(res) {
        console.warn("Save file failed: path: ".concat(srcPath, " message: ").concat(res.errMsg));
        onComplete && onComplete(new Error(res.errMsg));
      }
    });
  },
  copyFile: function copyFile(srcPath, destPath, onComplete) {
    fs.copyFile({
      srcPath: srcPath,
      destPath: destPath,
      success: function success() {
        onComplete && onComplete(null);
      },
      fail: function fail(res) {
        console.warn("Copy file failed: path: ".concat(srcPath, " message: ").concat(res.errMsg));
        onComplete && onComplete(new Error(res.errMsg));
      }
    });
  },
  writeFile: function writeFile(path, data, encoding, onComplete) {
    fs.writeFile({
      filePath: path,
      encoding: encoding,
      data: data,
      success: function success() {
        onComplete && onComplete(null);
      },
      fail: function fail(res) {
        console.warn("Write file failed: path: ".concat(path, " message: ").concat(res.errMsg));
        onComplete && onComplete(new Error(res.errMsg));
      }
    });
  },
  writeFileSync: function writeFileSync(path, data, encoding) {
    try {
      fs.writeFileSync(path, data, encoding);
      return null;
    } catch (e) {
      console.warn("Write file failed: path: ".concat(path, " message: ").concat(e.message));
      return new Error(e.message);
    }
  },
  readFile: function readFile(filePath, encoding, onComplete) {
    fs.readFile({
      filePath: filePath,
      encoding: encoding,
      success: function success(res) {
        onComplete && onComplete(null, res.data);
      },
      fail: function fail(res) {
        console.warn("Read file failed: path: ".concat(filePath, " message: ").concat(res.errMsg));
        onComplete && onComplete(new Error(res.errMsg), null);
      }
    });
  },
  readDir: function readDir(filePath, onComplete) {
    fs.readdir({
      dirPath: filePath,
      success: function success(res) {
        onComplete && onComplete(null, res.files);
      },
      fail: function fail(res) {
        console.warn("Read directory failed: path: ".concat(filePath, " message: ").concat(res.errMsg));
        onComplete && onComplete(new Error(res.errMsg), null);
      }
    });
  },
  readText: function readText(filePath, onComplete) {
    fsUtils.readFile(filePath, 'utf8', onComplete);
  },
  readArrayBuffer: function readArrayBuffer(filePath, onComplete) {
    fsUtils.readFile(filePath, '', onComplete);
  },
  readJson: function readJson(filePath, onComplete) {
    fsUtils.readFile(filePath, 'utf8', function (err, text) {
      var out = null;

      if (!err) {
        try {
          out = JSON.parse(text);
        } catch (e) {
          console.warn("Read json failed: path: ".concat(filePath, " message: ").concat(e.message));
          err = new Error(e.message);
        }
      }

      onComplete && onComplete(err, out);
    });
  },
  readJsonSync: function readJsonSync(path) {
    try {
      var str = fs.readFileSync(path, 'utf8');
      return JSON.parse(str);
    } catch (e) {
      console.warn("Read json failed: path: ".concat(path, " message: ").concat(e.message));
      return new Error(e.message);
    }
  },
  makeDirSync: function makeDirSync(path, recursive) {
    try {
      fs.mkdirSync(path, recursive);
      return null;
    } catch (e) {
      console.warn("Make directory failed: path: ".concat(path, " message: ").concat(e.message));
      return new Error(e.message);
    }
  },
  rmdirSync: function rmdirSync(dirPath, recursive) {
    try {
      fs.rmdirSync(dirPath, recursive);
    } catch (e) {
      console.warn("rm directory failed: path: ".concat(dirPath, " message: ").concat(e.message));
      return new Error(e.message);
    }
  },
  exists: function exists(filePath, onComplete) {
    fs.access({
      path: filePath,
      success: function success() {
        onComplete && onComplete(true);
      },
      fail: function fail() {
        onComplete && onComplete(false);
      }
    });
  },
  loadSubpackage: function loadSubpackage(name, onProgress, onComplete) {
    var task = swan.loadSubpackage({
      name: name,
      success: function success() {
        onComplete && onComplete();
      },
      fail: function fail(res) {
        console.warn("Load Subpackage failed: path: ".concat(name, " message: ").concat(res.errMsg));
        onComplete && onComplete(new Error("Failed to load subpackage ".concat(name, ": ").concat(res.errMsg)));
      }
    });
    onProgress && task.onProgressUpdate(onProgress);
    return task;
  },
  unzip: function unzip(zipFilePath, targetPath, onComplete) {
    fs.unzip({
      zipFilePath: zipFilePath,
      targetPath: targetPath,
      success: function success() {
        onComplete && onComplete(null);
      },
      fail: function fail(res) {
        console.warn("unzip failed: path: ".concat(zipFilePath, " message: ").concat(res.errMsg));
        onComplete && onComplete(new Error('unzip failed: ' + res.errMsg));
      }
    });
  }
};
window.fsUtils = module.exports = fsUtils;

},{}],66:[function(require,module,exports){
"use strict";

var adapter = window.__globalAdapter;
var adaptSysFunc = adapter.adaptSys;
Object.assign(adapter, {
  // Extend adaptSys interface
  adaptSys: function adaptSys(sys) {
    adaptSysFunc.call(this, sys, GameGlobal._env);
    delete GameGlobal._env; // release env
    // baidugame subdomain

    if (!swan.getOpenDataContext) {
      sys.platform = sys.BAIDU_GAME_SUB;
    } else {
      sys.platform = sys.BAIDU_GAME;
    } // sys.glExtension = function (name) {
    //     if (name === 'OES_texture_float') {
    //         return false;
    //     }
    //     return !!cc.renderer.device.ext(name);
    // };

  }
});

},{}],67:[function(require,module,exports){
(function (global){
"use strict";

var utils = require('../../../common/utils');

if (window.__globalAdapter) {
  var globalAdapter = window.__globalAdapter;
  var isLandscape = false; // getSystemInfoSync not supported in sub context
  // SystemInfo

  if (swan.getSystemInfoSync) {
    var systemInfo = swan.getSystemInfoSync();
    var windowWidth = systemInfo.windowWidth;
    var windowHeight = systemInfo.windowHeight;
    isLandscape = windowWidth > windowHeight;
    globalAdapter.isDevTool = systemInfo.platform === 'devtools';
  } else {
    // can't define window in devtool
    var descriptor = Object.getOwnPropertyDescriptor(global, 'window');
    globalAdapter.isDevTool = !(!descriptor || descriptor.configurable === true);
  }

  globalAdapter.isSubContext = swan.getOpenDataContext === undefined;
  utils.cloneMethod(globalAdapter, swan, 'getSystemInfoSync'); // TouchEvent

  utils.cloneMethod(globalAdapter, swan, 'onTouchStart');
  utils.cloneMethod(globalAdapter, swan, 'onTouchMove');
  utils.cloneMethod(globalAdapter, swan, 'onTouchEnd');
  utils.cloneMethod(globalAdapter, swan, 'onTouchCancel'); // Audio

  utils.cloneMethod(globalAdapter, swan, 'createInnerAudioContext'); // FrameRate

  utils.cloneMethod(globalAdapter, swan, 'setPreferredFramesPerSecond'); // Keyboard

  utils.cloneMethod(globalAdapter, swan, 'showKeyboard');
  utils.cloneMethod(globalAdapter, swan, 'hideKeyboard');
  utils.cloneMethod(globalAdapter, swan, 'updateKeyboard');
  utils.cloneMethod(globalAdapter, swan, 'onKeyboardInput');
  utils.cloneMethod(globalAdapter, swan, 'onKeyboardConfirm');
  utils.cloneMethod(globalAdapter, swan, 'onKeyboardComplete');
  utils.cloneMethod(globalAdapter, swan, 'offKeyboardInput');
  utils.cloneMethod(globalAdapter, swan, 'offKeyboardConfirm');
  utils.cloneMethod(globalAdapter, swan, 'offKeyboardComplete'); // Message

  utils.cloneMethod(globalAdapter, swan, 'getOpenDataContext');
  utils.cloneMethod(globalAdapter, swan, 'onMessage'); // SharedCanvas

  utils.cloneMethod(globalAdapter, swan, 'getSharedCanvas'); // Font

  utils.cloneMethod(globalAdapter, swan, 'loadFont'); // hide show Event

  utils.cloneMethod(globalAdapter, swan, 'onShow');
  utils.cloneMethod(globalAdapter, swan, 'onHide'); // Accelerometer

  var isAccelerometerInit = false;
  var deviceOrientation = 1;

  if (swan.onDeviceOrientationChange) {
    swan.onDeviceOrientationChange(function (res) {
      if (res.value === 'landscape') {
        deviceOrientation = 1;
      } else if (res.value === 'landscapeReverse') {
        deviceOrientation = -1;
      }
    });
  }

  Object.assign(globalAdapter, {
    startAccelerometer: function startAccelerometer(cb) {
      if (!isAccelerometerInit) {
        isAccelerometerInit = true;
        swan.onAccelerometerChange && swan.onAccelerometerChange(function (res) {
          var resClone = {};
          var x = res.x;
          var y = res.y;

          if (isLandscape) {
            var tmp = x;
            x = -y;
            y = tmp;
          }

          resClone.x = x * deviceOrientation;
          resClone.y = y * deviceOrientation;
          resClone.z = res.z;
          cb && cb(resClone);
        });
      } else {
        swan.startAccelerometer && swan.startAccelerometer({
          fail: function fail(err) {
            console.error('start accelerometer failed', err);
          } // success () {},
          // complete () {},

        });
      }
    },
    stopAccelerometer: function stopAccelerometer() {
      swan.stopAccelerometer && swan.stopAccelerometer({
        fail: function fail(err) {
          console.error('stop accelerometer failed', err);
        } // success () {},
        // complete () {},

      });
    }
  });
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../../common/utils":18}]},{},[23]);
