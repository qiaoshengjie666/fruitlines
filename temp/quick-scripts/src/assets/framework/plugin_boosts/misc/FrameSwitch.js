"use strict";
cc._RF.push(module, '92ea6+rkJ5BQ7Twyd4FI92I', 'FrameSwitch');
// framework/plugin_boosts/misc/FrameSwitch.ts

Object.defineProperty(exports, "__esModule", { value: true });
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
var FrameSwitcher = /** @class */ (function (_super) {
    __extends(FrameSwitcher, _super);
    function FrameSwitcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.frames = [];
        // LIFE-CYCLE CALLBACKS:
        _this.target = null;
        _this._index = 0;
        _this.randomOnLoad = false;
        return _this;
        // update (dt) {}
    }
    FrameSwitcher.prototype.onLoad = function () {
        if (this.target == null)
            this.target = this.getComponent(cc.Sprite);
        if (this.randomOnLoad)
            this.switchRandom();
    };
    FrameSwitcher.prototype.switchRandom = function () {
        //this.index = g.randomInt(0,this.frames.length);
    };
    Object.defineProperty(FrameSwitcher.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (k) {
            this.switch(k);
        },
        enumerable: false,
        configurable: true
    });
    FrameSwitcher.prototype.switch = function (index) {
        var len = this.frames.length;
        var idx = Math.min(Math.max(0, index), len - 1);
        this.target.spriteFrame = this.frames[idx];
        this._index = idx;
    };
    FrameSwitcher.prototype.start = function () {
    };
    __decorate([
        property([cc.SpriteFrame])
    ], FrameSwitcher.prototype, "frames", void 0);
    __decorate([
        property(cc.Sprite)
    ], FrameSwitcher.prototype, "target", void 0);
    __decorate([
        property
    ], FrameSwitcher.prototype, "randomOnLoad", void 0);
    FrameSwitcher = __decorate([
        ccclass
    ], FrameSwitcher);
    return FrameSwitcher;
}(cc.Component));
exports.default = FrameSwitcher;

cc._RF.pop();