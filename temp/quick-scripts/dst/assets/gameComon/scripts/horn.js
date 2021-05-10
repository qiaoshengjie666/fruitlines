
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/horn.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '40fbfZFpRVEpo0R8nzzeIHb', 'horn');
// gameComon/scripts/horn.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
    sprite: [cc.SpriteFrame],
    bg: cc.Sprite
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_END, this.onClickTouchEnd, this);
    appGame.audioMgr.getMusicStatus(function (onOff) {
      if (onOff) {
        this.bg.spriteFrame = this.sprite[0];
      } else {
        this.bg.spriteFrame = this.sprite[1];
      }
    }.bind(this));
  },
  start: function start() {},
  onClickTouchEnd: function onClickTouchEnd(event) {
    appGame.audioMgr.getMusicStatus(function (onOff) {
      appGame.audioMgr.setMusicOnOff(!onOff);

      if (!onOff) {
        this.bg.spriteFrame = this.sprite[0];
      } else {
        this.bg.spriteFrame = this.sprite[1];
      }
    }.bind(this));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JpcHRzXFxob3JuLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3ByaXRlIiwiU3ByaXRlRnJhbWUiLCJiZyIsIlNwcml0ZSIsIm9uTG9hZCIsIm5vZGUiLCJvbiIsIk5vZGUiLCJFdmVudFR5cGUiLCJUT1VDSF9FTkQiLCJvbkNsaWNrVG91Y2hFbmQiLCJhcHBHYW1lIiwiYXVkaW9NZ3IiLCJnZXRNdXNpY1N0YXR1cyIsIm9uT2ZmIiwic3ByaXRlRnJhbWUiLCJiaW5kIiwic3RhcnQiLCJldmVudCIsInNldE11c2ljT25PZmYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxJQUFBQSxNQUFNLEVBQUMsQ0FBQ0osRUFBRSxDQUFDSyxXQUFKLENBaEJDO0FBaUJSQyxJQUFBQSxFQUFFLEVBQUNOLEVBQUUsQ0FBQ087QUFqQkUsR0FIUDtBQXVCTDtBQUVBQyxFQUFBQSxNQXpCSyxvQkF5Qks7QUFDTixTQUFLQyxJQUFMLENBQVVDLEVBQVYsQ0FBYVYsRUFBRSxDQUFDVyxJQUFILENBQVFDLFNBQVIsQ0FBa0JDLFNBQS9CLEVBQTBDLEtBQUtDLGVBQS9DLEVBQWdFLElBQWhFO0FBQ0FDLElBQUFBLE9BQU8sQ0FBQ0MsUUFBUixDQUFpQkMsY0FBakIsQ0FBZ0MsVUFBU0MsS0FBVCxFQUFlO0FBQzNDLFVBQUdBLEtBQUgsRUFBUztBQUNMLGFBQUtaLEVBQUwsQ0FBUWEsV0FBUixHQUFzQixLQUFLZixNQUFMLENBQVksQ0FBWixDQUF0QjtBQUNILE9BRkQsTUFFSztBQUNELGFBQUtFLEVBQUwsQ0FBUWEsV0FBUixHQUFzQixLQUFLZixNQUFMLENBQVksQ0FBWixDQUF0QjtBQUNIO0FBQ0osS0FOK0IsQ0FNOUJnQixJQU44QixDQU16QixJQU55QixDQUFoQztBQU9ILEdBbENJO0FBb0NMQyxFQUFBQSxLQXBDSyxtQkFvQ0ksQ0FFUixDQXRDSTtBQXdDTFAsRUFBQUEsZUF4Q0ssMkJBd0NXUSxLQXhDWCxFQXdDaUI7QUFDbEJQLElBQUFBLE9BQU8sQ0FBQ0MsUUFBUixDQUFpQkMsY0FBakIsQ0FBZ0MsVUFBU0MsS0FBVCxFQUFlO0FBQzNDSCxNQUFBQSxPQUFPLENBQUNDLFFBQVIsQ0FBaUJPLGFBQWpCLENBQStCLENBQUNMLEtBQWhDOztBQUNBLFVBQUcsQ0FBQ0EsS0FBSixFQUFVO0FBQ04sYUFBS1osRUFBTCxDQUFRYSxXQUFSLEdBQXNCLEtBQUtmLE1BQUwsQ0FBWSxDQUFaLENBQXRCO0FBQ0gsT0FGRCxNQUVLO0FBQ0QsYUFBS0UsRUFBTCxDQUFRYSxXQUFSLEdBQXNCLEtBQUtmLE1BQUwsQ0FBWSxDQUFaLENBQXRCO0FBQ0g7QUFDSixLQVArQixDQU85QmdCLElBUDhCLENBT3pCLElBUHlCLENBQWhDO0FBUUgsR0FqREksQ0FtREw7O0FBbkRLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLy8gZm9vOiB7XHJcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XHJcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXHJcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxyXG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gYmFyOiB7XHJcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xyXG4gICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgc3ByaXRlOltjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgYmc6Y2MuU3ByaXRlXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkNsaWNrVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIGFwcEdhbWUuYXVkaW9NZ3IuZ2V0TXVzaWNTdGF0dXMoZnVuY3Rpb24ob25PZmYpe1xyXG4gICAgICAgICAgICBpZihvbk9mZil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJnLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVbMF07XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZy5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25DbGlja1RvdWNoRW5kKGV2ZW50KXtcclxuICAgICAgICBhcHBHYW1lLmF1ZGlvTWdyLmdldE11c2ljU3RhdHVzKGZ1bmN0aW9uKG9uT2ZmKXtcclxuICAgICAgICAgICAgYXBwR2FtZS5hdWRpb01nci5zZXRNdXNpY09uT2ZmKCFvbk9mZik7XHJcbiAgICAgICAgICAgIGlmKCFvbk9mZil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJnLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVbMF07XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZy5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==