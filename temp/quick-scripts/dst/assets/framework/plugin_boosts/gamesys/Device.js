
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/gamesys/Device.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxnYW1lc3lzXFxEZXZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0lBQUE7SUEwRkEsQ0FBQztJQW5GVSxzQkFBZSxHQUF0QixVQUF1QixDQUFTO1FBRTVCLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdEIsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU0sbUJBQVksR0FBbkIsVUFBb0IsQ0FBQztRQUVqQixFQUFFLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxJQUFJLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBRyxDQUFDLENBQUMsRUFDTDtZQUNJLEVBQUUsQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLENBQUE7U0FDbkM7YUFBSTtZQUNELEVBQUUsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFJTSx1QkFBZ0IsR0FBdkI7UUFFSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFFTSw0QkFBcUIsR0FBNUI7UUFFSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7SUFFTSxtQkFBWSxHQUFuQixVQUFvQixDQUFDO1FBRWpCLEVBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBRyxDQUFDLENBQUMsRUFDTDtZQUNJLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUE7U0FDOUI7YUFBSTtZQUNELEVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUE7U0FDL0I7SUFDTCxDQUFDO0lBR00saUJBQVUsR0FBakIsVUFBa0IsSUFBSSxFQUFDLElBQVk7UUFBWixxQkFBQSxFQUFBLFlBQVk7UUFFL0IsSUFBRyxNQUFNLENBQUMsWUFBWSxFQUN0QjtZQUNJLElBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQ3BDO2dCQUNJLElBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUN6QjtvQkFDSSxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQTtpQkFDOUM7cUJBQUk7aUJBR0o7YUFDSjs7Z0JBQ0csT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUE7U0FDbEQ7SUFDTCxDQUFDO0lBRU0sZ0JBQVMsR0FBaEI7UUFFSSxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFTSxnQkFBUyxHQUFoQixVQUFpQixJQUFJLEVBQUMsSUFBVztRQUFYLHFCQUFBLEVBQUEsV0FBVztRQUU3QixJQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQ3RCO1lBQ0ksT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUM7SUFDTCxDQUFDO0lBRU0sY0FBTyxHQUFkO1FBRUksSUFBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFDeEM7WUFDSSxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUE7U0FDcEI7YUFBSTtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsNENBQTRDLENBQUMsQ0FBQTtTQUM1RDtJQUNMLENBQUM7SUF0Rk0sbUJBQVksR0FBRyxJQUFJLENBQUM7SUFFcEIsbUJBQVksR0FBRyxJQUFJLENBQUM7SUFvQnBCLHdCQUFpQixHQUFHLEtBQUssQ0FBQztJQWlFckMsYUFBQztDQTFGRCxBQTBGQyxJQUFBO2tCQTFGb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXZpY2UgXG57XG5cbiAgICBzdGF0aWMgaXNTZnhFbmFibGVkID0gdHJ1ZTtcblxuICAgIHN0YXRpYyBpc0JnbUVuYWJsZWQgPSB0cnVlO1xuXG4gICAgc3RhdGljIHNldFNvdW5kc0VuYWJsZShiOmJvb2xlYW4pXG4gICAge1xuICAgICAgICBEZXZpY2Uuc2V0U0ZYRW5hYmxlKGIpXG4gICAgICAgIERldmljZS5zZXRCR01FbmFibGUoYik7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldFNGWEVuYWJsZShiKVxuICAgIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0RWZmZWN0c1ZvbHVtZShiID09IHRydWU/MTowKTtcbiAgICAgICAgRGV2aWNlLmlzU2Z4RW5hYmxlZCA9IGI7XG4gICAgICAgIGlmKCFiKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZUFsbEVmZmVjdHMoKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZUFsbEVmZmVjdHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBfdXNlQ0NBdWRpb0VuZ2luZSA9IGZhbHNlO1xuXG4gICAgc3RhdGljIHVzZUNDQXVkaW9FbmdpbmUoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fdXNlQ0NBdWRpb0VuZ2luZSA9IHRydWU7XG4gICAgfVxuXG4gICAgc3RhdGljIHVzZURlZmF1bHRBdWRpb0VuZ2luZSgpXG4gICAge1xuICAgICAgICB0aGlzLl91c2VDQ0F1ZGlvRW5naW5lID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldEJHTUVuYWJsZShiKVxuICAgIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0TXVzaWNWb2x1bWUoYiA9PSB0cnVlPzE6MCk7XG4gICAgICAgIERldmljZS5pc0JnbUVuYWJsZWQgPSBiO1xuICAgICAgICBpZighYilcbiAgICAgICAge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VNdXNpYygpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lTXVzaWMoKVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgcGxheUVmZmVjdChjbGlwLGxvb3AgPSBmYWxzZSlcbiAgICB7XG4gICAgICAgIGlmKERldmljZS5pc1NmeEVuYWJsZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuUVFfUExBWSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLl91c2VDQ0F1ZGlvRW5naW5lKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoY2xpcCxsb29wKVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoY2xpcCxsb29wKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHN0b3BNdXNpYygpXG4gICAge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wTXVzaWMoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGxheU11c2ljKGNsaXAsbG9vcCA9IHRydWUpXG4gICAge1xuICAgICAgICBpZihEZXZpY2UuaXNCZ21FbmFibGVkKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gY2MuYXVkaW9FbmdpbmUucGxheU11c2ljKGNsaXAsbG9vcCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgdmlicmF0ZSgpXG4gICAge1xuICAgICAgICBpZihjYy5zeXMuV0VDSEFUX0dBTUUgPT0gY2Muc3lzLnBsYXRmb3JtKVxuICAgICAgICB7XG4gICAgICAgICAgICB3eC52aWJyYXRlU2hvcnQoKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IHN1cHBvcnQgdmlicmF0ZSBvbiBleGNlcHQtd3ggcGxhdGZyb20gXCIpXG4gICAgICAgIH1cbiAgICB9XG59Il19