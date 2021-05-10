"use strict";
cc._RF.push(module, '81fb28+15NDNaH9M81MKxwU', 'Res');
// Game/Scripts/hex-lines-game/Res.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.R = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
exports.R = null;
var Res = /** @class */ (function (_super) {
    __extends(Res, _super);
    function Res() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
    Res.prototype.onLoad = function () {
        exports.R = this;
    };
    Res.prototype.start = function () {
    };
    __decorate([
        property(cc.JsonAsset)
    ], Res.prototype, "levelJson", void 0);
    __decorate([
        property(cc.Prefab)
    ], Res.prototype, "TilePrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Res.prototype, "TileShadow", void 0);
    __decorate([
        property(cc.Prefab)
    ], Res.prototype, "Line46", void 0);
    __decorate([
        property(cc.Prefab)
    ], Res.prototype, "Line37", void 0);
    __decorate([
        property(cc.Prefab)
    ], Res.prototype, "Line19", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Res.prototype, "audio_bgm", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Res.prototype, "audio_unlock", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Res.prototype, "audio_invalid", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Res.prototype, "audio_draw", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Res.prototype, "audio_down", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Res.prototype, "audio_win", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Res.prototype, "audio_link", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Res.prototype, "audio_get_diamond", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], Res.prototype, "tileTextures", void 0);
    __decorate([
        property([cc.Prefab])
    ], Res.prototype, "animalPrefabs", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Res.prototype, "skinConfig", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Res.prototype, "luckyConfig", void 0);
    __decorate([
        property([cc.Color])
    ], Res.prototype, "colors", void 0);
    Res = __decorate([
        ccclass
    ], Res);
    return Res;
}(cc.Component));
exports.default = Res;

cc._RF.pop();