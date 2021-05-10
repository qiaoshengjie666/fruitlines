
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/gamesys/LocalLifeSystem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxnYW1lc3lzXFxMb2NhbExpZmVTeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxzREFBOEM7QUFDOUMseUNBQW9DO0FBR3BDO0lBQUE7UUFFQyxhQUFhO1FBQ2IsaUJBQVksR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFFO1FBQ3ZCLFNBQVM7UUFDVCxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUVsQiwwQkFBcUIsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFNL0QsaUJBQVksR0FBVSxDQUFDLENBQUE7UUFHdkIsMEJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBRXRCLG1CQUFjLEdBQUcsSUFBSSxnQkFBTSxFQUFFLENBQUM7SUF1RXRDLENBQUM7SUF0RUEsOEJBQUksR0FBSixVQUFLLE9BQWMsRUFBQyxTQUFnQjtRQUEvQix3QkFBQSxFQUFBLGNBQWM7UUFBQywwQkFBQSxFQUFBLGdCQUFnQjtRQUVuQyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFBO1FBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUE7UUFDcEQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUNwRSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQTtRQUNyQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUMsSUFBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDeEcsb0RBQW9EO1FBRXBELG9CQUFLLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBQyxJ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LEVBQUUsQ0FBQztBQUM5QyxHQUFHIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvY2FsVGltZVN5c3RlbSBmcm9tIFwiLi9Mb2NhbFRpbWVTeXN0ZW1cIjtcbmltcG9ydCB7IGV2ZW50IH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50TWFuYWdlclwiO1xuaW1wb3J0IFNpZ25hbCBmcm9tIFwiLi4vbWlzYy9TaWduYWxcIjtcbmltcG9ydCBQbGF0Zm9ybSBmcm9tIFwiLi4vLi4vUGxhdGZvcm1cIjtcblxuZXhwb3J0IGNsYXNzIExvY2FsTGlmZVN5c3RlbVxue1xuXHQvL+eUn+aIkOS4gOmil+aYn+mcgOimgeeahOaXtumXtCBcblx0c2VjX3Blcl9saXZlID0gNjAgKiA1IDtcblx0Ly/mnIDlpJrlj6/lvpflpJrlsJHpopdcblx0bGl2ZV9mcmVlX2dldCA9IDU7XG5cdFxuXHRtYXhfZnJlZUxpdmVzX3NlY29uZHMgPSB0aGlzLmxpdmVfZnJlZV9nZXQgKiB0aGlzLnNlY19wZXJfbGl2ZTtcblxuXHR0YXNrX3J1blNwYXduTGl2ZXM6bnVtYmVyO1xuXG5cdHRhc2tfY2hlY2tMaXZlczpudW1iZXI7XG5cblx0bGl2ZXNTZWNvbmRzOm51bWJlciA9IDBcblx0bGFzdExpZmVTYXZlVGltZTpudW1iZXI7XG5cblx0aXNFbmFibGVkQXV0b1JlY292ZXJ5ID0gdHJ1ZTtcblx0XG5cdHB1YmxpYyByZWNvdmVyeVNpZ25hbCA9IG5ldyBTaWduYWwoKTtcblx0aW5pdChsaXZlU2VjID0gbnVsbCxsaXZlX2ZyZWUgPSBudWxsKVxuXHR7XG5cdFx0dGhpcy5zZWNfcGVyX2xpdmUgPSBsaXZlU2VjIHx8IHRoaXMuc2VjX3Blcl9saXZlXG5cdFx0dGhpcy5saXZlX2ZyZWVfZ2V0ID0gbGl2ZV9mcmVlIHx8IHRoaXMubGl2ZV9mcmVlX2dldFxuXHRcdHRoaXMubWF4X2ZyZWVMaXZlc19zZWNvbmRzID0gdGhpcy5zZWNfcGVyX2xpdmUgKiB0aGlzLmxpdmVfZnJlZV9nZXQ7XG5cdFx0dGhpcy5saXZlc1NlY29uZHMgPSAwXG5cdFx0dGhpcy5sYXN0TGlmZVNhdmVUaW1lID0gTnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic3lzX2xpZmVfbGFzdExpZmVTYXZlVGltZVwiKXx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpKVxuXHRcdC8vZy5zZXRHbG9iYWxJbnN0YW5jZShMaWZlU3lzdGVtLFwiTG9jYWxMaWZlU3lzdGVtXCIpO1xuXG5cdFx0ZXZlbnQub24oXCJvbkVudGVyRm9yZWdyb3VuZFwiLHRoaXMub25FbnRlckZvcmVncm91bmQsdGhpcylcblx0XHR0aGlzLm9uVGltZVJlcXVlc3RlZChuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG5cdFx0Y29uc29sZS5sb2coXCLkvZPlipvns7vnu5/liJ3lp4vljJZcIix0aGlzKTtcblx0fVxuXG5cdG9uRW50ZXJGb3JlZ3JvdW5kKClcblx0e1xuXHRcdHRoaXMub25UaW1lUmVxdWVzdGVkKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcblx0fVxuXG5cdGdldCBuZXh0TGlmZVRpbWUoKVxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLmxpdmVzICsgMSkgKiB0aGlzLnNlY19wZXJfbGl2ZSAtIHRoaXMubGl2ZXNTZWNvbmRzO1xuXHR9XG5cblx0Z2V0IGxpdmVzKClcblx0e1xuXHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubGl2ZXNTZWNvbmRzIC8gdGhpcy5zZWNfcGVyX2xpdmUpXG5cdH1cblxuXHRzYXZlKClcblx0e1xuXHRcdHRoaXMubGFzdExpZmVTYXZlVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic3lzX2xpZmVfbGFzdExpZmVTYXZlVGltZVwiLHRoaXMubGFzdExpZmVTYXZlVGltZStcIlwiKVxuXHR9XG5cblx0b25UaW1lUmVxdWVzdGVkKHRpbWUpXG5cdHtcblx0XHRpZiAodGhpcy5sYXN0TGlmZVNhdmVUaW1lKVxuXHRcdHtcblx0XHRcdGxldCB0aW1lRWxhcHNlZCA9IE1hdGguZmxvb3IoKHRpbWUgLSB0aGlzLmxhc3RMaWZlU2F2ZVRpbWUpLzEwMDApXG5cdFx0XHR0aGlzLmxpdmVzU2Vjb25kcyA9IE1hdGgubWluKHRoaXMubWF4X2ZyZWVMaXZlc19zZWNvbmRzLCB0aW1lRWxhcHNlZClcblx0XHR9XG5cdH1cblxuXHRzdGFydENoZWNrKGNhbGxiYWNrLHRhcmdldClcblx0e1xuXHRcdGlmKHRoaXMudGFza19jaGVja0xpdmVzKSByZXR1cm47XG5cdFx0bGV0IGxhc3RIZWFydCA9IGNhbGxiYWNrLmNhbGwodGFyZ2V0KTtcblx0XHR0aGlzLnRhc2tfY2hlY2tMaXZlcyA9IHNldEludGVydmFsKF89Pntcblx0XHRcdGxldCBoZWFydCA9IGNhbGxiYWNrLmNhbGwodGFyZ2V0KTtcblx0XHRcdGlmKGxhc3RIZWFydCAhPSBoZWFydCAmJiBoZWFydCA9PSB0aGlzLmxpdmVfZnJlZV9nZXQgLSAxKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLmxpdmVzU2Vjb25kcyA9IDA7XG5cdFx0XHRcdHRoaXMuc2F2ZSgpO1xuXHRcdFx0fSBcblx0XHRcdGlmIChoZWFydCA8IHRoaXMubGl2ZV9mcmVlX2dldCkgeyBcblx0XHRcdFx0Ly8gdGhpcy5jaGVja0ZvclNwYXduTGl2ZXMoKTtcblx0XHRcdFx0dGhpcy5saXZlc1NlY29uZHMgPSB0aGlzLmxpdmVzU2Vjb25kcyArIDE7XG5cdFx0XHRcdGlmICggaGVhcnQgKyB0aGlzLmxpdmVzID4gaGVhcnQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIuiOt+W+l+WcqOe6v+WlluWKseS4gOmil+aYn1wiLHRoaXMubGl2ZXMpXG5cdFx0XHRcdFx0dGhpcy5yZWNvdmVyeVNpZ25hbC5maXJlKHRoaXMubGl2ZXMpO1xuXHRcdFx0XHRcdHRoaXMubGl2ZXNTZWNvbmRzID0gMDtcblx0XHRcdFx0XHR0aGlzLnNhdmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bGFzdEhlYXJ0ID0gaGVhcnQ7XG5cdFx0fSwxMDAwKVxuXHR9XG5cbn1cblxuZXhwb3J0IHZhciBMaWZlU3lzdGVtID0gbmV3IExvY2FsTGlmZVN5c3RlbSgpO1xuLy8gXG4iXX0=