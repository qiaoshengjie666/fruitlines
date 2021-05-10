
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/ad/nativeAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '798f3uehO1CeqnH/lESNu8/', 'nativeAd');
// gameComon/scripts/ad/nativeAd.js

"use strict";

var NativeAd = cc.Class({
  properties: {},
  ctor: function ctor() {
    this.instance = null;
  },
  statics: {
    create: function create(data) {
      if (!this.instance) {
        this.instance = new NativeAd();
        this.instance.initWithData(data);
        return this.instance;
      }
    }
  },
  initWithData: function initWithData(data) {
    if (cc.sys.platform == cc.sys.OPPO_GAME) {
      //oppo
      this.globalData = {
        nativeAd: qg.createNativeAd({
          adUnitId: '226783'
        })
      };
    }

    if (this.globalData && this.globalData.nativeAd) {
      // 设置原生广告加载成功回调
      this.globalData.nativeAd.onLoad(function (res) {
        cc.log("\u52A0\u8F7D\u539F\u751F\u5E7F\u544A\u6210\u529F", "\uFF1A" + JSON.stringify(res));
        res.adList && res.adList.length > 0 && (appGame.nativeAdData = res.adList[0]);
        appGame.gameServerRoom.emit(consts.LOCAL_GAME_RESULT_NATIVE_AD, {});
      }); // 设置原生广告出错回调

      this.globalData.nativeAd.onError(function (err) {
        cc.log("\u8BBE\u7F6E\u539F\u751F\u5E7F\u544A\u51FA\u9519\uFF1A" + JSON.stringify(err));
      });
    }
  },
  playAd: function playAd() {
    console.log("播放原生广告==");

    if (this.globalData && this.globalData.nativeAd) {
      var nativeAd = this.globalData.nativeAd;
      nativeAd.load().then(function () {
        console.log("原生广告显示成功");
        return nativeAd.show();
      })["catch"](function (err) {
        console.log("原生广告出现问题", err);
      });
    }
  }
});
module.exports = NativeAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JpcHRzXFxhZFxcbmF0aXZlQWQuanMiXSwibmFtZXMiOlsiTmF0aXZlQWQiLCJjYyIsIkNsYXNzIiwicHJvcGVydGllcyIsImN0b3IiLCJpbnN0YW5jZSIsInN0YXRpY3MiLCJjcmVhdGUiLCJkYXRhIiwiaW5pdFdpdGhEYXRhIiwic3lzIiwicGxhdGZvcm0iLCJPUFBPX0dBTUUiLCJnbG9iYWxEYXRhIiwibmF0aXZlQWQiLCJxZyIsImNyZWF0ZU5hdGl2ZUFkIiwiYWRVbml0SWQiLCJvbkxvYWQiLCJyZXMiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5IiwiYWRMaXN0IiwibGVuZ3RoIiwiYXBwR2FtZSIsIm5hdGl2ZUFkRGF0YSIsImdhbWVTZXJ2ZXJSb29tIiwiZW1pdCIsImNvbnN0cyIsIkxPQ0FMX0dBTUVfUkVTVUxUX05BVElWRV9BRCIsIm9uRXJyb3IiLCJlcnIiLCJwbGF5QWQiLCJjb25zb2xlIiwibG9hZCIsInRoZW4iLCJzaG93IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxRQUFRLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3BCQyxFQUFBQSxVQUFVLEVBQUUsRUFEUTtBQUdwQkMsRUFBQUEsSUFIb0Isa0JBR2Q7QUFDRixTQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0gsR0FMbUI7QUFNcEJDLEVBQUFBLE9BQU8sRUFBRTtBQUNMQyxJQUFBQSxNQUFNLEVBQUUsZ0JBQVVDLElBQVYsRUFBZ0I7QUFDcEIsVUFBRyxDQUFDLEtBQUtILFFBQVQsRUFBa0I7QUFDZCxhQUFLQSxRQUFMLEdBQWdCLElBQUlMLFFBQUosRUFBaEI7QUFDQSxhQUFLSyxRQUFMLENBQWNJLFlBQWQsQ0FBMkJELElBQTNCO0FBQ0EsZUFBTyxLQUFLSCxRQUFaO0FBQ0g7QUFDSjtBQVBJLEdBTlc7QUFlcEJJLEVBQUFBLFlBQVksRUFBRSxzQkFBVUQsSUFBVixFQUFnQjtBQUMxQixRQUFHUCxFQUFFLENBQUNTLEdBQUgsQ0FBT0MsUUFBUCxJQUFtQlYsRUFBRSxDQUFDUyxHQUFILENBQU9FLFNBQTdCLEVBQXVDO0FBQUM7QUFDcEMsV0FBS0MsVUFBTCxHQUFrQjtBQUNkQyxRQUFBQSxRQUFRLEVBQUVDLEVBQUUsQ0FBQ0MsY0FBSCxDQUFrQjtBQUN4QkMsVUFBQUEsUUFBUSxFQUFFO0FBRGMsU0FBbEI7QUFESSxPQUFsQjtBQUtIOztBQUNELFFBQUcsS0FBS0osVUFBTCxJQUFtQixLQUFLQSxVQUFMLENBQWdCQyxRQUF0QyxFQUErQztBQUMzQztBQUNBLFdBQUtELFVBQUwsQ0FBZ0JDLFFBQWhCLENBQXlCSSxNQUF6QixDQUFnQyxVQUFBQyxHQUFHLEVBQUk7QUFDbkNsQixRQUFBQSxFQUFFLENBQUNtQixHQUFILGdFQUF1QkMsSUFBSSxDQUFDQyxTQUFMLENBQWVILEdBQWYsQ0FBdkI7QUFDQUEsUUFBQUEsR0FBRyxDQUFDSSxNQUFKLElBQWNKLEdBQUcsQ0FBQ0ksTUFBSixDQUFXQyxNQUFYLEdBQW9CLENBQWxDLEtBQXdDQyxPQUFPLENBQUNDLFlBQVIsR0FBdUJQLEdBQUcsQ0FBQ0ksTUFBSixDQUFXLENBQVgsQ0FBL0Q7QUFDQUUsUUFBQUEsT0FBTyxDQUFDRSxjQUFSLENBQXVCQyxJQUF2QixDQUE0QkMsTUFBTSxDQUFDQywyQkFBbkMsRUFBK0QsRUFBL0Q7QUFDSCxPQUpELEVBRjJDLENBTzNDOztBQUNBLFdBQUtqQixVQUFMLENBQWdCQyxRQUFoQixDQUF5QmlCLE9BQXpCLENBQWlDLFVBQUFDLEdBQUcsRUFBSTtBQUNwQy9CLFFBQUFBLEVBQUUsQ0FBQ21CLEdBQUgsNERBQW1CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZVUsR0FBZixDQUFuQjtBQUNILE9BRkQ7QUFHSDtBQUVKLEdBcENtQjtBQXFDcEJDLEVBQUFBLE1BQU0sRUFBRSxrQkFBVztBQUNmQyxJQUFBQSxPQUFPLENBQUNkLEdBQVIsQ0FBWSxVQUFaOztBQUNBLFFBQUcsS0FBS1AsVUFBTCxJQUFtQixLQUFLQSxVQUFMLENBQWdCQyxRQUF0QyxFQUErQztBQUMzQyxVQUFJQSxRQUFRLEdBQUcsS0FBS0QsVUFBTCxDQUFnQkMsUUFBL0I7QUFDQUEsTUFBQUEsUUFBUSxDQUNQcUIsSUFERCxHQUVDQyxJQUZELENBRU0sWUFBTTtBQUNSRixRQUFBQSxPQUFPLENBQUNkLEdBQVIsQ0FBWSxVQUFaO0FBQ0EsZUFBT04sUUFBUSxDQUFDdUIsSUFBVCxFQUFQO0FBQ0gsT0FMRCxXQU1PLFVBQUNMLEdBQUQsRUFBUztBQUNaRSxRQUFBQSxPQUFPLENBQUNkLEdBQVIsQ0FBWSxVQUFaLEVBQXdCWSxHQUF4QjtBQUNILE9BUkQ7QUFTSDtBQUNKO0FBbkRtQixDQUFULENBQWY7QUFxREFNLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnZDLFFBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgTmF0aXZlQWQgPSBjYy5DbGFzcyh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICB9LFxyXG4gICAgY3Rvcigpe1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgfSxcclxuICAgIHN0YXRpY3M6IHtcclxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmluc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgTmF0aXZlQWQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UuaW5pdFdpdGhEYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW5pdFdpdGhEYXRhOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuT1BQT19HQU1FKXsvL29wcG9cclxuICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgbmF0aXZlQWQ6IHFnLmNyZWF0ZU5hdGl2ZUFkKHtcclxuICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogJzIyNjc4MycsXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmdsb2JhbERhdGEgJiYgdGhpcy5nbG9iYWxEYXRhLm5hdGl2ZUFkKXtcclxuICAgICAgICAgICAgLy8g6K6+572u5Y6f55Sf5bm/5ZGK5Yqg6L295oiQ5Yqf5Zue6LCDXHJcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5uYXRpdmVBZC5vbkxvYWQocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhg5Yqg6L295Y6f55Sf5bm/5ZGK5oiQ5YqfYCwgYO+8miR7SlNPTi5zdHJpbmdpZnkocmVzKX1gKVxyXG4gICAgICAgICAgICAgICAgcmVzLmFkTGlzdCAmJiByZXMuYWRMaXN0Lmxlbmd0aCA+IDAgJiYgKGFwcEdhbWUubmF0aXZlQWREYXRhID0gcmVzLmFkTGlzdFswXSlcclxuICAgICAgICAgICAgICAgIGFwcEdhbWUuZ2FtZVNlcnZlclJvb20uZW1pdChjb25zdHMuTE9DQUxfR0FNRV9SRVNVTFRfTkFUSVZFX0FELHt9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8g6K6+572u5Y6f55Sf5bm/5ZGK5Ye66ZSZ5Zue6LCDXHJcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5uYXRpdmVBZC5vbkVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coYOiuvue9ruWOn+eUn+W5v+WRiuWHuumUme+8miR7SlNPTi5zdHJpbmdpZnkoZXJyKX1gKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICBwbGF5QWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5pKt5pS+5Y6f55Sf5bm/5ZGKPT1cIilcclxuICAgICAgICBpZih0aGlzLmdsb2JhbERhdGEgJiYgdGhpcy5nbG9iYWxEYXRhLm5hdGl2ZUFkKXtcclxuICAgICAgICAgICAgbGV0IG5hdGl2ZUFkID0gdGhpcy5nbG9iYWxEYXRhLm5hdGl2ZUFkO1xyXG4gICAgICAgICAgICBuYXRpdmVBZFxyXG4gICAgICAgICAgICAubG9hZCgpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y6f55Sf5bm/5ZGK5pi+56S65oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZUFkLnNob3coKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y6f55Sf5bm/5ZGK5Ye6546w6Zeu6aKYXCIsIGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbm1vZHVsZS5leHBvcnRzID0gTmF0aXZlQWQ7XHJcbiJdfQ==