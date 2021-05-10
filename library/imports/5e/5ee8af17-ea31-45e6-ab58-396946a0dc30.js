"use strict";
cc._RF.push(module, '5ee8a8X6jFF5qtYOWlGoNww', 'ClickAudio');
// framework/plugin_boosts/misc/ClickAudio.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Device_1 = require("../gamesys/Device");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ClickAudio = /** @class */ (function (_super) {
    __extends(ClickAudio, _super);
    function ClickAudio() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.audio = null;
        _this.elastic = false;
        _this._oldScale = 1;
        return _this;
        // update (dt) {}
    }
    ClickAudio.prototype.anim2 = function () {
        var act = cc.scaleBy(0.6, 0.9, 0.9).easing(cc.easeElasticOut(0.3));
        this.node.runAction(act);
    };
    ClickAudio.prototype.anim2back = function () {
        var act = cc.scaleTo(0.6, this._oldScale, this._oldScale).easing(cc.easeElasticOut(0.3));
        this.node.runAction(act);
    };
    ClickAudio.prototype.onLoad = function () {
        var _this = this;
        if (this.elastic) {
            var btn = this.getComponent(cc.Button);
            btn.transition = cc.Button.Transition.COLOR;
            btn.normalColor = cc.Color.WHITE;
            btn.pressedColor = new cc.Color(200, 200, 200);
            this._oldScale = this.node.scale;
        }
        this.node.on('touchstart', function (_) {
            //cc.EaseElasticOut:create(
            // this.node.stopAllActions();
            _this.elastic && _this.anim2();
        }, this.node);
        this.node.on("touchend", function (_) {
            Device_1.default.playEffect(_this.audio, false);
            _this.elastic && _this.anim2back();
        });
        this.node.on("touchcancel", function (_) {
            _this.elastic && _this.anim2back();
        });
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], ClickAudio.prototype, "audio", void 0);
    __decorate([
        property
    ], ClickAudio.prototype, "elastic", void 0);
    ClickAudio = __decorate([
        ccclass
    ], ClickAudio);
    return ClickAudio;
}(cc.Component));
exports.default = ClickAudio;

cc._RF.pop();