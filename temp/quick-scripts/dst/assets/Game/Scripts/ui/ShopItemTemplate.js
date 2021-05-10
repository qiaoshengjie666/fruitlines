
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/ShopItemTemplate.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXFNob3BJdGVtVGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUFrRTtBQUU1RCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE4QyxvQ0FBWTtJQUExRDtRQUFBLHFFQWtDQztRQTNCRyxnQkFBVSxHQUFZLElBQUksQ0FBQztRQUczQixrQkFBWSxHQUFXLElBQUksQ0FBQztRQUc1QixZQUFNLEdBQWEsSUFBSSxDQUFDO1FBRXhCLGdCQUFVLEdBQVcsSUFBSSxDQUFDO1FBRzFCLGNBQVEsR0FBVyxJQUFJLENBQUM7UUFHeEIsZ0JBQVUsR0FBVyxJQUFJLENBQUM7UUFHMUIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFFN0IsZUFBUyxHQUFVLElBQUksZ0JBQU0sRUFBRSxDQUFDO1FBRWhDLFVBQUksR0FBTyxJQUFJLENBQUM7O0lBTXBCLENBQUM7SUFoQ0csaUNBQU0sR0FBTixjQUFXLENBQUM7SUFDWixnQ0FBSyxHQUFMLGNBQVUsQ0FBQztJQTJCWCx1Q0FBWSxHQUFaO1FBRUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUExQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt3REFDUTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBEQUNVO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ0k7SUFFeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt3REFDUTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNNO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0RBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzswREFDVTtJQXhCWixnQkFBZ0I7UUFEcEMsT0FBTztPQUNhLGdCQUFnQixDQWtDcEM7SUFBRCx1QkFBQztDQWxDRCxBQWtDQyxDQWxDNkMsRUFBRSxDQUFDLFNBQVMsR0FrQ3pEO2tCQWxDb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNpZ25hbCBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvbWlzYy9TaWduYWxcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wSXRlbVRlbXBsYXRlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIG9uTG9hZCAoKSB7fVxuICAgIHN0YXJ0ICgpIHt9XG5cblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB0aXRsZUxhYmVsOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNlbGVjdGVkRmxhZzpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgYmdtaW5pOmNjLlNwcml0ZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnRuQnV5Tm9kZTpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG1hc2tOb2RlOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYm9yZGVyTm9kZTpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBkaWFtb25kTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgYnRuU2lnbmFsOlNpZ25hbCA9IG5ldyBTaWduYWwoKTtcblxuICAgIGRhdGE6YW55ID0gbnVsbDtcbiAgICBcbiAgICBjbGlja191bmxvY2soKVxuICAgIHtcbiAgICAgICAgdGhpcy5idG5TaWduYWwuZmlyZSh0aGlzLmRhdGEpO1xuICAgIH1cbn0iXX0=