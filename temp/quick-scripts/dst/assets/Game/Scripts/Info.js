
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/Info.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '894ddeHxZNOMqD6BW+YheZr', 'Info');
// Game/Scripts/Info.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfo = exports.ChoiceType = void 0;
var DataCenter_1 = require("../../framework/plugin_boosts/misc/DataCenter");
var Res_1 = require("./hex-lines-game/Res");
var ToastManager_1 = require("../../framework/plugin_boosts/ui/ToastManager");
var Device_1 = require("../../framework/plugin_boosts/gamesys/Device");
var ChoiceType;
(function (ChoiceType) {
    ChoiceType[ChoiceType["DailyGet"] = 0] = "DailyGet";
    ChoiceType[ChoiceType["Levelup"] = 1] = "Levelup";
    ChoiceType[ChoiceType["Get"] = 2] = "Get";
    ChoiceType[ChoiceType["Shop"] = 3] = "Shop";
    ChoiceType[ChoiceType["BannerAdRefresh"] = 4] = "BannerAdRefresh";
    ChoiceType[ChoiceType["HB"] = 5] = "HB";
})(ChoiceType = exports.ChoiceType || (exports.ChoiceType = {}));
var UserInfoClass = /** @class */ (function (_super) {
    __extends(UserInfoClass, _super);
    function UserInfoClass() {
        var _this = _super.call(this) || this;
        _this.choices = [];
        _this.version = "6";
        _this.level = 1;
        _this.selectedSkin = "2";
        _this.dailyGetTime = new Date(2018, 1, 1).getTime();
        _this.freedrawTime = _this.dailyGetTime;
        _this.luckyVideoWatchTime = _this.dailyGetTime;
        _this.shopFreeDiamondTime = _this.dailyGetTime;
        _this.diamond = 0;
        _this.sfx_enabled = true;
        _this.firstTimeReach = false;
        _this.luckyVideoWatchCount = 0;
        _this.timePassed = 0;
        _this.stepUsed = 0;
        _this.currentLevel = 1;
        _this.unlock(_this.selectedSkin);
        setTimeout(function () {
            _this.save();
        }, 60 * 1000);
        return _this;
        // onexit game =>save
    }
    // ret: 0:directly-get 1:share 2:video
    UserInfoClass.prototype.getChoice = function (slotId) {
        return this.choices[slotId] || 0;
    };
    UserInfoClass.prototype.init = function () {
    };
    UserInfoClass.prototype.onGetConfig = function (data) {
        if (data) {
            var record = data[0];
            if (record) {
                this.choices = JSON.parse(record[this.version]);
            }
        }
    };
    UserInfoClass.prototype.addDiamond = function (d, b) {
        if (b === void 0) { b = true; }
        if (typeof (d) == "number")
            this.diamond += d;
        else
            this.diamond += parseInt(d);
        if (b) {
            ToastManager_1.Toast.make("获得钻石 x" + d);
            Device_1.default.playEffect(Res_1.R.audio_get_diamond);
        }
        if (!this.firstTimeReach) {
            if (this.diamond >= 500) {
                ToastManager_1.Toast.make("哇可以买皮肤了，快去皮肤商店看看吧!", 2);
                this.firstTimeReach = true;
                exports.UserInfo.save();
            }
        }
    };
    UserInfoClass.prototype.isUnlock = function (skin_id) {
        var carUnlocked = localStorage.getItem("unlocked_" + skin_id);
        if (!carUnlocked) {
            return false;
        }
        else {
            return carUnlocked == "1";
        }
    };
    UserInfoClass.prototype.isAllUnlocked = function () {
        var c = 0;
        for (var i = 0; i < Res_1.R.skinConfig.json.length; i++) {
            var v = Res_1.R.skinConfig.json[i];
            if (exports.UserInfo.isUnlock(v.id)) {
                c++;
            }
        }
        return c == Res_1.R.skinConfig.json.length;
    };
    UserInfoClass.prototype.getSkinById = function (id) {
        var res = Res_1.R.skinConfig.json.filter(function (v) { return v.id == id; });
        return res[0];
    };
    UserInfoClass.prototype.unlock = function (skin_id) {
        localStorage.setItem("unlocked_" + skin_id, "1");
    };
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "level", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "selectedSkin", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "dailyGetTime", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "freedrawTime", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "luckyVideoWatchTime", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "shopFreeDiamondTime", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "diamond", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "sfx_enabled", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "firstTimeReach", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "luckyVideoWatchCount", void 0);
    UserInfoClass = __decorate([
        DataCenter_1.dc("Info")
    ], UserInfoClass);
    return UserInfoClass;
}(DataCenter_1.default));
exports.default = UserInfoClass;
exports.UserInfo = DataCenter_1.default.register(UserInfoClass);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcSW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRFQUFzRjtBQUN0Riw0Q0FBeUM7QUFDekMsOEVBQXNFO0FBQ3RFLHVFQUFrRTtBQUlsRSxJQUFZLFVBT1g7QUFQRCxXQUFZLFVBQVU7SUFDbEIsbURBQVEsQ0FBQTtJQUNSLGlEQUFPLENBQUE7SUFDUCx5Q0FBRyxDQUFBO0lBQ0gsMkNBQUksQ0FBQTtJQUNKLGlFQUFlLENBQUE7SUFDZix1Q0FBRSxDQUFBO0FBQ04sQ0FBQyxFQVBXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBT3JCO0FBR0Q7SUFBMkMsaUNBQVU7SUFpRmpEO1FBQUEsWUFFSSxpQkFBTyxTQU1WO1FBdkZELGFBQU8sR0FBTSxFQUFFLENBQUE7UUFDZixhQUFPLEdBQVUsR0FBRyxDQUFDO1FBeUJyQixXQUFLLEdBQVUsQ0FBQyxDQUFDO1FBR2pCLGtCQUFZLEdBQVUsR0FBRyxDQUFDO1FBRzFCLGtCQUFZLEdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUdwRCxrQkFBWSxHQUFVLEtBQUksQ0FBQyxZQUFZLENBQUM7UUFHeEMseUJBQW1CLEdBQVUsS0FBSSxDQUFDLFlBQVksQ0FBQTtRQUc5Qyx5QkFBbUIsR0FBVSxLQUFJLENBQUMsWUFBWSxDQUFDO1FBRy9DLGFBQU8sR0FBVSxDQUFDLENBQUM7UUFHbkIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFHM0Isb0JBQWMsR0FBVyxLQUFLLENBQUM7UUFHL0IsMEJBQW9CLEdBQVUsQ0FBQyxDQUFDO1FBQ2hDLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLGNBQVEsR0FBVSxDQUFDLENBQUM7UUFzQnBCLGtCQUFZLEdBQVUsQ0FBQyxDQUFDO1FBS3BCLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLFlBQVks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LE9BQU87UUFFVixZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBQyxPQUFPLEVBQUcsR0FBRyxDQUFDLENBQUE7SUFDbkQsQ0FBQztJQW5HRDtRQURDLGtCQUFLLEVBQUU7Z0RBQ1M7SUFHakI7UUFEQyxrQkFBSyxFQUFFO3VEQUNrQjtJQUcxQjtRQURDLGtCQUFLLEVBQUU7dURBQzRDO0lBR3BEO1FBREMsa0JBQUssRUFBRTt1REFDZ0M7SUFHeEM7UUFEQyxrQkFBSyxFQUFFOzhEQUNzQztJQUc5QztRQURDLGtCQUFLLEVBQUU7OERBQ3VDO0lBRy9DO1FBREMsa0JBQUssRUFBRTtrREFDVztJQUduQjtRQURDLGtCQUFLLEVBQUU7c0RBQ21CO0lBRzNCO1FBREMsa0JBQUssRUFBRTt5REFDdUI7SUFHL0I7UUFEQyxrQkFBSyxFQUFFOytEQUN3QjtJQXZEZixhQUFhO1FBRGpDLGVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDVSxhQUFhLENBaUlqQztJQUFELG9CQUFDO0NBaklELEFBaUlDLENBakkwQyxvQkFBVSxHQWlJcEQ7a0JBaklvQixhQUFhO0FBa0l2QixRQUFBLFFBQVEsR0FBaUIsb0JBQVUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGF0YUNlbnRlciwgeyBkYywgZmllbGQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvbWlzYy9EYXRhQ2VudGVyXCI7XG5pbXBvcnQgeyBSIH0gZnJvbSBcIi4vaGV4LWxpbmVzLWdhbWUvUmVzXCI7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9Ub2FzdE1hbmFnZXJcIjtcbmltcG9ydCBEZXZpY2UgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL2dhbWVzeXMvRGV2aWNlXCI7XG5cblxuXG5leHBvcnQgZW51bSBDaG9pY2VUeXBlICB7XG4gICAgRGFpbHlHZXQsXG4gICAgTGV2ZWx1cCxcbiAgICBHZXQsXG4gICAgU2hvcCxcbiAgICBCYW5uZXJBZFJlZnJlc2gsXG4gICAgSEIsXG59XG5cbkBkYyhcIkluZm9cIilcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbmZvQ2xhc3MgZXh0ZW5kcyBEYXRhQ2VudGVyXG57XG4gICAgY2hvaWNlczpbXSA9IFtdXG4gICAgdmVyc2lvbjpzdHJpbmcgPSBcIjZcIjtcbiAgICAvLyByZXQ6IDA6ZGlyZWN0bHktZ2V0IDE6c2hhcmUgMjp2aWRlb1xuICAgIGdldENob2ljZShzbG90SWQpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5jaG9pY2VzW3Nsb3RJZF0gfHwgMDtcbiAgICB9XG5cbiAgICBpbml0KClcbiAgICB7XG5cbiAgICB9XG4gICAgb25HZXRDb25maWcoZGF0YSlcbiAgICB7XG4gICAgICAgIGlmKGRhdGEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSBkYXRhWzBdXG4gICAgICAgICAgICBpZihyZWNvcmQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaG9pY2VzID0gSlNPTi5wYXJzZShyZWNvcmRbdGhpcy52ZXJzaW9uXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgXG4gICAgfVxuXG4gICAgQGZpZWxkKClcbiAgICBsZXZlbDpudW1iZXIgPSAxO1xuXG4gICAgQGZpZWxkKClcbiAgICBzZWxlY3RlZFNraW46c3RyaW5nID0gXCIyXCI7XG5cbiAgICBAZmllbGQoKVxuICAgIGRhaWx5R2V0VGltZTpudW1iZXIgPSAgbmV3IERhdGUoMjAxOCwxLDEpLmdldFRpbWUoKTtcblxuICAgIEBmaWVsZCgpXG4gICAgZnJlZWRyYXdUaW1lOm51bWJlciA9IHRoaXMuZGFpbHlHZXRUaW1lO1xuXG4gICAgQGZpZWxkKClcbiAgICBsdWNreVZpZGVvV2F0Y2hUaW1lOm51bWJlciA9IHRoaXMuZGFpbHlHZXRUaW1lXG5cbiAgICBAZmllbGQoKVxuICAgIHNob3BGcmVlRGlhbW9uZFRpbWU6bnVtYmVyID0gdGhpcy5kYWlseUdldFRpbWU7XG5cbiAgICBAZmllbGQoKVxuICAgIGRpYW1vbmQ6bnVtYmVyID0gMDtcblxuICAgIEBmaWVsZCgpXG4gICAgc2Z4X2VuYWJsZWQ6Ym9vbGVhbiA9IHRydWU7XG5cbiAgICBAZmllbGQoKVxuICAgIGZpcnN0VGltZVJlYWNoOmJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBmaWVsZCgpXG4gICAgbHVja3lWaWRlb1dhdGNoQ291bnQ6bnVtYmVyID0gMDtcbiAgICB0aW1lUGFzc2VkOiBudW1iZXIgPSAwO1xuICAgIHN0ZXBVc2VkOm51bWJlciA9IDA7XG5cbiAgICBhZGREaWFtb25kKGQsYiA9IHRydWUpXG4gICAge1xuICAgICAgICBpZih0eXBlb2YoZCkgPT0gXCJudW1iZXJcIikgdGhpcy5kaWFtb25kICs9IGQ7XG4gICAgICAgIGVsc2UgdGhpcy5kaWFtb25kICs9IHBhcnNlSW50KGQpO1xuICAgICAgICBpZihiKVxuICAgICAgICB7XG4gICAgICAgICAgICBUb2FzdC5tYWtlKFwi6I635b6X6ZK755+zIHhcIiArIGQpXG4gICAgICAgICAgICBEZXZpY2UucGxheUVmZmVjdChSLmF1ZGlvX2dldF9kaWFtb25kKTtcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5maXJzdFRpbWVSZWFjaClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYodGhpcy5kaWFtb25kID49IDUwMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBUb2FzdC5tYWtlKFwi5ZOH5Y+v5Lul5Lmw55qu6IKk5LqG77yM5b+r5Y6755qu6IKk5ZWG5bqX55yL55yL5ZCnIVwiLDIpXG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdFRpbWVSZWFjaCA9IHRydWVcbiAgICAgICAgICAgICAgICBVc2VySW5mby5zYXZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjdXJyZW50TGV2ZWw6bnVtYmVyID0gMTtcblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudW5sb2NrKHRoaXMuc2VsZWN0ZWRTa2luKTtcbiAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgIH0sIDYwICogMTAwMClcbiAgICAgICAgLy8gb25leGl0IGdhbWUgPT5zYXZlXG4gICAgfVxuXG4gICAgaXNVbmxvY2soc2tpbl9pZClcbiAgICB7XG4gICAgICAgIGxldCBjYXJVbmxvY2tlZCA9ICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVubG9ja2VkX1wiK3NraW5faWQpO1xuICAgICAgICBpZighY2FyVW5sb2NrZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9ZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gY2FyVW5sb2NrZWQgPT0gXCIxXCJcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzQWxsVW5sb2NrZWQoKVxuICAgIHtcbiAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICBmb3IodmFyIGkgPSAwIDtpIDxSLnNraW5Db25maWcuanNvbi5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdiA9IFIuc2tpbkNvbmZpZy5qc29uW2ldXG4gICAgICAgICAgICBpZihVc2VySW5mby5pc1VubG9jayh2LmlkKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjICsrXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gICBcbiAgICAgICAgcmV0dXJuIGMgPT0gUi5za2luQ29uZmlnLmpzb24ubGVuZ3RoXG4gICAgfVxuXG5cbiAgICBnZXRTa2luQnlJZChpZDogYW55KTogYW55IHtcbiAgICAgICAgbGV0IHJlcyA9IFIuc2tpbkNvbmZpZy5qc29uLmZpbHRlcih2PT57cmV0dXJuIHYuaWQgPT0gaWR9KTtcbiAgICAgICAgcmV0dXJuIHJlc1swXVxuICAgIH1cblxuXG4gICAgdW5sb2NrKHNraW5faWQpXG4gICAge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInVubG9ja2VkX1wiK3NraW5faWQgLCBcIjFcIilcbiAgICB9XG5cbn1cbmV4cG9ydCB2YXIgVXNlckluZm86VXNlckluZm9DbGFzcyA9IERhdGFDZW50ZXIucmVnaXN0ZXIoVXNlckluZm9DbGFzcykiXX0=