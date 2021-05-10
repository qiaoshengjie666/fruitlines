
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/updateTime.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JpcHRzXFx1cGRhdGVUaW1lLmpzIl0sIm5hbWVzIjpbImNvdW50RG93bkludGVydmFsIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJjbG9ja05vZGUiLCJOb2RlIiwib25Mb2FkIiwiYXBwR2FtZSIsImdhbWVTZXJ2ZXJSb29tIiwib24iLCJ1cGRhdGVUaW1lIiwiZ2V0Q29tcG9uZW50IiwiUHJvZ3Jlc3NCYXIiLCJwcm9ncmVzcyIsIl9jb3VudCIsIm9uRGVzdHJveSIsIm9mZiIsImNsZWFySW50ZXJ2YWwiLCJzdGFydCIsInR5cGUiLCJjb3VudCIsInRvdGFsY291bnQiLCJkdXJhdGlvbnRpbWUiLCJzZXRJbnRlcnZhbCIsImVtaXQiLCJiaW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLGlCQUFKO0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUNKLEVBQUUsQ0FBQ0s7QUFETCxHQUhQO0FBT0w7QUFFQUMsRUFBQUEsTUFUSyxvQkFTSztBQUNOO0FBQ0FDLElBQUFBLE9BQU8sQ0FBQ0MsY0FBUixDQUF1QkMsRUFBdkIsQ0FBMEIsdUJBQTFCLEVBQW1ELEtBQUtDLFVBQXhELEVBQW1FLElBQW5FO0FBQ0EsU0FBS04sU0FBTCxDQUFlTyxZQUFmLENBQTRCWCxFQUFFLENBQUNZLFdBQS9CLEVBQTRDQyxRQUE1QyxHQUF1RCxDQUF2RDtBQUNBLFNBQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0gsR0FkSTtBQWdCTEMsRUFBQUEsU0FoQkssdUJBZ0JRO0FBQ1Y7QUFDQVIsSUFBQUEsT0FBTyxDQUFDQyxjQUFSLENBQXVCUSxHQUF2QixDQUEyQix1QkFBM0IsRUFBb0QsS0FBS04sVUFBekQsRUFBb0UsSUFBcEU7QUFDQU8sSUFBQUEsYUFBYSxDQUFDbEIsaUJBQUQsQ0FBYjtBQUNGLEdBcEJJO0FBc0JMbUIsRUFBQUEsS0F0QkssbUJBc0JJLENBRVIsQ0F4Qkk7QUEwQkxSLEVBQUFBLFVBMUJLLHNCQTBCTVMsSUExQk4sRUEwQldDLEtBMUJYLEVBMEJpQkMsVUExQmpCLEVBMEI0QjtBQUM3QixRQUFHRixJQUFJLElBQUUsQ0FBVCxFQUFXO0FBQUM7QUFDUkMsTUFBQUEsS0FBSyxHQUFHQSxLQUFLLEdBQUMsSUFBZDtBQUNBQyxNQUFBQSxVQUFVLEdBQUdBLFVBQVUsR0FBQyxJQUF4QjtBQUNBLFVBQUlDLFlBQVksR0FBRyxHQUFuQjtBQUNBLFdBQUtSLE1BQUwsR0FBY00sS0FBZDs7QUFDQSxVQUFHLEtBQUtoQixTQUFSLEVBQWtCO0FBQ2QsYUFBS0EsU0FBTCxDQUFlTyxZQUFmLENBQTRCWCxFQUFFLENBQUNZLFdBQS9CLEVBQTRDQyxRQUE1QyxHQUF1RCxLQUFLQyxNQUFMLEdBQVlPLFVBQW5FO0FBQ0g7O0FBQ0RKLE1BQUFBLGFBQWEsQ0FBQ2xCLGlCQUFELENBQWI7QUFDQUEsTUFBQUEsaUJBQWlCLEdBQUd3QixXQUFXLENBQUMsWUFBVztBQUN2QyxZQUFHLEtBQUtULE1BQUwsR0FBWVEsWUFBZixFQUE0QjtBQUN4QixlQUFLUixNQUFMLElBQWFRLFlBQWI7QUFDSCxTQUZELE1BRUs7QUFDRCxlQUFLUixNQUFMLEdBQWMsQ0FBZDtBQUNBUCxVQUFBQSxPQUFPLENBQUNDLGNBQVIsQ0FBdUJnQixJQUF2QixDQUE0QixxQkFBNUIsRUFBbUQsQ0FBbkQ7QUFDQVAsVUFBQUEsYUFBYSxDQUFDbEIsaUJBQUQsQ0FBYjtBQUNIOztBQUNELFlBQUcsS0FBS0ssU0FBUixFQUFrQjtBQUNkLGVBQUtBLFNBQUwsQ0FBZU8sWUFBZixDQUE0QlgsRUFBRSxDQUFDWSxXQUEvQixFQUE0Q0MsUUFBNUMsR0FBdUQsS0FBS0MsTUFBTCxHQUFZTyxVQUFuRTtBQUNIO0FBQ0osT0FYK0IsQ0FXOUJJLElBWDhCLENBV3pCLElBWHlCLENBQUQsRUFXakJILFlBWGlCLENBQS9CO0FBWUgsS0FyQkQsTUFxQks7QUFBQztBQUNGTCxNQUFBQSxhQUFhLENBQUNsQixpQkFBRCxDQUFiO0FBQ0g7QUFDSixHQW5ESSxDQXFETDs7QUFyREssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvdW50RG93bkludGVydmFsO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNsb2NrTm9kZTpjYy5Ob2RlXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgLy/ms6jlhoznm5HlkKzkuovku7ZcclxuICAgICAgICBhcHBHYW1lLmdhbWVTZXJ2ZXJSb29tLm9uKFwidXBkYXRlQ29tcGV0aXRpb25UaW1lXCIsIHRoaXMudXBkYXRlVGltZSx0aGlzKTtcclxuICAgICAgICB0aGlzLmNsb2NrTm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gMTtcclxuICAgICAgICB0aGlzLl9jb3VudCA9IDA7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGVzdHJveSAoKSB7XHJcbiAgICAgICAvL+WIoOmZpOebkeWQrOS6i+S7tlxyXG4gICAgICAgYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5vZmYoXCJ1cGRhdGVDb21wZXRpdGlvblRpbWVcIiwgdGhpcy51cGRhdGVUaW1lLHRoaXMpO1xyXG4gICAgICAgY2xlYXJJbnRlcnZhbChjb3VudERvd25JbnRlcnZhbCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZVRpbWUodHlwZSxjb3VudCx0b3RhbGNvdW50KXtcclxuICAgICAgICBpZih0eXBlPT0xKXsvL+W8gOWni+WAkuiuoeaXtlxyXG4gICAgICAgICAgICBjb3VudCA9IGNvdW50KjEwMDA7XHJcbiAgICAgICAgICAgIHRvdGFsY291bnQgPSB0b3RhbGNvdW50KjEwMDA7XHJcbiAgICAgICAgICAgIGxldCBkdXJhdGlvbnRpbWUgPSAxMDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvdW50ID0gY291bnQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2xvY2tOb2RlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvY2tOb2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSB0aGlzLl9jb3VudC90b3RhbGNvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY291bnREb3duSW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICBjb3VudERvd25JbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fY291bnQ+ZHVyYXRpb250aW1lKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3VudC09ZHVyYXRpb250aW1lO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcEdhbWUuZ2FtZVNlcnZlclJvb20uZW1pdChcImNvbXBldGl0aW9uR2FtZU92ZXJcIiwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjb3VudERvd25JbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNsb2NrTm9kZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9ja05vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IHRoaXMuX2NvdW50L3RvdGFsY291bnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgZHVyYXRpb250aW1lKTtcclxuICAgICAgICB9ZWxzZXsvL+WFs+mXreWAkuiuoeaXtlxyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGNvdW50RG93bkludGVydmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=