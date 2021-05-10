
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/ad/wxnativeAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9a169f/Cs9NFp08r0mXOa8e', 'wxnativeAd');
// gameComon/scripts/ad/wxnativeAd.js

"use strict";

var WXNativeAd = cc.Class({
  properties: {},
  ctor: function ctor() {
    this.instance = null;
  },
  statics: {
    create: function create(data) {
      if (!this.instance) {
        this.instance = new WXNativeAd();
        this.instance.initWithData(data);
        return this.instance;
      }
    }
  },
  initWithData: function initWithData(data) {
    this.targetBannerAdWidth = 200;

    if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'WX') {
      //微信平台 
      var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
          windowWidth = _wx$getSystemInfoSync.windowWidth,
          windowHeight = _wx$getSystemInfoSync.windowHeight;

      this.width = windowWidth;
      this.height = windowHeight;
      this.adId = 'adunit-48fb335e928d3b4d';

      if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.gridId && appGame.gameServerRoom.adConfig.nativeId.WX) {
        this.adId = appGame.gameServerRoom.adConfig.nativeId.WX.adUnitId;
      }

      this.globalData = {
        nativeAd: wx.createCustomAd({
          adUnitId: this.adId,
          adIntervals: 30,
          style: {
            left: 20,
            top: this.height - this.targetBannerAdWidth / 16 * 9
          }
        })
      };
      httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
        title: '原生广告',
        content: '创建成功',
        desc: this.adId
      }, function () {});
    }

    this.refreshSize();
  },
  playNativeAd: function playNativeAd(isShow) {
    var _this = this;

    if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'WX') {
      if (this.globalData && this.globalData.nativeAd) {
        if (isShow) {
          this.globalData.nativeAd.show();
        } else {
          this.globalData.nativeAd.hide();
        }
      }
    } else {
      if (this.globalData && this.globalData.nativeAd) {
        var nativeAd = this.globalData.nativeAd;
        nativeAd.load().then(function () {
          console.log("原生广告显示成功");
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '原生广告',
            content: '展示成功',
            desc: _this.adId
          }, function () {});
        })["catch"](function (err) {
          console.log("原生广告出现问题", err);
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '原生广告',
            content: '展示失败',
            desc: _this.adId
          }, function () {});
        });
        nativeAd.onLoad(function (res) {
          console.log("\u52A0\u8F7D\u539F\u751F\u5E7F\u544A\u6210\u529F", "\uFF1A" + JSON.stringify(res)); //res.adList && res.adList.length > 0 && (appGame.nativeAdData = res.adList[0])
        });
      }
    }
  },
  refreshSize: function refreshSize() {
    var _this2 = this;

    // 尺寸调整时会触发回调，通过回调拿到的广告真实宽高再进行定位适配处理
    // 注意：如果在回调里再次调整尺寸，要确保不要触发死循环！！！
    if (this.globalData && this.globalData.nativeAd) {
      this.globalData.nativeAd.onError(function (listener) {
        console.log("原生广告出错");
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: '原生广告',
          content: _this2.adId,
          desc: listener.errCode + listener.errMsg
        }, function () {});
      });
    }
  }
});
module.exports = WXNativeAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JpcHRzXFxhZFxcd3huYXRpdmVBZC5qcyJdLCJuYW1lcyI6WyJXWE5hdGl2ZUFkIiwiY2MiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJjdG9yIiwiaW5zdGFuY2UiLCJzdGF0aWNzIiwiY3JlYXRlIiwiZGF0YSIsImluaXRXaXRoRGF0YSIsInRhcmdldEJhbm5lckFkV2lkdGgiLCJzeXMiLCJwbGF0Zm9ybSIsIldFQ0hBVF9HQU1FIiwiYXBwR2FtZSIsInd4IiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJ3aW5kb3dXaWR0aCIsIndpbmRvd0hlaWdodCIsIndpZHRoIiwiaGVpZ2h0IiwiYWRJZCIsImdhbWVTZXJ2ZXJSb29tIiwiYWRDb25maWciLCJncmlkSWQiLCJuYXRpdmVJZCIsIldYIiwiYWRVbml0SWQiLCJnbG9iYWxEYXRhIiwibmF0aXZlQWQiLCJjcmVhdGVDdXN0b21BZCIsImFkSW50ZXJ2YWxzIiwic3R5bGUiLCJsZWZ0IiwidG9wIiwiaHR0cFV0aWxzIiwiaHR0cFBvc3QiLCJjb25zdHMiLCJIVFRQX1JFQ09SRF9TRVJWRVIiLCJ0aXRsZSIsImNvbnRlbnQiLCJkZXNjIiwicmVmcmVzaFNpemUiLCJwbGF5TmF0aXZlQWQiLCJpc1Nob3ciLCJzaG93IiwiaGlkZSIsImxvYWQiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImVyciIsIm9uTG9hZCIsInJlcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJvbkVycm9yIiwibGlzdGVuZXIiLCJlcnJDb2RlIiwiZXJyTXNnIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxVQUFVLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3RCQyxFQUFBQSxVQUFVLEVBQUUsRUFEVTtBQUd0QkMsRUFBQUEsSUFIc0Isa0JBR2Y7QUFDSCxTQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0gsR0FMcUI7QUFNdEJDLEVBQUFBLE9B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QyxHQUFSLENBQVksUUFBWjtBQUNBZixRQUFBQSxTQUFTLENBQUNDLFFBQVYsQ0FBbUJDLE1BQU0sQ0FBQ0Msa0JBQTFCLEVBQTZDO0FBQUNDLFVBQUFBLEtBQUssRUFBQyxNQUFQO0FBQWNDLFVBQUFBLE9BQU8sRUFBQyxNQUFJLENBQUNuQixJQUEzQjtBQUFnQ29CLFVBQUFBLElBQUksRUFBQ2dCLFFBQVEsQ0FBQ0MsT0FBVCxHQUFpQkQsUUFBUSxDQUFDRTtBQUEvRCxTQUE3QyxFQUFvSCxZQUFVLENBQzdILENBREQ7QUFFSCxPQUpEO0FBS0g7QUFDSjtBQWpGcUIsQ0FBVCxDQUFqQjtBQW1GQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCN0QsVUFBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBXWE5hdGl2ZUFkID0gY2MuQ2xhc3Moe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgfSxcclxuICAgIGN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG51bGw7XHJcbiAgICB9LFxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IFdYTmF0aXZlQWQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UuaW5pdFdpdGhEYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW5pdFdpdGhEYXRhOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0QmFubmVyQWRXaWR0aCA9IDIwMDtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSAmJiBhcHBHYW1lLnBsYXRmb3JtID09ICdXWCcpIHsgLy/lvq7kv6HlubPlj7AgXHJcbiAgICAgICAgICAgIGNvbnN0IHsgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCB9ID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpbmRvd1dpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHdpbmRvd0hlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5hZElkID0gJ2FkdW5pdC00OGZiMzM1ZTkyOGQzYjRkJ1xyXG4gICAgICAgICAgICBpZihhcHBHYW1lLmdhbWVTZXJ2ZXJSb29tLmFkQ29uZmlnICYmIGFwcEdhbWUuZ2FtZVNlcnZlclJvb20uYWRDb25maWcuZ3JpZElkICYmIGFwcEdhbWUuZ2FtZVNlcnZlclJvb20uYWRDb25maWcubmF0aXZlSWQuV1gpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZElkID0gYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5hZENvbmZpZy5uYXRpdmVJZC5XWC5hZFVuaXRJZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBuYXRpdmVBZDogd3guY3JlYXRlQ3VzdG9tQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiB0aGlzLmFkSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgYWRJbnRlcnZhbHM6MzAsXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDoyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLmhlaWdodCAtICh0aGlzLnRhcmdldEJhbm5lckFkV2lkdGggLyAxNikgKiA5LFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGh0dHBVdGlscy5odHRwUG9zdChjb25zdHMuSFRUUF9SRUNPUkRfU0VSVkVSLHt0aXRsZTon5Y6f55Sf5bm/5ZGKJyxjb250ZW50OifliJvlu7rmiJDlip8nLGRlc2M6dGhpcy5hZElkfSxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoU2l6ZSgpO1xyXG4gICAgfSxcclxuICAgIHBsYXlOYXRpdmVBZDogZnVuY3Rpb24gKGlzU2hvdykge1xyXG4gICAgICAgIGlmICgoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSAmJiBhcHBHYW1lLnBsYXRmb3JtID09ICdXWCcpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbERhdGEgJiYgdGhpcy5nbG9iYWxEYXRhLm5hdGl2ZUFkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTaG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLm5hdGl2ZUFkLnNob3coKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLm5hdGl2ZUFkLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbERhdGEgJiYgdGhpcy5nbG9iYWxEYXRhLm5hdGl2ZUFkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmF0aXZlQWQgPSB0aGlzLmdsb2JhbERhdGEubmF0aXZlQWQ7XHJcbiAgICAgICAgICAgICAgICBuYXRpdmVBZFxyXG4gICAgICAgICAgICAgICAgICAgIC5sb2FkKClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y6f55Sf5bm/5ZGK5pi+56S65oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBodHRwVXRpbHMuaHR0cFBvc3QoY29uc3RzLkhUVFBfUkVDT1JEX1NFUlZFUix7dGl0bGU6J+WOn+eUn+W5v+WRiicsY29udGVudDon5bGV56S65oiQ5YqfJyxkZXNjOnRoaXMuYWRJZH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWOn+eUn+W5v+WRiuWHuueOsOmXrumimFwiLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBodHRwVXRpbHMuaHR0cFBvc3QoY29uc3RzLkhUVFBfUkVDT1JEX1NFUlZFUix7dGl0bGU6J+WOn+eUn+W5v+WRiicsY29udGVudDon5bGV56S65aSx6LSlJyxkZXNjOnRoaXMuYWRJZH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBuYXRpdmVBZC5vbkxvYWQocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhg5Yqg6L295Y6f55Sf5bm/5ZGK5oiQ5YqfYCwgYO+8miR7SlNPTi5zdHJpbmdpZnkocmVzKX1gKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vcmVzLmFkTGlzdCAmJiByZXMuYWRMaXN0Lmxlbmd0aCA+IDAgJiYgKGFwcEdhbWUubmF0aXZlQWREYXRhID0gcmVzLmFkTGlzdFswXSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVmcmVzaFNpemUoKXtcclxuICAgICAgICAvLyDlsLrlr7josIPmlbTml7bkvJrop6blj5Hlm57osIPvvIzpgJrov4flm57osIPmi7/liLDnmoTlub/lkYrnnJ/lrp7lrr3pq5jlho3ov5vooYzlrprkvY3pgILphY3lpITnkIZcclxuICAgICAgICAvLyDms6jmhI/vvJrlpoLmnpzlnKjlm57osIPph4zlho3mrKHosIPmlbTlsLrlr7jvvIzopoHnoa7kv53kuI3opoHop6blj5Hmrbvlvqrnjq/vvIHvvIHvvIFcclxuICAgICAgICBpZih0aGlzLmdsb2JhbERhdGEgJiYgdGhpcy5nbG9iYWxEYXRhLm5hdGl2ZUFkKXtcclxuICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLm5hdGl2ZUFkLm9uRXJyb3IoKGxpc3RlbmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWOn+eUn+W5v+WRiuWHuumUmVwiKVxyXG4gICAgICAgICAgICAgICAgaHR0cFV0aWxzLmh0dHBQb3N0KGNvbnN0cy5IVFRQX1JFQ09SRF9TRVJWRVIse3RpdGxlOifljp/nlJ/lub/lkYonLGNvbnRlbnQ6dGhpcy5hZElkLGRlc2M6bGlzdGVuZXIuZXJyQ29kZStsaXN0ZW5lci5lcnJNc2d9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufSk7XHJcbm1vZHVsZS5leHBvcnRzID0gV1hOYXRpdmVBZDtcclxuIl19