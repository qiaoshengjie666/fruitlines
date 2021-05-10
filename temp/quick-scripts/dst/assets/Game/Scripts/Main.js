
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/Main.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '979d2m9WlRN0519FkcUBa5E', 'Main');
// Game/Scripts/Main.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ViewManager_1 = require("../../framework/plugin_boosts/ui/ViewManager");
var Device_1 = require("../../framework/plugin_boosts/gamesys/Device");
var Res_1 = require("./hex-lines-game/Res");
var ToastManager_1 = require("../../framework/plugin_boosts/ui/ToastManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main_1 = Main;
    Main.prototype.onLoad = function () {
        Main_1.instance = this;
        Device_1.default.playMusic(Res_1.R.audio_bgm);
    };
    Main.prototype.isNextDay = function (timeSec) {
        return this.isGreaterDate(new Date(), new Date(timeSec));
    };
    ;
    Main.prototype.isGreaterDate = function (now, before) {
        var diff = now.getTime() - before.getTime();
        if (diff > 86400000) // 24*60*60*1000
         {
            return true;
        }
        else {
            if (diff > 0)
                return now.getDate() != before.getDate();
            else
                return false;
        }
    };
    ;
    Main.prototype.start = function () {
        appGame.gameServerRoom.emit(consts.CLIENT_GAME_START, function () {
            appGame.banner.playBanner(2);
        });
    };
    Main.prototype.click_play = function () {
        ViewManager_1.default.instance.show("Game/LevelDialog");
    };
    Main.prototype.toggle_sfx = function (t) {
        Device_1.default.setSoundsEnable(!t.isChecked);
    };
    Main.prototype.click_skin = function () {
        ViewManager_1.default.instance.show("Game/ShopDialog");
    };
    Main.prototype.click_rank = function () {
        ViewManager_1.default.instance.show("wechat/WxRankDialog");
    };
    Main.prototype.onShare = function () {
    };
    Main.prototype.click_share = function () {
    };
    Main.prototype.click_luck = function () {
        ViewManager_1.default.instance.show("Game/LuckyDialog");
    };
    Main.prototype.click_more = function () {
        ToastManager_1.Toast.make("敬请期待");
    };
    var Main_1;
    Main.instance = null;
    Main = Main_1 = __decorate([
        ccclass
    ], Main);
    return Main;
}(cc.Component));
exports.default = Main;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcTWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQXVFO0FBR3ZFLHVFQUFrRTtBQUNsRSw0Q0FBeUM7QUFDekMsOEVBQXNFO0FBRWhFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWtDLHdCQUFZO0lBQTlDOztJQXNFQSxDQUFDO2FBdEVvQixJQUFJO0lBS3JCLHFCQUFNLEdBQU47UUFDSSxNQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUVyQixnQkFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNELHdCQUFTLEdBQVQsVUFBVSxPQUFPO1FBRWIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUMzRCxDQUFDO0lBQUEsQ0FBQztJQUNGLDRCQUFhLEdBQWIsVUFBYyxHQUFHLEVBQUMsTUFBTTtRQUVwQixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQzNDLElBQUcsSUFBSSxHQUFHLFFBQVEsRUFBRSxnQkFBZ0I7U0FDcEM7WUFDSSxPQUFPLElBQUksQ0FBQztTQUNmO2FBQUk7WUFDRCxJQUFJLElBQUksR0FBRyxDQUFDO2dCQUNSLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQTs7Z0JBRXhDLE9BQU8sS0FBSyxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUFBLENBQUM7SUFHRixvQkFBSyxHQUFMO1FBQ0ksT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFDO1lBQ2pELE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVELHlCQUFVLEdBQVY7UUFDSSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUNqRCxDQUFDO0lBRUQseUJBQVUsR0FBVixVQUFXLENBQUM7UUFDUixnQkFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBRUQseUJBQVUsR0FBVjtRQUNJLHFCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ2hELENBQUM7SUFFRCx5QkFBVSxHQUFWO1FBQ0kscUJBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUVELHNCQUFPLEdBQVA7SUFFQSxDQUFDO0lBRUQsMEJBQVcsR0FBWDtJQUVBLENBQUM7SUFFRCx5QkFBVSxHQUFWO1FBQ0kscUJBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7SUFDakQsQ0FBQztJQUdELHlCQUFVLEdBQVY7UUFDSSxvQkFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN0QixDQUFDOztJQWpFTSxhQUFRLEdBQVMsSUFBSSxDQUFDO0lBRlosSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQXNFeEI7SUFBRCxXQUFDO0NBdEVELEFBc0VDLENBdEVpQyxFQUFFLENBQUMsU0FBUyxHQXNFN0M7a0JBdEVvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdNYW5hZ2VyIGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9WaWV3TWFuYWdlclwiO1xuXG5cbmltcG9ydCBEZXZpY2UgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL2dhbWVzeXMvRGV2aWNlXCI7XG5pbXBvcnQgeyBSIH0gZnJvbSBcIi4vaGV4LWxpbmVzLWdhbWUvUmVzXCI7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9Ub2FzdE1hbmFnZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgc3RhdGljIGluc3RhbmNlOiBNYWluID0gbnVsbDtcblxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBNYWluLmluc3RhbmNlID0gdGhpcztcblxuICAgICAgICBEZXZpY2UucGxheU11c2ljKFIuYXVkaW9fYmdtKTtcbiAgICB9XG4gICAgaXNOZXh0RGF5KHRpbWVTZWMpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0dyZWF0ZXJEYXRlKG5ldyBEYXRlKCksbmV3IERhdGUodGltZVNlYykpXG4gICAgfTtcbiAgICBpc0dyZWF0ZXJEYXRlKG5vdyxiZWZvcmUpXG4gICAge1xuICAgICAgICB2YXIgZGlmZiA9IG5vdy5nZXRUaW1lKCkgLSBiZWZvcmUuZ2V0VGltZSgpIFxuICAgICAgICBpZihkaWZmID4gODY0MDAwMDApIC8vIDI0KjYwKjYwKjEwMDBcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgaWYgKGRpZmYgPiAwIClcbiAgICAgICAgICAgICAgICByZXR1cm4gbm93LmdldERhdGUoKSAhPSBiZWZvcmUuZ2V0RGF0ZSgpXG4gICAgICAgICAgICBlbHNlIFxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgXG4gICAgICAgIH1cbiAgICB9O1xuICBcblxuICAgIHN0YXJ0KCkgeyBcbiAgICAgICAgYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5lbWl0KGNvbnN0cy5DTElFTlRfR0FNRV9TVEFSVCxmdW5jdGlvbigpe1xuICAgICAgICAgICAgYXBwR2FtZS5iYW5uZXIucGxheUJhbm5lcigyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGNsaWNrX3BsYXkoKSB7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL0xldmVsRGlhbG9nXCIpXG4gICAgfVxuXG4gICAgdG9nZ2xlX3NmeCh0KSB7XG4gICAgICAgIERldmljZS5zZXRTb3VuZHNFbmFibGUoIXQuaXNDaGVja2VkKVxuICAgIH1cblxuICAgIGNsaWNrX3NraW4oKSB7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL1Nob3BEaWFsb2dcIilcbiAgICB9XG5cbiAgICBjbGlja19yYW5rKCkge1xuICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwid2VjaGF0L1d4UmFua0RpYWxvZ1wiKVxuICAgIH1cblxuICAgIG9uU2hhcmUoKSB7XG5cbiAgICB9XG5cbiAgICBjbGlja19zaGFyZSgpIHtcbiAgICAgICBcbiAgICB9XG5cbiAgICBjbGlja19sdWNrKCkge1xuICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9MdWNreURpYWxvZ1wiKVxuICAgIH1cblxuXG4gICAgY2xpY2tfbW9yZSgpIHtcbiAgICAgICAgVG9hc3QubWFrZShcIuaVrOivt+acn+W+hVwiKVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=