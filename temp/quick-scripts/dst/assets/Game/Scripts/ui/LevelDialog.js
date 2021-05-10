
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/LevelDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXExldmVsRGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnQ0FBbUM7QUFDbkMsd0ZBQW1GO0FBRzdFLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFZO0lBQXJEOztJQWtEQSxDQUFDO0lBaERHLDRCQUFNLEdBQU4sY0FBVyxDQUFDO0lBQ1osMkJBQUssR0FBTCxjQUFVLENBQUM7SUFJWCw2QkFBTyxHQUFQO1FBRUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsZUFBUSxDQUFDLEtBQUssQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBRXZCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUMxQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsbUNBQWEsR0FBYjtRQUVJLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsa0NBQVksR0FBWixVQUFhLE1BQU07UUFFZixTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBQyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLE1BQU0sR0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLEVBQUMsY0FBVyxDQUFDLENBQUMsQ0FBQztRQUN2RyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBRUQsc0NBQWdCLEdBQWhCLFVBQWlCLElBQUk7SUFFckIsQ0FBQztJQUVELCtCQUFTLEdBQVQsVUFBVSxFQUFFO1FBRVIsRUFBRSxHQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBSSxFQUFFLENBQUMsQ0FBQztRQUNqQyxlQUFRLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUMzQixFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUQsb0NBQWMsR0FBZDtRQUVJLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzlCLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFDLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLEVBQUMsY0FBVyxDQUFDLENBQUMsQ0FBQztRQUM3RixJQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxJQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFDO1lBQ2pHLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7WUFFcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1NBQ2hCO0lBRUwsQ0FBQztJQTVDRDtRQURDLFFBQVEsQ0FBQyx1QkFBYSxDQUFDO2lEQUNEO0lBTE4sV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQWtEL0I7SUFBRCxrQkFBQztDQWxERCxBQWtEQyxDQWxEd0MsRUFBRSxDQUFDLFNBQVMsR0FrRHBEO2tCQWxEb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSBcIi4uL0luZm9cIjtcbmltcG9ydCBMZXZlbFNlbGVjdG9yIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9nYW1lL0xldmVsU2VsZWN0b3JcIjtcblxuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsRGlhbG9nIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIG9uTG9hZCAoKSB7fVxuICAgIHN0YXJ0ICgpIHt9XG4gICAgQHByb3BlcnR5KExldmVsU2VsZWN0b3IpXG4gICAgc2VsZWN0b3I6TGV2ZWxTZWxlY3RvcjtcblxuICAgIG9uU2hvd24oKVxuICAgIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5jdXJyZW50TGV2ZWwgPSBVc2VySW5mby5sZXZlbDtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5yZWZyZXNoKClcblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnJlZnJlc2hMZXZlbHMsIDAuMSlcbiAgICAgICAgYXBwR2FtZS5iYW5uZXIucGxheUJhbm5lcigxKTtcbiAgICB9XG5cbiAgICByZWZyZXNoTGV2ZWxzKClcbiAgICB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3Iuc2Nyb2xsVG9DdXJyZW50TGV2ZWwoKTtcbiAgICB9XG5cbiAgICBzZWxlY3RfbGV2ZWwobHZub2RlKVxuICAgIHtcbiAgICAgICAgaHR0cFV0aWxzLmh0dHBQb3N0KGNvbnN0cy5IVFRQX1JFQ09SRF9TRVJWRVIse3RpdGxlOifpgInmi6nlhbPljaHnlYzpnaInLGNvbnRlbnQ6J+eCueWHu+WFs+WNoScrbHZub2RlLm5hbWV9LGZ1bmN0aW9uKCl7fSk7XG4gICAgICAgIHRoaXMuZ290b0xldmVsKGx2bm9kZS5uYW1lKVxuICAgIH1cblxuICAgIHJlZnJlc2hMZXZlbEl0ZW0oZGF0YSlcbiAgICB7XG4gICAgfVxuXG4gICAgZ290b0xldmVsKGx2KVxuICAgIHtcbiAgICAgICAgbHYgPSAgcGFyc2VJbnQobHYpXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZW50ZXIgbGV2ZWxcIiAgLCBsdik7XG4gICAgICAgIFVzZXJJbmZvLmN1cnJlbnRMZXZlbCA9IGx2O1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lXCIpXG4gICAgfVxuXG4gICAgY2xpY2tfY29udGludWUoKVxuICAgIHtcbiAgICAgICAgdGhpcy5nb3RvTGV2ZWwoVXNlckluZm8ubGV2ZWwpXG4gICAgICAgIGh0dHBVdGlscy5odHRwUG9zdChjb25zdHMuSFRUUF9SRUNPUkRfU0VSVkVSLHt0aXRsZTon6YCJ5oup5YWz5Y2h55WM6Z2iJyxjb250ZW50Oifngrnlh7vnu6fnu63muLjmiI8nfSxmdW5jdGlvbigpe30pO1xuICAgICAgICBpZihhcHBHYW1lLmdhbWVTZXJ2ZXJSb29tLmdhbWVDb25maWdEYXRhICYmYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5nYW1lQ29uZmlnRGF0YS5MZXZlbERpYWxvZ0NvbnRpbnVlKXtcbiAgICAgICAgICAgIGFwcEdhbWUudmlkZW9CYW5uZXIucGxheVZpZGVvQWQoMSwwLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufSJdfQ==