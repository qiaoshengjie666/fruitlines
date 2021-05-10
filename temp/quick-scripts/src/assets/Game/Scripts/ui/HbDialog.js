"use strict";
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