
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/HbDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ec5aa26/dhLhpV83mVeVmkA', 'HbDialog');
// Game/Scripts/ui/HbDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ViewManager_1 = require("../../../framework/plugin_boosts/ui/ViewManager");
var ToastManager_1 = require("../../../framework/plugin_boosts/ui/ToastManager");
var Res_1 = require("../hex-lines-game/Res");
var Info_1 = require("../Info");
var Device_1 = require("../../../framework/plugin_boosts/gamesys/Device");
var View_1 = require("../../../framework/plugin_boosts/ui/View");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HbDialog = /** @class */ (function (_super) {
    __extends(HbDialog, _super);
    function HbDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HbDialog.prototype.onLoad = function () { };
    HbDialog.prototype.start = function () { };
    HbDialog.prototype.click = function () {
        var choise = Info_1.UserInfo.getChoice(Info_1.ChoiceType.HB);
    };
    HbDialog.prototype.share_suc = function () {
        var cfg = Res_1.R.skinConfig.json[3];
        ToastManager_1.Toast.make("恭喜获得皮肤 ：" + cfg.text);
        Device_1.default.playEffect(Res_1.R.audio_unlock);
        Info_1.UserInfo.unlock(cfg.id);
        Info_1.UserInfo.selectedSkin = cfg.id;
        Info_1.UserInfo.save();
        ViewManager_1.default.instance.show("Game/ShopDialog");
        this.getComponent(View_1.default).hide();
    };
    HbDialog = __decorate([
        ccclass
    ], HbDialog);
    return HbDialog;
}(cc.Component));
exports.default = HbDialog;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXEhiRGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSwrRUFBMEU7QUFDMUUsaUZBQXlFO0FBQ3pFLDZDQUEwQztBQUMxQyxnQ0FBK0M7QUFDL0MsMEVBQXFFO0FBQ3JFLGlFQUE0RDtBQUV0RCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDs7SUFzQkEsQ0FBQztJQXBCRyx5QkFBTSxHQUFOLGNBQVcsQ0FBQztJQUNaLHdCQUFLLEdBQUwsY0FBVSxDQUFDO0lBQ1gsd0JBQUssR0FBTDtRQUVJLElBQUksTUFBTSxHQUFHLGVBQVEsQ0FBQyxTQUFTLENBQUMsaUJBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUduRCxDQUFDO0lBRUQsNEJBQVMsR0FBVDtRQUVJLElBQUksR0FBRyxHQUFHLE9BQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzlCLG9CQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakMsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsT0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xDLGVBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLGVBQVEsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUMvQixlQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIscUJBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBckJnQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBc0I1QjtJQUFELGVBQUM7Q0F0QkQsQUFzQkMsQ0F0QnFDLEVBQUUsQ0FBQyxTQUFTLEdBc0JqRDtrQkF0Qm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBMdWNreURpYWxvZyBmcm9tIFwiLi9MdWNreURpYWxvZ1wiO1xuaW1wb3J0IFZpZXdNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9WaWV3TWFuYWdlclwiO1xuaW1wb3J0IHsgVG9hc3QgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVG9hc3RNYW5hZ2VyXCI7XG5pbXBvcnQgeyBSIH0gZnJvbSBcIi4uL2hleC1saW5lcy1nYW1lL1Jlc1wiO1xuaW1wb3J0IHsgVXNlckluZm8sIENob2ljZVR5cGUgfSBmcm9tIFwiLi4vSW5mb1wiO1xuaW1wb3J0IERldmljZSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvZ2FtZXN5cy9EZXZpY2VcIjtcbmltcG9ydCBWaWV3IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9WaWV3XCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGJEaWFsb2cgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgb25Mb2FkICgpIHt9XG4gICAgc3RhcnQgKCkge31cbiAgICBjbGljaygpXG4gICAge1xuICAgICAgICBsZXQgY2hvaXNlID0gVXNlckluZm8uZ2V0Q2hvaWNlKENob2ljZVR5cGUuSEIpO1xuXG4gICAgICAgIFxuICAgIH1cblxuICAgIHNoYXJlX3N1YygpXG4gICAge1xuICAgICAgICBsZXQgY2ZnID0gUi5za2luQ29uZmlnLmpzb25bM11cbiAgICAgICAgVG9hc3QubWFrZShcIuaBreWWnOiOt+W+l+earuiCpCDvvJpcIiArIGNmZy50ZXh0KSBcbiAgICAgICAgRGV2aWNlLnBsYXlFZmZlY3QoUi5hdWRpb191bmxvY2spO1xuICAgICAgICBVc2VySW5mby51bmxvY2soY2ZnLmlkKTtcbiAgICAgICAgVXNlckluZm8uc2VsZWN0ZWRTa2luID0gY2ZnLmlkO1xuICAgICAgICBVc2VySW5mby5zYXZlKCk7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL1Nob3BEaWFsb2dcIilcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoVmlldykuaGlkZSgpO1xuICAgIH1cbn0iXX0=