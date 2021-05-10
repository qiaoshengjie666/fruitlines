"use strict";
cc._RF.push(module, '1b7cbT64WtHxpoRfvlVr4EN', 'ShopDialog');
// Game/Scripts/ui/ShopDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ShopItemTemplate_1 = require("./ShopItemTemplate");
var SpriteFrameCache_1 = require("../../../framework/plugin_boosts/misc/SpriteFrameCache");
var Res_1 = require("../hex-lines-game/Res");
var Info_1 = require("../Info");
var ToastManager_1 = require("../../../framework/plugin_boosts/ui/ToastManager");
var Device_1 = require("../../../framework/plugin_boosts/gamesys/Device");
var Main_1 = require("../Main");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShopDialog = /** @class */ (function (_super) {
    __extends(ShopDialog, _super);
    function ShopDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollview = null;
        _this.freeDiamondLabel = null;
        _this.freeDiamondBtn = null;
        return _this;
    }
    ShopDialog.prototype.onLoad = function () {
        // this.scrollview
    };
    ShopDialog.prototype.start = function () {
    };
    ShopDialog.prototype.onShown = function () {
        var _this = this;
        // {"id":"1","mini_img":"a1","img":"a2","cost":"100"},
        this.scrollview.showlist(function (node, data, i) {
            // console.log(i,data);
            var item = node.getComponent(ShopItemTemplate_1.default);
            item.data = data;
            item.diamondLabel.string = data.cost;
            var isLocked = !Info_1.UserInfo.isUnlock(data.id);
            item.btnBuyNode.active = isLocked;
            item.maskNode.active = isLocked;
            item.borderNode.color = cc.Color.WHITE;
            item.titleLabel.string = data.text;
            item.selectedFlag.active = Info_1.UserInfo.selectedSkin == data.id;
            item.btnSignal.add(_this.click_unlock, _this);
            SpriteFrameCache_1.default.instance.getSpriteFrame("Game/Textures/ThumbBgs/" + data.mini_img + ".jpg").then(function (sf) { return item.bgmini.spriteFrame = sf; });
        }, Res_1.R.skinConfig.json);
        // this.refreshBtnStatus();
    };
    ShopDialog.prototype.refreshBtnStatus = function () {
        // if (G.isNextDay(UserInfo.shopFreeDiamondTime)) {
        //     this.freeDiamondLabel.string = "免费得50"
        //     UIFunctions.setButtonEnabled(this.freeDiamondBtn, true)
        // } else {
        //     this.freeDiamondLabel.string = "已领取"
        //     UIFunctions.setButtonEnabled(this.freeDiamondBtn, false)
        // }
    };
    ShopDialog.prototype.click_close = function () {
    };
    ShopDialog.prototype.share_succ = function () {
        Info_1.UserInfo.addDiamond(50);
        Info_1.UserInfo.shopFreeDiamondTime = new Date().getTime();
        Info_1.UserInfo.save();
        this.refreshBtnStatus();
    };
    ShopDialog.prototype.click_free = function () {
        var choice = Info_1.UserInfo.getChoice(Info_1.ChoiceType.Shop);
        if (choice == 1) {
        }
        else if (choice == 0) {
            this.share_succ();
        }
        else {
            //video
        }
    };
    ShopDialog.prototype.selectBg = function (data) {
        Info_1.UserInfo.selectedSkin = data.id;
        Info_1.UserInfo.save();
        this.onShown();
    };
    ShopDialog.prototype.click_unlock = function (data) {
        if (Info_1.UserInfo.isUnlock(data.id)) {
            //select 
            this.selectBg(data);
            ToastManager_1.Toast.make("已选择 " + data.text);
            return;
        }
        if (Info_1.UserInfo.diamond >= data.cost) {
            Info_1.UserInfo.diamond -= data.cost;
            Info_1.UserInfo.unlock(data.id);
            this.selectBg(data);
            ToastManager_1.Toast.make(cc.js.formatStr("%s已解锁", data.text));
            Device_1.default.playEffect(Res_1.R.audio_unlock);
            if (Main_1.default.instance)
                Main_1.default.instance.refreshRedpoints();
        }
        else {
            ToastManager_1.Toast.make("钻石不足");
            Device_1.default.playEffect(Res_1.R.audio_invalid);
        }
    };
    __decorate([
        property(cc.ScrollView)
    ], ShopDialog.prototype, "scrollview", void 0);
    __decorate([
        property(cc.Label)
    ], ShopDialog.prototype, "freeDiamondLabel", void 0);
    __decorate([
        property(cc.Button)
    ], ShopDialog.prototype, "freeDiamondBtn", void 0);
    ShopDialog = __decorate([
        ccclass
    ], ShopDialog);
    return ShopDialog;
}(cc.Component));
exports.default = ShopDialog;

cc._RF.pop();