"use strict";
cc._RF.push(module, '0b667/xvIZJapTB+ZTBqkHL', 'ShopItemTemplate');
// Game/Scripts/ui/ShopItemTemplate.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Signal_1 = require("../../../framework/plugin_boosts/misc/Signal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShopItemTemplate = /** @class */ (function (_super) {
    __extends(ShopItemTemplate, _super);
    function ShopItemTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.titleLabel = null;
        _this.selectedFlag = null;
        _this.bgmini = null;
        _this.btnBuyNode = null;
        _this.maskNode = null;
        _this.borderNode = null;
        _this.diamondLabel = null;
        _this.btnSignal = new Signal_1.default();
        _this.data = null;
        return _this;
    }
    ShopItemTemplate.prototype.onLoad = function () { };
    ShopItemTemplate.prototype.start = function () { };
    ShopItemTemplate.prototype.click_unlock = function () {
        this.btnSignal.fire(this.data);
    };
    __decorate([
        property(cc.Label)
    ], ShopItemTemplate.prototype, "titleLabel", void 0);
    __decorate([
        property(cc.Node)
    ], ShopItemTemplate.prototype, "selectedFlag", void 0);
    __decorate([
        property(cc.Sprite)
    ], ShopItemTemplate.prototype, "bgmini", void 0);
    __decorate([
        property(cc.Node)
    ], ShopItemTemplate.prototype, "btnBuyNode", void 0);
    __decorate([
        property(cc.Node)
    ], ShopItemTemplate.prototype, "maskNode", void 0);
    __decorate([
        property(cc.Node)
    ], ShopItemTemplate.prototype, "borderNode", void 0);
    __decorate([
        property(cc.Label)
    ], ShopItemTemplate.prototype, "diamondLabel", void 0);
    ShopItemTemplate = __decorate([
        ccclass
    ], ShopItemTemplate);
    return ShopItemTemplate;
}(cc.Component));
exports.default = ShopItemTemplate;

cc._RF.pop();