"use strict";
cc._RF.push(module, '129ed5o6uNHDKhz6KoueBpN', 'ToastManager');
// framework/plugin_boosts/ui/ToastManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.Toast = void 0;
var ToastComponent_1 = require("./ToastComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
exports.Toast = null;
var ToastManager = /** @class */ (function (_super) {
    __extends(ToastManager, _super);
    function ToastManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToastManager.prototype.start = function () {
        this.toastPool = new cc.NodePool();
        exports.Toast = this;
    };
    ToastManager.prototype.onDestroy = function () {
        this.toastPool.clear();
    };
    ToastManager.prototype.make = function (text, dur) {
        if (dur === void 0) { dur = 1.3; }
        //show toast 
        var node = this.toastPool.get();
        var toastComp = null;
        if (node == null) {
            node = cc.instantiate(this.prefab);
            toastComp = node.getComponent(ToastComponent_1.default);
            if (toastComp == null) {
                console.warn("Toast.make : Toast Prefab must contains ToastComponent");
            }
            // ToastManager.toastPool.put(node);
            // node = ToastManager.toastPool.get();
        }
        else {
            toastComp = node.getComponent(ToastComponent_1.default);
        }
        if (node.parent == null)
            this.node.addChild(node, 99999);
        this.show(toastComp, text, dur);
        return toastComp;
    };
    ToastManager.prototype.show = function (toastComp, text, dur) {
        var _this = this;
        toastComp.show(text);
        this.scheduleOnce(function (_) {
            toastComp.hide(function (_) {
                _this.toastPool.put(toastComp.node);
                console.log("Toast.hide toastpool size:", _this.toastPool.size());
            });
        }, dur);
    };
    __decorate([
        property(cc.Prefab)
    ], ToastManager.prototype, "prefab", void 0);
    ToastManager = __decorate([
        ccclass
    ], ToastManager);
    return ToastManager;
}(cc.Component));
exports.default = ToastManager;

cc._RF.pop();