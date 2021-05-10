"use strict";
cc._RF.push(module, 'ec134IHnxVI363+v185uOut', 'revive');
// gameComon/result/revive.js

"use strict";

var backBtnTimeOut;
var continueBtnTimeOut;
var countDownInterval;
cc.Class({
  "extends": cc.Component,
  properties: {
    reviveBtn: cc.Button,
    backBtn: cc.Button,
    clock: cc.Node,
    reviveBtnCallback: null,
    backBtnCallback: null
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.reviveBtn.node.on(cc.Node.EventType.TOUCH_END, this.onReviveBtnClicked, this);
    this.backBtn.node.on(cc.Node.EventType.TOUCH_END, this.onBackBtnClicked, this);
  },
  start: function start() {},

  /**
   * @param opts
   * backCB 放弃按钮回调
   * reviveCB 复活按钮回调
   */
  show: function show(opts) {
    opts = opts || {};

    if (opts.reviveCB) {
      this.reviveBtnCallback = opts.reviveCB;
    }

    if (opts.backCB) {
      this.backBtnCallback = opts.backCB;
    }

    if (opts.config) {
      this.reviveConfig = opts.config;
    }

    this.refreshUI();
  },
  refreshUI: function refreshUI() {
    this._count = 0;
    this.clock.getComponent(cc.ProgressBar).progress = 1;

    if (this.reviveConfig.countdown) {
      this.updateTime(1, this.reviveConfig.countdown, this.reviveConfig.countdown);
    }

    if (this.reviveConfig.btn1) {
      this.reviveBtn.node.getChildByName('Background').getChildByName('New Label').getComponent(cc.Label).string = this.reviveConfig.btn1.name;
      this.reviveBtn.node.getChildByName('Background').getChildByName('icon').active = this.reviveConfig.btn1.icon;
      clearTimeout(continueBtnTimeOut);

      if (this.reviveConfig.btn1.delayTime >= 0) {
        continueBtnTimeOut = setTimeout(function () {
          this.reviveBtn.node.active = true;
        }.bind(this), this.reviveConfig.btn1.delayTime * 1000);
      }
    }

    if (this.reviveConfig.btn2) {
      this.backBtn.node.getChildByName('Background').getChildByName('New Label').getComponent(cc.Label).string = this.reviveConfig.btn2.name;
      this.backBtn.node.getChildByName('Background').getChildByName('icon').active = this.reviveConfig.btn2.icon;
      this.backBtn.node.active = false;
      clearTimeout(backBtnTimeOut);

      if (this.reviveConfig.btn2.delayTime >= 0) {
        backBtnTimeOut = setTimeout(function () {
          this.backBtn.node.active = true;
        }.bind(this), this.reviveConfig.btn2.delayTime * 1000);
      }
    }

    if (appGame.interstitialAd) {
      appGame.interstitialAd.playAd();
    }

    appGame.banner.playBanner(2);
    appGame.appBoxAd.playBox(true);
    appGame.blockAd.playBlockad(true, 4);
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '复活',
      content: '打开复活界面'
    }, function () {});
  },
  onReviveBtnClicked: function onReviveBtnClicked(event) {
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '复活',
      content: '复活',
      desc: '点击'
    }, function () {});
    var isPlayVideo = false;
    var isForce = true;

    if (this.reviveConfig) {
      isPlayVideo = this.reviveConfig.btn1.video;
      isForce = this.reviveConfig.btn1.force;
    }

    if (isPlayVideo) {
      appGame.videoBanner.playVideoAd(2, isForce, function (isSuc) {
        console.log("看视频成功");
        this.reviveBtnCallback && this.reviveBtnCallback();
        this.hide();
      }.bind(this));
    } else {
      this.reviveBtnCallback && this.reviveBtnCallback();
      this.hide();
    }
  },
  onBackBtnClicked: function onBackBtnClicked(event) {
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '复活',
      content: '返回',
      desc: '点击'
    }, function () {});
    var isPlayVideo = false;
    var isForce = true;

    if (this.reviveConfig) {
      isPlayVideo = this.reviveConfig.btn2.video;
      isForce = this.reviveConfig.btn2.force;
    }

    if (isPlayVideo) {
      //配置需要播放视频
      appGame.videoBanner.playVideoAd(2, isForce, function (isSuc) {
        console.log("看视频成功");
        this.backBtnCallback && this.backBtnCallback();
        this.hide();
      }.bind(this));
    } else {
      //不用播放视频
      this.backBtnCallback && this.backBtnCallback();
      this.hide();
    }
  },
  updateTime: function updateTime(type, count, totalcount) {
    if (type == 1) {
      //开始倒计时
      count = count * 1000;
      totalcount = totalcount * 1000;
      var durationtime = 100;
      this._count = count;

      if (this.clock) {
        this.clock.getComponent(cc.ProgressBar).progress = this._count / totalcount;
      }

      clearInterval(countDownInterval);
      countDownInterval = setInterval(function () {
        if (this._count > durationtime) {
          this._count -= durationtime;
        } else {
          this._count = 0;
          clearInterval(countDownInterval);
          this.backBtnCallback && this.backBtnCallback();
          this.hide();
        }

        if (this.clock) {
          this.clock.getComponent(cc.ProgressBar).progress = this._count / totalcount;
        }
      }.bind(this), durationtime);
    } else {
      //关闭倒计时
      clearInterval(countDownInterval);
    }
  },
  hide: function hide() {
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '复活',
      content: '关闭复活界面'
    }, function () {});
    appGame.banner.playBanner(3);
    appGame.appBoxAd.playBox(false);
    appGame.blockAd.playBlockad(false);
    clearInterval(countDownInterval);
    clearTimeout(backBtnTimeOut);
    clearTimeout(continueBtnTimeOut);
    this.node.removeFromParent();
  } // update (dt) {},

});

cc._RF.pop();