"use strict";
cc._RF.push(module, '3f36aidibxFPY2TBTu8gRyi', 'PandoraPoint');
// framework/plugin_boosts/ui/PandoraPoint.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PandoraPoint = /** @class */ (function (_super) {
    __extends(PandoraPoint, _super);
    function PandoraPoint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.numberVisible = true;
        return _this;
        // update (dt) {}
    }
    PandoraPoint.prototype.onLoad = function () {
        this.sprite = this.getComponent(cc.Sprite);
        this.label = this.getComponentInChildren(cc.Label);
        this.label.node.active = this.numberVisible;
    };
    PandoraPoint.prototype.start = function () {
    };
    PandoraPoint.prototype.setNumber = function (n) {
        if (this.numberVisible) {
            this.label.string = n + "";
        }
        if (this.numberVisible) {
            this.label.node.active = n != 0;
        }
        this.sprite.enabled = n != 0;
    };
    __decorate([
        property
    ], PandoraPoint.prototype, "numberVisible", void 0);
    PandoraPoint = __decorate([
        ccclass
    ], PandoraPoint);
    return PandoraPoint;
}(cc.Component));
exports.default = PandoraPoint;

cc._RF.pop();