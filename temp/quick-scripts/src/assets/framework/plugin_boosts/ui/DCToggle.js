"use strict";
cc._RF.push(module, 'f9e52WLze5MBrhxXx/fWqyL', 'DCToggle');
// framework/plugin_boosts/ui/DCToggle.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DCUI_1 = require("./DCUI");
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DCToggle = /** @class */ (function (_super) {
    __extends(DCToggle, _super);
    function DCToggle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.revserse = false;
        _this.autosync = true;
        return _this;
    }
    DCToggle.prototype.onLoad = function () {
        this.toggle = this.getComponent(cc.Toggle);
        if (this.autosync) {
            var listener = new cc.Component.EventHandler();
            listener.component = "DCToggle";
            listener.target = this.node;
            listener.handler = "onChecked";
            this.toggle.checkEvents.push(listener);
        }
    };
    DCToggle.prototype.onChecked = function (v) {
        if (this.isFromSelf)
            return;
        if (this.revserse) {
            this.setDCValue(!v.isChecked);
        }
        else {
            this.setDCValue(v.isChecked);
        }
    };
    DCToggle.prototype.setChecked = function (b) {
        this.isFromSelf = true;
        if (b)
            this.toggle.check();
        else
            this.toggle.uncheck();
        this.isFromSelf = false;
    };
    DCToggle.prototype.onValueChanged = function (v) {
        if (this.revserse) {
            this.setChecked(!v);
        }
        else {
            this.setChecked(v);
        }
    };
    __decorate([
        property({ tooltip: "If reverse is enabled ,checked is false !, unchecked is true" })
    ], DCToggle.prototype, "revserse", void 0);
    __decorate([
        property({ tooltip: " Make sure data bind type should be boolean" })
    ], DCToggle.prototype, "autosync", void 0);
    DCToggle = __decorate([
        ccclass
    ], DCToggle);
    return DCToggle;
}(DCUI_1.default));
exports.default = DCToggle;

cc._RF.pop();