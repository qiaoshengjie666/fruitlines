"use strict";
cc._RF.push(module, '0dc9dQt58ZCx4tQ3mcNvEZr', 'UIComponent');
// framework/plugin_boosts/ui/UIComponent.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIComponent = /** @class */ (function (_super) {
    __extends(UIComponent, _super);
    function UIComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIComponent.prototype.hide = function () {
        this.node.active = false;
    };
    UIComponent.prototype.show = function () {
        this.node.active = true;
    };
    UIComponent = __decorate([
        ccclass
    ], UIComponent);
    return UIComponent;
}(cc.Component));
exports.default = UIComponent;

cc._RF.pop();