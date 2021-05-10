"use strict";
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