"use strict";
cc._RF.push(module, '7d78f0lU+VOW7rncsSfgC5s', 'WinDialog');
// Game/Scripts/ui/WinDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Info_1 = require("../Info");
var ViewManager_1 = require("../../../framework/plugin_boosts/ui/ViewManager");
var Consts_1 = require("../hex-lines-game/Consts");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WinDialog = /** @class */ (function (_super) {
    __extends(WinDialog, _super);
    function WinDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ps = null;
        _this.levelLabel = null;
        _this.screenShareAuto = null;
        return _this;
    }
    WinDialog.prototype.onLoad = function () { };
    WinDialog.prototype.start = function () { };
    WinDialog.prototype.decreaseFomula = function (max, min, t, d) {
        return max - (t / (t + d) * (max - min));
    };
    ;
    WinDialog.prototype.onShown = function () {
        this.screenShareAuto.active = false;
        if (appGame.platform == "toutiao") {
            appGame.screenAuto.playScreenCap(false);
            this.screenShareAuto.active = true;
        }
        this.ps.resetSystem();
        this.levelLabel.string = cc.js.formatStr("关卡 " + Info_1.UserInfo.currentLevel);
        var p = this.decreaseFomula(0.99, 0.3, Info_1.UserInfo.timePassed + Info_1.UserInfo.stepUsed, Info_1.UserInfo.currentLevel + 50);
        if (Info_1.UserInfo.level == Info_1.UserInfo.currentLevel) {
            var lv = Info_1.UserInfo.level;
            var choise_1 = Info_1.UserInfo.getChoice(Info_1.ChoiceType.Levelup);
            // if(choise > 0 && Math.random() > 0.5 && lv >= 3)
            // {
            //     this.scheduleOnce(_=>{
            //         ViewManager.instance.show("Game/LevelupDialog",lv,p)
            //     },1)
            // }else{
            //     p = Math.min(p,1);
            //     let diamond = Math.floor(Math.max(30 * p,10))
            //     UserInfo.addDiamond(diamond);
            // }
            Info_1.UserInfo.level = lv + 1;
            Info_1.UserInfo.save();
        }
        var choise = Info_1.UserInfo.getChoice(Info_1.ChoiceType.HB);
        if (choise == 1) {
            if (Info_1.UserInfo.level >= 3) {
                if (!Info_1.UserInfo.isUnlock(Consts_1.default.FreeSkinId)) {
                    ViewManager_1.default.instance.show("Game/HbDialog");
                }
            }
        }
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, { title: '结算界面', content: '第' + Info_1.UserInfo.level + "关" }, function () { });
        appGame.banner.playBanner(1);
    };
    WinDialog.prototype.click_rank = function () {
        ViewManager_1.default.instance.show("wechat/WxRankDialog");
    };
    //修改成开始当前游戏
    WinDialog.prototype.click_shop = function () {
        cc.director.loadScene("Game");
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, { title: '结算界面', content: '点击重玩' }, function () { });
        if (appGame.gameServerRoom.gameConfigData && appGame.gameServerRoom.gameConfigData.winAgain) {
            appGame.videoBanner.playVideoAd(3, 0, function () {
                //  UserInfo.currentLevel = UserInfo.currentLevel ;
            });
        }
        //ViewManager.instance.show("Game/ShopDialog");
    };
    WinDialog.prototype.click_next = function () {
        var btn3 = this.node.getChildByName("btn3").getComponent(cc.Button);
        btn3.enabled = false;
        this.scheduleOnce(function () {
            btn3.enabled = true;
        }.bind(this), 2);
        Info_1.UserInfo.currentLevel = Info_1.UserInfo.currentLevel + 1;
        cc.director.loadScene("Game");
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, { title: '结算界面', content: '点击下一关' }, function () { });
        if (appGame.gameServerRoom.gameConfigData && appGame.gameServerRoom.gameConfigData.winNextLevel) {
            appGame.videoBanner.playVideoAd(2, 0, function () {
                cc.log("win1");
                btn3.enabled = true;
            }.bind(this));
        }
    };
    WinDialog.prototype.click_home = function () {
        cc.director.loadScene("Main");
    };
    WinDialog.prototype.click_share = function () {
    };
    __decorate([
        property(cc.ParticleSystem)
    ], WinDialog.prototype, "ps", void 0);
    __decorate([
        property(cc.Label)
    ], WinDialog.prototype, "levelLabel", void 0);
    __decorate([
        property(cc.Node)
    ], WinDialog.prototype, "screenShareAuto", void 0);
    WinDialog = __decorate([
        ccclass
    ], WinDialog);
    return WinDialog;
}(cc.Component));
exports.default = WinDialog;

cc._RF.pop();