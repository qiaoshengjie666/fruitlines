"use strict";
cc._RF.push(module, '550c0O4ualLIYQoOOiFtGsz', 'LocalLifeSystem');
// framework/plugin_boosts/gamesys/LocalLifeSystem.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.LifeSystem = exports.LocalLifeSystem = void 0;
var EventManager_1 = require("../utils/EventManager");
var Signal_1 = require("../misc/Signal");
var LocalLifeSystem = /** @class */ (function () {
    function LocalLifeSystem() {
        //生成一颗星需要的时间 
        this.sec_per_live = 60 * 5;
        //最多可得多少颗
        this.live_free_get = 5;
        this.max_freeLives_seconds = this.live_free_get * this.sec_per_live;
        this.livesSeconds = 0;
        this.isEnabledAutoRecovery = true;
        this.recoverySignal = new Signal_1.default();
    }
    LocalLifeSystem.prototype.init = function (liveSec, live_free) {
        if (liveSec === void 0) { liveSec = null; }
        if (live_free === void 0) { live_free = null; }
        this.sec_per_live = liveSec || this.sec_per_live;
        this.live_free_get = live_free || this.live_free_get;
        this.max_freeLives_seconds = this.sec_per_live * this.live_free_get;
        this.livesSeconds = 0;
        this.lastLifeSaveTime = Number(localStorage.getItem("sys_life_lastLifeSaveTime") || new Date().getTime());
        //g.setGlobalInstance(LifeSystem,"LocalLifeSystem");
        EventManager_1.event.on("onEnterForeground", this.onEnterForeground, this);
        this.onTimeRequested(new Date().getTime());
        console.log("体力系统初始化", this);
    };
    LocalLifeSystem.prototype.onEnterForeground = function () {
        this.onTimeRequested(new Date().getTime());
    };
    Object.defineProperty(LocalLifeSystem.prototype, "nextLifeTime", {
        get: function () {
            return (this.lives + 1) * this.sec_per_live - this.livesSeconds;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LocalLifeSystem.prototype, "lives", {
        get: function () {
            return Math.floor(this.livesSeconds / this.sec_per_live);
        },
        enumerable: false,
        configurable: true
    });
    LocalLifeSystem.prototype.save = function () {
        this.lastLifeSaveTime = new Date().getTime();
        localStorage.setItem("sys_life_lastLifeSaveTime", this.lastLifeSaveTime + "");
    };
    LocalLifeSystem.prototype.onTimeRequested = function (time) {
        if (this.lastLifeSaveTime) {
            var timeElapsed = Math.floor((time - this.lastLifeSaveTime) / 1000);
            this.livesSeconds = Math.min(this.max_freeLives_seconds, timeElapsed);
        }
    };
    LocalLifeSystem.prototype.startCheck = function (callback, target) {
        var _this = this;
        if (this.task_checkLives)
            return;
        var lastHeart = callback.call(target);
        this.task_checkLives = setInterval(function (_) {
            var heart = callback.call(target);
            if (lastHeart != heart && heart == _this.live_free_get - 1) {
                _this.livesSeconds = 0;
                _this.save();
            }
            if (heart < _this.live_free_get) {
                // this.checkForSpawnLives();
                _this.livesSeconds = _this.livesSeconds + 1;
                if (heart + _this.lives > heart) {
                    console.log("获得在线奖励一颗星", _this.lives);
                    _this.recoverySignal.fire(_this.lives);
                    _this.livesSeconds = 0;
                    _this.save();
                }
            }
            lastHeart = heart;
        }, 1000);
    };
    return LocalLifeSystem;
}());
exports.LocalLifeSystem = LocalLifeSystem;
exports.LifeSystem = new LocalLifeSystem();
// 

cc._RF.pop();