"use strict";
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