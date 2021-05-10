"use strict";
cc._RF.push(module, 'b88b4v3H5tF7ozLVLmzIPqR', 'Device');
// framework/plugin_boosts/gamesys/Device.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Device = /** @class */ (function () {
    function Device() {
    }
    Device.setSoundsEnable = function (b) {
        Device.setSFXEnable(b);
        Device.setBGMEnable(b);
    };
    Device.setSFXEnable = function (b) {
        cc.audioEngine.setEffectsVolume(b == true ? 1 : 0);
        Device.isSfxEnabled = b;
        if (!b) {
            cc.audioEngine.pauseAllEffects();
        }
        else {
            cc.audioEngine.resumeAllEffects();
        }
    };
    Device.useCCAudioEngine = function () {
        this._useCCAudioEngine = true;
    };
    Device.useDefaultAudioEngine = function () {
        this._useCCAudioEngine = false;
    };
    Device.setBGMEnable = function (b) {
        cc.audioEngine.setMusicVolume(b == true ? 1 : 0);
        Device.isBgmEnabled = b;
        if (!b) {
            cc.audioEngine.pauseMusic();
        }
        else {
            cc.audioEngine.resumeMusic();
        }
    };
    Device.playEffect = function (clip, loop) {
        if (loop === void 0) { loop = false; }
        if (Device.isSfxEnabled) {
            if (cc.sys.platform == cc.sys.QQ_PLAY) {
                if (this._useCCAudioEngine) {
                    return cc.audioEngine.playEffect(clip, loop);
                }
                else {
                }
            }
            else
                return cc.audioEngine.playEffect(clip, loop);
        }
    };
    Device.stopMusic = function () {
        cc.audioEngine.stopMusic();
    };
    Device.playMusic = function (clip, loop) {
        if (loop === void 0) { loop = true; }
        if (Device.isBgmEnabled) {
            return cc.audioEngine.playMusic(clip, loop);
        }
    };
    Device.vibrate = function () {
        if (cc.sys.WECHAT_GAME == cc.sys.platform) {
            wx.vibrateShort();
        }
        else {
            console.log("not support vibrate on except-wx platfrom ");
        }
    };
    Device.isSfxEnabled = true;
    Device.isBgmEnabled = true;
    Device._useCCAudioEngine = false;
    return Device;
}());
exports.default = Device;

cc._RF.pop();