"use strict";
cc._RF.push(module, '739a6M/ioBOG5JpbKXWT2IE', 'sign');
// gameComon/sign/sign.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    signNode: [cc.Node],
    closeBtn: cc.Node,
    signBtn: cc.Node,
    replenishSignBtn: cc.Node,
    closeCallback: null,
    signCallback: null
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.reg = false; //是否已经签到

    this.regArr = [];
    this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.onCloseBtnClicked, this);
    this.signBtn.on(cc.Node.EventType.TOUCH_END, this.onClickSignInBtn, this);
    this.replenishSignBtn.on(cc.Node.EventType.TOUCH_END, this.onClickReplenishSignBtnInBtn, this);
  },
  start: function start() {},

  /**
   * @param opts
   * showType 1 连续性签到  2 累积型签到  3 按照星期签到
   * signItem 签到数据
   */
  show: function show(opts) {
    opts = opts || {};

    if (opts.config && opts.config.type) {
      this.showType = opts.config.type;
    }

    if (opts.config && opts.config.item) {
      this.signItem = opts.config.item;
    }

    if (opts.config) {
      this.signConfig = opts.config;
    }

    if (opts.backCB) {
      this.closeCallback = opts.backCB;
    }

    if (opts.signCB) {
      this.signCallback = opts.signCB;
    }

    this.initData(function () {
      this.showUI();
    }.bind(this));
  },
  initData: function initData(cb) {
    this.days = []; //签到

    if (this.signItem) {
      for (var i = 0; i < this.signItem.length; i++) {
        var isSign = {
          'sign': 0,
          'day': '',
          "signType": this.showType
        };
        this.days.push(isSign);
      }
    }

    this.singnday = []; //上次签到时间

    this.save_data = {}; //cc.sys.localStorage.removeItem('days_sign');

    var day = cc.sys.localStorage.getItem('days_sign');

    if (day) {
      this.days = JSON.parse(day);

      if (this.days) {
        //如果后台配置有改变  数据要重新记录
        var isConfigChange = false;
        var isLastDay = true; //是否是最后一天

        var isPass = true; //是否连续

        var ishadToday = false; //是否有当天的

        var isNextWeek = false; //是否下一周

        if (this.days[0] && this.showType != this.days[0].signType) {
          isConfigChange = true;
        } else {
          var today = this.getTodayDay();

          if (this.showType == 1) {
            //连续签到
            for (var _i = 0; _i < this.days.length; _i++) {
              if (this.days[_i].day == today) {
                ishadToday = true;
                break;
              }
            }

            for (var _i2 = 0; _i2 < this.days.length; _i2++) {
              if (this.days[_i2].sign == 0 && this.days[_i2].day != today) {
                isPass = false;
              }

              if (this.days[_i2].day == today) {
                break;
              }
            }
          } else if (this.showType == 2) {
            //累积签到
            for (var _i3 = 0; _i3 < this.days.length; _i3++) {
              if (this.days[_i3].day == today) {
                isLastDay = false;
                break;
              }
            }
          } else if (this.showType == 3) {
            //按星期签到
            var monthDay = this.weekIndexInMonth();

            for (var _i4 = 0; _i4 < this.days.length; _i4++) {
              if (this.days[_i4].sign == 1 && this.days[_i4].day != monthDay) {
                isNextWeek = true;
                break;
              }
            }
          }
        }

        if (this.showType == 2 && isLastDay || this.showType == 1 && (!isPass || !ishadToday) || this.showType == 3 && isNextWeek || isConfigChange) {
          cc.sys.localStorage.removeItem('days_sign');
          this.days.length = 0;

          for (var _i5 = 0; _i5 < this.signItem.length; _i5++) {
            var _isSign = {
              'sign': 0,
              'day': '',
              "signType": this.showType
            };
            this.days.push(_isSign);
          }
        }
      }
    }

    cb();
  },
  showUI: function showUI() {
    for (var i = 0; i < this.signNode.length; i++) {
      this.signNode[i].active = false;
      this.signNode[i].getChildByName('item').active = false;
      this.signNode[i].getChildByName('New Sprite').active = false;
      this.signNode[i].getChildByName('ok').active = false;
    }

    for (var _i6 = 0; _i6 < this.signItem.length; _i6++) {
      if (this.signItem.length == 3) {
        this.signNode[_i6].y = 60;
      } else {
        if (_i6 < 3) {
          this.signNode[_i6].y = 171.521;
        }
      }

      this.signNode[_i6].active = true;
    }

    for (var _i7 = 0; _i7 < this.signItem.length; _i7++) {
      var itemSingle = this.signItem[_i7];

      if (JSON.stringify(itemSingle) != '{}') {
        this.signNode[_i7].getChildByName('item').getComponent('item').init(itemSingle.itemId);

        this.signNode[_i7].getChildByName('item').active = true;
      } else {
        this.signNode[_i7].getChildByName('New Sprite').active = true;
      }
    }

    if (this.signConfig && this.signConfig.btn1) {
      this.replenishSignBtn.active = this.signConfig.btn1.show;
      this.replenishSignBtn.getChildByName('video').active = this.signConfig.btn1.icon;
    }

    underscore.each(this.days, function (value, key) {
      //console.log(value+"   "+key);
      if (value.sign == 1) {
        this.signNode[key].getChildByName('ok').active = true;
      }
    }.bind(this));

    if (appGame.interstitialAd) {
      appGame.interstitialAd.playAd();
    }

    appGame.banner.playBanner(2);
    appGame.appBoxAd.playBox(true);
    appGame.blockAd.playBlockad(true, 4);
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '签到',
      content: '打开签到界面'
    }, function () {});
  },

  /*
  *补签点击事件
  */
  onClickReplenishSignBtnInBtn: function onClickReplenishSignBtnInBtn(event) {
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '签到',
      content: '补签',
      desc: '点击'
    }, function () {});
    var currentReplenishSign = -1;

    if (this.showType == 1 || this.showType == 2) {
      var isFirstSign = false;

      for (var i = 0; i < this.days.length; i++) {
        if (this.days[i].sign == 1) {
          isFirstSign = true;
          break;
        }
      }

      if (!isFirstSign) {
        appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
          content: '当前还未签到，请先签到'
        });
        return;
      }

      var today = this.getTodayDay();
      var replenishSign = [];

      for (var _i8 = 0; _i8 < this.days.length; _i8++) {
        if (today == this.days[_i8].day) {
          break;
        }

        if (this.days[_i8].sign != 1) {
          replenishSign.push(_i8);
        }
      }

      if (replenishSign.length > 0) {
        currentReplenishSign = replenishSign[0];
      }
    } else if (this.showType == 3) {
      var _replenishSign = [];

      for (var _i9 = 0; _i9 < this.days.length; _i9++) {
        var weekDay = this.getWeekDay();

        if (_i9 + 1 == weekDay) {
          break;
        }

        if (this.days[_i9].sign == 0) {
          _replenishSign.push(_i9);
        }
      }

      if (_replenishSign.length > 0) {
        currentReplenishSign = _replenishSign[0];
      }
    }

    var isPlayVideo = false;
    var isForce = true;

    if (this.signConfig) {
      isPlayVideo = this.signConfig.btn1.video;
      isForce = this.signConfig.btn1.force;
    }

    if (isPlayVideo) {
      appGame.videoBanner.playVideoAd(4, isForce, function (isSuc) {
        console.log("看视频成功");

        if (currentReplenishSign != -1) {
          if (this.showType == 1 || this.showType == 2) {
            this.days[currentReplenishSign].sign = 1;
            this.signNode[currentReplenishSign].getChildByName('ok').active = true;
            cc.sys.localStorage.setItem("days_sign", JSON.stringify(this.days));
            this.signSuccessTip(this.signItem[currentReplenishSign], 0);
          } else if (this.showType == 3) {
            this.days[currentReplenishSign].day = this.weekIndexInMonth(); //本月的第几周

            this.days[currentReplenishSign].sign = 1;
            this.signNode[currentReplenishSign].getChildByName('ok').active = true;
            cc.sys.localStorage.setItem("days_sign", JSON.stringify(this.days));
            this.signSuccessTip(this.signItem[currentReplenishSign], 0);
          }
        }
      }.bind(this));
    } else {
      if (currentReplenishSign != -1) {
        if (this.showType == 1 || this.showType == 2) {
          this.days[currentReplenishSign].sign = 1;
          this.signNode[currentReplenishSign].getChildByName('ok').active = true;
          cc.sys.localStorage.setItem("days_sign", JSON.stringify(this.days));
          this.signSuccessTip(this.signItem[currentReplenishSign], 0);
        } else if (this.showType == 3) {
          this.days[currentReplenishSign].day = this.weekIndexInMonth(); //本月的第几周

          this.days[currentReplenishSign].sign = 1;
          this.signNode[currentReplenishSign].getChildByName('ok').active = true;
          cc.sys.localStorage.setItem("days_sign", JSON.stringify(this.days));
          this.signSuccessTip(this.signItem[currentReplenishSign], 0);
        }
      }
    }
  },

  /*
  *签到点击事件
  */
  onClickSignInBtn: function onClickSignInBtn() {
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '签到',
      content: '普通签到',
      desc: '点击'
    }, function () {});

    if (this.showType == 1 || this.showType == 2) {
      var isFirstSign = false;

      for (var i = 0; i < this.days.length; i++) {
        if (this.days[i].sign == 1) {
          isFirstSign = true;
          break;
        }
      }

      if (isFirstSign) {
        //有已签到过的
        var today = this.getTodayDay();
        var isSignToday = false;
        var dayIndex = -1;

        for (var _i10 = 0; _i10 < this.days.length; _i10++) {
          if (today == this.days[_i10].day) {
            dayIndex = _i10;

            if (this.days[_i10].sign == 1) {
              isSignToday = true;
              break;
            }
          }

          if (today == this.days[_i10].day && this.days[_i10].sign == 1) {
            isSignToday = true;
            break;
          }
        }

        if (isSignToday) {
          appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
            content: '已签到'
          });
        } else {
          this.days[dayIndex].sign = 1;
          this.signNode[dayIndex].getChildByName('ok').active = true;
          cc.sys.localStorage.setItem("days_sign", JSON.stringify(this.days));
          this.signSuccessTip(this.signItem[dayIndex], 1);
        }
      } else {
        var tempday = '';

        for (var _i11 = 0; _i11 < this.days.length; _i11++) {
          if (_i11 == 0) {
            tempday = this.getTodayDay();
          } else {
            tempday = this.getNextDay(tempday);
          } //cc.log("tempday==="+tempday)


          this.days[_i11].day = tempday;
        }

        this.days[0].sign = 1;
        this.signNode[0].getChildByName('ok').active = true;
        cc.sys.localStorage.setItem("days_sign", JSON.stringify(this.days));
        this.signSuccessTip(this.signItem[0], 1);
      }
    } else if (this.showType == 3) {
      var isSign = true;
      var weekIndex = -1;

      for (var _i12 = 0; _i12 < this.days.length; _i12++) {
        var weekDay = this.getWeekDay();

        if (this.days[_i12].sign == 0 && _i12 + 1 == weekDay) {
          weekIndex = _i12;
          isSign = false;
          break;
        }
      }

      if (!isSign) {
        this.days[weekIndex].day = this.weekIndexInMonth(); //本月的第几周

        this.days[weekIndex].sign = 1;
        this.signNode[weekIndex].getChildByName('ok').active = true;
        cc.sys.localStorage.setItem("days_sign", JSON.stringify(this.days));
        this.signSuccessTip(this.signItem[weekIndex], 1);
      } else {
        //预留接口
        appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
          content: '已签到'
        });
      }
    }
  },
  signSuccessTip: function signSuccessTip(info, iscall) {
    if (JSON.stringify(info) != "{}") {
      //预留接口
      if (iscall) {
        this.signCallback && this.signCallback(info.itemId, info.count);
      }

      if (appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.item) {
        var item = underscore.find(appGame.gameServerRoom.commonConfig.item, function (value) {
          return value.id == info.itemId;
        }.bind(this));

        if (item) {
          appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
            content: '已获得' + item.name + '奖励'
          });
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '签到',
            content: '获取奖励',
            desc: item.name
          }, function () {});
        }
      }
    }
  },
  onCloseBtnClicked: function onCloseBtnClicked() {
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '签到',
      content: '关闭签到界面'
    }, function () {});
    appGame.appBoxAd.playBox(false);
    appGame.blockAd.playBlockad(false);
    appGame.banner.playBanner(3);
    this.closeCallback && this.closeCallback();
    this.node.removeFromParent();
  },
  weekIndexInMonth: function weekIndexInMonth() {
    //设置时间为本月的1号
    var date = new Date(new Date(this).setDate(1) || new Date().setDate(1)); //获取今天的日期

    var today = new Date();
    var d = today.getDate();
    var firstWeekDate;

    if (date.getDay() === 0) {
      // 判断1号是周日
      firstWeekDate = 6;
    } else {
      // 判断1号是周一至周六之间
      firstWeekDate = date.getDay() - 1;
    }

    return Math.ceil((d + firstWeekDate) / 7);
  },
  getWeekDay: function getWeekDay() {
    var index = -1;
    var week = new Date().getDay();

    if (week == 0) {
      index = 7;
    } else {
      index = week;
    }

    return index;
  },
  getTodayDay: function getTodayDay() {
    var d = new Date();
    var yy = d.getFullYear();
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var todayday = yy + "-";

    if (mm < 10) {
      todayday += "0";
    }

    todayday += mm + "-";

    if (dd < 10) {
      todayday += "0";
    }

    todayday += dd; //cc.log("todayday=="+todayday)

    return todayday;
  },
  getNextDay: function getNextDay(d) {
    d = new Date(d);
    d = +d + 1000 * 60 * 60 * 24;
    d = new Date(d);
    var yy = d.getFullYear();
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var nextday = yy + "-";

    if (mm < 10) {
      nextday += "0";
    }

    nextday += mm + "-";

    if (dd < 10) {
      nextday += "0";
    }

    nextday += dd;
    return nextday;
  } // update (dt) {},

});

cc._RF.pop();