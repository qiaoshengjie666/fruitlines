"use strict";
cc._RF.push(module, '4c94fc8PDtI1o3JM9m3WRKN', 'LevelDialog');
// Game/Scripts/ui/LevelDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Info_1 = require("../Info");
var LevelSelector_1 = require("../../../framework/plugin_boosts/ui/game/LevelSelector");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelDialog = /** @class */ (function (_super) {
    __extends(LevelDialog, _super);
    function LevelDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LevelDialog.prototype.onLoad = function () { };
    LevelDialog.prototype.start = function () { };
    LevelDialog.prototype.onShown = function () {
        this.selector.currentLevel = Info_1.UserInfo.level;
        this.selector.refresh();
        this.scheduleOnce(this.refreshLevels, 0.1);
        appGame.banner.playBanner(1);
    };
    LevelDialog.prototype.refreshLevels = function () {
        this.selector.scrollToCurrentLevel();
    };
    LevelDialog.prototype.select_level = function (lvnode) {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, { title: '选择关卡界面', content: '点击关卡' + lvnode.name }, function () { });
        this.gotoLevel(lvnode.name);
    };
    LevelDialog.prototype.refreshLevelItem = function (data) {
    };
    LevelDialog.prototype.gotoLevel = function (lv) {
        lv = parseInt(lv);
        console.log("enter level", lv);
        Info_1.UserInfo.currentLevel = lv;
        cc.director.loadScene("Game");
    };
    LevelDialog.prototype.click_continue = function () {
        this.gotoLevel(Info_1.UserInfo.level);
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, { title: '选择关卡界面', content: '点击继续游戏' }, function () { });
        if (appGame.gameServerRoom.gameConfigData && appGame.gameServerRoom.gameConfigData.LevelDialogContinue) {
            appGame.videoBanner.playVideoAd(1, 0, function () {
            }.bind(this));
        }
    };
    __decorate([
        property(LevelSelector_1.default)
    ], LevelDialog.prototype, "selector", void 0);
    LevelDialog = __decorate([
        ccclass
    ], LevelDialog);
    return LevelDialog;
}(cc.Component));
exports.default = LevelDialog;

cc._RF.pop();