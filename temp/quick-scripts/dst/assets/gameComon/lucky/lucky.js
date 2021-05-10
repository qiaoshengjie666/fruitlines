
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/lucky/lucky.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '70c5be0DtlNPI44MyAR/Qdw', 'lucky');
// gameComon/lucky/lucky.js

"use strict";

var unsealtimeOut;
var bannerTimeOut;
cc.Class({
  "extends": cc.Component,
  properties: {
    touchHide: cc.Node,
    touch: cc.Node,
    leftBtn: cc.Node,
    rightBtn: cc.Node,
    unsealBtn: cc.Button,
    //前往关卡
    closeBtn: cc.Button,
    getBtn: cc.Button,
    redDragon: dragonBones.ArmatureDisplay,
    infoLabel: cc.Label,
    itemReward: cc.Node,
    redLabel: cc.Label,
    openTouch: cc.Node,
    unsealBtnCallback: null,
    closeBtnCallback: null,
    redBagBtnCallback: null,
    blankCallback: null,
    getRewardCallBack: null
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.touchHide.on(cc.Node.EventType.TOUCH_END, this.clickTouchHideCallBack, this);
    this.touch.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.touch.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.openTouch.active = false;
    this.leftBtn.on(cc.Node.EventType.TOUCH_END, this.onLeftTouchEnd, this);
    this.rightBtn.on(cc.Node.EventType.TOUCH_END, this.onRightTouchEnd, this);
    this.unsealBtn.node.active = false;
    this.getBtn.node.active = false;
    this.closeBtn.node.active = false;
    this.closeBtn.node.on(cc.Node.EventType.TOUCH_END, this.clickTouchCloseCallBack, this);
    this.unsealBtn.node.on(cc.Node.EventType.TOUCH_END, this.onUnsealTouchEnd, this);
    this.getBtn.node.on(cc.Node.EventType.TOUCH_END, this.onGetTouchEnd, this);
    this.redDragon.addEventListener(dragonBones.EventObject.COMPLETE, this.animationEventHandler, this);
    this.infoLabel.string = '';
    this.currentIndex = 1;
    this.itemReward.active = false;
  },

  /** 
   * @param opts
   * backCB 放弃按钮回调
   * reviveCB 复活按钮回调
   */
  show: function show(opts) {
    opts = opts || {};

    if (opts.config) {
      this.luckyConfig = opts.config;
    }

    if (opts.info) {
      this.info = opts.info;
    }

    if (opts.unsealCB) {
      this.unsealBtnCallback = opts.unsealCB;
    }

    if (opts.closeCB) {
      this.closeBtnCallback = opts.closeCB;
    }

    if (opts.redbagCB) {
      this.redBagBtnCallback = opts.redbagCB;
    }

    if (opts.blankCB) {
      this.blankCallback = opts.blankCB;
    }

    if (opts.rewardCB) {
      this.getRewardCallBack = opts.rewardCB;
    }

    this.currentIndex = 1;
    this.showRefreshUI(this.info.isResult);
  },
  onDestroy: function onDestroy() {},
  showRefreshUI: function showRefreshUI(showType) {
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '幸运大奖',
      content: '打开幸运大奖界面'
    }, function () {});
    this.currentIndex = 1;
    this.level = this.info.level || 1; //this.tollgateConfig = this.luckyConfig.tollgate;

    this.tollgateConfig = appGame.gameServerRoom.commonConfig.luckytollgate;

    if (showType == 3) {
      //是否达到等级  是否已领取
      for (var i = 0; i < this.tollgateConfig.length; i++) {
        if (this.tollgateConfig[i].level > this.level) {
          break;
        } else if (this.tollgateConfig[i].level <= this.level) {
          var index = i + 1;
          var ready = cc.sys.localStorage.getItem("luckReadyReceive" + index);

          if (ready == null || ready == '') {
            cc.sys.localStorage.setItem("luckUnseal" + index, index);
          }

          this.currentIndex = index;
        }
      }
    } else if (showType == 2) {
      //结算 是否达到等级
      for (var _i = 0; _i < this.tollgateConfig.length; _i++) {
        if (this.tollgateConfig[_i].level == this.level) {
          var _index = _i + 1;

          var ready = cc.sys.localStorage.getItem("luckReadyReceive" + _index);

          if (ready == null || ready == '') {
            cc.sys.localStorage.setItem("luckUnseal" + _index, _index);
            this.currentIndex = _index;
            break;
          }
        }
      }
    } else {
      //点击按钮显示
      for (var _i2 = 0; _i2 < this.tollgateConfig.length; _i2++) {
        var _index2 = _i2 + 1;

        var ready = cc.sys.localStorage.getItem("luckReadyReceive" + _index2);

        if (ready == null || ready == '') {
          this.currentIndex = _index2;
          break;
        }
      }
    }

    this.refreshItem(this.currentIndex);
    this.node.active = true;
    bannerTimeOut = setTimeout(function () {
      if (appGame.interstitialAd) {
        appGame.interstitialAd.playAd();
      }

      appGame.banner.playBanner(2);
    }.bind(this), 3000);
    appGame.appBoxAd.playBox(true);
    appGame.blockAd.playBlockad(true, 4);
  },
  refreshItem: function refreshItem(index) {
    underscore.each(this.tollgateConfig, function (key, value) {
      if (value == index - 1) {
        var ready = cc.sys.localStorage.getItem("luckReadyReceive" + index); //是否已经领取

        var unseal = cc.sys.localStorage.getItem("luckUnseal" + index); //是否解封

        if (ready != '' && ready != null) {
          //已经领取了
          this.redDragon.playAnimation('dajiang2', 1);
          this.refreshGetReward(index, 2);
        } else {
          //未领取
          if (unseal != '' && unseal != null) {
            //已经解封
            this.redDragon.playAnimation('dajiang2', 1);
            this.refreshGetReward(index, 3);
          } else {
            //未解封
            this.redDragon.playAnimation('dajiang', 2);
            this.refreshGetReward(index, 4);
          }
        }
      }
    }.bind(this));
  },
  clickTouchHideCallBack: function clickTouchHideCallBack(event) {
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '幸运大奖',
      content: '关闭空白页面',
      desc: '点击'
    }, function () {});
    var onoff = this.luckyConfig.luckyOnOff;

    if (onoff && onoff.length > 0 && onoff[1].video == 1) {
      appGame.videoBanner.playVideoAd(1, onoff[1].force, function (isSuc) {
        console.log("看视频成功");
        this.onClientResultPlayAD({
          sceneId: 7,
          eventId: 2,
          isSuccess: true
        });
        this.blankCallback && this.blankCallback();
      }.bind(this));
    } else {
      this.onClientResultPlayAD({
        sceneId: 7,
        eventId: 2,
        isSuccess: true
      });
      this.blankCallback && this.blankCallback();
    }
  },
  clickTouchCloseCallBack: function clickTouchCloseCallBack(event) {
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '幸运大奖',
      content: '关闭按钮',
      desc: '点击'
    }, function () {});
    this.onClientResultPlayAD({
      sceneId: 7,
      eventId: 2,
      isSuccess: true
    });
    this.closeBtnCallback && this.closeBtnCallback();
  },
  onTouchStart: function onTouchStart(event) {
    this.startX = event.getLocation().x;
  },
  onTouchEnd: function onTouchEnd(event) {
    var moveX = event.getLocation().x;
    var spaceX = moveX - this.startX;

    if (spaceX <= -10) {
      //向左
      this.onLeftTouchEnd({});
    } else if (spaceX >= 10) {
      //向右
      this.onRightTouchEnd({});
    } else if (this.openTouch.active) {
      //点击redDragon
      this.onRedBagTouchEnd({});
    }
  },
  onLeftTouchEnd: function onLeftTouchEnd(event) {
    if (this.currentIndex <= 1) {
      appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
        content: "您当前已经在第一个了！"
      });
    } else {
      this.currentIndex--;
      this.refreshItem(this.currentIndex);
    }
  },
  onRightTouchEnd: function onRightTouchEnd(event) {
    if (this.currentIndex >= this.tollgateConfig.length) {
      appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
        content: "您当前已经在最后一个了！"
      });
    } else {
      this.currentIndex++;
      this.refreshItem(this.currentIndex);
    }
  },
  //立即挑战
  onUnsealTouchEnd: function onUnsealTouchEnd(event) {
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '幸运大奖',
      content: '前往关卡',
      desc: '点击'
    }, function () {});
    this.unsealBtnCallback && this.unsealBtnCallback();
    this.hide();
  },
  //点击红包 看视频领取
  onRedBagTouchEnd: function onRedBagTouchEnd(event) {
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '幸运大奖',
      content: '红包看激励视频',
      desc: '点击'
    }, function () {});

    if (this.itemReward.active) {
      return;
    }

    var onoff = this.luckyConfig.luckyOnOff;

    if (onoff && onoff.length > 0 && onoff[0].video == 1) {
      appGame.videoBanner.playVideoAd(1, onoff[0].force, function (isSuc) {
        console.log("看视频成功");
        this.onClientResultPlayAD({
          sceneId: 7,
          eventId: 1,
          isSuccess: true
        });
        this.redBagBtnCallback && this.redBagBtnCallback();
      }.bind(this));
    } else {
      this.onClientResultPlayAD({
        sceneId: 7,
        eventId: 1,
        isSuccess: true
      });
      this.redBagBtnCallback && this.redBagBtnCallback();
    }
  },
  //领取奖励
  onGetTouchEnd: function onGetTouchEnd(event) {
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '幸运大奖',
      content: '领取奖励',
      desc: '点击'
    }, function () {});
    cc.log("领取=====" + this.currentIndex);
    this.refreshGetReward(this.currentIndex, 1);
  },
  //领取奖励的刷新  enter 1相当于点击领取  3展示领取界面
  refreshGetReward: function refreshGetReward(index, enter) {
    underscore.each(this.tollgateConfig, function (key, value) {
      if (value == index - 1) {
        if (enter == 1) {
          this.getRewardCallBack && this.getRewardCallBack(key.reward.itemId, key.reward.count);
        }

        this.itemReward.getChildByName('item').getComponent('item').init(key.reward.itemId);
        this.itemReward.getChildByName('count').getComponent(cc.Label).string = '×' + key.reward.count;

        if (enter == 1) {
          cc.log("index===" + index);
          this.redLabel.node.active = true;
          this.itemReward.active = false;
          this.redDragon.playAnimation('dajiang2', 1);
          cc.sys.localStorage.setItem("luckReadyReceive" + index, index);
          this.infoLabel.string = key.reward.info;

          for (var i = 0; i < this.tollgateConfig.length; i++) {
            var tempIndex = i + 1;
            var seal = cc.sys.localStorage.getItem("luckUnseal" + tempIndex);

            if (seal == '' || seal == null) {
              this.currentIndex = tempIndex;
              this.redDragon.playAnimation('dajiang', 2);
              this.refreshGetReward(tempIndex, 4);
              this.hide();
              return;
            }
          }

          var isHad = 0;

          for (var _i3 = 0; _i3 < this.tollgateConfig.length; _i3++) {
            var _tempIndex = _i3 + 1;

            var receive = cc.sys.localStorage.getItem("luckReadyReceive" + _tempIndex);

            if (receive == '' || receive == null) {
              this.currentIndex = _tempIndex;
              this.redDragon.playAnimation('dajiang2', 1);
              this.refreshGetReward(_tempIndex, 3);
              this.hide();
              return;
            } else {
              isHad++;
            }
          }

          if (isHad == this.tollgateConfig.length) {
            for (var _i4 = 0; _i4 < this.tollgateConfig.length; _i4++) {
              var _tempIndex2 = _i4 + 1;

              cc.sys.localStorage.removeItem("luckReadyReceive" + _tempIndex2);
              cc.sys.localStorage.removeItem("luckUnseal" + _tempIndex2);
            }

            this.showRefreshUI(1);
            this.hide();
          } else {
            this.hide();
          }
        } else if (enter == 2) {
          this.openTouch.active = false;
          this.redLabel.node.active = false;
          this.itemReward.active = true;
          this.getBtn.node.active = true;
          this.closeBtn.node.active = false;
          this.unsealBtn.node.active = false;
          this.getBtn.interactable = false;
          this.getBtn.node.off(cc.Node.EventType.TOUCH_END, this.onGetTouchEnd, this);
          this.getBtn.node.getChildByName('label').getComponent(cc.Label).string = "已领取";
          this.infoLabel.string = '奖励已领取';
        } else if (enter == 3) {
          this.openTouch.active = false;
          this.redLabel.node.active = false;
          this.itemReward.active = true;
          this.getBtn.node.active = true;
          this.closeBtn.node.active = false;
          this.unsealBtn.node.active = false;
          this.getBtn.interactable = true;
          this.getBtn.node.on(cc.Node.EventType.TOUCH_END, this.onGetTouchEnd, this);
          this.getBtn.node.getChildByName('label').getComponent(cc.Label).string = "领取";
          this.infoLabel.string = "恭喜获得";
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '幸运大奖',
            content: '恭喜获得弹窗'
          }, function () {});
        } else if (enter == 4) {
          this.redLabel.node.active = true;
          this.itemReward.active = false;
          this.getBtn.node.active = false;
          this.openTouch.active = true;
          this.openTouch.scale = 1.4;
          this.openTouch.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.5, 1.5))));
          var sealShow = this.luckyConfig.luckUnseal;

          if (sealShow && sealShow.show == 1) {
            var time = sealShow.delay * 1000;
            unsealtimeOut = setTimeout(function () {
              this.closeBtn.node.active = true;
              this.unsealBtn.node.active = true;
            }.bind(this), time);
          } else {
            this.closeBtn.node.active = false;
            this.unsealBtn.node.active = false;
          }

          this.infoLabel.string = key.reward.info;
        }
      }
    }.bind(this));
  },
  animationEventHandler: function animationEventHandler(event) {
    if (event.type === dragonBones.EventObject.COMPLETE) {
      if (event.animationState.name === "dajiang") {
        this.redDragon.playAnimation('dajiang1', 0);
      }
    }
  },
  onClientResultPlayAD: function onClientResultPlayAD(data) {
    if (data.sceneId == 7) {
      if (data.isSuccess) {
        if (data.eventId == 1) {
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '幸运大奖',
            content: '红包看激励视频',
            desc: '播放完成'
          }, function () {});
          cc.sys.localStorage.setItem("luckUnseal" + this.currentIndex, this.currentIndex);
          this.redDragon.playAnimation('dajiang2', 1);
          this.refreshGetReward(this.currentIndex, 3);
        } else if (data.eventId == 2 || data.eventId == 3) {
          if (data.eventId == 3) {
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: '幸运大奖',
              content: '关闭界面',
              desc: '播放完成'
            }, function () {});
          }

          this.hide();
        }
      }
    }
  },
  hide: function hide() {
    clearTimeout(unsealtimeOut);
    clearTimeout(bannerTimeOut);
    appGame.banner.playBanner(3);
    appGame.appBoxAd.playBox(false);
    appGame.blockAd.playBlockad(false);
    this.node.removeFromParent();
  },
  start: function start() {} // update (dt) {},

});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxsdWNreVxcbHVja3kuanMiXSwibmFtZXMiOlsidW5zZWFsdGltZU91dCIsImJhbm5lclRpbWVPdXQiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInRvdWNoSGlkZSIsIk5vZGUiLCJ0b3VjaCIsImxlZnRCdG4iLCJyaWdodEJ0biIsInVuc2VhbEJ0biIsIkJ1dHRvbiIsImNsb3NlQnRuIiwiZ2V0QnRuIiwicmVkRHJhZ29uIiwiZHJhZ29uQm9uZXMiLCJBcm1hdHVyZURpc3BsYXkiLCJpbmZvTGFiZWwiLCJMYWJlbCIsIml0ZW1SZXdhcmQiLCJyZWRMYWJlbCIsIm9wZW5Ub3VjaCIsInVuc2VhbEJ0bkNhbGxiYWNrIiwiY2xvc2VCdG5DYWxsYmFjayIsInJlZEJhZ0J0bkNhbGxiYWNrIiwiYmxhbmtDYWxsYmFjayIsImdldFJld2FyZENhbGxCYWNrIiwib25Mb2FkIiwib24iLCJFdmVudFR5cGUiLCJUT1VDSF9FTkQiLCJjbGlja1RvdWNoSGlkZUNhbGxCYWNrIiwiVE9VQ0hfU1RBUlQiLCJvblRvdWNoU3RhcnQiLCJvblRvdWNoRW5kIiwiYWN0aXZlIiwib25MZWZ0VG91Y2hFbmQiLCJvblJpZ2h0VG91Y2hFbmQiLCJub2RlIiwiY2xpY2tUb3VjaENsb3NlQ2FsbEJhY2siLCJvblVuc2VhbFRvdWNoRW5kIiwib25HZXRUb3VjaEVuZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJFdmVudE9iamVjdCIsIkNPTVBMRVRFIiwiYW5pbWF0aW9uRXZlbnRIYW5kbGVyIiwic3RyaW5nIiwiY3VycmVudEluZGV4Iiwic2hvdyIsIm9wdHMiLCJjb25maWciLCJsdWNreUNvbmZpZyIsImluZm8iLCJ1bnNlYWxDQiIsImNsb3NlQ0IiLCJyZWRiYWdDQiIsImJsYW5rQ0IiLCJyZXdhcmRDQiIsInNob3dSZWZyZXNoVUkiLCJpc1Jlc3VsdCIsIm9uRGVzdHJveSIsInNob3dUeXBlIiwiaHR0cFV0aWxzIiwiaHR0cFBvc3QiLCJjb25zdHMiLCJIVFRQX1JFQ09SRF9TRVJWRVIiLCJ0aXRsZSIsImNvbnRlbnQiLCJsZXZlbCIsInRvbGxnYXRlQ29uZmlnIiwiYXBwR2FtZSIsImdhbWVTZXJ2ZXJSb29tIiwiY29tbW9uQ29uZmlnIiwibHVja3l0b2xsZ2F0ZSIsImkiLCJsZW5ndGgiLCJpbmRleCIsInJlYWR5Iiwic3lzIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInNldEl0ZW0iLCJyZWZyZXNoSXRlbSIsInNldFRpbWVvdXQiLCJpbnRlcnN0aXRpYWxBZCIsInBsYXlBZCIsImJhbm5lciIsInBsYXlCYW5uZXIiLCJiaW5kIiwiYXBwQm94QWQiLCJwbGF5Qm94IiwiYmxvY2tBZCIsInBsYXlCbG9ja2FkIiwidW5kZXJzY29yZSIsImVhY2giLCJrZXkiLCJ2YWx1ZSIsInVuc2VhbCIsInBsYXlBbmltYXRpb24iLCJyZWZyZXNoR2V0UmV3YXJkIiwiZXZlbnQiLCJkZXNjIiwib25vZmYiLCJsdWNreU9uT2ZmIiwidmlkZW8iLCJ2aWRlb0Jhbm5lciIsInBsYXlWaWRlb0FkIiwiZm9yY2UiLCJpc1N1YyIsImNvbnNvbGUiLCJsb2ciLCJvbkNsaWVudFJlc3VsdFBsYXlBRCIsInNjZW5lSWQiLCJldmVudElkIiwiaXNTdWNjZXNzIiwic3RhcnRYIiwiZ2V0TG9jYXRpb24iLCJ4IiwibW92ZVgiLCJzcGFjZVgiLCJvblJlZEJhZ1RvdWNoRW5kIiwiZW1pdHRlciIsImVtaXQiLCJMT0NBTF9FVkVOVF9QT1BVUF9MT0FEVElQIiwiaGlkZSIsImVudGVyIiwicmV3YXJkIiwiaXRlbUlkIiwiY291bnQiLCJnZXRDaGlsZEJ5TmFtZSIsImdldENvbXBvbmVudCIsImluaXQiLCJ0ZW1wSW5kZXgiLCJzZWFsIiwiaXNIYWQiLCJyZWNlaXZlIiwicmVtb3ZlSXRlbSIsImludGVyYWN0YWJsZSIsIm9mZiIsInNjYWxlIiwicnVuQWN0aW9uIiwicmVwZWF0Rm9yZXZlciIsInNlcXVlbmNlIiwic2NhbGVUbyIsInNlYWxTaG93IiwibHVja1Vuc2VhbCIsInRpbWUiLCJkZWxheSIsInR5cGUiLCJhbmltYXRpb25TdGF0ZSIsIm5hbWUiLCJkYXRhIiwiY2xlYXJUaW1lb3V0IiwicmVtb3ZlRnJvbVBhcmVudCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLGFBQUo7QUFDQSxJQUFJQyxhQUFKO0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUNKLEVBQUUsQ0FBQ0ssSUFETDtBQUVSQyxJQUFBQSxLQUFLLEVBQUNOLEVBQUUsQ0FBQ0ssSUFGRDtBQUdSRSxJQUFBQSxPQUFPLEVBQUNQLEVBQUUsQ0FBQ0ssSUFISDtBQUlSRyxJQUFBQSxRQUFRLEVBQUNSLEVBQUUsQ0FBQ0ssSUFKSjtBQUtSSSxJQUFBQSxTQUFTLEVBQUNULEVBQUUsQ0FBQ1UsTUFMTDtBQUthO0FBQ3JCQyxJQUFBQSxRQUFRLEVBQUNYLEVBQUUsQ0FBQ1UsTUFOSjtBQU9SRSxJQUFBQSxNQUFNLEVBQUNaLEVBQUUsQ0FBQ1UsTUFQRjtBQVFSRyxJQUFBQSxTQUFTLEVBQUNDLFdBQVcsQ0FBQ0MsZUFSZDtBQVNSQyxJQUFBQSxTQUFTLEVBQUNoQixFQUFFLENBQUNpQixLQVRMO0FBVVJDLElBQUFBLFVBQVUsRUFBQ2xCLEVBQUUsQ0FBQ0ssSUFWTjtBQVdSYyxJQUFBQSxRQUFRLEVBQUNuQixFQUFFLENBQUNpQixLQVhKO0FBWVJHLElBQUFBLFNBQVMsRUFBQ3BCLEVBQUUsQ0FBQ0ssSUFaTDtBQWFSZ0IsSUFBQUEsaUJBQWlCLEVBQUUsSUFiWDtBQWNSQyxJQUFBQSxnQkFBZ0IsRUFBRSxJQWRWO0FBZVJDLElBQUFBLGlCQUFpQixFQUFFLElBZlg7QUFnQlJDLElBQUFBLGFBQWEsRUFBQyxJQWhCTjtBQWlCUkMsSUFBQUEsaUJBQWlCLEVBQUM7QUFqQlYsR0FIUDtBQXVCTDtBQUVBQyxFQUFBQSxNQXpCSyxv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N0MsRUFBdUYsWUFBVSxDQUNoRyxDQUREO0FBRUg7O0FBQ0QsZUFBS3VCLElBQUw7QUFDSDtBQUNKO0FBQ0o7QUFDSixHQXRYSTtBQXVYTEEsRUFBQUEsSUF2WEssa0JBdVhDO0FBQ0Y0QixJQUFBQSxZQUFZLENBQUN6SixhQUFELENBQVo7QUFDQXlKLElBQUFBLFlBQVksQ0FBQ3hKLGFBQUQsQ0FBWjtBQUNBc0UsSUFBQUEsT0FBTyxDQUFDZ0IsTUFBUixDQUFlQyxVQUFmLENBQTBCLENBQTFCO0FBQ0FqQixJQUFBQSxPQUFPLENBQUNtQixRQUFSLENBQWlCQyxPQUFqQixDQUF5QixLQUF6QjtBQUNBcEIsSUFBQUEsT0FBTyxDQUFDcUIsT0FBUixDQUFnQkMsV0FBaEIsQ0FBNEIsS0FBNUI7QUFDQSxTQUFLdEQsSUFBTCxDQUFVbUgsZ0JBQVY7QUFDSCxHQTlYSTtBQWdZTEMsRUFBQUEsS0FoWUssbUJBZ1lJLENBRVIsQ0FsWUksQ0FvWUw7O0FBcFlLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1bnNlYWx0aW1lT3V0O1xyXG52YXIgYmFubmVyVGltZU91dDtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICB0b3VjaEhpZGU6Y2MuTm9kZSxcclxuICAgICAgICB0b3VjaDpjYy5Ob2RlLFxyXG4gICAgICAgIGxlZnRCdG46Y2MuTm9kZSxcclxuICAgICAgICByaWdodEJ0bjpjYy5Ob2RlLFxyXG4gICAgICAgIHVuc2VhbEJ0bjpjYy5CdXR0b24sIC8v5YmN5b6A5YWz5Y2hXHJcbiAgICAgICAgY2xvc2VCdG46Y2MuQnV0dG9uLFxyXG4gICAgICAgIGdldEJ0bjpjYy5CdXR0b24sXHJcbiAgICAgICAgcmVkRHJhZ29uOmRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSxcclxuICAgICAgICBpbmZvTGFiZWw6Y2MuTGFiZWwsXHJcbiAgICAgICAgaXRlbVJld2FyZDpjYy5Ob2RlLFxyXG4gICAgICAgIHJlZExhYmVsOmNjLkxhYmVsLFxyXG4gICAgICAgIG9wZW5Ub3VjaDpjYy5Ob2RlLFxyXG4gICAgICAgIHVuc2VhbEJ0bkNhbGxiYWNrOiBudWxsLFxyXG4gICAgICAgIGNsb3NlQnRuQ2FsbGJhY2s6IG51bGwsXHJcbiAgICAgICAgcmVkQmFnQnRuQ2FsbGJhY2s6IG51bGwsXHJcbiAgICAgICAgYmxhbmtDYWxsYmFjazpudWxsLFxyXG4gICAgICAgIGdldFJld2FyZENhbGxCYWNrOm51bGxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLnRvdWNoSGlkZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuY2xpY2tUb3VjaEhpZGVDYWxsQmFjaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy50b3VjaC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vblRvdWNoU3RhcnQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudG91Y2gub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMub3BlblRvdWNoLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmxlZnRCdG4ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uTGVmdFRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnJpZ2h0QnRuLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblJpZ2h0VG91Y2hFbmQsIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLnVuc2VhbEJ0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZ2V0QnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdG4ubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuY2xpY2tUb3VjaENsb3NlQ2FsbEJhY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudW5zZWFsQnRuLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVW5zZWFsVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZ2V0QnRuLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uR2V0VG91Y2hFbmQsIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLnJlZERyYWdvbi5hZGRFdmVudExpc3RlbmVyKGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkNPTVBMRVRFLCB0aGlzLmFuaW1hdGlvbkV2ZW50SGFuZGxlciwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5pbmZvTGFiZWwuc3RyaW5nID0gJyc7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAxO1xyXG4gICAgICAgIHRoaXMuaXRlbVJld2FyZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICAvKiogXHJcbiAgICAgKiBAcGFyYW0gb3B0c1xyXG4gICAgICogYmFja0NCIOaUvuW8g+aMiemSruWbnuiwg1xyXG4gICAgICogcmV2aXZlQ0Ig5aSN5rS75oyJ6ZKu5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHNob3cob3B0cyl7XHJcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XHJcbiAgICAgICAgaWYob3B0cy5jb25maWcpe1xyXG4gICAgICAgICAgICB0aGlzLmx1Y2t5Q29uZmlnID0gb3B0cy5jb25maWc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG9wdHMuaW5mbyl7XHJcbiAgICAgICAgICAgIHRoaXMuaW5mbyA9IG9wdHMuaW5mbztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYob3B0cy51bnNlYWxDQil7XHJcbiAgICAgICAgICAgIHRoaXMudW5zZWFsQnRuQ2FsbGJhY2sgPSBvcHRzLnVuc2VhbENCO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihvcHRzLmNsb3NlQ0Ipe1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlQnRuQ2FsbGJhY2sgPSBvcHRzLmNsb3NlQ0I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG9wdHMucmVkYmFnQ0Ipe1xyXG4gICAgICAgICAgICB0aGlzLnJlZEJhZ0J0bkNhbGxiYWNrID0gb3B0cy5yZWRiYWdDQjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYob3B0cy5ibGFua0NCKXtcclxuICAgICAgICAgICAgdGhpcy5ibGFua0NhbGxiYWNrID0gb3B0cy5ibGFua0NCO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihvcHRzLnJld2FyZENCKXtcclxuICAgICAgICAgICAgdGhpcy5nZXRSZXdhcmRDYWxsQmFjayA9IG9wdHMucmV3YXJkQ0I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gMTtcclxuICAgICAgICB0aGlzLnNob3dSZWZyZXNoVUkodGhpcy5pbmZvLmlzUmVzdWx0KTtcclxuICAgIH0sXHJcblxyXG4gICAgb25EZXN0cm95KCl7XHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dSZWZyZXNoVUkoc2hvd1R5cGUpe1xyXG4gICAgICAgIGh0dHBVdGlscy5odHRwUG9zdChjb25zdHMuSFRUUF9SRUNPUkRfU0VSVkVSLHt0aXRsZTon5bm46L+Q5aSn5aWWJyxjb250ZW50OifmiZPlvIDlubjov5DlpKflpZbnlYzpnaInfSxmdW5jdGlvbigpe1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gMTtcclxuICAgICAgICB0aGlzLmxldmVsID0gdGhpcy5pbmZvLmxldmVsfHwxO1xyXG4gICAgICAgIC8vdGhpcy50b2xsZ2F0ZUNvbmZpZyA9IHRoaXMubHVja3lDb25maWcudG9sbGdhdGU7XHJcbiAgICAgICAgdGhpcy50b2xsZ2F0ZUNvbmZpZyA9IGFwcEdhbWUuZ2FtZVNlcnZlclJvb20uY29tbW9uQ29uZmlnLmx1Y2t5dG9sbGdhdGU7XHJcbiAgICAgICAgaWYoc2hvd1R5cGU9PTMpey8v5piv5ZCm6L6+5Yiw562J57qnICDmmK/lkKblt7Lpooblj5ZcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLnRvbGxnYXRlQ29uZmlnLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy50b2xsZ2F0ZUNvbmZpZ1tpXS5sZXZlbCA+IHRoaXMubGV2ZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy50b2xsZ2F0ZUNvbmZpZ1tpXS5sZXZlbCA8PSB0aGlzLmxldmVsKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBpKzE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlYWR5ID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibHVja1JlYWR5UmVjZWl2ZVwiK2luZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlYWR5ID09bnVsbCB8fCByZWFkeT09Jycpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsdWNrVW5zZWFsXCIraW5kZXgsaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSBpZihzaG93VHlwZT09Mil7Ly/nu5Pnrpcg5piv5ZCm6L6+5Yiw562J57qnXHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy50b2xsZ2F0ZUNvbmZpZy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMudG9sbGdhdGVDb25maWdbaV0ubGV2ZWwgPT0gdGhpcy5sZXZlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gaSsxO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZWFkeSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImx1Y2tSZWFkeVJlY2VpdmVcIitpbmRleClcclxuICAgICAgICAgICAgICAgICAgICBpZihyZWFkeSA9PW51bGwgfHwgcmVhZHk9PScnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibHVja1Vuc2VhbFwiK2luZGV4LGluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXsvL+eCueWHu+aMiemSruaYvuekulxyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMudG9sbGdhdGVDb25maWcubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBpKzE7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVhZHkgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsdWNrUmVhZHlSZWNlaXZlXCIraW5kZXgpXHJcbiAgICAgICAgICAgICAgICBpZihyZWFkeSA9PW51bGwgfHwgcmVhZHk9PScnKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVmcmVzaEl0ZW0odGhpcy5jdXJyZW50SW5kZXgpO1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGJhbm5lclRpbWVPdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKGFwcEdhbWUuaW50ZXJzdGl0aWFsQWQpe1xyXG4gICAgICAgICAgICAgICAgYXBwR2FtZS5pbnRlcnN0aXRpYWxBZC5wbGF5QWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhcHBHYW1lLmJhbm5lci5wbGF5QmFubmVyKDIpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMzAwMCk7XHJcbiAgICAgICAgYXBwR2FtZS5hcHBCb3hBZC5wbGF5Qm94KHRydWUpO1xyXG4gICAgICAgIGFwcEdhbWUuYmxvY2tBZC5wbGF5QmxvY2thZCh0cnVlLDQpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZWZyZXNoSXRlbShpbmRleCl7XHJcbiAgICAgICAgdW5kZXJzY29yZS5lYWNoKHRoaXMudG9sbGdhdGVDb25maWcsZnVuY3Rpb24oa2V5LHZhbHVlKXtcclxuICAgICAgICAgICAgaWYodmFsdWUgPT0gaW5kZXgtMSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVhZHkgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsdWNrUmVhZHlSZWNlaXZlXCIraW5kZXgpOyAgLy/mmK/lkKblt7Lnu4/pooblj5ZcclxuICAgICAgICAgICAgICAgIGxldCB1bnNlYWwgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsdWNrVW5zZWFsXCIraW5kZXgpOyAgIC8v5piv5ZCm6Kej5bCBXHJcbiAgICAgICAgICAgICAgICBpZihyZWFkeSE9JycgJiYgcmVhZHkhPW51bGwpey8v5bey57uP6aKG5Y+W5LqGXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWREcmFnb24ucGxheUFuaW1hdGlvbignZGFqaWFuZzInLDEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoR2V0UmV3YXJkKGluZGV4LDIpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7ICAvL+acqumihuWPllxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHVuc2VhbCE9JycgJiYgdW5zZWFsIT1udWxsKXsgIC8v5bey57uP6Kej5bCBXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVkRHJhZ29uLnBsYXlBbmltYXRpb24oJ2RhamlhbmcyJywxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hHZXRSZXdhcmQoaW5kZXgsMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7IC8v5pyq6Kej5bCBXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVkRHJhZ29uLnBsYXlBbmltYXRpb24oJ2RhamlhbmcnLDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaEdldFJld2FyZChpbmRleCw0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICB9LFxyXG5cclxuICAgIGNsaWNrVG91Y2hIaWRlQ2FsbEJhY2soZXZlbnQpe1xyXG4gICAgICAgIGh0dHBVdGlscy5odHRwUG9zdChjb25zdHMuSFRUUF9SRUNPUkRfU0VSVkVSLHt0aXRsZTon5bm46L+Q5aSn5aWWJyxjb250ZW50OiflhbPpl63nqbrnmb3pobXpnaInLGRlc2M6J+eCueWHuyd9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG9ub2ZmID0gdGhpcy5sdWNreUNvbmZpZy5sdWNreU9uT2ZmO1xyXG4gICAgICAgIGlmKG9ub2ZmICYmIG9ub2ZmLmxlbmd0aD4wICYmIG9ub2ZmWzFdLnZpZGVvID09IDEpe1xyXG4gICAgICAgICAgICBhcHBHYW1lLnZpZGVvQmFubmVyLnBsYXlWaWRlb0FkKDEsb25vZmZbMV0uZm9yY2UsZnVuY3Rpb24oaXNTdWMpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLnnIvop4bpopHmiJDlip9cIilcclxuICAgICAgICAgICAgICAgIHRoaXMub25DbGllbnRSZXN1bHRQbGF5QUQoe3NjZW5lSWQ6NyxldmVudElkOjIsaXNTdWNjZXNzOnRydWV9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ibGFua0NhbGxiYWNrJiZ0aGlzLmJsYW5rQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5vbkNsaWVudFJlc3VsdFBsYXlBRCh7c2NlbmVJZDo3LGV2ZW50SWQ6Mixpc1N1Y2Nlc3M6dHJ1ZX0pO1xyXG4gICAgICAgICAgICB0aGlzLmJsYW5rQ2FsbGJhY2smJnRoaXMuYmxhbmtDYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjbGlja1RvdWNoQ2xvc2VDYWxsQmFjayhldmVudCl7XHJcbiAgICAgICAgaHR0cFV0aWxzLmh0dHBQb3N0KGNvbnN0cy5IVFRQX1JFQ09SRF9TRVJWRVIse3RpdGxlOiflubjov5DlpKflpZYnLGNvbnRlbnQ6J+WFs+mXreaMiemSricsZGVzYzon54K55Ye7J30sZnVuY3Rpb24oKXtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm9uQ2xpZW50UmVzdWx0UGxheUFEKHtzY2VuZUlkOjcsZXZlbnRJZDoyLGlzU3VjY2Vzczp0cnVlfSk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ0bkNhbGxiYWNrJiZ0aGlzLmNsb3NlQnRuQ2FsbGJhY2soKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25Ub3VjaFN0YXJ0KGV2ZW50KXtcclxuICAgICAgICB0aGlzLnN0YXJ0WCA9IGV2ZW50LmdldExvY2F0aW9uKCkueDtcclxuICAgIH0sXHJcblxyXG4gICAgb25Ub3VjaEVuZChldmVudCl7XHJcbiAgICAgICAgbGV0IG1vdmVYID0gZXZlbnQuZ2V0TG9jYXRpb24oKS54O1xyXG4gICAgICAgIGxldCBzcGFjZVggPSBtb3ZlWCAtIHRoaXMuc3RhcnRYO1xyXG4gICAgICAgIGlmKHNwYWNlWDw9LTEwKXsvL+WQkeW3plxyXG4gICAgICAgICAgICB0aGlzLm9uTGVmdFRvdWNoRW5kKHt9KVxyXG4gICAgICAgIH1lbHNlIGlmKHNwYWNlWD49MTApey8v5ZCR5Y+zXHJcbiAgICAgICAgICAgIHRoaXMub25SaWdodFRvdWNoRW5kKHt9KVxyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMub3BlblRvdWNoLmFjdGl2ZSl7IC8v54K55Ye7cmVkRHJhZ29uXHJcbiAgICAgICAgICAgIHRoaXMub25SZWRCYWdUb3VjaEVuZCh7fSk7XHJcbiAgICAgICAgfSAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxlZnRUb3VjaEVuZChldmVudCl7XHJcbiAgICAgICAgaWYodGhpcy5jdXJyZW50SW5kZXg8PTEpe1xyXG4gICAgICAgICAgICBhcHBHYW1lLmVtaXR0ZXIuZW1pdChjb25zdHMuTE9DQUxfRVZFTlRfUE9QVVBfTE9BRFRJUCwge1xyXG4gICAgICAgICAgICAgICAgY29udGVudDogXCLmgqjlvZPliY3lt7Lnu4/lnKjnrKzkuIDkuKrkuobvvIFcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXgtLTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoSXRlbSh0aGlzLmN1cnJlbnRJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvblJpZ2h0VG91Y2hFbmQoZXZlbnQpe1xyXG4gICAgICAgIGlmKHRoaXMuY3VycmVudEluZGV4Pj10aGlzLnRvbGxnYXRlQ29uZmlnLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIGFwcEdhbWUuZW1pdHRlci5lbWl0KGNvbnN0cy5MT0NBTF9FVkVOVF9QT1BVUF9MT0FEVElQLCB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIuaCqOW9k+WJjeW3sue7j+WcqOacgOWQjuS4gOS4quS6hu+8gVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hJdGVtKHRoaXMuY3VycmVudEluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/nq4vljbPmjJHmiJhcclxuICAgIG9uVW5zZWFsVG91Y2hFbmQoZXZlbnQpe1xyXG4gICAgICAgIGh0dHBVdGlscy5odHRwUG9zdChjb25zdHMuSFRUUF9SRUNPUkRfU0VSVkVSLHt0aXRsZTon5bm46L+Q5aSn5aWWJyxjb250ZW50OifliY3lvoDlhbPljaEnLGRlc2M6J+eCueWHuyd9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy51bnNlYWxCdG5DYWxsYmFjayYmdGhpcy51bnNlYWxCdG5DYWxsYmFjaygpO1xyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfSxcclxuICAgIC8v54K55Ye757qi5YyFIOeci+inhumikemihuWPllxyXG4gICAgb25SZWRCYWdUb3VjaEVuZChldmVudCl7XHJcbiAgICAgICAgaHR0cFV0aWxzLmh0dHBQb3N0KGNvbnN0cy5IVFRQX1JFQ09SRF9TRVJWRVIse3RpdGxlOiflubjov5DlpKflpZYnLGNvbnRlbnQ6J+e6ouWMheeci+a/gOWKseinhumikScsZGVzYzon54K55Ye7J30sZnVuY3Rpb24oKXtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih0aGlzLml0ZW1SZXdhcmQuYWN0aXZlKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgb25vZmYgPSB0aGlzLmx1Y2t5Q29uZmlnLmx1Y2t5T25PZmY7XHJcbiAgICAgICAgaWYob25vZmYgJiYgb25vZmYubGVuZ3RoPjAgJiYgb25vZmZbMF0udmlkZW8gPT0gMSl7XHJcbiAgICAgICAgICAgIGFwcEdhbWUudmlkZW9CYW5uZXIucGxheVZpZGVvQWQoMSxvbm9mZlswXS5mb3JjZSxmdW5jdGlvbihpc1N1Yyl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueci+inhumikeaIkOWKn1wiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsaWVudFJlc3VsdFBsYXlBRCh7c2NlbmVJZDo3LGV2ZW50SWQ6MSxpc1N1Y2Nlc3M6dHJ1ZX0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWRCYWdCdG5DYWxsYmFjayAmJiB0aGlzLnJlZEJhZ0J0bkNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMub25DbGllbnRSZXN1bHRQbGF5QUQoe3NjZW5lSWQ6NyxldmVudElkOjEsaXNTdWNjZXNzOnRydWV9KTtcclxuICAgICAgICAgICAgdGhpcy5yZWRCYWdCdG5DYWxsYmFjayAmJiB0aGlzLnJlZEJhZ0J0bkNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6aKG5Y+W5aWW5YqxXHJcbiAgICBvbkdldFRvdWNoRW5kKGV2ZW50KXtcclxuICAgICAgICBodHRwVXRpbHMuaHR0cFBvc3QoY29uc3RzLkhUVFBfUkVDT1JEX1NFUlZFUix7dGl0bGU6J+W5uOi/kOWkp+WllicsY29udGVudDon6aKG5Y+W5aWW5YqxJyxkZXNjOifngrnlh7snfSxmdW5jdGlvbigpe1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNjLmxvZyhcIumihuWPlj09PT09XCIrdGhpcy5jdXJyZW50SW5kZXgpXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoR2V0UmV3YXJkKHRoaXMuY3VycmVudEluZGV4LDEpO1xyXG4gICAgfSxcclxuICAgIC8v6aKG5Y+W5aWW5Yqx55qE5Yi35pawICBlbnRlciAx55u45b2T5LqO54K55Ye76aKG5Y+WICAz5bGV56S66aKG5Y+W55WM6Z2iXHJcbiAgICByZWZyZXNoR2V0UmV3YXJkKGluZGV4LGVudGVyKXtcclxuICAgICAgICB1bmRlcnNjb3JlLmVhY2godGhpcy50b2xsZ2F0ZUNvbmZpZyxmdW5jdGlvbihrZXksdmFsdWUpe1xyXG4gICAgICAgICAgICBpZih2YWx1ZSA9PSBpbmRleC0xKXtcclxuICAgICAgICAgICAgICAgIGlmKGVudGVyPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFJld2FyZENhbGxCYWNrICYmIHRoaXMuZ2V0UmV3YXJkQ2FsbEJhY2soa2V5LnJld2FyZC5pdGVtSWQsa2V5LnJld2FyZC5jb3VudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1SZXdhcmQuZ2V0Q2hpbGRCeU5hbWUoJ2l0ZW0nKS5nZXRDb21wb25lbnQoJ2l0ZW0nKS5pbml0KGtleS5yZXdhcmQuaXRlbUlkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtUmV3YXJkLmdldENoaWxkQnlOYW1lKCdjb3VudCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJ8OXJytrZXkucmV3YXJkLmNvdW50IFxyXG4gICAgICAgICAgICAgICAgaWYoZW50ZXI9PTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcImluZGV4PT09XCIraW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWRMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtUmV3YXJkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVkRHJhZ29uLnBsYXlBbmltYXRpb24oJ2RhamlhbmcyJywxKVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImx1Y2tSZWFkeVJlY2VpdmVcIitpbmRleCxpbmRleClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZm9MYWJlbC5zdHJpbmcgPSBrZXkucmV3YXJkLmluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLnRvbGxnYXRlQ29uZmlnLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEluZGV4ID0gaSsxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VhbCA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImx1Y2tVbnNlYWxcIit0ZW1wSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFsPT0nJyB8fCBzZWFsPT1udWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGVtcEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWREcmFnb24ucGxheUFuaW1hdGlvbignZGFqaWFuZycsMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaEdldFJld2FyZCh0ZW1wSW5kZXgsNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXNIYWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy50b2xsZ2F0ZUNvbmZpZy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBJbmRleCA9IGkrMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlY2VpdmUgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsdWNrUmVhZHlSZWNlaXZlXCIrdGVtcEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVjZWl2ZT09JycgfHwgcmVjZWl2ZT09bnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRlbXBJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVkRHJhZ29uLnBsYXlBbmltYXRpb24oJ2RhamlhbmcyJywxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoR2V0UmV3YXJkKHRlbXBJbmRleCwzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzSGFkKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaXNIYWQgPT0gdGhpcy50b2xsZ2F0ZUNvbmZpZy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMudG9sbGdhdGVDb25maWcubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEluZGV4ID0gaSsxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwibHVja1JlYWR5UmVjZWl2ZVwiK3RlbXBJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJsdWNrVW5zZWFsXCIrdGVtcEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dSZWZyZXNoVUkoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihlbnRlciA9PSAyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ub3VjaC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZExhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtUmV3YXJkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRCdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VCdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2VhbEJ0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0QnRuLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0QnRuLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkdldFRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEJ0bi5ub2RlLmdldENoaWxkQnlOYW1lKCdsYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLlt7Lpooblj5ZcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZm9MYWJlbC5zdHJpbmcgPSAn5aWW5Yqx5bey6aKG5Y+WJztcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGVudGVyID09IDMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlblRvdWNoLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVkTGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1SZXdhcmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEJ0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUJ0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zZWFsQnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRCdG4uaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEJ0bi5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkdldFRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEJ0bi5ub2RlLmdldENoaWxkQnlOYW1lKCdsYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLpooblj5ZcIlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb0xhYmVsLnN0cmluZyA9IFwi5oGt5Zac6I635b6XXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaHR0cFV0aWxzLmh0dHBQb3N0KGNvbnN0cy5IVFRQX1JFQ09SRF9TRVJWRVIse3RpdGxlOiflubjov5DlpKflpZYnLGNvbnRlbnQ6J+aBreWWnOiOt+W+l+W8ueeqlyd9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihlbnRlciA9PSA0KXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZExhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1SZXdhcmQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRCdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ub3VjaC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlblRvdWNoLnNjYWxlID0gMS40O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlblRvdWNoLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC41LDEuMiksY2Muc2NhbGVUbygwLjUsMS41KSkpKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWFsU2hvdyA9IHRoaXMubHVja3lDb25maWcubHVja1Vuc2VhbDtcclxuICAgICAgICAgICAgICAgICAgICBpZihzZWFsU2hvdyYmIHNlYWxTaG93LnNob3cgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aW1lID0gc2VhbFNob3cuZGVsYXkqMTAwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5zZWFsdGltZU91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VCdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNlYWxCdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksIHRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlQnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zZWFsQnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb0xhYmVsLnN0cmluZyA9IGtleS5yZXdhcmQuaW5mbztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgIH0sXHJcblxyXG4gICAgYW5pbWF0aW9uRXZlbnRIYW5kbGVyKGV2ZW50KXtcclxuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuQ09NUExFVEUpIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmFuaW1hdGlvblN0YXRlLm5hbWUgPT09IFwiZGFqaWFuZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZERyYWdvbi5wbGF5QW5pbWF0aW9uKCdkYWppYW5nMScsMClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkNsaWVudFJlc3VsdFBsYXlBRChkYXRhKXtcclxuICAgICAgICBpZihkYXRhLnNjZW5lSWQ9PTcpe1xyXG4gICAgICAgICAgICBpZihkYXRhLmlzU3VjY2Vzcyl7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLmV2ZW50SWQ9PTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGh0dHBVdGlscy5odHRwUG9zdChjb25zdHMuSFRUUF9SRUNPUkRfU0VSVkVSLHt0aXRsZTon5bm46L+Q5aSn5aWWJyxjb250ZW50OifnuqLljIXnnIvmv4DlirHop4bpopEnLGRlc2M6J+aSreaUvuWujOaIkCd9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibHVja1Vuc2VhbFwiK3RoaXMuY3VycmVudEluZGV4LHRoaXMuY3VycmVudEluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVkRHJhZ29uLnBsYXlBbmltYXRpb24oJ2RhamlhbmcyJywxKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaEdldFJld2FyZCh0aGlzLmN1cnJlbnRJbmRleCwzKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGRhdGEuZXZlbnRJZD09MiB8fGRhdGEuZXZlbnRJZCA9PSAzKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmV2ZW50SWQgPT0gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0dHBVdGlscy5odHRwUG9zdChjb25zdHMuSFRUUF9SRUNPUkRfU0VSVkVSLHt0aXRsZTon5bm46L+Q5aSn5aWWJyxjb250ZW50OiflhbPpl63nlYzpnaInLGRlc2M6J+aSreaUvuWujOaIkCd9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBoaWRlKCl7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHVuc2VhbHRpbWVPdXQpO1xyXG4gICAgICAgIGNsZWFyVGltZW91dChiYW5uZXJUaW1lT3V0KTtcclxuICAgICAgICBhcHBHYW1lLmJhbm5lci5wbGF5QmFubmVyKDMpO1xyXG4gICAgICAgIGFwcEdhbWUuYXBwQm94QWQucGxheUJveChmYWxzZSk7XHJcbiAgICAgICAgYXBwR2FtZS5ibG9ja0FkLnBsYXlCbG9ja2FkKGZhbHNlKTtcclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==