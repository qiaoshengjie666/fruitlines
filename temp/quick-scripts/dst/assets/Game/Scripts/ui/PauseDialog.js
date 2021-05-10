
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/PauseDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '83fb9osUoVEppfk8B6mkJYV', 'PauseDialog');
// Game/Scripts/ui/PauseDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PauseDialog = /** @class */ (function (_super) {
    __extends(PauseDialog, _super);
    function PauseDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PauseDialog.prototype.onLoad = function () { };
    PauseDialog.prototype.start = function () {
        appGame.banner.playBanner(1);
    };
    PauseDialog.prototype.click_share = function () {
    };
    PauseDialog.prototype.click_home = function () {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, { title: '游戏界面', content: '点击返回主界面' }, function () { });
        cc.director.loadScene("Main");
    };
    PauseDialog.prototype.click_restart = function () {
        cc.director.loadScene("Game");
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, { title: '返回界面', content: '重新开始' }, function () { });
        if (appGame.gameServerRoom.gameConfigData && appGame.gameServerRoom.gameConfigData.PauseDialogRestart) {
            appGame.videoBanner.playVideoAd(4, 0, function () {
            });
        }
    };
    PauseDialog = __decorate([
        ccclass
    ], PauseDialog);
    return PauseDialog;
}(cc.Component));
exports.default = PauseDialog;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXFBhdXNlRGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBWTtJQUFyRDs7SUFpQ0EsQ0FBQztJQS9CRyw0QkFBTSxHQUFOLGNBQVcsQ0FBQztJQUNaLDJCQUFLLEdBQUw7UUFFSSxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBR0QsaUNBQVcsR0FBWDtJQUlBLENBQUM7SUFFRCxnQ0FBVSxHQUFWO1FBRUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsRUFBQyxjQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzVGLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2pDLENBQUM7SUFHRCxtQ0FBYSxHQUFiO1FBRUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDN0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsRUFBQyxjQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLElBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLElBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLEVBQUM7WUFDaEcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztZQUVwQyxDQUFDLENBQUMsQ0FBQTtTQUNMO0lBRUwsQ0FBQztJQWhDZ0IsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQWlDL0I7SUFBRCxrQkFBQztDQWpDRCxBQWlDQyxDQWpDd0MsRUFBRSxDQUFDLFNBQVMsR0FpQ3BEO2tCQWpDb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhdXNlRGlhbG9nIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIG9uTG9hZCAoKSB7fVxuICAgIHN0YXJ0ICgpIHtcblxuICAgICAgICBhcHBHYW1lLmJhbm5lci5wbGF5QmFubmVyKDEpO1xuICAgIH1cblxuXG4gICAgY2xpY2tfc2hhcmUoKVxuICAgIHtcbiAgICBcbiAgICAgICAgXG4gICAgfVxuXG4gICAgY2xpY2tfaG9tZSgpXG4gICAge1xuICAgICAgICBodHRwVXRpbHMuaHR0cFBvc3QoY29uc3RzLkhUVFBfUkVDT1JEX1NFUlZFUix7dGl0bGU6J+a4uOaIj+eVjOmdoicsY29udGVudDon54K55Ye76L+U5Zue5Li755WM6Z2iJ30sZnVuY3Rpb24oKXt9KTtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpblwiKVxuICAgIH1cblxuXG4gICAgY2xpY2tfcmVzdGFydCgpXG4gICAge1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lXCIpXG4gICAgICAgIGh0dHBVdGlscy5odHRwUG9zdChjb25zdHMuSFRUUF9SRUNPUkRfU0VSVkVSLHt0aXRsZTon6L+U5Zue55WM6Z2iJyxjb250ZW50Oifph43mlrDlvIDlp4snfSxmdW5jdGlvbigpe30pO1xuICAgICAgICBpZihhcHBHYW1lLmdhbWVTZXJ2ZXJSb29tLmdhbWVDb25maWdEYXRhICYmYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5nYW1lQ29uZmlnRGF0YS5QYXVzZURpYWxvZ1Jlc3RhcnQpe1xuICAgICAgICAgICAgYXBwR2FtZS52aWRlb0Jhbm5lci5wbGF5VmlkZW9BZCg0LDAsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgIFxuICAgIH1cbn0iXX0=