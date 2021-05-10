
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/DailyGetDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd3b8fModWBPmovqTucbpm5C', 'DailyGetDialog');
// Game/Scripts/ui/DailyGetDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Info_1 = require("../Info");
var View_1 = require("../../../framework/plugin_boosts/ui/View");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DailyGetDialog = /** @class */ (function (_super) {
    __extends(DailyGetDialog, _super);
    function DailyGetDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.diamond = 0;
        _this.rewardLabel = null;
        return _this;
    }
    DailyGetDialog.prototype.onLoad = function () { };
    DailyGetDialog.prototype.start = function () { };
    DailyGetDialog.prototype.onShown = function () {
        this.diamond = g.randomInt(20, 50);
        this.rewardLabel.string = cc.js.formatStr("钻石 x " + this.diamond);
    };
    DailyGetDialog.prototype.click_get = function () {
        // share or video 
        Info_1.UserInfo.addDiamond(this.diamond);
        Info_1.UserInfo.dailyGetTime = new Date().getTime();
        Info_1.UserInfo.save();
        this.getComponent(View_1.default).hide();
    };
    DailyGetDialog.prototype.share_succ = function () {
        Info_1.UserInfo.addDiamond(this.diamond * 2);
        Info_1.UserInfo.dailyGetTime = new Date().getTime();
        Info_1.UserInfo.save();
        this.getComponent(View_1.default).hide();
    };
    DailyGetDialog.prototype.click_get_double = function () {
        //share orvideo
        var choice = Info_1.UserInfo.getChoice(Info_1.ChoiceType.DailyGet);
        if (choice == 0) {
            this.share_succ();
        }
    };
    __decorate([
        property(cc.Label)
    ], DailyGetDialog.prototype, "rewardLabel", void 0);
    DailyGetDialog = __decorate([
        ccclass
    ], DailyGetDialog);
    return DailyGetDialog;
}(cc.Component));
exports.default = DailyGetDialog;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXERhaWx5R2V0RGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnQ0FBK0M7QUFDL0MsaUVBQTREO0FBSXRELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBeUNDO1FBckNHLGFBQU8sR0FBVSxDQUFDLENBQUM7UUFHbkIsaUJBQVcsR0FBWSxJQUFJLENBQUM7O0lBa0NoQyxDQUFDO0lBdkNHLCtCQUFNLEdBQU4sY0FBVyxDQUFDO0lBQ1osOEJBQUssR0FBTCxjQUFVLENBQUM7SUFNWCxnQ0FBTyxHQUFQO1FBRUksSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3JFLENBQUM7SUFFRCxrQ0FBUyxHQUFUO1FBRUksa0JBQWtCO1FBQ2xCLGVBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2pDLGVBQVEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUM1QyxlQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDZixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2xDLENBQUM7SUFFRCxtQ0FBVSxHQUFWO1FBRUksZUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLGVBQVEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUM1QyxlQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDZixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2xDLENBQUM7SUFFRCx5Q0FBZ0IsR0FBaEI7UUFFSSxlQUFlO1FBQ2YsSUFBSSxNQUFNLEdBQUcsZUFBUSxDQUFDLFNBQVMsQ0FBQyxpQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELElBQUksTUFBTSxJQUFJLENBQUMsRUFDZjtZQUNJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFqQ0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt1REFDUztJQVBYLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0F5Q2xDO0lBQUQscUJBQUM7Q0F6Q0QsQUF5Q0MsQ0F6QzJDLEVBQUUsQ0FBQyxTQUFTLEdBeUN2RDtrQkF6Q29CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VySW5mbywgQ2hvaWNlVHlwZSB9IGZyb20gXCIuLi9JbmZvXCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVmlld1wiO1xuaW1wb3J0IHsgVG9hc3QgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVG9hc3RNYW5hZ2VyXCI7XG5cblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYWlseUdldERpYWxvZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBvbkxvYWQgKCkge31cbiAgICBzdGFydCAoKSB7fVxuICAgIGRpYW1vbmQ6bnVtYmVyID0gMDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICByZXdhcmRMYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBvblNob3duKClcbiAgICB7XG4gICAgICAgIHRoaXMuZGlhbW9uZCA9IGcucmFuZG9tSW50KDIwLDUwKTtcbiAgICAgICAgdGhpcy5yZXdhcmRMYWJlbC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoXCLpkrvnn7MgeCBcIiArIHRoaXMuZGlhbW9uZClcbiAgICB9XG5cbiAgICBjbGlja19nZXQoKVxuICAgIHtcbiAgICAgICAgLy8gc2hhcmUgb3IgdmlkZW8gXG4gICAgICAgIFVzZXJJbmZvLmFkZERpYW1vbmQodGhpcy5kaWFtb25kKVxuICAgICAgICBVc2VySW5mby5kYWlseUdldFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBVc2VySW5mby5zYXZlKClcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoVmlldykuaGlkZSgpXG4gICAgfVxuXG4gICAgc2hhcmVfc3VjYygpXG4gICAge1xuICAgICAgICBVc2VySW5mby5hZGREaWFtb25kKHRoaXMuZGlhbW9uZCAqIDIpO1xuICAgICAgICBVc2VySW5mby5kYWlseUdldFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBVc2VySW5mby5zYXZlKClcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoVmlldykuaGlkZSgpXG4gICAgfVxuXG4gICAgY2xpY2tfZ2V0X2RvdWJsZSgpXG4gICAge1xuICAgICAgICAvL3NoYXJlIG9ydmlkZW9cbiAgICAgICAgbGV0IGNob2ljZSA9IFVzZXJJbmZvLmdldENob2ljZShDaG9pY2VUeXBlLkRhaWx5R2V0KTtcbiAgICAgICAgaWYgKGNob2ljZSA9PSAwKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNoYXJlX3N1Y2MoKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=