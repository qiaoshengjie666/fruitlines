"use strict";
cc._RF.push(module, 'e4171eQC3dMO4x8/Td1XV1Y', 'DCUI');
// framework/plugin_boosts/ui/DCUI.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DataCenter_1 = require("../misc/DataCenter");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DCUI = /** @class */ (function (_super) {
    __extends(DCUI, _super);
    function DCUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataBind = "";
        return _this;
    }
    DCUI.prototype.onLoad = function () {
    };
    DCUI.prototype.setDCKey = function (k) {
        this.dataBind = k;
        this.setListener();
    };
    DCUI.prototype.setListener = function () {
        DataCenter_1.default.off(this.dataBind, this.dataChanged, this);
        DataCenter_1.default.on(this.dataBind, this.dataChanged, this);
    };
    DCUI.prototype.onValueChanged = function (v) {
    };
    DCUI.prototype.setDCValue = function (v) {
        DataCenter_1.default.set(this.dataBind, v);
    };
    DCUI.prototype.dataChanged = function (v, old) {
        this.onValueChanged(v);
    };
    DCUI.prototype.onEnable = function () {
        this.setListener();
        this.onValueChanged(DataCenter_1.default.get(this.dataBind));
    };
    DCUI.prototype.onDisable = function () {
        DataCenter_1.default.off(this.dataBind, this.dataChanged, this);
    };
    __decorate([
        property()
    ], DCUI.prototype, "dataBind", void 0);
    DCUI = __decorate([
        ccclass
    ], DCUI);
    return DCUI;
}(cc.Component));
exports.default = DCUI;

cc._RF.pop();