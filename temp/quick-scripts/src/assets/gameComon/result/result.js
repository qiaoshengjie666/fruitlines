"use strict";
cc._RF.push(module, '33fa5PoD/RJD6LgBnT5ywP1', 'result');
// gameComon/result/result.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    title: cc.Label,
    contentLabel: cc.Label,
    nextBtn: cc.Button,
    backBtn: cc.Button,
    nextBtnCallback: null,
    backBtnCallback: null
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.nextBtn.node.on(cc.Node.EventType.TOUCH_END, this.onNextBtnClicked, this);
    this.backBtn.node.on(cc.Node.EventType.TOUCH_END, this.onBackBtnClicked, this);
  },
  start: function start() {},

  /**
   * @param opts
   * nextCB 下一局按钮回调
   * backCB 重玩本关按钮回调
   */
  show: function show(opts) {
    opts = opts || {};

    if (opts.nextCB) {
      this.nextBtnCallback = opts.nextCB;
    }

    if (opts.backCB) {
      this.backBtnCallback = opts.backCB;
    }

    if (opts.info) {
      this.info = opts.info;
    }

    if (opts.config) {
      if (this.info.isWin) {
        this.resultConfig = opts.config.win;
      } else {
        this.resultConfig = opts.config.fail;
      }
    }

    this.refreshUI();
  },
  refreshUI: function refreshUI() {
    if (this.info) {
      this.title.string = this.info.isWin ? this.resultConfig.title : this.resultConfig.title;
      this.contentLabel.string = this.info.isWin ? this.resultConfig.content : this.resultConfig.content;
      this.nextBtn.node.getChildByName('Background').getChildByName('New Label').getComponent(cc.Label).string = this.resultConfig.btn1.name;
      this.backBtn.node.getChildByName('Background').getChildByName('New Label').getComponent(cc.Label).string = this.resultConfig.btn2.name;
      this.nextBtn.node.getChildByName('Background').getChildByName('icon').active = this.resultConfig.btn1.icon;
      this.backBtn.node.getChildByName('Background').getChildByName('icon').active = this.resultConfig.btn2.icon;
    }

    if (appGame.interstitialAd) {
      appGame.interstitialAd.playAd();
    }

    appGame.banner.playBanner(2);
    appGame.gridAd.playGridAd(true);
    appGame.nativeAd.playNativeAd(true);
    appGame.appBoxAd.playBox(true);
    appGame.blockAd.playBlockad(true, 4);
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '结算',
      content: '打开结算界面'
    }, function () {});
  },
  onNextBtnClicked: function onNextBtnClicked(event) {
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '结算',
      content: '下一关',
      desc: '点击'
    }, function () {});
    var isPlayVideo = false;
    var isForce = true;

    if (this.resultConfig) {
      isPlayVideo = this.resultConfig.btn1.video;
      isForce = this.resultConfig.btn1.force;
    }

    if (isPlayVideo) {
      appGame.videoBanner.playVideoAd(3, isForce, function (isSuc) {
        this.nextBtnCallback && this.nextBtnCallback(this.info.isWin);
        this.hide();
      }.bind(this));
    } else {
      this.nextBtnCallback && this.nextBtnCallback(this.info.isWin);
      this.hide();
    }
  },
  onBackBtnClicked: function onBackBtnClicked(event) {
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '结算',
      content: '再来一局+点击'
    }, function () {});
    var isPlayVideo = false;
    var isForce = true;

    if (this.resultConfig) {
      isPlayVideo = this.resultConfig.btn2.video;
      isForce = this.resultConfig.btn2.force;
    }

    if (isPlayVideo) {
      //配置需要播放视频
      appGame.videoBanner.playVideoAd(3, isForce, function (isSuc) {
        console.log("看视频成功");
        this.backBtnCallback && this.backBtnCallback(this.info.isWin);
        this.hide();
      }.bind(this));
    } else {
      //不用播放视频
      this.backBtnCallback && this.backBtnCallback(this.info.isWin);
      this.hide();
    }
  },
  hide: function hide() {
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '结算',
      content: '关闭结算界面'
    }, function () {});
    appGame.banner.playBanner(3);
    appGame.gridAd.playGridAd(false);
    appGame.nativeAd.playNativeAd(false);
    appGame.appBoxAd.playBox(false);
    appGame.blockAd.playBlockad(false);
    this.node.removeFromParent();
  } // update (dt) {},

});

cc._RF.pop();