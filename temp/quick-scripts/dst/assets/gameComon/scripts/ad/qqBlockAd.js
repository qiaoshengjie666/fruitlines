
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/ad/qqBlockAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '59fb8mIHidNo75VI5Kyxo8X', 'qqBlockAd');
// gameComon/scripts/ad/qqBlockAd.js

"use strict";

var videoId = '';
var BlockAd = cc.Class({
  "extends": cc.Component,
  properties: {},
  ctor: function ctor() {
    this.instance = null;
  },
  statics: {
    create: function create(data) {
      if (!this.instance) {
        this.instance = new BlockAd();
        this.instance.initWithData(data);
        return this.instance;
      }
    }
  },
  initWithData: function initWithData(data) {
    this.targetBannerAdWidth = 200;
  },
  playBlockad: function playBlockad(show, count) {
    var _this = this;

    if (count === void 0) {
      count = 4;
    }

    if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'QQ') {
      //QQ
      if (show) {
        if (this.globalData && this.globalData.blockAd) {
          this.globalData.blockAd.destroy();
        }

        var res = qq.getSystemInfoSync();
        this.width = res.windowWidth;
        this.height = res.windowHeight;
        var Version2 = util.compareVersion(res.SDKVersion, "1.15.0"); //if(Version2 > 0){

        videoId = "672c9551ab8b8b8284a73dde8cf1406a";

        if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.blockId && appGame.gameServerRoom.adConfig.blockId.QQ) {
          videoId = appGame.gameServerRoom.adConfig.blockId.QQ.adUnitId;
        }

        this.globalData = {
          blockAd: qq.createBlockAd({
            adUnitId: videoId,
            size: count,
            orientation: 'landscape',
            style: {
              //left: 16,
              //top: this.height - (this.targetBannerAdWidth / 16) * 9, // ?????????????????????????????????????????????,
              // width: this.targetBannerAdWidth,
              left: 16,
              top: 100
            }
          })
        };
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: '????????????',
          content: '????????????',
          desc: videoId
        }, function () {}); //this.refreshSize();

        this.globalData.blockAd.onError(function (res) {
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '????????????',
            content: videoId,
            desc: listener.errCode + listener.errMsg
          }, function () {});
        });
        this.globalData.blockAd.onLoad(function (res) {
          console.log('globalData blockAd onLoad', res);

          _this.globalData.blockAd.show().then(function () {
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: '????????????',
              content: '????????????',
              desc: videoId
            }, function () {});
          })["catch"](function (res) {
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: '????????????',
              content: '????????????',
              desc: videoId
            }, function () {});
          });
        });
      } else {
        if (this.globalData && this.globalData.blockAd) {
          this.globalData.blockAd.destroy();
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '????????????',
            content: '??????',
            desc: videoId
          }, function () {});
        }
      }
    }
  },
  refreshSize: function refreshSize() {
    var _this2 = this;

    if (this.globalData && this.globalData.bannerAd) {
      if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'QQ') {
        //QQ
        this.globalData.blockAd.onResize(function (size) {
          console.log("???????????? shezhi??????" + _this2.height + "   " + _this2.width);
          _this2.globalData.blockAd.style.top = _this2.height - size.height;
          _this2.globalData.blockAd.style.left = (_this2.width - size.width) / 2;
        });
      }
    }
  }
});
module.exports = BlockAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JpcHRzXFxhZFxccXFCbG9ja0FkLmpzIl0sIm5hbWVzIjpbInZpZGVvSWQiLCJCbG9ja0FkIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJjdG9yIiwiaW5zdGFuY2UiLCJzdGF0aWNzIiwiY3JlYXRlIiwiZGF0YSIsImluaXRXaXRoRGF0YSIsInRhcmdldEJhbm5lckFkV2lkdGgiLCJwbGF5QmxvY2thZCIsInNob3ciLCJjb3VudCIsInN5cyIsInBsYXRmb3JtIiwiV0VDSEFUX0dBTUUiLCJhcHBHYW1lIiwiZ2xvYmFsRGF0YSIsImJsb2NrQWQiLCJkZXN0cm95IiwicmVzIiwicXEiLCJnZXRTeXN0ZW1JbmZvU3luYyIsIndpZHRoIiwid2luZG93V2lkdGgiLCJoZWlnaHQiLCJ3aW5kb3dIZWlnaHQiLCJWZXJzaW9uMiIsInV0aWwiLCJjb21wYXJlVmVyc2lvbiIsIlNES1ZlcnNpb24iLCJnYW1lU2VydmVyUm9vbSIsImFkQ29uZmlnIiwiYmxvY2tJZCIsIlFRIiwiYWRVbml0SWQiLCJjcmVhdGVCbG9ja0FkIiwic2l6ZSIsIm9yaWVudGF0aW9uIiwic3R5bGUiLCJsZWZ0IiwidG9wIiwiaHR0cFV0aWxzIiwiaHR0cFBvc3QiLCJjb25zdHMiLCJIVFRQX1JFQ09SRF9TRVJWRVIiLCJ0aXRsZSIsImNvbnRlbnQiLCJkZXNjIiwib25FcnJvciIsImxpc3RlbmVyIiwiZXJyQ29kZSIsImVyck1zZyIsIm9uTG9hZCIsImNvbnNvbGUiLCJsb2ciLCJ0aGVuIiwicmVmcmVzaFNpemUiLCJiYW5uZXJBZCIsIm9uUmVzaXplIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxPQUFPLEdBQUcsRUFBZDtBQUNBLElBQUlDLE9BQU8sR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDbkIsYUFBU0QsRUFBRSxDQUFDRSxTQURPO0FBR25CQyxF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LE9BQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdmlkZW9JZCA9ICcnO1xyXG52YXIgQmxvY2tBZCA9IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICB9LFxyXG4gICAgY3Rvcigpe1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgfSxcclxuICAgIHN0YXRpY3M6IHtcclxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmluc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgQmxvY2tBZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5pbml0V2l0aERhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpbml0V2l0aERhdGE6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXRCYW5uZXJBZFdpZHRoID0gMjAwOyAgXHJcbiAgICB9LFxyXG4gICAgcGxheUJsb2NrYWQ6ZnVuY3Rpb24oc2hvdyxjb3VudCA9IDQpe1xyXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUgJiZhcHBHYW1lLnBsYXRmb3JtID09ICdRUScpeyAvL1FRXHJcbiAgICAgICAgICBpZihzaG93KXtcclxuICAgICAgICAgICAgaWYodGhpcy5nbG9iYWxEYXRhICYmIHRoaXMuZ2xvYmFsRGF0YS5ibG9ja0FkKXtcclxuICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuYmxvY2tBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgcmVzID0gcXEuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHJlcy53aW5kb3dXaWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSByZXMud2luZG93SGVpZ2h0O1xyXG4gICAgICAgICAgICB2YXIgVmVyc2lvbjIgPSB1dGlsLmNvbXBhcmVWZXJzaW9uKHJlcy5TREtWZXJzaW9uLFwiMS4xNS4wXCIpO1xyXG4gICAgICAgICAgICAvL2lmKFZlcnNpb24yID4gMCl7XHJcbiAgICAgICAgICAgICAgICB2aWRlb0lkID0gXCI2NzJjOTU1MWFiOGI4YjgyODRhNzNkZGU4Y2YxNDA2YVwiO1xyXG4gICAgICAgICAgICAgICAgaWYoYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5hZENvbmZpZyAmJiBhcHBHYW1lLmdhbWVTZXJ2ZXJSb29tLmFkQ29uZmlnLmJsb2NrSWQgJiYgYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5hZENvbmZpZy5ibG9ja0lkLlFRKXtcclxuICAgICAgICAgICAgICAgICAgdmlkZW9JZCA9IGFwcEdhbWUuZ2FtZVNlcnZlclJvb20uYWRDb25maWcuYmxvY2tJZC5RUS5hZFVuaXRJZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBibG9ja0FkOiBxcS5jcmVhdGVCbG9ja0FkKHtcclxuICAgICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiB2aWRlb0lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgc2l6ZTogY291bnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICBvcmllbnRhdGlvbjogJ2xhbmRzY2FwZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xlZnQ6IDE2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RvcDogdGhpcy5oZWlnaHQgLSAodGhpcy50YXJnZXRCYW5uZXJBZFdpZHRoIC8gMTYpICogOSwgLy8g5qC55o2u57O757uf57qm5a6a5bC65a+46K6h566X5Ye65bm/5ZGK6auY5bqmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aWR0aDogdGhpcy50YXJnZXRCYW5uZXJBZFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OjE2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6MTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBodHRwVXRpbHMuaHR0cFBvc3QoY29uc3RzLkhUVFBfUkVDT1JEX1NFUlZFUix7dGl0bGU6J+enr+acqOW5v+WRiicsY29udGVudDon5Yib5bu65oiQ5YqfJyxkZXNjOnZpZGVvSWR9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5yZWZyZXNoU2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmJsb2NrQWQub25FcnJvcihyZXM9PntcclxuICAgICAgICAgICAgICAgICAgaHR0cFV0aWxzLmh0dHBQb3N0KGNvbnN0cy5IVFRQX1JFQ09SRF9TRVJWRVIse3RpdGxlOifnp6/mnKjlub/lkYonLGNvbnRlbnQ6dmlkZW9JZCxkZXNjOmxpc3RlbmVyLmVyckNvZGUrbGlzdGVuZXIuZXJyTXNnfSxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmJsb2NrQWQub25Mb2FkKHJlcz0+e1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ2xvYmFsRGF0YSBibG9ja0FkIG9uTG9hZCcscmVzKVxyXG4gICAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuYmxvY2tBZC5zaG93KCkudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGh0dHBVdGlscy5odHRwUG9zdChjb25zdHMuSFRUUF9SRUNPUkRfU0VSVkVSLHt0aXRsZTon56ev5pyo5bm/5ZGKJyxjb250ZW50OiflsZXnpLrmiJDlip8nLGRlc2M6dmlkZW9JZH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKHJlcyk9PntcclxuICAgICAgICAgICAgICAgICAgICBodHRwVXRpbHMuaHR0cFBvc3QoY29uc3RzLkhUVFBfUkVDT1JEX1NFUlZFUix7dGl0bGU6J+enr+acqOW5v+WRiicsY29udGVudDon5bGV56S65aSx6LSlJyxkZXNjOnZpZGVvSWR9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIGlmKHRoaXMuZ2xvYmFsRGF0YSAmJiB0aGlzLmdsb2JhbERhdGEuYmxvY2tBZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuYmxvY2tBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBodHRwVXRpbHMuaHR0cFBvc3QoY29uc3RzLkhUVFBfUkVDT1JEX1NFUlZFUix7dGl0bGU6J+enr+acqOW5v+WRiicsY29udGVudDon6ZqQ6JePJyxkZXNjOnZpZGVvSWR9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9ICBcclxuICAgICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgcmVmcmVzaFNpemUoKXtcclxuICAgICAgICBpZih0aGlzLmdsb2JhbERhdGEgJiYgdGhpcy5nbG9iYWxEYXRhLmJhbm5lckFkKXtcclxuICAgICAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSAmJmFwcEdhbWUucGxhdGZvcm0gPT0gJ1FRJyl7IC8vUVFcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5ibG9ja0FkLm9uUmVzaXplKChzaXplKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLnp6/mnKjlub/lkYogc2hlemhp5aSn5bCPXCIrdGhpcy5oZWlnaHQrXCIgICBcIit0aGlzLndpZHRoKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5ibG9ja0FkLnN0eWxlLnRvcCA9IHRoaXMuaGVpZ2h0IC0gc2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmJsb2NrQWQuc3R5bGUubGVmdCA9ICh0aGlzLndpZHRoIC0gc2l6ZS53aWR0aCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTtcclxubW9kdWxlLmV4cG9ydHMgPSBCbG9ja0FkO1xyXG4iXX0=