"use strict";
cc._RF.push(module, '4cc67JlC1xALoZNsT7RR3yO', 'updateTime');
// gameComon/scripts/updateTime.js

"use strict";

var countDownInterval;
cc.Class({
  "extends": cc.Component,
  properties: {
    clockNode: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    //注册监听事件
    appGame.gameServerRoom.on("updateCompetitionTime", this.updateTime, this);
    this.clockNode.getComponent(cc.ProgressBar).progress = 1;
    this._count = 0;
  },
  onDestroy: function onDestroy() {
    //删除监听事件
    appGame.gameServerRoom.off("updateCompetitionTime", this.updateTime, this);
    clearInterval(countDownInterval);
  },
  start: function start() {},
  updateTime: function updateTime(type, count, totalcount) {
    if (type == 1) {
      //开始倒计时
      count = count * 1000;
      totalcount = totalcount * 1000;
      var durationtime = 100;
      this._count = count;

      if (this.clockNode) {
        this.clockNode.getComponent(cc.ProgressBar).progress = this._count / totalcount;
      }

      clearInterval(countDownInterval);
      countDownInterval = setInterval(function () {
        if (this._count > durationtime) {
          this._count -= durationtime;
        } else {
          this._count = 0;
          appGame.gameServerRoom.emit("competitionGameOver", 2);
          clearInterval(countDownInterval);
        }

        if (this.clockNode) {
          this.clockNode.getComponent(cc.ProgressBar).progress = this._count / totalcount;
        }
      }.bind(this), durationtime);
    } else {
      //关闭倒计时
      clearInterval(countDownInterval);
    }
  } // update (dt) {},

});

cc._RF.pop();