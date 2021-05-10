
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/ad/wxgridAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '27d3buB6l5GlarYvR/+7For', 'wxgridAd');
// gameComon/scripts/ad/wxgridAd.js

"use strict";

var GridAd = cc.Class({
  properties: {},
  ctor: function ctor() {
    this.instance = null;
  },
  statics: {
    create: function create(data) {
      if (!this.instance) {
        this.instance = new GridAd();
        this.instance.initWithData(data);
        return this.instance;
      }
    }
  },
  initWithData: function initWithData(data) {
    this.targetBannerAdWidth = 200;

    if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'WX') {
      var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
          windowWidth = _wx$getSystemInfoSync.windowWidth,
          windowHeight = _wx$getSystemInfoSync.windowHeight;

      this.width = windowWidth;
      this.height = windowHeight;
      this.adId = 'adunit-144bcfc4f8f3cefe';

      if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.gridId && appGame.gameServerRoom.adConfig.gridId.WX) {
        this.adId = appGame.gameServerRoom.adConfig.gridId.WX.adUnitId;
      }

      console.log("grid 第一次创建");
      this.globalData = {
        gridAd: wx.createGridAd({
          adUnitId: this.adId,
          adIntervals: 30,
          adTheme: 'white',
          gridCount: 5,
          style: {
            // left: 0,
            // top: 0,
            // width: 330,
            width: this.targetBannerAdWidth,
            top: 0,
            // 根据系统约定尺寸计算出广告高度
            left: (this.width - this.targetBannerAdWidth) / 2,
            opacity: 0.8
          }
        })
      };
      httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
        title: '格子广告',
        content: '创建成功',
        desc: this.adId
      }, function () {});
      this.refreshSize();
    }
  },
  playGridAd: function playGridAd(isShow) {
    var _this = this;

    if (this.globalData && this.globalData.gridAd) {
      if (isShow) {
        console.log("播放盒子广告");
        this.globalData.gridAd.show().then(function () {
          console.log("盒子广告展示成功");
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '格子广告',
            content: '展示成功',
            desc: _this.adId
          }, function () {});
        });
      } else {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: '格子广告',
          content: '隐藏',
          desc: this.adId
        }, function () {});
        this.globalData.gridAd.hide();
      }
    }
  },
  refreshSize: function refreshSize() {
    var _this2 = this;

    // 尺寸调整时会触发回调，通过回调拿到的广告真实宽高再进行定位适配处理
    // 注意：如果在回调里再次调整尺寸，要确保不要触发死循环！！！
    if (this.globalData && this.globalData.gridAd) {
      if (cc.sys.platform == cc.sys.WECHAT_GAME) {
        //头条平台
        this.globalData.gridAd.onResize(function (size) {
          console.log("grid shezhi大小" + _this2.height + "   " + _this2.width);
          _this2.globalData.gridAd.style.top = 0;
          _this2.globalData.gridAd.style.left = (_this2.width - size.width) / 2;
        });
      }

      this.globalData.gridAd.onError(function (listener) {
        console.log("盒子广告出错");
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: '格子广告',
          content: _this2.adId,
          desc: listener.errCode + listener.errMsg
        }, function () {});
      });
    }
  }
});
module.exports = GridAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JpcHRzXFxhZFxcd3hncmlkQWQuanMiXSwibmFtZXMiOlsiR3JpZEFkIiwiY2MiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJjdG9yIiwiaW5zdGFuY2UiLCJzdGF0aWNzIiwiY3JlYXRlIiwiZGF0YSIsImluaXRXaXRoRGF0YSIsInRhcmdldEJhbm5lckFkV2lkdGgiLCJzeXMiLCJwbGF0Zm9ybSIsIldFQ0hBVF9HQU1FIiwiYXBwR2FtZSIsInd4IiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJ3aW5kb3dXaWR0aCIsIndpbmRvd0hlaWdodCIsIndpZHRoIiwiaGVpZ2h0IiwiYWRJZCIsImdhbWVTZXJ2ZXJSb29tIiwiYWRDb25maWciLCJncmlkSWQiLCJXWCIsImFkVW5pdElkIiwiY29uc29sZSIsImxvZyIsImdsb2JhbERhdGEiLCJncmlkQWQiLCJjcmVhdGVHcmlkQWQiLCJhZEludGVydmFscyIsImFkVGhlbWUiLCJncmlkQ291bnQiLCJzdHlsZSIsInRvcCIsImxlZnQiLCJvcGFjaXR5IiwiaHR0cFV0aWxzIiwiaHR0cFBvc3QiLCJjb25zdHMiLCJIVFRQX1JFQ09SRF9TRVJWRVIiLCJ0aXRsZSIsImNvbnRlbnQiLCJkZXNjIiwicmVmcmVzaFNpemUiLCJwbGF5R3JpZEFkIiwiaXNTaG93Iiwic2hvdyIsInRoZW4iLCJoaWRlIiwib25SZXNpemUiLCJzaXplIiwib25FcnJvciIsImxpc3RlbmVyIiwiZXJyQ29kZSIsImVyck1zZyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTSxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNsQkMsRUFBQUEsVUFBVSxFQUFFLEVBRE07QUFHbEJDLEVBQUFBLElBSGtCLGtCQUdYO0FBQ0gsU0FBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNILEdBTGlCO0FBTWxCQyxFQUFBQSxPQUFPLEVBQUU7QUFDTEMsSUFBQUEs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QUksQ0FBQ2xCLEtBQUwsR0FBYWtDLElBQUksQ0FBQ2xDLEtBQW5CLElBQTRCLENBQWhFO0FBQ0gsU0FKRDtBQUtIOztBQUNELFdBQUtVLFVBQUwsQ0FBZ0JDLE1BQWhCLENBQXVCd0IsT0FBdkIsQ0FBK0IsVUFBQ0MsUUFBRCxFQUFjO0FBQ3pDNUIsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksUUFBWjtBQUNBVyxRQUFBQSxTQUFTLENBQUNDLFFBQVYsQ0FBbUJDLE1BQU0sQ0FBQ0Msa0JBQTFCLEVBQTZDO0FBQUNDLFVBQUFBLEtBQUssRUFBQyxNQUFQO0FBQWNDLFVBQUFBLE9BQU8sRUFBQyxNQUFJLENBQUN2QixJQUEzQjtBQUFnQ3dCLFVBQUFBLElBQUksRUFBQ1UsUUFBUSxDQUFDQyxPQUFULEdBQWlCRCxRQUFRLENBQUNFO0FBQS9ELFNBQTdDLEVBQW9ILFlBQVUsQ0FDN0gsQ0FERDtBQUVILE9BSkQ7QUFLSDtBQUNKO0FBakZpQixDQUFULENBQWI7QUFvRkFDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjNELE1BQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR3JpZEFkID0gY2MuQ2xhc3Moe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgfSxcclxuICAgIGN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG51bGw7XHJcbiAgICB9LFxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IEdyaWRBZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5pbml0V2l0aERhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpbml0V2l0aERhdGE6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXRCYW5uZXJBZFdpZHRoID0gMjAwO1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FICYmIGFwcEdhbWUucGxhdGZvcm0gPT0gJ1dYJykge1xyXG4gICAgICAgICAgICBjb25zdCB7IHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQgfSA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB3aW5kb3dXaWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB3aW5kb3dIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuYWRJZCA9ICdhZHVuaXQtMTQ0YmNmYzRmOGYzY2VmZSc7XHJcbiAgICAgICAgICAgIGlmKGFwcEdhbWUuZ2FtZVNlcnZlclJvb20uYWRDb25maWcgJiYgYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5hZENvbmZpZy5ncmlkSWQgJiYgYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5hZENvbmZpZy5ncmlkSWQuV1gpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZElkID0gYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5hZENvbmZpZy5ncmlkSWQuV1guYWRVbml0SWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJncmlkIOesrOS4gOasoeWIm+W7ulwiKVxyXG4gICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBncmlkQWQ6IHd4LmNyZWF0ZUdyaWRBZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6IHRoaXMuYWRJZCxcclxuICAgICAgICAgICAgICAgICAgICBhZEludGVydmFsczozMCxcclxuICAgICAgICAgICAgICAgICAgICBhZFRoZW1lOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRDb3VudDogNSxcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpZHRoOiAzMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnRhcmdldEJhbm5lckFkV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogMCwgLy8g5qC55o2u57O757uf57qm5a6a5bC65a+46K6h566X5Ye65bm/5ZGK6auY5bqmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICh0aGlzLndpZHRoIC0gdGhpcy50YXJnZXRCYW5uZXJBZFdpZHRoKSAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuOFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGh0dHBVdGlscy5odHRwUG9zdChjb25zdHMuSFRUUF9SRUNPUkRfU0VSVkVSLHt0aXRsZTon5qC85a2Q5bm/5ZGKJyxjb250ZW50OifliJvlu7rmiJDlip8nLGRlc2M6dGhpcy5hZElkfSxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2l6ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwbGF5R3JpZEFkOiBmdW5jdGlvbiAoaXNTaG93KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2xvYmFsRGF0YSAmJiB0aGlzLmdsb2JhbERhdGEuZ3JpZEFkKSB7XHJcbiAgICAgICAgICAgIGlmKGlzU2hvdyl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaSreaUvuebkuWtkOW5v+WRilwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5ncmlkQWQuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55uS5a2Q5bm/5ZGK5bGV56S65oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGh0dHBVdGlscy5odHRwUG9zdChjb25zdHMuSFRUUF9SRUNPUkRfU0VSVkVSLHt0aXRsZTon5qC85a2Q5bm/5ZGKJyxjb250ZW50OiflsZXnpLrmiJDlip8nLGRlc2M6dGhpcy5hZElkfSxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaHR0cFV0aWxzLmh0dHBQb3N0KGNvbnN0cy5IVFRQX1JFQ09SRF9TRVJWRVIse3RpdGxlOifmoLzlrZDlub/lkYonLGNvbnRlbnQ6J+makOiXjycsZGVzYzp0aGlzLmFkSWR9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5ncmlkQWQuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlZnJlc2hTaXplKCl7XHJcbiAgICAgICAgLy8g5bC65a+46LCD5pW05pe25Lya6Kem5Y+R5Zue6LCD77yM6YCa6L+H5Zue6LCD5ou/5Yiw55qE5bm/5ZGK55yf5a6e5a696auY5YaN6L+b6KGM5a6a5L2N6YCC6YWN5aSE55CGXHJcbiAgICAgICAgLy8g5rOo5oSP77ya5aaC5p6c5Zyo5Zue6LCD6YeM5YaN5qyh6LCD5pW05bC65a+477yM6KaB56Gu5L+d5LiN6KaB6Kem5Y+R5q275b6q546v77yB77yB77yBXHJcbiAgICAgICAgaWYodGhpcy5nbG9iYWxEYXRhICYmIHRoaXMuZ2xvYmFsRGF0YS5ncmlkQWQpe1xyXG4gICAgICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FKXsgLy/lpLTmnaHlubPlj7BcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5ncmlkQWQub25SZXNpemUoKHNpemUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdyaWQgc2hlemhp5aSn5bCPXCIrdGhpcy5oZWlnaHQrXCIgICBcIit0aGlzLndpZHRoKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5ncmlkQWQuc3R5bGUudG9wID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuZ3JpZEFkLnN0eWxlLmxlZnQgPSAodGhpcy53aWR0aCAtIHNpemUud2lkdGgpIC8gMjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5ncmlkQWQub25FcnJvcigobGlzdGVuZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55uS5a2Q5bm/5ZGK5Ye66ZSZXCIpXHJcbiAgICAgICAgICAgICAgICBodHRwVXRpbHMuaHR0cFBvc3QoY29uc3RzLkhUVFBfUkVDT1JEX1NFUlZFUix7dGl0bGU6J+agvOWtkOW5v+WRiicsY29udGVudDp0aGlzLmFkSWQsZGVzYzpsaXN0ZW5lci5lcnJDb2RlK2xpc3RlbmVyLmVyck1zZ30sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxufSk7XHJcbm1vZHVsZS5leHBvcnRzID0gR3JpZEFkO1xyXG4iXX0=