"use strict";
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
              //top: this.height - (this.targetBannerAdWidth / 16) * 9, // 根据系统约定尺寸计算出广告高度,
              // width: this.targetBannerAdWidth,
              left: 16,
              top: 100
            }
          })
        };
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: '积木广告',
          content: '创建成功',
          desc: videoId
        }, function () {}); //this.refreshSize();

        this.globalData.blockAd.onError(function (res) {
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '积木广告',
            content: videoId,
            desc: listener.errCode + listener.errMsg
          }, function () {});
        });
        this.globalData.blockAd.onLoad(function (res) {
          console.log('globalData blockAd onLoad', res);

          _this.globalData.blockAd.show().then(function () {
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: '积木广告',
              content: '展示成功',
              desc: videoId
            }, function () {});
          })["catch"](function (res) {
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: '积木广告',
              content: '展示失败',
              desc: videoId
            }, function () {});
          });
        });
      } else {
        if (this.globalData && this.globalData.blockAd) {
          this.globalData.blockAd.destroy();
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '积木广告',
            content: '隐藏',
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
          console.log("积木广告 shezhi大小" + _this2.height + "   " + _this2.width);
          _this2.globalData.blockAd.style.top = _this2.height - size.height;
          _this2.globalData.blockAd.style.left = (_this2.width - size.width) / 2;
        });
      }
    }
  }
});
module.exports = BlockAd;

cc._RF.pop();