"use strict";
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