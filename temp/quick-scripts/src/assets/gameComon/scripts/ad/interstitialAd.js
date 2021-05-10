"use strict";
cc._RF.push(module, '65bb3OPXhxMDIngU6dETA4S', 'interstitialAd');
// gameComon/scripts/ad/interstitialAd.js

"use strict";

var InterstitialAd = cc.Class({
  properties: {},
  ctor: function ctor() {
    this.instance = null;
  },
  statics: {
    create: function create(data) {
      if (!this.instance) {
        this.instance = new InterstitialAd();
        this.instance.initWithData(data);
        return this.instance;
      }
    }
  },
  initWithData: function initWithData(data) {
    this.adId = '';

    if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'QQ') {
      //qq
      this.adId = 'e93d7d4378e53c49b258b80960fb84c1';

      if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.interstitialId && appGame.gameServerRoom.adConfig.interstitialId.QQ) {
        this.adId = appGame.gameServerRoom.adConfig.interstitialId.QQ.adUnitId;
      }

      this.globalData = {
        interstitialAd: qq.createInterstitialAd({
          adUnitId: this.adId
        })
      };
      console.log("插屏广告==" + this.adId);
      httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
        title: '插屏广告',
        content: '创建成功',
        desc: this.adId
      }, function () {});
    } else if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'WX') {
      //微信
      this.adId = 'c5b484afd6953432';

      if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.interstitialId && appGame.gameServerRoom.adConfig.interstitialId.WX) {
        this.adId = appGame.gameServerRoom.adConfig.interstitialId.WX.adUnitId;
      }

      httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
        title: '插屏广告',
        content: '创建成功',
        desc: this.adId
      }, function () {});
    } else if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
      //字节
      this.adId = '15c24vd9ppqti8jgb3';

      if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.interstitialId && appGame.gameServerRoom.adConfig.interstitialId.toutiao) {
        this.adId = appGame.gameServerRoom.adConfig.interstitialId.toutiao.adUnitId;
      }

      httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
        title: '插屏广告',
        content: '创建成功',
        desc: this.adId
      }, function () {});
    }
  },
  playAd: function playAd() {
    var _this = this;

    if (cc.sys.platform == cc.sys.BYTEDANCE_GAME && appGame.gameServerRoom.gameConfigData && appGame.gameServerRoom.gameConfigData.isbanner) {
      console.log("banner return");
      return;
    }

    console.log("播放插屏广告==");

    if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
      //头条平台
      if (this.globalData && this.globalData.interstitialAd) {
        this.globalData.interstitialAd.destroy();
        this.globalData.interstitialAd = null;
      }

      this.globalData = {
        interstitialAd: tt.createInterstitialAd({
          adUnitId: this.adId
        })
      };
      httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
        title: '插屏广告',
        content: '创建成功',
        desc: this.adId
      }, function () {});
      this.globalData.interstitialAd.load().then(function () {
        console.log("插屏显示成功");
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: '插屏广告',
          content: '显示成功',
          desc: _this.adId
        }, function () {});
        return _this.globalData.interstitialAd.show();
      })["catch"](function (err) {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: '插屏广告',
          content: '显示失败',
          desc: _this.adId
        }, function () {});
        console.log("插屏组件出现问题", err);
      });
      this.globalData.interstitialAd.onError(function (listener) {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: '插屏广告',
          content: _this.adId,
          desc: listener.errCode + listener.errMsg
        }, function () {});
      });
    } else if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'WX') {
      //微信平台
      if (this.globalData && this.globalData.interstitialAd) {
        this.globalData.interstitialAd.offError();
        this.globalData.interstitialAd.destroy();
        this.globalData.interstitialAd = null;
        console.log("销毁");
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: '插屏广告',
          content: '销毁广告',
          desc: this.adId
        }, function () {});
      }

      this.globalData = {
        /* 建议放在onReady里执行，提前加载广告 */
        InterstitialAd: wx.createInterstitialAd({
          adUnitId: this.adId
        })
      };
      httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
        title: '插屏广告',
        content: '创建成功',
        desc: this.adId
      }, function () {});
      this.globalData.InterstitialAd.load()["catch"](function (err) {
        console.error('load', err);
      });
      this.globalData.InterstitialAd.onLoad(function () {
        console.log('onLoad event emit');

        _this.globalData.InterstitialAd.show()["catch"](function (err) {
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '插屏广告',
            content: '显示成功',
            desc: _this.adId
          }, function () {});
          console.error('show', err);
        });
      });
      this.globalData.InterstitialAd.onClose(function () {
        console.log('close event emit');
      });
      this.globalData.InterstitialAd.onError(function (listener) {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: '插屏广告',
          content: _this.adId,
          desc: listener.errCode + listener.errMsg
        }, function () {});
      });
      /* 建议放在需要展示插屏广告的时机执行 */
    } else {
      if (this.globalData && this.globalData.interstitialAd) {
        var interstitialAd = this.globalData.interstitialAd;
        interstitialAd.load().then(function () {
          console.log("插屏显示成功");
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '插屏广告',
            content: '显示成功',
            desc: _this.adId
          }, function () {});
          return interstitialAd.show();
        })["catch"](function (err) {
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '插屏广告',
            content: '显示失败',
            desc: _this.adId
          }, function () {});
          console.log("插屏组件出现问题", err);
        });
      }
    }
  }
});
module.exports = InterstitialAd;

cc._RF.pop();