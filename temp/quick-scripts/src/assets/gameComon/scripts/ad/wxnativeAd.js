"use strict";
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