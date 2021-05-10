"use strict";
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