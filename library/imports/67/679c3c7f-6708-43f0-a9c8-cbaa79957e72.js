"use strict";
cc._RF.push(module, '679c3x/ZwhD8KnIy6p5lX5y', 'ClickAudioManager');
// framework/plugin_boosts/misc/ClickAudioManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ClickAudio_1 = require("./ClickAudio");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ClickAudioManager = /** @class */ (function (_super) {
    __extends(ClickAudioManager, _super);
    function ClickAudioManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.audio = null;
        _this.elastic = false;
        return _this;
        // update (dt) {}
    }
    ClickAudioManager.prototype.onLoad = function () {
        //window.g = require('g');
        //g.foreachNode(this.node,this.each,this)
    };
    ClickAudioManager.prototype.each = function (item) {
        //if button 
        if (!item.getComponent(cc.Button))
            return;
        var comp = item.getComponent(ClickAudio_1.default);
        if (comp == null) {
            comp = item.addComponent(ClickAudio_1.default);
            comp.elastic = this.elastic;
            comp.audio = this.audio;
        }
    };
    ClickAudioManager.prototype.start = function () {
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], ClickAudioManager.prototype, "audio", void 0);
    __decorate([
        property
    ], ClickAudioManager.prototype, "elastic", void 0);
    ClickAudioManager = __decorate([
        ccclass
    ], ClickAudioManager);
    return ClickAudioManager;
}(cc.Component));
exports.default = ClickAudioManager;

cc._RF.pop();