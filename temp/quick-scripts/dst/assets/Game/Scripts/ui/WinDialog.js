
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/WinDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXFdpbkRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0NBQStDO0FBRS9DLCtFQUEwRTtBQUMxRSxtREFBOEM7QUFHeEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQVk7SUFBbkQ7UUFBQSxxRUFxSEM7UUFqSEcsUUFBRSxHQUFxQixJQUFJLENBQUM7UUFHNUIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IscUJBQWUsR0FBVyxJQUFJLENBQUM7O0lBMkduQyxDQUFDO0lBekdHLDBCQUFNLEdBQU4sY0FBVyxDQUFDO0lBQ1oseUJBQUssR0FBTCxjQUFVLENBQUM7SUFDWCxrQ0FBYyxHQUFkLFVBQWdCLEdBQUcsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLENBQUM7UUFFdkIsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUUsQ0FBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUUsQ0FBQTtJQUM3QyxDQUFDO0lBQUEsQ0FBQztJQUNGLDJCQUFPLEdBQVA7UUFFSSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBSSxLQUFLLENBQUM7UUFDckMsSUFBRyxPQUFPLENBQUMsUUFBUSxJQUFJLFNBQVMsRUFBQztZQUM3QixPQUFPLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUN2QyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBSSxJQUFJLENBQUM7U0FDdkM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBR3RCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBQyxlQUFR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LEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzdCLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFDLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsY0FBVyxDQUFDLENBQUMsQ0FBQztRQUMxRixJQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxJQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBQztZQUMxRixPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO2dCQUNoQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtTQUNoQjtJQUVMLENBQUM7SUFFRCw4QkFBVSxHQUFWO1FBRUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDakMsQ0FBQztJQUVELCtCQUFXLEdBQVg7SUFHQSxDQUFDO0lBaEhEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUM7eUNBQ0E7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFDUTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNhO0lBVmQsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXFIN0I7SUFBRCxnQkFBQztDQXJIRCxBQXFIQyxDQXJIc0MsRUFBRSxDQUFDLFNBQVMsR0FxSGxEO2tCQXJIb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXJJbmZvLCBDaG9pY2VUeXBlIH0gZnJvbSBcIi4uL0luZm9cIjtcblxuaW1wb3J0IFZpZXdNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9WaWV3TWFuYWdlclwiO1xuaW1wb3J0IENvbnN0cyBmcm9tIFwiLi4vaGV4LWxpbmVzLWdhbWUvQ29uc3RzXCI7XG5cblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaW5EaWFsb2cgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG5cbiAgICBAcHJvcGVydHkoY2MuUGFydGljbGVTeXN0ZW0pXG4gICAgcHM6Y2MuUGFydGljbGVTeXN0ZW0gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxldmVsTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2NyZWVuU2hhcmVBdXRvOmNjLk5vZGUgPSBudWxsO1xuICAgIFxuICAgIG9uTG9hZCAoKSB7fVxuICAgIHN0YXJ0ICgpIHt9XG4gICAgZGVjcmVhc2VGb211bGEgKG1heCxtaW4sdCxkKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG1heCAtICh0LyAoIHQgKyBkKSAqIChtYXggLSBtaW4pIClcbiAgICB9O1xuICAgIG9uU2hvd24oKVxuICAgIHtcbiAgICAgICAgdGhpcy5zY3JlZW5TaGFyZUF1dG8uYWN0aXZlID0gIGZhbHNlO1xuICAgICAgICBpZihhcHBHYW1lLnBsYXRmb3JtID09IFwidG91dGlhb1wiKXtcbiAgICAgICAgICAgIGFwcEdhbWUuc2NyZWVuQXV0by5wbGF5U2NyZWVuQ2FwKGZhbHNlKVxuICAgICAgICAgICAgdGhpcy5zY3JlZW5TaGFyZUF1dG8uYWN0aXZlID0gIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcy5yZXNldFN5c3RlbSgpO1xuICAgICAgICBcblxuICAgICAgICB0aGlzLmxldmVsTGFiZWwuc3RyaW5nID0gY2MuanMuZm9ybWF0U3RyKFwi5YWz5Y2hIFwiK1VzZXJJbmZvLmN1cnJlbnRMZXZlbClcblxuICAgICAgICBsZXQgcCA9IHRoaXMuZGVjcmVhc2VGb211bGEoMC45OSwwLjMsVXNlckluZm8udGltZVBhc3NlZCArIFVzZXJJbmZvLnN0ZXBVc2VkLFVzZXJJbmZvLmN1cnJlbnRMZXZlbCArIDUwIClcblxuICAgICAgICBcbiAgICAgICAgaWYoVXNlckluZm8ubGV2ZWwgPT0gVXNlckluZm8uY3VycmVudExldmVsKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgbHYgPSBVc2VySW5mby5sZXZlbFxuICAgICAgICAgICAgbGV0IGNob2lzZSA9IFVzZXJJbmZvLmdldENob2ljZShDaG9pY2VUeXBlLkxldmVsdXApO1xuICAgICAgICAgICAgLy8gaWYoY2hvaXNlID4gMCAmJiBNYXRoLnJhbmRvbSgpID4gMC41ICYmIGx2ID49IDMpXG4gICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5zY2hlZHVsZU9uY2UoXz0+e1xuICAgICAgICAgICAgLy8gICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9MZXZlbHVwRGlhbG9nXCIsbHYscClcbiAgICAgICAgICAgIC8vICAgICB9LDEpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyB9ZWxzZXtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gICAgIHAgPSBNYXRoLm1pbihwLDEpO1xuICAgICAgICAgICAgLy8gICAgIGxldCBkaWFtb25kID0gTWF0aC5mbG9vcihNYXRoLm1heCgzMCAqIHAsMTApKVxuICAgICAgICAgIFxuICAgICAgICAgICAgLy8gICAgIFVzZXJJbmZvLmFkZERpYW1vbmQoZGlhbW9uZCk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBVc2VySW5mby5sZXZlbCA9IGx2ICsgMVxuICAgICAgICAgXG4gICAgICAgICAgICBVc2VySW5mby5zYXZlKCk7XG4gXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNob2lzZSA9IFVzZXJJbmZvLmdldENob2ljZShDaG9pY2VUeXBlLkhCKTtcbiAgICAgICAgaWYoY2hvaXNlID09IDEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKFVzZXJJbmZvLmxldmVsID49IDMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoIVVzZXJJbmZvLmlzVW5sb2NrKENvbnN0cy5GcmVlU2tpbklkKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL0hiRGlhbG9nXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGh0dHBVdGlscy5odHRwUG9zdChjb25zdHMuSFRUUF9SRUNPUkRfU0VSVkVSLHt0aXRsZTon57uT566X55WM6Z2iJyxjb250ZW50OifnrKwnK1VzZXJJbmZvLmxldmVsK1wi5YWzXCJ9LGZ1bmN0aW9uKCl7fSk7XG4gICAgICAgIGFwcEdhbWUuYmFubmVyLnBsYXlCYW5uZXIoMSk7XG4gICAgfVxuXG4gICAgY2xpY2tfcmFuaygpXG4gICAge1xuICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwid2VjaGF0L1d4UmFua0RpYWxvZ1wiKVxuICAgIH1cbiAgICAvL+S/ruaUueaIkOW8gOWni+W9k+WJjea4uOaIj1xuICAgIGNsaWNrX3Nob3AoKVxuICAgIHtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiR2FtZVwiKVxuICAgICAgICBodHRwVXRpbHMuaHR0cFBvc3QoY29uc3RzLkhUVFBfUkVDT1JEX1NFUlZFUix7dGl0bGU6J+e7k+eul+eVjOmdoicsY29udGVudDon54K55Ye76YeN546pJ30sZnVuY3Rpb24oKXt9KTtcbiAgICAgICAgaWYoYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5nYW1lQ29uZmlnRGF0YSAmJmFwcEdhbWUuZ2FtZVNlcnZlclJvb20uZ2FtZUNvbmZpZ0RhdGEud2luQWdhaW4pe1xuICAgICAgICAgICAgYXBwR2FtZS52aWRlb0Jhbm5lci5wbGF5VmlkZW9BZCgzLDAsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgLy8gIFVzZXJJbmZvLmN1cnJlbnRMZXZlbCA9IFVzZXJJbmZvLmN1cnJlbnRMZXZlbCA7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICAvL1ZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL1Nob3BEaWFsb2dcIik7XG4gICAgfVxuXG4gICAgY2xpY2tfbmV4dCgpXG4gICAge1xuICAgICAgICB2YXIgYnRuMyA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bjNcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgIGJ0bjMuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgYnRuMy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgfS5iaW5kKHRoaXMpLDIpO1xuICAgICAgICBVc2VySW5mby5jdXJyZW50TGV2ZWwgPSBVc2VySW5mby5jdXJyZW50TGV2ZWwgKzE7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkdhbWVcIilcbiAgICAgICAgaHR0cFV0aWxzLmh0dHBQb3N0KGNvbnN0cy5IVFRQX1JFQ09SRF9TRVJWRVIse3RpdGxlOifnu5PnrpfnlYzpnaInLGNvbnRlbnQ6J+eCueWHu+S4i+S4gOWFsyd9LGZ1bmN0aW9uKCl7fSk7XG4gICAgICAgIGlmKGFwcEdhbWUuZ2FtZVNlcnZlclJvb20uZ2FtZUNvbmZpZ0RhdGEgJiZhcHBHYW1lLmdhbWVTZXJ2ZXJSb29tLmdhbWVDb25maWdEYXRhLndpbk5leHRMZXZlbCl7XG4gICAgICAgICAgICBhcHBHYW1lLnZpZGVvQmFubmVyLnBsYXlWaWRlb0FkKDIsMCxmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcIndpbjFcIik7XG4gICAgICAgICAgICAgICAgYnRuMy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgfVxuICAgICAgXG4gICAgfVxuXG4gICAgY2xpY2tfaG9tZSgpXG4gICAge1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluXCIpXG4gICAgfVxuXG4gICAgY2xpY2tfc2hhcmUoKVxuICAgIHtcblxuICAgIH1cbn0iXX0=