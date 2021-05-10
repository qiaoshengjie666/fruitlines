
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/ad/banner.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4d62c7SXMdKHaht/20V3tyM', 'banner');
// gameComon/scripts/ad/banner.js

"use strict";

var AppGame = require("../model/appGame");

var Banner = cc.Class({
  properties: {},
  ctor: function ctor() {
    this.instance = null;
  },
  statics: {
    create: function create(data) {
      if (!this.instance) {
        this.instance = new Banner();
        this.instance.initWithData(data);
        return this.instance;
      }
    }
  },
  initWithData: function initWithData(data) {
    this.targetBannerAdWidth = 200;

    if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
      //头条平台
      var _tt$getSystemInfoSync = tt.getSystemInfoSync(),
          windowWidth = _tt$getSystemInfoSync.windowWidth,
          windowHeight = _tt$getSystemInfoSync.windowHeight;

      this.width = windowWidth;
      this.height = windowHeight;
      this.adId = '3o8m16pp3e54cqcd5t';

      if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.bannerId && appGame.gameServerRoom.adConfig.bannerId.toutiao) {
        this.adId = appGame.gameServerRoom.adConfig.bannerId.toutiao.adUnitId;
      }

      console.log("banner 第一次创建");
      this.globalData = {
        bannerAd: tt.createBannerAd({
          adUnitId: this.adId,
          //adIntervals:30,
          style: {
            width: this.targetBannerAdWidth,
            top: this.height - this.targetBannerAdWidth / 16 * 9,
            // 根据系统约定尺寸计算出广告高度
            left: (this.width - this.targetBannerAdWidth) / 2
          }
        })
      };
      this.refreshSize();
      httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
        title: '广告位banner',
        content: '创建成功',
        desc: this.adId
      }, function () {});
    } else if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'QQ') {
      var _qq$getSystemInfoSync = qq.getSystemInfoSync(),
          _windowWidth = _qq$getSystemInfoSync.windowWidth,
          _windowHeight = _qq$getSystemInfoSync.windowHeight;

      this.width = _windowWidth;
      this.height = _windowHeight;
      this.adId = '4ef215ca5af9c3b454e9d22a676f7992';

      if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.bannerId && appGame.gameServerRoom.adConfig.bannerId.QQ) {
        this.adId = appGame.gameServerRoom.adConfig.bannerId.QQ.adUnitId;
      }

      console.log("banner 第一次创建"); //this.targetBannerAdWidth = 300;

      this.globalData = {
        bannerAd: qq.createBannerAd({
          adUnitId: this.adId,
          style: {
            //width: this.targetBannerAdWidth,
            //top: this.height - (this.targetBannerAdWidth / 16) * 9, // 根据系统约定尺寸计算出广告高度
            //left: (this.width - this.targetBannerAdWidth) / 2,
            width: this.targetBannerAdWidth,
            top: this.height - this.targetBannerAdWidth / 16 * 9,
            // 根据系统约定尺寸计算出广告高度
            left: (this.width - this.targetBannerAdWidth) / 2
          }
        })
      };
      this.refreshSize();
      httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
        title: '广告位banner',
        content: '创建成功',
        desc: this.adId
      }, function () {});
    } else if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'WX') {
      var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
          _windowWidth2 = _wx$getSystemInfoSync.windowWidth,
          _windowHeight2 = _wx$getSystemInfoSync.windowHeight;

      this.width = _windowWidth2;
      this.height = _windowHeight2;
      this.adId = '4ef215ca5af9c3b454e9d22a676f7992';

      if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.bannerId && appGame.gameServerRoom.adConfig.bannerId.WX) {
        this.adId = appGame.gameServerRoom.adConfig.bannerId.WX.adUnitId;
      }

      console.log("banner 第一次创建");
      this.globalData = {
        bannerAd: wx.createBannerAd({
          adUnitId: this.adId,
          style: {
            width: this.targetBannerAdWidth,
            top: this.height - this.targetBannerAdWidth / 16 * 9,
            // 根据系统约定尺寸计算出广告高度
            left: (this.width - this.targetBannerAdWidth) / 2
          }
        })
      };
      this.refreshSize();
      httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
        title: '广告位banner',
        content: '创建成功',
        desc: this.adId
      }, function () {});
    }
  },
  scheduleCallBack: function scheduleCallBack() {
    console.log("n秒后刷新");
    this.playBanner(3);
    this.playBanner(2);
  },

  /*
  *sceneId 1 普通的展示   2 N秒刷新展示   3 隐藏
  */
  playBanner: function playBanner(sceneId, refreshTime) {
    var _this = this;

    if (refreshTime === void 0) {
      refreshTime = 30;
    }

    if (cc.sys.platform == cc.sys.BYTEDANCE_GAME && appGame.gameServerRoom.gameConfigData && appGame.gameServerRoom.gameConfigData.isbanner) {
      console.log("banner return");
      return;
    }

    cc.director.getScheduler().enableForTarget(this);

    if (sceneId != 3) {
      if (sceneId == 2) {
        cc.director.getScheduler().schedule(this.scheduleCallBack, this, refreshTime);
      } else {
        cc.director.getScheduler().unschedule(this.scheduleCallBack, this);
      }

      if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
        //头条平台
        if (this.globalData && this.globalData.bannerAd) {
          console.log("banner 隐藏");
        } else {
          console.log("banner 创建");
          this.globalData = {
            bannerAd: tt.createBannerAd({
              adUnitId: this.adId,
              //adIntervals:30,
              style: {
                width: this.targetBannerAdWidth,
                top: this.height - this.targetBannerAdWidth / 16 * 9,
                // 根据系统约定尺寸计算出广告高度
                left: (this.width - this.targetBannerAdWidth) / 2
              }
            })
          };
          this.refreshSize();
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '广告位banner',
            content: '创建成功',
            desc: this.adId
          }, function () {});
        }
      } else if (cc.sys.platform == cc.sys.BAIDU_GAME) {
        //百度
        if (this.globalData && this.globalData.bannerAd) {
          this.globalData.bannerAd.destroy();
          this.globalData.bannerAd = null;
        }

        var _swan$getSystemInfoSy = swan.getSystemInfoSync(),
            windowWidth = _swan$getSystemInfoSy.windowWidth,
            windowHeight = _swan$getSystemInfoSy.windowHeight;

        this.width = windowWidth;
        this.height = windowHeight;

        if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.bannerId && appGame.gameServerRoom.adConfig.bannerId.baidu) {
          this.adId = appGame.gameServerRoom.adConfig.bannerId.baidu.adUnitId;
        }

        if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.bannerId && appGame.gameServerRoom.adConfig.bannerId.baidu) {
          this.appId = appGame.gameServerRoom.adConfig.bannerId.baidu.appSid;
        }

        this.globalData = {
          bannerAd: swan.createBannerAd({
            adUnitId: this.adId,
            appSid: this.appId,
            style: {
              width: this.width,
              top: this.height - this.targetBannerAdWidth / 16 * 9,
              // 根据系统约定尺寸计算出广告高度
              left: (this.width - this.targetBannerAdWidth) / 2
            }
          })
        };
        this.refreshSize();
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: '广告位banner',
          content: '创建成功',
          desc: this.adId
        }, function () {});
      } else if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'QQ') {
        //QQ
        if (this.globalData && this.globalData.bannerAd) {
          this.globalData.bannerAd.destroy();
          this.globalData.bannerAd = null;
        }

        var _qq$getSystemInfoSync2 = qq.getSystemInfoSync(),
            _windowWidth3 = _qq$getSystemInfoSync2.windowWidth,
            _windowHeight3 = _qq$getSystemInfoSync2.windowHeight;

        this.width = _windowWidth3;
        this.height = _windowHeight3;

        if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.bannerId && appGame.gameServerRoom.adConfig.bannerId.QQ) {
          this.adId = appGame.gameServerRoom.adConfig.bannerId.QQ.adUnitId;
        }

        this.globalData = {
          bannerAd: qq.createBannerAd({
            adUnitId: this.adId,
            style: {
              width: this.width,
              top: this.height - this.targetBannerAdWidth / 16 * 9,
              // 根据系统约定尺寸计算出广告高度
              left: (this.width - this.targetBannerAdWidth) / 2
            }
          })
        };
        this.refreshSize();
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: '广告位banner',
          content: '创建成功',
          desc: this.adId
        }, function () {});
      }

      if (this.globalData && this.globalData.bannerAd) {
        console.log("播放banner广告");

        if (cc.sys.platform == cc.sys.BAIDU_GAME) {
          //百度
          this.globalData.bannerAd.onLoad(function () {
            console.log('百度banner 加载完成');

            _this.globalData.bannerAd.show().then(function () {
              console.log("展示成功");
              httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
                title: '广告位banner',
                content: '展示成功',
                desc: _this.adId
              }, function () {});
            })["catch"](function (err) {
              console.log("展示失败");
              httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
                title: '广告位banner',
                content: '展示失败',
                desc: _this.adId
              }, function () {});
            });
          });
        } else if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'QQ') {
          this.globalData.bannerAd.onLoad(function () {
            console.log('qqBanner 加载完成');

            _this.globalData.bannerAd.show();

            console.log("展示成功");
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: '广告位banner',
              content: '展示成功',
              desc: _this.adId
            }, function () {});
          });
        } else {
          console.log("开始展示广告");
          this.globalData.bannerAd.show().then(function () {
            console.log("展示成功");
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: '广告位banner',
              content: '展示成功',
              desc: _this.adId
            }, function () {});
          })["catch"](function (err) {
            console.log("展示失败");
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: '广告位banner',
              content: '展示失败',
              desc: _this.adId
            }, function () {});
          });
        }
      }
    } else {
      cc.director.getScheduler().unschedule(this.scheduleCallBack, this);

      if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
        //头条平台
        if (this.globalData && this.globalData.bannerAd) {
          this.globalData.bannerAd.hide();
          this.globalData.bannerAd.destroy();
          this.globalData.bannerAd = null;
          console.log("字节平台banner 销毁");
          this.globalData = {
            bannerAd: tt.createBannerAd({
              adUnitId: this.adId,
              //adIntervals:30,
              style: {
                width: this.targetBannerAdWidth,
                top: this.height - this.targetBannerAdWidth / 16 * 9,
                // 根据系统约定尺寸计算出广告高度
                left: (this.width - this.targetBannerAdWidth) / 2
              }
            })
          };
          this.refreshSize();
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '广告位banner',
            content: '隐藏创建成功',
            desc: this.adId
          }, function () {});
        }
      } else if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'WX') {
        //微信平台
        if (this.globalData && this.globalData.bannerAd) {
          this.globalData.bannerAd.hide();
          this.globalData.bannerAd.destroy();
          this.globalData.bannerAd = null;
          console.log("banner 销毁");
          this.globalData = {
            bannerAd: wx.createBannerAd({
              adUnitId: this.adId,
              style: {
                width: this.targetBannerAdWidth,
                top: this.height - this.targetBannerAdWidth / 16 * 9,
                // 根据系统约定尺寸计算出广告高度
                left: (this.width - this.targetBannerAdWidth) / 2
              }
            })
          };
          this.refreshSize();
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '广告位banner',
            content: '隐藏创建成功',
            desc: this.adId
          }, function () {});
        }
      } else if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'QQ') {
        this.globalData.bannerAd.hide();
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: '广告位banner',
          content: '隐藏',
          desc: this.adId
        }, function () {});
      }
    }
  },
  refreshSize: function refreshSize() {
    var _this2 = this;

    // 尺寸调整时会触发回调，通过回调拿到的广告真实宽高再进行定位适配处理
    // 注意：如果在回调里再次调整尺寸，要确保不要触发死循环！！！
    if (this.globalData && this.globalData.bannerAd) {
      if (cc.sys.platform == cc.sys.BYTEDANCE_GAME || cc.sys.platform == cc.sys.WECHAT_GAME || cc.sys.platform == cc.sys.BAIDU_GAME) {
        //头条平台
        this.globalData.bannerAd.onResize(function (size) {
          console.log("banner shezhi大小" + _this2.height + "   " + _this2.width);
          _this2.globalData.bannerAd.style.top = _this2.height - size.height;
          _this2.globalData.bannerAd.style.left = (_this2.width - size.width) / 2; //this.globalData.bannerAd.offResize();
        });
      }

      this.globalData.bannerAd.onError(function (listener) {
        console.log("banner 出错" + listener.errCode + listener.errMsg);
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: '广告位banner',
          content: _this2.adId,
          desc: listener.errCode + listener.errMsg
        }, function () {}); // appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
        //     content:"出错啦！！！"
        //  });
        //this.globalData.bannerAd.offError();
      });
    }
  }
});
module.exports = Banner;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JpcHRzXFxhZFxcYmFubmVyLmpzIl0sIm5hbWVzIjpbIkFwcEdhbWUiLCJyZXF1aXJlIiwiQmFubmVyIiwiY2MiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJjdG9yIiwiaW5zdGFuY2UiLCJzdGF0aWNzIiwiY3JlYXRlIiwiZGF0YSIsImluaXRXaXRoRGF0YSIsInRhcmdldEJhbm5lckFkV2lkdGgiLCJzeXMiLCJwbGF0Zm9ybSIsIkJZVEVEQU5DRV9HQU1FIiwidHQiLCJnZXRTeXN0ZW1JbmZvU3luYyIsIndpbmRvd1dpZHRoIiwid2luZG93SGVpZ2h0Iiwid2lkdGgiLCJoZWlnaHQiLCJhZElkIiwiYXBwR2FtZSIsImdhbWVTZXJ2ZXJSb29tIiwiYWRDb25maWciLCJiYW5uZXJJZCIsInRvdXRpYW8iLCJhZFVuaXRJZCIsImNvbnNvbGUiLCJsb2ciLCJnbG9iYWxEYXRhIiwiYmFubmVyQWQiLCJjcmVhdGVCYW5uZXJBZCIsInN0eWxlIiwidG9wIiwibGVmdCIsInJlZnJlc2hTaXplIiwiaHR0cFV0aWxzIiwiaHR0cFBvc3QiLCJjb25zdHMiLCJIVFRQX1JFQ09SRF9TRVJWRVIiLCJ0aXRsZSIsImNvbnRlbnQiLCJkZXNjIiwiV0VDSEFUX0dBTUUiLCJxcSIsIlFRIiwid3giLCJXWCIsInNjaGVkdWxlQ2FsbEJhY2siLCJwbGF5QmFubmVyIiwic2NlbmVJZCIsInJlZnJlc2hUaW1lIiwiZ2FtZUNvbmZpZ0RhdGEiLCJpc2Jhbm5lciIsImRpcmVjdG9yIiwiZ2V0U2NoZWR1bGVyIiwiZW5hYmxlRm9yVGFyZ2V0Iiwic2NoZWR1bGUiLCJ1bnNjaGVkdWxlIiwiQkFJRFVfR0FNRSIsImRlc3Ryb3kiLCJzd2FuIiwiYmFpZHUiLCJhcHBJZCIsImFwcFNpZCIsIm9uTG9hZCIsInNob3ciLCJ0aGVuIiwiZXJyIiwiaGlkZSIsIm9uUmVzaXplIiwic2l6ZSIsIm9uRXJyb3IiLCJsaXN0ZW5lciIsImVyckNvZGUiLCJlcnJNc2ciLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLE9BQU8sR0FBR0MsT0FBTyxDQUFDLGtCQUFELENBQXZCOztBQUVBLElBQUlDLE1BQU0sR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDbEJDLEVBQUFBLFVBQVUsRUFBRSxFQURNO0FBR2xCQyxFQUFBQSxJQUhrQixrQkFHWjtBQUNGLFNBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDSCxHQUxpQjtBQU1sQkMsRUFBQUEsT0FBTyxFQUFFO0FBQ0xDLElBQUFBLE1BQU0sRUFBRSxnQkFBVUMsSUFBVixFQUFnQjtBQUNwQixVQUFHLENBQUMsS0FBS0gsUUFBVCxFQUFrQjtBQUNkLGFBQUtBLFFBQUwsR0FBZ0IsSUFBSUwsTUFBSixFQUFoQjtBQUNBLGFBQUtLLFFBQUwsQ0FBY0ksWUFBZCxDQUEyQkQsSUFBM0I7QUFDQSxlQUFPLEtBQUtILFFBQVo7QUFDSDtBQUNKO0FBUEksR0FOUztBQWVsQkksRUFBQUEsWUFBWSxFQUFFLHNCQUFVRCxJQUFWLEVBQWdCO0FBQzFCLFNBQUtFLG1CQUFMLEdBQTJCLEdBQTNCOztBQUNBLFFBQUdULEVBQUUsQ0FBQ1UsR0FBSCxDQUFPQyxRQUFQLElBQW1CWCxFQUFFLENBQUNVLEdBQUgsQ0FBT0UsY0FBN0IsRUFBNEM7QUFBRTtBQUFGLGtDQUNOQyxFQUFFLENBQUNDLGlCQUFILEVBRE07QUFBQSxVQUNsQ0MsV0FEa0MseUJBQ2xDQSxXQURrQztBQUFBLFVBQ3RCQyxZQURzQix5QkFDdEJBLFlBRHNCOztBQUV4QyxXQUFLQyxLQUFMLEdBQWFGLFdBQWI7QUFDQSxXQUFLRyxNQUFMLEdBQWNGLFlBQWQ7QUFDQSxXQUFLRyxJQUFMLEdBQVksb0JBQVo7O0FBQ0EsVUFBR0MsT0FBTyxDQUFDQyxjQUFSLENBQXVCQyxRQUF2QixJQUFtQ0YsT0FBTyxDQUFDQyxjQUFSLENBQXVCQyxRQUF2QixDQUFnQ0MsUUFBbkUsSUFBK0VILE9BQU8sQ0FBQ0MsY0FBUixDQUF1QkMsUUFBdkIsQ0FBZ0NDLFFBQWhDLENBQXlDQyxPQUEzSCxFQUFtSTtBQUMvSCxhQUFLTCxJQUFMLEdBQVlDLE9BQU8sQ0FBQ0MsY0FBUixDQUF1QkMsUUFBdkIsQ0FBZ0NDLFFBQWhDLENBQXlDQyxPQUF6QyxDQUFpREMsUUFBN0Q7QUFDSDs7QUFDREMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWjtBQUNBLFdBQUtDLFVBQUwsR0FBa0I7QUFDZEMsUUFBQUEsUUFBUSxFQUFFaEIsRUFBRSxDQUFDaUIsY0FBSCxDQUFrQjtBQUN4QkwsVUFBQUEsUUFBUSxFQUFFLEtBQUtOLElBRFM7QUFFeEI7QUFDQVksVUFBQUEsS0FBSyxFQUFFO0FBQ0hkLFlBQUFBLEtBQUssRUFBRSxLQUFLUixtQkFEVDtBQUVIdUIsWUFBQUEsR0FBRyxFQUFFLEtBQUtkLE1BQUwsR0FBZSxLQUFLVCxtQkFBTCxHQUEyQixFQUE1QixHQUFrQyxDQUZsRDtBQUVxRDtBQUN4RHdCLFlBQUFBLElBQUksRUFBRyxDQUFDLEtBQUtoQixLQUFMLEdBQWEsS0FBS1IsbUJBQW5CLElBQTBDO0FBSDlDO0FBSGlCLFNBQWxCO0FBREksT0FBbEI7QUFXQSxXQUFLeUIsV0FBTDtBQUNBQyxNQUFBQSxTQUFTLENBQUNDLFFBQVYsQ0FBbUJDLE1BQU0sQ0FBQ0Msa0JBQTFCLEVBQTZDO0FBQUNDLFFBQUFBLEtBQUssRUFBQyxXQUFQO0FBQW1CQyxRQUFBQSxPQUFPLEVBQUMsTUFBM0I7QUFBa0NDLFFBQUFBLElBQUksRUFBQyxLQUFLdEI7QUFBNUMsT0FBN0MsRUFBK0YsWUFBVSxDQUN4RyxDQUREO0FBRUgsS0F2QkQsTUF1Qk0sSUFBR25CLEVBQUUsQ0FBQ1UsR0FBSCxDQUFPQyxRQUFQLElBQW1CWCxFQUFFLENBQUNVLEdBQUgsQ0FBT2dDLFdBQTFCLElBQXlDdEIsT0FBTyxDQUFDVCxRQUFSLElBQW9CLElBQWhFLEVBQXFFO0FBQUEsa0NBQ2pDZ0MsRUFBRSxDQUFDN0IsaUJBQUgsRUFEaUM7QUFBQSxVQUMvREMsWUFEK0QseUJBQy9EQSxXQUQrRDtBQUFBLFVBQ2xEQyxhQURrRCx5QkFDbERBLFlBRGtEOztBQUV2RSxXQUFLQyxLQUFMLEdBQWFGLFlBQWI7QUFDQSxXQUFLRyxNQUFMLEdBQWNGLGFBQWQ7QUFDQSxXQUFLRyxJQUFMLEdBQVksa0NBQVo7O0FBQ0EsVUFBR0MsT0FBTyxDQUFDQyxjQUFSLENBQXVCQyxRQUF2QixJQUFtQ0YsT0FBTyxDQUFDQyxjQUFSLENBQXVCQyxRQUF2QixDQUFnQ0MsUUFBbkUsSUFBK0VILE9BQU8sQ0FBQ0MsY0FBUixDQUF1QkMsUUFBdkIsQ0FBZ0NDLFFBQWhDLENBQXlDcUIsRUFBM0gsRUFBOEg7QUFDMUgsYUFBS3pCLElBQUwsR0FBWUMsT0FBTyxDQUFDQyxjQUFSLENBQXVCQyxRQUF2QixDQUFnQ0MsUUFBaEMsQ0FBeUNxQixFQUF6QyxDQUE0Q25CLFFBQXhEO0FBQ0g7O0FBQ0RDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVosRUFSdUUsQ0FTdkU7O0FBQ0EsV0FBS0MsVUFBTCxHQUFrQjtBQUNkQyxRQUFBQSxRQUFRLEVBQUVjLEVBQUUsQ0FBQ2IsY0FBSCxDQUFrQjtBQUN4QkwsVUFBQUEsUUFBUSxFQUFFLEtBQUtOLElBRFM7QUFFeEJZLFVBQUFBLEtBQUssRUFBRTtBQUNIO0FBQ0E7QUFDQTtBQUNBZCxZQUFBQSxLQUFLLEVBQUUsS0FBS1IsbUJBSlQ7QUFLSHVCLFlBQUFBLEdBQUcsRUFBRSxLQUFLZCxNQUFMLEdBQWUsS0FBS1QsbUJBQUwsR0FBMkIsRUFBNUIsR0FBa0MsQ0FMbEQ7QUFLcUQ7QUFDeER3QixZQUFBQSxJQUFJLEVBQUUsQ0FBQyxLQUFLaEIsS0FBTCxHQUFhLEtBQUtSLG1CQUFuQixJQUEwQztBQU43QztBQUZpQixTQUFsQjtBQURJLE9BQWxCO0FBYUEsV0FBS3lCLFdBQUw7QUFDQUMsTUFBQUEsU0FBUyxDQUFDQyxRQUFWLENBQW1CQyxNQUFNLENBQUNDLGtCQUExQixFQUE2QztBQUFDQyxRQUFBQSxLQUFLLEVBQUMsV0FBUDtBQUFtQkMsUUFBQUEsT0FBTyxFQUFDLE1BQTNCO0FBQWtDQyxRQUFBQSxJQUFJLEVBQUMsS0FBS3RCO0FBQTVDLE9BQTdDLEVBQStGLFlBQVUsQ0FDeEcsQ0FERDtBQUVILEtBMUJLLE1BMkJELElBQUduQixFQUFFLENBQUNVLEdBQUgsQ0FBT0MsUUFBUCxJQUFtQlgsRUFBRSxDQUFDVSxHQUFILENBQU9nQyxXQUExQixJQUF5Q3RCLE9BQU8sQ0FBQ1QsUUFBUixJQUFvQixJQUFoRSxFQUFxRTtBQUFBLGtDQUNoQ2tDLEVBQUUsQ0FBQy9CLGlCQUFILEVBRGdDO0FBQUEsVUFDOURDLGFBRDhELHlCQUM5REEsV0FEOEQ7QUFBQSxVQUNqREMsY0FEaUQseUJBQ2pEQSxZQURpRDs7QUFFdEUsV0FBS0MsS0FBTCxHQUFhRixhQUFiO0FBQ0EsV0FBS0csTUFBTCxHQUFjRixjQUFkO0FBQ0EsV0FBS0csSUFBTCxHQUFZLGtDQUFaOztBQUNBLFVBQUdDLE9BQU8sQ0FBQ0MsY0FBUixDQUF1QkMsUUFBdkIsSUFBbUNGLE9BQU8sQ0FBQ0MsY0FBUixDQUF1QkMsUUFBdkIsQ0FBZ0NDLFFBQW5FLElBQStFSCxPQUFPLENBQUNDLGNBQVIsQ0FBdUJDLFFBQXZCLENBQWdDQyxRQUFoQyxDQUF5Q3VCLEVBQTNILEVBQThIO0FBQzFILGFBQUszQixJQUFMLEdBQVlDLE9BQU8sQ0FBQ0MsY0FBUixDQUF1QkMsUUFBdkIsQ0FBZ0NDLFFBQWhDLENBQXlDdUIsRUFBekMsQ0FBNENyQixRQUF4RDtBQUNIOztBQUNEQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFaO0FBQ0EsV0FBS0MsVUFBTCxHQUFrQjtBQUNkQyxRQUFBQSxRQUFRLEVBQUVnQixFQUFFLENBQUNmLGNBQUgsQ0FBa0I7QUFDeEJMLFVBQUFBLFFBQVEsRUFBRSxLQUFLTixJQURTO0FBRXhCWSxVQUFBQSxLQUFLLEVBQUU7QUFDSGQsWUFBQUEsS0FBSyxFQUFFLEtBQUtSLG1CQURUO0FBRUh1QixZQUFBQSxHQUFHLEVBQUUsS0FBS2QsTUFBTCxHQUFlLEtBQUtULG1CQUFMLEdBQTJCLEVBQTVCLEdBQWtDLENBRmxEO0FBRXFEO0FBQ3hEd0IsWUFBQUEsSUFBSSxFQUFFLENBQUMsS0FBS2hCLEtBQUwsR0FBYSxLQUFLUixtQkFBbkIsSUFBMEM7QUFIN0M7QUFGaUIsU0FBbEI7QUFESSxPQUFsQjtBQVVBLFdBQUt5QixXQUFMO0FBQ0FDLE1BQUFBLFNBQVMsQ0FBQ0MsUUFBVixDQUFtQkMsTUFBTSxDQUFDQyxrQkFBMUIsRUFBNkM7QUFBQ0MsUUFBQUEsS0FBSyxFQUFDLFdBQVA7QUFBbUJDLFFBQUFBLE9BQU8sRUFBQyxNQUEzQjtBQUFrQ0MsUUFBQUEsSUFBSSxFQUFDLEtBQUt0QjtBQUE1QyxPQUE3QyxFQUErRixZQUFVLENBQ3hHLENBREQ7QUFFSDtBQUNKLEdBMUZpQjtBQTJGbEI0QixFQUFBQSxnQkFBZ0IsRUFBQyw0QkFBVTtBQUN2QnJCLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE9BQVo7QUFDQSxTQUFLcUIsVUFBTCxDQUFnQixDQUFoQjtBQUNBLFNBQUtBLFVBQUwsQ0FBZ0IsQ0FBaEI7QUFDSCxHQS9GaUI7O0FBZ0dsQjtBQUNKO0FBQ0E7QUFDSUEsRUFBQUEsVUFBVSxFQUFDLG9CQUFTQyxPQUFULEVBQWlCQyxXQUFqQixFQUFrQztBQUFBOztBQUFBLFFBQWpCQSxXQUFpQjtBQUFqQkEsTUFBQUEsV0FBaUIsR0FBSCxFQUFHO0FBQUE7O0FBQ3pDLFFBQUdsRCxFQUFFLENBQUNVLEdBQUgsQ0FBT0MsUUFBUCxJQUFtQlgsRUFBRSxDQUFDVSxHQUFILENBQU9FLGNBQTFCLElBQTRDUSxPQUFPLENBQUNDLGNBQVIsQ0FBdUI4QixjQUFuRSxJQUNDL0IsT0FBTyxDQUFDQyxjQUFSLENBQXVCOEIsY0FBdkIsQ0FBc0NDLFFBRDFDLEVBQ21EO0FBQy9DMUIsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZUFBWjtBQUNBO0FBQ0g7O0FBQ0QzQixJQUFBQSxFQUFFLENBQUNxRCxRQUFILENBQVlDLFlBQVosR0FBMkJDLGVBQTNCLENBQTJDLElBQTNDOztBQUNBLFFBQUdOLE9BQU8sSUFBRSxDQUFaLEVBQWM7QUFDVixVQUFHQSxPQUFPLElBQUUsQ0FBWixFQUFjO0FBQ1ZqRCxRQUFBQSxFQUFFLENBQUNxRCxRQUFILENBQVlDLFlBQVosR0FBMkJFLFFBQTNCLENBQW9DLEtBQUtULGdCQUF6QyxFQUEwRCxJQUExRCxFQUErREcsV0FBL0Q7QUFDSCxPQUZELE1BRUs7QUFDRGxELFFBQUFBLEVBQUUsQ0FBQ3FELFFBQUgsQ0FBWUMsWUFBWixHQUEyQkcsVUFBM0IsQ0FBc0MsS0FBS1YsZ0JBQTNDLEVBQTRELElBQTVEO0FBQ0g7O0FBRUQsVUFBRy9DLEVBQUUsQ0FBQ1UsR0FBSCxDQUFPQyxRQUFQLElBQW1CWCxFQUFFLENBQUNVLEdBQUgsQ0FBT0UsY0FBN0IsRUFBNEM7QUFBRTtBQUMxQyxZQUFHLEtBQUtnQixVQUFMLElBQW1CLEtBQUtBLFVBQUwsQ0FBZ0JDLFFBQXRDLEVBQStDO0FBQzNDSCxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxXQUFaO0FBQ0gsU0FGRCxNQUVLO0FBQ0RELFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFdBQVo7QUFDQSxlQUFLQyxVQUFMLEdBQWtCO0FBQ2RDLFlBQUFBLFFBQVEsRUFBRWhCLEVBQUUsQ0FBQ2lCLGNBQUgsQ0FBa0I7QUFDeEJMLGNBQUFBLFFBQVEsRUFBRSxLQUFLTixJQURTO0FBRXhCO0FBQ0FZLGNBQUFBLEtBQUssRUFBRTtBQUNIZCxnQkFBQUEsS0FBSyxFQUFFLEtBQUtSLG1CQURUO0FBRUh1QixnQkFBQUEsR0FBRyxFQUFFLEtBQUtkLE1BQUwsR0FBZSxLQUFLVCxtQkFBTCxHQUEyQixFQUE1QixHQUFrQyxDQUZsRDtBQUVxRDtBQUN4RHdCLGdCQUFBQSxJQUFJLEVBQUcsQ0FBQyxLQUFLaEIsS0FBTCxHQUFhLEtBQUtSLG1CQUFuQixJQUEwQztBQUg5QztBQUhpQixhQUFsQjtBQURJLFdBQWxCO0FBV0EsZUFBS3lCLFdBQUw7QUFDQUMsVUFBQUEsU0FBUyxDQUFDQyxRQUFWLENBQW1CQyxNQUFNLENBQUNDLGtCQUExQixFQUE2QztBQUFDQyxZQUFBQSxLQUFLLEVBQUMsV0FBUDtBQUFtQkMsWUFBQUEsT0FBTyxFQUFDLE1BQTNCO0FBQWtDQyxZQUFBQSxJQUFJLEVBQUMsS0FBS3RCO0FBQTVDLFdBQTdDLEVBQStGLFlBQVUsQ0FDeEcsQ0FERDtBQUVIO0FBQ0osT0FwQkQsTUFvQk0sSUFBR25CLEVBQUUsQ0FBQ1UsR0FBSCxDQUFPQyxRQUFQLElBQW1CWCxFQUFFLENBQUNVLEdBQUgsQ0FBT2dELFVBQTdCLEVBQXdDO0FBQUM7QUFDM0MsWUFBRyxLQUFLOUIsVUFBTCxJQUFtQixLQUFLQSxVQUFMLENBQWdCQyxRQUF0QyxFQUErQztBQUMzQyxlQUFLRCxVQUFMLENBQWdCQyxRQUFoQixDQUF5QjhCLE9BQXpCO0FBQ0EsZUFBSy9CLFVBQUwsQ0FBZ0JDLFFBQWhCLEdBQTJCLElBQTNCO0FBQ0g7O0FBSnlDLG9DQUtSK0IsSUFBSSxDQUFDOUMsaUJBQUwsRUFMUTtBQUFBLFlBS3BDQyxXQUxvQyx5QkFLcENBLFdBTG9DO0FBQUEsWUFLeEJDLFlBTHdCLHlCQUt4QkEsWUFMd0I7O0FBTTFDLGFBQUtDLEtBQUwsR0FBYUYsV0FBYjtBQUNBLGFBQUtHLE1BQUwsR0FBY0YsWUFBZDs7QUFDQSxZQUFHSSxPQUFPLENBQUNDLGNBQVIsQ0FBdUJDLFFBQXZCLElBQW1DRixPQUFPLENBQUNDLGNBQVIsQ0FBdUJDLFFBQXZCLENBQWdDQyxRQUFuRSxJQUErRUgsT0FBTyxDQUFDQyxjQUFSLENBQXVCQyxRQUF2QixDQUFnQ0MsUUFBaEMsQ0FBeUNzQyxLQUEzSCxFQUFpSTtBQUM3SCxlQUFLMUMsSUFBTCxHQUFZQyxPQUFPLENBQUNDLGNBQVIsQ0FBdUJDLFFBQXZCLENBQWdDQyxRQUFoQyxDQUF5Q3NDLEtBQXpDLENBQStDcEMsUUFBM0Q7QUFDSDs7QUFDRCxZQUFHTCxPQUFPLENBQUNDLGNBQVIsQ0FBdUJDLFFBQXZCLElBQW1DRixPQUFPLENBQUNDLGNBQVIsQ0FBdUJDLFFBQXZCLENBQWdDQyxRQUFuRSxJQUErRUgsT0FBTyxDQUFDQyxjQUFSLENBQXVCQyxRQUF2QixDQUFnQ0MsUUFBaEMsQ0FBeUNzQyxLQUEzSCxFQUFpSTtBQUM3SCxlQUFLQyxLQUFMLEdBQWExQyxPQUFPLENBQUNDLGNBQVIsQ0FBdUJDLFFBQXZCLENBQWdDQyxRQUFoQyxDQUF5Q3NDLEtBQXpDLENBQStDRSxNQUE1RDtBQUNIOztBQUNELGFBQUtuQyxVQUFMLEdBQWtCO0FBQ2RDLFVBQUFBLFFBQVEsRUFBRStCLElBQUksQ0FBQzlCLGNBQUwsQ0FBb0I7QUFDMUJMLFlBQUFBLFFBQVEsRUFBRSxLQUFLTixJQURXO0FBRTFCNEMsWUFBQUEsTUFBTSxFQUFDLEtBQUtELEtBRmM7QUFHMUIvQixZQUFBQSxLQUFLLEVBQUU7QUFDSGQsY0FBQUEsS0FBSyxFQUFFLEtBQUtBLEtBRFQ7QUFFSGUsY0FBQUEsR0FBRyxFQUFFLEtBQUtkLE1BQUwsR0FBZSxLQUFLVCxtQkFBTCxHQUEyQixFQUE1QixHQUFrQyxDQUZsRDtBQUVxRDtBQUN4RHdCLGNBQUFBLElBQUksRUFBRyxDQUFDLEtBQUtoQixLQUFMLEdBQWEsS0FBS1IsbUJBQW5CLElBQTBDO0FBSDlDO0FBSG1CLFdBQXBCO0FBREksU0FBbEI7QUFXQSxhQUFLeUIsV0FBTDtBQUNBQyxRQUFBQSxTQUFTLENBQUNDLFFBQVYsQ0FBbUJDLE1BQU0sQ0FBQ0Msa0JBQTFCLEVBQTZDO0FBQUNDLFVBQUFBLEtBQUssRUFBQyxXQUFQO0FBQW1CQyxVQUFBQSxPQUFPLEVBQUMsTUFBM0I7QUFBa0NDLFVBQUFBLElBQUksRUFBQyxLQUFLdEI7QUFBNUMsU0FBN0MsRUFBK0YsWUFBVSxDQUN4RyxDQUREO0FBRUgsT0E1QkssTUE0QkEsSUFBR25CLEVBQUUsQ0FBQ1UsR0FBSCxDQUFPQyxRQUFQLElBQW1CWCxFQUFFLENBQUNVLEdBQUgsQ0FBT2dDLFdBQTFCLElBQXlDdEIsT0FBTyxDQUFDVCxRQUFSLElBQW9CLElBQWhFLEVBQXFFO0FBQUM7QUFDeEUsWUFBRyxLQUFLaUIsVUFBTCxJQUFtQixLQUFLQSxVQUFMLENBQWdCQyxRQUF0QyxFQUErQztBQUMzQyxlQUFLRCxVQUFMLENBQWdCQyxRQUFoQixDQUF5QjhCLE9BQXpCO0FBQ0EsZUFBSy9CLFVBQUwsQ0FBZ0JDLFFBQWhCLEdBQTJCLElBQTNCO0FBQ0g7O0FBSnNFLHFDQUtyQ2MsRUFBRSxDQUFDN0IsaUJBQUgsRUFMcUM7QUFBQSxZQUtqRUMsYUFMaUUsMEJBS2pFQSxXQUxpRTtBQUFBLFlBS3JEQyxjQUxxRCwwQkFLckRBLFlBTHFEOztBQU12RSxhQUFLQyxLQUFMLEdBQWFGLGFBQWI7QUFDQSxhQUFLRyxNQUFMLEdBQWNGLGNBQWQ7O0FBQ0EsWUFBR0ksT0FBTyxDQUFDQyxjQUFSLENBQXVCQyxRQUF2QixJQUFtQ0YsT0FBTyxDQUFDQyxjQUFSLENBQXVCQyxRQUF2QixDQUFnQ0MsUUFBbkUsSUFBK0VILE9BQU8sQ0FBQ0MsY0FBUixDQUF1QkMsUUFBdkIsQ0FBZ0NDLFFBQWhDLENBQXlDcUIsRUFBM0gsRUFBOEg7QUFDMUgsZUFBS3pCLElBQUwsR0FBWUMsT0FBTyxDQUFDQyxjQUFSLENBQXVCQyxRQUF2QixDQUFnQ0MsUUFBaEMsQ0FBeUNxQixFQUF6QyxDQUE0Q25CLFFBQXhEO0FBQ0g7O0FBQ0QsYUFBS0csVUFBTCxHQUFrQjtBQUNkQyxVQUFBQSxRQUFRLEVBQUVjLEVBQUUsQ0FBQ2IsY0FBSCxDQUFrQjtBQUN4QkwsWUFBQUEsUUFBUSxFQUFFLEtBQUtOLElBRFM7QUFFeEJZLFlBQUFBLEtBQUssRUFBRTtBQUNIZCxjQUFBQSxLQUFLLEVBQUUsS0FBS0EsS0FEVDtBQUVIZSxjQUFBQSxHQUFHLEVBQUUsS0FBS2QsTUFBTCxHQUFlLEtBQUtULG1CQUFMLEdBQTJCLEVBQTVCLEdBQWtDLENBRmxEO0FBRXFEO0FBQ3hEd0IsY0FBQUEsSUFBSSxFQUFHLENBQUMsS0FBS2hCLEtBQUwsR0FBYSxLQUFLUixtQkFBbkIsSUFBMEM7QUFIOUM7QUFGaUIsV0FBbEI7QUFESSxTQUFsQjtBQVVBLGFBQUt5QixXQUFMO0FBQ0FDLFFBQUFBLFNBQVMsQ0FBQ0MsUUFBVixDQUFtQkMsTUFBTSxDQUFDQyxrQkFBMUIsRUFBNkM7QUFBQ0MsVUFBQUEsS0FBSyxFQUFDLFdBQVA7QUFBbUJDLFVBQUFBLE9BQU8sRUFBQyxNQUEzQjtBQUFrQ0MsVUFBQUEsSUFBSSxFQUFDLEtBQUt0QjtBQUE1QyxTQUE3QyxFQUErRixZQUFVLENBQ3hHLENBREQ7QUFFSDs7QUFDRCxVQUFHLEtBQUtTLFVBQUwsSUFBbUIsS0FBS0EsVUFBTCxDQUFnQkMsUUFBdEMsRUFBK0M7QUFDM0NILFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFlBQVo7O0FBQ0EsWUFBRzNCLEVBQUUsQ0FBQ1UsR0FBSCxDQUFPQyxRQUFQLElBQW1CWCxFQUFFLENBQUNVLEdBQUgsQ0FBT2dELFVBQTdCLEVBQXdDO0FBQUM7QUFDckMsZUFBSzlCLFVBQUwsQ0FBZ0JDLFFBQWhCLENBQXlCbUMsTUFBekIsQ0FBZ0MsWUFBTTtBQUNsQ3RDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQVo7O0FBQ0EsWUFBQSxLQUFJLENBQUNDLFVBQUwsQ0FBZ0JDLFFBQWhCLENBQXlCb0MsSUFBekIsR0FBZ0NDLElBQWhDLENBQXFDLFlBQU07QUFDdkN4QyxjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaO0FBQ0FRLGNBQUFBLFNBQVMsQ0FBQ0MsUUFBVixDQUFtQkMsTUFBTSxDQUFDQyxrQkFBMUIsRUFBNkM7QUFBQ0MsZ0JBQUFBLEtBQUssRUFBQyxXQUFQO0FBQW1CQyxnQkFBQUEsT0FBTyxFQUFDLE1BQTNCO0FBQWtDQyxnQkFBQUEsSUFBSSxFQUFDLEtBQUksQ0FBQ3RCO0FBQTVDLGVBQTdDLEVBQStGLFlBQVUsQ0FDeEcsQ0FERDtBQUVILGFBSkQsV0FJUyxVQUFDZ0QsR0FBRCxFQUFTO0FBQ2R6QyxjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaO0FBQ0FRLGNBQUFBLFNBQVMsQ0FBQ0MsUUFBVixDQUFtQkMsTUFBTSxDQUFDQyxrQkFBMUIsRUFBNkM7QUFBQ0MsZ0JBQUFBLEtBQUssRUFBQyxXQUFQO0FBQW1CQyxnQkFBQUEsT0FBTyxFQUFDLE1BQTNCO0FBQWtDQyxnQkFBQUEsSUFBSSxFQUFDLEtBQUksQ0FBQ3RCO0FBQTVDLGVBQTdDLEVBQStGLFlBQVUsQ0FDeEcsQ0FERDtBQUVILGFBUkQ7QUFTSCxXQVhEO0FBWUgsU0FiRCxNQWFNLElBQUduQixFQUFFLENBQUNVLEdBQUgsQ0FBT0MsUUFBUCxJQUFtQlgsRUFBRSxDQUFDVSxHQUFILENBQU9nQyxXQUExQixJQUF5Q3RCLE9BQU8sQ0FBQ1QsUUFBUixJQUFvQixJQUFoRSxFQUFxRTtBQUN2RSxlQUFLaUIsVUFBTCxDQUFnQkMsUUFBaEIsQ0FBeUJtQyxNQUF6QixDQUFnQyxZQUFNO0FBQ2xDdEMsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZUFBWjs7QUFDQSxZQUFBLEtBQUksQ0FBQ0MsVUFBTCxDQUFnQkMsUUFBaEIsQ0FBeUJvQyxJQUF6Qjs7QUFDQXZDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVo7QUFDQVEsWUFBQUEsU0FBUyxDQUFDQyxRQUFWLENBQW1CQyxNQUFNLENBQUNDLGtCQUExQixFQUE2QztBQUFDQyxjQUFBQSxLQUFLLEVBQUMsV0FBUDtBQUFtQkMsY0FBQUEsT0FBTyxFQUFDLE1BQTNCO0FBQWtDQyxjQUFBQSxJQUFJLEVBQUMsS0FBSSxDQUFDdEI7QUFBNUMsYUFBN0MsRUFBK0YsWUFBVSxDQUN4RyxDQUREO0FBRUgsV0FORDtBQU9ILFNBUkssTUFRRDtBQUNETyxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxRQUFaO0FBQ0EsZUFBS0MsVUFBTCxDQUFnQkMsUUFBaEIsQ0FBeUJvQyxJQUF6QixHQUFnQ0MsSUFBaEMsQ0FBcUMsWUFBTTtBQUN2Q3hDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVo7QUFDQVEsWUFBQUEsU0FBUyxDQUFDQyxRQUFWLENBQW1CQyxNQUFNLENBQUNDLGtCQUExQixFQUE2QztBQUFDQyxjQUFBQSxLQUFLLEVBQUMsV0FBUDtBQUFtQkMsY0FBQUEsT0FBTyxFQUFDLE1BQTNCO0FBQWtDQyxjQUFBQSxJQUFJLEVBQUMsS0FBSSxDQUFDdEI7QUFBNUMsYUFBN0MsRUFBK0YsWUFBVSxDQUN4RyxDQUREO0FBRUgsV0FKRCxXQUlTLFVBQUNnRCxHQUFELEVBQVM7QUFDZHpDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVo7QUFDQVEsWUFBQUEsU0FBUyxDQUFDQyxRQUFWLENBQW1CQyxNQUFNLENBQUNDLGtCQUExQixFQUE2QztBQUFDQyxjQUFBQSxLQUFLLEVBQUMsV0FBUDtBQUFtQkMsY0FBQUEsT0FBTyxFQUFDLE1BQTNCO0FBQWtDQyxjQUFBQSxJQUFJLEVBQUMsS0FBSSxDQUFDdEI7QUFBNUMsYUFBN0MsRUFBK0YsWUFBVSxDQUN4RyxDQUREO0FBRUgsV0FSRDtBQVNIO0FBQ0o7QUFDSixLQXBIRCxNQW9ISztBQUNEbkIsTUFBQUEsRUFBRSxDQUFDcUQsUUFBSCxDQUFZQyxZQUFaLEdBQTJCRyxVQUEzQixDQUFzQyxLQUFLVixnQkFBM0MsRUFBNEQsSUFBNUQ7O0FBQ0EsVUFBRy9DLEVBQUUsQ0FBQ1UsR0FBSCxDQUFPQyxRQUFQLElBQW1CWCxFQUFFLENBQUNVLEdBQUgsQ0FBT0UsY0FBN0IsRUFBNEM7QUFBRTtBQUMxQyxZQUFHLEtBQUtnQixVQUFMLElBQW1CLEtBQUtBLFVBQUwsQ0FBZ0JDLFFBQXRDLEVBQStDO0FBQzNDLGVBQUtELFVBQUwsQ0FBZ0JDLFFBQWhCLENBQXlCdUMsSUFBekI7QUFDQSxlQUFLeEMsVUFBTCxDQUFnQkMsUUFBaEIsQ0FBeUI4QixPQUF6QjtBQUNBLGVBQUsvQixVQUFMLENBQWdCQyxRQUFoQixHQUEyQixJQUEzQjtBQUNBSCxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsZUFBS0MsVUFBTCxHQUFrQjtBQUNkQyxZQUFBQSxRQUFRLEVBQUVoQixFQUFFLENBQUNpQixjQUFILENBQWtCO0FBQ3hCTCxjQUFBQSxRQUFRLEVBQUUsS0FBS04sSUFEUztBQUV4QjtBQUNBWSxjQUFBQSxLQUFLLEVBQUU7QUFDSGQsZ0JBQUFBLEtBQUssRUFBRSxLQUFLUixtQkFEVDtBQUVIdUIsZ0JBQUFBLEdBQUcsRUFBRSxLQUFLZCxNQUFMLEdBQWUsS0FBS1QsbUJBQUwsR0FBMkIsRUFBNUIsR0FBa0MsQ0FGbEQ7QUFFcUQ7QUFDeER3QixnQkFBQUEsSUFBSSxFQUFHLENBQUMsS0FBS2hCLEtBQUwsR0FBYSxLQUFLUixtQkFBbkIsSUFBMEM7QUFIOUM7QUFIaUIsYUFBbEI7QUFESSxXQUFsQjtBQVdBLGVBQUt5QixXQUFMO0FBQ0FDLFVBQUFBLFNBQVMsQ0FBQ0MsUUFBVixDQUFtQkMsTUFBTSxDQUFDQyxrQkFBMUIsRUFBNkM7QUFBQ0MsWUFBQUEsS0FBSyxFQUFDLFdBQVA7QUFBbUJDLFlBQUFBLE9BQU8sRUFBQyxRQUEzQjtBQUFvQ0MsWUFBQUEsSUFBSSxFQUFDLEtBQUt0QjtBQUE5QyxXQUE3QyxFQUFpRyxZQUFVLENBQzFHLENBREQ7QUFFSDtBQUNKLE9BckJELE1BcUJNLElBQUluQixFQUFFLENBQUNVLEdBQUgsQ0FBT0MsUUFBUCxJQUFtQlgsRUFBRSxDQUFDVSxHQUFILENBQU9nQyxXQUExQixJQUF3Q3RCLE9BQU8sQ0FBQ1QsUUFBUixJQUFvQixJQUFoRSxFQUFzRTtBQUFFO0FBQzFFLFlBQUksS0FBS2lCLFVBQUwsSUFBbUIsS0FBS0EsVUFBTCxDQUFnQkMsUUFBdkMsRUFBaUQ7QUFDN0MsZUFBS0QsVUFBTCxDQUFnQkMsUUFBaEIsQ0FBeUJ1QyxJQUF6QjtBQUNBLGVBQUt4QyxVQUFMLENBQWdCQyxRQUFoQixDQUF5QjhCLE9BQXpCO0FBQ0EsZUFBSy9CLFVBQUwsQ0FBZ0JDLFFBQWhCLEdBQTJCLElBQTNCO0FBQ0FILFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFdBQVo7QUFDQSxlQUFLQyxVQUFMLEdBQWtCO0FBQ2RDLFlBQUFBLFFBQVEsRUFBRWdCLEVBQUUsQ0FBQ2YsY0FBSCxDQUFrQjtBQUN4QkwsY0FBQUEsUUFBUSxFQUFFLEtBQUtOLElBRFM7QUFFeEJZLGNBQUFBLEtBQUssRUFBRTtBQUNIZCxnQkFBQUEsS0FBSyxFQUFFLEtBQUtSLG1CQURUO0FBRUh1QixnQkFBQUEsR0FBRyxFQUFFLEtBQUtkLE1BQUwsR0FBZSxLQUFLVCxtQkFBTCxHQUEyQixFQUE1QixHQUFrQyxDQUZsRDtBQUVxRDtBQUN4RHdCLGdCQUFBQSxJQUFJLEVBQUUsQ0FBQyxLQUFLaEIsS0FBTCxHQUFhLEtBQUtSLG1CQUFuQixJQUEwQztBQUg3QztBQUZpQixhQUFsQjtBQURJLFdBQWxCO0FBVUEsZUFBS3lCLFdBQUw7QUFDQUMsVUFBQUEsU0FBUyxDQUFDQyxRQUFWLENBQW1CQyxNQUFNLENBQUNDLGtCQUExQixFQUE2QztBQUFDQyxZQUFBQSxLQUFLLEVBQUMsV0FBUDtBQUFtQkMsWUFBQUEsT0FBTyxFQUFDLFFBQTNCO0FBQW9DQyxZQUFBQSxJQUFJLEVBQUMsS0FBS3RCO0FBQTlDLFdBQTdDLEVBQWlHLFlBQVUsQ0FDMUcsQ0FERDtBQUVIO0FBQ0osT0FwQkssTUFvQkEsSUFBR25CLEVBQUUsQ0FBQ1UsR0FBSCxDQUFPQyxRQUFQLElBQW1CWCxFQUFFLENBQUNVLEdBQUgsQ0FBT2dDLFdBQTFCLElBQXlDdEIsT0FBTyxDQUFDVCxRQUFSLElBQW9CLElBQWhFLEVBQXFFO0FBQ3ZFLGFBQUtpQixVQUFMLENBQWdCQyxRQUFoQixDQUF5QnVDLElBQXpCO0FBQ0FqQyxRQUFBQSxTQUFTLENBQUNDLFFBQVYsQ0FBbUJDLE1BQU0sQ0FBQ0Msa0JBQTFCLEVBQTZDO0FBQUNDLFVBQUFBLEtBQUssRUFBQyxXQUFQO0FBQW1CQyxVQUFBQSxPQUFPLEVBQUMsSUFBM0I7QUFBZ0NDLFVBQUFBLElBQUksRUFBQyxLQUFLdEI7QUFBMUMsU0FBN0MsRUFBNkYsWUFBVSxDQUN0RyxDQUREO0FBRUg7QUFDSjtBQUNKLEdBL1FpQjtBQWdSbEJlLEVBQUFBLFdBaFJrQix5QkFnUkw7QUFBQTs7QUFDVDtBQUNBO0FBQ0EsUUFBRyxLQUFLTixVQUFMLElBQW1CLEtBQUtBLFVBQUwsQ0FBZ0JDLFFBQXRDLEVBQStDO0FBQzNDLFVBQUc3QixFQUFFLENBQUNVLEdBQUgsQ0FBT0MsUUFBUCxJQUFtQlgsRUFBRSxDQUFDVSxHQUFILENBQU9FLGNBQTFCLElBQTRDWixFQUFFLENBQUNVLEdBQUgsQ0FBT0MsUUFBUCxJQUFtQlgsRUFBRSxDQUFDVSxHQUFILENBQU9nQyxXQUF0RSxJQUFvRjFDLEVBQUUsQ0FBQ1UsR0FBSCxDQUFPQyxRQUFQLElBQW1CWCxFQUFFLENBQUNVLEdBQUgsQ0FBT2dELFVBQWpILEVBQTRIO0FBQUU7QUFDMUgsYUFBSzlCLFVBQUwsQ0FBZ0JDLFFBQWhCLENBQXlCd0MsUUFBekIsQ0FBa0MsVUFBQ0MsSUFBRCxFQUFVO0FBQ3hDNUMsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksb0JBQWtCLE1BQUksQ0FBQ1QsTUFBdkIsR0FBOEIsS0FBOUIsR0FBb0MsTUFBSSxDQUFDRCxLQUFyRDtBQUNBLFVBQUEsTUFBSSxDQUFDVyxVQUFMLENBQWdCQyxRQUFoQixDQUF5QkUsS0FBekIsQ0FBK0JDLEdBQS9CLEdBQXFDLE1BQUksQ0FBQ2QsTUFBTCxHQUFjb0QsSUFBSSxDQUFDcEQsTUFBeEQ7QUFDQSxVQUFBLE1BQUksQ0FBQ1UsVUFBTCxDQUFnQkMsUUFBaEIsQ0FBeUJFLEtBQXpCLENBQStCRSxJQUEvQixHQUFzQyxDQUFDLE1BQUksQ0FBQ2hCLEtBQUwsR0FBYXFELElBQUksQ0FBQ3JELEtBQW5CLElBQTRCLENBQWxFLENBSHdDLENBSXhDO0FBQ0gsU0FMRDtBQU1IOztBQUNELFdBQUtXLFVBQUwsQ0FBZ0JDLFFBQWhCLENBQXlCMEMsT0FBekIsQ0FBaUMsVUFBQ0MsUUFBRCxFQUFjO0FBQzNDOUMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWTZDLFFBQVEsQ0FBQ0MsT0FBckIsR0FBNkJELFFBQVEsQ0FBQ0UsTUFBbEQ7QUFDQXZDLFFBQUFBLFNBQVMsQ0FBQ0MsUUFBVixDQUFtQkMsTUFBTSxDQUFDQyxrQkFBMUIsRUFBNkM7QUFBQ0MsVUFBQUEsS0FBSyxFQUFDLFdBQVA7QUFBbUJDLFVBQUFBLE9BQU8sRUFBQyxNQUFJLENBQUNyQixJQUFoQztBQUFxQ3NCLFVBQUFBLElBQUksRUFBQytCLFFBQVEsQ0FBQ0MsT0FBVCxHQUFpQkQsUUFBUSxDQUFDRTtBQUFwRSxTQUE3QyxFQUF5SCxZQUFVLENBQ2xJLENBREQsRUFGMkMsQ0FJM0M7QUFDQTtBQUNBO0FBQ0E7QUFDSCxPQVJEO0FBU0g7QUFDSjtBQXRTaUIsQ0FBVCxDQUFiO0FBd1NBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUI3RSxNQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQXBwR2FtZSA9IHJlcXVpcmUoXCIuLi9tb2RlbC9hcHBHYW1lXCIpO1xyXG5cclxudmFyIEJhbm5lciA9IGNjLkNsYXNzKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIH0sXHJcbiAgICBjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG51bGw7XHJcbiAgICB9LFxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYoIXRoaXMuaW5zdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UuaW5pdFdpdGhEYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW5pdFdpdGhEYXRhOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0QmFubmVyQWRXaWR0aCA9IDIwMDtcclxuICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkJZVEVEQU5DRV9HQU1FKXsgLy/lpLTmnaHlubPlj7BcclxuICAgICAgICAgICAgY29uc3R7d2luZG93V2lkdGgsd2luZG93SGVpZ2h0fSA9IHR0LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB3aW5kb3dXaWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB3aW5kb3dIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuYWRJZCA9ICczbzhtMTZwcDNlNTRjcWNkNXQnO1xyXG4gICAgICAgICAgICBpZihhcHBHYW1lLmdhbWVTZXJ2ZXJSb29tLmFkQ29uZmlnICYmIGFwcEdhbWUuZ2FtZVNlcnZlclJvb20uYWRDb25maWcuYmFubmVySWQgJiYgYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5hZENvbmZpZy5iYW5uZXJJZC50b3V0aWFvKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRJZCA9IGFwcEdhbWUuZ2FtZVNlcnZlclJvb20uYWRDb25maWcuYmFubmVySWQudG91dGlhby5hZFVuaXRJZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImJhbm5lciDnrKzkuIDmrKHliJvlu7pcIilcclxuICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgYmFubmVyQWQ6IHR0LmNyZWF0ZUJhbm5lckFkKHtcclxuICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5hZElkLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vYWRJbnRlcnZhbHM6MzAsXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMudGFyZ2V0QmFubmVyQWRXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLmhlaWdodCAtICh0aGlzLnRhcmdldEJhbm5lckFkV2lkdGggLyAxNikgKiA5LCAvLyDmoLnmja7ns7vnu5/nuqblrprlsLrlr7jorqHnrpflh7rlub/lkYrpq5jluqZcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA6ICh0aGlzLndpZHRoIC0gdGhpcy50YXJnZXRCYW5uZXJBZFdpZHRoKSAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFNpemUoKTtcclxuICAgICAgICAgICAgaHR0cFV0aWxzLmh0dHBQb3N0KGNvbnN0cy5IVFRQX1JFQ09SRF9TRVJWRVIse3RpdGxlOiflub/lkYrkvY1iYW5uZXInLGNvbnRlbnQ6J+WIm+W7uuaIkOWKnycsZGVzYzp0aGlzLmFkSWR9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNlIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUgJiYgYXBwR2FtZS5wbGF0Zm9ybSA9PSAnUVEnKXtcclxuICAgICAgICAgICAgY29uc3QgeyB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0IH0gPSBxcS5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gd2luZG93V2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gd2luZG93SGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLmFkSWQgPSAnNGVmMjE1Y2E1YWY5YzNiNDU0ZTlkMjJhNjc2Zjc5OTInO1xyXG4gICAgICAgICAgICBpZihhcHBHYW1lLmdhbWVTZXJ2ZXJSb29tLmFkQ29uZmlnICYmIGFwcEdhbWUuZ2FtZVNlcnZlclJvb20uYWRDb25maWcuYmFubmVySWQgJiYgYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5hZENvbmZpZy5iYW5uZXJJZC5RUSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkSWQgPSBhcHBHYW1lLmdhbWVTZXJ2ZXJSb29tLmFkQ29uZmlnLmJhbm5lcklkLlFRLmFkVW5pdElkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmFubmVyIOesrOS4gOasoeWIm+W7ulwiKVxyXG4gICAgICAgICAgICAvL3RoaXMudGFyZ2V0QmFubmVyQWRXaWR0aCA9IDMwMDtcclxuICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgYmFubmVyQWQ6IHFxLmNyZWF0ZUJhbm5lckFkKHtcclxuICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5hZElkLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2lkdGg6IHRoaXMudGFyZ2V0QmFubmVyQWRXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90b3A6IHRoaXMuaGVpZ2h0IC0gKHRoaXMudGFyZ2V0QmFubmVyQWRXaWR0aCAvIDE2KSAqIDksIC8vIOagueaNruezu+e7n+e6puWumuWwuuWvuOiuoeeul+WHuuW5v+WRiumrmOW6plxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xlZnQ6ICh0aGlzLndpZHRoIC0gdGhpcy50YXJnZXRCYW5uZXJBZFdpZHRoKSAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnRhcmdldEJhbm5lckFkV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5oZWlnaHQgLSAodGhpcy50YXJnZXRCYW5uZXJBZFdpZHRoIC8gMTYpICogOSwgLy8g5qC55o2u57O757uf57qm5a6a5bC65a+46K6h566X5Ye65bm/5ZGK6auY5bqmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICh0aGlzLndpZHRoIC0gdGhpcy50YXJnZXRCYW5uZXJBZFdpZHRoKSAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFNpemUoKTtcclxuICAgICAgICAgICAgaHR0cFV0aWxzLmh0dHBQb3N0KGNvbnN0cy5IVFRQX1JFQ09SRF9TRVJWRVIse3RpdGxlOiflub/lkYrkvY1iYW5uZXInLGNvbnRlbnQ6J+WIm+W7uuaIkOWKnycsZGVzYzp0aGlzLmFkSWR9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUgJiYgYXBwR2FtZS5wbGF0Zm9ybSA9PSAnV1gnKXtcclxuICAgICAgICAgICAgY29uc3QgeyB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0IH0gPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gd2luZG93V2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gd2luZG93SGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLmFkSWQgPSAnNGVmMjE1Y2E1YWY5YzNiNDU0ZTlkMjJhNjc2Zjc5OTInO1xyXG4gICAgICAgICAgICBpZihhcHBHYW1lLmdhbWVTZXJ2ZXJSb29tLmFkQ29uZmlnICYmIGFwcEdhbWUuZ2FtZVNlcnZlclJvb20uYWRDb25maWcuYmFubmVySWQgJiYgYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5hZENvbmZpZy5iYW5uZXJJZC5XWCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkSWQgPSBhcHBHYW1lLmdhbWVTZXJ2ZXJSb29tLmFkQ29uZmlnLmJhbm5lcklkLldYLmFkVW5pdElkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmFubmVyIOesrOS4gOasoeWIm+W7ulwiKVxyXG4gICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBiYW5uZXJBZDogd3guY3JlYXRlQmFubmVyQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiB0aGlzLmFkSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMudGFyZ2V0QmFubmVyQWRXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLmhlaWdodCAtICh0aGlzLnRhcmdldEJhbm5lckFkV2lkdGggLyAxNikgKiA5LCAvLyDmoLnmja7ns7vnu5/nuqblrprlsLrlr7jorqHnrpflh7rlub/lkYrpq5jluqZcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogKHRoaXMud2lkdGggLSB0aGlzLnRhcmdldEJhbm5lckFkV2lkdGgpIC8gMixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2l6ZSgpO1xyXG4gICAgICAgICAgICBodHRwVXRpbHMuaHR0cFBvc3QoY29uc3RzLkhUVFBfUkVDT1JEX1NFUlZFUix7dGl0bGU6J+W5v+WRiuS9jWJhbm5lcicsY29udGVudDon5Yib5bu65oiQ5YqfJyxkZXNjOnRoaXMuYWRJZH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNjaGVkdWxlQ2FsbEJhY2s6ZnVuY3Rpb24oKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm7np5LlkI7liLfmlrBcIilcclxuICAgICAgICB0aGlzLnBsYXlCYW5uZXIoMyk7XHJcbiAgICAgICAgdGhpcy5wbGF5QmFubmVyKDIpO1xyXG4gICAgfSxcclxuICAgIC8qXHJcbiAgICAqc2NlbmVJZCAxIOaZrumAmueahOWxleekuiAgIDIgTuenkuWIt+aWsOWxleekuiAgIDMg6ZqQ6JePXHJcbiAgICAqL1xyXG4gICAgcGxheUJhbm5lcjpmdW5jdGlvbihzY2VuZUlkLHJlZnJlc2hUaW1lID0gMzApe1xyXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQllURURBTkNFX0dBTUUgJiYgYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5nYW1lQ29uZmlnRGF0YSYmXHJcbiAgICAgICAgICAgIGFwcEdhbWUuZ2FtZVNlcnZlclJvb20uZ2FtZUNvbmZpZ0RhdGEuaXNiYW5uZXIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImJhbm5lciByZXR1cm5cIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5lbmFibGVGb3JUYXJnZXQodGhpcyk7XHJcbiAgICAgICAgaWYoc2NlbmVJZCE9Myl7XHJcbiAgICAgICAgICAgIGlmKHNjZW5lSWQ9PTIpe1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkuc2NoZWR1bGUodGhpcy5zY2hlZHVsZUNhbGxCYWNrLHRoaXMscmVmcmVzaFRpbWUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnVuc2NoZWR1bGUodGhpcy5zY2hlZHVsZUNhbGxCYWNrLHRoaXMpIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkJZVEVEQU5DRV9HQU1FKXsgLy/lpLTmnaHlubPlj7BcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2xvYmFsRGF0YSAmJiB0aGlzLmdsb2JhbERhdGEuYmFubmVyQWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmFubmVyIOmakOiXj1wiKVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJiYW5uZXIg5Yib5bu6XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYW5uZXJBZDogdHQuY3JlYXRlQmFubmVyQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6IHRoaXMuYWRJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWRJbnRlcnZhbHM6MzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnRhcmdldEJhbm5lckFkV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLmhlaWdodCAtICh0aGlzLnRhcmdldEJhbm5lckFkV2lkdGggLyAxNikgKiA5LCAvLyDmoLnmja7ns7vnu5/nuqblrprlsLrlr7jorqHnrpflh7rlub/lkYrpq5jluqZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0IDogKHRoaXMud2lkdGggLSB0aGlzLnRhcmdldEJhbm5lckFkV2lkdGgpIC8gMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hTaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaHR0cFV0aWxzLmh0dHBQb3N0KGNvbnN0cy5IVFRQX1JFQ09SRF9TRVJWRVIse3RpdGxlOiflub/lkYrkvY1iYW5uZXInLGNvbnRlbnQ6J+WIm+W7uuaIkOWKnycsZGVzYzp0aGlzLmFkSWR9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ZWxzZSBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkJBSURVX0dBTUUpey8v55m+5bqmXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmdsb2JhbERhdGEgJiYgdGhpcy5nbG9iYWxEYXRhLmJhbm5lckFkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuYmFubmVyQWQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5iYW5uZXJBZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdHt3aW5kb3dXaWR0aCx3aW5kb3dIZWlnaHR9ID0gc3dhbi5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpbmRvd1dpZHRoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB3aW5kb3dIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBpZihhcHBHYW1lLmdhbWVTZXJ2ZXJSb29tLmFkQ29uZmlnICYmIGFwcEdhbWUuZ2FtZVNlcnZlclJvb20uYWRDb25maWcuYmFubmVySWQgJiYgYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5hZENvbmZpZy5iYW5uZXJJZC5iYWlkdSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZElkID0gYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5hZENvbmZpZy5iYW5uZXJJZC5iYWlkdS5hZFVuaXRJZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGFwcEdhbWUuZ2FtZVNlcnZlclJvb20uYWRDb25maWcgJiYgYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5hZENvbmZpZy5iYW5uZXJJZCAmJiBhcHBHYW1lLmdhbWVTZXJ2ZXJSb29tLmFkQ29uZmlnLmJhbm5lcklkLmJhaWR1KXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcElkID0gYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5hZENvbmZpZy5iYW5uZXJJZC5iYWlkdS5hcHBTaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFubmVyQWQ6IHN3YW4uY3JlYXRlQmFubmVyQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5hZElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBTaWQ6dGhpcy5hcHBJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLmhlaWdodCAtICh0aGlzLnRhcmdldEJhbm5lckFkV2lkdGggLyAxNikgKiA5LCAvLyDmoLnmja7ns7vnu5/nuqblrprlsLrlr7jorqHnrpflh7rlub/lkYrpq5jluqZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgOiAodGhpcy53aWR0aCAtIHRoaXMudGFyZ2V0QmFubmVyQWRXaWR0aCkgLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgaHR0cFV0aWxzLmh0dHBQb3N0KGNvbnN0cy5IVFRQX1JFQ09SRF9TRVJWRVIse3RpdGxlOiflub/lkYrkvY1iYW5uZXInLGNvbnRlbnQ6J+WIm+W7uuaIkOWKnycsZGVzYzp0aGlzLmFkSWR9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSAmJiBhcHBHYW1lLnBsYXRmb3JtID09ICdRUScpey8vUVFcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2xvYmFsRGF0YSAmJiB0aGlzLmdsb2JhbERhdGEuYmFubmVyQWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5iYW5uZXJBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmJhbm5lckFkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0e3dpbmRvd1dpZHRoLHdpbmRvd0hlaWdodH0gPSBxcS5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpbmRvd1dpZHRoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB3aW5kb3dIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBpZihhcHBHYW1lLmdhbWVTZXJ2ZXJSb29tLmFkQ29uZmlnICYmIGFwcEdhbWUuZ2FtZVNlcnZlclJvb20uYWRDb25maWcuYmFubmVySWQgJiYgYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5hZENvbmZpZy5iYW5uZXJJZC5RUSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZElkID0gYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5hZENvbmZpZy5iYW5uZXJJZC5RUS5hZFVuaXRJZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBiYW5uZXJBZDogcXEuY3JlYXRlQmFubmVyQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5hZElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMuaGVpZ2h0IC0gKHRoaXMudGFyZ2V0QmFubmVyQWRXaWR0aCAvIDE2KSAqIDksIC8vIOagueaNruezu+e7n+e6puWumuWwuuWvuOiuoeeul+WHuuW5v+WRiumrmOW6plxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA6ICh0aGlzLndpZHRoIC0gdGhpcy50YXJnZXRCYW5uZXJBZFdpZHRoKSAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hTaXplKCk7XHJcbiAgICAgICAgICAgICAgICBodHRwVXRpbHMuaHR0cFBvc3QoY29uc3RzLkhUVFBfUkVDT1JEX1NFUlZFUix7dGl0bGU6J+W5v+WRiuS9jWJhbm5lcicsY29udGVudDon5Yib5bu65oiQ5YqfJyxkZXNjOnRoaXMuYWRJZH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2xvYmFsRGF0YSAmJiB0aGlzLmdsb2JhbERhdGEuYmFubmVyQWQpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmkq3mlL5iYW5uZXLlub/lkYpcIilcclxuICAgICAgICAgICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQkFJRFVfR0FNRSl7Ly/nmb7luqZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuYmFubmVyQWQub25Mb2FkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eZvuW6pmJhbm5lciDliqDovb3lrozmiJAnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmJhbm5lckFkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bGV56S65oiQ5YqfXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodHRwVXRpbHMuaHR0cFBvc3QoY29uc3RzLkhUVFBfUkVDT1JEX1NFUlZFUix7dGl0bGU6J+W5v+WRiuS9jWJhbm5lcicsY29udGVudDon5bGV56S65oiQ5YqfJyxkZXNjOnRoaXMuYWRJZH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWxleekuuWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHR0cFV0aWxzLmh0dHBQb3N0KGNvbnN0cy5IVFRQX1JFQ09SRF9TRVJWRVIse3RpdGxlOiflub/lkYrkvY1iYW5uZXInLGNvbnRlbnQ6J+WxleekuuWksei0pScsZGVzYzp0aGlzLmFkSWR9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FICYmIGFwcEdhbWUucGxhdGZvcm0gPT0gJ1FRJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmJhbm5lckFkLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdxcUJhbm5lciDliqDovb3lrozmiJAnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmJhbm5lckFkLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlsZXnpLrmiJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHR0cFV0aWxzLmh0dHBQb3N0KGNvbnN0cy5IVFRQX1JFQ09SRF9TRVJWRVIse3RpdGxlOiflub/lkYrkvY1iYW5uZXInLGNvbnRlbnQ6J+WxleekuuaIkOWKnycsZGVzYzp0aGlzLmFkSWR9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvIDlp4vlsZXnpLrlub/lkYpcIilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuYmFubmVyQWQuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWxleekuuaIkOWKn1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBodHRwVXRpbHMuaHR0cFBvc3QoY29uc3RzLkhUVFBfUkVDT1JEX1NFUlZFUix7dGl0bGU6J+W5v+WRiuS9jWJhbm5lcicsY29udGVudDon5bGV56S65oiQ5YqfJyxkZXNjOnRoaXMuYWRJZH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWxleekuuWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBodHRwVXRpbHMuaHR0cFBvc3QoY29uc3RzLkhUVFBfUkVDT1JEX1NFUlZFUix7dGl0bGU6J+W5v+WRiuS9jWJhbm5lcicsY29udGVudDon5bGV56S65aSx6LSlJyxkZXNjOnRoaXMuYWRJZH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkudW5zY2hlZHVsZSh0aGlzLnNjaGVkdWxlQ2FsbEJhY2ssdGhpcykgXHJcbiAgICAgICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQllURURBTkNFX0dBTUUpeyAvL+WktOadoeW5s+WPsFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5nbG9iYWxEYXRhICYmIHRoaXMuZ2xvYmFsRGF0YS5iYW5uZXJBZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmJhbm5lckFkLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuYmFubmVyQWQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5iYW5uZXJBZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlrZfoioLlubPlj7BiYW5uZXIg6ZSA5q+BXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYW5uZXJBZDogdHQuY3JlYXRlQmFubmVyQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6IHRoaXMuYWRJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWRJbnRlcnZhbHM6MzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnRhcmdldEJhbm5lckFkV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLmhlaWdodCAtICh0aGlzLnRhcmdldEJhbm5lckFkV2lkdGggLyAxNikgKiA5LCAvLyDmoLnmja7ns7vnu5/nuqblrprlsLrlr7jorqHnrpflh7rlub/lkYrpq5jluqZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0IDogKHRoaXMud2lkdGggLSB0aGlzLnRhcmdldEJhbm5lckFkV2lkdGgpIC8gMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hTaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaHR0cFV0aWxzLmh0dHBQb3N0KGNvbnN0cy5IVFRQX1JFQ09SRF9TRVJWRVIse3RpdGxlOiflub/lkYrkvY1iYW5uZXInLGNvbnRlbnQ6J+makOiXj+WIm+W7uuaIkOWKnycsZGVzYzp0aGlzLmFkSWR9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FJiYgYXBwR2FtZS5wbGF0Zm9ybSA9PSAnV1gnKSB7IC8v5b6u5L+h5bmz5Y+wXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxEYXRhICYmIHRoaXMuZ2xvYmFsRGF0YS5iYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5iYW5uZXJBZC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmJhbm5lckFkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuYmFubmVyQWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmFubmVyIOmUgOavgVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFubmVyQWQ6IHd4LmNyZWF0ZUJhbm5lckFkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiB0aGlzLmFkSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnRhcmdldEJhbm5lckFkV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLmhlaWdodCAtICh0aGlzLnRhcmdldEJhbm5lckFkV2lkdGggLyAxNikgKiA5LCAvLyDmoLnmja7ns7vnu5/nuqblrprlsLrlr7jorqHnrpflh7rlub/lkYrpq5jluqZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAodGhpcy53aWR0aCAtIHRoaXMudGFyZ2V0QmFubmVyQWRXaWR0aCkgLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFNpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICBodHRwVXRpbHMuaHR0cFBvc3QoY29uc3RzLkhUVFBfUkVDT1JEX1NFUlZFUix7dGl0bGU6J+W5v+WRiuS9jWJhbm5lcicsY29udGVudDon6ZqQ6JeP5Yib5bu65oiQ5YqfJyxkZXNjOnRoaXMuYWRJZH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2UgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSAmJiBhcHBHYW1lLnBsYXRmb3JtID09ICdRUScpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmJhbm5lckFkLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGh0dHBVdGlscy5odHRwUG9zdChjb25zdHMuSFRUUF9SRUNPUkRfU0VSVkVSLHt0aXRsZTon5bm/5ZGK5L2NYmFubmVyJyxjb250ZW50OifpmpDol48nLGRlc2M6dGhpcy5hZElkfSxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVmcmVzaFNpemUoKXtcclxuICAgICAgICAvLyDlsLrlr7josIPmlbTml7bkvJrop6blj5Hlm57osIPvvIzpgJrov4flm57osIPmi7/liLDnmoTlub/lkYrnnJ/lrp7lrr3pq5jlho3ov5vooYzlrprkvY3pgILphY3lpITnkIZcclxuICAgICAgICAvLyDms6jmhI/vvJrlpoLmnpzlnKjlm57osIPph4zlho3mrKHosIPmlbTlsLrlr7jvvIzopoHnoa7kv53kuI3opoHop6blj5Hmrbvlvqrnjq/vvIHvvIHvvIFcclxuICAgICAgICBpZih0aGlzLmdsb2JhbERhdGEgJiYgdGhpcy5nbG9iYWxEYXRhLmJhbm5lckFkKXtcclxuICAgICAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5CWVRFREFOQ0VfR0FNRSB8fCBjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FfHwgY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5CQUlEVV9HQU1FKXsgLy/lpLTmnaHlubPlj7BcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5iYW5uZXJBZC5vblJlc2l6ZSgoc2l6ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmFubmVyIHNoZXpoaeWkp+Wwj1wiK3RoaXMuaGVpZ2h0K1wiICAgXCIrdGhpcy53aWR0aClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuYmFubmVyQWQuc3R5bGUudG9wID0gdGhpcy5oZWlnaHQgLSBzaXplLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuYmFubmVyQWQuc3R5bGUubGVmdCA9ICh0aGlzLndpZHRoIC0gc2l6ZS53aWR0aCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5nbG9iYWxEYXRhLmJhbm5lckFkLm9mZlJlc2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmJhbm5lckFkLm9uRXJyb3IoKGxpc3RlbmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJhbm5lciDlh7rplJlcIitsaXN0ZW5lci5lcnJDb2RlK2xpc3RlbmVyLmVyck1zZylcclxuICAgICAgICAgICAgICAgIGh0dHBVdGlscy5odHRwUG9zdChjb25zdHMuSFRUUF9SRUNPUkRfU0VSVkVSLHt0aXRsZTon5bm/5ZGK5L2NYmFubmVyJyxjb250ZW50OnRoaXMuYWRJZCxkZXNjOmxpc3RlbmVyLmVyckNvZGUrbGlzdGVuZXIuZXJyTXNnfSxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBhcHBHYW1lLmVtaXR0ZXIuZW1pdChjb25zdHMuTE9DQUxfRVZFTlRfUE9QVVBfTE9BRFRJUCwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbnRlbnQ6XCLlh7rplJnllabvvIHvvIHvvIFcIlxyXG4gICAgICAgICAgICAgICAgLy8gIH0pO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLmdsb2JhbERhdGEuYmFubmVyQWQub2ZmRXJyb3IoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufSk7XHJcbm1vZHVsZS5leHBvcnRzID0gQmFubmVyOyJdfQ==