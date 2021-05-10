"use strict";
cc._RF.push(module, '2f847KAJNJCwrvg4K3CKFUv', 'LocalTimeSystem');
// framework/plugin_boosts/gamesys/LocalTimeSystem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var LocalTimeSystem = /** @class */ (function () {
    function LocalTimeSystem() {
    }
    LocalTimeSystem.init = function (utc_msec) {
        if (utc_msec == null || utc_msec == undefined)
            return;
        LocalTimeSystem.utc_sec = utc_msec;
        if (cc.sys.WECHAT_GAME == cc.sys.platform) {
            wx.onHide(this.onHidden);
            wx.onShow(this.onShown);
        }
        //g.setGlobalInstance(LocalTimeSystem);
    };
    LocalTimeSystem.startTimer = function () {
        this.timer = setInterval(function (_) {
            LocalTimeSystem.utc_sec += 1000;
        }, 1000);
    };
    LocalTimeSystem.stopTimer = function () {
        clearInterval(this.timer);
    };
    LocalTimeSystem.getSec = function () {
        return LocalTimeSystem.utc_sec || new Date().getTime() / 1000;
    };
    LocalTimeSystem.getDate = function () {
        if (LocalTimeSystem.utc_sec) {
            var date = new Date();
            date.setTime(LocalTimeSystem.utc_sec * 1000);
            return date;
        }
        return new Date();
    };
    LocalTimeSystem.onHidden = function () {
        console.log("game enter background");
        // this.stopTimer();
    };
    LocalTimeSystem.onShown = function () {
        console.log("game enter foreground");
        // this.startTimer();
    };
    return LocalTimeSystem;
}());
exports.default = LocalTimeSystem;

cc._RF.pop();