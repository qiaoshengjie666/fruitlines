
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/LevelupDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '192e1nHc39B4b1vo/mjTFG2', 'LevelupDialog');
// Game/Scripts/ui/LevelupDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Info_1 = require("../Info");
var View_1 = require("../../../framework/plugin_boosts/ui/View");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelupDialog = /** @class */ (function (_super) {
    __extends(LevelupDialog, _super);
    function LevelupDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.diamondLabel = null;
        _this.btnLabel = null;
        _this.tipLabel = null;
        _this.levelLabel = null;
        _this.mult = 1;
        _this.baseDiamond = 0;
        return _this;
    }
    LevelupDialog.prototype.onLoad = function () { };
    LevelupDialog.prototype.start = function () { };
    LevelupDialog.prototype.onShown = function (level, p) {
        //给钻石
        p = Math.min(p, 1);
        var diamond = Math.floor(Math.max(30 * p, 10));
        this.baseDiamond = diamond;
        this.diamondLabel.string = diamond.toString();
        this.levelLabel.string = cc.js.formatStr("- 第 %s 关 - ", level);
        // if(Math.random() > 0.7)
        // {
        //     this.mult = g.randomInt(3,6)
        //     this.btnLabel.string = this.mult +"倍领取"
        // }else{
        //     this.btnLabel.string = "双倍领取"
        //     this.mult = 2
        // }
        //this.tipLabel.string ="恭喜获得" + this.btnLabel.string +"奖励机会"
    };
    LevelupDialog.prototype.click_get = function () {
        Info_1.UserInfo.addDiamond(this.baseDiamond);
        Info_1.UserInfo.save();
        this.getComponent(View_1.default).hide();
    };
    LevelupDialog.prototype.share_suc = function () {
        Info_1.UserInfo.addDiamond(this.baseDiamond * this.mult);
        Info_1.UserInfo.save();
        this.getComponent(View_1.default).hide();
    };
    LevelupDialog.prototype.click_getex = function () {
        var choise = Info_1.UserInfo.getChoice(Info_1.ChoiceType.Levelup);
    };
    __decorate([
        property(cc.Label)
    ], LevelupDialog.prototype, "diamondLabel", void 0);
    __decorate([
        property(cc.Label)
    ], LevelupDialog.prototype, "btnLabel", void 0);
    __decorate([
        property(cc.Label)
    ], LevelupDialog.prototype, "tipLabel", void 0);
    __decorate([
        property(cc.Label)
    ], LevelupDialog.prototype, "levelLabel", void 0);
    LevelupDialog = __decorate([
        ccclass
    ], LevelupDialog);
    return LevelupDialog;
}(cc.Component));
exports.default = LevelupDialog;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXExldmVsdXBEaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdDQUErQztBQUMvQyxpRUFBNEQ7QUFHdEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUE2REM7UUExREcsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFJN0IsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLFVBQUksR0FBVSxDQUFDLENBQUM7UUFFaEIsaUJBQVcsR0FBVSxDQUFDLENBQUM7O0lBNEMzQixDQUFDO0lBMUNHLDhCQUFNLEdBQU4sY0FBVyxDQUFDO0lBQ1osNkJBQUssR0FBTCxjQUFVLENBQUM7SUFDWCwrQkFBTyxHQUFQLFVBQVEsS0FBSyxFQUFDLENBQUM7UUFFWCxLQUFLO1FBQ0wsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBQyxLQUFLLENBQUMsQ0FBQTtRQUU3RCwwQkFBMEI7UUFDMUIsSUFBSTtRQUNKLG1DQUFtQztRQUNuQyw4Q0FBOEM7UUFDOUMsU0FBUztRQUNULG9DQUFvQztRQUNwQyxvQkFBb0I7UUFDcEIsSUFBSTtRQUNKLDZEQUE2RDtJQUNqRSxDQUFDO0lBRUQsaUNBQVMsR0FBVDtRQUVJLGVBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RDLGVBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2xDLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBRUksZUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxlQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNsQyxDQUFDO0lBRUQsbUNBQVcsR0FBWDtRQUVJLElBQUksTUFBTSxHQUFHLGVBQVEsQ0FBQyxTQUFTLENBQUMsaUJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUd4RCxDQUFDO0lBekREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dURBQ1U7SUFJN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDTTtJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO21EQUNNO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ1E7SUFiVixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBNkRqQztJQUFELG9CQUFDO0NBN0RELEFBNkRDLENBN0QwQyxFQUFFLENBQUMsU0FBUyxHQTZEdEQ7a0JBN0RvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlckluZm8sIENob2ljZVR5cGUgfSBmcm9tIFwiLi4vSW5mb1wiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1ZpZXdcIjtcblxuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsdXBEaWFsb2cgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGRpYW1vbmRMYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBidG5MYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdGlwTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxldmVsTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgbXVsdDpudW1iZXIgPSAxO1xuXG4gICAgYmFzZURpYW1vbmQ6bnVtYmVyID0gMDtcblxuICAgIG9uTG9hZCAoKSB7fVxuICAgIHN0YXJ0ICgpIHt9XG4gICAgb25TaG93bihsZXZlbCxwKVxuICAgIHtcbiAgICAgICAgLy/nu5npkrvnn7NcbiAgICAgICAgcCA9IE1hdGgubWluKHAsMSk7XG4gICAgICAgIGxldCBkaWFtb25kID0gTWF0aC5mbG9vcihNYXRoLm1heCgzMCAqIHAsMTApKVxuICAgICAgICB0aGlzLmJhc2VEaWFtb25kID0gZGlhbW9uZDtcbiAgICAgICAgdGhpcy5kaWFtb25kTGFiZWwuc3RyaW5nID0gZGlhbW9uZC50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmxldmVsTGFiZWwuc3RyaW5nID0gY2MuanMuZm9ybWF0U3RyKFwiLSDnrKwgJXMg5YWzIC0gXCIsbGV2ZWwpXG5cbiAgICAgICAgLy8gaWYoTWF0aC5yYW5kb20oKSA+IDAuNylcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgdGhpcy5tdWx0ID0gZy5yYW5kb21JbnQoMyw2KVxuICAgICAgICAvLyAgICAgdGhpcy5idG5MYWJlbC5zdHJpbmcgPSB0aGlzLm11bHQgK1wi5YCN6aKG5Y+WXCJcbiAgICAgICAgLy8gfWVsc2V7XG4gICAgICAgIC8vICAgICB0aGlzLmJ0bkxhYmVsLnN0cmluZyA9IFwi5Y+M5YCN6aKG5Y+WXCJcbiAgICAgICAgLy8gICAgIHRoaXMubXVsdCA9IDJcbiAgICAgICAgLy8gfVxuICAgICAgICAvL3RoaXMudGlwTGFiZWwuc3RyaW5nID1cIuaBreWWnOiOt+W+l1wiICsgdGhpcy5idG5MYWJlbC5zdHJpbmcgK1wi5aWW5Yqx5py65LyaXCJcbiAgICB9XG5cbiAgICBjbGlja19nZXQoKVxuICAgIHtcbiAgICAgICAgVXNlckluZm8uYWRkRGlhbW9uZCh0aGlzLmJhc2VEaWFtb25kKTtcbiAgICAgICAgVXNlckluZm8uc2F2ZSgpO1xuICAgICAgICB0aGlzLmdldENvbXBvbmVudChWaWV3KS5oaWRlKClcbiAgICB9XG5cbiAgICBzaGFyZV9zdWMoKVxuICAgIHtcbiAgICAgICAgVXNlckluZm8uYWRkRGlhbW9uZCh0aGlzLmJhc2VEaWFtb25kKnRoaXMubXVsdCk7XG4gICAgICAgIFVzZXJJbmZvLnNhdmUoKTtcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoVmlldykuaGlkZSgpXG4gICAgfVxuXG4gICAgY2xpY2tfZ2V0ZXgoKVxuICAgIHtcbiAgICAgICAgbGV0IGNob2lzZSA9IFVzZXJJbmZvLmdldENob2ljZShDaG9pY2VUeXBlLkxldmVsdXApO1xuXG4gICAgICAgIFxuICAgIH1cbn0iXX0=