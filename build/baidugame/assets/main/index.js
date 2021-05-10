window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  Animal: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ba634us93lPYrBZpOaL4ofo", "Animal");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Animal = function(_super) {
      __extends(Animal, _super);
      function Animal() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.sprite = null;
        _this.animation = null;
        return _this;
      }
      Animal.prototype.onLoad = function() {
        this.animation = this.getComponentInChildren(cc.Animation);
        this.animation.on("finished", this.onFinish, this);
      };
      Animal.prototype.onFinish = function(s, a) {
        "animal_jump" == a.clip.name && this.animation.play("animal_idle");
      };
      Animal.prototype.start = function() {
        this.animation.play("animal_idle");
      };
      Animal.prototype.connected = function() {
        var state = this.animation.play("animal_jump");
        state.wrapMode = cc.WrapMode.Normal;
      };
      Animal.prototype._loopJump = function() {
        var state = this.animation.play("animal_jump");
        state.wrapMode = cc.WrapMode.Loop;
      };
      Animal.prototype.loopJump = function(d) {
        this.scheduleOnce(this._loopJump, this.randomFloat(0, d));
      };
      Animal.prototype.randomFloat = function(min, max) {
        return Math.random() * (max - min) + min;
      };
      __decorate([ property(cc.Sprite) ], Animal.prototype, "sprite", void 0);
      Animal = __decorate([ ccclass ], Animal);
      return Animal;
    }(cc.Component);
    exports.default = Animal;
    cc._RF.pop();
  }, {} ],
  BoostsAction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "47da3PXgqdE55aSvY0ox9B4", "BoostsAction");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Shake = exports.V2ChangeAction = exports.ValueChangeAction = void 0;
    var ValueChangeAction = function(_super) {
      __extends(ValueChangeAction, _super);
      function ValueChangeAction(duration, from, to, callback, target) {
        var _this = _super.call(this) || this;
        _this.delta = _this.sub(to, from);
        _this.setDuration(duration);
        _this.callback = callback;
        _this.start = from;
        _this.end = to;
        _this.callbackTarget = target;
        return _this;
      }
      ValueChangeAction.prototype.sub = function(x, y) {
        return x - y;
      };
      ValueChangeAction.prototype.add = function(x, y) {
        return x + y;
      };
      ValueChangeAction.prototype.mul = function(x, y) {
        return x * y;
      };
      ValueChangeAction.prototype.update = function(dt) {
        dt = this._computeEaseTime(dt);
        var v = this.add(this.start, this.mul(this.delta, dt));
        this.callback.call(this.callbackTarget, v);
      };
      return ValueChangeAction;
    }(cc.ActionInterval);
    exports.ValueChangeAction = ValueChangeAction;
    var V2ChangeAction = function(_super) {
      __extends(V2ChangeAction, _super);
      function V2ChangeAction() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      V2ChangeAction.prototype.sub = function(x, y) {
        return x.sub(x, y);
      };
      V2ChangeAction.prototype.add = function(x, y) {
        return x.add(x, y);
      };
      V2ChangeAction.prototype.mul = function(x, y) {
        return x.mul(x, y);
      };
      return V2ChangeAction;
    }(ValueChangeAction);
    exports.V2ChangeAction = V2ChangeAction;
    var Shake = function(_super) {
      __extends(Shake, _super);
      function Shake() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._initial_x = 0;
        _this._initial_y = 0;
        _this._strength_x = 0;
        _this._strength_y = 0;
        return _this;
      }
      Shake.create = function(duration, strength_x, strength_y) {
        var act = new Shake();
        act.initWithDuration(duration, strength_x, strength_y);
        return act;
      };
      Shake.prototype.initWithDuration = function(duration, strength_x, strength_y) {
        cc.ActionInterval.prototype["initWithDuration"].apply(this, arguments);
        this._strength_x = strength_x;
        this._strength_y = strength_y;
        return true;
      };
      Shake.prototype.fgRangeRand = function(min, max) {
        var rnd = Math.random();
        return rnd * (max - min) + min;
      };
      Shake.prototype.update = function(time) {
        var randx = this.fgRangeRand(-this._strength_x, this._strength_x);
        var randy = this.fgRangeRand(-this._strength_y, this._strength_y);
        this.getTarget().setPosition(randx + this._initial_x, randy + this._initial_y);
      };
      Shake.prototype.startWithTarget = function(target) {
        cc.ActionInterval.prototype["startWithTarget"].apply(this, arguments);
        this._initial_x = target.x;
        this._initial_y = target.y;
      };
      Shake.prototype.stop = function() {
        this.getTarget().setPosition(new cc.Vec2(this._initial_x, this._initial_y));
        cc.ActionInterval.prototype["stop"].apply(this);
      };
      return Shake;
    }(cc.ActionInterval);
    exports.Shake = Shake;
    cc._RF.pop();
  }, {} ],
  1: [ function(require, module, exports) {
    var process = module.exports = {};
    var cachedSetTimeout;
    var cachedClearTimeout;
    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined");
    }
    (function() {
      try {
        cachedSetTimeout = "function" === typeof setTimeout ? setTimeout : defaultSetTimout;
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        cachedClearTimeout = "function" === typeof clearTimeout ? clearTimeout : defaultClearTimeout;
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker);
        } catch (e) {
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    function cleanUpNextTick() {
      if (!draining || !currentQueue) return;
      draining = false;
      currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1;
      queue.length && drainQueue();
    }
    function drainQueue() {
      if (draining) return;
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) currentQueue && currentQueue[queueIndex].run();
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }
    process.nextTick = function(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
      queue.push(new Item(fun, args));
      1 !== queue.length || draining || runTimeout(drainQueue);
    };
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    process.title = "browser";
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = "";
    process.versions = {};
    function noop() {}
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;
    process.listeners = function(name) {
      return [];
    };
    process.binding = function(name) {
      throw new Error("process.binding is not supported");
    };
    process.cwd = function() {
      return "/";
    };
    process.chdir = function(dir) {
      throw new Error("process.chdir is not supported");
    };
    process.umask = function() {
      return 0;
    };
  }, {} ],
  ClickAudioManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "679c3x/ZwhD8KnIy6p5lX5y", "ClickAudioManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ClickAudio_1 = require("./ClickAudio");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ClickAudioManager = function(_super) {
      __extends(ClickAudioManager, _super);
      function ClickAudioManager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.audio = null;
        _this.elastic = false;
        return _this;
      }
      ClickAudioManager.prototype.onLoad = function() {};
      ClickAudioManager.prototype.each = function(item) {
        if (!item.getComponent(cc.Button)) return;
        var comp = item.getComponent(ClickAudio_1.default);
        if (null == comp) {
          comp = item.addComponent(ClickAudio_1.default);
          comp.elastic = this.elastic;
          comp.audio = this.audio;
        }
      };
      ClickAudioManager.prototype.start = function() {};
      __decorate([ property({
        type: cc.AudioClip
      }) ], ClickAudioManager.prototype, "audio", void 0);
      __decorate([ property ], ClickAudioManager.prototype, "elastic", void 0);
      ClickAudioManager = __decorate([ ccclass ], ClickAudioManager);
      return ClickAudioManager;
    }(cc.Component);
    exports.default = ClickAudioManager;
    cc._RF.pop();
  }, {
    "./ClickAudio": "ClickAudio"
  } ],
  ClickAudio: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5ee8a8X6jFF5qtYOWlGoNww", "ClickAudio");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Device_1 = require("../gamesys/Device");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ClickAudio = function(_super) {
      __extends(ClickAudio, _super);
      function ClickAudio() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.audio = null;
        _this.elastic = false;
        _this._oldScale = 1;
        return _this;
      }
      ClickAudio.prototype.anim2 = function() {
        var act = cc.scaleBy(.6, .9, .9).easing(cc.easeElasticOut(.3));
        this.node.runAction(act);
      };
      ClickAudio.prototype.anim2back = function() {
        var act = cc.scaleTo(.6, this._oldScale, this._oldScale).easing(cc.easeElasticOut(.3));
        this.node.runAction(act);
      };
      ClickAudio.prototype.onLoad = function() {
        var _this = this;
        if (this.elastic) {
          var btn = this.getComponent(cc.Button);
          btn.transition = cc.Button.Transition.COLOR;
          btn.normalColor = cc.Color.WHITE;
          btn.pressedColor = new cc.Color(200, 200, 200);
          this._oldScale = this.node.scale;
        }
        this.node.on("touchstart", function(_) {
          _this.elastic && _this.anim2();
        }, this.node);
        this.node.on("touchend", function(_) {
          Device_1.default.playEffect(_this.audio, false);
          _this.elastic && _this.anim2back();
        });
        this.node.on("touchcancel", function(_) {
          _this.elastic && _this.anim2back();
        });
      };
      __decorate([ property({
        type: cc.AudioClip
      }) ], ClickAudio.prototype, "audio", void 0);
      __decorate([ property ], ClickAudio.prototype, "elastic", void 0);
      ClickAudio = __decorate([ ccclass ], ClickAudio);
      return ClickAudio;
    }(cc.Component);
    exports.default = ClickAudio;
    cc._RF.pop();
  }, {
    "../gamesys/Device": "Device"
  } ],
  Common: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d6d4aCOiTtJz6R1xuSQrtdC", "Common");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SpriteFrameCache_1 = require("../misc/SpriteFrameCache");
    var Common = function() {
      function Common() {}
      Common.loadJson = function(path) {
        return new Promise(function(resolve, reject) {
          cc.loader.loadRes(path, cc.JsonAsset, function(errorcode, data) {
            resolve(data.json);
          });
        });
      };
      Common.sleep = function(timeout) {
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            resolve();
          }, 1e3 * timeout);
        });
      };
      Common.isGreaterDays = function(before, num) {
        void 0 === num && (num = 7);
        var now = new Date();
        var diff = now.getTime() - before;
        if (diff > 864e5 * num) return true;
      };
      Common.setDisplay = function(sp, url) {
        SpriteFrameCache_1.default.instance.getSpriteFrame(url).then(function(sf) {
          sp.spriteFrame = sf;
        });
      };
      Common.generate_action = function(params) {
        var scale_action = cc.scaleTo(params.time, params.scale_x, params.scale_y);
        return scale_action;
      };
      Common.jellyJump = function(node) {
        var spawn_action1 = this.generate_action({
          time: .06,
          scale_x: .7,
          scale_y: .7,
          scale_z: 1
        });
        var spawn_action3 = this.generate_action({
          time: .07,
          scale_x: 1,
          scale_y: 1.4,
          scale_z: 1
        });
        var spawn_action5 = cc.scaleTo(.8, 1.3).easing(cc.easeElasticOut(.3));
        var seq_actions = cc.sequence(spawn_action1, spawn_action3, spawn_action5);
        node.runAction(seq_actions);
      };
      Common.jellyJump2 = function(node, from, scale) {
        node.scale = from;
        var act = cc.scaleTo(.8, scale, scale).easing(cc.easeElasticOut(.3));
        node.runAction(act);
      };
      Common.moveBezier = function(prefab, from, to, callback, dur, delay) {
        void 0 === callback && (callback = null);
        void 0 === dur && (dur = 1);
        void 0 === delay && (delay = 0);
        var sprite = cc.instantiate(prefab);
        sprite.opacity = 255;
        sprite.setPosition(from);
        var bezier = [];
        var x = from.x, y = from.y;
        var ex = to.x, ey = to.y;
        bezier[0] = cc.v2(x, y);
        bezier[1] = cc.v2(x + .5 * Math.abs(ex - x + 100), y + .5 * Math.abs(ey - y + 100));
        bezier[2] = cc.v2(ex, ey);
        sprite.runAction(cc.sequence(cc.delayTime(delay), cc.bezierTo(dur, bezier), cc.fadeOut(.3), cc.callFunc(callback)));
        return sprite;
      };
      return Common;
    }();
    exports.default = Common;
    cc._RF.pop();
  }, {
    "../misc/SpriteFrameCache": "SpriteFrameCache"
  } ],
  ConnectManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ac5faec2blDKJorwXTfZFZx", "ConnectManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.connManager = void 0;
    var Socket_1 = require("./Socket");
    var ConnectManager = function() {
      function ConnectManager() {
        this._allConns = null;
        this._allConns = {};
      }
      ConnectManager.getInstance = function() {
        null == this._instance && (this._instance = new ConnectManager());
        return this._instance;
      };
      ConnectManager.prototype.create = function(name, conf) {
        if (null == this._allConns[name]) {
          var socket = new Socket_1.Socket(conf);
          this._allConns[name] = socket;
          null == this._defaultKey && (this._defaultKey = name);
        }
      };
      ConnectManager.prototype.setDefaultKey = function(key) {
        null != key && this._allConns[key] && (this._defaultKey = key);
      };
      ConnectManager.prototype.getDefault = function() {
        return this.getConn(this._defaultKey);
      };
      ConnectManager.prototype.getConn = function(name) {
        if (null == name) return null;
        if (null != this._allConns[name]) return this._allConns[name];
        return null;
      };
      ConnectManager.prototype.sendMessage = function(msg, name) {
        null == name && (name = this._defaultKey);
        var conn = this.getConn(name);
        null != conn && conn.sendMessage(msg);
      };
      ConnectManager.prototype.enableHeartbeat = function(name) {
        var conn = this.getConn(name);
        conn.enableHeartbeat(true);
      };
      ConnectManager.prototype.sendCustomMessage = function(msg) {
        var conn = this.getConn(this._defaultKey);
        null != conn && conn.sendCustomMessage(msg);
      };
      ConnectManager.prototype.remove = function(name) {
        var conn = this.getConn(name);
        if (null != conn) {
          delete this._allConns[name];
          conn.close();
        }
      };
      ConnectManager._instance = null;
      return ConnectManager;
    }();
    exports.connManager = ConnectManager.getInstance();
    cc._RF.pop();
  }, {
    "./Socket": "Socket"
  } ],
  Consts: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ccf28Nj1JdBbY/NtYiwJtcW", "Consts");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Consts = function() {
      function Consts() {}
      Consts.CenterY = 0;
      Consts.CenterX = 0;
      Consts.ColSize = 84;
      Consts.RowSize = 61;
      Consts.StagePageCount = 3;
      Consts.FreeSkinId = 5;
      return Consts;
    }();
    exports.default = Consts;
    cc._RF.pop();
  }, {} ],
  DCBackground: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4d867LSTWNEB7LUL3KAjVve", "DCBackground");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DCUI_1 = require("../../../framework/plugin_boosts/ui/DCUI");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DCBackground = function(_super) {
      __extends(DCBackground, _super);
      function DCBackground() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      DCBackground.prototype.onLoad = function() {
        this.sprite = this.getComponent(cc.Sprite);
      };
      DCBackground.prototype.start = function() {};
      DCBackground.prototype.onValueChanged = function(v) {};
      DCBackground = __decorate([ ccclass ], DCBackground);
      return DCBackground;
    }(DCUI_1.default);
    exports.default = DCBackground;
    cc._RF.pop();
  }, {
    "../../../framework/plugin_boosts/ui/DCUI": "DCUI"
  } ],
  DCLabel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a56c0Fh1bpDto6UwDov+u7M", "DCLabel");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DCUI_1 = require("./DCUI");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
    var DCLabel = function(_super) {
      __extends(DCLabel, _super);
      function DCLabel() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      DCLabel.prototype.onLoad = function() {
        this.label = this.getComponent(cc.Label);
      };
      DCLabel.prototype.onValueChanged = function(v) {
        if (!v) {
          console.log("[DCLabel] warn!", "not found field " + this.dataBind);
          v = "0";
        }
        this.label.string = v;
      };
      DCLabel = __decorate([ ccclass, requireComponent(cc.Label) ], DCLabel);
      return DCLabel;
    }(DCUI_1.default);
    exports.default = DCLabel;
    cc._RF.pop();
  }, {
    "./DCUI": "DCUI"
  } ],
  DCPandoraPoint: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7213alSGlhOObvGLLyQvhtZ", "DCPandoraPoint");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DCUI_1 = require("./DCUI");
    var PandoraPoint_1 = require("./PandoraPoint");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DCPandoraPoint = function(_super) {
      __extends(DCPandoraPoint, _super);
      function DCPandoraPoint() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      DCPandoraPoint.prototype.onLoad = function() {
        this.point = this.getComponent(PandoraPoint_1.default);
      };
      DCPandoraPoint.prototype.onValueChanged = function(v) {
        this.point.setNumber(v);
      };
      DCPandoraPoint = __decorate([ ccclass ], DCPandoraPoint);
      return DCPandoraPoint;
    }(DCUI_1.default);
    exports.default = DCPandoraPoint;
    cc._RF.pop();
  }, {
    "./DCUI": "DCUI",
    "./PandoraPoint": "PandoraPoint"
  } ],
  DCParticleSystem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f51daFLsqdJ/4k4IuDQeRuR", "DCParticleSystem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DCUI_1 = require("../../../framework/plugin_boosts/ui/DCUI");
    var Info_1 = require("../Info");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DCParticleSystem = function(_super) {
      __extends(DCParticleSystem, _super);
      function DCParticleSystem() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      DCParticleSystem.prototype.onLoad = function() {};
      DCParticleSystem.prototype.start = function() {};
      DCParticleSystem.prototype.onValueChanged = function(v) {
        var _this = this;
        var data = Info_1.UserInfo.getSkinById(v);
        this.ps && this.ps.node && this.ps.node.destroy();
        cc.loader.loadRes("Game/Particles/" + data.ps, cc.ParticleAsset, function(err, ps) {
          console.log(data.ps, ps);
          var particleNode = new cc.Node();
          _this.ps = particleNode.addComponent(cc.ParticleSystem);
          _this.ps.file = ps;
          _this.node.addChild(particleNode);
        });
      };
      DCParticleSystem = __decorate([ ccclass ], DCParticleSystem);
      return DCParticleSystem;
    }(DCUI_1.default);
    exports.default = DCParticleSystem;
    cc._RF.pop();
  }, {
    "../../../framework/plugin_boosts/ui/DCUI": "DCUI",
    "../Info": "Info"
  } ],
  DCSprite: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "82b09vMdyFCOb0NEdBTtZHy", "DCSprite");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DCUI_1 = require("./DCUI");
    var SpriteFrameCache_1 = require("../misc/SpriteFrameCache");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
    var DCSprite = function(_super) {
      __extends(DCSprite, _super);
      function DCSprite() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      DCSprite.prototype.onLoad = function() {
        this.sprite = this.getComponent(cc.Sprite);
      };
      DCSprite.prototype.refreshSpriteFrame = function(v) {
        var _this = this;
        var spriteframe = SpriteFrameCache_1.default.instance.getSpriteFrame(v).then(function(sf) {
          _this.sprite.spriteFrame = sf;
        }).catch(function(_) {
          console.log("request imageUrl error :" + v);
        });
      };
      DCSprite.prototype.onValueChanged = function(v) {
        this.refreshSpriteFrame(v);
      };
      DCSprite = __decorate([ ccclass, requireComponent(cc.Sprite) ], DCSprite);
      return DCSprite;
    }(DCUI_1.default);
    exports.default = DCSprite;
    cc._RF.pop();
  }, {
    "../misc/SpriteFrameCache": "SpriteFrameCache",
    "./DCUI": "DCUI"
  } ],
  DCToggle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f9e52WLze5MBrhxXx/fWqyL", "DCToggle");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DCUI_1 = require("./DCUI");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DCToggle = function(_super) {
      __extends(DCToggle, _super);
      function DCToggle() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.revserse = false;
        _this.autosync = true;
        return _this;
      }
      DCToggle.prototype.onLoad = function() {
        this.toggle = this.getComponent(cc.Toggle);
        if (this.autosync) {
          var listener = new cc.Component.EventHandler();
          listener.component = "DCToggle";
          listener.target = this.node;
          listener.handler = "onChecked";
          this.toggle.checkEvents.push(listener);
        }
      };
      DCToggle.prototype.onChecked = function(v) {
        if (this.isFromSelf) return;
        this.revserse ? this.setDCValue(!v.isChecked) : this.setDCValue(v.isChecked);
      };
      DCToggle.prototype.setChecked = function(b) {
        this.isFromSelf = true;
        b ? this.toggle.check() : this.toggle.uncheck();
        this.isFromSelf = false;
      };
      DCToggle.prototype.onValueChanged = function(v) {
        this.revserse ? this.setChecked(!v) : this.setChecked(v);
      };
      __decorate([ property({
        tooltip: "If reverse is enabled ,checked is false !, unchecked is true"
      }) ], DCToggle.prototype, "revserse", void 0);
      __decorate([ property({
        tooltip: " Make sure data bind type should be boolean"
      }) ], DCToggle.prototype, "autosync", void 0);
      DCToggle = __decorate([ ccclass ], DCToggle);
      return DCToggle;
    }(DCUI_1.default);
    exports.default = DCToggle;
    cc._RF.pop();
  }, {
    "./DCUI": "DCUI"
  } ],
  DCUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e4171eQC3dMO4x8/Td1XV1Y", "DCUI");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DataCenter_1 = require("../misc/DataCenter");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DCUI = function(_super) {
      __extends(DCUI, _super);
      function DCUI() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.dataBind = "";
        return _this;
      }
      DCUI.prototype.onLoad = function() {};
      DCUI.prototype.setDCKey = function(k) {
        this.dataBind = k;
        this.setListener();
      };
      DCUI.prototype.setListener = function() {
        DataCenter_1.default.off(this.dataBind, this.dataChanged, this);
        DataCenter_1.default.on(this.dataBind, this.dataChanged, this);
      };
      DCUI.prototype.onValueChanged = function(v) {};
      DCUI.prototype.setDCValue = function(v) {
        DataCenter_1.default.set(this.dataBind, v);
      };
      DCUI.prototype.dataChanged = function(v, old) {
        this.onValueChanged(v);
      };
      DCUI.prototype.onEnable = function() {
        this.setListener();
        this.onValueChanged(DataCenter_1.default.get(this.dataBind));
      };
      DCUI.prototype.onDisable = function() {
        DataCenter_1.default.off(this.dataBind, this.dataChanged, this);
      };
      __decorate([ property() ], DCUI.prototype, "dataBind", void 0);
      DCUI = __decorate([ ccclass ], DCUI);
      return DCUI;
    }(cc.Component);
    exports.default = DCUI;
    cc._RF.pop();
  }, {
    "../misc/DataCenter": "DataCenter"
  } ],
  DailyGetDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d3b8fModWBPmovqTucbpm5C", "DailyGetDialog");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Info_1 = require("../Info");
    var View_1 = require("../../../framework/plugin_boosts/ui/View");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DailyGetDialog = function(_super) {
      __extends(DailyGetDialog, _super);
      function DailyGetDialog() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.diamond = 0;
        _this.rewardLabel = null;
        return _this;
      }
      DailyGetDialog.prototype.onLoad = function() {};
      DailyGetDialog.prototype.start = function() {};
      DailyGetDialog.prototype.onShown = function() {
        this.diamond = g.randomInt(20, 50);
        this.rewardLabel.string = cc.js.formatStr("\u94bb\u77f3 x " + this.diamond);
      };
      DailyGetDialog.prototype.click_get = function() {
        Info_1.UserInfo.addDiamond(this.diamond);
        Info_1.UserInfo.dailyGetTime = new Date().getTime();
        Info_1.UserInfo.save();
        this.getComponent(View_1.default).hide();
      };
      DailyGetDialog.prototype.share_succ = function() {
        Info_1.UserInfo.addDiamond(2 * this.diamond);
        Info_1.UserInfo.dailyGetTime = new Date().getTime();
        Info_1.UserInfo.save();
        this.getComponent(View_1.default).hide();
      };
      DailyGetDialog.prototype.click_get_double = function() {
        var choice = Info_1.UserInfo.getChoice(Info_1.ChoiceType.DailyGet);
        0 == choice && this.share_succ();
      };
      __decorate([ property(cc.Label) ], DailyGetDialog.prototype, "rewardLabel", void 0);
      DailyGetDialog = __decorate([ ccclass ], DailyGetDialog);
      return DailyGetDialog;
    }(cc.Component);
    exports.default = DailyGetDialog;
    cc._RF.pop();
  }, {
    "../../../framework/plugin_boosts/ui/View": "View",
    "../Info": "Info"
  } ],
  DataCenter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2946dm7U5hPgIxciZRaL5Q+", "DataCenter");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.field = exports.dc = void 0;
    var EventManager_1 = require("../utils/EventManager");
    var all_class_properties = {};
    var all_registed_class = {};
    function dc(name, serializable) {
      void 0 === serializable && (serializable = true);
      return function(target) {
        var proto = target["prototype"].constructor;
        all_registed_class[target] = {
          name: name,
          serializable: serializable
        };
      };
    }
    exports.dc = dc;
    function field(obj) {
      return function(target, propertyName) {
        obj && obj.default && (target[propertyName] = obj.default);
        var constructor = target.constructor;
        var cls = all_class_properties[constructor];
        if (null == cls) {
          cls = [];
          all_class_properties[constructor] = cls;
        }
        cls.push(propertyName);
      };
    }
    exports.field = field;
    var DataCenter = function() {
      function DataCenter() {
        this.__namespace = "DataCenter";
        this.kvs = {};
        this.kts = {};
        this.kvs = {};
        this.kts = {};
      }
      DataCenter.prototype.registerFields = function(namespace) {
        console.log(this);
        var target = this["__proto__"].constructor;
        var cls = all_class_properties[target];
        var cfg = all_registed_class[target];
        for (var i in cls) {
          var k = cls[i];
          if ("function" == typeof k) continue;
          this.register(k, this[k]);
          delete this[k];
        }
        namespace = namespace || cfg.name;
        this.endRegister(namespace, cfg.serializable);
      };
      DataCenter.prototype.register = function(k, defaultValue) {
        var proto = this.constructor["prototype"];
        var self = this;
        proto.__defineGetter__(k, function() {
          return self.getData(k);
        });
        proto.__defineSetter__(k, function(s) {
          self.setData(k, s);
        });
        this.kvs[k] = defaultValue;
        var type = typeof defaultValue;
        this.kts[k] = type;
        console.log("[DataCenter] register :" + k + ":" + defaultValue + "(" + type + ")");
      };
      DataCenter.prototype.setData = function(k, nv) {
        var v = this.kvs[k];
        if (v == nv) return;
        var type = this.kts[k];
        var kk = this._field_(k);
        if (type != typeof nv) {
          console.warn("[DataCenter] wrong type <" + typeof nv + "> for :" + kk + "<" + type + "> ,converting...");
          "number" == type ? nv = Number(nv) : "boolean" == type && (nv = "true" == nv);
        }
        this.kvs[k] = nv;
        console.log("[DataCenter] onValueChanged", kk, nv);
        EventManager_1.event.emit(kk, nv, v);
      };
      DataCenter.prototype._field_ = function(k) {
        return this.__namespace + "." + k;
      };
      DataCenter.prototype.getData = function(k) {
        return this.kvs[k];
      };
      DataCenter.prototype.limit = function(v, min, max) {
        return v > max ? max : v < min ? 0 : v;
      };
      DataCenter.prototype.addData = function(k, c) {
        c = Number(c);
        if (null == c) return;
        var v = this.kvs[k];
        var nv = Number(v) + c;
        this.kvs[k] = nv;
        EventManager_1.event.emit(this._field_(k), nv, v);
      };
      DataCenter.prototype.load = function() {
        for (var k in this.kvs) {
          var fromstroage = localStorage.getItem(this._field_(k));
          var v = fromstroage;
          if (fromstroage) {
            var type = this.kts[k];
            "number" == type ? v = Number(fromstroage) : "boolean" == type && (v = "true" == fromstroage);
          } else v = this.getData(k);
          this.kvs[k] = v;
        }
      };
      DataCenter.prototype.save = function() {
        console.log("[DataCenter] save :==================================");
        for (var k in this.kvs) {
          var v = this.kvs[k];
          var kk = this._field_(k);
          localStorage.setItem(kk, v.toString());
          console.log(cc.js.formatStr("%s:%s", kk, v));
        }
        console.log("[DataCenter] save succ :==================================");
      };
      DataCenter.prototype.endRegister = function(s, serializable) {
        void 0 === serializable && (serializable = true);
        this.__namespace = s;
        DataCenter.alldata[s] = this;
        if (serializable) {
          this.load();
          this.save();
        }
      };
      DataCenter.off = function(k, callback, target) {
        EventManager_1.event.off(k, callback, target);
      };
      DataCenter.on = function(k, callback, target) {
        EventManager_1.event.on(k, callback, target);
        this.set(k, this.get(k));
      };
      DataCenter.get = function(k) {
        var strs = k.split(".");
        var namespace = strs[0];
        var name = strs[1];
        var target = DataCenter.alldata[namespace];
        return target ? target[name] : null;
      };
      DataCenter.set = function(k, v) {
        var strs = k.split(".");
        var namespace = strs[0];
        var name = strs[1];
        var target = DataCenter.alldata[namespace];
        target && (target[name] = v);
      };
      DataCenter.register = function(cls) {
        var v = new cls();
        v.registerFields();
        return v;
      };
      DataCenter.alldata = {};
      return DataCenter;
    }();
    exports.default = DataCenter;
    cc._RF.pop();
  }, {
    "../utils/EventManager": "EventManager"
  } ],
  Device: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b88b4v3H5tF7ozLVLmzIPqR", "Device");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Device = function() {
      function Device() {}
      Device.setSoundsEnable = function(b) {
        Device.setSFXEnable(b);
        Device.setBGMEnable(b);
      };
      Device.setSFXEnable = function(b) {
        cc.audioEngine.setEffectsVolume(true == b ? 1 : 0);
        Device.isSfxEnabled = b;
        b ? cc.audioEngine.resumeAllEffects() : cc.audioEngine.pauseAllEffects();
      };
      Device.useCCAudioEngine = function() {
        this._useCCAudioEngine = true;
      };
      Device.useDefaultAudioEngine = function() {
        this._useCCAudioEngine = false;
      };
      Device.setBGMEnable = function(b) {
        cc.audioEngine.setMusicVolume(true == b ? 1 : 0);
        Device.isBgmEnabled = b;
        b ? cc.audioEngine.resumeMusic() : cc.audioEngine.pauseMusic();
      };
      Device.playEffect = function(clip, loop) {
        void 0 === loop && (loop = false);
        if (Device.isSfxEnabled) {
          if (cc.sys.platform != cc.sys.QQ_PLAY) return cc.audioEngine.playEffect(clip, loop);
          if (this._useCCAudioEngine) return cc.audioEngine.playEffect(clip, loop);
        }
      };
      Device.stopMusic = function() {
        cc.audioEngine.stopMusic();
      };
      Device.playMusic = function(clip, loop) {
        void 0 === loop && (loop = true);
        if (Device.isBgmEnabled) return cc.audioEngine.playMusic(clip, loop);
      };
      Device.vibrate = function() {
        cc.sys.WECHAT_GAME == cc.sys.platform ? wx.vibrateShort() : console.log("not support vibrate on except-wx platfrom ");
      };
      Device.isSfxEnabled = true;
      Device.isBgmEnabled = true;
      Device._useCCAudioEngine = false;
      return Device;
    }();
    exports.default = Device;
    cc._RF.pop();
  }, {} ],
  EventManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "334c9avVx5ILbx/6NU/H45V", "EventManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.event = void 0;
    var EventManager = function() {
      function EventManager() {
        this._eventList = {};
      }
      EventManager.prototype.on = function(key, listen, target) {
        if (null != this._eventList[key]) {
          var array = this._eventList[key];
          array.push({
            listen: listen,
            target: target
          });
        } else {
          var array = new Array();
          array.push({
            listen: listen,
            target: target
          });
          this._eventList[key] = array;
        }
      };
      EventManager.prototype.off = function(key, listener, target) {
        if (null != listener && !(listener instanceof Function)) {
          target = listener;
          listener = null;
        }
        if (null != this._eventList[key]) if (null == listener && null == target) delete this._eventList[key]; else {
          var array = this._eventList[key];
          for (var i = array.length - 1; i >= 0; i--) null != listener && null != target ? array[i].listen == listener && array[i].target == target && array.splice(i, 1) : null != listener && array[i].listen == listener ? array.splice(i, 1) : null != target && array[i].target == target && array.splice(i, 1);
        }
      };
      EventManager.prototype.emit = function(tag) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) params[_i - 1] = arguments[_i];
        var sendOk = false;
        if (null != this._eventList[tag]) {
          var array = this._eventList[tag];
          console.log("emit message: ", tag, array.length);
          for (var i = 0; i < array.length; i++) {
            var obj = array[i];
            null != obj.target ? obj.listen.apply(obj.target, params) && (sendOk = true) : obj.listen.apply(this, params) && (sendOk = true);
          }
        }
        return sendOk;
      };
      return EventManager;
    }();
    exports.event = new EventManager();
    cc._RF.pop();
  }, {} ],
  FSM: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "83f52qrCghNrKS6jOC/j6I0", "FSM");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.State = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var State = function() {
      function State(id, name) {
        this.__interval_callbacks = [];
        this.interval_id = 0;
        this.id = id;
        this.name = name;
      }
      State.prototype.onEnter = function(params) {};
      State.prototype.onExit = function() {};
      State.prototype.onUpdate = function(dt) {};
      State.prototype.on = function() {};
      State.prototype.off = function() {};
      State.prototype.clearIntervals = function() {
        this.__interval_callbacks.splice(0, this.__interval_callbacks.length);
      };
      State.prototype.setInterval = function(interval, callback, target) {
        var id = ++this.interval_id;
        var timer = 0;
        this.__interval_callbacks.push({
          id: id,
          callback: callback,
          target: target,
          interval: interval,
          timer: timer
        });
        return id;
      };
      State.prototype.clearInterval = function(id) {
        this.__interval_callbacks.splice(this.__interval_callbacks.indexOf(id));
      };
      State.prototype.setTimeout = function(delay, callback, target) {
        var id = ++this.interval_id;
        var timer = 0;
        this.__interval_callbacks.push({
          id: id,
          callback: callback,
          target: target,
          delay: delay,
          timer: timer
        });
        return id;
      };
      State.prototype.clearTimeout = function(id) {
        this.clearInterval(id);
      };
      State.prototype.invokeIntervals = function(dt) {
        for (var i = 0; i < this.__interval_callbacks.length; i++) {
          var element = this.__interval_callbacks[i];
          element.timer = element.timer + dt;
          if (element.interval) {
            if (element.timer >= element.interval) {
              element.timer = 0;
              element.callback.call(element.target);
            }
          } else if (element.delay && element.timer >= element.delay) {
            element.callback.call(element.target);
            this.__interval_callbacks.splice(i);
            i--;
          }
        }
      };
      return State;
    }();
    exports.State = State;
    var CustomState = function(_super) {
      __extends(CustomState, _super);
      function CustomState(target, id, name, pattern) {
        var _this = _super.call(this, id, name) || this;
        var enterName = cc.js.formatStr(pattern, "onEnter", _this.name);
        var updateName = cc.js.formatStr(pattern, "onUpdate", _this.name);
        var exitName = cc.js.formatStr(pattern, "onExit", _this.name);
        _this.__target = target;
        _this.__enterFunc = _this.__target[enterName];
        _this.__updateFunc = _this.__target[updateName];
        _this.__exitFunc = _this.__target[exitName];
        return _this;
      }
      CustomState.prototype.onEnter = function(params) {
        this.clearIntervals();
        this.__enterFunc && this.__enterFunc.call(this.__target, this, params);
      };
      CustomState.prototype.onExit = function() {
        this.__exitFunc && this.__exitFunc.call(this.__target, this);
      };
      CustomState.prototype.onUpdate = function(dt) {
        this.invokeIntervals(dt);
        this.__updateFunc && this.__updateFunc.call(this.__target, this, dt);
      };
      return CustomState;
    }(State);
    var FSM = function(_super) {
      __extends(FSM, _super);
      function FSM() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.timeElapsed = 0;
        _this._states = {};
        _this._isPaused = false;
        _this.log = false;
        return _this;
      }
      Object.defineProperty(FSM.prototype, "target", {
        get: function() {
          return this._target;
        },
        enumerable: false,
        configurable: true
      });
      FSM.prototype.init = function(target) {
        this._target = target;
        this.timeElapsed = 0;
      };
      FSM.prototype.getState = function(stateId) {
        return this._states[stateId];
      };
      FSM.prototype.getCurrentState = function() {
        return this.c;
      };
      FSM.prototype.getPreviousState = function() {
        return this.p;
      };
      FSM.prototype.addStates = function(states, callbackNamePattern) {
        void 0 === callbackNamePattern && (callbackNamePattern = "%s_%sState");
        var keys = Object.keys(states);
        var enumLen = keys.length / 2;
        this.namePattern = callbackNamePattern;
        for (var i = 0; i < enumLen; i++) {
          var key = keys[i];
          var value = states[key];
          this.addState(key, value);
        }
      };
      FSM.prototype.addState = function(id, name, enterCallback, exitCallback, updateCallback, target) {
        this.log && console.log("[FSM]" + this.target.__classname__ + "(" + this.target.name + ") Add State :", id, name);
        var state = new CustomState(this.target, id, name, this.namePattern);
        this._states[id] = state;
        enterCallback && (state.__enterFunc = enterCallback);
        exitCallback && (state.__exitFunc = exitCallback);
        updateCallback && (state.__updateFunc = updateCallback);
        target && (state.__target = target);
      };
      FSM.prototype.enterState = function(stateId, params) {
        this.timeElapsed = 0;
        var state = this._states[stateId];
        this.c = state;
        state.onEnter(params);
        this.log && console.log("[FSM]" + this.target.__classname__ + " First State:", state.name);
      };
      FSM.prototype.revertState = function() {
        this.changeState(this.p.id);
      };
      FSM.prototype.pause = function() {
        this._isPaused = true;
      };
      FSM.prototype.resume = function() {
        this._isPaused = false;
      };
      FSM.prototype.resetCurrentState = function() {
        this.timeElapsed = 0;
        console.log(cc.js.formatStr("[FSM] %s reset currentState", this.target.__classname__));
        this.c.onExit();
        this.c.onEnter();
      };
      FSM.prototype.changeState = function(stateId, params) {
        var state = this._states[stateId];
        if (null == state) {
          console.warn("[FSM] invalid state for stateId " + stateId + " of : " + this.target.__classname__);
          return;
        }
        if (this._isPaused) {
          console.warn("[FSM] fsm is paused ! " + this.target.__classname__ + " changeState to <" + state.name + "> failed!");
          return;
        }
        if (stateId == this.c.id) return;
        this.timeElapsed = 0;
        this.c.onExit();
        this.p = this.c;
        this.c = state;
        this.log && console.log(cc.js.formatStr("[FSM] %s (%s): %s -> %s", this.target.__classname__, this.name, this.p.name, state.name));
        this.c.onEnter(params);
      };
      FSM.prototype.isInState = function(stateId) {
        return this.c == this._states[stateId];
      };
      FSM.prototype.update = function(dt) {
        if (this._isPaused) return;
        FSM.debug && (dt = .016);
        this.timeElapsed += dt;
        this.c && this.c.onUpdate(dt);
      };
      FSM.debug = false;
      return FSM;
    }(cc.Component);
    exports.default = FSM;
    cc._RF.pop();
  }, {} ],
  FrameSwitch: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "92ea6+rkJ5BQ7Twyd4FI92I", "FrameSwitch");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
    var FrameSwitcher = function(_super) {
      __extends(FrameSwitcher, _super);
      function FrameSwitcher() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.frames = [];
        _this.target = null;
        _this._index = 0;
        _this.randomOnLoad = false;
        return _this;
      }
      FrameSwitcher.prototype.onLoad = function() {
        null == this.target && (this.target = this.getComponent(cc.Sprite));
        this.randomOnLoad && this.switchRandom();
      };
      FrameSwitcher.prototype.switchRandom = function() {};
      Object.defineProperty(FrameSwitcher.prototype, "index", {
        get: function() {
          return this._index;
        },
        set: function(k) {
          this.switch(k);
        },
        enumerable: false,
        configurable: true
      });
      FrameSwitcher.prototype.switch = function(index) {
        var len = this.frames.length;
        var idx = Math.min(Math.max(0, index), len - 1);
        this.target.spriteFrame = this.frames[idx];
        this._index = idx;
      };
      FrameSwitcher.prototype.start = function() {};
      __decorate([ property([ cc.SpriteFrame ]) ], FrameSwitcher.prototype, "frames", void 0);
      __decorate([ property(cc.Sprite) ], FrameSwitcher.prototype, "target", void 0);
      __decorate([ property ], FrameSwitcher.prototype, "randomOnLoad", void 0);
      FrameSwitcher = __decorate([ ccclass ], FrameSwitcher);
      return FrameSwitcher;
    }(cc.Component);
    exports.default = FrameSwitcher;
    cc._RF.pop();
  }, {} ],
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4c9b5SEXlhDAqXGat0NcWmI", "Game");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Res_1 = require("./Res");
    var HexonTile_1 = require("./HexonTile");
    var GridManager_1 = require("./GridManager");
    var InputSystem_1 = require("../../../framework/plugin_boosts/misc/InputSystem");
    var Info_1 = require("../Info");
    var Animal_1 = require("./Animal");
    var ViewManager_1 = require("../../../framework/plugin_boosts/ui/ViewManager");
    var ToastManager_1 = require("../../../framework/plugin_boosts/ui/ToastManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LineGame = function(_super) {
      __extends(LineGame, _super);
      function LineGame() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._isGameOver = false;
        _this._moveCount = 0;
        _this._playTime = 0;
        _this._colCount = 6;
        _this._rowCount = 7;
        _this._pickedTile = null;
        _this.tileLayer = null;
        _this.levelLabel = null;
        _this.timeLabel = null;
        _this.stepLabel = null;
        _this.focusNode = null;
        _this._figureList = [];
        _this.perfectMoveCount = 0;
        return _this;
      }
      LineGame_1 = LineGame;
      LineGame.prototype.get_isGameOver = function() {
        return this._isGameOver;
      };
      LineGame.prototype.get_minCol = function() {
        return this._levelData.mincol;
      };
      LineGame.prototype.get_moveCount = function() {
        return this._moveCount;
      };
      LineGame.prototype.loadLevel = function(t) {
        t = Math.min(t, Res_1.R.levelJson.json.levels.length - 1);
        this._levelData = Res_1.R.levelJson.json.levels[t];
        this.levelLabel.string = t + "";
        1 == t && this.scheduleOnce(this.openGuide, .1);
      };
      LineGame.prototype.openGuide = function() {
        ViewManager_1.default.instance.show("Game/OpenGuide");
      };
      LineGame.prototype.onLoad = function() {
        var _this = this;
        var t = this;
        LineGame_1.instance = this;
        this.loadLevel(Info_1.UserInfo.currentLevel);
        this.hideFocus();
        this._tileList = [];
        this._rowCount = this._levelData.size;
        this._colCount -= 1;
        for (var e = 0, n = this._rowCount; n > e; ) {
          var i, s = e++;
          var tmplist = [];
          i = s <= this._rowCount / 2 ? this._levelData.mincol + s : this._levelData.mincol - 1 + this._rowCount - s;
          for (var r = 0; i > r; ) {
            var o = r++;
            var node = cc.instantiate(Res_1.R.TilePrefab);
            var tile = node.getComponent(HexonTile_1.default);
            node.parent = this.tileLayer;
            node.zIndex = this._rowCount - s;
            tile.set_row(s);
            tile.set_col(o);
            var shadowNode = cc.instantiate(Res_1.R.TileShadow);
            var shadow = shadowNode.getComponent(HexonTile_1.default);
            shadow.set_row(s);
            shadow.set_col(o);
            shadowNode.y -= 3;
            shadowNode.parent = this.tileLayer;
            shadowNode.zIndex = 0;
            tmplist.push(tile);
          }
          this._tileList.push(tmplist);
          appGame.gameServerRoom.emit(consts.CLIENT_GAME_START, {});
          appGame.banner.playBanner(2);
          this.schedule(function() {
            console.log("\u63d2\u5c4f\u5e7f\u544a==");
            appGame.interstitialAd && appGame.interstitialAd.playAd("\u63d2\u5c4f");
          }, 60);
          this.schedule(function() {
            console.log("\u79ef\u6728\u5e7f\u544a==");
            appGame.qqblockad && appGame.qqblockad.playBlockad(true);
          }, 30);
        }
        this._gridManager = this.tileLayer.addComponent(GridManager_1.default);
        this._gridManager.init(this._levelData.mincol);
        this.setFigure();
        this.addComponent(InputSystem_1.InputSystem);
        Info_1.UserInfo.timePassed = 0;
        Info_1.UserInfo.stepUsed = 0;
        this.schedule(function(_) {
          Info_1.UserInfo.timePassed += 1;
          _this.timeLabel.string = Info_1.UserInfo.timePassed + "s";
          _this.stepLabel.string = Info_1.UserInfo.stepUsed + "\u6b65";
        }, 1);
      };
      LineGame.prototype.onTouchBegan = function(e) {
        var t = this;
        if (!t._isGameOver) {
          var p = e.currentTouch.getLocation();
          p = this.node.convertToNodeSpaceAR(p);
          var i = t.findTileByPos(p.x, p.y);
          if (null != i && 0 != i.get_animal()) {
            cc.audioEngine.playEffect(Res_1.R.audio_down, false);
            t._pickedTile = i;
            t.removeGridFromTile(t._pickedTile);
            t._pickedTile.connect(null);
            if (null != t._pickedTile.targetTile) {
              t.removeGridFromTile(t._pickedTile.targetTile);
              t._pickedTile.targetTile.connect(null);
              t._pickedTile.targetTile.set_isConnecting(false);
            }
            t._pickedTile.set_isConnecting(!0);
            i = t._pickedTile.getHead();
            for (;null != i; ) i.set_isConnecting(!0), i = i.connectedTile;
            this.showFocus(t._pickedTile.get_animal());
            this.moveFocus(p);
          }
          this.checkCompelete();
        }
      };
      LineGame.prototype.checkCompelete = function() {
        this.checkConnectedAll() && this.checkFillAll();
      };
      LineGame.prototype.isTileConnected = function(t, e) {
        var n, i = t._row;
        n = t._col + (i <= this._rowCount / 2 ? 0 : t._row - (this._rowCount / 2 | 0));
        var s, a = e._row;
        return s = e._col + (a <= this._rowCount / 2 ? 0 : e._row - (this._rowCount / 2 | 0)), 
        i - 1 == a && n - 1 == s || i - 1 == a && n == s || i == a && n - 1 == s || i == a && n + 1 == s || i + 1 == a && n == s || i + 1 == a && n + 1 == s;
      };
      LineGame.prototype.onTouchMoved = function(e) {
        var t = this;
        if (!t._isGameOver) {
          var p = e.currentTouch.getLocation();
          p = this.node.convertToNodeSpaceAR(p);
          var i = t.findTileByPos(p.x, p.y);
          if (null != t._pickedTile && null != i) if (t.isTileConnected(t._pickedTile, i)) {
            if (0 == i.get_animal()) (null == t._pickedTile.targetTile || null == t._pickedTile.reverseConnectedTile) && (t._gridManager.setState(t._pickedTile.get_row(), t._pickedTile.get_col(), i.get_row(), i.get_col(), !0), 
            t._pickedTile.connect(i), t._pickedTile = i, t._pickedTile.set_isConnecting(!0)); else if (i.get_animal() == t._pickedTile.get_animal()) if (false != i.isChangable || i.equals(t._pickedTile.getHead())) {
              for (t._pickedTile = i, i = t._pickedTile; null != i && null != i.connectedTile; ) t._gridManager.setState(i.get_row(), i.get_col(), i.connectedTile.get_row(), i.connectedTile.get_col(), !1), 
              i = i.connectedTile;
              t._pickedTile.connect(null);
            } else null == i.reverseConnectedTile && (t._gridManager.setState(t._pickedTile.get_row(), t._pickedTile.get_col(), i.get_row(), i.get_col(), !0), 
            t._pickedTile.connect(i), t._pickedTile = i);
          } else if (i.get_animal() == t._pickedTile.get_animal() && !i.equals(t._pickedTile) && null != i.connectedTile) {
            for (t._pickedTile = i, i = t._pickedTile; null != i && null != i.connectedTile; ) t._gridManager.setState(i.get_row(), i.get_col(), i.connectedTile.get_row(), i.connectedTile.get_col(), !1), 
            i = i.connectedTile;
            t._pickedTile.connect(null);
          }
          this.moveFocus(p);
        }
      };
      LineGame.prototype.onTouchEnded = function() {
        var t = this;
        var e = false;
        if (!t._isGameOver) {
          if (null != t._pickedTile) {
            var n = t._pickedTile.getHead();
            for (null != t._pickedTile.animalSprite && null != n && null != n.animalSprite && (e = true, 
            t._pickedTile.animalSprite.connected(), n.animalSprite.connected()); null != n; ) n.set_isConnecting(false), 
            n = n.connectedTile;
            t._moveCount++;
            Info_1.UserInfo.stepUsed++;
          }
          t._pickedTile = null;
          this.hideFocus();
          if (t.checkConnectedAll()) if (t.checkFillAll()) {
            t._isGameOver = true;
            t.danceAll();
          } else ToastManager_1.Toast.make("\u5fc5\u987b\u586b\u6ee1\u6240\u6709\u683c\u5b50");
          true != e || t._isGameOver || cc.audioEngine.playEffect(Res_1.R.audio_link, false);
        }
      };
      LineGame.prototype.showFocus = function(animal) {
        console.log(animal);
        this.focusNode.active = true;
        this.focusNode.zIndex = 100;
        this.focusNode.color = Res_1.R.colors[animal].clone();
      };
      LineGame.prototype.moveFocus = function(p) {
        this.focusNode.position = p;
      };
      LineGame.prototype.hideFocus = function() {
        this.focusNode.active = false;
      };
      LineGame.prototype.danceAll = function() {
        cc.audioEngine.playEffect(Res_1.R.audio_win, false);
        for (var t = 0, e = this._tileList; t < e.length; ) {
          var n = e[t];
          ++t;
          for (var i = 0; i < n.length; ) {
            var s = n[i];
            ++i, null != s.animalSprite && s.animalSprite.loopJump(1);
          }
        }
        this.scheduleOnce(this.showWinDialog, 1);
      };
      LineGame.prototype.showWinDialog = function() {
        ViewManager_1.default.instance.show("Game/WinDialog");
      };
      LineGame.prototype.click_pause = function() {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u6e38\u620f\u754c\u9762",
          content: "\u70b9\u51fb\u8fd4\u56de"
        }, function() {});
        ViewManager_1.default.instance.show("Game/PauseDialog");
      };
      LineGame.prototype.click_share = function() {};
      LineGame.prototype.setFigure = function() {
        this._figureList = [];
        for (var t = [], e = 0; 10 > e; ) e++, t.push(null);
        for (var e = 0, n = this._levelData.figure; e < n.length; ) {
          var i = n[e];
          ++e;
          var s = this._tileList[i[0]][i[1]];
          var a = s.get_borderPosition();
          var type = i[2];
          var node = cc.instantiate(Res_1.R.animalPrefabs[type - 1]);
          s.animalSprite = node.getComponent(Animal_1.default);
          node.setPosition(a.x, a.y);
          node.parent = this.tileLayer;
          node.zIndex = 110;
          s.set_animal(i[2]);
          s.isChangable = false;
          this._figureList.push(s);
          null == t[i[2]] ? t[i[2]] = s : (s.targetTile = t[i[2]], t[i[2]].targetTile = s);
        }
        this.perfectMoveCount = this._figureList.length / 2 | 0;
      };
      LineGame.prototype.findTileByPos = function(x, y) {
        var n = null;
        var i = 1e6;
        var s = cc.v2(x, y);
        var r = this._tileList;
        for (var a = 0; a < r.length; ++a) {
          var o = r[a];
          for (var _ = 0; _ < o.length; ++_) {
            var l = o[_];
            var tp = o[_].node.position;
            var h = s.sub(tp).mag();
            if (h < 50 && h < i) {
              i = h;
              n = l;
            }
          }
        }
        return n;
      };
      LineGame.prototype.removeGridFromTile = function(t) {
        for (;null != t && null != t.connectedTile; ) this._gridManager.setState(t.get_row(), t.get_col(), t.connectedTile.get_row(), t.connectedTile.get_col(), !1), 
        t = t.connectedTile;
      };
      LineGame.prototype.checkFillAll = function() {
        for (var t = 0, e = this._tileList; t < e.length; ) {
          var n = e[t];
          ++t;
          for (var i = 0; i < n.length; ) {
            var s = n[i];
            if (++i, 0 == s.get_animal()) return !1;
          }
        }
        return !0;
      };
      LineGame.prototype.checkConnectedAll = function() {
        for (var t = 0, e = this._tileList; t < e.length; ) {
          var n = e[t];
          ++t;
          for (var i = 0; i < n.length; ) {
            var s = n[i];
            if (++i, null != s.targetTile) {
              var a = s.getHead(), r = s.getTail();
              if (0 == s.targetTile.equals(a) && 0 == s.targetTile.equals(r)) return !1;
            }
          }
        }
        return !0;
      };
      var LineGame_1;
      LineGame.instance = null;
      __decorate([ property(cc.Node) ], LineGame.prototype, "tileLayer", void 0);
      __decorate([ property(cc.Label) ], LineGame.prototype, "levelLabel", void 0);
      __decorate([ property(cc.Label) ], LineGame.prototype, "timeLabel", void 0);
      __decorate([ property(cc.Label) ], LineGame.prototype, "stepLabel", void 0);
      __decorate([ property(cc.Node) ], LineGame.prototype, "focusNode", void 0);
      LineGame = LineGame_1 = __decorate([ ccclass ], LineGame);
      return LineGame;
    }(cc.Component);
    exports.default = LineGame;
    cc._RF.pop();
  }, {
    "../../../framework/plugin_boosts/misc/InputSystem": "InputSystem",
    "../../../framework/plugin_boosts/ui/ToastManager": "ToastManager",
    "../../../framework/plugin_boosts/ui/ViewManager": "ViewManager",
    "../Info": "Info",
    "./Animal": "Animal",
    "./GridManager": "GridManager",
    "./HexonTile": "HexonTile",
    "./Res": "Res"
  } ],
  GetDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "714f07aCe9N55KDdTLTUVv8", "GetDialog");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var View_1 = require("../../../framework/plugin_boosts/ui/View");
    var Info_1 = require("../Info");
    var ViewManager_1 = require("../../../framework/plugin_boosts/ui/ViewManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GetDialog = function(_super) {
      __extends(GetDialog, _super);
      function GetDialog() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.diamondLabel = null;
        _this.count = 0;
        _this.node_close = null;
        return _this;
      }
      GetDialog.prototype.onLoad = function() {};
      GetDialog.prototype.start = function() {};
      GetDialog.prototype.share_suc = function() {
        Info_1.UserInfo.addDiamond(2 * this.count);
        Info_1.UserInfo.save();
        this.getComponent(View_1.default).hide();
        ViewManager_1.default.instance.show("Game/LuckyDialog");
      };
      GetDialog.prototype.click_double = function() {
        var choice = Info_1.UserInfo.getChoice(Info_1.ChoiceType.Get);
        1 == choice || 0 == choice && this.share_suc();
      };
      GetDialog.prototype.onShown = function(count) {
        this.count = count;
        this.diamondLabel.string = "+" + count;
        this.node_close.active = false;
        this.unschedule(this.delayShow);
        this.scheduleOnce(this.delayShow, 2);
      };
      GetDialog.prototype.delayShow = function() {
        this.node_close.active = true;
      };
      GetDialog.prototype.click_no = function() {
        this.getComponent(View_1.default).hide();
        Info_1.UserInfo.addDiamond(this.count);
        Info_1.UserInfo.save();
        ViewManager_1.default.instance.show("Game/LuckyDialog");
      };
      __decorate([ property(cc.Label) ], GetDialog.prototype, "diamondLabel", void 0);
      __decorate([ property(cc.Node) ], GetDialog.prototype, "node_close", void 0);
      GetDialog = __decorate([ ccclass ], GetDialog);
      return GetDialog;
    }(cc.Component);
    exports.default = GetDialog;
    cc._RF.pop();
  }, {
    "../../../framework/plugin_boosts/ui/View": "View",
    "../../../framework/plugin_boosts/ui/ViewManager": "ViewManager",
    "../Info": "Info"
  } ],
  GridManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3b45a0/RCtHwJWRliu8sGTN", "GridManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var IntMap_1 = require("./ds/IntMap");
    var Game_1 = require("./Game");
    var Res_1 = require("./Res");
    var GridManager = function(_super) {
      __extends(GridManager, _super);
      function GridManager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._minCol = null;
        return _this;
      }
      GridManager.prototype.addGrid = function(t, e, n) {
        null == this._gridList && (this._gridList = new IntMap_1.default());
        this._gridList.exists(t) || this._gridList.set(t, new IntMap_1.default());
        this._gridList.get(t).set(e, n);
      };
      GridManager.prototype.init = function(t) {
        this._minCol = t;
      };
      GridManager.prototype.start = function() {
        var t = Game_1.default.instance._rowCount;
        var e = Game_1.default.instance._tileList;
        this._gridList = new IntMap_1.default();
        for (var n = 0; t > n; ) for (var i = n++, s = 0, a = (t / 2 >= i ? this._minCol + i : this._minCol - 1 + t - i) - 1; a > s; ) {
          var r = s++;
          var o = e[i][r].get_borderPosition();
          var b = e[i][r + 1].get_borderPosition();
          var c = cc.v2((o.x + b.x) / 2, (o.y + b.y) / 2);
          var line = cc.instantiate(Res_1.R.Line46);
          line.setPosition(c);
          line.active = false;
          line.parent = this.node;
          line.zIndex = 109;
          this.addGrid(i + i, r + r + 1, line);
        }
        for (n = 0, i = t / 2 | 0; i > n; ) for (s = n++, a = t / 2 >= s ? this._minCol + s : this._minCol - 1 + t - s, 
        r = 0; a > r; ) {
          o = r++;
          for (var m_1 = 0; 2 > m_1; m_1++) {
            var h = e[s][o].get_borderPosition();
            var u = e[s + 1][o + m_1].get_borderPosition();
            h = cc.v2((h.x + u.x) / 2, (h.y + u.y) / 2);
            var line = null;
            line = 0 == m_1 ? cc.instantiate(Res_1.R.Line37) : cc.instantiate(Res_1.R.Line19);
            line.setPosition(h);
            line.active = false;
            line.parent = this.node;
            line.zIndex = 109;
            this.addGrid(s + s + 1, o + o + m_1, line);
          }
        }
        for (n = 0, i = t / 2 | 0; i > n; ) for (s = n++, s = t - s - 1, a = t / 2 >= s ? this._minCol + s : this._minCol - 1 + t - s, 
        r = 0; a > r; ) {
          o = r++;
          for (var m = 0; 2 > m; m++) {
            h = e[s][o].get_borderPosition();
            u = e[s - 1][o + m].get_borderPosition();
            h = cc.v2((h.x + u.x) / 2, (h.y + u.y) / 2);
            var line = null;
            line = 0 == m ? cc.instantiate(Res_1.R.Line19) : cc.instantiate(Res_1.R.Line37);
            line.setPosition(h);
            line.active = false;
            line.zIndex = 109;
            line.parent = this.node;
            this.addGrid(s + s - 1, o + o + m, line);
          }
        }
      };
      GridManager.prototype.setState = function(r, c, r1, c1, b) {
        if (this._gridList.exists(r + r1)) {
          var t = this._gridList.get(r + r1);
          if (t.exists(c + c1)) {
            var node = t.get(c + c1);
            node.active = b;
          }
        }
      };
      return GridManager;
    }(cc.Component);
    exports.default = GridManager;
    cc._RF.pop();
  }, {
    "./Game": "Game",
    "./Res": "Res",
    "./ds/IntMap": "IntMap"
  } ],
  HbDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ec5aa26/dhLhpV83mVeVmkA", "HbDialog");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ViewManager_1 = require("../../../framework/plugin_boosts/ui/ViewManager");
    var ToastManager_1 = require("../../../framework/plugin_boosts/ui/ToastManager");
    var Res_1 = require("../hex-lines-game/Res");
    var Info_1 = require("../Info");
    var Device_1 = require("../../../framework/plugin_boosts/gamesys/Device");
    var View_1 = require("../../../framework/plugin_boosts/ui/View");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HbDialog = function(_super) {
      __extends(HbDialog, _super);
      function HbDialog() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      HbDialog.prototype.onLoad = function() {};
      HbDialog.prototype.start = function() {};
      HbDialog.prototype.click = function() {
        var choise = Info_1.UserInfo.getChoice(Info_1.ChoiceType.HB);
      };
      HbDialog.prototype.share_suc = function() {
        var cfg = Res_1.R.skinConfig.json[3];
        ToastManager_1.Toast.make("\u606d\u559c\u83b7\u5f97\u76ae\u80a4 \uff1a" + cfg.text);
        Device_1.default.playEffect(Res_1.R.audio_unlock);
        Info_1.UserInfo.unlock(cfg.id);
        Info_1.UserInfo.selectedSkin = cfg.id;
        Info_1.UserInfo.save();
        ViewManager_1.default.instance.show("Game/ShopDialog");
        this.getComponent(View_1.default).hide();
      };
      HbDialog = __decorate([ ccclass ], HbDialog);
      return HbDialog;
    }(cc.Component);
    exports.default = HbDialog;
    cc._RF.pop();
  }, {
    "../../../framework/plugin_boosts/gamesys/Device": "Device",
    "../../../framework/plugin_boosts/ui/ToastManager": "ToastManager",
    "../../../framework/plugin_boosts/ui/View": "View",
    "../../../framework/plugin_boosts/ui/ViewManager": "ViewManager",
    "../Info": "Info",
    "../hex-lines-game/Res": "Res"
  } ],
  HexonTile: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "64d50rBFZhG5qLba7sOg6x9", "HexonTile");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Consts_1 = require("./Consts");
    var Game_1 = require("./Game");
    var Res_1 = require("./Res");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TileType;
    (function(TileType) {
      TileType[TileType["Empty"] = 0] = "Empty";
      TileType[TileType["Type1"] = 1] = "Type1";
      TileType[TileType["Type2"] = 2] = "Type2";
      TileType[TileType["Type3"] = 3] = "Type3";
      TileType[TileType["Type4"] = 4] = "Type4";
      TileType[TileType["Type5"] = 5] = "Type5";
      TileType[TileType["Type6"] = 6] = "Type6";
      TileType[TileType["Type7"] = 7] = "Type7";
    })(TileType || (TileType = {}));
    var HexonTile = function(_super) {
      __extends(HexonTile, _super);
      function HexonTile() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._col = 0;
        _this._row = 0;
        _this._animal = 0;
        _this.isChangable = true;
        _this._isConnecting = false;
        _this.connectedTile = null;
        _this.reverseConnectedTile = null;
        _this.targetTile = null;
        _this._sprite = null;
        _this._baseSprite = null;
        _this.animalSprite = null;
        _this._tileType = 0;
        return _this;
      }
      HexonTile.prototype.get_col = function() {
        return this._col;
      };
      HexonTile.prototype.set_col = function(t) {
        return this._col = t, t = this._col - (this._row <= Game_1.default.instance._rowCount / 2 ? Game_1.default.instance.get_minCol() + this._row : Game_1.default.instance.get_minCol() - 1 + Game_1.default.instance._rowCount - this._row) / 2 + .5, 
        this._baseSprite.node.x = Consts_1.default.CenterX + t * Consts_1.default.ColSize, 
        this._col;
      };
      HexonTile.prototype.get_row = function() {
        return this._row;
      };
      HexonTile.prototype.set_row = function(t) {
        this._row = t;
        this._baseSprite.node.y = Consts_1.default.CenterY + (this._row - (Game_1.default.instance._rowCount / 2 | 0)) * Consts_1.default.RowSize;
        return this._row;
      };
      HexonTile.prototype.get_borderPosition = function() {
        return this._baseSprite.node.position;
      };
      HexonTile.prototype.get_isConnecting = function() {
        return this._isConnecting;
      };
      HexonTile.prototype.set_isConnecting = function(t) {
        return this._isConnecting = t, this.set_tileType(this._tileType), this._isConnecting;
      };
      HexonTile.prototype.get_animal = function() {
        return this._animal;
      };
      HexonTile.prototype.set_animal = function(t) {
        switch (this._animal = t, t) {
         case 1:
          this.set_tileType(TileType.Type1);
          break;

         case 2:
          this.set_tileType(TileType.Type2);
          break;

         case 3:
          this.set_tileType(TileType.Type3);
          break;

         case 4:
          this.set_tileType(TileType.Type4);
          break;

         case 5:
          this.set_tileType(TileType.Type5);
          break;

         case 6:
          this.set_tileType(TileType.Type6);
          break;

         case 7:
          this.set_tileType(TileType.Type7);
          break;

         default:
          this.set_tileType(TileType.Empty);
        }
        return this._animal;
      };
      HexonTile.prototype.getTileTexture = function(t, e, n) {
        if (0 == t) return Res_1.R.tileTextures[0];
        var idx = 0;
        idx = e ? t : n ? 14 + t : 7 + t;
        return Res_1.R.tileTextures[idx];
      };
      HexonTile.prototype.set_tileType = function(t) {
        this._tileType = t;
        if (this.isChangable && this.get_isConnecting()) this._baseSprite.spriteFrame = this.getTileTexture(this.get_animal(), true, false); else {
          var tailTile = this.getTail();
          var sp = void 0;
          sp = (this.isChangable || null == this.reverseConnectedTile) && (null == tailTile || tailTile.isChangable) ? this.getTileTexture(this.get_animal(), false, false) : this.getTileTexture(this.get_animal(), false, true);
          this._baseSprite.spriteFrame = sp;
        }
        return this._tileType;
      };
      HexonTile.prototype.onAdded = function() {
        this.set_tileType(TileType.Empty);
      };
      HexonTile.prototype.connect = function(t) {
        null == t ? null != this.connectedTile && (1 == this.connectedTile.isChangable && this.connectedTile.set_animal(0), 
        this.connectedTile.connect(null), this.connectedTile = this.connectedTile.reverseConnectedTile = null) : (this.connectedTile = t, 
        t.set_animal(this.get_animal()), t.reverseConnectedTile = this);
      };
      HexonTile.prototype.getTail = function() {
        for (var t = this.connectedTile, e = null; null != t; ) e = t, t = t.connectedTile;
        return e;
      };
      HexonTile.prototype.getHead = function() {
        for (var t = this.reverseConnectedTile, e = null; null != t; ) e = t, t = t.reverseConnectedTile;
        return e;
      };
      HexonTile.prototype.equals = function(t) {
        return null != t && (this.get_row() == t.get_row() && this.get_col() == t.get_col());
      };
      HexonTile.prototype.start = function() {};
      __decorate([ property({
        type: cc.Sprite,
        visible: true,
        displayName: "Animal Sprite"
      }) ], HexonTile.prototype, "_sprite", void 0);
      __decorate([ property({
        type: cc.Sprite,
        visible: true,
        displayName: "Base Sprite"
      }) ], HexonTile.prototype, "_baseSprite", void 0);
      HexonTile = __decorate([ ccclass ], HexonTile);
      return HexonTile;
    }(cc.Component);
    exports.default = HexonTile;
    cc._RF.pop();
  }, {
    "./Consts": "Consts",
    "./Game": "Game",
    "./Res": "Res"
  } ],
  InfiniteBackground: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ea63dhsLFFNTK51F3JClP8v", "InfiniteBackground");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var InfiniteBackground = function(_super) {
      __extends(InfiniteBackground, _super);
      function InfiniteBackground() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bgNode = null;
        _this.camera = null;
        _this.currentNode = null;
        _this.repeatCount = 0;
        return _this;
      }
      InfiniteBackground.prototype.onLoad = function() {
        this.currentNode = this.bgNode;
        this.size = this.currentNode.getContentSize();
        this.nodepool = new cc.NodePool();
      };
      InfiniteBackground.prototype.start = function() {
        if (null == this.prev) {
          this.prev = cc.instantiate(this.bgNode);
          this.node.addChild(this.prev);
          this.prev.y = -this.size.height;
        }
      };
      InfiniteBackground.prototype.reset = function() {
        this.repeatCount = 0;
      };
      InfiniteBackground.prototype.update = function(dt) {
        if (null == this.currentNode) return;
        var pos = cc.Vec2.ZERO;
        this.camera.getWorldToCameraPoint(this.currentNode.position, pos);
        var prev = this.prev;
        if (pos.y < 10 && null == this.next) {
          this.pre_prev = this.prev;
          this.prev = this.currentNode;
          var road = this.nodepool.get();
          null == road && (road = cc.instantiate(this.currentNode));
          road.setPosition(0, this.size.height * ++this.repeatCount);
          this.node.addChild(road);
          this.currentNode = road;
          this.camera.getWorldToCameraPoint(road.position, pos);
          this.next = null;
        }
        pos.y > this.size.height - 10 && this.pre_prev && this.nodepool.put(this.pre_prev);
      };
      __decorate([ property(cc.Node) ], InfiniteBackground.prototype, "bgNode", void 0);
      __decorate([ property(cc.Camera) ], InfiniteBackground.prototype, "camera", void 0);
      InfiniteBackground = __decorate([ ccclass ], InfiniteBackground);
      return InfiniteBackground;
    }(cc.Component);
    exports.default = InfiniteBackground;
    cc._RF.pop();
  }, {} ],
  Info: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "894ddeHxZNOMqD6BW+YheZr", "Info");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.UserInfo = exports.ChoiceType = void 0;
    var DataCenter_1 = require("../../framework/plugin_boosts/misc/DataCenter");
    var Res_1 = require("./hex-lines-game/Res");
    var ToastManager_1 = require("../../framework/plugin_boosts/ui/ToastManager");
    var Device_1 = require("../../framework/plugin_boosts/gamesys/Device");
    var ChoiceType;
    (function(ChoiceType) {
      ChoiceType[ChoiceType["DailyGet"] = 0] = "DailyGet";
      ChoiceType[ChoiceType["Levelup"] = 1] = "Levelup";
      ChoiceType[ChoiceType["Get"] = 2] = "Get";
      ChoiceType[ChoiceType["Shop"] = 3] = "Shop";
      ChoiceType[ChoiceType["BannerAdRefresh"] = 4] = "BannerAdRefresh";
      ChoiceType[ChoiceType["HB"] = 5] = "HB";
    })(ChoiceType = exports.ChoiceType || (exports.ChoiceType = {}));
    var UserInfoClass = function(_super) {
      __extends(UserInfoClass, _super);
      function UserInfoClass() {
        var _this = _super.call(this) || this;
        _this.choices = [];
        _this.version = "6";
        _this.level = 1;
        _this.selectedSkin = "2";
        _this.dailyGetTime = new Date(2018, 1, 1).getTime();
        _this.freedrawTime = _this.dailyGetTime;
        _this.luckyVideoWatchTime = _this.dailyGetTime;
        _this.shopFreeDiamondTime = _this.dailyGetTime;
        _this.diamond = 0;
        _this.sfx_enabled = true;
        _this.firstTimeReach = false;
        _this.luckyVideoWatchCount = 0;
        _this.timePassed = 0;
        _this.stepUsed = 0;
        _this.currentLevel = 1;
        _this.unlock(_this.selectedSkin);
        setTimeout(function() {
          _this.save();
        }, 6e4);
        return _this;
      }
      UserInfoClass.prototype.getChoice = function(slotId) {
        return this.choices[slotId] || 0;
      };
      UserInfoClass.prototype.init = function() {};
      UserInfoClass.prototype.onGetConfig = function(data) {
        if (data) {
          var record = data[0];
          record && (this.choices = JSON.parse(record[this.version]));
        }
      };
      UserInfoClass.prototype.addDiamond = function(d, b) {
        void 0 === b && (b = true);
        this.diamond += "number" == typeof d ? d : parseInt(d);
        if (b) {
          ToastManager_1.Toast.make("\u83b7\u5f97\u94bb\u77f3 x" + d);
          Device_1.default.playEffect(Res_1.R.audio_get_diamond);
        }
        if (!this.firstTimeReach && this.diamond >= 500) {
          ToastManager_1.Toast.make("\u54c7\u53ef\u4ee5\u4e70\u76ae\u80a4\u4e86\uff0c\u5feb\u53bb\u76ae\u80a4\u5546\u5e97\u770b\u770b\u5427!", 2);
          this.firstTimeReach = true;
          exports.UserInfo.save();
        }
      };
      UserInfoClass.prototype.isUnlock = function(skin_id) {
        var carUnlocked = localStorage.getItem("unlocked_" + skin_id);
        return !!carUnlocked && "1" == carUnlocked;
      };
      UserInfoClass.prototype.isAllUnlocked = function() {
        var c = 0;
        for (var i = 0; i < Res_1.R.skinConfig.json.length; i++) {
          var v = Res_1.R.skinConfig.json[i];
          exports.UserInfo.isUnlock(v.id) && c++;
        }
        return c == Res_1.R.skinConfig.json.length;
      };
      UserInfoClass.prototype.getSkinById = function(id) {
        var res = Res_1.R.skinConfig.json.filter(function(v) {
          return v.id == id;
        });
        return res[0];
      };
      UserInfoClass.prototype.unlock = function(skin_id) {
        localStorage.setItem("unlocked_" + skin_id, "1");
      };
      __decorate([ DataCenter_1.field() ], UserInfoClass.prototype, "level", void 0);
      __decorate([ DataCenter_1.field() ], UserInfoClass.prototype, "selectedSkin", void 0);
      __decorate([ DataCenter_1.field() ], UserInfoClass.prototype, "dailyGetTime", void 0);
      __decorate([ DataCenter_1.field() ], UserInfoClass.prototype, "freedrawTime", void 0);
      __decorate([ DataCenter_1.field() ], UserInfoClass.prototype, "luckyVideoWatchTime", void 0);
      __decorate([ DataCenter_1.field() ], UserInfoClass.prototype, "shopFreeDiamondTime", void 0);
      __decorate([ DataCenter_1.field() ], UserInfoClass.prototype, "diamond", void 0);
      __decorate([ DataCenter_1.field() ], UserInfoClass.prototype, "sfx_enabled", void 0);
      __decorate([ DataCenter_1.field() ], UserInfoClass.prototype, "firstTimeReach", void 0);
      __decorate([ DataCenter_1.field() ], UserInfoClass.prototype, "luckyVideoWatchCount", void 0);
      UserInfoClass = __decorate([ DataCenter_1.dc("Info") ], UserInfoClass);
      return UserInfoClass;
    }(DataCenter_1.default);
    exports.default = UserInfoClass;
    exports.UserInfo = DataCenter_1.default.register(UserInfoClass);
    cc._RF.pop();
  }, {
    "../../framework/plugin_boosts/gamesys/Device": "Device",
    "../../framework/plugin_boosts/misc/DataCenter": "DataCenter",
    "../../framework/plugin_boosts/ui/ToastManager": "ToastManager",
    "./hex-lines-game/Res": "Res"
  } ],
  InputSystem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4643c14ws5Msox+teVpsIzz", "InputSystem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.InputSystem = exports.Input = void 0;
    var JoyStick_1 = require("./JoyStick");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    exports.Input = null;
    var InputSystem = function(_super) {
      __extends(InputSystem, _super);
      function InputSystem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._target = null;
        _this.keys = {};
        _this.__touchVec = cc.Vec2.ZERO;
        _this.radius_axis = 256;
        _this.joyStick = null;
        _this.__lastTouch = cc.Vec2.ZERO;
        _this.moveOffset = cc.Vec2.ZERO;
        _this.__curTouchId = -1;
        return _this;
      }
      InputSystem.prototype.setDelegate = function(target) {
        this._target = target;
      };
      InputSystem.prototype.onLoad = function() {
        exports.Input = this;
        var components = this.getComponents(cc.Component);
        for (var i = 0; i < components.length; i++) {
          var comp = components[i];
          if (comp != this && (comp.onTouchBegan || comp.onTouchEnded || comp.onTouchMoved)) {
            this._target = comp;
            break;
          }
        }
        console.log("InputSystem Component -> target:", this._target);
      };
      InputSystem.prototype.start = function() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.triggerKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.triggerKeyUp, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.triggerTouchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.triggerTouchMoved, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.triggerTouchEnded, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.triggerTouchCanceled, this);
      };
      Object.defineProperty(InputSystem.prototype, "touch", {
        get: function() {
          return this.__touch;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(InputSystem.prototype, "axis", {
        get: function() {
          return this.joyStick ? this.joyStick.axis : this.__touchVec;
        },
        enumerable: false,
        configurable: true
      });
      InputSystem.prototype.getKey = function(k) {
        return this.keys[k];
      };
      InputSystem.prototype.triggerKeyUp = function(e) {
        this._target.onKeyUp && this._target.onKeyUp(event);
        this.keys[event["key"]] = false;
      };
      InputSystem.prototype.triggerKeyDown = function(e) {
        this._target.onKeyDown && this._target.onKeyDown(event);
        this.keys[event["key"]] = true;
      };
      InputSystem.prototype.triggerTouchEnded = function(e) {
        if (-1 != this.__curTouchId && e.getID() != this.__curTouchId) return;
        this.__curTouchId = -1;
        this._target.onTouchEnded && this._target.onTouchEnded(e);
        this.__touch = null;
        this.__touchVec = cc.Vec2.ZERO;
        e.currentTouch && this.joyStick && this.joyStick.touchEnd(e.currentTouch.getLocation());
        this.moveOffset = cc.Vec2.ZERO;
      };
      InputSystem.prototype.triggerTouchMoved = function(e) {
        if (-1 != this.__curTouchId && e.getID() != this.__curTouchId) return;
        this._target.onTouchMoved && this._target.onTouchMoved(e);
        this.__touch = e.currentTouch.getLocation();
        this.moveOffset = this.__touch.sub(this.__lastTouch);
        if (this.__touch && this.__startLocation) {
          this.__touchVec = this.__touch.sub(this.__startLocation);
          this.joyStick && this.joyStick.touchMove(this.__touch);
        }
        this.__lastTouch = this.__touch;
      };
      InputSystem.prototype.triggerTouchBegan = function(e) {
        if (-1 != this.__curTouchId && e.getID() != this.__curTouchId) return;
        this._target.onTouchBegan && this._target.onTouchBegan(e);
        this.__curTouchId = e.getID();
        this.__startLocation = e.currentTouch.getLocation();
        this.__touch = e.currentTouch.getLocation();
        this.__lastTouch = this.__touch;
        this.joyStick && this.joyStick.touchStart(this.__startLocation);
      };
      InputSystem.prototype.triggerTouchCanceled = function(e) {
        this.triggerTouchEnded(e);
      };
      InputSystem.prototype.onEnable = function() {
        this.schedule(this.checkTouch, .02);
      };
      InputSystem.prototype.onDisable = function() {
        this.unschedule(this.checkTouch);
      };
      InputSystem.prototype.checkTouch = function() {
        this.__touch && (this.moveOffset = this.__touch.sub(this.__lastTouch));
      };
      __decorate([ property(JoyStick_1.default) ], InputSystem.prototype, "joyStick", void 0);
      InputSystem = __decorate([ ccclass ], InputSystem);
      return InputSystem;
    }(cc.Component);
    exports.InputSystem = InputSystem;
    cc._RF.pop();
  }, {
    "./JoyStick": "JoyStick"
  } ],
  IntMap: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "11eeadKZERHbLgjtZ/2KsFr", "IntMap");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var IntMap = function() {
      function IntMap() {
        this.h = {};
      }
      IntMap.prototype.set = function(t, e) {
        this.h[t] = e;
      };
      IntMap.prototype.get = function(t) {
        return this.h[t];
      };
      IntMap.prototype.exists = function(t) {
        return this.h.hasOwnProperty(t);
      };
      IntMap.prototype.remove = function(t) {
        return !!this.h.hasOwnProperty(t) && (delete this.h[t], !0);
      };
      IntMap.prototype.keys = function() {
        var t, e = [];
        for (t in this.h) this.h.hasOwnProperty(t) && e.push(0 | t);
        return com.iter(e);
      };
      return IntMap;
    }();
    exports.default = IntMap;
    cc._RF.pop();
  }, {} ],
  Intersection: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f4dfDdP95AjIAwGFL34sfm", "Intersection");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Intersection = function() {
      function Intersection() {}
      Intersection.circleIntersectRect = function(circle_pt, radius, rect) {
        var cx = 0;
        var cy = 0;
        cx = circle_pt.x < rect.x ? rect.x : circle_pt.x > rect.x + rect.width ? rect.x + rect.width : circle_pt.x;
        cy = circle_pt.y < rect.y ? rect.y : circle_pt.y > rect.y + rect.height ? rect.y + rect.height : circle_pt.y;
        var v2 = cc.v2(cx, cy);
        v2.subSelf(circle_pt);
        if (v2.magSqr() < radius * radius) return true;
        return false;
      };
      return Intersection;
    }();
    exports.default = Intersection;
    cc._RF.pop();
  }, {} ],
  JoyStick: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "297d6dgG6ZIJJ+ZjeNWq2ub", "JoyStick");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var JoyStick = function(_super) {
      __extends(JoyStick, _super);
      function JoyStick() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.outterCircle = null;
        _this.innerCircle = null;
        _this.radius = 250;
        _this.innerCircleRadius = 20;
        _this.releaseAfterOver = false;
        _this.dynamicJoystick = false;
        _this.autoRadius = false;
        _this.isReleased = false;
        _this._startPos = cc.Vec2.ZERO;
        return _this;
      }
      JoyStick.prototype.onLoad = function() {
        this.autoRadius && (this.radius = this.outterCircle.getBoundingBox().height / 2);
        this.innerCircle.setPosition(0, 0);
        this.node.active = false;
      };
      JoyStick.prototype.start = function() {
        this.releaseStick();
      };
      JoyStick.prototype.releaseStick = function() {
        var move = cc.moveTo(.5, cc.Vec2.ZERO);
        var action = move.easing(cc.easeExponentialOut());
        this.innerCircle.runAction(action);
        this.isReleased = true;
        this.dynamicJoystick && this.scheduleOnce(this.delayClose, 1);
      };
      JoyStick.prototype.delayClose = function() {
        this.node.active = false;
      };
      Object.defineProperty(JoyStick.prototype, "axis", {
        get: function() {
          if (this.isReleased) return cc.Vec2.ZERO;
          var vec = this.innerCircle.getPosition();
          vec.normalizeSelf();
          return vec;
        },
        enumerable: false,
        configurable: true
      });
      JoyStick.prototype.move = function(pos) {
        var mag = pos.mag();
        if (mag > this.radius) {
          this.releaseAfterOver && this.releaseStick();
          pos.normalizeSelf();
          pos.mulSelf(this.radius);
        }
        this.innerCircle.setPosition(pos);
      };
      JoyStick.prototype.touchStart = function(p) {
        if (!this.enabled) return;
        this.isReleased = false;
        this._startPos = p;
        this.unschedule(this.delayClose);
        this.node.active = true;
        if (this.dynamicJoystick) {
          var pos = this.node.getParent().convertToNodeSpaceAR(p);
          this.node.setPosition(pos);
        }
        this.move(cc.Vec2.ZERO);
      };
      JoyStick.prototype.touchMove = function(p) {
        if (!this.enabled) return;
        var vec = p.sub(this._startPos);
        this.move(vec);
      };
      JoyStick.prototype.touchEnd = function(p) {
        if (!this.enabled) return;
        this.releaseStick();
      };
      __decorate([ property(cc.Node) ], JoyStick.prototype, "outterCircle", void 0);
      __decorate([ property(cc.Node) ], JoyStick.prototype, "innerCircle", void 0);
      __decorate([ property ], JoyStick.prototype, "radius", void 0);
      __decorate([ property ], JoyStick.prototype, "innerCircleRadius", void 0);
      __decorate([ property ], JoyStick.prototype, "releaseAfterOver", void 0);
      __decorate([ property ], JoyStick.prototype, "dynamicJoystick", void 0);
      __decorate([ property ], JoyStick.prototype, "autoRadius", void 0);
      JoyStick = __decorate([ ccclass ], JoyStick);
      return JoyStick;
    }(cc.Component);
    exports.default = JoyStick;
    cc._RF.pop();
  }, {} ],
  LevelDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4c94fc8PDtI1o3JM9m3WRKN", "LevelDialog");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Info_1 = require("../Info");
    var LevelSelector_1 = require("../../../framework/plugin_boosts/ui/game/LevelSelector");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LevelDialog = function(_super) {
      __extends(LevelDialog, _super);
      function LevelDialog() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      LevelDialog.prototype.onLoad = function() {};
      LevelDialog.prototype.start = function() {};
      LevelDialog.prototype.onShown = function() {
        this.selector.currentLevel = Info_1.UserInfo.level;
        this.selector.refresh();
        this.scheduleOnce(this.refreshLevels, .1);
        appGame.banner.playBanner(1);
      };
      LevelDialog.prototype.refreshLevels = function() {
        this.selector.scrollToCurrentLevel();
      };
      LevelDialog.prototype.select_level = function(lvnode) {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u9009\u62e9\u5173\u5361\u754c\u9762",
          content: "\u70b9\u51fb\u5173\u5361" + lvnode.name
        }, function() {});
        this.gotoLevel(lvnode.name);
      };
      LevelDialog.prototype.refreshLevelItem = function(data) {};
      LevelDialog.prototype.gotoLevel = function(lv) {
        lv = parseInt(lv);
        console.log("enter level", lv);
        Info_1.UserInfo.currentLevel = lv;
        cc.director.loadScene("Game");
      };
      LevelDialog.prototype.click_continue = function() {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u9009\u62e9\u5173\u5361\u754c\u9762",
          content: "\u70b9\u51fb\u7ee7\u7eed\u6e38\u620f"
        }, function() {});
        appGame.gameServerRoom.gameConfigData && appGame.gameServerRoom.gameConfigData.LevelDialogContinue ? appGame.videoBanner.playVideoAd(1, 0, function() {
          this.gotoLevel(Info_1.UserInfo.level);
        }.bind(this)) : this.gotoLevel(Info_1.UserInfo.level);
      };
      __decorate([ property(LevelSelector_1.default) ], LevelDialog.prototype, "selector", void 0);
      LevelDialog = __decorate([ ccclass ], LevelDialog);
      return LevelDialog;
    }(cc.Component);
    exports.default = LevelDialog;
    cc._RF.pop();
  }, {
    "../../../framework/plugin_boosts/ui/game/LevelSelector": "LevelSelector",
    "../Info": "Info"
  } ],
  LevelSelector: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b7942O9SJ1JFpcT0/D7YiFO", "LevelSelector");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, help = _a.help;
    var LevelSelector = function(_super) {
      __extends(LevelSelector, _super);
      function LevelSelector() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.pageview = null;
        _this.template = null;
        _this.onSelectLevel = new cc.Component.EventHandler();
        _this.onRefreshItem = new cc.Component.EventHandler();
        _this.index = 0;
        _this.max = 9;
        _this.itemCountPerPage = 0;
        _this.pages = [];
        _this.currentLevel = 1;
        _this.autoScrollToCurrentLevel = true;
        return _this;
      }
      LevelSelector.prototype.selectLevel = function(event, msg) {
        this.onSelectLevel ? this.onSelectLevel.emit([ event.target, Number(event.target.name) ]) : console.warn("LevelSelector: onSelectLevel callback is nil");
      };
      LevelSelector.prototype.onLoad = function() {
        this.pages.splice(0, this.pages.length);
        this.itemCountPerPage = this.template.childrenCount;
        var pageCount = Math.floor(this.max / this.itemCountPerPage);
        var mod = this.max % this.itemCountPerPage;
        mod > 0 && (pageCount += 1);
        for (var i = 0; i < pageCount - 1; i++) {
          var page = cc.instantiate(this.template);
          this.pageview.addPage(page);
          this.pages.push(page);
        }
        this.pages.push(this.template);
        for (var pageIdx = 0; pageIdx < pageCount; pageIdx++) {
          var page = this.pages[pageIdx];
          for (var itemIdx = 0; itemIdx < page.childrenCount; itemIdx++) {
            var item = page.children[itemIdx];
            var label = item.getChildByName("label");
            var level = pageIdx * this.itemCountPerPage + Number(itemIdx) + 1;
            level > this.max && (item.active = false);
            item.name = level + "";
            label.getComponent(cc.Label).string = item.name;
          }
        }
      };
      LevelSelector.prototype.refreshItem = function(item, level) {
        var lv = this.currentLevel;
        if (level > lv) {
          item.opacity = 100;
          item.getComponent(cc.Button).enabled = false;
        } else {
          item.opacity = 255;
          item.getComponent(cc.Button).enabled = true;
        }
      };
      LevelSelector.prototype.refresh = function() {
        console.log("LevelSelctor: refresh");
        for (var i = 0; i < this.pages.length; i++) {
          var page = this.pages[i];
          for (var itemIdx = 0; itemIdx < page.childrenCount; itemIdx++) {
            var item = page.children[itemIdx];
            var level = i * this.itemCountPerPage + Number(itemIdx) + 1;
            this.refreshItem(item, level);
            this.onRefreshItem.emit([ item, level ]);
          }
        }
        this.autoScrollToCurrentLevel && this.scrollToCurrentLevel();
      };
      LevelSelector.prototype.start = function() {};
      LevelSelector.prototype.scrollToCurrentLevel = function() {
        var lv = this.currentLevel;
        var curPage = Math.floor(lv / this.itemCountPerPage);
        var mod = lv % this.itemCountPerPage;
        0 == mod && (curPage -= 1);
        this.pageview.scrollToPage(curPage, .3);
      };
      LevelSelector.prototype.nextPage = function() {
        this.pageview.scrollToPage(this.pageview.getCurrentPageIndex() + 1, .3);
      };
      LevelSelector.prototype.prevPage = function() {
        this.pageview.scrollToPage(this.pageview.getCurrentPageIndex() - 1, .3);
      };
      __decorate([ property(cc.PageView) ], LevelSelector.prototype, "pageview", void 0);
      __decorate([ property(cc.Node) ], LevelSelector.prototype, "template", void 0);
      __decorate([ property(cc.Component.EventHandler) ], LevelSelector.prototype, "onSelectLevel", void 0);
      __decorate([ property(cc.Component.EventHandler) ], LevelSelector.prototype, "onRefreshItem", void 0);
      __decorate([ property ], LevelSelector.prototype, "index", void 0);
      __decorate([ property ], LevelSelector.prototype, "max", void 0);
      LevelSelector = __decorate([ ccclass ], LevelSelector);
      return LevelSelector;
    }(cc.Component);
    exports.default = LevelSelector;
    cc._RF.pop();
  }, {} ],
  LevelupDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "192e1nHc39B4b1vo/mjTFG2", "LevelupDialog");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Info_1 = require("../Info");
    var View_1 = require("../../../framework/plugin_boosts/ui/View");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LevelupDialog = function(_super) {
      __extends(LevelupDialog, _super);
      function LevelupDialog() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.diamondLabel = null;
        _this.btnLabel = null;
        _this.tipLabel = null;
        _this.levelLabel = null;
        _this.mult = 1;
        _this.baseDiamond = 0;
        return _this;
      }
      LevelupDialog.prototype.onLoad = function() {};
      LevelupDialog.prototype.start = function() {};
      LevelupDialog.prototype.onShown = function(level, p) {
        p = Math.min(p, 1);
        var diamond = Math.floor(Math.max(30 * p, 10));
        this.baseDiamond = diamond;
        this.diamondLabel.string = diamond.toString();
        this.levelLabel.string = cc.js.formatStr("- \u7b2c %s \u5173 - ", level);
      };
      LevelupDialog.prototype.click_get = function() {
        Info_1.UserInfo.addDiamond(this.baseDiamond);
        Info_1.UserInfo.save();
        this.getComponent(View_1.default).hide();
      };
      LevelupDialog.prototype.share_suc = function() {
        Info_1.UserInfo.addDiamond(this.baseDiamond * this.mult);
        Info_1.UserInfo.save();
        this.getComponent(View_1.default).hide();
      };
      LevelupDialog.prototype.click_getex = function() {
        var choise = Info_1.UserInfo.getChoice(Info_1.ChoiceType.Levelup);
      };
      __decorate([ property(cc.Label) ], LevelupDialog.prototype, "diamondLabel", void 0);
      __decorate([ property(cc.Label) ], LevelupDialog.prototype, "btnLabel", void 0);
      __decorate([ property(cc.Label) ], LevelupDialog.prototype, "tipLabel", void 0);
      __decorate([ property(cc.Label) ], LevelupDialog.prototype, "levelLabel", void 0);
      LevelupDialog = __decorate([ ccclass ], LevelupDialog);
      return LevelupDialog;
    }(cc.Component);
    exports.default = LevelupDialog;
    cc._RF.pop();
  }, {
    "../../../framework/plugin_boosts/ui/View": "View",
    "../Info": "Info"
  } ],
  LoadingManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "48049jD6zJMmoi+cPkRhX7D", "LoadingManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Loading = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    exports.Loading = null;
    var LoadingManager = function(_super) {
      __extends(LoadingManager, _super);
      function LoadingManager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.prefab = null;
        _this.loadingNode = null;
        _this.loadingSprite = null;
        _this.loadingText = null;
        _this.blockEventComp = null;
        _this._callback = null;
        _this._target = null;
        return _this;
      }
      LoadingManager.prototype.onLoad = function() {
        this.loadingNode = cc.instantiate(this.prefab);
        this.blockEventComp = this.loadingNode.getComponent(cc.BlockInputEvents);
        this.loadingNode.parent = this.node;
        this.loadingNode.zIndex = 9999;
        this.loadingSprite = this.loadingNode.getComponentInChildren(cc.Sprite);
        this.loadingText = this.loadingNode.getComponentInChildren(cc.Label);
        this.hide();
        exports.Loading = this;
      };
      LoadingManager.prototype.start = function() {
        this.loadingSprite.node.runAction(cc.rotateBy(4, 360).repeatForever());
      };
      LoadingManager.prototype.dealyClose = function() {
        this.hide();
        this._callback && this._callback.call(this._target);
      };
      LoadingManager.prototype.show = function(timeout, text, modal, callback, target) {
        void 0 === text && (text = null);
        void 0 === modal && (modal = true);
        void 0 === callback && (callback = null);
        void 0 === target && (target = null);
        this.loadingNode.active = true;
        this.loadingNode.resumeAllActions();
        this.blockEventComp.enabled = modal;
        this._callback = callback;
        this._target = target;
        text && (this.loadingText.string = text);
        if (timeout > 0) {
          this.unschedule(this.dealyClose);
          this.scheduleOnce(this.dealyClose, timeout);
        }
      };
      LoadingManager.prototype.hide = function() {
        this.loadingNode.active = false;
        this.loadingNode.pauseAllActions();
      };
      __decorate([ property(cc.Prefab) ], LoadingManager.prototype, "prefab", void 0);
      LoadingManager = __decorate([ ccclass ], LoadingManager);
      return LoadingManager;
    }(cc.Component);
    exports.default = LoadingManager;
    cc._RF.pop();
  }, {} ],
  LocalLifeSystem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "550c0O4ualLIYQoOOiFtGsz", "LocalLifeSystem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.LifeSystem = exports.LocalLifeSystem = void 0;
    var EventManager_1 = require("../utils/EventManager");
    var Signal_1 = require("../misc/Signal");
    var LocalLifeSystem = function() {
      function LocalLifeSystem() {
        this.sec_per_live = 300;
        this.live_free_get = 5;
        this.max_freeLives_seconds = this.live_free_get * this.sec_per_live;
        this.livesSeconds = 0;
        this.isEnabledAutoRecovery = true;
        this.recoverySignal = new Signal_1.default();
      }
      LocalLifeSystem.prototype.init = function(liveSec, live_free) {
        void 0 === liveSec && (liveSec = null);
        void 0 === live_free && (live_free = null);
        this.sec_per_live = liveSec || this.sec_per_live;
        this.live_free_get = live_free || this.live_free_get;
        this.max_freeLives_seconds = this.sec_per_live * this.live_free_get;
        this.livesSeconds = 0;
        this.lastLifeSaveTime = Number(localStorage.getItem("sys_life_lastLifeSaveTime") || new Date().getTime());
        EventManager_1.event.on("onEnterForeground", this.onEnterForeground, this);
        this.onTimeRequested(new Date().getTime());
        console.log("\u4f53\u529b\u7cfb\u7edf\u521d\u59cb\u5316", this);
      };
      LocalLifeSystem.prototype.onEnterForeground = function() {
        this.onTimeRequested(new Date().getTime());
      };
      Object.defineProperty(LocalLifeSystem.prototype, "nextLifeTime", {
        get: function() {
          return (this.lives + 1) * this.sec_per_live - this.livesSeconds;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(LocalLifeSystem.prototype, "lives", {
        get: function() {
          return Math.floor(this.livesSeconds / this.sec_per_live);
        },
        enumerable: false,
        configurable: true
      });
      LocalLifeSystem.prototype.save = function() {
        this.lastLifeSaveTime = new Date().getTime();
        localStorage.setItem("sys_life_lastLifeSaveTime", this.lastLifeSaveTime + "");
      };
      LocalLifeSystem.prototype.onTimeRequested = function(time) {
        if (this.lastLifeSaveTime) {
          var timeElapsed = Math.floor((time - this.lastLifeSaveTime) / 1e3);
          this.livesSeconds = Math.min(this.max_freeLives_seconds, timeElapsed);
        }
      };
      LocalLifeSystem.prototype.startCheck = function(callback, target) {
        var _this = this;
        if (this.task_checkLives) return;
        var lastHeart = callback.call(target);
        this.task_checkLives = setInterval(function(_) {
          var heart = callback.call(target);
          if (lastHeart != heart && heart == _this.live_free_get - 1) {
            _this.livesSeconds = 0;
            _this.save();
          }
          if (heart < _this.live_free_get) {
            _this.livesSeconds = _this.livesSeconds + 1;
            if (heart + _this.lives > heart) {
              console.log("\u83b7\u5f97\u5728\u7ebf\u5956\u52b1\u4e00\u9897\u661f", _this.lives);
              _this.recoverySignal.fire(_this.lives);
              _this.livesSeconds = 0;
              _this.save();
            }
          }
          lastHeart = heart;
        }, 1e3);
      };
      return LocalLifeSystem;
    }();
    exports.LocalLifeSystem = LocalLifeSystem;
    exports.LifeSystem = new LocalLifeSystem();
    cc._RF.pop();
  }, {
    "../misc/Signal": "Signal",
    "../utils/EventManager": "EventManager"
  } ],
  LocalTimeSystem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f847KAJNJCwrvg4K3CKFUv", "LocalTimeSystem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var LocalTimeSystem = function() {
      function LocalTimeSystem() {}
      LocalTimeSystem.init = function(utc_msec) {
        if (null == utc_msec || void 0 == utc_msec) return;
        LocalTimeSystem.utc_sec = utc_msec;
        if (cc.sys.WECHAT_GAME == cc.sys.platform) {
          wx.onHide(this.onHidden);
          wx.onShow(this.onShown);
        }
      };
      LocalTimeSystem.startTimer = function() {
        this.timer = setInterval(function(_) {
          LocalTimeSystem.utc_sec += 1e3;
        }, 1e3);
      };
      LocalTimeSystem.stopTimer = function() {
        clearInterval(this.timer);
      };
      LocalTimeSystem.getSec = function() {
        return LocalTimeSystem.utc_sec || new Date().getTime() / 1e3;
      };
      LocalTimeSystem.getDate = function() {
        if (LocalTimeSystem.utc_sec) {
          var date = new Date();
          date.setTime(1e3 * LocalTimeSystem.utc_sec);
          return date;
        }
        return new Date();
      };
      LocalTimeSystem.onHidden = function() {
        console.log("game enter background");
      };
      LocalTimeSystem.onShown = function() {
        console.log("game enter foreground");
      };
      return LocalTimeSystem;
    }();
    exports.default = LocalTimeSystem;
    cc._RF.pop();
  }, {} ],
  LuckyDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a94275+JmtMx6iZb18iwKTe", "LuckyDialog");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ToastManager_1 = require("../../../framework/plugin_boosts/ui/ToastManager");
    var ViewManager_1 = require("../../../framework/plugin_boosts/ui/ViewManager");
    var View_1 = require("../../../framework/plugin_boosts/ui/View");
    var Info_1 = require("../Info");
    var Device_1 = require("../../../framework/plugin_boosts/gamesys/Device");
    var Res_1 = require("../hex-lines-game/Res");
    var UIFunctions_1 = require("../../../framework/plugin_boosts/ui/UIFunctions");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LuckyDialog = function(_super) {
      __extends(LuckyDialog, _super);
      function LuckyDialog() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._canRotate = true;
        _this.sprites = [];
        _this.labels = [];
        _this.btn_freedraw = null;
        _this.btn_videodraw = null;
        _this.freedrawTip = null;
        _this.drawLabel = null;
        _this.pool = [];
        _this.isGreaterDate = function(now, before) {
          var diff = now.getTime() - before.getTime();
          return diff > 864e5 || diff > 0 && now.getDate() != before.getDate();
        };
        return _this;
      }
      LuckyDialog_1 = LuckyDialog;
      LuckyDialog.prototype.start = function() {};
      LuckyDialog.prototype.share_succ = function() {
        this.startDraw();
        Info_1.UserInfo.freedrawTime = new Date().getTime();
        Info_1.UserInfo.save();
        this.onShown();
      };
      LuckyDialog.prototype.click_freeedraw = function() {};
      LuckyDialog.prototype.onLoad = function() {
        for (var i = 0; i < Res_1.R.luckyConfig.json.length; i++) {
          var cfg = Res_1.R.luckyConfig.json[i];
          var chance = parseFloat(cfg.chance);
          for (var j = 0; j < 2 * chance; j++) this.pool.push(i);
        }
        this.pool.shuffle();
        console.log(this.pool);
      };
      LuckyDialog.prototype.startDraw = function() {
        var id = g.getRandomInArray(this.pool);
        this.startWheel(id);
        Device_1.default.playEffect(Res_1.R.audio_draw);
      };
      LuckyDialog.prototype.isNextDay = function(timeSec) {
        return this.isGreaterDate(new Date(), new Date(timeSec));
      };
      LuckyDialog.prototype.click_videodraw = function() {
        if (Info_1.UserInfo.luckyVideoWatchCount >= LuckyDialog_1.MaxVideoCount) {
          if (!this.isNextDay(Info_1.UserInfo.luckyVideoWatchTime)) return;
          Info_1.UserInfo.luckyVideoWatchCount = 0;
          Info_1.UserInfo.luckyVideoWatchTime = new Date().getTime();
        }
      };
      LuckyDialog.prototype.calculateAngle = function(index) {
        var angle = 60 * -(index - 1) - 30 - 1440 - this.wheelSp.node.rotation % 360;
        return angle;
      };
      LuckyDialog.prototype.onShown = function() {
        if (Info_1.UserInfo.luckyVideoWatchCount >= LuckyDialog_1.MaxVideoCount) {
          this.drawLabel.string = "\u5df2\u7528\u5b8c";
          UIFunctions_1.default.setButtonEnabled(this.btn_videodraw, false);
        } else {
          this.drawLabel.string = "\u770b\u89c6\u9891\u62bd\u5956";
          UIFunctions_1.default.setButtonEnabled(this.btn_videodraw, true);
        }
        if (g.isGreaterDate(new Date(), new Date(Info_1.UserInfo.freedrawTime))) {
          this.btn_freedraw.interactable = true;
          this.btn_freedraw.node.opacity = 255;
          this.freedrawTip.active = false;
        } else {
          this.btn_freedraw.interactable = false;
          this.btn_freedraw.node.opacity = 100;
          this.freedrawTip.active = true;
        }
        for (var i = 0; i < Res_1.R.luckyConfig.json.length; i++) {
          var cfg = Res_1.R.luckyConfig.json[i];
          this.labels[i].string = cfg.gold_reward + "";
        }
      };
      LuckyDialog.prototype.startWheel = function(id) {
        console.log("target wheel:", id);
        var angle = this.calculateAngle(id);
        if (!this._canRotate) {
          ToastManager_1.Toast.make("\u6b63\u5728\u7ed9\u60a8\u6311\u9009\u5956\u54c1...");
          return;
        }
        this._canRotate = false;
        var stage3 = cc.rotateBy(Math.abs(angle / 400), angle);
        var callFunc = cc.callFunc(function() {
          this._canRotate = true;
          this.showRes(id);
        }.bind(this));
        var sequence = cc.sequence(stage3, callFunc);
        this.wheelSp.node.runAction(sequence.easing(cc.easeQuadraticActionInOut()));
      };
      LuckyDialog.prototype.showRes = function(id) {
        var cfg = Res_1.R.luckyConfig.json[id];
        var gold = !isNaN(Number(cfg.gold_reward));
        if (gold) {
          this.getComponent(View_1.default).hide();
          ViewManager_1.default.instance.show("Game/GetDialog", cfg.gold_reward);
        } else {
          ToastManager_1.Toast.make("\u606d\u559c\u4f60\u62bd\u4e2d\u4e86 " + cfg.gold_reward);
          Info_1.UserInfo.unlock(g.randomInt(0, 6));
        }
      };
      LuckyDialog.prototype.update = function(dt) {};
      LuckyDialog.prototype.click_close = function() {
        if (!this._canRotate) {
          ToastManager_1.Toast.make("\u6b63\u5728\u7ed9\u60a8\u6311\u9009\u5956\u54c1...");
          return;
        }
        this.getComponent(View_1.default).hide();
      };
      var LuckyDialog_1;
      LuckyDialog.MaxVideoCount = 5;
      __decorate([ property(cc.Sprite) ], LuckyDialog.prototype, "wheelSp", void 0);
      __decorate([ property([ cc.Sprite ]) ], LuckyDialog.prototype, "sprites", void 0);
      __decorate([ property([ cc.Label ]) ], LuckyDialog.prototype, "labels", void 0);
      __decorate([ property(cc.Button) ], LuckyDialog.prototype, "btn_freedraw", void 0);
      __decorate([ property(cc.Button) ], LuckyDialog.prototype, "btn_videodraw", void 0);
      __decorate([ property(cc.Node) ], LuckyDialog.prototype, "freedrawTip", void 0);
      __decorate([ property(cc.Label) ], LuckyDialog.prototype, "drawLabel", void 0);
      LuckyDialog = LuckyDialog_1 = __decorate([ ccclass ], LuckyDialog);
      return LuckyDialog;
    }(cc.Component);
    exports.default = LuckyDialog;
    cc._RF.pop();
  }, {
    "../../../framework/plugin_boosts/gamesys/Device": "Device",
    "../../../framework/plugin_boosts/ui/ToastManager": "ToastManager",
    "../../../framework/plugin_boosts/ui/UIFunctions": "UIFunctions",
    "../../../framework/plugin_boosts/ui/View": "View",
    "../../../framework/plugin_boosts/ui/ViewManager": "ViewManager",
    "../Info": "Info",
    "../hex-lines-game/Res": "Res"
  } ],
  Main: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "979d2m9WlRN0519FkcUBa5E", "Main");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ViewManager_1 = require("../../framework/plugin_boosts/ui/ViewManager");
    var Device_1 = require("../../framework/plugin_boosts/gamesys/Device");
    var Res_1 = require("./hex-lines-game/Res");
    var ToastManager_1 = require("../../framework/plugin_boosts/ui/ToastManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Main = function(_super) {
      __extends(Main, _super);
      function Main() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Main_1 = Main;
      Main.prototype.onLoad = function() {
        Main_1.instance = this;
        Device_1.default.playMusic(Res_1.R.audio_bgm);
      };
      Main.prototype.isNextDay = function(timeSec) {
        return this.isGreaterDate(new Date(), new Date(timeSec));
      };
      Main.prototype.isGreaterDate = function(now, before) {
        var diff = now.getTime() - before.getTime();
        return diff > 864e5 || diff > 0 && now.getDate() != before.getDate();
      };
      Main.prototype.start = function() {
        appGame.gameServerRoom.emit(consts.CLIENT_GAME_START, function() {
          appGame.banner.playBanner(2);
        });
      };
      Main.prototype.click_play = function() {
        ViewManager_1.default.instance.show("Game/LevelDialog");
      };
      Main.prototype.toggle_sfx = function(t) {
        Device_1.default.setSoundsEnable(!t.isChecked);
      };
      Main.prototype.click_skin = function() {
        ViewManager_1.default.instance.show("Game/ShopDialog");
      };
      Main.prototype.click_rank = function() {
        ViewManager_1.default.instance.show("wechat/WxRankDialog");
      };
      Main.prototype.onShare = function() {};
      Main.prototype.click_share = function() {};
      Main.prototype.click_luck = function() {
        ViewManager_1.default.instance.show("Game/LuckyDialog");
      };
      Main.prototype.click_more = function() {
        ToastManager_1.Toast.make("\u656c\u8bf7\u671f\u5f85");
      };
      var Main_1;
      Main.instance = null;
      Main = Main_1 = __decorate([ ccclass ], Main);
      return Main;
    }(cc.Component);
    exports.default = Main;
    cc._RF.pop();
  }, {
    "../../framework/plugin_boosts/gamesys/Device": "Device",
    "../../framework/plugin_boosts/ui/ToastManager": "ToastManager",
    "../../framework/plugin_boosts/ui/ViewManager": "ViewManager",
    "./hex-lines-game/Res": "Res"
  } ],
  MessageBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dde8btrP25FeqHeKW+G4Pfb", "MessageBase");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.MessageBase = void 0;
    var MessageType_1 = require("./MessageType");
    var Message_1 = require("./Message");
    var ConnectManager_1 = require("./ConnectManager");
    var MessageBase = function() {
      function MessageBase() {
        this.Cmd = {};
        this.Error = {};
        this._allFuncs = {};
        for (var i in game.Command) {
          var v = game.Command[i];
          this.Cmd[v] = i;
        }
        for (var i in game.ErrorCode) {
          var v = game.ErrorCode[i];
          this.Error[v] = i;
        }
      }
      MessageBase.prototype.useSocketKey = function(key) {
        this._socketKey = key;
      };
      MessageBase.prototype.addListener = function(cmd, func) {
        this._allFuncs[cmd] = func;
      };
      MessageBase.prototype.removeListener = function(cmd) {
        null != this._allFuncs[cmd] && (this._allFuncs[cmd] = null);
      };
      MessageBase.prototype.onMessage = function(obj) {
        if (obj.type == MessageType_1.SocketTag.KSOCKET_MESSAGE) {
          var int8a = new Uint8Array(obj.msg);
          var buffer = new flatbuffers.ByteBuffer(int8a);
          var msg = game.Package.getRootAsPackage(buffer);
          return null != this._allFuncs[msg.cmd()] ? this._allFuncs[msg.cmd()].call(this, msg) : this.onHandler(msg);
        }
        this.onSocket(obj.type);
        return true;
      };
      MessageBase.prototype.onSocket = function(type) {};
      MessageBase.prototype.onHandler = function(msg) {
        return false;
      };
      MessageBase.prototype.sendMessage = function(msg) {
        ConnectManager_1.connManager.sendMessage(msg, this._socketKey);
      };
      MessageBase.prototype.onDestory = function() {
        this._allFuncs = null;
      };
      MessageBase.prototype.send = function(cmd, cmdstr, procedure, build) {
        void 0 === cmdstr && (cmdstr = "");
        void 0 === procedure && (procedure = null);
        void 0 === build && (build = null);
        console.log("Send Message : [" + this.Cmd[cmd] + "]");
        var socket = ConnectManager_1.connManager.getDefault();
        var msg = new Message_1.Message(cmd);
        var ds = game[cmdstr];
        if (null != ds) {
          null == build && (build = this.createBuilder());
          var startFunc = ds["start" + cmdstr];
          var endFunc = ds["end" + cmdstr];
          startFunc.call(ds, build);
          procedure && procedure(build);
          build.finish(endFunc.call(ds, build));
          msg.addBuilder(build);
        } else msg.addString(cmdstr);
        socket.sendMessage(msg);
      };
      MessageBase.prototype.createBuilder = function() {
        return new flatbuffers.Builder();
      };
      return MessageBase;
    }();
    exports.MessageBase = MessageBase;
    cc._RF.pop();
  }, {
    "./ConnectManager": "ConnectManager",
    "./Message": "Message",
    "./MessageType": "MessageType"
  } ],
  MessageBoxComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5d14c63Zc1PupexE+EkksQp", "MessageBoxComponent");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var View_1 = require("./View");
    var MessageBoxManager_1 = require("./MessageBoxManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, playOnFocus = _a.playOnFocus;
    var MessageBoxComponent = function(_super) {
      __extends(MessageBoxComponent, _super);
      function MessageBoxComponent() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.node_title = null;
        _this.node_content = null;
        _this.btn_ok = null;
        _this.btn_cancel = null;
        _this.messageBoxCallback = null;
        _this.label_ok = null;
        _this.label_cancel = null;
        _this.group_ok_cancel = null;
        _this.group_ok = null;
        return _this;
      }
      MessageBoxComponent.prototype.onLoad = function() {
        this.label_ok = this.btn_ok.getChildByName("Label").getComponent(cc.Label);
        this.label_cancel = this.btn_cancel.getChildByName("Label").getComponent(cc.Label);
        this.getComponent(View_1.default).setDelegate(this);
        this.bgAnimation = this.node.getChildByName("bg").getComponent(cc.Animation);
      };
      MessageBoxComponent.prototype.onHidden = function() {};
      MessageBoxComponent.prototype.onShown = function(params) {
        this.node_title.string = params.title;
        this.node_content.string = params.content;
        this.messageBoxCallback = params.callback;
        if (params.extra) {
          this.label_ok.string = params.extra.okText;
          this.label_cancel.string = params.extra.cancelText;
        }
        if (params.buttons == MessageBoxManager_1.MessageBox.OK_CANCEL) {
          this.group_ok_cancel.active = true;
          this.group_ok.active = false;
        } else {
          this.group_ok.active = true;
          this.group_ok_cancel.active = false;
        }
      };
      MessageBoxComponent.prototype.start = function() {};
      MessageBoxComponent.prototype.on_btn_ok_clicked = function() {
        this.messageBoxCallback && this.messageBoxCallback.call(null, MessageBoxManager_1.MessageBox.OK);
        this.getComponent(View_1.default).hide();
      };
      MessageBoxComponent.prototype.on_btn_cancel_clicked = function() {
        this.messageBoxCallback && this.messageBoxCallback.call(null, MessageBoxManager_1.MessageBox.CANCEL);
        this.getComponent(View_1.default).hide();
      };
      __decorate([ property(cc.Label) ], MessageBoxComponent.prototype, "node_title", void 0);
      __decorate([ property(cc.Label) ], MessageBoxComponent.prototype, "node_content", void 0);
      __decorate([ property(cc.Node) ], MessageBoxComponent.prototype, "btn_ok", void 0);
      __decorate([ property(cc.Node) ], MessageBoxComponent.prototype, "btn_cancel", void 0);
      __decorate([ property(cc.Node) ], MessageBoxComponent.prototype, "group_ok_cancel", void 0);
      __decorate([ property(cc.Node) ], MessageBoxComponent.prototype, "group_ok", void 0);
      MessageBoxComponent = __decorate([ ccclass ], MessageBoxComponent);
      return MessageBoxComponent;
    }(cc.Component);
    exports.default = MessageBoxComponent;
    cc._RF.pop();
  }, {
    "./MessageBoxManager": "MessageBoxManager",
    "./View": "View"
  } ],
  MessageBoxManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bc48cBqkERHuJx+iKzOzwOV", "MessageBoxManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.MessageBox = void 0;
    var ViewManager_1 = require("./ViewManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MessageBoxManager = function(_super) {
      __extends(MessageBoxManager, _super);
      function MessageBoxManager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.prefab = null;
        return _this;
      }
      MessageBoxManager_1 = MessageBoxManager;
      MessageBoxManager.prototype.onLoad = function() {
        MessageBoxManager_1.instance = this;
      };
      var MessageBoxManager_1;
      MessageBoxManager.instance = null;
      __decorate([ property(cc.Prefab) ], MessageBoxManager.prototype, "prefab", void 0);
      MessageBoxManager = MessageBoxManager_1 = __decorate([ ccclass ], MessageBoxManager);
      return MessageBoxManager;
    }(cc.Component);
    exports.default = MessageBoxManager;
    var MessageBox = function() {
      function MessageBox() {}
      MessageBox.prototype.start = function() {};
      MessageBox.show = function(content, title, buttons, extra) {
        title = null == title || void 0 == title ? "\u63d0\u793a" : title;
        return new Promise(function(resolve, reject) {
          ViewManager_1.default.instance.showFromPrefab(MessageBoxManager.instance.prefab, "MessageBox", {
            title: title,
            content: content,
            buttons: buttons,
            extra: extra,
            callback: function(code) {
              resolve(code);
            }
          });
        });
      };
      MessageBox.OK = 1;
      MessageBox.CANCEL = 0;
      MessageBox.OK_CANCEL = 2;
      return MessageBox;
    }();
    exports.MessageBox = MessageBox;
    cc._RF.pop();
  }, {
    "./ViewManager": "ViewManager"
  } ],
  MessageDispatch: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "27032HakQBLd5OVLXAxtzCc", "MessageDispatch");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.MessageDispatch = void 0;
    var MessageDispatch = function() {
      function MessageDispatch() {
        this._handler = null;
        this._allMessageBases = {};
      }
      MessageDispatch.getInstance = function() {
        null == this._instace && (this._instace = new MessageDispatch());
        return this._instace;
      };
      MessageDispatch.prototype.register = function(key, msgPro) {
        if (null == key) return null;
        if (null == msgPro) return null;
        var allBases = this._allMessageBases[key];
        null == allBases && (this._allMessageBases[key] = []);
        this._allMessageBases[key].push(msgPro);
        return msgPro;
      };
      MessageDispatch.prototype.isNull = function(key) {
        var allBases = this._allMessageBases[key];
        if (null != allBases && allBases.length > 0) return true;
        return false;
      };
      MessageDispatch.prototype.registerUnique = function(key, msgPro) {
        if (null == key) return null;
        var allBases = this._allMessageBases[key];
        return null != allBases && allBases.length > 0 ? this._allMessageBases[key][0] : this.register(key, msgPro);
      };
      MessageDispatch.prototype.getBean = function(key) {
        if (null == key) return null;
        var allBeans = this._allMessageBases[key];
        if (null != allBeans && allBeans.length > 0) return allBeans[0];
        return null;
      };
      MessageDispatch.prototype.unRegister = function(key) {
        var allBases = this._allMessageBases[key];
        if (null == allBases) return;
        for (var i = 0; i < allBases.length; i++) allBases[i].onDestory();
        this._allMessageBases[key] = null;
        delete this._allMessageBases[key];
      };
      MessageDispatch.prototype.onMessage = function(msg) {
        for (var key in this._allMessageBases) {
          if (null == this._allMessageBases[key]) continue;
          var allBases = this._allMessageBases[key];
          for (var i = 0; i < allBases.length; i++) if (allBases[i].onMessage(msg)) return true;
        }
        return false;
      };
      MessageDispatch._instace = null;
      return MessageDispatch;
    }();
    exports.MessageDispatch = MessageDispatch;
    cc._RF.pop();
  }, {} ],
  MessageHandler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "af7b1a7LUJIBaVXazyQWhWN", "MessageHandler");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.MessageHandler = void 0;
    var Message_1 = require("./Message");
    var MessageType_1 = require("./MessageType");
    var MessageDispatch_1 = require("./MessageDispatch");
    var MessageHandler = function() {
      function MessageHandler(webSocket) {
        this._writeMessage = null;
        this._messages = null;
        this._messages = [];
        this._heartbeatTime = 0;
        this._writeMessage = [];
        this._webSocket = webSocket;
        this.setHeartbeatInterval(30);
        this._isEnableHeartbeat = false;
      }
      Object.defineProperty(MessageHandler.prototype, "enableHeartbeat", {
        get: function() {
          return this._isEnableHeartbeat;
        },
        set: function(flag) {
          this._isEnableHeartbeat = flag;
        },
        enumerable: false,
        configurable: true
      });
      MessageHandler.prototype.setHeartbeatInterval = function(time) {
        time <= 0 && (time = 1);
        this._heartbeatInterval = 1e3 * time;
      };
      MessageHandler.prototype.onUpdate = function(timeStamp) {
        if (this._writeMessage.length > 0) {
          var msg = this._writeMessage[0];
          var message = msg.pack();
          if (this._webSocket.readyState == WebSocket.OPEN) {
            console.log("size: " + message.byteLength);
            this._webSocket.send(message);
            this._writeMessage.shift();
          }
        }
        if (this._messages.length > 0) {
          var msg = this._messages.shift();
          this.dispatchMessage(msg);
        }
        this._isEnableHeartbeat && this.checkHeartbeat();
        return false;
      };
      MessageHandler.prototype.checkHeartbeat = function() {
        var diff = new Date().getTime() - this._heartbeatTime;
        if (diff >= this._heartbeatInterval) {
          this.sendMessage(new Message_1.Message(game.Command.Heartbeat));
          this._heartbeatTime = new Date().getTime();
        }
      };
      MessageHandler.prototype.dispatchMessage = function(msg) {
        var dispatch = MessageDispatch_1.MessageDispatch.getInstance();
        dispatch.onMessage(msg) || this._messages.push(msg);
      };
      MessageHandler.prototype.dispatchSocket = function(type) {
        var obj = {
          type: type
        };
        this.dispatchMessage(obj);
      };
      MessageHandler.prototype.dispatch = function(type, msg) {
        var _this = this;
        if (type == MessageType_1.SocketTag.KSOCKET_OPEN) {
          clearInterval(this.updateTimer);
          this.updateTimer = setInterval(function(dt) {
            return _this.onUpdate(dt);
          }, 1e3 / 60);
          this.dispatchSocket(type);
        } else if (type == MessageType_1.SocketTag.KSOCKET_CLOSE) {
          clearInterval(this.updateTimer);
          this.dispatchSocket(type);
        } else if (type == MessageType_1.SocketTag.KSOCKET_ERROR) {
          clearInterval(this.updateTimer);
          this.dispatchSocket(type);
        } else if (type == MessageType_1.SocketTag.KSOCKET_MESSAGE) {
          var obj = {
            type: type,
            msg: msg
          };
          this.dispatchMessage(obj);
        }
      };
      MessageHandler.prototype.clearWriteMessage = function() {
        this._writeMessage = [];
      };
      MessageHandler.prototype.clearMessage = function() {
        this._messages = [];
      };
      MessageHandler.prototype.sendMessage = function(msg) {
        this._writeMessage.push(msg);
      };
      return MessageHandler;
    }();
    exports.MessageHandler = MessageHandler;
    cc._RF.pop();
  }, {
    "./Message": "Message",
    "./MessageDispatch": "MessageDispatch",
    "./MessageType": "MessageType"
  } ],
  MessageType: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9f654W7umlMeasjS7fKQj29", "MessageType");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SocketTag = void 0;
    var SocketTag;
    (function(SocketTag) {
      SocketTag[SocketTag["KSOCKET_OPEN"] = 0] = "KSOCKET_OPEN";
      SocketTag[SocketTag["KSOCKET_CLOSE"] = 1] = "KSOCKET_CLOSE";
      SocketTag[SocketTag["KSOCKET_MESSAGE"] = 2] = "KSOCKET_MESSAGE";
      SocketTag[SocketTag["KSOCKET_ERROR"] = 3] = "KSOCKET_ERROR";
    })(SocketTag = exports.SocketTag || (exports.SocketTag = {}));
    cc._RF.pop();
  }, {} ],
  Message: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fb4e0zpbzJB4YN77Kns7y3M", "Message");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Message = void 0;
    var Message = function() {
      function Message(cmd) {
        this._cmd = cmd;
        this._data = null;
      }
      Message.prototype.addBuilder = function(data) {
        this._data = data.asUint8Array();
      };
      Message.prototype.addString = function(data) {
        this._data = data;
      };
      Message.prototype.pack = function() {
        var build = this.toString();
        var buf = build.asUint8Array();
        var newBuf = new Uint8Array(buf);
        console.log("send message: " + newBuf);
        return newBuf.buffer;
      };
      Message.prototype.toString = function() {
        var build = new flatbuffers.Builder();
        var data = null;
        null != this._data && (data = build.createString(this._data));
        game.Package.startPackage(build);
        game.Package.addCmd(build, this._cmd);
        null != this._data && game.Package.addData(build, data);
        var pack = game.Package.endPackage(build);
        build.finish(pack);
        return build;
      };
      return Message;
    }();
    exports.Message = Message;
    cc._RF.pop();
  }, {} ],
  Net: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9e139lB+RRCNpxXRSqgoURG", "Net");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Net = function() {
      function Net() {}
      Net.httpGet = function(url, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (4 === xhr.readyState && xhr.status >= 200 && xhr.status < 300) {
            var respone = xhr.responseText;
            callback(respone);
          }
        };
        xhr.open("GET", url, true);
        cc.sys.isNative && xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        xhr.timeout = 5e3;
        xhr.send();
      };
      Net.httpPost = function(url, params, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (4 === xhr.readyState && xhr.status >= 200 && xhr.status < 300) {
            var respone = xhr.responseText;
            callback(respone);
          } else callback(-1);
        };
        xhr.open("POST", url, true);
        cc.sys.isNative && xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        xhr.timeout = 5e3;
        xhr.send(params);
      };
      return Net;
    }();
    exports.default = Net;
    cc._RF.pop();
  }, {} ],
  PandoraPoint: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3f36aidibxFPY2TBTu8gRyi", "PandoraPoint");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PandoraPoint = function(_super) {
      __extends(PandoraPoint, _super);
      function PandoraPoint() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.numberVisible = true;
        return _this;
      }
      PandoraPoint.prototype.onLoad = function() {
        this.sprite = this.getComponent(cc.Sprite);
        this.label = this.getComponentInChildren(cc.Label);
        this.label.node.active = this.numberVisible;
      };
      PandoraPoint.prototype.start = function() {};
      PandoraPoint.prototype.setNumber = function(n) {
        this.numberVisible && (this.label.string = n + "");
        this.numberVisible && (this.label.node.active = 0 != n);
        this.sprite.enabled = 0 != n;
      };
      __decorate([ property ], PandoraPoint.prototype, "numberVisible", void 0);
      PandoraPoint = __decorate([ ccclass ], PandoraPoint);
      return PandoraPoint;
    }(cc.Component);
    exports.default = PandoraPoint;
    cc._RF.pop();
  }, {} ],
  PauseDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "83fb9osUoVEppfk8B6mkJYV", "PauseDialog");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PauseDialog = function(_super) {
      __extends(PauseDialog, _super);
      function PauseDialog() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      PauseDialog.prototype.onLoad = function() {};
      PauseDialog.prototype.start = function() {
        appGame.banner.playBanner(1);
      };
      PauseDialog.prototype.click_share = function() {};
      PauseDialog.prototype.click_home = function() {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u6e38\u620f\u754c\u9762",
          content: "\u70b9\u51fb\u8fd4\u56de\u4e3b\u754c\u9762"
        }, function() {});
        cc.director.loadScene("Main");
      };
      PauseDialog.prototype.click_restart = function() {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u8fd4\u56de\u754c\u9762",
          content: "\u91cd\u65b0\u5f00\u59cb"
        }, function() {});
        appGame.gameServerRoom.gameConfigData && appGame.gameServerRoom.gameConfigData.PauseDialogRestart ? appGame.videoBanner.playVideoAd(4, 0, function() {
          cc.director.loadScene("Game");
        }) : cc.director.loadScene("Game");
      };
      PauseDialog = __decorate([ ccclass ], PauseDialog);
      return PauseDialog;
    }(cc.Component);
    exports.default = PauseDialog;
    cc._RF.pop();
  }, {} ],
  PoolManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "69495bpMX5Av5pbrNxnGI8/", "PoolManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PoolManager = function() {
      function PoolManager(root, onCreateObject, target) {
        this.nodePool = {};
        this.nodes = {};
        this.managed = false;
        this.aliveObjects = [];
        this.onCreateObject = onCreateObject;
        this.target = target;
        this.root = root;
        root && root.on(cc.Node.EventType.CHILD_REMOVED, this.onNodeRemove, this);
      }
      PoolManager.prototype.onNodeRemove = function(node) {
        this.put(node);
      };
      PoolManager.prototype.objects = function() {
        return this.aliveObjects;
      };
      PoolManager.prototype.clearAlives = function() {
        for (var i = 0; i < this.aliveObjects.length; ) {
          var obj = this.aliveObjects[i];
          obj.removeFromParent();
        }
      };
      PoolManager.prototype.getPool = function(type) {
        "string" == typeof type && "number" == typeof type || (type = type._uuid || type.name);
        var pool = this.nodePool[type];
        if (null == pool) {
          pool = new cc.NodePool();
          this.nodePool[type] = pool;
        }
        return pool;
      };
      PoolManager.prototype.get = function(type) {
        var node = this.getPool(type).get();
        if (this.onCreateObject && null == node) {
          node = this.onCreateObject.call(this.target, type);
          this.root && node.setParent(this.root);
          node || console.warn(node, "onCreateObject must return an object");
          this.managed && this.aliveObjects.push(node);
          this.nodes[node.uuid] = type;
          return node;
        }
        this.root && node.setParent(this.root);
        this.managed && this.aliveObjects.push(node);
        return node;
      };
      PoolManager.prototype.tag = function(node, type) {
        this.nodes[node.uuid] = type;
      };
      PoolManager.prototype.put = function(node, type) {
        void 0 === type && (type = null);
        null == type && (type = this.nodes[node.uuid]);
        this.getPool(type).put(node);
        this.managed && this.aliveObjects.splice(this.aliveObjects.indexOf(node), 1);
      };
      PoolManager.prototype.clear = function(type) {
        this.managed && this.aliveObjects.splice(0, this.aliveObjects.length);
        if (type) this.getPool(type).clear(); else for (var t in this.nodePool) {
          var pool = this.nodePool[t];
          pool.clear();
        }
      };
      PoolManager.prototype.size = function(type) {
        return this.getPool(type).size();
      };
      return PoolManager;
    }();
    exports.default = PoolManager;
    cc._RF.pop();
  }, {} ],
  PsFxPlayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dc35b3gh69DGIz45mLQJxDM", "PsFxPlayer");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PsFx_1 = require("./PsFx");
    var Device_1 = require("./Device");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PsFxPlayer = function(_super) {
      __extends(PsFxPlayer, _super);
      function PsFxPlayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.prefab = null;
        _this._fx = null;
        _this.spriteFrame = null;
        _this.duration = -1;
        _this.randomRotaion = false;
        return _this;
      }
      PsFxPlayer.prototype.start = function() {};
      Object.defineProperty(PsFxPlayer.prototype, "fx", {
        get: function() {
          if (null == this._fx && this.prefab) {
            var node = cc.instantiate(this.prefab);
            if (null == node) return null;
            var fx = node.getComponent(PsFx_1.default);
            null == fx && (fx = this.addComponent(PsFx_1.default));
            node.setPosition(0, 0);
            node.setParent(this.node);
            this._fx = fx;
          }
          return this._fx;
        },
        enumerable: false,
        configurable: true
      });
      PsFxPlayer.prototype.isPlaying = function() {
        return this.fx.isPlaying;
      };
      PsFxPlayer.prototype.onEnable = function() {};
      PsFxPlayer.prototype.onDisable = function() {
        var fx = this._fx;
        fx && (fx.node.active = false);
      };
      PsFxPlayer.prototype.sleep = function(sec) {
        return new Promise(function(resolve, reject) {
          setTimeout(function(_) {
            resolve();
          }, sec);
        });
      };
      PsFxPlayer.prototype.play = function() {
        return __awaiter(this, void 0, void 0, function() {
          var fx;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              Device_1.default.playEffect(this.audioClip, false);
              fx = this.fx;
              if (!fx) return [ 3, 1 ];
              fx.node.active = true;
              this.randomRotaion && fx.reset();
              return [ 2, fx.play(this.audioClip, this.spriteFrame) ];

             case 1:
              if (!(this.duration > 0)) return [ 3, 3 ];
              return [ 4, this.sleep(1e3 * this.duration) ];

             case 2:
              _a.sent();
              _a.label = 3;

             case 3:
              return [ 2 ];
            }
          });
        });
      };
      __decorate([ property(cc.Prefab) ], PsFxPlayer.prototype, "prefab", void 0);
      __decorate([ property(cc.SpriteFrame) ], PsFxPlayer.prototype, "spriteFrame", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], PsFxPlayer.prototype, "audioClip", void 0);
      __decorate([ property ], PsFxPlayer.prototype, "duration", void 0);
      __decorate([ property ], PsFxPlayer.prototype, "randomRotaion", void 0);
      PsFxPlayer = __decorate([ ccclass ], PsFxPlayer);
      return PsFxPlayer;
    }(cc.Component);
    exports.default = PsFxPlayer;
    cc._RF.pop();
  }, {
    "./Device": "Device",
    "./PsFx": "PsFx"
  } ],
  PsFx: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5e90fpm8LtO1JagTdF3cTrm", "PsFx");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Device_1 = require("./Device");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PsFx = function(_super) {
      __extends(PsFx, _super);
      function PsFx() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.particles = [];
        _this.animations = [];
        _this.armature = null;
        _this.isPlaying = false;
        _this.sfx = null;
        _this.sprite = null;
        _this.playedTime = 0;
        _this.duration = -1;
        _this.fadeAfterFinish = -1;
        _this.repeatTime = 1;
        _this.removeAfterFinish = false;
        return _this;
      }
      PsFx.prototype.onLoad = function() {
        null == this.sprite && (this.sprite = this.getComponent(cc.Sprite));
        var anim = this.getComponent(cc.Animation);
        anim && this.animations.push(anim);
        var root_ps = this.getComponent(cc.ParticleSystem);
        root_ps && this.particles.push(root_ps);
        for (var i = 0; i < this.node.childrenCount; i++) {
          var child = this.node.children[i];
          var ps = child.getComponent(cc.ParticleSystem);
          if (ps) this.particles.push(ps); else {
            var anim_1 = child.getComponent(cc.Animation);
            anim_1 && this.animations.push(anim_1);
          }
        }
        if ("undefined" != typeof dragonBones) {
          this.armature = this.getComponent(dragonBones.ArmatureDisplay);
          this.armature || (this.armature = this.getComponentInChildren(dragonBones.ArmatureDisplay));
        }
      };
      PsFx.prototype.play = function(audio, spriteFrame) {
        var _this = this;
        void 0 === audio && (audio = null);
        void 0 === spriteFrame && (spriteFrame = null);
        this.isPlaying = true;
        var dur = 0;
        audio && (this.sfx = audio);
        spriteFrame && (this.sprite.spriteFrame = spriteFrame);
        this.node.active = true;
        for (var i = 0; i < this.particles.length; i++) {
          var element = this.particles[i];
          element.resetSystem();
          dur < element.duration && (dur = element.duration + element.life + element.lifeVar);
        }
        for (var i = 0; i < this.animations.length; i++) {
          var element = this.animations[i];
          var clips = element.getClips();
          if (clips && clips.length > 0) {
            var clip = clips[0];
            var duration = clip.duration / clip.speed;
            duration > dur && (dur = duration);
            element.play(clip.name);
          }
        }
        this.sfx && Device_1.default.playEffect(this.sfx, false);
        if (this.armature) {
          this.armature.playAnimation("", this.repeatTime);
          dur = this.duration;
          if (dur <= 0) return new Promise(function(resolve, reject) {
            _this.armature.addEventListener(dragonBones.EventObject.COMPLETE, function(_) {
              console.log("armature play complete");
              _this.removeAfterFinish ? _this.node.removeFromParent() : _this.fadeOnFinish(resolve);
            });
          });
        } else dur += .1;
        return new Promise(function(resolve, reject) {
          setTimeout(function(_) {
            if (!_this.isValid) return;
            _this.removeAfterFinish ? _this.node.removeFromParent() : _this.fadeOnFinish(resolve);
          }, 1e3 * dur);
        });
      };
      PsFx.prototype.fadeOnFinish = function(callback) {
        this.isPlaying = false;
        for (var i = 0; i < this.particles.length; i++) {
          var element = this.particles[i];
          element.stopSystem();
        }
        if (this.fadeAfterFinish > 0) {
          var seq = cc.sequence(cc.fadeOut(this.fadeAfterFinish), cc.callFunc(callback));
          this.node.runAction(seq);
        } else callback();
      };
      PsFx.prototype.reset = function() {
        this.playedTime = 0;
      };
      PsFx.prototype.start = function() {};
      __decorate([ property({
        type: cc.AudioClip
      }) ], PsFx.prototype, "sfx", void 0);
      __decorate([ property(cc.Sprite) ], PsFx.prototype, "sprite", void 0);
      __decorate([ property ], PsFx.prototype, "duration", void 0);
      __decorate([ property ], PsFx.prototype, "fadeAfterFinish", void 0);
      __decorate([ property ], PsFx.prototype, "repeatTime", void 0);
      __decorate([ property ], PsFx.prototype, "removeAfterFinish", void 0);
      PsFx = __decorate([ ccclass ], PsFx);
      return PsFx;
    }(cc.Component);
    exports.default = PsFx;
    cc._RF.pop();
  }, {
    "./Device": "Device"
  } ],
  PsSpawner: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "12e8aPL0IBPxYKO3t/sxN/O", "PsSpawner");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PsFx_1 = require("./PsFx");
    var PoolManager_1 = require("./PoolManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PsSpawner = function(_super) {
      __extends(PsSpawner, _super);
      function PsSpawner() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      PsSpawner.prototype.onLoad = function() {
        this.poolmgr = new PoolManager_1.default();
      };
      PsSpawner.prototype.start = function() {};
      PsSpawner.prototype.clear = function() {
        this.poolmgr && this.poolmgr.clear();
      };
      PsSpawner.prototype.getFx = function(prefabPath) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          var node = _this.poolmgr.get(prefabPath);
          if (null == node) {
            if (!(prefabPath instanceof cc.Prefab)) {
              cc.loader.loadRes(prefabPath, cc.Prefab, function(e, prefab) {
                node = cc.instantiate(prefab);
                node.setParent(_this.node);
                var psfx = node.getComponent(PsFx_1.default);
                psfx.name = prefabPath;
                resolve(psfx);
              });
              return;
            }
            node = cc.instantiate(prefabPath);
            _this.poolmgr.tag(node, prefabPath);
          }
          node.setParent(_this.node);
          node.active = false;
          var psfx = node.getComponent(PsFx_1.default);
          psfx.reset();
          resolve(psfx);
        });
      };
      PsSpawner.prototype.onFxFinshPlay = function(fx) {
        this.poolmgr.put(fx.node);
      };
      PsSpawner.prototype.play = function(prefabPath, pos, rotation, audio, spriteframe) {
        void 0 === pos && (pos = cc.Vec2.ZERO);
        void 0 === rotation && (rotation = 0);
        return __awaiter(this, void 0, void 0, function() {
          var fx;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.getFx(prefabPath) ];

             case 1:
              fx = _a.sent();
              fx.node.position = pos;
              fx.node.rotation = rotation;
              return [ 4, fx.play(audio, spriteframe) ];

             case 2:
              _a.sent();
              this.onFxFinshPlay(fx);
              return [ 2 ];
            }
          });
        });
      };
      PsSpawner.prototype.play2 = function(prefabPath, pos, rotation, scale) {
        void 0 === pos && (pos = cc.Vec2.ZERO);
        void 0 === rotation && (rotation = 0);
        void 0 === scale && (scale = 0);
        return __awaiter(this, void 0, void 0, function() {
          var fx;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.getFx(prefabPath) ];

             case 1:
              fx = _a.sent();
              fx.node.position = pos;
              fx.node.scale = scale;
              fx.node.rotation = rotation;
              return [ 4, fx.play() ];

             case 2:
              _a.sent();
              this.onFxFinshPlay(fx);
              return [ 2 ];
            }
          });
        });
      };
      PsSpawner.prototype.play3 = function(prefabPath, pos) {
        return __awaiter(this, void 0, void 0, function() {
          var fx;
          var _this = this;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.getFx(prefabPath) ];

             case 1:
              fx = _a.sent();
              fx.node.position = pos;
              fx.play().then(function(_) {
                return _this.onFxFinshPlay(fx);
              });
              return [ 2, fx.node ];
            }
          });
        });
      };
      PsSpawner = __decorate([ ccclass ], PsSpawner);
      return PsSpawner;
    }(cc.Component);
    exports.default = PsSpawner;
    cc._RF.pop();
  }, {
    "./PoolManager": "PoolManager",
    "./PsFx": "PsFx"
  } ],
  Res: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "81fb28+15NDNaH9M81MKxwU", "Res");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.R = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    exports.R = null;
    var Res = function(_super) {
      __extends(Res, _super);
      function Res() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.levelJson = null;
        _this.TilePrefab = null;
        _this.TileShadow = null;
        _this.Line46 = null;
        _this.Line37 = null;
        _this.Line19 = null;
        _this.audio_bgm = null;
        _this.audio_unlock = null;
        _this.audio_invalid = null;
        _this.audio_draw = null;
        _this.audio_down = null;
        _this.audio_win = null;
        _this.audio_link = null;
        _this.audio_get_diamond = null;
        _this.tileTextures = [];
        _this.animalPrefabs = [];
        _this.skinConfig = null;
        _this.luckyConfig = null;
        _this.colors = [];
        return _this;
      }
      Res.prototype.onLoad = function() {
        exports.R = this;
      };
      Res.prototype.start = function() {};
      __decorate([ property(cc.JsonAsset) ], Res.prototype, "levelJson", void 0);
      __decorate([ property(cc.Prefab) ], Res.prototype, "TilePrefab", void 0);
      __decorate([ property(cc.Prefab) ], Res.prototype, "TileShadow", void 0);
      __decorate([ property(cc.Prefab) ], Res.prototype, "Line46", void 0);
      __decorate([ property(cc.Prefab) ], Res.prototype, "Line37", void 0);
      __decorate([ property(cc.Prefab) ], Res.prototype, "Line19", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], Res.prototype, "audio_bgm", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], Res.prototype, "audio_unlock", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], Res.prototype, "audio_invalid", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], Res.prototype, "audio_draw", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], Res.prototype, "audio_down", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], Res.prototype, "audio_win", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], Res.prototype, "audio_link", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], Res.prototype, "audio_get_diamond", void 0);
      __decorate([ property([ cc.SpriteFrame ]) ], Res.prototype, "tileTextures", void 0);
      __decorate([ property([ cc.Prefab ]) ], Res.prototype, "animalPrefabs", void 0);
      __decorate([ property(cc.JsonAsset) ], Res.prototype, "skinConfig", void 0);
      __decorate([ property(cc.JsonAsset) ], Res.prototype, "luckyConfig", void 0);
      __decorate([ property([ cc.Color ]) ], Res.prototype, "colors", void 0);
      Res = __decorate([ ccclass ], Res);
      return Res;
    }(cc.Component);
    exports.default = Res;
    cc._RF.pop();
  }, {} ],
  ShopDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1b7cbT64WtHxpoRfvlVr4EN", "ShopDialog");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ShopItemTemplate_1 = require("./ShopItemTemplate");
    var SpriteFrameCache_1 = require("../../../framework/plugin_boosts/misc/SpriteFrameCache");
    var Res_1 = require("../hex-lines-game/Res");
    var Info_1 = require("../Info");
    var ToastManager_1 = require("../../../framework/plugin_boosts/ui/ToastManager");
    var Device_1 = require("../../../framework/plugin_boosts/gamesys/Device");
    var Main_1 = require("../Main");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShopDialog = function(_super) {
      __extends(ShopDialog, _super);
      function ShopDialog() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.scrollview = null;
        _this.freeDiamondLabel = null;
        _this.freeDiamondBtn = null;
        return _this;
      }
      ShopDialog.prototype.onLoad = function() {};
      ShopDialog.prototype.start = function() {};
      ShopDialog.prototype.onShown = function() {
        var _this = this;
        this.scrollview.showlist(function(node, data, i) {
          var item = node.getComponent(ShopItemTemplate_1.default);
          item.data = data;
          item.diamondLabel.string = data.cost;
          var isLocked = !Info_1.UserInfo.isUnlock(data.id);
          item.btnBuyNode.active = isLocked;
          item.maskNode.active = isLocked;
          item.borderNode.color = cc.Color.WHITE;
          item.titleLabel.string = data.text;
          item.selectedFlag.active = Info_1.UserInfo.selectedSkin == data.id;
          item.btnSignal.add(_this.click_unlock, _this);
          SpriteFrameCache_1.default.instance.getSpriteFrame("Game/Textures/ThumbBgs/" + data.mini_img + ".jpg").then(function(sf) {
            return item.bgmini.spriteFrame = sf;
          });
        }, Res_1.R.skinConfig.json);
      };
      ShopDialog.prototype.refreshBtnStatus = function() {};
      ShopDialog.prototype.click_close = function() {};
      ShopDialog.prototype.share_succ = function() {
        Info_1.UserInfo.addDiamond(50);
        Info_1.UserInfo.shopFreeDiamondTime = new Date().getTime();
        Info_1.UserInfo.save();
        this.refreshBtnStatus();
      };
      ShopDialog.prototype.click_free = function() {
        var choice = Info_1.UserInfo.getChoice(Info_1.ChoiceType.Shop);
        1 == choice || 0 == choice && this.share_succ();
      };
      ShopDialog.prototype.selectBg = function(data) {
        Info_1.UserInfo.selectedSkin = data.id;
        Info_1.UserInfo.save();
        this.onShown();
      };
      ShopDialog.prototype.click_unlock = function(data) {
        if (Info_1.UserInfo.isUnlock(data.id)) {
          this.selectBg(data);
          ToastManager_1.Toast.make("\u5df2\u9009\u62e9 " + data.text);
          return;
        }
        if (Info_1.UserInfo.diamond >= data.cost) {
          Info_1.UserInfo.diamond -= data.cost;
          Info_1.UserInfo.unlock(data.id);
          this.selectBg(data);
          ToastManager_1.Toast.make(cc.js.formatStr("%s\u5df2\u89e3\u9501", data.text));
          Device_1.default.playEffect(Res_1.R.audio_unlock);
          Main_1.default.instance && Main_1.default.instance.refreshRedpoints();
        } else {
          ToastManager_1.Toast.make("\u94bb\u77f3\u4e0d\u8db3");
          Device_1.default.playEffect(Res_1.R.audio_invalid);
        }
      };
      __decorate([ property(cc.ScrollView) ], ShopDialog.prototype, "scrollview", void 0);
      __decorate([ property(cc.Label) ], ShopDialog.prototype, "freeDiamondLabel", void 0);
      __decorate([ property(cc.Button) ], ShopDialog.prototype, "freeDiamondBtn", void 0);
      ShopDialog = __decorate([ ccclass ], ShopDialog);
      return ShopDialog;
    }(cc.Component);
    exports.default = ShopDialog;
    cc._RF.pop();
  }, {
    "../../../framework/plugin_boosts/gamesys/Device": "Device",
    "../../../framework/plugin_boosts/misc/SpriteFrameCache": "SpriteFrameCache",
    "../../../framework/plugin_boosts/ui/ToastManager": "ToastManager",
    "../Info": "Info",
    "../Main": "Main",
    "../hex-lines-game/Res": "Res",
    "./ShopItemTemplate": "ShopItemTemplate"
  } ],
  ShopItemTemplate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0b667/xvIZJapTB+ZTBqkHL", "ShopItemTemplate");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Signal_1 = require("../../../framework/plugin_boosts/misc/Signal");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShopItemTemplate = function(_super) {
      __extends(ShopItemTemplate, _super);
      function ShopItemTemplate() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.titleLabel = null;
        _this.selectedFlag = null;
        _this.bgmini = null;
        _this.btnBuyNode = null;
        _this.maskNode = null;
        _this.borderNode = null;
        _this.diamondLabel = null;
        _this.btnSignal = new Signal_1.default();
        _this.data = null;
        return _this;
      }
      ShopItemTemplate.prototype.onLoad = function() {};
      ShopItemTemplate.prototype.start = function() {};
      ShopItemTemplate.prototype.click_unlock = function() {
        this.btnSignal.fire(this.data);
      };
      __decorate([ property(cc.Label) ], ShopItemTemplate.prototype, "titleLabel", void 0);
      __decorate([ property(cc.Node) ], ShopItemTemplate.prototype, "selectedFlag", void 0);
      __decorate([ property(cc.Sprite) ], ShopItemTemplate.prototype, "bgmini", void 0);
      __decorate([ property(cc.Node) ], ShopItemTemplate.prototype, "btnBuyNode", void 0);
      __decorate([ property(cc.Node) ], ShopItemTemplate.prototype, "maskNode", void 0);
      __decorate([ property(cc.Node) ], ShopItemTemplate.prototype, "borderNode", void 0);
      __decorate([ property(cc.Label) ], ShopItemTemplate.prototype, "diamondLabel", void 0);
      ShopItemTemplate = __decorate([ ccclass ], ShopItemTemplate);
      return ShopItemTemplate;
    }(cc.Component);
    exports.default = ShopItemTemplate;
    cc._RF.pop();
  }, {
    "../../../framework/plugin_boosts/misc/Signal": "Signal"
  } ],
  Signal: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bf602DYuhZP7Z8VfN9eJFzO", "Signal");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Signal = function() {
      function Signal(c, t) {
        this.add(c, t);
      }
      Signal.prototype.add = function(callback, target) {
        this.callback = callback;
        this.target = target;
      };
      Signal.prototype.fire = function() {
        var _a;
        var ps = [];
        for (var _i = 0; _i < arguments.length; _i++) ps[_i] = arguments[_i];
        this.callback && (_a = this.callback).call.apply(_a, __spreadArrays([ this.target ], ps));
      };
      Signal.prototype.on = function(callback, target) {
        this.callback = callback;
        this.target = target;
      };
      Signal.prototype.clear = function() {
        this.callback = null;
      };
      return Signal;
    }();
    exports.default = Signal;
    cc._RF.pop();
  }, {} ],
  Socket: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8cfb4mvQk5BQqbWZvml7K36", "Socket");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Socket = void 0;
    var MessageHandler_1 = require("./MessageHandler");
    var MessageType_1 = require("./MessageType");
    var Socket = function() {
      function Socket(conf) {
        this._config = null;
        this._reconnetTimes = 200;
        this._defaultTimeout = 1e4;
        this.retryTimer = 0;
        this.initSocket(conf);
      }
      Socket.prototype.initSocket = function(conf) {
        this._config = conf;
        this._config.timeout || (this._config.timeout = this._defaultTimeout);
        this._config.retime && (this._reconnetTimes = this._config.retime);
        this.connect();
      };
      Socket.prototype.connect = function() {
        var _this = this;
        var addr = this._config.host;
        this._config.port && (addr = this._config.host + ":" + this._config.port);
        console.log("start connect server>>>>", addr);
        this._webSocket = new WebSocket(addr);
        this._messageHandler = new MessageHandler_1.MessageHandler(this._webSocket);
        this._webSocket.onopen = function(event) {
          return _this.onSocketOpen();
        };
        this._webSocket.onmessage = function(event) {
          return _this.onReceiveMessage(event);
        };
        this._webSocket.onclose = function(event) {
          return _this.onSocketClose();
        };
        this._webSocket.onerror = function(event) {
          return _this.onSocketError();
        };
      };
      Socket.prototype.close = function() {
        this._webSocket && this._webSocket.close();
      };
      Socket.prototype.flush = function() {};
      Socket.prototype.enableHeartbeat = function(enable) {
        this._messageHandler.enableHeartbeat = enable;
      };
      Socket.prototype.onSocketOpen = function() {
        console.log("connect " + this._config.host + " success");
        this._messageHandler.dispatch(MessageType_1.SocketTag.KSOCKET_OPEN, "");
      };
      Socket.prototype.onReceiveMessage = function(event) {
        var _this = this;
        void 0 === event && (event = null);
        console.log("websocket receive message:" + event.data);
        "undefined" == typeof wx ? this.toArrayBuffer(event.data).then(function(arrbuf) {
          _this._messageHandler.dispatch(MessageType_1.SocketTag.KSOCKET_MESSAGE, arrbuf);
        }) : this._messageHandler.dispatch(MessageType_1.SocketTag.KSOCKET_MESSAGE, event.data);
      };
      Socket.prototype.toArrayBuffer = function(blob) {
        var arrayBuffer;
        var reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        return new Promise(function(resolve, reject) {
          reader.onload = function(e) {
            arrayBuffer = reader.result;
            resolve(arrayBuffer);
          };
        });
      };
      Socket.prototype.sendMessage = function(msg) {
        if (this._webSocket.readyState == WebSocket.OPEN) {
          this._messageHandler.sendMessage(msg);
          return true;
        }
        return false;
      };
      Socket.prototype.sendCustomMessage = function(msg) {
        this._messageHandler.dispatchMessage(msg);
      };
      Socket.prototype.reconnect = function() {
        var _this = this;
        if (Socket.count >= 2 || this._webSocket.readyState == WebSocket.OPEN) clearTimeout(this.retryTimer); else {
          this._webSocket.readyState == WebSocket.CLOSED && this.connect();
          this.retryTimer = setTimeout(function() {
            _this.reconnect();
          }, this._reconnetTimes);
        }
      };
      Socket.prototype.onSocketClose = function(e) {
        void 0 === e && (e = null);
        this._messageHandler.dispatch(MessageType_1.SocketTag.KSOCKET_CLOSE, "");
        console.log("websocket connect close.", this._webSocket.readyState);
        this.close();
        this.reconnect();
      };
      Socket.prototype.onSocketError = function(e) {
        void 0 === e && (e = null);
        this._messageHandler.dispatch(MessageType_1.SocketTag.KSOCKET_ERROR, "");
        console.log("websocket io error.");
      };
      Socket.count = 0;
      return Socket;
    }();
    exports.Socket = Socket;
    cc._RF.pop();
  }, {
    "./MessageHandler": "MessageHandler",
    "./MessageType": "MessageType"
  } ],
  SpriteFrameCache: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8756by7qCVIPpJ06/9qmobv", "SpriteFrameCache");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SpriteFrameCache = function() {
      function SpriteFrameCache() {
        this.frames = {};
      }
      Object.defineProperty(SpriteFrameCache, "instance", {
        get: function() {
          null == this._instance && (this._instance = new SpriteFrameCache());
          return this._instance;
        },
        enumerable: false,
        configurable: true
      });
      SpriteFrameCache.prototype.getSpriteFrame = function(url) {
        return __awaiter(this, void 0, Promise, function() {
          var frame;
          var _this = this;
          return __generator(this, function(_a) {
            frame = this.frames[url];
            if (null == frame) return [ 2, new Promise(function(resolve, reject) {
              if (!url || "" == url) {
                reject("empty-url");
                return;
              }
              -1 == url.indexOf("http") ? cc.loader.loadRes(url, cc.SpriteFrame, function(error, frame) {
                if (error) {
                  reject();
                  return;
                }
                if (frame) {
                  _this.addSpriteFrame(url, frame);
                  resolve(frame);
                } else reject();
              }) : cc.loader.load({
                url: url,
                type: "png"
              }, function(error, texture) {
                if (error) {
                  reject();
                  return;
                }
                if (texture) {
                  frame = new cc.SpriteFrame(texture);
                  _this.addSpriteFrame(url, frame);
                  resolve(frame);
                } else reject();
              });
            }) ];
            return [ 2, new Promise(function(resolve, reject) {
              return resolve(frame);
            }) ];
          });
        });
      };
      SpriteFrameCache.prototype.addSpriteFrame = function(url, frame) {
        this.frames[url] = frame;
        return frame;
      };
      SpriteFrameCache.prototype.clear = function() {
        for (var k in this.frames) {
          var frame = this.frames[k];
          cc.loader.release(frame);
          delete this.frames[k];
        }
      };
      SpriteFrameCache.prototype.remove = function(k) {
        var frame = this.frames[k];
        cc.loader.release(frame);
        delete this.frames[k];
      };
      return SpriteFrameCache;
    }();
    exports.default = SpriteFrameCache;
    cc._RF.pop();
  }, {} ],
  ToastComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c4ad6Rf0DpFeay8D3aly6IU", "ToastComponent");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIFunctions_1 = require("./UIFunctions");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ToastComponent = function(_super) {
      __extends(ToastComponent, _super);
      function ToastComponent() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        return _this;
      }
      ToastComponent.prototype.onLoad = function() {
        this.animations = UIFunctions_1.default.getChildrenAnimations(this.node);
      };
      ToastComponent.prototype.start = function() {};
      ToastComponent.prototype.hide = function(callback) {
        this.node.active = true;
        if (!UIFunctions_1.default.doHideAnimations(this.animations, callback)) {
          this.node.active = false;
          callback && callback(this);
        }
      };
      ToastComponent.prototype.show = function(text) {
        this.label.string = text;
        UIFunctions_1.default.doShowAnimations(this.animations);
      };
      __decorate([ property(cc.Label) ], ToastComponent.prototype, "label", void 0);
      ToastComponent = __decorate([ ccclass ], ToastComponent);
      return ToastComponent;
    }(cc.Component);
    exports.default = ToastComponent;
    cc._RF.pop();
  }, {
    "./UIFunctions": "UIFunctions"
  } ],
  ToastManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "129ed5o6uNHDKhz6KoueBpN", "ToastManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Toast = void 0;
    var ToastComponent_1 = require("./ToastComponent");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    exports.Toast = null;
    var ToastManager = function(_super) {
      __extends(ToastManager, _super);
      function ToastManager() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ToastManager.prototype.start = function() {
        this.toastPool = new cc.NodePool();
        exports.Toast = this;
      };
      ToastManager.prototype.onDestroy = function() {
        this.toastPool.clear();
      };
      ToastManager.prototype.make = function(text, dur) {
        void 0 === dur && (dur = 1.3);
        var node = this.toastPool.get();
        var toastComp = null;
        if (null == node) {
          node = cc.instantiate(this.prefab);
          toastComp = node.getComponent(ToastComponent_1.default);
          null == toastComp && console.warn("Toast.make : Toast Prefab must contains ToastComponent");
        } else toastComp = node.getComponent(ToastComponent_1.default);
        null == node.parent && this.node.addChild(node, 99999);
        this.show(toastComp, text, dur);
        return toastComp;
      };
      ToastManager.prototype.show = function(toastComp, text, dur) {
        var _this = this;
        toastComp.show(text);
        this.scheduleOnce(function(_) {
          toastComp.hide(function(_) {
            _this.toastPool.put(toastComp.node);
            console.log("Toast.hide toastpool size:", _this.toastPool.size());
          });
        }, dur);
      };
      __decorate([ property(cc.Prefab) ], ToastManager.prototype, "prefab", void 0);
      ToastManager = __decorate([ ccclass ], ToastManager);
      return ToastManager;
    }(cc.Component);
    exports.default = ToastManager;
    cc._RF.pop();
  }, {
    "./ToastComponent": "ToastComponent"
  } ],
  UIComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0dc9dQt58ZCx4tQ3mcNvEZr", "UIComponent");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var UIComponent = function(_super) {
      __extends(UIComponent, _super);
      function UIComponent() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      UIComponent.prototype.hide = function() {
        this.node.active = false;
      };
      UIComponent.prototype.show = function() {
        this.node.active = true;
      };
      UIComponent = __decorate([ ccclass ], UIComponent);
      return UIComponent;
    }(cc.Component);
    exports.default = UIComponent;
    cc._RF.pop();
  }, {} ],
  UIFunctions: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "10205trRZVOELcrvc3TW2mW", "UIFunctions");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIFunctions = function() {
      function UIFunctions() {}
      UIFunctions.getChildrenAnimations = function(node) {
        var animations = [];
        var anim = node.getComponent(cc.Animation);
        anim && animations.push(anim);
        for (var i = 0; i < node.childrenCount; i++) {
          var child = node.children[i];
          var anim = child.getComponent(cc.Animation);
          anim && animations.push(anim);
        }
        return animations;
      };
      UIFunctions.stopAnimations = function(animations) {
        animations.forEach(function(anim) {
          anim.stop();
        });
      };
      UIFunctions.doShowAnimations = function(animations, finishCallback, target) {
        var maxDuration = 0;
        var maxDurationAnimation;
        animations.forEach(function(anim) {
          var clips = anim.getClips();
          if (clips.length > 0) {
            var clip = clips[0];
            var animState = anim.play(clip.name);
            animState.wrapMode = cc.WrapMode.Normal;
            if (clip.duration > maxDuration) {
              maxDuration = clip.duration;
              maxDurationAnimation = anim;
            }
          }
        });
        if (finishCallback) {
          var func_1 = function() {
            maxDurationAnimation && maxDurationAnimation.off("finished", func_1);
            finishCallback.call(target);
          };
          maxDurationAnimation ? maxDurationAnimation.on("finished", func_1) : finishCallback.call(target);
        }
      };
      UIFunctions.isAnimationRunning = function(animations) {
        return false;
      };
      UIFunctions.doHideAnimations = function(animations, finishCallback, target) {
        var hasHideAnimation = false;
        var maxDuration = 0;
        var maxDurationAnimation;
        animations.forEach(function(anim) {
          var clips = anim.getClips();
          if (2 == clips.length) {
            var clip = clips[clips.length - 1];
            hasHideAnimation = true;
            anim.play(clip.name);
            if (clip.duration > maxDuration) {
              maxDuration = clip.duration;
              maxDurationAnimation = anim;
            }
          } else if (1 == clips.length) {
            var clip = clips[0];
            hasHideAnimation = true;
            var animState = anim.play(clip.name);
            animState.wrapMode = cc.WrapMode.Reverse;
            if (clip.duration > maxDuration) {
              maxDuration = clip.duration;
              maxDurationAnimation = anim;
            }
          }
        });
        if (maxDurationAnimation && finishCallback) {
          var func_2 = function() {
            maxDurationAnimation.off("finished", func_2);
            finishCallback.call(target);
          };
          maxDurationAnimation.on("finished", func_2);
        }
        return hasHideAnimation;
      };
      UIFunctions.getToggleIndex = function(toggle) {
        var container = toggle.node.getParent();
        for (var i = 0; i < container.childrenCount; i++) {
          var child = container.children[i];
          if (toggle.node == child) return i;
        }
        return -1;
      };
      UIFunctions.selectToggleIndex = function(toggleContainer, index) {
        if (null == toggleContainer) {
          console.warn("[UIFunction.selectToggleIndex] : invalid toggleContainer :");
          return;
        }
        var toggleNode = toggleContainer.children[index];
        if (toggleNode) {
          var toggle = toggleNode.getComponent(cc.Toggle);
          if (toggle) {
            console.log("[UIFunction.selectToggleIndex] :" + index);
            toggle.check();
          }
        } else console.warn("[UIFunction.selectToggleIndex] :cannot find toggle with index:" + index);
      };
      UIFunctions.setTouchEnabled = function(node, b) {};
      UIFunctions.setButtonEnabled = function(btn, b) {
        btn.node.opacity = b ? 255 : 125;
        btn.interactable = b;
      };
      return UIFunctions;
    }();
    exports.default = UIFunctions;
    cc._RF.pop();
  }, {} ],
  ViewManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c0f79TopoBICobmtQjrjutG", "ViewManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var View_1 = require("./View");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TAG = "[ViewManager]";
    var ViewManager = function(_super) {
      __extends(ViewManager, _super);
      function ViewManager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._views = {};
        _this.modal = null;
        _this.modalOpacity = 160;
        return _this;
      }
      ViewManager_1 = ViewManager;
      ViewManager.prototype.onLoad = function() {
        ViewManager_1.instance = this;
        this.modal.active = false;
        this.modal.zIndex = 999;
      };
      ViewManager.prototype.onEnable = function() {};
      ViewManager.prototype.onDestroy = function() {
        for (var key in this._views) delete this._views[key];
      };
      ViewManager.prototype.start = function() {};
      ViewManager.prototype.getVisibleDialog = function() {
        for (var name in this._views) {
          var view = this._views[name];
          if (view.isDialog && this.isVisible(name)) return view;
        }
        return null;
      };
      ViewManager.prototype.hasVisibleDialog = function() {
        for (var name in this._views) {
          var view = this._views[name];
          if (view.isDialog && this.isVisible(name)) return true;
        }
        return false;
      };
      ViewManager.prototype.isVisible = function(viewname) {
        var view = null;
        view = "string" == typeof viewname ? this._views[viewname] : viewname;
        if (view) return view.node.active;
        return false;
      };
      ViewManager.prototype.attachViewComp = function(existingView) {
        var viewComp = null;
        if (null == viewComp || void 0 == viewComp) {
          viewComp = existingView.getComponent(View_1.default);
          if (null == viewComp) {
            viewComp = existingView.addComponent(View_1.default);
            viewComp.init(existingView.name);
          }
          this._views[existingView.name] = viewComp;
        }
        return viewComp;
      };
      ViewManager.prototype.showView = function(view) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) params[_i - 1] = arguments[_i];
        this.modal.active = view.isDialog;
        (this.hasVisibleDialog() || view.isDialog) && (this.modal.active = true);
        view.isDialog && (this.modal.opacity = view.opacity);
        return view.show.apply(view, params);
      };
      ViewManager.prototype.showFromPrefab = function(prefab, prefabPath) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) params[_i - 2] = arguments[_i];
        var view = this._views[prefabPath];
        if (null == view) {
          var node = cc.instantiate(prefab);
          view = node.getComponent(View_1.default);
          if (null == view) {
            view = node.addComponent(View_1.default);
            view.isDialog = true;
          }
          var widget = view.getComponent(cc.Widget);
          widget && (widget.target = cc.find("Canvas"));
          view.init(prefabPath);
          this._views[prefabPath] = view;
          view.isDialog, this.node.addChild(node, 1e3);
        }
        this.node.color.setA(255);
        console.log(TAG, "show view:" + prefabPath);
        return this.showView.apply(this, __spreadArrays([ view ], params));
      };
      ViewManager.prototype.showFromPrefabPath = function(prefabPath) {
        var _this = this;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) params[_i - 1] = arguments[_i];
        var view = this._views[prefabPath];
        if (null != view && void 0 != view) {
          this.modal.active = view.isDialog;
          if (this.hasVisibleDialog() || view.isDialog) {
            this.modal.active = true;
            this.modal.opacity = view.opacity;
          }
          console.log(TAG, "show view:" + prefabPath, params);
          return view.show.apply(view, params);
        }
        console.log("start load prefab:" + prefabPath);
        var beforeTime_1 = new Date().getTime();
        cc.loader.loadRes(prefabPath, cc.Prefab, function(e, prefab) {
          console.log(TAG, "prefab loaded : " + prefabPath + " " + (new Date().getTime() - beforeTime_1) + "ms");
          _this.showFromPrefab.apply(_this, __spreadArrays([ prefab, prefabPath ], params));
        });
      };
      ViewManager.prototype.preload = function(prefabPath) {
        var _this = this;
        var view = this._views[prefabPath];
        null != view && void 0 != view || cc.loader.loadRes(prefabPath, cc.Prefab, function(e, prefab) {
          console.log(TAG, "preload view" + prefabPath);
          var node = cc.instantiate(prefab);
          view = node.getComponent(View_1.default);
          var widget = view.getComponent(cc.Widget);
          widget && (widget.target = cc.find("Canvas"));
          view.init(prefabPath);
          _this._views[prefabPath] = view;
          view.isDialog, _this.node.addChild(node, 1e3);
          view.hide();
        });
      };
      ViewManager.prototype.disableTouch = function(viewNode) {
        var view = viewNode.getComponent(View_1.default);
        view && (view.touchEnabled = false);
      };
      ViewManager.prototype.enableTouch = function(viewNode) {
        var view = viewNode.getComponent(View_1.default);
        view && (view.touchEnabled = true);
      };
      ViewManager.prototype.show = function(view) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) params[_i - 1] = arguments[_i];
        if ("string" == typeof view) return this.showFromPrefabPath.apply(this, __spreadArrays([ view ], params));
        if (null == view || void 0 == view) return;
        view.node && (view = view.node);
        var v = this.attachViewComp(view);
        return this.showView.apply(this, __spreadArrays([ v ], params));
      };
      ViewManager.prototype.hide = function(viewname, playHideAnim) {
        void 0 === playHideAnim && (playHideAnim = true);
        if ("string" != typeof viewname) {
          if (null == viewname || void 0 == viewname) return;
          this.attachViewComp(viewname);
          viewname = viewname.name;
        }
        var view = this._views[viewname];
        if (null != view && void 0 != view) {
          view.node.active = false;
          view.isDialog && (this.modal.active = false);
          this.hasVisibleDialog() && (this.modal.active = true);
          playHideAnim && view.doHideAnimation();
          view.onHidden();
        }
      };
      ViewManager.prototype.checkViewStacks = function() {
        var dialog = this.getVisibleDialog();
        if (dialog) {
          this.modal.active = true;
          this.modal.opacity = dialog.opacity;
        }
      };
      ViewManager.prototype.hideAll = function() {
        for (var viewname in this._views) this.hide(viewname);
      };
      var ViewManager_1;
      __decorate([ property(cc.Node) ], ViewManager.prototype, "modal", void 0);
      __decorate([ property ], ViewManager.prototype, "modalOpacity", void 0);
      ViewManager = ViewManager_1 = __decorate([ ccclass ], ViewManager);
      return ViewManager;
    }(cc.Component);
    exports.default = ViewManager;
    cc._RF.pop();
  }, {
    "./View": "View"
  } ],
  View: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e1217OaHDFCEbPP4vjLJXLh", "View");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIComponent_1 = require("./UIComponent");
    var ViewManager_1 = require("./ViewManager");
    var UIFunctions_1 = require("./UIFunctions");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var View = function(_super) {
      __extends(View, _super);
      function View() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.isDialog = false;
        _this.hasWidget = false;
        _this.opacity = 160;
        _this.childrenAnimation = false;
        _this.touchBlocker = null;
        _this.touchBlockerComp = null;
        _this.animations = [];
        _this._isHiding = false;
        return _this;
      }
      View.prototype.emit = function(event, msg) {
        event.emit(msg);
      };
      View.prototype.call = function(event, exp) {};
      View.prototype.setDelegate = function(target) {
        this.target = target;
      };
      View.prototype.onLoad = function() {
        this.touchBlocker = new cc.Node();
        this.touchBlocker.name = "TouchBlocker";
        this.touchBlocker.width = 2e3;
        this.touchBlocker.height = 2e3;
        this.touchBlockerComp = this.touchBlocker.addComponent(cc.BlockInputEvents);
        this.node.addChild(this.touchBlocker, 1e3);
        if (this.childrenAnimation) this.animations = UIFunctions_1.default.getChildrenAnimations(this.node); else {
          var anim = this.node.getComponent(cc.Animation);
          anim && this.animations.push(anim);
        }
        var components = this.getComponents(cc.Component);
        for (var i = 0; i < components.length; i++) {
          var comp = components[i];
          if (comp != this && (comp.onShown || comp.onHidden)) {
            this.target = comp;
            break;
          }
        }
      };
      View.prototype.start = function() {
        this.touchEnabled = true;
      };
      View.prototype.init = function(viewname) {
        this.name = viewname;
      };
      View.prototype.hideAnimationCallback = function() {
        this.node.active = this.visible;
        ViewManager_1.default.instance.checkViewStacks();
      };
      View.prototype.doHideAnimation = function() {
        this.node.active = true;
        this._isHiding = true;
        if (!UIFunctions_1.default.doHideAnimations(this.animations, this.hideAnimationCallback, this)) {
          this.node.active = false;
          this._isHiding = false;
        }
        console.log("[View] hide:", this.name);
        this._visibleDirty = false;
      };
      View.prototype.isInHideAnimation = function() {
        return this._isHiding;
      };
      View.prototype.onHidden = function() {
        this._visibleDirty = false;
        this.target && this.target.onHidden && this.target.onHidden();
      };
      View.prototype.hide = function(index) {
        void 0 === index && (index = 0);
        1 == index ? httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u8fd4\u56de\u754c\u9762",
          content: "\u70b9\u51fb\u5173\u95ed"
        }, function() {}) : 2 == index && httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u5173\u5361\u9009\u62e9\u754c\u9762",
          content: "\u70b9\u51fb\u5173\u95ed"
        }, function() {});
        this.touchEnabled = false;
        ViewManager_1.default.instance.hide(this.node);
      };
      Object.defineProperty(View.prototype, "visible", {
        get: function() {
          return this._visibleDirty;
        },
        enumerable: false,
        configurable: true
      });
      View.prototype.showAnimationNextFrame = function(callback) {
        var _this = this;
        this.scheduleOnce(function(_) {
          UIFunctions_1.default.doShowAnimations(_this.animations, callback);
        }, 0);
      };
      Object.defineProperty(View.prototype, "touchEnabled", {
        get: function() {
          return !this.touchBlocker.active;
        },
        set: function(b) {
          this.touchBlocker.active = !b;
        },
        enumerable: false,
        configurable: true
      });
      View.prototype.show = function() {
        var _this = this;
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) params[_i] = arguments[_i];
        _super.prototype.show.call(this);
        console.log("[View] show:", this.name, params);
        UIFunctions_1.default.stopAnimations(this.animations);
        return new Promise(function(resolve, reject) {
          var _a;
          var self = _this;
          var showFinishCallback = function() {
            self.touchEnabled || (self.touchEnabled = true);
            resolve();
          };
          _this.hasWidget ? _this.showAnimationNextFrame(showFinishCallback) : UIFunctions_1.default.doShowAnimations(_this.animations, showFinishCallback);
          _this._visibleDirty = true;
          _this.target && _this.target.onShown && (_a = _this.target).onShown.apply(_a, params);
        });
      };
      __decorate([ property ], View.prototype, "isDialog", void 0);
      __decorate([ property ], View.prototype, "hasWidget", void 0);
      __decorate([ property ], View.prototype, "opacity", void 0);
      __decorate([ property ], View.prototype, "childrenAnimation", void 0);
      View = __decorate([ ccclass ], View);
      return View;
    }(UIComponent_1.default);
    exports.default = View;
    cc._RF.pop();
  }, {
    "./UIComponent": "UIComponent",
    "./UIFunctions": "UIFunctions",
    "./ViewManager": "ViewManager"
  } ],
  WinDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7d78f0lU+VOW7rncsSfgC5s", "WinDialog");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Info_1 = require("../Info");
    var ViewManager_1 = require("../../../framework/plugin_boosts/ui/ViewManager");
    var Consts_1 = require("../hex-lines-game/Consts");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WinDialog = function(_super) {
      __extends(WinDialog, _super);
      function WinDialog() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ps = null;
        _this.levelLabel = null;
        return _this;
      }
      WinDialog.prototype.onLoad = function() {};
      WinDialog.prototype.start = function() {};
      WinDialog.prototype.decreaseFomula = function(max, min, t, d) {
        return max - t / (t + d) * (max - min);
      };
      WinDialog.prototype.onShown = function() {
        this.ps.resetSystem();
        this.levelLabel.string = cc.js.formatStr("\u5173\u5361 " + Info_1.UserInfo.currentLevel);
        var p = this.decreaseFomula(.99, .3, Info_1.UserInfo.timePassed + Info_1.UserInfo.stepUsed, Info_1.UserInfo.currentLevel + 50);
        if (Info_1.UserInfo.level == Info_1.UserInfo.currentLevel) {
          var lv = Info_1.UserInfo.level;
          var choise_1 = Info_1.UserInfo.getChoice(Info_1.ChoiceType.Levelup);
          Info_1.UserInfo.level = lv + 1;
          Info_1.UserInfo.save();
        }
        var choise = Info_1.UserInfo.getChoice(Info_1.ChoiceType.HB);
        1 == choise && Info_1.UserInfo.level >= 3 && (Info_1.UserInfo.isUnlock(Consts_1.default.FreeSkinId) || ViewManager_1.default.instance.show("Game/HbDialog"));
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u7ed3\u7b97\u754c\u9762",
          content: "\u7b2c" + Info_1.UserInfo.level + "\u5173"
        }, function() {});
        appGame.banner.playBanner(1);
      };
      WinDialog.prototype.click_rank = function() {
        ViewManager_1.default.instance.show("wechat/WxRankDialog");
      };
      WinDialog.prototype.click_shop = function() {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u7ed3\u7b97\u754c\u9762",
          content: "\u70b9\u51fb\u91cd\u73a9"
        }, function() {});
        appGame.gameServerRoom.gameConfigData && appGame.gameServerRoom.gameConfigData.winAgain ? appGame.videoBanner.playVideoAd(3, 0, function() {
          cc.director.loadScene("Game");
        }) : cc.director.loadScene("Game");
      };
      WinDialog.prototype.click_next = function() {
        var btn3 = this.node.getChildByName("btn3").getComponent(cc.Button);
        btn3.enabled = false;
        this.scheduleOnce(function() {
          btn3.enabled = true;
        }.bind(this), 2);
        Info_1.UserInfo.currentLevel = Info_1.UserInfo.currentLevel + 1;
        cc.director.loadScene("Game");
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u7ed3\u7b97\u754c\u9762",
          content: "\u70b9\u51fb\u4e0b\u4e00\u5173"
        }, function() {});
        appGame.gameServerRoom.gameConfigData && appGame.gameServerRoom.gameConfigData.winNextLevel && appGame.videoBanner.playVideoAd(2, 0, function() {
          cc.log("win1");
          btn3.enabled = true;
        }.bind(this));
      };
      WinDialog.prototype.click_home = function() {
        cc.director.loadScene("Main");
      };
      WinDialog.prototype.click_share = function() {};
      __decorate([ property(cc.ParticleSystem) ], WinDialog.prototype, "ps", void 0);
      __decorate([ property(cc.Label) ], WinDialog.prototype, "levelLabel", void 0);
      WinDialog = __decorate([ ccclass ], WinDialog);
      return WinDialog;
    }(cc.Component);
    exports.default = WinDialog;
    cc._RF.pop();
  }, {
    "../../../framework/plugin_boosts/ui/ViewManager": "ViewManager",
    "../Info": "Info",
    "../hex-lines-game/Consts": "Consts"
  } ],
  androidHelper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e14abL3OJ9GPoS9lM+R5fsf", "androidHelper");
    "use strict";
    module.exports = {
      start: function start() {},
      getPhonePlatFrom: function getPhonePlatFrom() {
        var platFrom = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "getPhonePlatFrom", "()Ljava/lang/String;");
        return platFrom;
      },
      getGameName: function getGameName() {
        var game = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "getGameName", "()Ljava/lang/String;");
        return game;
      },
      clearWelcomeImage: function clearWelcomeImage() {
        console.log("clear welcome image...");
        cc.sys.os == cc.sys.OS_ANDROID && jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "removeLaunchImage", "()V");
      },
      replacePhoto: function replacePhoto(info, cb) {
        cc.eventManager.removeCustomListeners("updateImag");
        cc.eventManager.addCustomListener("updateImag", function(event) {
          cb(event.getUserData().a);
        });
        jsb.reflection.callStaticMethod("org/cocos2dx/Photo", "getLocalImag", "(Ljava/lang/String;)Ljava/lang/String;", info);
      },
      getPhonePlatFromType: function getPhonePlatFromType() {
        var platFromType = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "getPhoneType", "()Ljava/lang/String;");
        return parseInt(platFromType);
      },
      getVersion: function getVersion() {
        var version = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "getLocationVersion", "()Ljava/lang/String;");
        return version;
      },
      getChildVersion: function getChildVersion() {
        var childVersion = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "getChildVersion", "()Ljava/lang/String;");
        return childVersion;
      },
      getPhoneModel: function getPhoneModel() {
        var model = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "getPhoneModel", "()Ljava/lang/String;");
        return model;
      },
      getPhoneDeviceID: function getPhoneDeviceID() {
        var deviceId = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "deviceID", "()Ljava/lang/String;");
        return deviceId;
      },
      getYybIsLogin: function getYybIsLogin() {
        var isLogin = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "isYybLogin", "()Ljava/lang/String;");
        return isLogin;
      },
      getInviteCode: function getInviteCode() {
        var inviteCode = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "getInviteInformation", "()Ljava/lang/String;");
        return inviteCode;
      },
      getRoomNum: function getRoomNum() {
        var roomNum = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "getHouseInformation", "()Ljava/lang/String;");
        return roomNum;
      },
      qqLogin: function qqLogin(cb) {
        cc.eventManager.removeCustomListeners("qqLoginResult");
        cc.eventManager.addCustomListener("qqLoginResult", function(event) {
          cb(event.getUserData().a);
        });
        jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "qqLogin", "()V");
      },
      wechatLogin: function wechatLogin(cb) {
        cc.eventManager.removeCustomListeners("wechatLoginResult");
        cc.eventManager.addCustomListener("wechatLoginResult", function(event) {
          cb(event.getUserData().a);
        });
        jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "wechatLogin", "()V");
      },
      deviceLogin: function deviceLogin() {
        var version = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "deviceLogin", "(Ljava/lang/String;)Ljava/lang/String;", "");
        return version;
      },
      wechatPay: function wechatPay(payment, cb) {
        cc.eventManager.removeCustomListeners("wechatPayResult");
        cc.eventManager.addCustomListener("wechatPayResult", function(event) {
          cb(event.getUserData().a);
        });
        jsb.reflection.callStaticMethod("org/cocos2dx/WechatPay", "wechatPay", "(Ljava/lang/String;)Ljava/lang/String;", payment);
      },
      alipayPay: function alipayPay(payment, cb) {
        cc.eventManager.removeCustomListeners("alipayPayResult");
        cc.eventManager.addCustomListener("alipayPayResult", function(event) {
          cb(event.getUserData().a);
        });
        jsb.reflection.callStaticMethod("org/cocos2dx/AlipayPay", "alipayPay", "(Ljava/lang/String;)Ljava/lang/String;", payment);
      },
      wechatShare: function wechatShare(payment, cb) {
        cc.eventManager.removeCustomListeners("shareWechatResult");
        cc.eventManager.addCustomListener("shareWechatResult", function(event) {
          cb(Number(event.getUserData().a));
        });
        jsb.reflection.callStaticMethod("org/cocos2dx/WeChat", "useWeiXin", "(Ljava/lang/String;I)V", payment.str, payment.type);
      },
      openWechat: function openWechat() {
        jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "openWechat", "()V");
      },
      openQQ: function openQQ() {
        jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "qqHelp", "(Ljava/lang/String;)V", "2983816547");
      },
      playNetSound: function playNetSound(info, cb) {
        cc.eventManager.removeCustomListeners("playNetSoundOver");
        cc.eventManager.addCustomListener("playNetSoundOver", function(event) {
          cb(event.getUserData().a);
        });
        jsb.reflection.callStaticMethod("org/cocos2dx/SoundInfo", "playNetSound", "(Ljava/lang/String;)V", info);
      },
      playRecorderBegin: function playRecorderBegin() {
        jsb.reflection.callStaticMethod("org/cocos2dx/SoundInfo", "playRecorderBegin", "()V");
      },
      playRecorderEnd: function playRecorderEnd() {
        jsb.reflection.callStaticMethod("org/cocos2dx/SoundInfo", "playRecorderEnd", "()V");
      },
      uploadRecorder: function uploadRecorder() {
        cc.eventManager.removeCustomListeners("playSoundUrl");
        app.playerMgr.getRecordToken(function(data) {
          cc.eventManager.addCustomListener("playSoundUrl", function(event) {
            app.playerMgr.uploadRecord(event.getUserData().a, function(data) {});
          });
          jsb.reflection.callStaticMethod("org/cocos2dx/SoundInfo", "uploadRecorder", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", data.url, data.name, data.token);
        });
      },
      getLocationInfo: function getLocationInfo(cb) {
        if (1 == app.creatorPlatformType || 2 == app.creatorPlatformType) {
          cc.eventManager.removeCustomListeners("baiDuLocationResult");
          cc.eventManager.addCustomListener("baiDuLocationResult", function(event) {
            var pos = event.getUserData().a.split("###");
            cb({
              x: pos[0],
              y: pos[1]
            });
          });
          jsb.reflection.callStaticMethod("org/cocos2dx/Map", "getLocationInfo", "(Ljava/lang/String;)V", "cocos");
        } else {
          var pos = "108.883452###34.232702".split("###");
          cb({
            x: pos[0],
            y: pos[1]
          });
        }
      },
      openSetting: function openSetting() {
        jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "openSetting", "()V");
      },
      getPhoneElectric: function getPhoneElectric(cb) {
        cc.eventManager.removeCustomListeners("getElectric");
        cc.eventManager.addCustomListener("getElectric", function(event) {
          cb(event.getUserData().a);
        });
      },
      checkApkUpdate: function checkApkUpdate(hotVersion, childVersion, cb) {
        cc.eventManager.removeCustomListeners("havingnNewVersion");
        cc.eventManager.addCustomListener("havingnNewVersion", function(event) {
          cb(event.getUserData().a);
        });
        jsb.reflection.callStaticMethod("com/douyer/helper/VersionManager", "checkupVersion", "(Ljava/lang/String;Ljava/lang/String;)V", hotVersion, childVersion);
      },
      thirdLogin: function thirdLogin(info, cb) {
        if ("huawei" == app.phonePlatFrom) {
          cc.eventManager.removeCustomListeners("accessToken");
          cc.eventManager.addCustomListener("accessToken", function(event) {
            cb(event.getUserData().a);
          });
          var buo = "MIICcwIBADANBgkqhkiG9w0BAQEFAASCAl0wggJZAgEAAoGBAIyo98FF4bIG0mxNGk2b7so/PBSajxYHYPb2lZQj7ebg6ODIq+6hFO2hdqQ+jOTlQVlVqeAqJncTVBsMPm3s+vrnp42RqzFMYo3b6214VQfjiPjjFXoXUYRU66vfqk5hjaz4TMNJ0BS+PcYB3Yn8dgrhSTrVRYfiYOEbUjy6EKMDAgMBAAECf33Sp807taiKcbBvSBgkZHaGGjhUCaqq7xH7gdICUc01YxuwZhwP+6iVxoslaONYMBy5hDwBeGcL4zBOw4mRcu+flIwNPLS7gZ3UM1XwnlIN6e2IjQSsYbIdXfQ/4Z4Mqhy+v1wv+IjBIR/4t2haxrKJKgVlSEds3tHBQZeko0ECQQD1MzTHtwHZoeP8UtCxUEE8cYoNXRg5lX69hx7y14Y4c//tksSWre2EDkMDzICkyndQrNwY38xrilT1ylO5TEchAkEAktsA4sn50qet+GUBO1T5UvyfhdBcBqZeeAVzpFf2Em1WgWGQGZxQ5ZnY9Uz6uvVMycdYhUfpoAiUZAyNcok5owJAXNfBwWlTIwPAnrcA3FLGEMvw+PRqCsvHTJ5QIqVm5hNOMbekBmXfDGSWDWcuwrcDDKIXSLfc4E9lshelMgFm4QJALwA2vV7lPP17mYdCKKoejefaampwOZSfoYwlIdEhKW6jBA+knf3Aimt926yChrmhlObfNvD4HccBLzAxSRoQPwJALQbPOM6lrHl2qCP+SoJI0xhmIFevkl181YYeXx+3hk1X/fSL/Y9mphaNcbOGc0qAWVhWkcjPeXoE9rzDrjFSmw==";
          jsb.reflection.callStaticMethod("com/helper/huawei/sdk/HuaWeiPay", "huaWeiInit", "(Ljava/lang/String;)V", buo);
        } else if ("oppo" == app.phonePlatFrom) {
          cc.eventManager.removeCustomListeners("OloginResult");
          cc.eventManager.addCustomListener("OloginResult", function(event) {
            cb(event.getUserData().a);
          });
          jsb.reflection.callStaticMethod("org/cocos2dx/PayOPPO", "Ologin", "()V");
        } else if ("telecom" == app.phonePlatFrom) {
          cc.eventManager.removeCustomListeners("dianxinLoginResult");
          cc.eventManager.addCustomListener("dianxinLoginResult", function(event) {
            cb(event.getUserData().a);
          });
          jsb.reflection.callStaticMethod("com/helper/dianxin/sdk/DianXinSdk", "gotoLogin", "()V");
        } else if ("xiaomi" == app.phonePlatFrom || "meizu" == app.phonePlatFrom) {
          cc.eventManager.removeCustomListeners("YiSDKLoginCallBack");
          cc.eventManager.addCustomListener("YiSDKLoginCallBack", function(event) {
            cb(event.getUserData().a);
          });
          jsb.reflection.callStaticMethod("com/helper/yijie/sdk/Yisdk", "YiSDKInit", "(Ljava/lang/String;)V", 1);
        } else if ("yyb" == app.phonePlatFrom) {
          cc.eventManager.removeCustomListeners("yybLoginResult");
          cc.eventManager.addCustomListener("yybLoginResult", function(event) {
            cb(event.getUserData().a);
          });
          jsb.reflection.callStaticMethod("com/helper/yyb/sdk/YYBhelper", "gotoLogin", "(Ljava/lang/String;)V", info);
        } else if ("uc" == app.phonePlatFrom) {
          cc.eventManager.removeCustomListeners("loginResult");
          cc.eventManager.addCustomListener("loginResult", function(event) {
            cb(event.getUserData().a);
          });
          jsb.reflection.callStaticMethod("com/helper/uc/sdk/UcSdkCode", "ucInit", "()V");
        } else if ("360" == app.phonePlatFrom) {
          cc.eventManager.removeCustomListeners("loginCallBack");
          cc.eventManager.addCustomListener("loginCallBack", function(event) {
            cb(event.getUserData().a);
          });
          jsb.reflection.callStaticMethod("com/helper/q360/sdk/Sdk360", "login360", "()V");
        }
      },
      thirdPay: function thirdPay(payment, cb) {
        if ("huawei" == app.phonePlatFrom) {
          cc.eventManager.removeCustomListeners("huaWeiPayResult");
          cc.eventManager.addCustomListener("huaWeiPayResult", function(event) {
            cb(event.getUserData().a);
          });
          jsb.reflection.callStaticMethod("com/helper/huawei/sdk/HuaWeiPay", "huaWeiPay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", payment.name, payment.price, payment.name, payment.orderNo, payment.key, payment.url);
        } else if ("oppo" == app.phonePlatFrom) {
          cc.eventManager.removeCustomListeners("OpayResult");
          cc.eventManager.addCustomListener("OpayResult", function(event) {
            cb(event.getUserData().a);
          });
          jsb.reflection.callStaticMethod("org/cocos2dx/PayOPPO", "Opay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", payment.name, payment.url, payment.price, payment.orderNo);
        } else if ("vivo" == app.phonePlatFrom) {
          cc.eventManager.removeCustomListeners("VPayResult");
          cc.eventManager.addCustomListener("VPayResult", function(event) {
            cb(event.getUserData().a);
          });
          jsb.reflection.callStaticMethod("com/helper/vivo/sdk/VivoSDK", "VPay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", payment.orderNo, payment.url, payment.name, payment.price);
        } else if ("xiaomi" == app.phonePlatFrom || "meizu" == app.phonePlatFrom) {
          cc.eventManager.removeCustomListeners("YiSDKPayResult");
          cc.eventManager.addCustomListener("YiSDKPayResult", function(event) {
            cb(event.getUserData().a);
          });
          jsb.reflection.callStaticMethod("com/helper/yijie/sdk/Yisdk", "YiSDKPay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", payment.name, payment.price, payment.orderNo, payment.url);
        } else if ("yyb" == app.phonePlatFrom) {
          cc.eventManager.removeCustomListeners("yybPayResult");
          cc.eventManager.addCustomListener("yybPayResult", function(event) {
            cb(event.getUserData().a);
          });
          jsb.reflection.callStaticMethod("com/helper/yyb/sdk/YYBhelper", "gotoPay", "(Ljava/lang/String;)V", payment.price);
        } else if ("telecom" == app.phonePlatFrom) {
          cc.eventManager.removeCustomListeners("dianxinPayResult");
          cc.eventManager.addCustomListener("dianxinPayResult", function(event) {
            cb(event.getUserData().a);
          });
          jsb.reflection.callStaticMethod("com/helper/dianxin/sdk/DianXinSdk", "DianXinPay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", payment.price, payment.orderNo, payment.name);
        } else if ("baidu" == app.phonePlatFrom) {
          cc.eventManager.removeCustomListeners("baiduResult");
          cc.eventManager.addCustomListener("baiduResult", function(event) {
            cb(event.getUserData().a);
          });
          jsb.reflection.callStaticMethod("com/helper/baidu/sdk/BaiduSdk", "pay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", payment.baiduPayId, payment.price, payment.name, payment.orderNo);
        } else if ("uc" == app.phonePlatFrom && "wk" == app.appKey) {
          cc.eventManager.removeCustomListeners("payResult");
          cc.eventManager.addCustomListener("payResult", function(event) {
            cb(event.getUserData().a);
          });
          jsb.reflection.callStaticMethod("com/helper/uc/sdk/UcSdkCode", "ucSdkPay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", payment.price, payment.orderNo, payment.url, payment.accountId, payment.sign);
        } else if ("uc" == app.phonePlatFrom && "sd" == app.appKey) {
          cc.eventManager.removeCustomListeners("payResult");
          cc.eventManager.addCustomListener("payResult", function(event) {
            cb(event.getUserData().a);
          });
          jsb.reflection.callStaticMethod("com/helper/uc/sdk/UcSdkCode", "ucSdkPay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", payment.name, payment.price, payment.orderNo, payment.url);
        } else if ("360" == app.phonePlatFrom) {
          cc.eventManager.removeCustomListeners("sdk360PayResult");
          cc.eventManager.addCustomListener("sdk360PayResult", function(event) {
            cb(event.getUserData().a);
          });
          jsb.reflection.callStaticMethod("com/helper/q360/sdk/Sdk360", "pay360", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", payment.price, payment.name, payment.id, payment.orderNo, payment.url);
        }
      },
      loginOut: function loginOut(cb) {
        if ("yyb" == app.phonePlatFrom) {
          cc.eventManager.removeCustomListeners("yybSDKLoginOutCallBack");
          cc.eventManager.addCustomListener("yybSDKLoginOutCallBack", function(event) {
            cb(event.getUserData().a);
          });
          jsb.reflection.callStaticMethod("com/helper/yyb/sdk/YYBhelper", "ChangeAccount", "()V");
        } else {
          cc.eventManager.removeCustomListeners("logOutOk");
          cc.eventManager.addCustomListener("logOutOk", function(event) {
            cb(event.getUserData().a);
          });
          jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "loginOut", "()V");
        }
      },
      exitGame: function exitGame() {
        "huawei" == app.phonePlatFrom || ("oppo" == app.phonePlatFrom ? jsb.reflection.callStaticMethod("org/cocos2dx/PayOPPO", "Oexit", "()V") : "xiaomi" == app.phonePlatFrom || "meizu" == app.phonePlatFrom || "yyb" == app.phonePlatFrom ? jsb.reflection.callStaticMethod("com/helper/yijie/sdk/Yisdk", "YiSDKExit", "()V") : "vivo" == app.phonePlatFrom ? jsb.reflection.callStaticMethod("com/helper/vivo/sdk/VivoSDK", "vivoLoginOut", "()V") : "telecom" == app.phonePlatFrom ? jsb.reflection.callStaticMethod("com/helper/dianxin/sdk/DianXinSdk", "dianxinSdkExit", "()V") : "baidu" == app.phonePlatFrom ? jsb.reflection.callStaticMethod("com/helper/baidu/sdk/BaiduSdk", "quitBaiDu", "()V") : "uc" == app.phonePlatFrom ? jsb.reflection.callStaticMethod("com/helper/uc/sdk/UcSdkCode", "ucSdkExit", "()V") : "360" == app.phonePlatFrom && jsb.reflection.callStaticMethod("com/helper/q360/sdk/Sdk360", "quit360", "()V"));
      },
      getNetworkInfo: function getNetworkInfo() {
        var network = jsb.reflection.callStaticMethod("org/cocos2dx/NetUtil", "checkNetworkInfoCreator", "()Ljava/lang/String;");
        return network;
      },
      installApk: function installApk(info) {
        jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "installApk", "(Ljava/lang/String;)V", info);
      },
      getApkFile: function getApkFile() {
        var apkFile = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "getApkFile", "()Ljava/lang/String;");
        return apkFile;
      },
      uploadApk: function uploadApk(url, name, cb) {
        cc.eventManager.removeCustomListeners("uploadApkProgress");
        cc.eventManager.addCustomListener("uploadApkProgress", function(event) {
          cb(event.getUserData().a);
        });
        jsb.reflection.callStaticMethod("org/cocos2dx/UploadApk", "uploadApkFromCreator", "(Ljava/lang/String;Ljava/lang/String;)V", url, name);
      },
      openUrl: function openUrl(url) {
        jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "openUrl", "(Ljava/lang/String;)V", url);
      },
      openInUrl: function openInUrl(url, type, name, isDownload, playerId, adId) {
        jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "openInUrl", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", url, type, name, isDownload, playerId, adId);
      },
      stopApkDownLoad: function stopApkDownLoad() {
        jsb.reflection.callStaticMethod("org/cocos2dx/UploadApk", "stopUpLoad", "()V");
      },
      setScreenChange: function setScreenChange(type) {
        jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "setScreenChange", "(Ljava/lang/String;)V", url);
      },
      judgeIfInstallApk: function judgeIfInstallApk(packgaeName, name) {
        var judge = jsb.reflection.callStaticMethod("org/cocos2dx/UploadApk", "judgeIfInstallApk", "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", packgaeName, name);
        return judge;
      },
      deleAllFiles: function deleAllFiles() {
        jsb.reflection.callStaticMethod("org/cocos2dx/UploadApk", "deleAllFiles", "()V");
      },
      copyToClipboard: function copyToClipboard(content) {
        jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "qpCopy", "(Ljava/lang/String;)V", content);
      }
    };
    cc._RF.pop();
  }, {} ],
  appGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ed2f8mb9M5M3JYlDEliFk1E", "appGame");
    "use strict";
    var Emitter = require("emitter");
    var AppGame = cc.Class({
      properties: {},
      ctor: function ctor() {
        cc.log("create new AppGame start");
        var self = this;
        this.gameServerRoom = {};
        this.videoBanner = {};
        this.interstitialAd = {};
        this.banner = {};
        this.nativeAd = {};
        this.qqappbox = {};
        this.qqblockad = {};
        this.gridAd = {};
        this.deviceInfo = "";
        this.userId = "";
        this.nativeAdData = null;
        this.visibleSize = cc.view.getVisibleSize();
        this.platform = "";
        if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
          this.packageVersion = "1.0.4";
          this.platform = "toutiao";
        } else if (cc.sys.platform == cc.sys.WECHAT_GAME) {
          this.packageVersion = "1.0.0";
          this.platform = "QQ";
        } else if (cc.sys.platform == cc.sys.BAIDU_GAME) {
          this.packageVersion = "1.0.0";
          this.platform = "baidu";
        } else if (cc.sys.platform == cc.sys.OPPO_GAME) {
          this.packageVersion = "1.0.0";
          this.platform = "oppo";
        } else if (cc.sys.platform == cc.sys.XIAOMI_GAME) {
          this.packageVersion = "1.0.0";
          this.platform = "xiaomi";
        } else if (cc.sys.platform == cc.sys.VIVO_GAME) {
          this.packageVersion = "1.0.0";
          this.platform = "vivo";
        } else if (cc.sys.platform == cc.sys.ANDROID) {
          this.packageVersion = "1.0.0";
          this.platform = "android";
        } else {
          this.packageVersion = "1.0.0";
          this.platform = "html5";
        }
        var createObj = function createObj(className) {
          var ctorFun = require(className);
          var obj = new ctorFun(self);
          cc.log("\u521d\u59cb\u5316AppGame\u65f6\u5df2\u521b\u5efa%s", className);
          return obj;
        };
        this.audioMgr = createObj("audioMgr");
        this.emitter = new AppEmitter(this);
        cc.log("create new AppGame end");
        this.show2Hide();
      },
      statics: {
        init: function init() {
          if (window.appGame) cc.log("have window.app, so do nothing"); else {
            cc.log("have no window.AppGame");
            window.consts = require("consts");
            window.httpUtils = require("httpUtils");
            window.async = require("async");
            window.underscore = require("underscore");
            window.util = require("util");
            window.platformFun = require("platformFun");
            cc.sys.os == cc.sys.OS_ANDROID && (window.androidHelper = require("androidHelper"));
            window.appGame = new AppGame();
          }
        }
      },
      show2Hide: function show2Hide() {
        cc.game.on(cc.game.EVENT_SHOW, function() {
          appGame.interstitialAd && appGame.interstitialAd.playAd();
          appGame.gameServerRoom && appGame.gameServerRoom.isHadWord && util.spreadWordFun();
          console.log("game enter fore on");
        });
        cc.game.on(cc.game.EVENT_HIDE, function() {
          console.log("game enter back on");
          appGame.gameServerRoom && appGame.gameServerRoom.wordRid && util.spreadClose(appGame.gameServerRoom.wordRid);
        });
      }
    });
    module.exports = AppGame;
    var AppEmitter = function AppEmitter(app) {
      var addEventListener = this.addEventListener;
      this.on = this.addEventListener = function(event, fn, obj) {
        addEventListener.call(this, event, fn, obj);
      };
      var removeEventListener = this.removeEventListener;
      this.off = this.removeEventListener = function(event, fn) {
        removeEventListener.call(this, event, fn);
      };
    };
    AppEmitter.prototype = new EventEmitter();
    cc._RF.pop();
  }, {
    androidHelper: "androidHelper",
    async: "async",
    consts: "consts",
    emitter: "emitter",
    httpUtils: "httpUtils",
    platformFun: "platformFun",
    underscore: "underscore",
    util: "util"
  } ],
  async: [ function(require, module, exports) {
    (function(process, global) {
      "use strict";
      cc._RF.push(module, "35852wUtjRNI6/OdR5fjH33", "async");
      "use strict";
      (function() {
        var async = {};
        function noop() {}
        var root, previous_async;
        root = "object" == typeof window && this === window ? window : "object" == typeof global && this === global ? global : this;
        null != root && (previous_async = root.async);
        async.noConflict = function() {
          root.async = previous_async;
          return async;
        };
        function only_once(fn) {
          var called = false;
          return function() {
            if (called) throw new Error("Callback was already called.");
            called = true;
            fn.apply(this, arguments);
          };
        }
        function _once(fn) {
          var called = false;
          return function() {
            if (called) return;
            called = true;
            fn.apply(this, arguments);
          };
        }
        var _toString = Object.prototype.toString;
        var _isArray = Array.isArray || function(obj) {
          return "[object Array]" === _toString.call(obj);
        };
        function _isArrayLike(arr) {
          return _isArray(arr) || "number" === typeof arr.length && arr.length >= 0 && arr.length % 1 === 0;
        }
        function _each(coll, iterator) {
          return _isArrayLike(coll) ? _arrayEach(coll, iterator) : _forEachOf(coll, iterator);
        }
        function _arrayEach(arr, iterator) {
          var index = -1, length = arr.length;
          while (++index < length) iterator(arr[index], index, arr);
        }
        function _map(arr, iterator) {
          var index = -1, length = arr.length, result = Array(length);
          while (++index < length) result[index] = iterator(arr[index], index, arr);
          return result;
        }
        function _range(count) {
          return _map(Array(count), function(v, i) {
            return i;
          });
        }
        function _reduce(arr, iterator, memo) {
          _arrayEach(arr, function(x, i, a) {
            memo = iterator(memo, x, i, a);
          });
          return memo;
        }
        function _forEachOf(object, iterator) {
          _arrayEach(_keys(object), function(key) {
            iterator(object[key], key);
          });
        }
        var _keys = Object.keys || function(obj) {
          var keys = [];
          for (var k in obj) obj.hasOwnProperty(k) && keys.push(k);
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
          }
          keys = _keys(coll);
          len = keys.length;
          return function next() {
            i++;
            return i < len ? keys[i] : null;
          };
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
          while (++index < length) result[index] = arr[index + start];
          return result;
        }
        function _withoutIndex(iterator) {
          return function(value, index, callback) {
            return iterator(value, callback);
          };
        }
        var _setImmediate;
        "function" === typeof setImmediate && (_setImmediate = setImmediate);
        if ("undefined" !== typeof process && process.nextTick) {
          async.nextTick = process.nextTick;
          async.setImmediate = _setImmediate ? function(fn) {
            _setImmediate(fn);
          } : async.nextTick;
        } else if (_setImmediate) {
          async.nextTick = function(fn) {
            _setImmediate(fn);
          };
          async.setImmediate = async.nextTick;
        } else {
          async.nextTick = function(fn) {
            setTimeout(fn, 0);
          };
          async.setImmediate = async.nextTick;
        }
        async.forEach = async.each = function(arr, iterator, callback) {
          return async.eachOf(arr, _withoutIndex(iterator), callback);
        };
        async.forEachSeries = async.eachSeries = function(arr, iterator, callback) {
          return async.eachOfSeries(arr, _withoutIndex(iterator), callback);
        };
        async.forEachLimit = async.eachLimit = function(arr, limit, iterator, callback) {
          return _eachOfLimit(limit)(arr, _withoutIndex(iterator), callback);
        };
        async.forEachOf = async.eachOf = function(object, iterator, callback) {
          callback = _once(callback || noop);
          object = object || [];
          var size = _isArrayLike(object) ? object.length : _keys(object).length;
          var completed = 0;
          if (!size) return callback(null);
          _each(object, function(value, key) {
            iterator(object[key], key, only_once(done));
          });
          function done(err) {
            if (err) callback(err); else {
              completed += 1;
              completed >= size && callback(null);
            }
          }
        };
        async.forEachOfSeries = async.eachOfSeries = function(obj, iterator, callback) {
          callback = _once(callback || noop);
          obj = obj || [];
          var nextKey = _keyIterator(obj);
          var key = nextKey();
          function iterate() {
            var sync = true;
            if (null === key) return callback(null);
            iterator(obj[key], key, only_once(function(err) {
              if (err) callback(err); else {
                key = nextKey();
                if (null === key) return callback(null);
                sync ? async.nextTick(iterate) : iterate();
              }
            }));
            sync = false;
          }
          iterate();
        };
        async.forEachOfLimit = async.eachOfLimit = function(obj, limit, iterator, callback) {
          _eachOfLimit(limit)(obj, iterator, callback);
        };
        function _eachOfLimit(limit) {
          return function(obj, iterator, callback) {
            callback = _once(callback || noop);
            obj = obj || [];
            var nextKey = _keyIterator(obj);
            if (limit <= 0) return callback(null);
            var done = false;
            var running = 0;
            var errored = false;
            (function replenish() {
              if (done && running <= 0) return callback(null);
              while (running < limit && !errored) {
                var key = nextKey();
                if (null === key) {
                  done = true;
                  running <= 0 && callback(null);
                  return;
                }
                running += 1;
                iterator(obj[key], key, only_once(function(err) {
                  running -= 1;
                  if (err) {
                    callback(err);
                    errored = true;
                  } else replenish();
                }));
              }
            })();
          };
        }
        function doParallel(fn) {
          return function(obj, iterator, callback) {
            return fn(async.eachOf, obj, iterator, callback);
          };
        }
        function doParallelLimit(limit, fn) {
          return function(obj, iterator, callback) {
            return fn(_eachOfLimit(limit), obj, iterator, callback);
          };
        }
        function doSeries(fn) {
          return function(obj, iterator, callback) {
            return fn(async.eachOfSeries, obj, iterator, callback);
          };
        }
        function _asyncMap(eachfn, arr, iterator, callback) {
          callback = _once(callback || noop);
          var results = [];
          eachfn(arr, function(value, index, callback) {
            iterator(value, function(err, v) {
              results[index] = v;
              callback(err);
            });
          }, function(err) {
            callback(err, results);
          });
        }
        async.map = doParallel(_asyncMap);
        async.mapSeries = doSeries(_asyncMap);
        async.mapLimit = function(arr, limit, iterator, callback) {
          return _mapLimit(limit)(arr, iterator, callback);
        };
        function _mapLimit(limit) {
          return doParallelLimit(limit, _asyncMap);
        }
        async.inject = async.foldl = async.reduce = function(arr, memo, iterator, callback) {
          async.eachOfSeries(arr, function(x, i, callback) {
            iterator(memo, x, function(err, v) {
              memo = v;
              callback(err);
            });
          }, function(err) {
            callback(err || null, memo);
          });
        };
        async.foldr = async.reduceRight = function(arr, memo, iterator, callback) {
          var reversed = _map(arr, function(x) {
            return x;
          }).reverse();
          async.reduce(reversed, memo, iterator, callback);
        };
        function _filter(eachfn, arr, iterator, callback) {
          var results = [];
          arr = _map(arr, function(x, i) {
            return {
              index: i,
              value: x
            };
          });
          eachfn(arr, function(x, index, callback) {
            iterator(x.value, function(v) {
              v && results.push(x);
              callback();
            });
          }, function() {
            callback(_map(results.sort(function(a, b) {
              return a.index - b.index;
            }), function(x) {
              return x.value;
            }));
          });
        }
        async.select = async.filter = doParallel(_filter);
        async.selectSeries = async.filterSeries = doSeries(_filter);
        function _reject(eachfn, arr, iterator, callback) {
          var results = [];
          arr = _map(arr, function(x, i) {
            return {
              index: i,
              value: x
            };
          });
          eachfn(arr, function(x, index, callback) {
            iterator(x.value, function(v) {
              v || results.push(x);
              callback();
            });
          }, function() {
            callback(_map(results.sort(function(a, b) {
              return a.index - b.index;
            }), function(x) {
              return x.value;
            }));
          });
        }
        async.reject = doParallel(_reject);
        async.rejectSeries = doSeries(_reject);
        function _detect(eachfn, arr, iterator, main_callback) {
          eachfn(arr, function(x, index, callback) {
            iterator(x, function(result) {
              if (result) {
                main_callback(x);
                main_callback = noop;
              } else callback();
            });
          }, function() {
            main_callback();
          });
        }
        async.detect = doParallel(_detect);
        async.detectSeries = doSeries(_detect);
        async.any = async.some = function(arr, iterator, main_callback) {
          async.eachOf(arr, function(x, _, callback) {
            iterator(x, function(v) {
              if (v) {
                main_callback(true);
                main_callback = noop;
              }
              callback();
            });
          }, function() {
            main_callback(false);
          });
        };
        async.all = async.every = function(arr, iterator, main_callback) {
          async.eachOf(arr, function(x, _, callback) {
            iterator(x, function(v) {
              if (!v) {
                main_callback(false);
                main_callback = noop;
              }
              callback();
            });
          }, function() {
            main_callback(true);
          });
        };
        async.sortBy = function(arr, iterator, callback) {
          async.map(arr, function(x, callback) {
            iterator(x, function(err, criteria) {
              err ? callback(err) : callback(null, {
                value: x,
                criteria: criteria
              });
            });
          }, function(err, results) {
            if (err) return callback(err);
            callback(null, _map(results.sort(comparator), function(x) {
              return x.value;
            }));
          });
          function comparator(left, right) {
            var a = left.criteria, b = right.criteria;
            return a < b ? -1 : a > b ? 1 : 0;
          }
        };
        async.auto = function(tasks, callback) {
          callback = _once(callback || noop);
          var keys = _keys(tasks);
          var remainingTasks = keys.length;
          if (!remainingTasks) return callback(null);
          var results = {};
          var listeners = [];
          function addListener(fn) {
            listeners.unshift(fn);
          }
          function removeListener(fn) {
            for (var i = 0; i < listeners.length; i += 1) if (listeners[i] === fn) {
              listeners.splice(i, 1);
              return;
            }
          }
          function taskComplete() {
            remainingTasks--;
            _arrayEach(listeners.slice(0), function(fn) {
              fn();
            });
          }
          addListener(function() {
            remainingTasks || callback(null, results);
          });
          _arrayEach(keys, function(k) {
            var task = _isArray(tasks[k]) ? tasks[k] : [ tasks[k] ];
            function taskCallback(err) {
              var args = _baseSlice(arguments, 1);
              args.length <= 1 && (args = args[0]);
              if (err) {
                var safeResults = {};
                _arrayEach(_keys(results), function(rkey) {
                  safeResults[rkey] = results[rkey];
                });
                safeResults[k] = args;
                callback(err, safeResults);
              } else {
                results[k] = args;
                async.setImmediate(taskComplete);
              }
            }
            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
            var len = requires.length;
            var dep;
            while (len--) {
              if (!(dep = tasks[requires[len]])) throw new Error("Has inexistant dependency");
              if (_isArray(dep) && !!~dep.indexOf(k)) throw new Error("Has cyclic dependencies");
            }
            function ready() {
              return _reduce(requires, function(a, x) {
                return a && results.hasOwnProperty(x);
              }, true) && !results.hasOwnProperty(k);
            }
            ready() ? task[task.length - 1](taskCallback, results) : addListener(listener);
            function listener() {
              if (ready()) {
                removeListener(listener);
                task[task.length - 1](taskCallback, results);
              }
            }
          });
        };
        async.retry = function(times, task, callback) {
          var DEFAULT_TIMES = 5;
          var attempts = [];
          if ("function" === typeof times) {
            callback = task;
            task = times;
            times = DEFAULT_TIMES;
          }
          times = parseInt(times, 10) || DEFAULT_TIMES;
          function wrappedTask(wrappedCallback, wrappedResults) {
            function retryAttempt(task, finalAttempt) {
              return function(seriesCallback) {
                task(function(err, result) {
                  seriesCallback(!err || finalAttempt, {
                    err: err,
                    result: result
                  });
                }, wrappedResults);
              };
            }
            while (times) attempts.push(retryAttempt(task, !(times -= 1)));
            async.series(attempts, function(done, data) {
              data = data[data.length - 1];
              (wrappedCallback || callback)(data.err, data.result);
            });
          }
          return callback ? wrappedTask() : wrappedTask;
        };
        async.waterfall = function(tasks, callback) {
          callback = _once(callback || noop);
          if (!_isArray(tasks)) {
            var err = new Error("First argument to waterfall must be an array of functions");
            return callback(err);
          }
          if (!tasks.length) return callback();
          function wrapIterator(iterator) {
            return function(err) {
              if (err) callback.apply(null, arguments); else {
                var args = _baseSlice(arguments, 1);
                var next = iterator.next();
                next ? args.push(wrapIterator(next)) : args.push(callback);
                ensureAsync(iterator).apply(null, args);
              }
            };
          }
          wrapIterator(async.iterator(tasks))();
        };
        function _parallel(eachfn, tasks, callback) {
          callback = callback || noop;
          var results = _isArrayLike(tasks) ? [] : {};
          eachfn(tasks, function(task, key, callback) {
            task(function(err) {
              var args = _baseSlice(arguments, 1);
              args.length <= 1 && (args = args[0]);
              results[key] = args;
              callback(err);
            });
          }, function(err) {
            callback(err, results);
          });
        }
        async.parallel = function(tasks, callback) {
          _parallel(async.eachOf, tasks, callback);
        };
        async.parallelLimit = function(tasks, limit, callback) {
          _parallel(_eachOfLimit(limit), tasks, callback);
        };
        async.series = function(tasks, callback) {
          callback = callback || noop;
          var results = _isArrayLike(tasks) ? [] : {};
          async.eachOfSeries(tasks, function(task, key, callback) {
            task(function(err) {
              var args = _baseSlice(arguments, 1);
              args.length <= 1 && (args = args[0]);
              results[key] = args;
              callback(err);
            });
          }, function(err) {
            callback(err, results);
          });
        };
        async.iterator = function(tasks) {
          function makeCallback(index) {
            function fn() {
              tasks.length && tasks[index].apply(null, arguments);
              return fn.next();
            }
            fn.next = function() {
              return index < tasks.length - 1 ? makeCallback(index + 1) : null;
            };
            return fn;
          }
          return makeCallback(0);
        };
        async.apply = function(fn) {
          var args = _baseSlice(arguments, 1);
          return function() {
            return fn.apply(null, args.concat(_baseSlice(arguments)));
          };
        };
        function _concat(eachfn, arr, fn, callback) {
          var result = [];
          eachfn(arr, function(x, index, cb) {
            fn(x, function(err, y) {
              result = result.concat(y || []);
              cb(err);
            });
          }, function(err) {
            callback(err, result);
          });
        }
        async.concat = doParallel(_concat);
        async.concatSeries = doSeries(_concat);
        async.whilst = function(test, iterator, callback) {
          test() ? iterator(function(err) {
            if (err) return callback(err);
            async.whilst(test, iterator, callback);
          }) : callback(null);
        };
        async.doWhilst = function(iterator, test, callback) {
          iterator(function(err) {
            if (err) return callback(err);
            var args = _baseSlice(arguments, 1);
            test.apply(null, args) ? async.doWhilst(iterator, test, callback) : callback(null);
          });
        };
        async.until = function(test, iterator, callback) {
          test() ? callback(null) : iterator(function(err) {
            if (err) return callback(err);
            async.until(test, iterator, callback);
          });
        };
        async.doUntil = function(iterator, test, callback) {
          iterator(function(err) {
            if (err) return callback(err);
            var args = _baseSlice(arguments, 1);
            test.apply(null, args) ? callback(null) : async.doUntil(iterator, test, callback);
          });
        };
        function _queue(worker, concurrency, payload) {
          if (null == concurrency) concurrency = 1; else if (0 === concurrency) throw new Error("Concurrency must not be zero");
          function _insert(q, data, pos, callback) {
            if (null != callback && "function" !== typeof callback) throw new Error("task callback must be a function");
            q.started = true;
            _isArray(data) || (data = [ data ]);
            if (0 === data.length && q.idle()) return async.setImmediate(function() {
              q.drain();
            });
            _arrayEach(data, function(task) {
              var item = {
                data: task,
                callback: callback || noop
              };
              pos ? q.tasks.unshift(item) : q.tasks.push(item);
              q.tasks.length === q.concurrency && q.saturated();
            });
            async.setImmediate(q.process);
          }
          function _next(q, tasks) {
            return function() {
              workers -= 1;
              var args = arguments;
              _arrayEach(tasks, function(task) {
                task.callback.apply(task, args);
              });
              q.tasks.length + workers === 0 && q.drain();
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
              if (!q.paused && workers < q.concurrency && q.tasks.length) while (workers < q.concurrency && q.tasks.length) {
                var tasks = payload ? q.tasks.splice(0, payload) : q.tasks.splice(0, q.tasks.length);
                var data = _map(tasks, function(task) {
                  return task.data;
                });
                0 === q.tasks.length && q.empty();
                workers += 1;
                var cb = only_once(_next(q, tasks));
                worker(data, cb);
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
              if (false === q.paused) return;
              q.paused = false;
              var resumeCount = Math.min(q.concurrency, q.tasks.length);
              for (var w = 1; w <= resumeCount; w++) async.setImmediate(q.process);
            }
          };
          return q;
        }
        async.queue = function(worker, concurrency) {
          var q = _queue(function(items, cb) {
            worker(items[0], cb);
          }, concurrency, 1);
          return q;
        };
        async.priorityQueue = function(worker, concurrency) {
          function _compareTasks(a, b) {
            return a.priority - b.priority;
          }
          function _binarySearch(sequence, item, compare) {
            var beg = -1, end = sequence.length - 1;
            while (beg < end) {
              var mid = beg + (end - beg + 1 >>> 1);
              compare(item, sequence[mid]) >= 0 ? beg = mid : end = mid - 1;
            }
            return beg;
          }
          function _insert(q, data, priority, callback) {
            if (null != callback && "function" !== typeof callback) throw new Error("task callback must be a function");
            q.started = true;
            _isArray(data) || (data = [ data ]);
            if (0 === data.length) return async.setImmediate(function() {
              q.drain();
            });
            _arrayEach(data, function(task) {
              var item = {
                data: task,
                priority: priority,
                callback: "function" === typeof callback ? callback : noop
              };
              q.tasks.splice(_binarySearch(q.tasks, item, _compareTasks) + 1, 0, item);
              q.tasks.length === q.concurrency && q.saturated();
              async.setImmediate(q.process);
            });
          }
          var q = async.queue(worker, concurrency);
          q.push = function(data, priority, callback) {
            _insert(q, data, priority, callback);
          };
          delete q.unshift;
          return q;
        };
        async.cargo = function(worker, payload) {
          return _queue(worker, 1, payload);
        };
        function _console_fn(name) {
          return function(fn) {
            var args = _baseSlice(arguments, 1);
            fn.apply(null, args.concat([ function(err) {
              var args = _baseSlice(arguments, 1);
              "undefined" !== typeof console && (err ? console.error && console.error(err) : console[name] && _arrayEach(args, function(x) {
                console[name](x);
              }));
            } ]));
          };
        }
        async.log = _console_fn("log");
        async.dir = _console_fn("dir");
        async.memoize = function(fn, hasher) {
          var memo = {};
          var queues = {};
          hasher = hasher || function(x) {
            return x;
          };
          function memoized() {
            var args = _baseSlice(arguments);
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (key in memo) async.nextTick(function() {
              callback.apply(null, memo[key]);
            }); else if (key in queues) queues[key].push(callback); else {
              queues[key] = [ callback ];
              fn.apply(null, args.concat([ function() {
                memo[key] = _baseSlice(arguments);
                var q = queues[key];
                delete queues[key];
                for (var i = 0, l = q.length; i < l; i++) q[i].apply(null, arguments);
              } ]));
            }
          }
          memoized.memo = memo;
          memoized.unmemoized = fn;
          return memoized;
        };
        async.unmemoize = function(fn) {
          return function() {
            return (fn.unmemoized || fn).apply(null, arguments);
          };
        };
        function _times(mapper) {
          return function(count, iterator, callback) {
            mapper(_range(count), iterator, callback);
          };
        }
        async.times = _times(async.map);
        async.timesSeries = _times(async.mapSeries);
        async.timesLimit = function(count, limit, iterator, callback) {
          return async.mapLimit(_range(count), limit, iterator, callback);
        };
        async.seq = function() {
          var fns = arguments;
          return function() {
            var that = this;
            var args = _baseSlice(arguments);
            var callback = args.slice(-1)[0];
            "function" == typeof callback ? args.pop() : callback = noop;
            async.reduce(fns, args, function(newargs, fn, cb) {
              fn.apply(that, newargs.concat([ function() {
                var err = arguments[0];
                var nextargs = _baseSlice(arguments, 1);
                cb(err, nextargs);
              } ]));
            }, function(err, results) {
              callback.apply(that, [ err ].concat(results));
            });
          };
        };
        async.compose = function() {
          return async.seq.apply(null, Array.prototype.reverse.call(arguments));
        };
        function _applyEach(eachfn, fns) {
          function go() {
            var that = this;
            var args = _baseSlice(arguments);
            var callback = args.pop();
            return eachfn(fns, function(fn, _, cb) {
              fn.apply(that, args.concat([ cb ]));
            }, callback);
          }
          if (arguments.length > 2) {
            var args = _baseSlice(arguments, 2);
            return go.apply(this, args);
          }
          return go;
        }
        async.applyEach = function() {
          var args = _baseSlice(arguments);
          return _applyEach.apply(null, [ async.eachOf ].concat(args));
        };
        async.applyEachSeries = function() {
          var args = _baseSlice(arguments);
          return _applyEach.apply(null, [ async.eachOfSeries ].concat(args));
        };
        async.forever = function(fn, callback) {
          var done = only_once(callback || noop);
          var task = ensureAsync(fn);
          function next(err) {
            if (err) return done(err);
            task(next);
          }
          next();
        };
        function ensureAsync(fn) {
          return function() {
            var args = _baseSlice(arguments);
            var callback = args.pop();
            args.push(function() {
              var innerArgs = arguments;
              sync ? async.setImmediate(function() {
                callback.apply(null, innerArgs);
              }) : callback.apply(null, innerArgs);
            });
            var sync = true;
            fn.apply(this, args);
            sync = false;
          };
        }
        async.ensureAsync = ensureAsync;
        "undefined" !== typeof module && module.exports ? module.exports = async : "undefined" !== typeof define && define.amd ? define([], function() {
          return async;
        }) : root.async = async;
      })();
      cc._RF.pop();
    }).call(this, require("_process"), "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {
    _process: 1
  } ],
  audioMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cc057iIkENNC6PSrpbMmYVg", "audioMgr");
    "use strict";
    var AudioMgr = cc.Class({
      properties: {
        bgmAudioID: -1,
        audioId: 1,
        gameMusicAudio: true,
        bgUrl: "",
        bgLoop: false
      },
      ctor: function ctor() {
        cc.sys.localStorage.setItem("gameMusic", 1);
        var gMusic = cc.sys.localStorage.getItem("gameMusic");
        this.gameMusicAudio = null != gMusic && "" != gMusic;
        cc.game.on(cc.game.EVENT_HIDE, function() {
          cc.audioEngine.pauseAll();
        });
        cc.game.on(cc.game.EVENT_SHOW, function() {
          cc.audioEngine.resumeAll();
        });
      },
      getUrl: function getUrl(url, cb) {
        if (!this.gameMusicAudio) return;
        cc.assetManager.loadBundle("sound", function(err, bundle) {
          bundle.load(url, cc.AudioClip, function(err, clip) {
            cb(clip);
          }.bind(this));
        }.bind(this));
      },
      getMusicStatus: function getMusicStatus(cb) {
        var gMusic = cc.sys.localStorage.getItem("gameMusic");
        cb(null != gMusic && "" != gMusic);
      },
      setMusicOnOff: function setMusicOnOff(isOpen) {
        if (isOpen) {
          this.gameMusicAudio = true;
          cc.sys.localStorage.setItem("gameMusic", 1);
          this.bgUrl && this.playBGM(this.bgUrl, this.bgLoop);
        } else {
          this.stopAll();
          this.gameMusicAudio = false;
          cc.sys.localStorage.removeItem("gameMusic");
        }
      },
      playBGM: function playBGM(url, isLoop) {
        this.bgUrl = url;
        this.bgLoop = isLoop;
        this.getUrl(url, function(audioUrl) {
          cc.audioEngine.stop(this.bgmAudioID);
          this.bgmAudioID = cc.audioEngine.playMusic(audioUrl, isLoop);
          cc.log("this.bgmAudioID=====" + this.bgmAudioID);
        }.bind(this));
      },
      playSFX: function playSFX(url) {
        this.getUrl(url, function(audioUrl) {
          this.audioId = cc.audioEngine.play(audioUrl, false, 1);
        }.bind(this));
      },
      pauseBGM: function pauseBGM() {
        cc.log("pauseBGM");
        cc.audioEngine.pause(this.bgmAudioID);
      },
      resumeBGM: function resumeBGM() {
        if (this.gameMusicAudio) {
          cc.log("resumeBGM");
          cc.audioEngine.resume(this.bgmAudioID);
        }
      },
      pauseAll: function pauseAll() {
        cc.audioEngine.pauseAll();
      },
      resumeAll: function resumeAll() {
        cc.audioEngine.resumeAll();
      },
      stopAll: function stopAll() {
        cc.audioEngine.stopAll();
      }
    });
    module.exports = AudioMgr;
    cc._RF.pop();
  }, {} ],
  banner: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4d62c7SXMdKHaht/20V3tyM", "banner");
    "use strict";
    var AppGame = require("../model/appGame");
    var bannerAppSid = "";
    var bannerAdUnitId = "";
    var Banner = cc.Class({
      properties: {},
      ctor: function ctor() {
        this.instance = null;
      },
      statics: {
        create: function create(data) {
          if (!this.instance) {
            this.instance = new Banner();
            this.instance.initWithData(data);
            return this.instance;
          }
        }
      },
      initWithData: function initWithData(data) {
        this.targetBannerAdWidth = 200;
        if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
          var _tt$getSystemInfoSync = tt.getSystemInfoSync(), windowWidth = _tt$getSystemInfoSync.windowWidth, windowHeight = _tt$getSystemInfoSync.windowHeight;
          this.width = windowWidth;
          this.height = windowHeight;
          this.adId = "3o8m16pp3e54cqcd5t";
          appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.bannerId && appGame.gameServerRoom.commonConfig.bannerId.toutiao && (this.adId = appGame.gameServerRoom.commonConfig.bannerId.toutiao.adUnitId);
          console.log("banner \u7b2c\u4e00\u6b21\u521b\u5efa");
          this.globalData = {
            bannerAd: tt.createBannerAd({
              adUnitId: this.adId,
              style: {
                width: this.targetBannerAdWidth,
                top: this.height - this.targetBannerAdWidth / 16 * 9,
                left: (this.width - this.targetBannerAdWidth) / 2
              }
            })
          };
          this.refreshSize();
        } else if (cc.sys.platform == cc.sys.WECHAT_GAME) {
          var _qq$getSystemInfoSync = qq.getSystemInfoSync(), _windowWidth = _qq$getSystemInfoSync.windowWidth, _windowHeight = _qq$getSystemInfoSync.windowHeight;
          this.targetBannerAdWidth = 200;
          this.width = _windowWidth;
          this.height = _windowHeight;
          this.adId = "4ef215ca5af9c3b454e9d22a676f7992";
          appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.bannerId && appGame.gameServerRoom.commonConfig.bannerId.QQ && (this.adId = appGame.gameServerRoom.commonConfig.bannerId.QQ.adUnitId);
          console.log("banner \u7b2c\u4e00\u6b21\u521b\u5efa");
          this.globalData = {
            bannerAd: qq.createBannerAd({
              adUnitId: this.adId,
              style: {
                width: this.width,
                top: this.height - this.targetBannerAdWidth / 16 * 9,
                left: 0
              }
            })
          };
        } else if (cc.sys.platform == cc.sys.BAIDU_GAME) {
          var _swan$getSystemInfoSy = swan.getSystemInfoSync(), _windowWidth2 = _swan$getSystemInfoSy.windowWidth, _windowHeight2 = _swan$getSystemInfoSy.windowHeight;
          this.targetBannerAdWidth = 200;
          this.width = _windowWidth2;
          this.height = _windowHeight2;
          bannerAdUnitId = "4ef215ca5af9c3b454e9d22a676f7992";
          bannerAppSid = "";
          appGame.gameServerRoom.gameConfigData && appGame.gameServerRoom.gameConfigData.bannerId && appGame.gameServerRoom.gameConfigData.bannerId.baidu && (bannerAdUnitId = appGame.gameServerRoom.gameConfigData.bannerId.baidu.adUnitId);
          appGame.gameServerRoom.gameConfigData && appGame.gameServerRoom.gameConfigData.videoId && appGame.gameServerRoom.gameConfigData.videoId.baidu && (bannerAppSid = appGame.gameServerRoom.gameConfigData.bannerId.baidu.appSid);
          var example = {
            adUnitId: bannerAdUnitId,
            appSid: bannerAppSid,
            style: {
              top: this.height - this.targetBannerAdWidth / 16 * 9,
              left: (this.width - this.targetBannerAdWidth) / 2,
              width: this.targetBannerAdWidth
            }
          };
          this.globalData = {
            bannerAd: swan.createBannerAd(example)
          };
        }
      },
      scheduleCallBack: function scheduleCallBack() {
        console.log("n\u79d2\u540e\u5237\u65b0");
        this.playBanner(3);
        this.playBanner(2);
      },
      playBanner: function playBanner(sceneId, refreshTime) {
        void 0 === refreshTime && (refreshTime = 30);
        cc.director.getScheduler().enableForTarget(this);
        if (3 != sceneId) {
          2 == sceneId ? cc.director.getScheduler().schedule(this.scheduleCallBack, this, refreshTime) : cc.director.getScheduler().unschedule(this.scheduleCallBack, this);
          if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) if (this.globalData && this.globalData.bannerAd) console.log("banner \u9690\u85cf"); else {
            console.log("banner \u521b\u5efa");
            this.globalData = {
              bannerAd: tt.createBannerAd({
                adUnitId: this.adId,
                style: {
                  width: this.targetBannerAdWidth,
                  top: this.height - this.targetBannerAdWidth / 16 * 9,
                  left: (this.width - this.targetBannerAdWidth) / 2
                }
              })
            };
            this.refreshSize();
          } else if (cc.sys.platform == cc.sys.BAIDU_GAME) {
            if (this.globalData && this.globalData.bannerAd) {
              this.globalData.bannerAd.destroy();
              this.globalData.bannerAd = null;
            }
            var _swan$getSystemInfoSy2 = swan.getSystemInfoSync(), windowWidth = _swan$getSystemInfoSy2.windowWidth, windowHeight = _swan$getSystemInfoSy2.windowHeight;
            this.width = windowWidth;
            this.height = windowHeight;
            appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.bannerId && appGame.gameServerRoom.commonConfig.bannerId.baidu && (this.adId = appGame.gameServerRoom.commonConfig.bannerId.baidu.adUnitId);
            appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.bannerId && appGame.gameServerRoom.commonConfig.bannerId.baidu && (this.appId = appGame.gameServerRoom.commonConfig.bannerId.baidu.appSid);
            this.globalData = {
              bannerAd: swan.createBannerAd({
                adUnitId: this.adId,
                appSid: this.appId,
                style: {
                  width: this.width,
                  top: this.height - this.targetBannerAdWidth / 16 * 9,
                  left: (this.width - this.targetBannerAdWidth) / 2
                }
              })
            };
            this.refreshSize();
          } else if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            if (this.globalData && this.globalData.bannerAd) {
              console.log("banner \u9690\u85cf");
              this.globalData.bannerAd.destroy();
            }
            bannerAdUnitId = "7466662";
            appGame.gameServerRoom.gameConfigData && appGame.gameServerRoom.gameConfigData.bannerId && appGame.gameServerRoom.gameConfigData.bannerId.QQ && (bannerAdUnitId = appGame.gameServerRoom.gameConfigData.bannerId.QQ.adUnitId);
            var example = {
              adUnitId: bannerAdUnitId,
              style: {
                top: this.height - this.targetBannerAdWidth / 16 * 9,
                left: 0,
                width: this.width
              }
            };
            this.globalData = {
              bannerAd: qq.createBannerAd(example)
            };
            this.globalData ? console.log("banner\u521b\u5efa\u6210\u529f") : console.log("banner\u521b\u5efa\u5931\u8d25");
          }
          this.timebanner = setTimeout(function() {
            this.showBannerAd();
          }.bind(this), 500);
        } else {
          cc.director.getScheduler().unschedule(this.scheduleCallBack, this);
          if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
            if (this.globalData && this.globalData.bannerAd) {
              this.globalData.bannerAd.hide();
              this.globalData.bannerAd.destroy();
              this.globalData.bannerAd = null;
              console.log("\u5b57\u8282\u5e73\u53f0banner \u9500\u6bc1");
              this.globalData = {
                bannerAd: tt.createBannerAd({
                  adUnitId: this.adId,
                  style: {
                    width: this.targetBannerAdWidth,
                    top: this.height - this.targetBannerAdWidth / 16 * 9,
                    left: (this.width - this.targetBannerAdWidth) / 2
                  }
                })
              };
              this.refreshSize();
            }
          } else if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            if (this.globalData && this.globalData.bannerAd) {
              this.globalData.bannerAd.hide();
              this.globalData.bannerAd.destroy();
              this.globalData.bannerAd = null;
              console.log("banner \u9500\u6bc1");
              this.globalData = {
                bannerAd: wx.createBannerAd({
                  adUnitId: this.adId,
                  style: {
                    width: this.targetBannerAdWidth,
                    top: this.height - this.targetBannerAdWidth / 16 * 9,
                    left: (this.width - this.targetBannerAdWidth) / 2
                  }
                })
              };
              this.refreshSize();
            }
          } else if (cc.sys.platform == cc.sys.BAIDU_GAME && this.globalData && this.globalData.bannerAd) {
            this.globalData.bannerAd.hide();
            this.globalData.bannerAd.destroy();
            this.globalData.bannerAd = null;
            console.log("banner \u9500\u6bc1");
            var _example = {
              adUnitId: "7466662",
              appSid: "c736be0f",
              style: {
                top: this.height - this.targetBannerAdWidth / 16 * 9,
                left: (this.width - this.targetBannerAdWidth) / 2,
                width: this.targetBannerAdWidth
              }
            };
            this.globalData = {
              bannerAd: swan.createBannerAd(_example)
            };
          }
        }
      },
      showBannerAd: function showBannerAd() {
        var _this = this;
        clearTimeout(this.timebanner);
        if (this.globalData && this.globalData.bannerAd) {
          console.log("\u64ad\u653ebanner\u5e7f\u544a");
          cc.sys.platform == cc.sys.WECHAT_GAME ? this.globalData.bannerAd.show() : this.globalData.bannerAd.show().then(function() {
            console.log("\u5c55\u793a\u6210\u529f");
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: "\u5e7f\u544a\u4f4dbanner",
              content: "\u5c55\u793a\u6210\u529f+\u5e7f\u544a\u4f4d+" + _this.adId
            }, function() {});
          })["catch"](function(err) {
            console.log("\u5c55\u793a\u5931\u8d25");
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: "\u5e7f\u544a\u4f4dbanner",
              content: "\u5c55\u793a\u5931\u8d25+\u5e7f\u544a\u4f4d+" + _this.adId
            }, function() {});
          });
        }
      },
      refreshSize: function refreshSize() {
        var _this2 = this;
        if (this.globalData && this.globalData.bannerAd) {
          cc.sys.platform != cc.sys.BYTEDANCE_GAME && cc.sys.platform != cc.sys.WECHAT_GAME && cc.sys.platform != cc.sys.BAIDU_GAME || this.globalData.bannerAd.onResize(function(size) {
            console.log("banner shezhi\u5927\u5c0f" + _this2.height + "   " + _this2.width);
            _this2.globalData.bannerAd.style.top = _this2.height - size.height;
            _this2.globalData.bannerAd.style.left = (_this2.width - size.width) / 2;
          });
          this.globalData.bannerAd.onError(function(listener) {
            console.log("banner \u51fa\u9519");
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: "\u5e7f\u544a\u4f4dbanner",
              content: "\u5c55\u793a\u5931\u8d25+\u5e7f\u544a\u4f4d+" + _this2.adId + "\u539f\u56e0+" + listener.errMsg
            }, function() {});
          });
        }
      }
    });
    module.exports = Banner;
    cc._RF.pop();
  }, {
    "../model/appGame": "appGame"
  } ],
  changeGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "afdd0LsL2lP35RKLODURjeW", "changeGame");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onChangeGameBtnCallBack, this);
      },
      start: function start() {},
      onChangeGameBtnCallBack: function onChangeGameBtnCallBack(event) {
        if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
          var systemInfo = tt.getSystemInfoSync();
          "ios" !== systemInfo.platform && tt.showMoreGamesModal({
            appLaunchOptions: [ {
              appId: "tt7fbb0906e080eb91",
              extraData: {}
            }, {
              appId: "tt71aa0717ee919412",
              extraData: {}
            }, {
              appId: "tt83a9f5141c9278e6",
              extraData: {}
            }, {
              appId: "tt1b516dec846adc47",
              extraData: {}
            }, {
              appId: "ttcf78b9c550430232",
              extraData: {}
            }, {
              appId: "tt62341489fd0f437a",
              extraData: {}
            } ],
            success: function success(res) {
              console.log("success", res.errMsg);
            },
            fail: function fail(res) {
              console.log("fail", res.errMsg);
            }
          });
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  com: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e25bakBQd9I5LmDR7yLx+Jf", "com");
    "use strict";
    var com = function com() {};
    com.dateStr = function(t) {
      var e = t.getMonth() + 1, n = t.getDate(), i = t.getHours(), s = t.getMinutes(), a = t.getSeconds();
      return t.getFullYear() + "-" + (10 > e ? "0" + e : "" + e) + "-" + (10 > n ? "0" + n : "" + n) + " " + (10 > i ? "0" + i : "" + i) + ":" + (10 > s ? "0" + s : "" + s) + ":" + (10 > a ? "0" + a : "" + a);
    }, com.strDate = function(t) {
      switch (t.length) {
       case 8:
        var t = t.split(":"), e = new Date();
        return e.setTime(0), e.setUTCHours(t[0]), e.setUTCMinutes(t[1]), e.setUTCSeconds(t[2]), 
        e;

       case 10:
        return t = t.split("-"), new Date(t[0], t[1] - 1, t[2], 0, 0, 0);

       case 19:
        return e = t.split(" "), t = e[0].split("-"), e = e[1].split(":"), new Date(t[0], t[1] - 1, t[2], e[0], e[1], e[2]);

       default:
        throw "Invalid date format : " + t;
      }
    };
    com.cca = function(t, e) {
      var n = t.charCodeAt(e);
      return n != n ? void 0 : n;
    };
    com.substr = function(t, e, n) {
      return null != e && 0 != e && null != n && 0 > n ? "" : (null == n && (n = t.length), 
      0 > e ? (e = t.length + e, 0 > e && (e = 0)) : 0 > n && (n = t.length + n - e), 
      t.substr(e, n));
    };
    com.remove = function(t, e) {
      var n = t.indexOf(e);
      return -1 != n && (t.splice(n, 1), !0);
    };
    com.iter = function(t) {
      return {
        cur: 0,
        arr: t,
        hasNext: function hasNext() {
          return this.cur < this.arr.length;
        },
        next: function next() {
          return this.arr[this.cur++];
        }
      };
    };
    cc._RF.pop();
  }, {} ],
  consts: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f36fcCR/lBD/qmR2CZ3f4L4", "consts");
    "use strict";
    var consts = {
      CLIENT_GAME_START: "client.onGameStart",
      LOCAL_EVENT_POPUP_LOADTIP: "localEventPopupLoadTip",
      LOCAL_EVENT_POPUP_DIALOG: "localEventPopupDialog",
      LOCAL_EVENT_POPUP_GAME_COMMON: "localEventPopupGameCommon",
      LOCAL_GAME_RESULT_NATIVE_AD: "client.onResultNativeAD",
      CLIENT_GAME_VIDEO_SHOW: "client.onGameShowVideo",
      CLIENT_GAME_RESULT_VIDEO_SHOW: "client.onGameResultShowVideo",
      CLIENT_GAME_PLAY_VIDEO: "client.onGamePlayVideo",
      HTTP_RECORD_SERVER: "https://l.h5120.com/te/tk/gameapplist",
      HTTP_EVENT_MIDDLE_DESK_CONFIG: "client.onGameMiddleDeskConfig",
      HTTP_RECORD_PACKAGE: "com.snmi.crazyremove",
      HTTP_RECORD_PACKAGENAME: "\u75af\u72c2\u6d88\u6d88\u6d88",
      GAME_ID: 15,
      HTTP_GET_PAAS_DATA_SERVER: "https://cs.snmi.cn/game/GetGameValue",
      HTTP_GET_GAME_DATA_SERVER: "https://cs.snmi.cn/switch/GetGameValue",
      HTTP_SPREAD_WORD: "https://s.snmi.cn/game/kl",
      HTTP_SPREAD_REPORT: "https://t.h5data.com/d/gkl?",
      HTTP_SPREAD_CLOSE: "https://t.h5data.com/d/gclose?rid="
    };
    module.exports = consts;
    cc._RF.pop();
  }, {} ],
  dialogBox: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b7b24I8RWhMxIogfhVLnP+c", "dialogBox");
    "use strict";
    var DialogBox = cc.Class({
      extends: cc.Component,
      properties: {
        titleLabel: cc.Label,
        contentLabel: cc.Label,
        confirmButton: cc.Button,
        cancelButton: cc.Button,
        okButton: cc.Button,
        confirmLabel: cc.Label,
        cancelLabel: cc.Label,
        okLabel: cc.Label,
        confirmCallback: null,
        cancelCallback: null
      },
      onLoad: function onLoad() {
        this.confirmButton.node.active = false;
        this.okButton.node.active = false;
        this.cancelButton.node.active = false;
        this.confirmButton.node.on(cc.Node.EventType.TOUCH_END, this.onConfirmBtnClicked, this);
        this.cancelButton.node.on(cc.Node.EventType.TOUCH_END, this.onCancelBtnClicked, this);
        this.okButton.node.on(cc.Node.EventType.TOUCH_END, this.onOkBtnClicked, this);
      },
      onConfirmBtnClicked: function onConfirmBtnClicked() {
        this.confirmCallback && this.confirmCallback();
        this.hide();
      },
      onCancelBtnClicked: function onCancelBtnClicked() {
        this.cancelCallback && this.cancelCallback();
        this.hide();
      },
      onOkBtnClicked: function onOkBtnClicked() {
        this.onConfirmBtnClicked();
        this.hide();
      },
      show: function show(opts) {
        opts = opts || {};
        opts.content && (this.contentLabel.string = opts.content);
        this.confirmLabel.string = opts.confirmLabel || "";
        this.cancelLabel.string = opts.cancelLabel || "";
        this.okLabel.string = opts.okLabel || "";
        this.confirmCallback = opts.confirmCB || opts.okCB;
        this.cancelCallback = opts.cancelCB;
        this.okButton.node.active = !!opts.okCB;
        this.confirmButton.node.active = !opts.okCB;
        this.cancelButton.node.active = !opts.okCB;
      },
      hide: function hide() {
        this.node.removeFromParent();
      }
    });
    module.exports = DialogBox;
    cc._RF.pop();
  }, {} ],
  easing: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e6742QWT6FGKZZTNPiWFV4s", "easing");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.easeInOutBounce = exports.easeOutBounce = exports.easeInBounce = exports.easeInOutBack = exports.easeOutBack = exports.easeInBack = exports.easeInOutElastic = exports.easeOutElastic = exports.easeInElastic = exports.easeInOutCirc = exports.easeOutCirc = exports.easeInCirc = exports.easeInOutExpo = exports.easeOutExpo = exports.easeInExpo = exports.easeInOutSine = exports.easeOutSine = exports.easeInSine = exports.easeInOutQuint = exports.easeOutQuint = exports.easeInQuint = exports.easeInOutQuart = exports.easeOutQuart = exports.easeInQuart = exports.easeInOutCubic = exports.easeOutCubic = exports.easeInCubic = exports.easeInOutQuad = exports.easeOutQuad = exports.easeInQuad = exports.linear = void 0;
    function linear(t, b, c, d) {
      return c * t / d + b;
    }
    exports.linear = linear;
    function easeInQuad(elapsed, initialValue, amountOfChange, duration) {
      return amountOfChange * (elapsed /= duration) * elapsed + initialValue;
    }
    exports.easeInQuad = easeInQuad;
    function easeOutQuad(elapsed, initialValue, amountOfChange, duration) {
      return -amountOfChange * (elapsed /= duration) * (elapsed - 2) + initialValue;
    }
    exports.easeOutQuad = easeOutQuad;
    function easeInOutQuad(elapsed, initialValue, amountOfChange, duration) {
      if ((elapsed /= duration / 2) < 1) return amountOfChange / 2 * elapsed * elapsed + initialValue;
      return -amountOfChange / 2 * (--elapsed * (elapsed - 2) - 1) + initialValue;
    }
    exports.easeInOutQuad = easeInOutQuad;
    function easeInCubic(elapsed, initialValue, amountOfChange, duration) {
      return amountOfChange * (elapsed /= duration) * elapsed * elapsed + initialValue;
    }
    exports.easeInCubic = easeInCubic;
    function easeOutCubic(elapsed, initialValue, amountOfChange, duration) {
      return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed + 1) + initialValue;
    }
    exports.easeOutCubic = easeOutCubic;
    function easeInOutCubic(elapsed, initialValue, amountOfChange, duration) {
      if ((elapsed /= duration / 2) < 1) return amountOfChange / 2 * elapsed * elapsed * elapsed + initialValue;
      return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed + 2) + initialValue;
    }
    exports.easeInOutCubic = easeInOutCubic;
    function easeInQuart(elapsed, initialValue, amountOfChange, duration) {
      return amountOfChange * (elapsed /= duration) * elapsed * elapsed * elapsed + initialValue;
    }
    exports.easeInQuart = easeInQuart;
    function easeOutQuart(elapsed, initialValue, amountOfChange, duration) {
      return -amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed * elapsed - 1) + initialValue;
    }
    exports.easeOutQuart = easeOutQuart;
    function easeInOutQuart(elapsed, initialValue, amountOfChange, duration) {
      if ((elapsed /= duration / 2) < 1) return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed + initialValue;
      return -amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed - 2) + initialValue;
    }
    exports.easeInOutQuart = easeInOutQuart;
    function easeInQuint(elapsed, initialValue, amountOfChange, duration) {
      return amountOfChange * (elapsed /= duration) * elapsed * elapsed * elapsed * elapsed + initialValue;
    }
    exports.easeInQuint = easeInQuint;
    function easeOutQuint(elapsed, initialValue, amountOfChange, duration) {
      return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed * elapsed * elapsed + 1) + initialValue;
    }
    exports.easeOutQuint = easeOutQuint;
    function easeInOutQuint(elapsed, initialValue, amountOfChange, duration) {
      if ((elapsed /= duration / 2) < 1) return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed * elapsed + initialValue;
      return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed * elapsed + 2) + initialValue;
    }
    exports.easeInOutQuint = easeInOutQuint;
    function easeInSine(elapsed, initialValue, amountOfChange, duration) {
      return -amountOfChange * Math.cos(elapsed / duration * (Math.PI / 2)) + amountOfChange + initialValue;
    }
    exports.easeInSine = easeInSine;
    function easeOutSine(elapsed, initialValue, amountOfChange, duration) {
      return amountOfChange * Math.sin(elapsed / duration * (Math.PI / 2)) + initialValue;
    }
    exports.easeOutSine = easeOutSine;
    function easeInOutSine(elapsed, initialValue, amountOfChange, duration) {
      return -amountOfChange / 2 * (Math.cos(Math.PI * elapsed / duration) - 1) + initialValue;
    }
    exports.easeInOutSine = easeInOutSine;
    function easeInExpo(elapsed, initialValue, amountOfChange, duration) {
      return 0 === elapsed ? initialValue : amountOfChange * Math.pow(2, 10 * (elapsed / duration - 1)) + initialValue;
    }
    exports.easeInExpo = easeInExpo;
    function easeOutExpo(elapsed, initialValue, amountOfChange, duration) {
      return elapsed === duration ? initialValue + amountOfChange : amountOfChange * (1 - Math.pow(2, -10 * elapsed / duration)) + initialValue;
    }
    exports.easeOutExpo = easeOutExpo;
    function easeInOutExpo(elapsed, initialValue, amountOfChange, duration) {
      if (0 === elapsed) return initialValue;
      if (elapsed === duration) return initialValue + amountOfChange;
      if ((elapsed /= duration / 2) < 1) return amountOfChange / 2 * Math.pow(2, 10 * (elapsed - 1)) + initialValue;
      return amountOfChange / 2 * (2 - Math.pow(2, -10 * --elapsed)) + initialValue;
    }
    exports.easeInOutExpo = easeInOutExpo;
    function easeInCirc(elapsed, initialValue, amountOfChange, duration) {
      return -amountOfChange * (Math.sqrt(1 - (elapsed /= duration) * elapsed) - 1) + initialValue;
    }
    exports.easeInCirc = easeInCirc;
    function easeOutCirc(elapsed, initialValue, amountOfChange, duration) {
      return amountOfChange * Math.sqrt(1 - (elapsed = elapsed / duration - 1) * elapsed) + initialValue;
    }
    exports.easeOutCirc = easeOutCirc;
    function easeInOutCirc(elapsed, initialValue, amountOfChange, duration) {
      if ((elapsed /= duration / 2) < 1) return -amountOfChange / 2 * (Math.sqrt(1 - elapsed * elapsed) - 1) + initialValue;
      return amountOfChange / 2 * (Math.sqrt(1 - (elapsed -= 2) * elapsed) + 1) + initialValue;
    }
    exports.easeInOutCirc = easeInOutCirc;
    function easeInElastic(elapsed, initialValue, amountOfChange, duration) {
      var s = 1.70158;
      var p = 0;
      var a = amountOfChange;
      if (0 === elapsed) return initialValue;
      if (1 === (elapsed /= duration)) return initialValue + amountOfChange;
      p || (p = .3 * duration);
      if (a < Math.abs(amountOfChange)) {
        a = amountOfChange;
        s = p / 4;
      } else s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
      return -a * Math.pow(2, 10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p) + initialValue;
    }
    exports.easeInElastic = easeInElastic;
    function easeOutElastic(elapsed, initialValue, amountOfChange, duration) {
      var s = 1.70158;
      var p = 0;
      var a = amountOfChange;
      if (0 === elapsed) return initialValue;
      if (1 === (elapsed /= duration)) return initialValue + amountOfChange;
      p || (p = .3 * duration);
      if (a < Math.abs(amountOfChange)) {
        a = amountOfChange;
        s = p / 4;
      } else s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
      return a * Math.pow(2, -10 * elapsed) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p) + amountOfChange + initialValue;
    }
    exports.easeOutElastic = easeOutElastic;
    function easeInOutElastic(elapsed, initialValue, amountOfChange, duration) {
      var s = 1.70158;
      var p = 0;
      var a = amountOfChange;
      if (0 === elapsed) return initialValue;
      if (2 === (elapsed /= duration / 2)) return initialValue + amountOfChange;
      p || (p = duration * (.3 * 1.5));
      if (a < Math.abs(amountOfChange)) {
        a = amountOfChange;
        s = p / 4;
      } else s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
      if (elapsed < 1) return a * Math.pow(2, 10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p) * -.5 + initialValue;
      return a * Math.pow(2, -10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p) * .5 + amountOfChange + initialValue;
    }
    exports.easeInOutElastic = easeInOutElastic;
    function easeInBack(elapsed, initialValue, amountOfChange, duration, s) {
      void 0 === s && (s = 1.70158);
      return amountOfChange * (elapsed /= duration) * elapsed * ((s + 1) * elapsed - s) + initialValue;
    }
    exports.easeInBack = easeInBack;
    function easeOutBack(elapsed, initialValue, amountOfChange, duration, s) {
      void 0 === s && (s = 1.70158);
      return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * ((s + 1) * elapsed + s) + 1) + initialValue;
    }
    exports.easeOutBack = easeOutBack;
    function easeInOutBack(elapsed, initialValue, amountOfChange, duration, s) {
      void 0 === s && (s = 1.70158);
      if ((elapsed /= duration / 2) < 1) return amountOfChange / 2 * (elapsed * elapsed * ((1 + (s *= 1.525)) * elapsed - s)) + initialValue;
      return amountOfChange / 2 * ((elapsed -= 2) * elapsed * ((1 + (s *= 1.525)) * elapsed + s) + 2) + initialValue;
    }
    exports.easeInOutBack = easeInOutBack;
    function easeInBounce(elapsed, initialValue, amountOfChange, duration) {
      return amountOfChange - easeOutBounce(duration - elapsed, 0, amountOfChange, duration) + initialValue;
    }
    exports.easeInBounce = easeInBounce;
    function easeOutBounce(elapsed, initialValue, amountOfChange, duration) {
      return (elapsed /= duration) < 1 / 2.75 ? amountOfChange * (7.5625 * elapsed * elapsed) + initialValue : elapsed < 2 / 2.75 ? amountOfChange * (7.5625 * (elapsed -= 1.5 / 2.75) * elapsed + .75) + initialValue : elapsed < 2.5 / 2.75 ? amountOfChange * (7.5625 * (elapsed -= 2.25 / 2.75) * elapsed + .9375) + initialValue : amountOfChange * (7.5625 * (elapsed -= 2.625 / 2.75) * elapsed + .984375) + initialValue;
    }
    exports.easeOutBounce = easeOutBounce;
    function easeInOutBounce(elapsed, initialValue, amountOfChange, duration) {
      if (elapsed < duration / 2) return .5 * easeInBounce(2 * elapsed, 0, amountOfChange, duration) + initialValue;
      return .5 * easeOutBounce(2 * elapsed - duration, 0, amountOfChange, duration) + .5 * amountOfChange + initialValue;
    }
    exports.easeInOutBounce = easeInOutBounce;
    cc._RF.pop();
  }, {} ],
  emitter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bebe1jW6dZFa5TewiY9r4WZ", "emitter");
    "use strict";
    module.exports = Emitter;
    window.EventEmitter = Emitter;
    function Emitter(obj) {
      if (obj) return mixin(obj);
    }
    function mixin(obj) {
      for (var key in Emitter.prototype) obj[key] = Emitter.prototype[key];
      return obj;
    }
    Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn, obj) {
      var fun = null;
      if (fn && obj) {
        fun = fn.bind(obj);
        fun.fn = fn;
      } else fun = fn;
      this._callbacks = this._callbacks || {};
      (this._callbacks[event] = this._callbacks[event] || []).push(fun);
      return this;
    };
    Emitter.prototype.once = function(event, fn, obj) {
      var self = this;
      this._callbacks = this._callbacks || {};
      function on() {
        self.off(event, on);
        fn.apply(obj || this, arguments);
      }
      on.fn = fn;
      this._callbacks = this._callbacks || {};
      (this._callbacks[event] = this._callbacks[event] || []).push(on);
      return this;
    };
    Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeEventListener = function(event, fn) {
      this._callbacks = this._callbacks || {};
      if (0 == arguments.length) {
        this._callbacks = {};
        return this;
      }
      var callbacks = this._callbacks[event];
      if (!callbacks) return this;
      if (1 == arguments.length) {
        delete this._callbacks[event];
        return this;
      }
      var cb;
      for (var i = 0; i < callbacks.length; i++) {
        cb = callbacks[i];
        if (cb === fn || cb.fn === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }
      return this;
    };
    Emitter.prototype.emit = function(event) {
      this._callbacks = this._callbacks || {};
      var args = [].slice.call(arguments, 1), callbacks = this._callbacks[event];
      if (callbacks) {
        callbacks = callbacks.slice(0);
        for (var i = 0, len = callbacks.length; i < len; ++i) callbacks[i].apply(this, args);
      }
      return this;
    };
    Emitter.prototype.listeners = function(event) {
      this._callbacks = this._callbacks || {};
      return this._callbacks[event] || [];
    };
    Emitter.prototype.hasListeners = function(event) {
      return !!this.listeners(event).length;
    };
    cc._RF.pop();
  }, {} ],
  "g - 001": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bfe6ayXISRPGJZU9+VRaz62", "g - 001");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = "hello";
        return _this;
      }
      NewClass.prototype.start = function() {};
      NewClass.prototype.randomInt = function(min, max) {
        if (null == max) {
          max = min;
          min = 0;
        }
        var val = Math.random() * (max - min);
        return Math.floor(val) + min;
      };
      NewClass.prototype.getRandomInArray = function(arr) {
        if (arr) return arr[g.randomInt(0, arr.length)];
      };
      NewClass.prototype.randomFloat = function(min, max) {
        return Math.random() * (max - min) + min;
      };
      NewClass.prototype.isNextDay = function(timeSec) {
        return g.isGreaterDate(new Date(), new Date(timeSec));
      };
      NewClass.prototype.isGreaterDate = function(now, before) {
        var diff = now.getTime() - before.getTime();
        return diff > 864e5 || diff > 0 && now.getDate() != before.getDate();
      };
      __decorate([ property(cc.Label) ], NewClass.prototype, "label", void 0);
      __decorate([ property ], NewClass.prototype, "text", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  gameSceneManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6be4flAQQJHL6gxxNXHg9Az", "gameSceneManager");
    "use strict";
    var AppGame = null;
    var GameSceneManager = cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        if (null == AppGame) {
          AppGame = require("appGame");
          AppGame.init();
          this.initAppData(function() {
            var RoomGame = require("roomGame");
            appGame.gameServerRoom = RoomGame.create({});
          }.bind(this));
        }
        appGame.emitter.on(consts.HTTP_EVENT_MIDDLE_DESK_CONFIG, this.refreshGameConfig);
        appGame.emitter.on(consts.LOCAL_EVENT_POPUP_LOADTIP, this.showLoadTipFun);
        appGame.emitter.on(consts.LOCAL_EVENT_POPUP_DIALOG, this.showDialogFun);
        appGame.emitter.on(consts.LOCAL_EVENT_POPUP_GAME_COMMON, this.showCommonUIFun);
      },
      onDestroy: function onDestroy() {
        appGame.emitter.off(consts.HTTP_EVENT_MIDDLE_DESK_CONFIG, this.refreshGameConfig);
        appGame.emitter.off(consts.LOCAL_EVENT_POPUP_DIALOG, this.showDialogFun);
        appGame.emitter.off(consts.LOCAL_EVENT_POPUP_LOADTIP, this.showLoadTipFun);
        appGame.emitter.off(consts.LOCAL_EVENT_POPUP_GAME_COMMON, this.showCommonUIFun);
      },
      refreshGameConfig: function refreshGameConfig(data) {
        var VideoBanner = require("videoBanner");
        appGame.videoBanner = VideoBanner.create({});
        var InterstitialAd = require("interstitialAd");
        appGame.interstitialAd = InterstitialAd.create({});
        var Banner = require("banner");
        appGame.banner = Banner.create({});
        var WXNativeAd = require("wxnativeAd");
        appGame.nativeAd = WXNativeAd.create({});
        var WXGridAd = require("wxgridAd");
        appGame.gridAd = WXGridAd.create({});
        var qqAppBox = require("qqAppBox");
        appGame.qqappbox = qqAppBox.create({});
        var qqBlockAd = require("qqBlockAd");
        appGame.qqblockad = qqBlockAd.create({});
      },
      initAppData: function initAppData(cb) {
        appGame.userId = cc.sys.localStorage.getItem("snmi_guid");
        if (null == appGame.userId || "" == appGame.userId) {
          appGame.userId = util.guid();
          cc.sys.localStorage.setItem("snmi_guid", appGame.userId);
        }
        cc.sys.platform === cc.sys.VIVO_GAME ? qg && qg.getSystemInfo({
          success: function success(data) {
            appGame.deviceInfo = data;
          }
        }) : cc.sys.platform == cc.sys.BAIDU_GAME ? swan.getSystemInfo({
          success: function success(res) {
            console.log(res);
            appGame.deviceInfo = res;
          },
          fail: function fail(res) {
            console.log("getSystemInfo \u8c03\u7528\u5931\u8d25");
          }
        }) : cc.sys.platform == cc.sys.BYTEDANCE_GAME ? tt.getSystemInfo({
          success: function success(res) {
            console.log(res);
            appGame.deviceInfo = res;
          },
          fail: function fail(res) {
            console.log("getSystemInfo \u8c03\u7528\u5931\u8d25");
          }
        }) : cc.sys.platform == cc.sys.MOBILE_BROWSER || cc.sys.platform == cc.sys.DESKTOP_BROWSER ? appGame.deviceInfo = "" : cc.sys.platform == cc.sys.OPPO_GAME ? qg.getSystemInfo({
          success: function success(res) {
            appGame.deviceInfo = res;
          },
          fail: function fail(err) {},
          complete: function complete(res) {}
        }) : cc.sys.platform == cc.sys.XIAOMI_GAME ? qg.getSystemInfo({
          success: function success(res) {
            appGame.deviceInfo = res;
          },
          fail: function fail(err) {},
          complete: function complete(res) {}
        }) : (cc.sys.platform == cc.sys.ANDROID, appGame.deviceInfo = "");
        if ("html5" == appGame.platform) {
          var snmi_entertime = cc.sys.localStorage.getItem("snmi_loadtime");
          var enterTime = 0;
          null != snmi_entertime && (enterTime = new Date().getTime() - parseInt(snmi_entertime));
          enterTime = (enterTime / 1e3).toFixed(2);
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: "\u8fdb\u5165APP",
            content: "\u8fdb\u5165\u65f6\u957f",
            desc: enterTime + "\u79d2"
          }, function() {});
        } else httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u767b\u5f55",
          content: "\u8fdb\u5165\u4e3b\u754c\u9762"
        }, function() {});
        var countEnter = cc.sys.localStorage.getItem("snmi_bingdu_entercount");
        if (null == countEnter || "" == countEnter) {
          countEnter = 1;
          cc.sys.localStorage.setItem("snmi_bingdu_entercount", 1);
        } else {
          countEnter = parseInt(countEnter);
          countEnter++;
          cc.sys.localStorage.setItem("snmi_bingdu_entercount", countEnter);
        }
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u6253\u5f00APP",
          content: "\u8fdb\u5165\u6e38\u620f\u6b21\u6570\u7edf\u8ba1",
          desc: countEnter + "\u6b21"
        }, function() {});
        cb();
      },
      disConnectFun: function disConnectFun() {
        appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_DIALOG, {
          title: "\u63d0\u793a",
          content: "\u7f51\u7edc\u5df2\u65ad\u5f00\n\u662f\u5426\u9000\u51fa\u91cd\u8fde\uff1f",
          okLabel: "\u786e\u5b9a",
          okCB: function() {}.bind(this)
        });
      },
      showCommonUIFun: function showCommonUIFun(opts) {
        var popupPanelEventCallback = function popupPanelEventCallback(opts, zIndex, cb) {
          if (opts && opts.prefabName) {
            cc.log("prefabName==" + opts.prefabName);
            cc.assetManager.loadBundle("comPrefab", function(err, bundle) {
              bundle.load(opts.prefabName, cc.Prefab, function(error, prefab) {
                if (error) {
                  cc.error(error);
                  return;
                }
                var isShowing = false;
                var canvasParent = cc.find("Canvas");
                if (canvasParent.childrenCount > 0) for (var i = 0; i < canvasParent.children.length; i++) if (canvasParent.children[i].name == opts.prefabName) {
                  isShowing = true;
                  break;
                }
                if (isShowing) return;
                var instance = cc.instantiate(prefab);
                canvasParent.addChild(instance);
                var controlComponent = instance.getComponent(opts.prefabName);
                controlComponent && controlComponent.show && controlComponent.show(opts);
                instance.zIndex = zIndex;
                instance.active = true;
                cb && cb(null, instance);
              }.bind(this));
            }.bind(this));
          }
        };
        opts = opts || {};
        popupPanelEventCallback(opts, opts.zIndex || 1300);
      },
      showDialogFun: function showDialogFun(opts) {
        var popupPanelEventCallback = function popupPanelEventCallback(prefabName, opts, zIndex, cb) {
          cc.assetManager.loadBundle("comPrefab", function(err, bundle) {
            bundle.load(prefabName, cc.Prefab, function(error, prefab) {
              if (error) {
                cc.error(error);
                return;
              }
              var canvasParent = cc.find("Canvas");
              if (canvasParent.childrenCount > 0) for (var i = 0; i < canvasParent.children.length; i++) "dialogBox" == canvasParent.children[i].name && canvasParent.children[i].removeFromParent();
              var instance = cc.instantiate(prefab);
              canvasParent.addChild(instance);
              var controlComponent = instance.getComponent(prefabName);
              controlComponent && controlComponent.show && controlComponent.show(opts);
              instance.zIndex = zIndex;
              instance.active = true;
              cb && cb(null, instance);
            }.bind(this));
          }.bind(this));
        };
        opts = opts || {};
        popupPanelEventCallback("dialogBox", opts, opts.zIndex || 1400);
      },
      showLoadTipFun: function showLoadTipFun(opts) {
        var popupPanelEventCallback = function popupPanelEventCallback(prefabName, opts, zIndex, cb) {
          cc.assetManager.loadBundle("comPrefab", function(err, bundle) {
            bundle.load(prefabName, cc.Prefab, function(error, prefab) {
              if (error) {
                cc.error(error);
                return;
              }
              var canvasParent = cc.find("Canvas");
              if (canvasParent.childrenCount > 0) for (var i = 0; i < canvasParent.children.length; i++) "loadTip" == canvasParent.children[i].name && canvasParent.children[i].removeFromParent();
              var instance = cc.instantiate(prefab);
              canvasParent.addChild(instance);
              var controlComponent = instance.getComponent(prefabName);
              controlComponent && controlComponent.show && controlComponent.show(opts);
              instance.zIndex = zIndex;
              instance.active = true;
              cb && cb(null, instance);
            }.bind(this));
          }.bind(this));
        };
        opts = opts || {};
        popupPanelEventCallback("loadTip", opts, opts.zIndex || 1500);
      },
      showGameHelpFun: function showGameHelpFun(opts) {
        var popupPanelEventCallback = function popupPanelEventCallback(prefabName, opts, zIndex, cb) {
          var prefabPath = "gameComon/prefab/" + prefabName;
          cc.loader.loadRes(prefabPath, cc.Prefab, function(error, prefab) {
            if (error) {
              cc.error(error);
              return;
            }
            var instance = cc.instantiate(prefab);
            cc.find("Canvas").addChild(instance);
            var controlComponent = instance.getComponent(prefabName);
            controlComponent && controlComponent.show && controlComponent.show(opts);
            instance.zIndex = zIndex;
            instance.active = true;
            cb && cb(null, instance);
          });
        };
        opts = opts || {};
        popupPanelEventCallback("helpPanel", opts, opts.zIndex || 1e3);
      }
    });
    module.exports = GameSceneManager;
    cc._RF.pop();
  }, {
    appGame: "appGame",
    banner: "banner",
    interstitialAd: "interstitialAd",
    qqAppBox: "qqAppBox",
    qqBlockAd: "qqBlockAd",
    roomGame: "roomGame",
    videoBanner: "videoBanner",
    wxgridAd: "wxgridAd",
    wxnativeAd: "wxnativeAd"
  } ],
  horn: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "40fbfZFpRVEpo0R8nzzeIHb", "horn");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        sprite: [ cc.SpriteFrame ],
        bg: cc.Sprite
      },
      onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClickTouchEnd, this);
        appGame.audioMgr.getMusicStatus(function(onOff) {
          this.bg.spriteFrame = onOff ? this.sprite[0] : this.sprite[1];
        }.bind(this));
      },
      start: function start() {},
      onClickTouchEnd: function onClickTouchEnd(event) {
        appGame.audioMgr.getMusicStatus(function(onOff) {
          appGame.audioMgr.setMusicOnOff(!onOff);
          this.bg.spriteFrame = onOff ? this.sprite[1] : this.sprite[0];
        }.bind(this));
      }
    });
    cc._RF.pop();
  }, {} ],
  httpUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1c82dl9OYBOLaaJO15Yt8bQ", "httpUtils");
    "use strict";
    module.exports = {
      onLoad: function onLoad() {},
      httpGet: function httpGet(url, cb) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (4 === xhr.readyState && xhr.status >= 200 && xhr.status < 300) {
            var respone = xhr.responseText;
            cb && cb(null, respone);
          } else 4 === xhr.readyState && (xhr.status > 400 || 0 == xhr.status) && cb && cb(xhr.status);
        };
        xhr.onerror = function(error) {
          cc.log("httpUtils onreadystatechange  onerror====" + xhr.readyState + "===" + xhr.status);
          (4 == xhr.readyState && 0 == xhr.status || 1 == xhr.readyState && 0 == xhr.status) && cb && cb(503);
        };
        cc.sys.isNative && xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        xhr.open("GET", url, true);
        xhr.timeout = 5e3;
        xhr.send();
      },
      httpGets: function httpGets(url, callback) {
        cc.log("url==" + url);
        var xhr = cc.loader.getXMLHttpRequest();
        var timedout = false;
        var timer = setTimeout(function() {
          timedout = true;
          xhr.abort();
          callback();
        }, 2e3);
        xhr.onreadystatechange = function() {
          if (4 == xhr.readyState) {
            if (timedout) return;
            clearTimeout(timer);
            if (xhr.status >= 200 && xhr.status < 300) {
              var respone = xhr.responseText;
              respone && callback(respone);
            } else (xhr.status > 400 || 0 == xhr.status) && callback("false");
          }
        };
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        cc.sys.isNative && xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        xhr.send();
      },
      httpPost: function httpPost(url, params, callback) {
        var query = [];
        var snmiguid = cc.sys.localStorage.getItem("snmi_guid");
        query["snmi"] = encodeURIComponent(JSON.stringify(snmiguid));
        query["deviceInfo"] = encodeURIComponent(JSON.stringify(appGame.deviceInfo));
        query["timestamp"] = new Date().getTime();
        var info = {
          package: consts.HTTP_RECORD_PACKAGE,
          packageName: consts.HTTP_RECORD_PACKAGENAME,
          packageVersion: appGame.packageVersion,
          versionCode: "1",
          platfrom: appGame.platform
        };
        query["manifest"] = encodeURIComponent(JSON.stringify(info));
        query["title"] = encodeURIComponent(params.title);
        query["content"] = encodeURIComponent(params.content);
        params.desc ? query["desc"] = encodeURIComponent(params.desc) : query["desc"] = encodeURIComponent("");
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (4 === xhr.readyState && xhr.status >= 200 && xhr.status < 300) {
            var respone = xhr.responseText;
            respone && callback(respone);
          } else callback(-1);
        };
        var geturl = url + "?" + Object.keys(query).map(function(key) {
          return key + "=" + query[key];
        }).join("&");
        xhr.open("GET", geturl, true);
        xhr.send();
      },
      httpSendRequest: function httpSendRequest(url, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        var timedout = false;
        var timer = setTimeout(function() {
          timedout = true;
          xhr.abort();
          callback(-1);
        }, 2e3);
        xhr.onreadystatechange = function() {
          if (4 == xhr.readyState) {
            if (timedout) return;
            clearTimeout(timer);
            if (xhr.status >= 200 && xhr.status < 300) {
              var respone = xhr.responseText;
              if (respone) {
                var respones = JSON.parse(respone);
                callback(respones);
              } else callback(1);
            } else (xhr.status > 400 || 0 == xhr.status) && callback(-1);
          }
        };
        xhr.open("POST", url, true);
        xhr.send();
      },
      httpPostParam: function httpPostParam(url, params, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function() {
          console.log("xhr.readyState=" + xhr.readyState + "  xhr.status=" + xhr.status);
          if (4 === xhr.readyState && xhr.status >= 200 && xhr.status < 300) {
            var respone = xhr.responseText;
            if (respone) {
              var pars = JSON.parse(respone);
              callback(pars);
            }
          } else callback(-1);
        };
        xhr.open("POST", url, true);
        xhr.timeout = 5e3;
        var payload = JSON.stringify(params);
        xhr.send(payload);
      },
      loadNetToNativeImg: function loadNetToNativeImg(url, callback) {
        var dirpath = jsb.fileUtils.getWritablePath() + "img/";
        var filepath = dirpath + MD5(url) + ".png";
        function loadEnd() {
          cc.loader.load(filepath, function(err, tex) {
            if (err) cc.error(err); else {
              var spriteFrame = new cc.SpriteFrame(tex);
              if (spriteFrame) {
                spriteFrame.retain();
                callback(spriteFrame);
              }
            }
          });
        }
        if (jsb.fileUtils.isFileExist(filepath)) {
          cc.log("Remote is find" + filepath);
          loadEnd();
          return;
        }
        var saveFile = function saveFile(data) {
          if ("undefined" !== typeof data) {
            jsb.fileUtils.isDirectoryExist(dirpath) || jsb.fileUtils.createDirectory(dirpath);
            if (jsb.fileUtils.writeDataToFile(new Uint8Array(data), filepath)) {
              cc.log("Remote write file succeed.");
              loadEnd();
            } else cc.log("Remote write file failed.");
          } else cc.log("Remote download file failed.");
        };
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          cc.log("xhr.readyState  " + xhr.readyState);
          cc.log("xhr.status  " + xhr.status);
          if (4 === xhr.readyState) if (200 === xhr.status) {
            xhr.responseType = "arraybuffer";
            saveFile(xhr.response);
          } else saveFile(null);
        }.bind(this);
        xhr.open("GET", url, true);
        xhr.send();
      }
    };
    cc._RF.pop();
  }, {} ],
  interstitialAd: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "65bb3OPXhxMDIngU6dETA4S", "interstitialAd");
    "use strict";
    var adUnitId = "";
    var InterstitialAd = cc.Class({
      properties: {},
      ctor: function ctor() {
        this.instance = null;
      },
      statics: {
        create: function create(data) {
          if (!this.instance) {
            this.instance = new InterstitialAd();
            this.instance.initWithData(data);
            return this.instance;
          }
        }
      },
      initWithData: function initWithData(data) {
        this.adId = "";
        if (cc.sys.platform == cc.sys.WECHAT_GAME && "QQ" == appGame.platform) {
          this.adId = "d0cde0940f440d92729726f90c72d71a";
          appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.interstitialId && appGame.gameServerRoom.commonConfig.interstitialId.QQ && (this.adId = appGame.gameServerRoom.commonConfig.interstitialId.QQ.adUnitId);
          this.globalData = {
            interstitialAd: qq.createInterstitialAd({
              adUnitId: this.adId
            })
          };
          console.log("\u63d2\u5c4f\u5e7f\u544a==" + this.adId);
        } else if (cc.sys.platform == cc.sys.WECHAT_GAME && "WX" == appGame.platform) {
          this.adId = "c5b484afd6953432";
          appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.interstitialId && appGame.gameServerRoom.commonConfig.interstitialId.WX && (this.adId = appGame.gameServerRoom.commonConfig.interstitialId.WX.adUnitId);
        } else if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
          this.adId = "15c24vd9ppqti8jgb3";
          appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.interstitialId && appGame.gameServerRoom.commonConfig.interstitialId.toutiao && (this.adId = appGame.gameServerRoom.commonConfig.interstitialId.toutiao.adUnitId);
        }
      },
      playAd: function playAd(sceneId) {
        var _this = this;
        console.log("\u64ad\u653e\u63d2\u5c4f\u5e7f\u544a==");
        if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
          if (this.globalData && this.globalData.interstitialAd) {
            this.globalData.interstitialAd.destroy();
            this.globalData.interstitialAd = null;
          }
          this.globalData = {
            interstitialAd: tt.createInterstitialAd({
              adUnitId: this.adId
            })
          };
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: "\u5e7f\u544a\u4f4d\u63d2\u5c4f",
            content: "\u521b\u5efa\u6210\u529f+\u5e7f\u544a\u4f4d+" + this.adId
          }, function() {});
          this.globalData.interstitialAd.load().then(function() {
            console.log("\u63d2\u5c4f\u663e\u793a\u6210\u529f");
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: "\u63d2\u5c4f\u5e7f\u544a",
              content: "\u663e\u793a\u6210\u529f"
            }, function() {});
            return _this.globalData.interstitialAd.show();
          })["catch"](function(err) {
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: "\u63d2\u5c4f\u5e7f\u544a",
              content: "\u663e\u793a\u5931\u8d25"
            }, function() {});
            console.log("\u63d2\u5c4f\u7ec4\u4ef6\u51fa\u73b0\u95ee\u9898", err);
          });
          this.globalData.interstitialAd.onError(function(listener) {
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: "\u5e7f\u544a\u4f4d\u63d2\u5c4f",
              content: "\u5c55\u793a\u5931\u8d25+\u5e7f\u544a\u4f4d+" + _this.adId + "\u539f\u56e0+" + listener.errMsg
            }, function() {});
          });
        } else if (cc.sys.platform == cc.sys.WECHAT_GAME) {
          console.log("\u64ad\u653e\u63d2\u5c4f\u5e7f\u544a==");
          if (this.globalData && this.globalData.interstitialAd) {
            this.globalData.interstitialAd.destroy();
            this.globalData.interstitialAd = null;
          }
          appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.interstitialId && appGame.gameServerRoom.commonConfig.interstitialId.QQ && (this.adId = appGame.gameServerRoom.commonConfig.interstitialId.QQ.adUnitId);
          this.globalData = {
            interstitialAd: qq.createInterstitialAd({
              adUnitId: this.adId
            })
          };
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: "\u5e7f\u544a\u4f4d\u63d2\u5c4f",
            content: "\u521b\u5efa\u6210\u529f+\u5e7f\u544a\u4f4d+" + this.adId
          }, function() {});
          this.globalData.interstitialAd.show()["catch"](function(err) {
            console.error("show", err);
          });
          this.globalData.interstitialAd.load().then(function() {
            console.log("\u63d2\u5c4f\u663e\u793a\u6210\u529f");
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: "\u63d2\u5c4f\u5e7f\u544a",
              content: "\u573a\u666f:" + sceneId,
              desc: "\u663e\u793a\u6210\u529f"
            }, function() {});
            return _this.globalData.interstitialAd.show();
          })["catch"](function(err) {
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: "\u63d2\u5c4f\u5e7f\u544a",
              content: "\u573a\u666f:" + sceneId,
              desc: "\u663e\u793a\u5931\u8d25"
            }, function() {});
            console.log("\u63d2\u5c4f\u7ec4\u4ef6\u51fa\u73b0\u95ee\u9898", err);
          });
          this.globalData.interstitialAd.onError(function(listener) {
            console.log("\u5f53\u524d\u5e73\u53f022 ==" + cc.sys.platform);
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: "\u5e7f\u544a\u4f4d\u63d2\u5c4f",
              content: "\u5c55\u793a\u5931\u8d25+\u5e7f\u544a\u4f4d+" + interId + "\u539f\u56e0+" + listener.errMsg
            }, function() {});
          });
        } else {
          console.log("\u63d2\u5c4f\u5e7f\u544a11id==" + this.adId);
          if (this.globalData && this.globalData.interstitialAd) {
            console.log("\u63d2\u5c4f\u5e7f\u544a22id==" + this.adId);
            var interstitialAd = this.globalData.interstitialAd;
            interstitialAd.load().then(function() {
              console.log("\u63d2\u5c4f\u663e\u793a\u6210\u529f");
              httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
                title: "\u5e7f\u544a\u4f4d\u63d2\u5c4f",
                content: "\u52a0\u8f7d\u6210\u529f+\u5e7f\u544a\u4f4d+" + _this.adId
              }, function() {});
              httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
                title: "\u5e7f\u544a\u4f4d\u63d2\u5c4f",
                content: "\u5c55\u793a\u6210\u529f+\u5e7f\u544a\u4f4d+" + _this.adId
              }, function() {});
              return interstitialAd.show();
            })["catch"](function(err) {
              httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
                title: "\u5e7f\u544a\u4f4d\u63d2\u5c4f",
                content: "\u52a0\u8f7d\u5931\u8d25+\u5e7f\u544a\u4f4d+" + _this.adId
              }, function() {});
              console.log("\u63d2\u5c4f\u7ec4\u4ef6\u51fa\u73b0\u95ee\u9898", err);
            });
          }
        }
      }
    });
    module.exports = InterstitialAd;
    cc._RF.pop();
  }, {} ],
  item: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "37e7b3Qh2JMQ5/8DSX2ow5C", "item");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        cc.log("item onLoad");
        this.node.active = false;
      },
      start: function start() {},
      init: function init(id) {
        cc.log("item init");
        appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.item && underscore.each(appGame.gameServerRoom.commonConfig.item, function(key, value) {
          key.id == id && util.loadBundleSprite(key.bundle, key.sprite, this.node.getComponent(cc.Sprite), function() {
            this.node.active = true;
          }.bind(this));
        }.bind(this));
      }
    });
    cc._RF.pop();
  }, {} ],
  loadTip: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eec36KS2hZPVbBk7XsJ2C2d", "loadTip");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        contentLabel: cc.Label
      },
      onLoad: function onLoad() {
        this.contentLabel.string = "";
      },
      show: function show(opts) {
        opts = opts || {};
        if (opts.content) {
          this.node.active = true;
          this.contentLabel.string = opts.content;
          this.contentLabel._forceUpdateRenderData(true);
          var spaceWidth = this.contentLabel.node.getContentSize().width;
          var labelWidth = cc.view.getVisibleSize().width - 200;
          if (spaceWidth < labelWidth) {
            this.contentLabel.overflow = cc.Label.Overflow.NONE;
            this.contentLabel.node.width = spaceWidth;
            this.contentLabel.node.height = this.contentLabel.node.getContentSize().height;
            this.node.width = spaceWidth + 30;
            this.node.height = 80;
          } else {
            this.contentLabel.overflow = cc.Label.Overflow.CLAMP;
            this.contentLabel.enableWrapText = true;
            this.contentLabel.node.width = labelWidth;
            this.contentLabel.node.height = this.contentLabel.node.getContentSize().height + 40 * Math.floor(spaceWidth / labelWidth);
            this.node.width = labelWidth + 30;
            this.node.height = 80 + 50 * Math.floor(spaceWidth / labelWidth);
          }
        }
        this.node.opacity = 0;
        this.node.stopAllActions();
        this.node.runAction(cc.sequence(cc.fadeIn(.5), cc.delayTime(1), cc.callFunc(function() {
          this.node.active = false;
        }.bind(this))));
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  lucky: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "70c5be0DtlNPI44MyAR/Qdw", "lucky");
    "use strict";
    var unsealtimeOut;
    var bannerTimeOut;
    cc.Class({
      extends: cc.Component,
      properties: {
        touchHide: cc.Node,
        touch: cc.Node,
        leftBtn: cc.Node,
        rightBtn: cc.Node,
        unsealBtn: cc.Button,
        closeBtn: cc.Button,
        getBtn: cc.Button,
        redDragon: dragonBones.ArmatureDisplay,
        infoLabel: cc.Label,
        itemReward: cc.Node,
        redLabel: cc.Label,
        openTouch: cc.Node,
        unsealBtnCallback: null,
        closeBtnCallback: null,
        redBagBtnCallback: null,
        blankCallback: null,
        getRewardCallBack: null
      },
      onLoad: function onLoad() {
        this.touchHide.on(cc.Node.EventType.TOUCH_END, this.clickTouchHideCallBack, this);
        this.touch.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.touch.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.openTouch.active = false;
        this.leftBtn.on(cc.Node.EventType.TOUCH_END, this.onLeftTouchEnd, this);
        this.rightBtn.on(cc.Node.EventType.TOUCH_END, this.onRightTouchEnd, this);
        this.unsealBtn.node.active = false;
        this.getBtn.node.active = false;
        this.closeBtn.node.active = false;
        this.closeBtn.node.on(cc.Node.EventType.TOUCH_END, this.clickTouchCloseCallBack, this);
        this.unsealBtn.node.on(cc.Node.EventType.TOUCH_END, this.onUnsealTouchEnd, this);
        this.getBtn.node.on(cc.Node.EventType.TOUCH_END, this.onGetTouchEnd, this);
        this.redDragon.addEventListener(dragonBones.EventObject.COMPLETE, this.animationEventHandler, this);
        this.infoLabel.string = "";
        this.currentIndex = 1;
        this.itemReward.active = false;
      },
      show: function show(opts) {
        opts = opts || {};
        opts.config && (this.luckyConfig = opts.config);
        opts.info && (this.info = opts.info);
        opts.unsealCB && (this.unsealBtnCallback = opts.unsealCB);
        opts.closeCB && (this.closeBtnCallback = opts.closeCB);
        opts.redbagCB && (this.redBagBtnCallback = opts.redbagCB);
        opts.blankCB && (this.blankCallback = opts.blankCB);
        opts.rewardCB && (this.getRewardCallBack = opts.rewardCB);
        this.currentIndex = 1;
        this.showRefreshUI(this.info.isResult);
      },
      onDestroy: function onDestroy() {},
      showRefreshUI: function showRefreshUI(isEnd) {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u5e78\u8fd0\u5927\u5956",
          content: "\u4e3b\u754c\u9762\u56fe\u6807+\u70b9\u51fb"
        }, function() {});
        this.currentIndex = 1;
        this.level = this.info.level || 1;
        this.tollgateConfig = this.luckyConfig.tollgate;
        for (var i = 0; i < this.tollgateConfig.length; i++) if (isEnd && this.tollgateConfig[i].level == this.level || !isEnd) {
          var index = i + 1;
          var ready = cc.sys.localStorage.getItem("luckReadyReceive" + index);
          if (null == ready || "" == ready) {
            this.currentIndex = index;
            break;
          }
        }
        this.refreshItem(this.currentIndex);
        this.node.active = true;
        bannerTimeOut = setTimeout(function() {
          appGame.interstitialAd && appGame.interstitialAd.playAd();
          appGame.banner.playBanner(2);
        }.bind(this), 3e3);
      },
      refreshItem: function refreshItem(index) {
        underscore.each(this.tollgateConfig, function(key, value) {
          if (value == index - 1) {
            var ready = cc.sys.localStorage.getItem("luckReadyReceive" + index);
            var unseal = cc.sys.localStorage.getItem("luckUnseal" + index);
            if ("" != ready && null != ready) {
              this.redDragon.playAnimation("dajiang2", 1);
              this.refreshGetReward(index, 2);
            } else if ("" != unseal && null != unseal) {
              this.redDragon.playAnimation("dajiang2", 1);
              this.refreshGetReward(index, 3);
            } else {
              this.redDragon.playAnimation("dajiang", 2);
              this.refreshGetReward(index, 4);
            }
          }
        }.bind(this));
      },
      clickTouchHideCallBack: function clickTouchHideCallBack(event) {
        var onoff = this.luckyConfig.luckyOnOff;
        if (onoff && onoff.length > 0 && 1 == onoff[1].video) appGame.videoBanner.playVideoAd(onoff[1].force, function() {
          console.log("\u770b\u89c6\u9891\u6210\u529f");
          this.onClientResultPlayAD({
            sceneId: 7,
            eventId: 2,
            isSuccess: true
          });
          this.blankCallback && this.blankCallback();
        }.bind(this)); else {
          this.onClientResultPlayAD({
            sceneId: 7,
            eventId: 2,
            isSuccess: true
          });
          this.blankCallback && this.blankCallback();
        }
      },
      clickTouchCloseCallBack: function clickTouchCloseCallBack(event) {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u5e78\u8fd0\u5927\u5956",
          content: "\u5173\u95ed+\u70b9\u51fb"
        }, function() {});
        this.onClientResultPlayAD({
          sceneId: 7,
          eventId: 2,
          isSuccess: true
        });
        this.closeBtnCallback && this.closeBtnCallback();
      },
      onTouchStart: function onTouchStart(event) {
        this.startX = event.getLocation().x;
      },
      onTouchEnd: function onTouchEnd(event) {
        var moveX = event.getLocation().x;
        var spaceX = moveX - this.startX;
        spaceX <= -10 ? this.onLeftTouchEnd({}) : spaceX >= 10 ? this.onRightTouchEnd({}) : this.openTouch.active && this.onRedBagTouchEnd({});
      },
      onLeftTouchEnd: function onLeftTouchEnd(event) {
        if (this.currentIndex <= 1) appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
          content: "\u60a8\u5f53\u524d\u5df2\u7ecf\u5728\u7b2c\u4e00\u4e2a\u4e86\uff01"
        }); else {
          this.currentIndex--;
          this.refreshItem(this.currentIndex);
        }
      },
      onRightTouchEnd: function onRightTouchEnd(event) {
        if (this.currentIndex >= this.tollgateConfig.length) appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
          content: "\u60a8\u5f53\u524d\u5df2\u7ecf\u5728\u6700\u540e\u4e00\u4e2a\u4e86\uff01"
        }); else {
          this.currentIndex++;
          this.refreshItem(this.currentIndex);
        }
      },
      onUnsealTouchEnd: function onUnsealTouchEnd(event) {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u5e78\u8fd0\u5927\u5956",
          content: "\u7acb\u5373\u89e3\u5c01+\u70b9\u51fb"
        }, function() {});
        this.unsealBtnCallback && this.unsealBtnCallback();
        this.hide();
      },
      onRedBagTouchEnd: function onRedBagTouchEnd(event) {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u5e78\u8fd0\u5927\u5956",
          content: "\u770b\u6fc0\u52b1\u89c6\u9891\u83b7\u53d6+\u70b9\u51fb"
        }, function() {});
        if (this.itemReward.active) return;
        var onoff = this.luckyConfig.luckyOnOff;
        if (onoff && onoff.length > 0 && 1 == onoff[0].video) appGame.videoBanner.playVideoAd(onoff[0].force, function() {
          console.log("\u770b\u89c6\u9891\u6210\u529f");
          this.onClientResultPlayAD({
            sceneId: 7,
            eventId: 1,
            isSuccess: true
          });
          this.redBagBtnCallback && this.redBagBtnCallback();
        }.bind(this)); else {
          this.onClientResultPlayAD({
            sceneId: 7,
            eventId: 1,
            isSuccess: true
          });
          this.redBagBtnCallback && this.redBagBtnCallback();
        }
      },
      onGetTouchEnd: function onGetTouchEnd(event) {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u5e78\u8fd0\u5927\u5956",
          content: "\u9886\u53d6\u5956\u52b1+\u70b9\u51fb"
        }, function() {});
        cc.log("\u9886\u53d6=====" + this.currentIndex);
        this.refreshGetReward(this.currentIndex, 1);
      },
      refreshGetReward: function refreshGetReward(index, enter) {
        underscore.each(this.tollgateConfig, function(key, value) {
          if (value == index - 1) {
            1 == enter && this.getRewardCallBack && this.getRewardCallBack(key.reward.itemId, key.reward.count);
            this.itemReward.getChildByName("item").getComponent("item").init(key.reward.itemId);
            this.itemReward.getChildByName("count").getComponent(cc.Label).string = "\xd7" + key.reward.count;
            if (1 == enter) {
              cc.log("index===" + index);
              this.redLabel.node.active = true;
              this.itemReward.active = false;
              this.redDragon.playAnimation("dajiang2", 1);
              cc.sys.localStorage.setItem("luckReadyReceive" + index, index);
              this.infoLabel.string = key.reward.info;
              var isHad = 0;
              for (var i = 0; i < this.tollgateConfig.length; i++) {
                var tempIndex = i + 1;
                var receive = cc.sys.localStorage.getItem("luckReadyReceive" + tempIndex);
                if ("" == receive || null == receive) {
                  this.currentIndex = tempIndex;
                  this.redDragon.playAnimation("dajiang", 2);
                  this.refreshGetReward(tempIndex, 4);
                  return;
                }
                isHad++;
              }
              if (isHad == this.tollgateConfig.length) {
                for (var _i = 0; _i < this.tollgateConfig.length; _i++) {
                  var _tempIndex = _i + 1;
                  cc.sys.localStorage.removeItem("luckReadyReceive" + _tempIndex);
                  cc.sys.localStorage.removeItem("luckUnseal" + _tempIndex);
                }
                this.showRefreshUI(this.info.isResult);
              }
            } else if (2 == enter) {
              this.openTouch.active = false;
              this.redLabel.node.active = false;
              this.itemReward.active = true;
              this.getBtn.node.active = true;
              this.closeBtn.node.active = false;
              this.unsealBtn.node.active = false;
              this.getBtn.interactable = false;
              this.getBtn.node.off(cc.Node.EventType.TOUCH_END, this.onGetTouchEnd, this);
              this.getBtn.node.getChildByName("label").getComponent(cc.Label).string = "\u5df2\u9886\u53d6";
              this.infoLabel.string = "\u5956\u52b1\u5df2\u9886\u53d6";
              httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
                title: "\u5e78\u8fd0\u5927\u5956",
                content: "\u9886\u53d6\u5956\u52b1+\u70b9\u51fb"
              }, function() {});
            } else if (3 == enter) {
              this.openTouch.active = false;
              this.redLabel.node.active = false;
              this.itemReward.active = true;
              this.getBtn.node.active = true;
              this.closeBtn.node.active = false;
              this.unsealBtn.node.active = false;
              this.getBtn.interactable = true;
              this.getBtn.node.on(cc.Node.EventType.TOUCH_END, this.onGetTouchEnd, this);
              this.getBtn.node.getChildByName("label").getComponent(cc.Label).string = "\u9886\u53d6";
              this.infoLabel.string = "\u606d\u559c\u83b7\u5f97";
              httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
                title: "\u5e78\u8fd0\u5927\u5956",
                content: "\u606d\u559c\u83b7\u5f97\u5f39\u7a97"
              }, function() {});
            } else if (4 == enter) {
              this.redLabel.node.active = true;
              this.itemReward.active = false;
              this.getBtn.node.active = false;
              this.openTouch.active = true;
              this.openTouch.scale = 1.4;
              this.openTouch.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.5, 1.2), cc.scaleTo(.5, 1.5))));
              var sealShow = this.luckyConfig.luckUnseal;
              if (sealShow && 1 == sealShow.show) {
                var time = 1e3 * sealShow.delay;
                unsealtimeOut = setTimeout(function() {
                  this.closeBtn.node.active = true;
                  this.unsealBtn.node.active = true;
                }.bind(this), time);
              } else {
                this.closeBtn.node.active = false;
                this.unsealBtn.node.active = false;
              }
              this.infoLabel.string = key.reward.info;
            }
          }
        }.bind(this));
      },
      animationEventHandler: function animationEventHandler(event) {
        event.type === dragonBones.EventObject.COMPLETE && "dajiang" === event.animationState.name && this.redDragon.playAnimation("dajiang1", 0);
      },
      onClientResultPlayAD: function onClientResultPlayAD(data) {
        if (7 == data.sceneId && data.isSuccess) if (1 == data.eventId) {
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: "\u5e78\u8fd0\u5927\u5956",
            content: "\u770b\u6fc0\u52b1\u89c6\u9891\u83b7\u53d6+\u5df2\u70b9\u51fb"
          }, function() {});
          cc.sys.localStorage.setItem("luckUnseal" + this.currentIndex, this.currentIndex);
          this.redDragon.playAnimation("dajiang2", 1);
          this.refreshGetReward(this.currentIndex, 3);
        } else if (2 == data.eventId || 3 == data.eventId) {
          3 == data.eventId && httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: "\u5e78\u8fd0\u5927\u5956",
            content: "\u5173\u95ed\u754c\u9762+\u5df2\u70b9\u51fb"
          }, function() {});
          this.hide();
        }
      },
      hide: function hide() {
        clearTimeout(unsealtimeOut);
        clearTimeout(bannerTimeOut);
        appGame.banner.playBanner(3);
        this.node.removeFromParent();
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  nativeAd: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "798f3uehO1CeqnH/lESNu8/", "nativeAd");
    "use strict";
    var NativeAd = cc.Class({
      properties: {},
      ctor: function ctor() {
        this.instance = null;
      },
      statics: {
        create: function create(data) {
          if (!this.instance) {
            this.instance = new NativeAd();
            this.instance.initWithData(data);
            return this.instance;
          }
        }
      },
      initWithData: function initWithData(data) {
        cc.sys.platform == cc.sys.OPPO_GAME && (this.globalData = {
          nativeAd: qg.createNativeAd({
            adUnitId: "226783"
          })
        });
        if (this.globalData && this.globalData.nativeAd) {
          this.globalData.nativeAd.onLoad(function(res) {
            cc.log("\u52a0\u8f7d\u539f\u751f\u5e7f\u544a\u6210\u529f", "\uff1a" + JSON.stringify(res));
            res.adList && res.adList.length > 0 && (appGame.nativeAdData = res.adList[0]);
            appGame.gameServerRoom.emit(consts.LOCAL_GAME_RESULT_NATIVE_AD, {});
          });
          this.globalData.nativeAd.onError(function(err) {
            cc.log("\u8bbe\u7f6e\u539f\u751f\u5e7f\u544a\u51fa\u9519\uff1a" + JSON.stringify(err));
          });
        }
      },
      playAd: function playAd() {
        console.log("\u64ad\u653e\u539f\u751f\u5e7f\u544a==");
        if (this.globalData && this.globalData.nativeAd) {
          var nativeAd = this.globalData.nativeAd;
          nativeAd.load().then(function() {
            console.log("\u539f\u751f\u5e7f\u544a\u663e\u793a\u6210\u529f");
            return nativeAd.show();
          })["catch"](function(err) {
            console.log("\u539f\u751f\u5e7f\u544a\u51fa\u73b0\u95ee\u9898", err);
          });
        }
      }
    });
    module.exports = NativeAd;
    cc._RF.pop();
  }, {} ],
  platformFun: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "84833vJXhNMwZQ8web99yS6", "platformFun");
    "use strict";
    module.exports = {
      subscribeService: function subscribeService() {
        cc.sys.platform == cc.sys.BAIDU_GAME && swan.subscribeService({
          templateId: "7519c8966fdd442d93cec1e0a30c3521",
          subscribeId: "1234",
          type: "query",
          success: function success(res) {
            swan.showModal({
              title: "success",
              content: JSON.stringify(res)
            });
          },
          fail: function fail(err) {
            swan.showModal({
              title: "fail",
              content: JSON.stringify(err)
            });
          }
        });
      }
    };
    cc._RF.pop();
  }, {} ],
  qqAppBox: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "348eeAr679Oq75aKnlLmZ1c", "qqAppBox");
    "use strict";
    var QQAppBOX = cc.Class({
      extends: cc.Component,
      properties: {},
      ctor: function ctor() {
        this.instance = null;
      },
      statics: {
        create: function create(data) {
          if (!this.instance) {
            this.instance = new QQAppBOX();
            this.instance.initWithData(data);
            return this.instance;
          }
        }
      },
      initWithData: function initWithData(data) {
        this.boxId = "";
        if (cc.sys.platform == cc.sys.WECHAT_GAME && "QQ" == appGame.platform) {
          var res = qq.getSystemInfoSync();
          this.width = res.windowWidth;
          this.height = res.windowHeight;
          var Version2 = util.compareVersion(res.SDKVersion, "1.7.1");
          if (Version2 > 0) {
            this.boxId = "686b9ffc40992b21d352e841f3bb2085";
            appGame.gameServerRoom.gameConfigData && appGame.gameServerRoom.gameConfigData.boxId && appGame.gameServerRoom.gameConfigData.boxId.QQ && (this.boxId = appGame.gameServerRoom.gameConfigData.boxId.QQ.adUnitId);
            this.globalData = {
              appbox: qq.createAppBox({
                adUnitId: this.boxId
              })
            };
          } else httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: "\u5e7f\u544a\u76d2\u5b50",
            content: "\u57fa\u7840\u5e93\u7248\u672c\u592a\u4f4e\u4e0d\u521b\u5efa\u5e7f\u544a\u76d2\u5b50"
          }, function() {});
        }
      },
      playBox: function playBox(show) {
        var _this = this;
        if (this.globalData && this.globalData.appbox) if (show) this.globalData.appbox.load().then(function() {
          _this.globalData.appbox.show();
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: "\u5e7f\u544a\u76d2\u5b50",
            content: "\u5c55\u793a"
          }, function() {});
        }); else {
          this.globalData.appbox.destroy();
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: "\u5e7f\u544a\u76d2\u5b50",
            content: "\u9690\u85cf"
          }, function() {});
        }
      }
    });
    module.exports = QQAppBOX;
    cc._RF.pop();
  }, {} ],
  qqBlockAd: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d8a0ccas05AxZHvKiQ9cgNJ", "qqBlockAd");
    "use strict";
    var videoId = "";
    var adUnitId = "";
    var BlockAd = cc.Class({
      extends: cc.Component,
      properties: {},
      ctor: function ctor() {
        this.instance = null;
      },
      statics: {
        create: function create(data) {
          if (!this.instance) {
            this.instance = new BlockAd();
            this.instance.initWithData(data);
            return this.instance;
          }
        }
      },
      initWithData: function initWithData(data) {
        this.targetBannerAdWidth = 200;
      },
      playBlockad: function playBlockad(show) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME && "QQ" == appGame.platform) if (show) {
          this.globalData && this.globalData.blockAd && this.globalData.blockAd.destroy();
          var res = qq.getSystemInfoSync();
          this.width = res.windowWidth;
          this.height = res.windowHeight;
          var Version2 = util.compareVersion(res.SDKVersion, "1.15.0");
          videoId = "672c9551ab8b8b8284a73dde8cf1406a";
          appGame.gameServerRoom.gameConfigData && appGame.gameServerRoom.gameConfigData.blockId && appGame.gameServerRoom.gameConfigData.blockId.QQ && (videoId = appGame.gameServerRoom.gameConfigData.blockId.QQ.adUnitId);
          this.globalData = {
            blockAd: qq.createBlockAd({
              adUnitId: videoId,
              size: 5,
              orientation: "landscape",
              style: {
                left: 16,
                top: this.height - this.targetBannerAdWidth / 16 * 9 * 2
              }
            })
          };
          this.globalData.blockAd.onError(function(res) {
            console.log("globalData blockAd onError", res);
          });
          console.log("globalData blockAd onLoad", res);
          this.globalData.blockAd.show(function(res) {
            console.log("globalData blockAd show error", res);
          });
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: "\u79ef\u6728\u5e7f\u544a",
            content: "\u5c55\u793a"
          }, function() {});
        } else if (this.globalData && this.globalData.blockAd) {
          this.globalData.blockAd.destroy();
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: "\u79ef\u6728\u5e7f\u544a",
            content: "\u9690\u85cf"
          }, function() {});
        }
      },
      refreshSize: function refreshSize() {
        var _this = this;
        this.globalData && this.globalData.bannerAd && cc.sys.platform == cc.sys.WECHAT_GAME && "QQ" == appGame.platform && this.globalData.blockAd.onResize(function(size) {
          console.log("\u79ef\u6728\u5e7f\u544a shezhi\u5927\u5c0f" + _this.height + "   " + _this.width);
          _this.globalData.blockAd.style.top = _this.height - size.height;
          _this.globalData.blockAd.style.left = (_this.width - size.width) / 2;
        });
      }
    });
    module.exports = BlockAd;
    cc._RF.pop();
  }, {} ],
  result: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "33fa5PoD/RJD6LgBnT5ywP1", "result");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        title: cc.Label,
        contentLabel: cc.Label,
        nextBtn: cc.Button,
        backBtn: cc.Button,
        nextBtnCallback: null,
        backBtnCallback: null
      },
      onLoad: function onLoad() {
        this.nextBtn.node.on(cc.Node.EventType.TOUCH_END, this.onNextBtnClicked, this);
        this.backBtn.node.on(cc.Node.EventType.TOUCH_END, this.onBackBtnClicked, this);
      },
      start: function start() {},
      show: function show(opts) {
        opts = opts || {};
        opts.nextCB && (this.nextBtnCallback = opts.nextCB);
        opts.backCB && (this.backBtnCallback = opts.backCB);
        opts.info && (this.info = opts.info);
        opts.config && (this.info.isWin ? this.resultConfig = opts.config.win : this.resultConfig = opts.config.fail);
        this.refreshUI();
      },
      refreshUI: function refreshUI() {
        if (this.info) {
          this.title.string = (this.info.isWin, this.resultConfig.title);
          this.contentLabel.string = (this.info.isWin, this.resultConfig.content);
          this.nextBtn.node.getChildByName("Background").getChildByName("New Label").getComponent(cc.Label).string = this.resultConfig.btn1.name;
          this.backBtn.node.getChildByName("Background").getChildByName("New Label").getComponent(cc.Label).string = this.resultConfig.btn2.name;
          this.nextBtn.node.getChildByName("Background").getChildByName("icon").active = this.resultConfig.btn1.icon;
          this.backBtn.node.getChildByName("Background").getChildByName("icon").active = this.resultConfig.btn2.icon;
        }
        appGame.interstitialAd && appGame.interstitialAd.playAd();
        appGame.banner.playBanner(2);
      },
      onNextBtnClicked: function onNextBtnClicked(event) {
        var isPlayVideo = false;
        var isForce = true;
        if (this.resultConfig) {
          isPlayVideo = this.resultConfig.btn1.video;
          isForce = this.resultConfig.btn1.force;
        }
        if (isPlayVideo) appGame.videoBanner.playVideoAd(isForce, function() {
          this.nextBtnCallback && this.nextBtnCallback(this.info.isWin);
          this.hide();
        }.bind(this)); else {
          this.nextBtnCallback && this.nextBtnCallback(this.info.isWin);
          this.hide();
        }
      },
      onBackBtnClicked: function onBackBtnClicked(event) {
        var isPlayVideo = false;
        var isForce = true;
        if (this.resultConfig) {
          isPlayVideo = this.resultConfig.btn2.video;
          isForce = this.resultConfig.btn2.force;
        }
        if (isPlayVideo) appGame.videoBanner.playVideoAd(isForce, function() {
          console.log("\u770b\u89c6\u9891\u6210\u529f");
          this.backBtnCallback && this.backBtnCallback(this.info.isWin);
          this.hide();
        }.bind(this)); else {
          this.backBtnCallback && this.backBtnCallback(this.info.isWin);
          this.hide();
        }
      },
      hide: function hide() {
        appGame.banner.playBanner(3);
        this.node.removeFromParent();
      }
    });
    cc._RF.pop();
  }, {} ],
  revive: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ec134IHnxVI363+v185uOut", "revive");
    "use strict";
    var backBtnTimeOut;
    var continueBtnTimeOut;
    var countDownInterval;
    cc.Class({
      extends: cc.Component,
      properties: {
        reviveBtn: cc.Button,
        backBtn: cc.Button,
        clock: cc.Node,
        reviveBtnCallback: null,
        backBtnCallback: null
      },
      onLoad: function onLoad() {
        this.reviveBtn.node.on(cc.Node.EventType.TOUCH_END, this.onReviveBtnClicked, this);
        this.backBtn.node.on(cc.Node.EventType.TOUCH_END, this.onBackBtnClicked, this);
      },
      start: function start() {},
      show: function show(opts) {
        opts = opts || {};
        opts.reviveCB && (this.reviveBtnCallback = opts.reviveCB);
        opts.backCB && (this.backBtnCallback = opts.backCB);
        opts.config && (this.reviveConfig = opts.config);
        this.refreshUI();
      },
      refreshUI: function refreshUI() {
        this._count = 0;
        this.clock.getComponent(cc.ProgressBar).progress = 1;
        this.reviveConfig.countdown && this.updateTime(1, this.reviveConfig.countdown, this.reviveConfig.countdown);
        if (this.reviveConfig.btn1) {
          this.reviveBtn.node.getChildByName("Background").getChildByName("New Label").getComponent(cc.Label).string = this.reviveConfig.btn1.name;
          this.reviveBtn.node.getChildByName("Background").getChildByName("icon").active = this.reviveConfig.btn1.icon;
          clearTimeout(continueBtnTimeOut);
          this.reviveConfig.btn1.delayTime >= 0 && (continueBtnTimeOut = setTimeout(function() {
            this.reviveBtn.node.active = true;
          }.bind(this), 1e3 * this.reviveConfig.btn1.delayTime));
        }
        if (this.reviveConfig.btn2) {
          this.backBtn.node.getChildByName("Background").getChildByName("New Label").getComponent(cc.Label).string = this.reviveConfig.btn2.name;
          this.backBtn.node.getChildByName("Background").getChildByName("icon").active = this.reviveConfig.btn2.icon;
          this.backBtn.node.active = false;
          clearTimeout(backBtnTimeOut);
          this.reviveConfig.btn2.delayTime >= 0 && (backBtnTimeOut = setTimeout(function() {
            this.backBtn.node.active = true;
          }.bind(this), 1e3 * this.reviveConfig.btn2.delayTime));
        }
        appGame.interstitialAd && appGame.interstitialAd.playAd();
        appGame.banner.playBanner(2);
      },
      onReviveBtnClicked: function onReviveBtnClicked(event) {
        var isPlayVideo = false;
        var isForce = true;
        if (this.reviveConfig) {
          isPlayVideo = this.reviveConfig.btn1.video;
          isForce = this.reviveConfig.btn1.force;
        }
        if (isPlayVideo) appGame.videoBanner.playVideoAd(isForce, function() {
          console.log("\u770b\u89c6\u9891\u6210\u529f");
          this.reviveBtnCallback && this.reviveBtnCallback();
          this.hide();
        }.bind(this)); else {
          this.reviveBtnCallback && this.reviveBtnCallback();
          this.hide();
        }
      },
      onBackBtnClicked: function onBackBtnClicked(event) {
        var isPlayVideo = false;
        var isForce = true;
        if (this.reviveConfig) {
          isPlayVideo = this.reviveConfig.btn2.video;
          isForce = this.reviveConfig.btn2.force;
        }
        if (isPlayVideo) appGame.videoBanner.playVideoAd(isForce, function() {
          console.log("\u770b\u89c6\u9891\u6210\u529f");
          this.backBtnCallback && this.backBtnCallback();
          this.hide();
        }.bind(this)); else {
          this.backBtnCallback && this.backBtnCallback();
          this.hide();
        }
      },
      updateTime: function updateTime(type, count, totalcount) {
        if (1 == type) {
          count *= 1e3;
          totalcount *= 1e3;
          var durationtime = 100;
          this._count = count;
          this.clock && (this.clock.getComponent(cc.ProgressBar).progress = this._count / totalcount);
          clearInterval(countDownInterval);
          countDownInterval = setInterval(function() {
            if (this._count > durationtime) this._count -= durationtime; else {
              this._count = 0;
              clearInterval(countDownInterval);
              this.backBtnCallback && this.backBtnCallback();
              this.hide();
            }
            this.clock && (this.clock.getComponent(cc.ProgressBar).progress = this._count / totalcount);
          }.bind(this), durationtime);
        } else clearInterval(countDownInterval);
      },
      hide: function hide() {
        appGame.banner.playBanner(3);
        clearInterval(countDownInterval);
        clearTimeout(backBtnTimeOut);
        clearTimeout(continueBtnTimeOut);
        this.node.removeFromParent();
      }
    });
    cc._RF.pop();
  }, {} ],
  roomGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "beb9925+ZFD6pMLNAwAhYoo", "roomGame");
    "use strict";
    var Room = require("room");
    var consts = require("./model/consts");
    var RoomGame = cc.Class({
      extends: Room,
      statics: {
        create: function create(data) {
          var roomObj = new RoomGame();
          roomObj.initWithData(data);
          return roomObj;
        }
      },
      initWithData: function initWithData(data) {
        this._super(data.room);
        this.videoPath = "";
        this.screenTime = 0;
        this.gameConfigData = {};
        this.wordRid = "";
        this.configSuccess2 = false;
        var url = consts.HTTP_GET_PAAS_DATA_SERVER + "?gameId=" + consts.GAME_ID + "&plat=" + appGame.platform + "&version=" + appGame.packageVersion + "&brand=&from=game";
        console.log("roomgame url===" + url);
        httpUtils.httpSendRequest(url, function(res) {
          console.log("roomgame ==" + JSON.stringify(res));
          if (res && 200 == res.Code) {
            var detailparse = JSON.parse(res.Detail);
            if (detailparse) {
              console.log("word==========" + detailparse.word);
              this.gameConfigData = detailparse;
              this.isGameStart = true;
            }
            this.configSuccess2 = true;
            this.configSuccess2 && this.configSuccess1 && appGame.gameServerRoom.emit(consts.CLIENT_GAME_START, {});
          } else util.loadJSONData("json", "game", function(data) {
            this.gameConfigData = data;
            this.isGameStart = true;
            this.configSuccess2 = true;
            this.configSuccess2 && this.configSuccess1 && appGame.gameServerRoom.emit(consts.CLIENT_GAME_START, {});
          }.bind(this));
        }.bind(this));
      }
    });
    module.exports = RoomGame;
    cc._RF.pop();
  }, {
    "./model/consts": "consts",
    room: "room"
  } ],
  room: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "690ef7tcntLt4eCVVAMIQ0O", "room");
    "use strict";
    var Emitter = require("emitter");
    var consts = require("./model/consts");
    var Room = cc.Class({
      extends: Emitter,
      initWithData: function initWithData(data) {
        this.commonConfig = {};
        this.configSuccess1 = false;
        this.isHadWord = false;
        var url = consts.HTTP_GET_PAAS_DATA_SERVER + "?gameId=" + consts.GAME_ID + "&plat=" + appGame.platform + "&version=" + appGame.packageVersion + "&brand=&from=MiddleDesk";
        console.log("room url===" + url);
        httpUtils.httpSendRequest(url, function(res) {
          console.log("room ==" + JSON.stringify(res));
          if (res && 200 == res.Code) {
            var detailparse = JSON.parse(res.Detail);
            if (detailparse) {
              if (detailparse.word) {
                this.isHadWord = true;
                util.spreadWordFun();
              }
              this.commonConfig = detailparse;
              this.configSuccess1 = true;
            }
            appGame.emitter.emit(consts.HTTP_EVENT_MIDDLE_DESK_CONFIG, {});
            this.configSuccess2 && this.configSuccess1 && appGame.gameServerRoom.emit(consts.CLIENT_GAME_START, {});
          } else util.loadJSONData("comJson", "comConfig", function(data) {
            if (data) {
              this.commonConfig = data;
              this.configSuccess1 = true;
              if (data.word) {
                this.isHadWord = true;
                util.spreadWordFun();
              }
            }
            appGame.emitter.emit(consts.HTTP_EVENT_MIDDLE_DESK_CONFIG, {});
            this.configSuccess2 && this.configSuccess1 && appGame.gameServerRoom.emit(consts.CLIENT_GAME_START, {});
          }.bind(this));
        }.bind(this));
      }
    });
    module.exports = Room;
    cc._RF.pop();
  }, {
    "./model/consts": "consts",
    emitter: "emitter"
  } ],
  screenrecord: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4bca2MgtetMQYn5yd8otlgf", "screenrecord");
    "use strict";
    var recorder;
    var videoPathGame;
    cc.Class({
      extends: cc.Component,
      properties: {
        screenBtn: cc.Node,
        recordBtn: cc.Node
      },
      onLoad: function onLoad() {
        this.screenBtn.on(cc.Node.EventType.TOUCH_END, this.screenBtnCallBack, this);
        this.recordBtn.on(cc.Node.EventType.TOUCH_END, this.recordBtnCallBack, this);
        appGame.gameServerRoom.on(consts.CLIENT_GAME_PLAY_VIDEO, this.onPlayVideo, this);
        appGame.gameServerRoom.on(consts.CLIENT_GAME_RESULT_VIDEO_SHOW, this.onGameResultShowVideo, this);
        this.screenBtn.active = false;
        this.initRefreshUI();
      },
      onDestroy: function onDestroy() {
        appGame.gameServerRoom.off(consts.CLIENT_GAME_PLAY_VIDEO, this.onPlayVideo, this);
        appGame.gameServerRoom.off(consts.CLIENT_GAME_RESULT_VIDEO_SHOW, this.onGameResultShowVideo, this);
      },
      initRefreshUI: function initRefreshUI() {
        this.isScreening = false;
        this.isScreening ? this.screenBtn.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "\u5f55\u5c4f\u4e2d" : this.screenBtn.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "\u5f55\u5c4f";
      },
      onPlayVideo: function onPlayVideo(data) {
        appGame.gameServerRoom.screenTime = new Date().getTime();
        this.screenBtn.active = false;
        this.isScreening = true;
        console.log("\u5e73\u53f0====" + cc.sys.platform);
        if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
          recorder || (recorder = tt.getGameRecorderManager());
          recorder.start({
            duration: 300
          });
          recorder.onStart(function(res) {
            console.log("\u5f00\u59cb\u5f55\u5c4f");
          });
          recorder.onStop(function(res) {
            console.log(res.videoPath);
            appGame.gameServerRoom.videoPath = res.videoPath;
            console.log("\u5f55\u5c4f\u7ed3\u675f");
          }, this);
        }
      },
      onGameResultShowVideo: function onGameResultShowVideo(data) {
        appGame.gameServerRoom.screenTime = new Date().getTime() - appGame.gameServerRoom.screenTime;
        this.screenBtn.active = false;
        this.screenBtn.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "\u5f55\u5c4f";
        console.log("11\u81ea\u52a8\u505c\u6b62\u5f55\u5c4f===");
        if (this.isScreening && cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
          recorder || (recorder = tt.getGameRecorderManager());
          recorder.stop();
          recorder.onStop(function(res) {
            appGame.gameServerRoom.videoPath = res.videoPath;
            appGame.gameServerRoom.emit(consts.CLIENT_GAME_VIDEO_SHOW, {});
            console.log("22\u81ea\u52a8\u505c\u6b62\u5f55\u5c4f===" + res.videoPath);
          });
        }
      },
      screenBtnCallBack: function screenBtnCallBack(event) {
        this.isScreening = !this.isScreening;
        if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
          recorder || (recorder = tt.getGameRecorderManager());
          if (this.isScreening) {
            this.screenBtn.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "\u5f55\u5c4f\u4e2d";
            recorder.start({
              duration: 1e5
            });
            recorder.onStart(function(res) {
              console.log("\u5f00\u59cb\u5f55\u5c4f");
            });
            recorder.onStop(function(res) {
              console.log(res.videoPath);
              appGame.gameServerRoom.videoPath = res.videoPath;
              console.log("\u5f55\u5c4f\u7ed3\u675f");
            }, this);
          } else {
            this.screenBtn.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "\u5f55\u5c4f";
            recorder.stop();
            recorder.onStop(function(res) {
              appGame.gameServerRoom.videoPath = res.videoPath;
              console.log("\u624b\u52a8\u505c\u6b62\u5f55\u5c4f===" + res.videoPath);
            });
          }
        }
      },
      recordBtnCallBack: function recordBtnCallBack(event) {
        if (null == videoPathGame) return;
        cc.sys.platform == cc.sys.BYTEDANCE_GAME && tt.shareAppMessage({
          channel: "video",
          title: "\u5206\u4eab\u89c6\u9891",
          imageUrl: "",
          query: "",
          extra: {
            videoPath: videoPathGame,
            videoTopics: [ "\u6d4b\u8bd5\u8bdd\u9898" ]
          },
          success: function success() {
            console.log("\u5206\u4eab\u89c6\u9891\u6210\u529f");
          },
          fail: function fail(e) {
            console.log("\u5206\u4eab\u89c6\u9891\u5931\u8d25");
          }
        });
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  sign: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "739a6M/ioBOG5JpbKXWT2IE", "sign");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        signNode: [ cc.Node ],
        closeBtn: cc.Node,
        signBtn: cc.Node,
        replenishSignBtn: cc.Node,
        closeCallback: null,
        signCallback: null
      },
      onLoad: function onLoad() {
        this.reg = false;
        this.regArr = [];
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.onCloseBtnClicked, this);
        this.signBtn.on(cc.Node.EventType.TOUCH_END, this.onClickSignInBtn, this);
        this.replenishSignBtn.on(cc.Node.EventType.TOUCH_END, this.onClickReplenishSignBtnInBtn, this);
      },
      start: function start() {},
      show: function show(opts) {
        opts = opts || {};
        opts.config && opts.config.type && (this.showType = opts.config.type);
        opts.config && opts.config.item && (this.signItem = opts.config.item);
        opts.config && (this.signConfig = opts.config);
        opts.backCB && (this.closeCallback = opts.backCB);
        opts.signCB && (this.signCallback = opts.signCB);
        this.initData(function() {
          this.showUI();
        }.bind(this));
      },
      initData: function initData(cb) {
        this.days = [];
        if (this.signItem) for (var i = 0; i < this.signItem.length; i++) {
          var isSign = {
            sign: 0,
            day: "",
            signType: this.showType
          };
          this.days.push(isSign);
        }
        this.singnday = [];
        this.save_data = {};
        var day = cc.sys.localStorage.getItem("days_sign");
        if (day) {
          this.days = JSON.parse(day);
          if (this.days) {
            var isConfigChange = false;
            var isLastDay = true;
            var isPass = true;
            var ishadToday = false;
            var isNextWeek = false;
            if (this.days[0] && this.showType != this.days[0].signType) isConfigChange = true; else {
              var today = this.getTodayDay();
              if (1 == this.showType) {
                for (var _i = 0; _i < this.days.length; _i++) if (this.days[_i].day == today) {
                  ishadToday = true;
                  break;
                }
                for (var _i2 = 0; _i2 < this.days.length; _i2++) {
                  0 == this.days[_i2].sign && this.days[_i2].day != today && (isPass = false);
                  if (this.days[_i2].day == today) break;
                }
              } else if (2 == this.showType) {
                for (var _i3 = 0; _i3 < this.days.length; _i3++) if (this.days[_i3].day == today) {
                  isLastDay = false;
                  break;
                }
              } else if (3 == this.showType) {
                var monthDay = this.weekIndexInMonth();
                for (var _i4 = 0; _i4 < this.days.length; _i4++) if (1 == this.days[_i4].sign && this.days[_i4].day != monthDay) {
                  isNextWeek = true;
                  break;
                }
              }
            }
            if (2 == this.showType && isLastDay || 1 == this.showType && (!isPass || !ishadToday) || 3 == this.showType && isNextWeek || isConfigChange) {
              cc.sys.localStorage.removeItem("days_sign");
              this.days.length = 0;
              for (var _i5 = 0; _i5 < this.signItem.length; _i5++) {
                var _isSign = {
                  sign: 0,
                  day: "",
                  signType: this.showType
                };
                this.days.push(_isSign);
              }
            }
          }
        }
        cb();
      },
      showUI: function showUI() {
        for (var i = 0; i < this.signNode.length; i++) {
          this.signNode[i].active = false;
          this.signNode[i].getChildByName("item").active = false;
          this.signNode[i].getChildByName("New Sprite").active = false;
          this.signNode[i].getChildByName("ok").active = false;
        }
        for (var _i6 = 0; _i6 < this.signItem.length; _i6++) {
          3 == this.signItem.length ? this.signNode[_i6].y = 60 : _i6 < 3 && (this.signNode[_i6].y = 171.521);
          this.signNode[_i6].active = true;
        }
        for (var _i7 = 0; _i7 < this.signItem.length; _i7++) {
          var itemSingle = this.signItem[_i7];
          if ("{}" != JSON.stringify(itemSingle)) {
            this.signNode[_i7].getChildByName("item").getComponent("item").init(itemSingle.itemId);
            this.signNode[_i7].getChildByName("item").active = true;
          } else this.signNode[_i7].getChildByName("New Sprite").active = true;
        }
        if (this.signConfig && this.signConfig.btn1) {
          this.replenishSignBtn.active = this.signConfig.btn1.show;
          this.replenishSignBtn.getChildByName("video").active = this.signConfig.btn1.icon;
        }
        underscore.each(this.days, function(value, key) {
          1 == value.sign && (this.signNode[key].getChildByName("ok").active = true);
        }.bind(this));
        appGame.banner.playBanner(2);
      },
      onClickReplenishSignBtnInBtn: function onClickReplenishSignBtnInBtn(event) {
        var currentReplenishSign = -1;
        if (1 == this.showType || 2 == this.showType) {
          var isFirstSign = false;
          for (var i = 0; i < this.days.length; i++) if (1 == this.days[i].sign) {
            isFirstSign = true;
            break;
          }
          if (!isFirstSign) {
            appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
              content: "\u5f53\u524d\u8fd8\u672a\u7b7e\u5230\uff0c\u8bf7\u5148\u7b7e\u5230"
            });
            return;
          }
          var today = this.getTodayDay();
          var replenishSign = [];
          for (var _i8 = 0; _i8 < this.days.length; _i8++) {
            if (today == this.days[_i8].day) break;
            1 != this.days[_i8].sign && replenishSign.push(_i8);
          }
          replenishSign.length > 0 && (currentReplenishSign = replenishSign[0]);
        } else if (3 == this.showType) {
          var _replenishSign = [];
          for (var _i9 = 0; _i9 < this.days.length; _i9++) {
            var weekDay = this.getWeekDay();
            if (_i9 + 1 == weekDay) break;
            0 == this.days[_i9].sign && _replenishSign.push(_i9);
          }
          _replenishSign.length > 0 && (currentReplenishSign = _replenishSign[0]);
        }
        var isPlayVideo = false;
        var isForce = true;
        if (this.signConfig) {
          isPlayVideo = this.signConfig.btn1.video;
          isForce = this.signConfig.btn1.force;
        }
        if (isPlayVideo) appGame.videoBanner.playVideoAd(isForce, function() {
          console.log("\u770b\u89c6\u9891\u6210\u529f");
          if (-1 != currentReplenishSign) if (1 == this.showType || 2 == this.showType) {
            this.days[currentReplenishSign].sign = 1;
            this.signNode[currentReplenishSign].getChildByName("ok").active = true;
            cc.sys.localStorage.setItem("days_sign", JSON.stringify(this.days));
            this.signSuccessTip(this.signItem[currentReplenishSign], 0);
          } else if (3 == this.showType) {
            this.days[currentReplenishSign].day = this.weekIndexInMonth();
            this.days[currentReplenishSign].sign = 1;
            this.signNode[currentReplenishSign].getChildByName("ok").active = true;
            cc.sys.localStorage.setItem("days_sign", JSON.stringify(this.days));
            this.signSuccessTip(this.signItem[currentReplenishSign], 0);
          }
        }.bind(this)); else if (-1 != currentReplenishSign) if (1 == this.showType || 2 == this.showType) {
          this.days[currentReplenishSign].sign = 1;
          this.signNode[currentReplenishSign].getChildByName("ok").active = true;
          cc.sys.localStorage.setItem("days_sign", JSON.stringify(this.days));
          this.signSuccessTip(this.signItem[currentReplenishSign], 0);
        } else if (3 == this.showType) {
          this.days[currentReplenishSign].day = this.weekIndexInMonth();
          this.days[currentReplenishSign].sign = 1;
          this.signNode[currentReplenishSign].getChildByName("ok").active = true;
          cc.sys.localStorage.setItem("days_sign", JSON.stringify(this.days));
          this.signSuccessTip(this.signItem[currentReplenishSign], 0);
        }
      },
      onClickSignInBtn: function onClickSignInBtn() {
        if (1 == this.showType || 2 == this.showType) {
          var isFirstSign = false;
          for (var i = 0; i < this.days.length; i++) if (1 == this.days[i].sign) {
            isFirstSign = true;
            break;
          }
          if (isFirstSign) {
            var today = this.getTodayDay();
            var isSignToday = false;
            var dayIndex = -1;
            for (var _i10 = 0; _i10 < this.days.length; _i10++) {
              if (today == this.days[_i10].day) {
                dayIndex = _i10;
                if (1 == this.days[_i10].sign) {
                  isSignToday = true;
                  break;
                }
              }
              if (today == this.days[_i10].day && 1 == this.days[_i10].sign) {
                isSignToday = true;
                break;
              }
            }
            if (isSignToday) appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
              content: "\u5df2\u7b7e\u5230"
            }); else {
              this.days[dayIndex].sign = 1;
              this.signNode[dayIndex].getChildByName("ok").active = true;
              cc.sys.localStorage.setItem("days_sign", JSON.stringify(this.days));
              this.signSuccessTip(this.signItem[dayIndex], 1);
            }
          } else {
            var tempday = "";
            for (var _i11 = 0; _i11 < this.days.length; _i11++) {
              tempday = 0 == _i11 ? this.getTodayDay() : this.getNextDay(tempday);
              this.days[_i11].day = tempday;
            }
            this.days[0].sign = 1;
            this.signNode[0].getChildByName("ok").active = true;
            cc.sys.localStorage.setItem("days_sign", JSON.stringify(this.days));
            this.signSuccessTip(this.signItem[0], 1);
          }
        } else if (3 == this.showType) {
          var isSign = true;
          var weekIndex = -1;
          for (var _i12 = 0; _i12 < this.days.length; _i12++) {
            var weekDay = this.getWeekDay();
            if (0 == this.days[_i12].sign && _i12 + 1 == weekDay) {
              weekIndex = _i12;
              isSign = false;
              break;
            }
          }
          if (isSign) appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
            content: "\u5df2\u7b7e\u5230"
          }); else {
            this.days[weekIndex].day = this.weekIndexInMonth();
            this.days[weekIndex].sign = 1;
            this.signNode[weekIndex].getChildByName("ok").active = true;
            cc.sys.localStorage.setItem("days_sign", JSON.stringify(this.days));
            this.signSuccessTip(this.signItem[weekIndex], 1);
          }
        }
      },
      signSuccessTip: function signSuccessTip(info, iscall) {
        if ("{}" != JSON.stringify(info)) {
          iscall && this.signCallback && this.signCallback(info.itemId, info.count);
          if (appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.item) {
            var item = underscore.find(appGame.gameServerRoom.commonConfig.item, function(value) {
              return value.id == info.itemId;
            }.bind(this));
            item && appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
              content: "\u5df2\u83b7\u5f97" + item.name + "\u5956\u52b1"
            });
          }
        }
      },
      onCloseBtnClicked: function onCloseBtnClicked() {
        appGame.banner.playBanner(3);
        this.closeCallback && this.closeCallback();
        this.node.removeFromParent();
      },
      weekIndexInMonth: function weekIndexInMonth() {
        var date = new Date(new Date(this).setDate(1) || new Date().setDate(1));
        var today = new Date();
        var d = today.getDate();
        var firstWeekDate;
        firstWeekDate = 0 === date.getDay() ? 6 : date.getDay() - 1;
        return Math.ceil((d + firstWeekDate) / 7);
      },
      getWeekDay: function getWeekDay() {
        var index = -1;
        var week = new Date().getDay();
        index = 0 == week ? 7 : week;
        return index;
      },
      getTodayDay: function getTodayDay() {
        var d = new Date();
        var yy = d.getFullYear();
        var mm = d.getMonth() + 1;
        var dd = d.getDate();
        var todayday = yy + "-";
        mm < 10 && (todayday += "0");
        todayday += mm + "-";
        dd < 10 && (todayday += "0");
        todayday += dd;
        return todayday;
      },
      getNextDay: function getNextDay(d) {
        d = new Date(d);
        d = +d + 864e5;
        d = new Date(d);
        var yy = d.getFullYear();
        var mm = d.getMonth() + 1;
        var dd = d.getDate();
        var nextday = yy + "-";
        mm < 10 && (nextday += "0");
        nextday += mm + "-";
        dd < 10 && (nextday += "0");
        nextday += dd;
        return nextday;
      }
    });
    cc._RF.pop();
  }, {} ],
  underscore: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ec994o1t0FK6Y0DWnJafEhA", "underscore");
    "use strict";
    (function() {
      var root = window;
      var previousUnderscore = root._;
      var breaker = {};
      var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
      var push = ArrayProto.push, slice = ArrayProto.slice, concat = ArrayProto.concat, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty;
      var nativeForEach = ArrayProto.forEach, nativeMap = ArrayProto.map, nativeReduce = ArrayProto.reduce, nativeReduceRight = ArrayProto.reduceRight, nativeFilter = ArrayProto.filter, nativeEvery = ArrayProto.every, nativeSome = ArrayProto.some, nativeIndexOf = ArrayProto.indexOf, nativeLastIndexOf = ArrayProto.lastIndexOf, nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind;
      var _ = function _(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
      };
      if ("undefined" !== typeof exports) {
        "undefined" !== typeof module && module.exports && (exports = module.exports = _);
        exports._ = _;
      } else root._ = _;
      _.VERSION = "1.5.2";
      var each = _.each = _.forEach = function(obj, iterator, context) {
        if (null == obj) return;
        if (nativeForEach && obj.forEach === nativeForEach) obj.forEach(iterator, context); else if (obj.length === +obj.length) {
          for (var i = 0, length = obj.length; i < length; i++) if (iterator.call(context, obj[i], i, obj) === breaker) return;
        } else {
          var keys = _.keys(obj);
          for (var i = 0, length = keys.length; i < length; i++) if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
        }
      };
      _.map = _.collect = function(obj, iterator, context) {
        var results = [];
        if (null == obj) return results;
        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
        each(obj, function(value, index, list) {
          results.push(iterator.call(context, value, index, list));
        });
        return results;
      };
      var reduceError = "Reduce of empty array with no initial value";
      _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        null == obj && (obj = []);
        if (nativeReduce && obj.reduce === nativeReduce) {
          context && (iterator = _.bind(iterator, context));
          return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
        }
        each(obj, function(value, index, list) {
          if (initial) memo = iterator.call(context, memo, value, index, list); else {
            memo = value;
            initial = true;
          }
        });
        if (!initial) throw new TypeError(reduceError);
        return memo;
      };
      _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        null == obj && (obj = []);
        if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
          context && (iterator = _.bind(iterator, context));
          return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
        }
        var length = obj.length;
        if (length !== +length) {
          var keys = _.keys(obj);
          length = keys.length;
        }
        each(obj, function(value, index, list) {
          index = keys ? keys[--length] : --length;
          if (initial) memo = iterator.call(context, memo, obj[index], index, list); else {
            memo = obj[index];
            initial = true;
          }
        });
        if (!initial) throw new TypeError(reduceError);
        return memo;
      };
      _.find = _.detect = function(obj, iterator, context) {
        var result;
        any(obj, function(value, index, list) {
          if (iterator.call(context, value, index, list)) {
            result = value;
            return true;
          }
        });
        return result;
      };
      _.filter = _.select = function(obj, iterator, context) {
        var results = [];
        if (null == obj) return results;
        if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
        each(obj, function(value, index, list) {
          iterator.call(context, value, index, list) && results.push(value);
        });
        return results;
      };
      _.reject = function(obj, iterator, context) {
        return _.filter(obj, function(value, index, list) {
          return !iterator.call(context, value, index, list);
        }, context);
      };
      _.every = _.all = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = true;
        if (null == obj) return result;
        if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
        each(obj, function(value, index, list) {
          if (!(result = result && iterator.call(context, value, index, list))) return breaker;
        });
        return !!result;
      };
      var any = _.some = _.any = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = false;
        if (null == obj) return result;
        if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
        each(obj, function(value, index, list) {
          if (result || (result = iterator.call(context, value, index, list))) return breaker;
        });
        return !!result;
      };
      _.contains = _.include = function(obj, target) {
        if (null == obj) return false;
        if (nativeIndexOf && obj.indexOf === nativeIndexOf) return -1 != obj.indexOf(target);
        return any(obj, function(value) {
          return value === target;
        });
      };
      _.invoke = function(obj, method) {
        var args = slice.call(arguments, 2);
        var isFunc = _.isFunction(method);
        return _.map(obj, function(value) {
          return (isFunc ? method : value[method]).apply(value, args);
        });
      };
      _.pluck = function(obj, key) {
        return _.map(obj, function(value) {
          return value[key];
        });
      };
      _.where = function(obj, attrs, first) {
        if (_.isEmpty(attrs)) return first ? void 0 : [];
        return _[first ? "find" : "filter"](obj, function(value) {
          for (var key in attrs) if (attrs[key] !== value[key]) return false;
          return true;
        });
      };
      _.findWhere = function(obj, attrs) {
        return _.where(obj, attrs, true);
      };
      _.max = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) return Math.max.apply(Math, obj);
        if (!iterator && _.isEmpty(obj)) return -Infinity;
        var result = {
          computed: -Infinity,
          value: -Infinity
        };
        each(obj, function(value, index, list) {
          var computed = iterator ? iterator.call(context, value, index, list) : value;
          computed > result.computed && (result = {
            value: value,
            computed: computed
          });
        });
        return result.value;
      };
      _.min = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) return Math.min.apply(Math, obj);
        if (!iterator && _.isEmpty(obj)) return Infinity;
        var result = {
          computed: Infinity,
          value: Infinity
        };
        each(obj, function(value, index, list) {
          var computed = iterator ? iterator.call(context, value, index, list) : value;
          computed < result.computed && (result = {
            value: value,
            computed: computed
          });
        });
        return result.value;
      };
      _.shuffle = function(obj) {
        var rand;
        var index = 0;
        var shuffled = [];
        each(obj, function(value) {
          rand = _.random(index++);
          shuffled[index - 1] = shuffled[rand];
          shuffled[rand] = value;
        });
        return shuffled;
      };
      _.sample = function(obj, n, guard) {
        if (arguments.length < 2 || guard) return obj[_.random(obj.length - 1)];
        return _.shuffle(obj).slice(0, Math.max(0, n));
      };
      var lookupIterator = function lookupIterator(value) {
        return _.isFunction(value) ? value : function(obj) {
          return obj[value];
        };
      };
      _.sortBy = function(obj, value, context) {
        var iterator = lookupIterator(value);
        return _.pluck(_.map(obj, function(value, index, list) {
          return {
            value: value,
            index: index,
            criteria: iterator.call(context, value, index, list)
          };
        }).sort(function(left, right) {
          var a = left.criteria;
          var b = right.criteria;
          if (a !== b) {
            if (a > b || void 0 === a) return 1;
            if (a < b || void 0 === b) return -1;
          }
          return left.index - right.index;
        }), "value");
      };
      var group = function group(behavior) {
        return function(obj, value, context) {
          var result = {};
          var iterator = null == value ? _.identity : lookupIterator(value);
          each(obj, function(value, index) {
            var key = iterator.call(context, value, index, obj);
            behavior(result, key, value);
          });
          return result;
        };
      };
      _.groupBy = group(function(result, key, value) {
        (_.has(result, key) ? result[key] : result[key] = []).push(value);
      });
      _.indexBy = group(function(result, key, value) {
        result[key] = value;
      });
      _.countBy = group(function(result, key) {
        _.has(result, key) ? result[key]++ : result[key] = 1;
      });
      _.sortedIndex = function(array, obj, iterator, context) {
        iterator = null == iterator ? _.identity : lookupIterator(iterator);
        var value = iterator.call(context, obj);
        var low = 0, high = array.length;
        while (low < high) {
          var mid = low + high >>> 1;
          iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
        }
        return low;
      };
      _.toArray = function(obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return slice.call(obj);
        if (obj.length === +obj.length) return _.map(obj, _.identity);
        return _.values(obj);
      };
      _.size = function(obj) {
        if (null == obj) return 0;
        return obj.length === +obj.length ? obj.length : _.keys(obj).length;
      };
      _.first = _.head = _.take = function(array, n, guard) {
        if (null == array) return;
        return null == n || guard ? array[0] : slice.call(array, 0, n);
      };
      _.initial = function(array, n, guard) {
        return slice.call(array, 0, array.length - (null == n || guard ? 1 : n));
      };
      _.last = function(array, n, guard) {
        if (null == array) return;
        return null == n || guard ? array[array.length - 1] : slice.call(array, Math.max(array.length - n, 0));
      };
      _.rest = _.tail = _.drop = function(array, n, guard) {
        return slice.call(array, null == n || guard ? 1 : n);
      };
      _.compact = function(array) {
        return _.filter(array, _.identity);
      };
      var flatten = function flatten(input, shallow, output) {
        if (shallow && _.every(input, _.isArray)) return concat.apply(output, input);
        each(input, function(value) {
          _.isArray(value) || _.isArguments(value) ? shallow ? push.apply(output, value) : flatten(value, shallow, output) : output.push(value);
        });
        return output;
      };
      _.flatten = function(array, shallow) {
        return flatten(array, shallow, []);
      };
      _.without = function(array) {
        return _.difference(array, slice.call(arguments, 1));
      };
      _.uniq = _.unique = function(array, isSorted, iterator, context) {
        if (_.isFunction(isSorted)) {
          context = iterator;
          iterator = isSorted;
          isSorted = false;
        }
        var initial = iterator ? _.map(array, iterator, context) : array;
        var results = [];
        var seen = [];
        each(initial, function(value, index) {
          if (isSorted ? !index || seen[seen.length - 1] !== value : !_.contains(seen, value)) {
            seen.push(value);
            results.push(array[index]);
          }
        });
        return results;
      };
      _.union = function() {
        return _.uniq(_.flatten(arguments, true));
      };
      _.intersection = function(array) {
        var rest = slice.call(arguments, 1);
        return _.filter(_.uniq(array), function(item) {
          return _.every(rest, function(other) {
            return _.indexOf(other, item) >= 0;
          });
        });
      };
      _.difference = function(array) {
        var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
        return _.filter(array, function(value) {
          return !_.contains(rest, value);
        });
      };
      _.zip = function() {
        var length = _.max(_.pluck(arguments, "length").concat(0));
        var results = new Array(length);
        for (var i = 0; i < length; i++) results[i] = _.pluck(arguments, "" + i);
        return results;
      };
      _.object = function(list, values) {
        if (null == list) return {};
        var result = {};
        for (var i = 0, length = list.length; i < length; i++) values ? result[list[i]] = values[i] : result[list[i][0]] = list[i][1];
        return result;
      };
      _.indexOf = function(array, item, isSorted) {
        if (null == array) return -1;
        var i = 0, length = array.length;
        if (isSorted) {
          if ("number" != typeof isSorted) {
            i = _.sortedIndex(array, item);
            return array[i] === item ? i : -1;
          }
          i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
        }
        if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
        for (;i < length; i++) if (array[i] === item) return i;
        return -1;
      };
      _.lastIndexOf = function(array, item, from) {
        if (null == array) return -1;
        var hasIndex = null != from;
        if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
        var i = hasIndex ? from : array.length;
        while (i--) if (array[i] === item) return i;
        return -1;
      };
      _.range = function(start, stop, step) {
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
      };
      var ctor = function ctor() {};
      _.bind = function(func, context) {
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
      };
      _.partial = function(func) {
        var args = slice.call(arguments, 1);
        return function() {
          return func.apply(this, args.concat(slice.call(arguments)));
        };
      };
      _.bindAll = function(obj) {
        var funcs = slice.call(arguments, 1);
        if (0 === funcs.length) throw new Error("bindAll must be passed function names");
        each(funcs, function(f) {
          obj[f] = _.bind(obj[f], obj);
        });
        return obj;
      };
      _.memoize = function(func, hasher) {
        var memo = {};
        hasher || (hasher = _.identity);
        return function() {
          var key = hasher.apply(this, arguments);
          return _.has(memo, key) ? memo[key] : memo[key] = func.apply(this, arguments);
        };
      };
      _.delay = function(func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function() {
          return func.apply(null, args);
        }, wait);
      };
      _.defer = function(func) {
        return _.delay.apply(_, [ func, 1 ].concat(slice.call(arguments, 1)));
      };
      _.throttle = function(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        options || (options = {});
        var later = function later() {
          previous = false === options.leading ? 0 : new Date();
          timeout = null;
          result = func.apply(context, args);
        };
        return function() {
          var now = new Date();
          previous || false !== options.leading || (previous = now);
          var remaining = wait - (now - previous);
          context = this;
          args = arguments;
          if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
          } else timeout || false === options.trailing || (timeout = setTimeout(later, remaining));
          return result;
        };
      };
      _.debounce = function(func, wait, immediate) {
        var timeout, args, context, timestamp, result;
        return function() {
          context = this;
          args = arguments;
          timestamp = new Date();
          var later = function later() {
            var last = new Date() - timestamp;
            if (last < wait) timeout = setTimeout(later, wait - last); else {
              timeout = null;
              immediate || (result = func.apply(context, args));
            }
          };
          var callNow = immediate && !timeout;
          timeout || (timeout = setTimeout(later, wait));
          callNow && (result = func.apply(context, args));
          return result;
        };
      };
      _.once = function(func) {
        var ran = false, memo;
        return function() {
          if (ran) return memo;
          ran = true;
          memo = func.apply(this, arguments);
          func = null;
          return memo;
        };
      };
      _.wrap = function(func, wrapper) {
        return function() {
          var args = [ func ];
          push.apply(args, arguments);
          return wrapper.apply(this, args);
        };
      };
      _.compose = function() {
        var funcs = arguments;
        return function() {
          var args = arguments;
          for (var i = funcs.length - 1; i >= 0; i--) args = [ funcs[i].apply(this, args) ];
          return args[0];
        };
      };
      _.after = function(times, func) {
        return function() {
          if (--times < 1) return func.apply(this, arguments);
        };
      };
      _.keys = nativeKeys || function(obj) {
        if (obj !== Object(obj)) throw new TypeError("Invalid object");
        var keys = [];
        for (var key in obj) _.has(obj, key) && keys.push(key);
        return keys;
      };
      _.values = function(obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = new Array(length);
        for (var i = 0; i < length; i++) values[i] = obj[keys[i]];
        return values;
      };
      _.pairs = function(obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var pairs = new Array(length);
        for (var i = 0; i < length; i++) pairs[i] = [ keys[i], obj[keys[i]] ];
        return pairs;
      };
      _.invert = function(obj) {
        var result = {};
        var keys = _.keys(obj);
        for (var i = 0, length = keys.length; i < length; i++) result[obj[keys[i]]] = keys[i];
        return result;
      };
      _.functions = _.methods = function(obj) {
        var names = [];
        for (var key in obj) _.isFunction(obj[key]) && names.push(key);
        return names.sort();
      };
      _.extend = function(obj) {
        each(slice.call(arguments, 1), function(source) {
          if (source) for (var prop in source) obj[prop] = source[prop];
        });
        return obj;
      };
      _.pick = function(obj) {
        var copy = {};
        var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        each(keys, function(key) {
          key in obj && (copy[key] = obj[key]);
        });
        return copy;
      };
      _.omit = function(obj) {
        var copy = {};
        var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        for (var key in obj) _.contains(keys, key) || (copy[key] = obj[key]);
        return copy;
      };
      _.defaults = function(obj) {
        each(slice.call(arguments, 1), function(source) {
          if (source) for (var prop in source) void 0 === obj[prop] && (obj[prop] = source[prop]);
        });
        return obj;
      };
      _.clone = function(obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
      };
      _.tap = function(obj, interceptor) {
        interceptor(obj);
        return obj;
      };
      var eq = function eq(a, b, aStack, bStack) {
        if (a === b) return 0 !== a || 1 / a == 1 / b;
        if (null == a || null == b) return a === b;
        a instanceof _ && (a = a._wrapped);
        b instanceof _ && (b = b._wrapped);
        var className = toString.call(a);
        if (className != toString.call(b)) return false;
        switch (className) {
         case "[object String]":
          return a == String(b);

         case "[object Number]":
          return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;

         case "[object Date]":
         case "[object Boolean]":
          return +a == +b;

         case "[object RegExp]":
          return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
        }
        if ("object" != typeof a || "object" != typeof b) return false;
        var length = aStack.length;
        while (length--) if (aStack[length] == a) return bStack[length] == b;
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor)) return false;
        aStack.push(a);
        bStack.push(b);
        var size = 0, result = true;
        if ("[object Array]" == className) {
          size = a.length;
          result = size == b.length;
          if (result) while (size--) if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        } else {
          for (var key in a) if (_.has(a, key)) {
            size++;
            if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
          }
          if (result) {
            for (key in b) if (_.has(b, key) && !size--) break;
            result = !size;
          }
        }
        aStack.pop();
        bStack.pop();
        return result;
      };
      _.isEqual = function(a, b) {
        return eq(a, b, [], []);
      };
      _.isEmpty = function(obj) {
        if (null == obj) return true;
        if (_.isArray(obj) || _.isString(obj)) return 0 === obj.length;
        for (var key in obj) if (_.has(obj, key)) return false;
        return true;
      };
      _.isElement = function(obj) {
        return !!(obj && 1 === obj.nodeType);
      };
      _.isArray = nativeIsArray || function(obj) {
        return "[object Array]" == toString.call(obj);
      };
      _.isObject = function(obj) {
        return obj === Object(obj);
      };
      each([ "Arguments", "Function", "String", "Number", "Date", "RegExp" ], function(name) {
        _["is" + name] = function(obj) {
          return toString.call(obj) == "[object " + name + "]";
        };
      });
      _.isArguments(arguments) || (_.isArguments = function(obj) {
        return !!(obj && _.has(obj, "callee"));
      });
      "function" !== typeof /./ && (_.isFunction = function(obj) {
        return "function" === typeof obj;
      });
      _.isFinite = function(obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
      };
      _.isNaN = function(obj) {
        return _.isNumber(obj) && obj != +obj;
      };
      _.isBoolean = function(obj) {
        return true === obj || false === obj || "[object Boolean]" == toString.call(obj);
      };
      _.isNull = function(obj) {
        return null === obj;
      };
      _.isUndefined = function(obj) {
        return void 0 === obj;
      };
      _.has = function(obj, key) {
        return hasOwnProperty.call(obj, key);
      };
      _.noConflict = function() {
        root._ = previousUnderscore;
        return this;
      };
      _.identity = function(value) {
        return value;
      };
      _.times = function(n, iterator, context) {
        var accum = Array(Math.max(0, n));
        for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
        return accum;
      };
      _.random = function(min, max) {
        if (null == max) {
          max = min;
          min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
      };
      var entityMap = {
        escape: {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#x27;"
        }
      };
      entityMap.unescape = _.invert(entityMap.escape);
      var entityRegexes = {
        escape: new RegExp("[" + _.keys(entityMap.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + _.keys(entityMap.unescape).join("|") + ")", "g")
      };
      _.each([ "escape", "unescape" ], function(method) {
        _[method] = function(string) {
          if (null == string) return "";
          return ("" + string).replace(entityRegexes[method], function(match) {
            return entityMap[method][match];
          });
        };
      });
      _.result = function(object, property) {
        if (null == object) return;
        var value = object[property];
        return _.isFunction(value) ? value.call(object) : value;
      };
      _.mixin = function(obj) {
        each(_.functions(obj), function(name) {
          var func = _[name] = obj[name];
          _.prototype[name] = function() {
            var args = [ this._wrapped ];
            push.apply(args, arguments);
            return result.call(this, func.apply(_, args));
          };
        });
      };
      var idCounter = 0;
      _.uniqueId = function(prefix) {
        var id = ++idCounter + "";
        return prefix ? prefix + id : id;
      };
      _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
      };
      var noMatch = /(.)^/;
      var escapes = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\t": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
      _.template = function(text, data, settings) {
        var render;
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = new RegExp([ (settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source ].join("|") + "|$", "g");
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
          source += text.slice(index, offset).replace(escaper, function(match) {
            return "\\" + escapes[match];
          });
          escape && (source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'");
          interpolate && (source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'");
          evaluate && (source += "';\n" + evaluate + "\n__p+='");
          index = offset + match.length;
          return match;
        });
        source += "';\n";
        settings.variable || (source = "with(obj||{}){\n" + source + "}\n");
        source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
        try {
          render = new Function(settings.variable || "obj", "_", source);
        } catch (e) {
          e.source = source;
          throw e;
        }
        if (data) return render(data, _);
        var template = function template(data) {
          return render.call(this, data, _);
        };
        template.source = "function(" + (settings.variable || "obj") + "){\n" + source + "}";
        return template;
      };
      _.chain = function(obj) {
        return _(obj).chain();
      };
      var result = function result(obj) {
        return this._chain ? _(obj).chain() : obj;
      };
      _.mixin(_);
      each([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
          var obj = this._wrapped;
          method.apply(obj, arguments);
          "shift" != name && "splice" != name || 0 !== obj.length || delete obj[0];
          return result.call(this, obj);
        };
      });
      each([ "concat", "join", "slice" ], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
          return result.call(this, method.apply(this._wrapped, arguments));
        };
      });
      _.extend(_.prototype, {
        chain: function chain() {
          this._chain = true;
          return this;
        },
        value: function value() {
          return this._wrapped;
        }
      });
    }).call(void 0);
    cc._RF.pop();
  }, {} ],
  updateTime: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4cc67JlC1xALoZNsT7RR3yO", "updateTime");
    "use strict";
    var countDownInterval;
    cc.Class({
      extends: cc.Component,
      properties: {
        clockNode: cc.Node
      },
      onLoad: function onLoad() {
        appGame.gameServerRoom.on("updateCompetitionTime", this.updateTime, this);
        this.clockNode.getComponent(cc.ProgressBar).progress = 1;
        this._count = 0;
      },
      onDestroy: function onDestroy() {
        appGame.gameServerRoom.off("updateCompetitionTime", this.updateTime, this);
        clearInterval(countDownInterval);
      },
      start: function start() {},
      updateTime: function updateTime(type, count, totalcount) {
        if (1 == type) {
          count *= 1e3;
          totalcount *= 1e3;
          var durationtime = 100;
          this._count = count;
          this.clockNode && (this.clockNode.getComponent(cc.ProgressBar).progress = this._count / totalcount);
          clearInterval(countDownInterval);
          countDownInterval = setInterval(function() {
            if (this._count > durationtime) this._count -= durationtime; else {
              this._count = 0;
              appGame.gameServerRoom.emit("competitionGameOver", 2);
              clearInterval(countDownInterval);
            }
            this.clockNode && (this.clockNode.getComponent(cc.ProgressBar).progress = this._count / totalcount);
          }.bind(this), durationtime);
        } else clearInterval(countDownInterval);
      }
    });
    cc._RF.pop();
  }, {} ],
  "use_v2.0.x_cc.Toggle_event": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "16452nVLYBF9rx0gR7C2AO8", "use_v2.0.x_cc.Toggle_event");
    "use strict";
    cc.Toggle && (cc.Toggle._triggerEventInScript_check = true);
    cc._RF.pop();
  }, {} ],
  util: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8a9f96OA6hCcY7Fl9XOa3ug", "util");
    "use strict";
    module.exports = {
      format: function format(f) {
        if ("string" !== typeof f) {
          var objects = [];
          for (var i = 0; i < arguments.length; i++) objects.push(inspect(arguments[i]));
          return objects.join(" ");
        }
        var i = 1;
        var args = arguments;
        var len = args.length;
        var formatRegExp = new RegExp("%%|%s|%d|%j", "g");
        var str = String(f).replace(formatRegExp, function(x) {
          if ("%%" === x) return "%";
          if (i >= len) return x;
          switch (x) {
           case "%s":
            return String(args[i++]);

           case "%d":
            return Number(args[i++]);

           case "%j":
            return JSON.stringify(args[i++]);

           default:
            return x;
          }
        });
        for (var x = args[i]; i < len; x = args[++i]) str += null === x || "object" !== typeof x ? " " + x : " " + inspect(x);
        return str;
      },
      compareVersion: function compareVersion(v1, v2) {
        v1 = v1.split(".");
        v2 = v2.split(".");
        var len = Math.max(v1.length, v2.length);
        while (v1.length < len) v1.push("0");
        while (v2.length < len) v2.push("0");
        for (var i = 0; i < len; i++) {
          var num1 = parseInt(v1[i]);
          var num2 = parseInt(v2[i]);
          if (num1 > num2) return 1;
          if (num1 < num2) return -1;
        }
        return 0;
      },
      loadGameAutoAtlas: function loadGameAutoAtlas(url, spriteName, node, cb) {
        true;
        cc.resources.load(url, cc.SpriteAtlas, function(err, atlas) {
          var frame = atlas.getSpriteFrame(spriteName);
          node.spriteFrame = frame;
          cb(true);
        }.bind(this));
      },
      loadJSONData: function loadJSONData(bundleName, name, callback) {
        cc.assetManager.loadBundle(bundleName, function(err, bundle) {
          bundle.load(name, cc.JsonAsset, function(error, res) {
            if (error) return;
            var jsondata = res.json;
            callback(jsondata);
          }.bind(this));
        }.bind(this));
      },
      loadBundleSprite: function loadBundleSprite(bundlename, loadname, node, cb) {
        cc.assetManager.loadBundle(bundlename, function(err, bundle) {
          bundle.load(loadname, cc.SpriteFrame, function(err, spriteframe) {
            if (err) return;
            node.spriteFrame = spriteframe;
            cb(true);
          }.bind(this));
        }.bind(this));
      },
      addChildToParent: function addChildToParent(prefabName, parent, id) {
        cc.assetManager.loadBundle("comPrefab", function(err, bundle) {
          bundle.load(prefabName, cc.Prefab, function(error, prefab) {
            if (error) {
              cc.error(error);
              return;
            }
            var instance = cc.instantiate(prefab);
            parent.addChild(instance);
            instance.getComponent("item").init(id);
          }.bind(this));
        }.bind(this));
      },
      guid: function guid() {
        function S4() {
          return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
        }
        return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
      },
      timeConvertInt: function timeConvertInt(time) {
        var sceond = parseInt(time / 1e3);
        return sceond;
      },
      random: function random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
      },
      distance: function distance(p1, p2) {
        var dx = Math.abs(p2.x - p1.x);
        var dy = Math.abs(p2.y - p1.y);
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      },
      goldCrarryBit: function goldCrarryBit(gold) {
        var array = [ [ 1e8, "N" ], [ 1e7, "T" ], [ 1e6, "G" ], [ 1e5, "M" ], [ 1e4, "K" ], [ 1e3, "B" ] ];
        for (var i = 0; i < array.length; i++) {
          var value = gold / array[i][0];
          if (value > 1) return "" + value.toFixed(1) + array[i][1];
        }
        return gold;
      },
      setVirusColor: function setVirusColor(node, color) {
        for (var i = 0; i < node.children.length; i++) {
          var js = node.children[i].getComponent("color");
          null != js && (node.children[i].color = color);
          this.setVirusColor(node.children[i], color);
        }
      },
      getVirusColorByHp: function getVirusColorByHp(hp) {
        for (var i = 0; i < gVirusColor.length; i++) if (hp <= gVirusColor[i].pro) return gVirusColor[i].color;
      },
      getVirusScaleByHp: function getVirusScaleByHp(hp) {
        for (var i = 0; i < gVirusColor.length; i++) if (hp <= gVirusColor[i].pro) return gVirusScale[i].scale;
      },
      getRandomSpeed: function getRandomSpeed() {
        var index = random(0, gSpeed.length - 1);
        return gSpeed[index];
      },
      randAlloc: function randAlloc(total, min, max, length) {
        if (min * length > total || max * length < total) throw Error("\u6ca1\u6cd5\u6ee1\u8db3\u6700\u6700\u5c11 " + min + " \u6700\u5927 " + max + " \u7684\u6761\u4ef6");
        var result = [];
        var restValue = total;
        var restLength = length;
        for (var i = 0; i < length - 1; i++) {
          restLength--;
          var restMin = restLength * min;
          var restMax = restLength * max;
          var usable = restValue - restMin;
          var minValue = Math.max(min, restValue - restMax);
          var limit = Math.min(usable - minValue, 2 * (max - minValue));
          result[i] = Math.min(max, minValue + Math.floor(limit * Math.random()));
          restValue -= result[i];
        }
        result[length - 1] = restValue;
        return result;
      },
      copyText: function copyText(word, rid) {
        if (cc.sys.platform == cc.sys.BYTEDANCE_GAME || cc.sys.platform == cc.sys.WECHAT_GAME || cc.sys.platform == cc.sys.BAIDU_GAME) {
          var comObject;
          comObject = cc.sys.platform == cc.sys.BAIDU_GAME ? swan : cc.sys.platform == cc.sys.WECHAT_GAME ? wx : tt;
          comObject.setClipboardData({
            data: word,
            success: function success(res) {
              cc.sys.platform == cc.sys.BAIDU_GAME && comObject.showToast({
                title: "\u52a0\u8f7d\u5b8c\u6210",
                icon: "none"
              });
              comObject.getClipboardData({
                success: function success(res) {
                  var spreadUrl = consts.HTTP_SPREAD_REPORT + "rid=" + rid + "&status=1";
                  httpUtils.httpSendRequest(spreadUrl, function(spreadRes) {});
                },
                fail: function fail(res) {
                  var spreadUrl = consts.HTTP_SPREAD_REPORT + "rid=" + rid + "&status=0";
                  httpUtils.httpSendRequest(spreadUrl, function(spreadRes) {});
                }
              });
            },
            fail: function fail(res) {
              var spreadUrl = consts.HTTP_SPREAD_REPORT + "rid=" + rid + "&status=0";
              httpUtils.httpSendRequest(spreadUrl, function(spreadRes) {});
            }
          });
        }
      },
      spreadWordFun: function spreadWordFun() {
        if (cc.sys.platform == cc.sys.BYTEDANCE_GAME || cc.sys.platform == cc.sys.WECHAT_GAME || cc.sys.platform == cc.sys.BAIDU_GAME) {
          var comApp, combrand, commodel;
          if (cc.sys.platform == cc.sys.BAIDU_GAME) {
            var _swan$getSystemInfoSy = swan.getSystemInfoSync(), host = _swan$getSystemInfoSy.host, brand = _swan$getSystemInfoSy.brand, model = _swan$getSystemInfoSy.model;
            comApp = host;
            combrand = brand;
            commodel = model;
          } else if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            var _wx$getSystemInfoSync = wx.getSystemInfoSync(), appName = _wx$getSystemInfoSync.appName, _brand = _wx$getSystemInfoSync.brand, _model = _wx$getSystemInfoSync.model;
            comApp = appName;
            combrand = _brand;
            commodel = _model;
          } else {
            var _tt$getSystemInfoSync = tt.getSystemInfoSync(), _appName = _tt$getSystemInfoSync.appName, _brand2 = _tt$getSystemInfoSync.brand, _model2 = _tt$getSystemInfoSync.model;
            comApp = _appName;
            combrand = _brand2;
            commodel = _model2;
          }
          var param = {
            did: appGame.userId,
            package: consts.HTTP_RECORD_PACKAGE,
            app: comApp,
            brand: combrand,
            model: commodel
          };
          console.log("param==" + JSON.stringify(param));
          httpUtils.httpPostParam(consts.HTTP_SPREAD_WORD, param, function(resWord) {
            if (resWord) if (200 == resWord.code && resWord.data) {
              appGame.gameServerRoom.wordRid = resWord.rid;
              util.copyText(resWord.data, resWord.rid);
            } else appGame.gameServerRoom.wordRid = "";
          }.bind(this));
        }
      },
      spreadClose: function spreadClose(rid) {
        var ridUrl = consts.HTTP_SPREAD_CLOSE + rid;
        httpUtils.httpSendRequest(ridUrl, function(spreadRes) {});
      }
    };
    cc._RF.pop();
  }, {} ],
  videoBanner: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "984cbg+bTFE9qHzstOIM3zd", "videoBanner");
    "use strict";
    var videoAdId = "";
    var appId = "";
    var boolsuccess = false;
    var VideoBanner = cc.Class({
      properties: {},
      ctor: function ctor() {
        this.instance = null;
      },
      statics: {
        create: function create(data) {
          if (!this.instance) {
            this.instance = new VideoBanner();
            this.instance.initWithData(data);
            return this.instance;
          }
        }
      },
      initWithData: function initWithData(data) {
        this.isForce = false;
        this.callback = null;
        this.count = 1;
        if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
          videoAdId = "1gr8f7hvpon3mb2llf";
          appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.videoId && appGame.gameServerRoom.commonConfig.videoId.toutiao && (videoAdId = appGame.gameServerRoom.commonConfig.videoId.toutiao.adUnitId);
          this.globalData = {
            videoAd: tt.createRewardedVideoAd({
              adUnitId: videoAdId
            })
          };
        } else if (cc.sys.platform == cc.sys.WECHAT_GAME && "WX" == appGame.platform) {
          videoAdId = "adunit-168ed0ed4d9f8fad";
          appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.videoId && appGame.gameServerRoom.commonConfig.videoId.WX && (videoAdId = appGame.gameServerRoom.commonConfig.videoId.WX.adUnitId);
          this.globalData = {
            videoAd: wx.createRewardedVideoAd({
              adUnitId: videoAdId
            })
          };
        } else if (cc.sys.platform == cc.sys.WECHAT_GAME && "QQ" == appGame.platform) {
          videoAdId = "29ce1e526c81abd0e8ba8df8b62e0a9e";
          appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.videoId && appGame.gameServerRoom.commonConfig.videoId.QQ && (videoAdId = appGame.gameServerRoom.commonConfig.videoId.QQ.adUnitId);
          this.globalData = {
            videoAd: qq.createRewardedVideoAd({
              adUnitId: videoAdId
            })
          };
        } else if (cc.sys.platform == cc.sys.BAIDU_GAME) {
          videoAdId = "7433930";
          appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.videoId && appGame.gameServerRoom.commonConfig.videoId.baidu && (videoAdId = appGame.gameServerRoom.commonConfig.videoId.baidu.adUnitId);
          appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.videoId && appGame.gameServerRoom.commonConfig.videoId.baidu && (appId = appGame.gameServerRoom.commonConfig.videoId.baidu.appSid);
          this.globalData = {
            videoAd: swan.createRewardedVideoAd({
              adUnitId: videoAdId,
              appSid: appId
            })
          };
        }
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u5e7f\u544a\u4f4d\u6fc0\u52b1\u89c6\u9891",
          content: "\u521b\u5efa\u6210\u529f+\u5e7f\u544a\u4f4d+" + videoAdId
        }, function() {});
        if (cc.sys.platform != cc.sys.WECHAT_GAME && this.globalData && this.globalData.videoAd) {
          this.globalData.videoAd.onClose(function(res) {
            if (res.isEnded) {
              console.log("\u770b\u5b8c\u89c6\u9891\u5173\u95ed");
              httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
                title: "\u5e7f\u544a\u4f4d\u6fc0\u52b1\u89c6\u9891",
                content: "\u70b9\u51fb\u5173\u95ed+\u5e7f\u544a\u4f4d+" + videoAdId + "\u64ad\u653e\u6210\u529f"
              }, function() {});
              this.callback && this.callback(1);
              appGame.audioMgr.getMusicStatus(function(onOff) {
                onOff && appGame.audioMgr.setMusicOnOff(onOff);
              }.bind(this));
            } else {
              httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
                title: "\u5e7f\u544a\u4f4d\u6fc0\u52b1\u89c6\u9891",
                content: "\u70b9\u51fb\u5173\u95ed+\u5e7f\u544a\u4f4d+" + videoAdId + "\u64ad\u653e\u5931\u8d25"
              }, function() {});
              console.log("\u672a\u770b\u5b8c\u89c6\u9891\u5173\u95ed==" + this.isForce);
              if (!this.isForce) {
                this.callback && this.callback(2);
                appGame.audioMgr.getMusicStatus(function(onOff) {
                  onOff && appGame.audioMgr.setMusicOnOff(onOff);
                }.bind(this));
              }
            }
          }.bind(this));
          this.globalData.videoAd.onError(function(listener) {
            console.log("\u64ad\u653e\u89c6\u9891\u5e7f\u544a\u51fa\u95ee\u9898");
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: "\u5e7f\u544a\u4f4d\u6fc0\u52b1\u89c6\u9891",
              content: "\u5c55\u793a\u5931\u8d25+\u5e7f\u544a\u4f4d+" + videoAdId + "\u539f\u56e0+" + listener.errCode + listener.errMsg
            }, function() {});
            if (!this.isForce) {
              this.callback && this.callback(3);
              appGame.audioMgr.getMusicStatus(function(onOff) {
                onOff && appGame.audioMgr.setMusicOnOff(onOff);
              }.bind(this));
            }
          }.bind(this));
        }
      },
      playVideoAd: function playVideoAd(sceneId, isForce, cb) {
        this.isForce = isForce;
        console.log("\u64ad\u653e\u89c6\u9891\u5e7f\u544a");
        this.count++;
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: "\u5e7f\u544a\u4f4d\u6fc0\u52b1\u89c6\u9891",
          content: "\u70b9\u51fb\u6b21\u6570+" + this.count + "+\u5e7f\u544a\u4f4d+" + videoAdId
        }, function() {});
        if (this.globalData && this.globalData.videoAd) {
          appGame.audioMgr.getMusicStatus(function(onOff) {
            onOff && appGame.audioMgr.setMusicOnOff(onOff);
          }.bind(this));
          var videoAd = this.globalData.videoAd;
          if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            console.log("\u64ad\u653e\u5fae\u4fe1\u89c6\u9891");
            _videoAd && _videoAd.destroy();
            var _videoAd = null;
            appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.videoId && appGame.gameServerRoom.commonConfig.videoId.QQ && (videoAdId = appGame.gameServerRoom.commonConfig.videoId.QQ.adUnitId);
            _videoAd = qq.createRewardedVideoAd({
              adUnitId: videoAdId
            });
            _videoAd.onError(function(res) {
              if (!this.isForce) {
                this.callback && this.callback(3);
                appGame.audioMgr.getMusicStatus(function(onOff) {
                  onOff && appGame.audioMgr.setMusicOnOff(onOff);
                }.bind(this));
              }
              httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
                title: "\u5e7f\u544a\u4f4d\u6fc0\u52b1\u89c6\u9891",
                content: "\u5c55\u793a\u5931\u8d25+\u5e7f\u544a\u4f4d+" + videoAdId + "\u539f\u56e0+" + res.errCode + res.errMsg
              }, function() {});
              console.log("videoAd onError", res);
            }.bind(this));
            _videoAd.onLoad(function(res) {
              console.log("videoAd onLoad", res);
            });
            _videoAd.onClose(function(res) {
              if (res.isEnded) {
                if (boolsuccess) return;
                boolsuccess = true;
                httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
                  title: "\u5e7f\u544a\u4f4d\u6fc0\u52b1\u89c6\u9891",
                  content: "\u70b9\u51fb\u5173\u95ed+\u5e7f\u544a\u4f4d+" + videoAdId + "\u64ad\u653e\u6210\u529f"
                }, function() {});
                this.callback && this.callback(1);
                appGame.audioMgr.getMusicStatus(function(onOff) {
                  onOff && appGame.audioMgr.setMusicOnOff(onOff);
                }.bind(this));
              } else {
                httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
                  title: "\u5e7f\u544a\u4f4d\u6fc0\u52b1\u89c6\u9891",
                  content: "\u70b9\u51fb\u5173\u95ed+\u5e7f\u544a\u4f4d+" + videoAdId + "\u64ad\u653e\u5931\u8d25"
                }, function() {});
                if (!this.isForce) {
                  this.callback && this.callback(2);
                  appGame.audioMgr.getMusicStatus(function(onOff) {
                    onOff && appGame.audioMgr.setMusicOnOff(onOff);
                  }.bind(this));
                }
              }
              _videoAd.offClose();
            }.bind(this));
            _videoAd.load().then(function() {
              console.log("\u6fc0\u52b1\u89c6\u9891\u52a0\u8f7d\u6210\u529f");
              _videoAd.show().then(function() {
                boolsuccess = false;
                httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
                  title: "\u5e7f\u544a\u4f4d\u6fc0\u52b1\u89c6\u9891",
                  content: "\u5c55\u793a\u6210\u529f+\u5e7f\u544a\u4f4d+" + videoAdId + "\u573a\u666f" + sceneId
                }, function() {});
                console.log("\u6fc0\u52b1\u89c6\u9891 \u5e7f\u544a\u663e\u793a\u6210\u529f");
              })["catch"](function(err) {
                httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
                  title: "\u5e7f\u544a\u4f4d\u6fc0\u52b1\u89c6\u9891",
                  content: "\u5c55\u793a\u5931\u8d25+\u5e7f\u544a\u4f4d+" + videoAdId + "\u573a\u666f" + sceneId
                }, function() {});
                console.log("\u6fc0\u52b1\u89c6\u9891 \u5e7f\u544a\u663e\u793a\u5931\u8d25");
              });
            })["catch"](function(err) {
              console.log("\u6fc0\u52b1\u89c6\u9891\u52a0\u8f7d\u5931\u8d25");
            });
          } else {
            videoAd.show().then(function() {
              httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
                title: "\u5e7f\u544a\u4f4d\u6fc0\u52b1\u89c6\u9891",
                content: "\u5c55\u793a\u6210\u529f+\u5e7f\u544a\u4f4d+" + videoAdId + "\u573a\u666f" + sceneId
              }, function() {});
              console.log("\u5e7f\u544a\u663e\u793a\u6210\u529f");
            })["catch"](function(err) {
              httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
                title: "\u5e7f\u544a\u4f4d\u6fc0\u52b1\u89c6\u9891",
                content: "\u5c55\u793a\u5931\u8d25+\u5e7f\u544a\u4f4d+" + videoAdId + "\u573a\u666f" + sceneId
              }, function() {});
              console.log("\u5e7f\u544a\u7ec4\u4ef6\u51fa\u73b0\u95ee\u9898", err);
              videoAd.load().then(function() {
                console.log("\u624b\u52a8\u52a0\u8f7d\u6210\u529f");
                httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
                  title: "\u5e7f\u544a\u4f4d\u6fc0\u52b1\u89c6\u9891",
                  content: "\u52a0\u8f7d\u6210\u529f+\u5e7f\u544a\u4f4d+" + videoAdId
                }, function() {});
                return videoAd.show();
              });
            });
            this.callback = cb;
          }
        } else {
          appGame.audioMgr.getMusicStatus(function(onOff) {
            onOff && appGame.audioMgr.setMusicOnOff(onOff);
          }.bind(this));
          cb(1);
        }
      }
    });
    module.exports = VideoBanner;
    cc._RF.pop();
  }, {} ],
  wxgridAd: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "27d3buB6l5GlarYvR/+7For", "wxgridAd");
    "use strict";
    var targetBannerAdWidth = 200;
    var width = 100;
    var height = 100;
    var adId = "2b0c0dgf20nf3qe2jj";
    var GridAd = cc.Class({
      properties: {},
      ctor: function ctor() {
        this.instance = null;
      },
      statics: {
        create: function create(data) {
          if (!this.instance) {
            this.instance = new GridAd();
            this.instance.initWithData(data);
            return this.instance;
          }
        }
      },
      initWithData: function initWithData(data) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME && "WX" == appGame.platform) {
          var _wx$getSystemInfoSync = wx.getSystemInfoSync(), windowWidth = _wx$getSystemInfoSync.windowWidth, windowHeight = _wx$getSystemInfoSync.windowHeight;
          this.targetBannerAdWidth = 200;
          this.width = windowWidth;
          this.height = windowHeight;
          this.adId = "adunit-144bcfc4f8f3cefe";
          console.log("banner \u7b2c\u4e00\u6b21\u521b\u5efa");
          this.globalData = {
            gridAd: wx.createGridAd({
              adUnitId: this.adId,
              adTheme: "white",
              gridCount: 5,
              style: {
                left: 0,
                top: 0,
                width: 330,
                opacity: .8
              }
            })
          };
          this.globalData.gridAd.onError(function(res) {
            console.log("\u76d2\u5b50\u5e7f\u544aonError", res);
          });
        }
      },
      playGridAd: function playGridAd(isShow) {
        if (isShow) {
          if (this.globalData && this.globalData.gridAd) {
            console.log("\u64ad\u653e\u76d2\u5b50\u5e7f\u544a");
            this.globalData.gridAd.show().then(function() {
              console.log("\u76d2\u5b50\u5e7f\u544a\u5c55\u793a\u6210\u529f");
            });
          }
        } else this.globalData.gridAd.hide();
      }
    });
    module.exports = GridAd;
    cc._RF.pop();
  }, {} ],
  wxnativeAd: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9a169f/Cs9NFp08r0mXOa8e", "wxnativeAd");
    "use strict";
    var WXNativeAd = cc.Class({
      properties: {},
      ctor: function ctor() {
        this.instance = null;
      },
      statics: {
        create: function create(data) {
          if (!this.instance) {
            this.instance = new WXNativeAd();
            this.instance.initWithData(data);
            return this.instance;
          }
        }
      },
      initWithData: function initWithData(data) {
        if (cc.sys.platform == cc.sys.OPPO_GAME) this.globalData = {
          nativeAd: qg.createNativeAd({
            adUnitId: "236300"
          })
        }; else if (cc.sys.platform == cc.sys.WECHAT_GAME && "WX" == appGame.platform) {
          var _wx$getSystemInfoSync = wx.getSystemInfoSync(), windowWidth = _wx$getSystemInfoSync.windowWidth, windowHeight = _wx$getSystemInfoSync.windowHeight;
          this.targetBannerAdWidth = 200;
          this.width = windowWidth;
          this.height = windowHeight;
          console.log("\u539f\u751f\u5e7f\u544a111111111111");
          this.globalData = {
            nativeAd: wx.createCustomAd({
              adUnitId: "adunit-48fb335e928d3b4d",
              style: {
                left: 20,
                top: this.height - this.targetBannerAdWidth / 16 * 9
              }
            })
          };
        }
        this.globalData && this.globalData.nativeAd && this.globalData.nativeAd.onError(function(err) {
          console.log("\u8bbe\u7f6e\u539f\u751f\u5e7f\u544a\u51fa\u9519\uff1a" + JSON.stringify(err));
        });
      },
      playAd: function playAd(isShow) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME && "WX" == appGame.platform) if (isShow) {
          var nativeAd = this.globalData.nativeAd;
          nativeAd.show();
        } else {
          console.log("\u64ad\u653e\u539f\u751f\u5e7f\u544a==");
          this.globalData.nativeAd.hide();
        } else if (this.globalData && this.globalData.nativeAd) {
          var _nativeAd = this.globalData.nativeAd;
          _nativeAd.load().then(function() {
            console.log("\u539f\u751f\u5e7f\u544a\u663e\u793a\u6210\u529f");
          })["catch"](function(err) {
            console.log("\u539f\u751f\u5e7f\u544a\u51fa\u73b0\u95ee\u9898", err);
          });
          _nativeAd.onLoad(function(res) {
            console.log("\u52a0\u8f7d\u539f\u751f\u5e7f\u544a\u6210\u529f", "\uff1a" + JSON.stringify(res));
            res.adList && res.adList.length > 0 && (appGame.nativeAdData = res.adList[0]);
            appGame.gameServerRoom.emit(consts.LOCAL_GAME_RESULT_NATIVE_AD, {});
          });
        }
      }
    });
    module.exports = WXNativeAd;
    cc._RF.pop();
  }, {} ]
}, {}, [ "Info", "Main", "g - 001", "Animal", "Consts", "Game", "GridManager", "HexonTile", "Res", "com", "IntMap", "DCBackground", "DCParticleSystem", "DailyGetDialog", "GetDialog", "HbDialog", "LevelDialog", "LevelupDialog", "LuckyDialog", "PauseDialog", "ShopDialog", "ShopItemTemplate", "WinDialog", "ConnectManager", "Message", "MessageBase", "MessageDispatch", "MessageHandler", "MessageType", "Socket", "Device", "FSM", "InfiniteBackground", "LocalLifeSystem", "LocalTimeSystem", "PoolManager", "PsFx", "PsFxPlayer", "PsSpawner", "easing", "BoostsAction", "ClickAudio", "ClickAudioManager", "DataCenter", "FrameSwitch", "InputSystem", "JoyStick", "Net", "Signal", "SpriteFrameCache", "DCLabel", "DCPandoraPoint", "DCSprite", "DCToggle", "DCUI", "LoadingManager", "MessageBoxComponent", "MessageBoxManager", "PandoraPoint", "ToastComponent", "ToastManager", "UIComponent", "UIFunctions", "View", "ViewManager", "LevelSelector", "Common", "EventManager", "Intersection", "banner", "interstitialAd", "nativeAd", "qqAppBox", "qqBlockAd", "videoBanner", "wxgridAd", "wxnativeAd", "audioMgr", "changeGame", "dialogBox", "gameSceneManager", "horn", "item", "loadTip", "lucky", "androidHelper", "appGame", "async", "consts", "emitter", "httpUtils", "underscore", "util", "platformFun", "result", "revive", "room", "roomGame", "screenrecord", "sign", "updateTime", "use_v2.0.x_cc.Toggle_event" ]);