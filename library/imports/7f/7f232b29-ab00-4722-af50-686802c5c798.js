"use strict";
cc._RF.push(module, '7f232spqwBHIq9QaGgCxceY', 'qqAppBox');
// gameComon/scripts/ad/qqAppBox.js

"use strict";

var QQAppBOX = cc.Class({
  "extends": cc.Component,
  properties: {},
  ctor: function ctor() {
    this.instance = null;
  },
  statics: {
    create: function create(data) {
      if (!this.instance) {
        this.instance = new QQAppBOX();
        this.instance.initWithData(data);
        return this.instance;
      }
    }
  },
  initWithData: function initWithData(data) {
    this.boxId = '';

    if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'QQ') {
      //QQ  
      var res = qq.getSystemInfoSync();
      this.width = res.windowWidth;
      this.height = res.windowHeight; // var Version2 = util.compareVersion(res.SDKVersion,"1.7.1");
      // if(Version2 > 0){

      this.boxId = "686b9ffc40992b21d352e841f3bb2085";

      if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.boxId && appGame.gameServerRoom.adConfig.boxId.QQ) {
        this.boxId = appGame.gameServerRoom.adConfig.boxId.QQ.adUnitId;
      }

      this.globalData = {
        appbox: qq.createAppBox({
          adUnitId: this.boxId
        })
      };
      httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
        title: '广告盒子',
        content: '创建成功',
        desc: this.boxId
      }, function () {}); // }else{
      //     httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'广告盒子',content:'基础库版本太低不创建广告盒子',desc:''},function(){})
      // }    
    }
  },
  playBox: function playBox(show) {
    var _this = this;

    if (this.globalData && this.globalData.appbox) {
      if (show) {
        this.globalData.appbox.load().then(function () {
          _this.globalData.appbox.show();

          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '广告盒子',
            content: '展示成功',
            desc: _this.boxId
          }, function () {});
        });
      } else {
        this.globalData.appbox.destroy();
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: '广告盒子',
          content: '隐藏',
          desc: this.boxId
        }, function () {});
      }
    }
  }
});
module.exports = QQAppBOX;

cc._RF.pop();