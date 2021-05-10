"use strict";
cc._RF.push(module, 'a56c0Fh1bpDto6UwDov+u7M', 'DCLabel');
// framework/plugin_boosts/ui/DCLabel.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DCUI_1 = require("./DCUI");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
var DCLabel = /** @class */ (function (_super) {
    __extends(DCLabel, _super);
    function DCLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DCLabel.prototype.onLoad = function () {
        this.label = this.getComponent(cc.Label);
    };
    DCLabel.prototype.onValueChanged = function (v) {
        if (!v) {
            console.log("[DCLabel] warn!", "not found field " + this.dataBind);
            v = "0";
        }
        this.label.string = v;
    };
    DCLabel = __decorate([
        ccclass,
        requireComponent(cc.Label)
    ], DCLabel);
    return DCLabel;
}(DCUI_1.default));
exports.default = DCLabel;

cc._RF.pop();