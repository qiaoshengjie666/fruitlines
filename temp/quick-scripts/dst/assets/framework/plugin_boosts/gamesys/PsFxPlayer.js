
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/gamesys/PsFxPlayer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dc35b3gh69DGIz45mLQJxDM', 'PsFxPlayer');
// framework/plugin_boosts/gamesys/PsFxPlayer.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PsFx_1 = require("./PsFx");
var Device_1 = require("./Device");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PsFxPlayer = /** @class */ (function (_super) {
    __extends(PsFxPlayer, _super);
    function PsFxPlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab = null;
        _this._fx = null;
        _this.spriteFrame = null;
        _this.duration = -1;
        _this.randomRotaion = false;
        return _this;
        // update (dt) {}
    }
    PsFxPlayer.prototype.start = function () {
    };
    Object.defineProperty(PsFxPlayer.prototype, "fx", {
        get: function () {
            if (this._fx == null && this.prefab) {
                var node = cc.instantiate(this.prefab);
                if (node == null)
                    return null;
                var fx = node.getComponent(PsFx_1.default);
                if (fx == null) {
                    fx = this.addComponent(PsFx_1.default);
                }
                node.setPosition(0, 0);
                node.setParent(this.node);
                this._fx = fx;
            }
            return this._fx;
        },
        enumerable: false,
        configurable: true
    });
    PsFxPlayer.prototype.isPlaying = function () {
        return this.fx.isPlaying;
    };
    PsFxPlayer.prototype.onEnable = function () {
    };
    PsFxPlayer.prototype.onDisable = function () {
        var fx = this._fx;
        if (fx)
            fx.node.active = false;
    };
    PsFxPlayer.prototype.sleep = function (sec) {
        return new Promise(function (resolve, reject) {
            setTimeout(function (_) {
                resolve();
            }, sec);
        });
    };
    ;
    PsFxPlayer.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Device_1.default.playEffect(this.audioClip, false);
                        fx = this.fx;
                        if (!fx) return [3 /*break*/, 1];
                        fx.node.active = true;
                        if (this.randomRotaion)
                            //fx.node.rotation = g.randomInt(0,360);  
                            fx.reset();
                        return [2 /*return*/, fx.play(this.audioClip, this.spriteFrame)];
                    case 1:
                        if (!(this.duration > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.sleep(this.duration * 1000)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        property(cc.Prefab)
    ], PsFxPlayer.prototype, "prefab", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], PsFxPlayer.prototype, "spriteFrame", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], PsFxPlayer.prototype, "audioClip", void 0);
    __decorate([
        property
    ], PsFxPlayer.prototype, "duration", void 0);
    __decorate([
        property
    ], PsFxPlayer.prototype, "randomRotaion", void 0);
    PsFxPlayer = __decorate([
        ccclass
    ], PsFxPlayer);
    return PsFxPlayer;
}(cc.Component));
exports.default = PsFxPlayer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxnYW1lc3lzXFxQc0Z4UGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBMEI7QUFDMUIsbUNBQThCO0FBRXhCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBbUZDO1FBaEZHLFlBQU0sR0FBYSxJQUFJLENBQUE7UUFFdkIsU0FBRyxHQUFRLElBQUksQ0FBQztRQUdoQixpQkFBVyxHQUFrQixJQUFJLENBQUE7UUFNakMsY0FBUSxHQUFVLENBQUMsQ0FBQyxDQUFDO1FBR3JCLG1CQUFhLEdBQVksS0FBSyxDQUFDOztRQWlFL0IsaUJBQWlCO0lBQ3JCLENBQUM7SUFoRUcsMEJBQUssR0FBTDtJQUNBLENBQUM7SUFFRCxzQkFBSSwwQkFBRTthQUFOO1lBRUksSUFBRyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUNsQztnQkFDSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkMsSUFBRyxJQUFJLElBQUksSUFBSTtvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFDN0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQTtnQkFDaEMsSUFBRyxFQUFFLElBQUksSUFBSSxFQUNiO29CQUNJLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxDQUFDO2lCQUNoQztnQkFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO2FBQ2pCO1lBQ0QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLENBQUM7OztPQUFBO0lBRUQsOEJBQVMsR0FBVDtRQUVJLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUVELDZCQUFRLEdBQVI7SUFHQSxDQUFDO0lBRUQsOEJBQVMsR0FBVDtRQUVJLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbEIsSUFBRyxFQUFFO1lBQ0QsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7SUFFRCwwQkFBSyxHQUFMLFVBQU0sR0FBRztRQUNMLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUMsTUFBTTtZQUM5QixVQUFVLENBQUMsVUFBQSxDQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQyxFQUFHLEdBQUcsQ0FBQyxDQUFBO1FBQ1osQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBQUEsQ0FBQztJQUVJLHlCQUFJLEdBQVY7Ozs7Ozt3QkFFSSxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNwQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQzs2QkFDZCxFQUFFLEVBQUYsd0JBQUU7d0JBRUQsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO3dCQUN0QixJQUFHLElBQUksQ0FBQyxhQUFhOzRCQUNqQiwwQ0FBMEM7NEJBQzlDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDWCxzQkFBTyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFDOzs2QkFFN0MsQ0FBQSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQSxFQUFqQix3QkFBaUI7d0JBQ2hCLHFCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBQTs7d0JBQXRDLFNBQXNDLENBQUM7Ozs7OztLQUVsRDtJQTdFRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzhDQUNHO0lBS3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7bURBQ1E7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBQyxDQUFDO2lEQUNSO0lBR3ZCO1FBREMsUUFBUTtnREFDWTtJQUdyQjtRQURDLFFBQVE7cURBQ3NCO0lBakJkLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FtRjlCO0lBQUQsaUJBQUM7Q0FuRkQsQUFtRkMsQ0FuRnVDLEVBQUUsQ0FBQyxTQUFTLEdBbUZuRDtrQkFuRm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHNGeCBmcm9tIFwiLi9Qc0Z4XCI7XG5pbXBvcnQgRGV2aWNlIGZyb20gXCIuL0RldmljZVwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBzRnhQbGF5ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBwcmVmYWI6Y2MuUHJlZmFiID0gbnVsbFxuXG4gICAgX2Z4OlBzRnggPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIHNwcml0ZUZyYW1lOmNjLlNwcml0ZUZyYW1lID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KHt0eXBlOiBjYy5BdWRpb0NsaXB9KVxuICAgIGF1ZGlvQ2xpcDpjYy5BdWRpb0NsaXA7XG5cbiAgICBAcHJvcGVydHlcbiAgICBkdXJhdGlvbjpudW1iZXIgPSAtMTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIHJhbmRvbVJvdGFpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHN0YXJ0ICgpIHtcbiAgICB9XG5cbiAgICBnZXQgZngoKVxuICAgIHtcbiAgICAgICAgaWYodGhpcy5fZnggPT0gbnVsbCAmJiB0aGlzLnByZWZhYilcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYik7XG4gICAgICAgICAgICBpZihub2RlID09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IGZ4ID0gbm9kZS5nZXRDb21wb25lbnQoUHNGeClcbiAgICAgICAgICAgIGlmKGZ4ID09IG51bGwpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZnggPSB0aGlzLmFkZENvbXBvbmVudChQc0Z4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oMCwwKTtcbiAgICAgICAgICAgIG5vZGUuc2V0UGFyZW50KHRoaXMubm9kZSk7XG4gICAgICAgICAgICB0aGlzLl9meCA9IGZ4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9meDtcbiAgICB9XG5cbiAgICBpc1BsYXlpbmcoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnguaXNQbGF5aW5nO1xuICAgIH1cblxuICAgIG9uRW5hYmxlKClcbiAgICB7XG4gICAgICAgIFxuICAgIH1cblxuICAgIG9uRGlzYWJsZSgpXG4gICAge1xuICAgICAgICBsZXQgZnggPSB0aGlzLl9meDtcbiAgICAgICAgaWYoZngpXG4gICAgICAgICAgICBmeC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNsZWVwKHNlYyl7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XG4gICAgICAgICAgICBzZXRUaW1lb3V0KF89PntcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9ICwgc2VjKVxuICAgICAgICB9KVxuICAgIH07XG5cbiAgICBhc3luYyBwbGF5KClcbiAgICB7XG4gICAgICAgIERldmljZS5wbGF5RWZmZWN0KHRoaXMuYXVkaW9DbGlwLGZhbHNlKTtcbiAgICAgICAgbGV0IGZ4ID0gdGhpcy5meDtcbiAgICAgICAgaWYoZngpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZ4Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmKHRoaXMucmFuZG9tUm90YWlvbilcbiAgICAgICAgICAgICAgICAvL2Z4Lm5vZGUucm90YXRpb24gPSBnLnJhbmRvbUludCgwLDM2MCk7ICBcbiAgICAgICAgICAgIGZ4LnJlc2V0KCk7XG4gICAgICAgICAgICByZXR1cm4gZngucGxheSh0aGlzLmF1ZGlvQ2xpcCx0aGlzLnNwcml0ZUZyYW1lKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZih0aGlzLmR1cmF0aW9uID4gMCApXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zbGVlcCh0aGlzLmR1cmF0aW9uICogMTAwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19