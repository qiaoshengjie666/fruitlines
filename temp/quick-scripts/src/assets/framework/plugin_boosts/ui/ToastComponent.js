"use strict";
cc._RF.push(module, 'c4ad6Rf0DpFeay8D3aly6IU', 'ToastComponent');
// framework/plugin_boosts/ui/ToastComponent.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UIFunctions_1 = require("./UIFunctions");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ToastComponent = /** @class */ (function (_super) {
    __extends(ToastComponent, _super);
    function ToastComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        return _this;
        // update (dt) {}
    }
    ToastComponent.prototype.onLoad = function () {
        this.animations = UIFunctions_1.default.getChildrenAnimations(this.node);
    };
    ToastComponent.prototype.start = function () {
    };
    ToastComponent.prototype.hide = function (callback) {
        this.node.active = true;
        if (!UIFunctions_1.default.doHideAnimations(this.animations, callback)) {
            this.node.active = false;
            // this.node.removeFromParent();
            if (callback) {
                callback(this);
            }
        }
    };
    ToastComponent.prototype.show = function (text) {
        this.label.string = text;
        UIFunctions_1.default.doShowAnimations(this.animations);
    };
    __decorate([
        property(cc.Label)
    ], ToastComponent.prototype, "label", void 0);
    ToastComponent = __decorate([
        ccclass
    ], ToastComponent);
    return ToastComponent;
}(cc.Component));
exports.default = ToastComponent;

cc._RF.pop();