"use strict";
cc._RF.push(module, '83fb9osUoVEppfk8B6mkJYV', 'PauseDialog');
// Game/Scripts/ui/PauseDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PauseDialog = /** @class */ (function (_super) {
    __extends(PauseDialog, _super);
    function PauseDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PauseDialog.prototype.onLoad = function () { };
    PauseDialog.prototype.start = function () {
        appGame.banner.playBanner(1);
    };
    PauseDialog.prototype.click_share = function () {
    };
    PauseDialog.prototype.click_home = function () {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, { title: '游戏界面', content: '点击返回主界面' }, function () { });
        cc.director.loadScene("Main");
    };
    PauseDialog.prototype.click_restart = function () {
        cc.director.loadScene("Game");
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, { title: '返回界面', content: '重新开始' }, function () { });
        if (appGame.gameServerRoom.gameConfigData && appGame.gameServerRoom.gameConfigData.PauseDialogRestart) {
            appGame.videoBanner.playVideoAd(4, 0, function () {
            });
        }
    };
    PauseDialog = __decorate([
        ccclass
    ], PauseDialog);
    return PauseDialog;
}(cc.Component));
exports.default = PauseDialog;

cc._RF.pop();