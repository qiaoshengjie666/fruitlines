"use strict";
cc._RF.push(module, '82b09vMdyFCOb0NEdBTtZHy', 'DCSprite');
// framework/plugin_boosts/ui/DCSprite.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DCUI_1 = require("./DCUI");
var SpriteFrameCache_1 = require("../misc/SpriteFrameCache");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
var DCSprite = /** @class */ (function (_super) {
    __extends(DCSprite, _super);
    function DCSprite() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DCSprite.prototype.onLoad = function () {
        this.sprite = this.getComponent(cc.Sprite);
    };
    DCSprite.prototype.refreshSpriteFrame = function (v) {
        var _this = this;
        // this.sprite.spriteFrame = v;
        var spriteframe = SpriteFrameCache_1.default.instance.getSpriteFrame(v).then(function (sf) {
            _this.sprite.spriteFrame = sf;
        }).catch(function (_) { console.log("request imageUrl error :" + v); });
    };
    DCSprite.prototype.onValueChanged = function (v) {
        this.refreshSpriteFrame(v);
    };
    DCSprite = __decorate([
        ccclass,
        requireComponent(cc.Sprite)
    ], DCSprite);
    return DCSprite;
}(DCUI_1.default));
exports.default = DCSprite;

cc._RF.pop();