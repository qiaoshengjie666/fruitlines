
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/screenRecord/screenShareAuto.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3d67dGKle9P9Yia7x4UYtLi', 'screenShareAuto');
// gameComon/screenRecord/screenShareAuto.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var recorder;
var videoPathGame;
cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_END, this.shareBtnCallBack, this);

    if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
      this.node.active = true;
    } else {
      this.node.active = false;
    }
  },
  onDestroy: function onDestroy() {},
  shareBtnCallBack: function shareBtnCallBack(event) {
    console.log("appGame.isClick", appGame.isClick);

    if (appGame.screenPath == null || appGame.isClick == false) {
      appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
        content: "录屏时间太短！！！"
      });
      return;
    }

    if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
      //头条平台
      console.log("头条平台===", appGame.screenPath);
      tt.shareAppMessage({
        channel: 'video',
        title: consts.HTTP_RECORD_PACKAGENAME,
        imageUrl: '',
        query: '',
        extra: {
          videoPath: appGame.screenPath,
          // 可用录屏得到的视频地址
          videoTopics: ['大家一起来玩' + consts.HTTP_RECORD_PACKAGENAME + '！！！']
        },
        success: function success() {
          console.log('分享视频成功');
        },
        fail: function fail(e) {
          appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
            content: "分享视频失败"
          });
        }
      });
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JlZW5SZWNvcmRcXHNjcmVlblNoYXJlQXV0by5qcyJdLCJuYW1lcyI6WyJyZWNvcmRlciIsInZpZGVvUGF0aEdhbWUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm9uTG9hZCIsIm5vZGUiLCJvbiIsIk5vZGUiLCJFdmVudFR5cGUiLCJUT1VDSF9FTkQiLCJzaGFyZUJ0bkNhbGxCYWNrIiwic3lzIiwicGxhdGZvcm0iLCJCWVRFREFOQ0VfR0FNRSIsImFjdGl2ZSIsIm9uRGVzdHJveSIsImV2ZW50IiwiY29uc29sZSIsImxvZyIsImFwcEdhbWUiLCJpc0NsaWNrIiwic2NyZWVuUGF0aCIsImVtaXR0ZXIiLCJlbWl0IiwiY29uc3RzIiwiTE9DQUxfRVZFTlRfUE9QVVBfTE9BRFRJUCIsImNvbnRlbnQiLCJ0dCIsInNoYXJlQXBwTWVzc2FnZSIsImNoYW5uZWwiLCJ0aXRsZSIsIkhUVFBfUkVDT1JEX1BBQ0tBR0VOQU1FIiwiaW1hZ2VVcmwiLCJxdWVyeSIsImV4dHJhIiwidmlkZW9QYXRoIiwidmlkZW9Ub3BpY3MiLCJzdWNjZXNzIiwiZmFpbCIsImUiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJQSxRQUFKO0FBQ0EsSUFBSUMsYUFBSjtBQUNBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU1MO0FBRUFDLEVBQUFBLE1BUkssb0JBUUs7QUFDTixTQUFLQyxJQUFMLENBQVVDLEVBQVYsQ0FBYU4sRUFBRSxDQUFDTyxJQUFILENBQVFDLFNBQVIsQ0FBa0JDLFNBQS9CLEVBQXlDLEtBQUtDLGdCQUE5QyxFQUErRCxJQUEvRDs7QUFDQSxRQUFHVixFQUFFLENBQUNXLEdBQUgsQ0FBT0MsUUFBUCxJQUFtQlosRUFBRSxDQUFDVyxHQUFILENBQU9FLGNBQTdCLEVBQTRDO0FBQ3hDLFdBQUtSLElBQUwsQ0FBVVMsTUFBVixHQUFtQixJQUFuQjtBQUNILEtBRkQsTUFFSztBQUNELFdBQUtULElBQUwsQ0FBVVMsTUFBVixHQUFtQixLQUFuQjtBQUNIO0FBQ0osR0FmSTtBQWlCTEMsRUFBQUEsU0FqQkssdUJBaUJNLENBQ1YsQ0FsQkk7QUFvQkxMLEVBQUFBLGdCQXBCSyw0QkFvQllNLEtBcEJaLEVBb0JrQjtBQUNuQkMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksaUJBQVosRUFBOEJDLE9BQU8sQ0FBQ0MsT0FBdEM7O0FBQ0EsUUFBR0QsT0FBTyxDQUFDRSxVQUFSLElBQW9CLElBQXBCLElBQTJCRixPQUFPLENBQUNDLE9BQVIsSUFBbUIsS0FBakQsRUFBdUQ7QUFFbkRELE1BQUFBLE9BQU8sQ0FBQ0csT0FBUixDQUFnQkMsSUFBaEIsQ0FBcUJDLE1BQU0sQ0FBQ0MseUJBQTVCLEVBQXVEO0FBQ25EQyxRQUFBQSxPQUFPLEVBQUU7QUFEMEMsT0FBdkQ7QUFHQTtBQUNIOztBQUNELFFBQUcxQixFQUFFLENBQUNXLEdBQUgsQ0FBT0MsUUFBUCxJQUFtQlosRUFBRSxDQUFDVyxHQUFILENBQU9FLGNBQTdCLEVBQTRDO0FBQUU7QUFDMUNJLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFNBQVosRUFBc0JDLE9BQU8sQ0FBQ0UsVUFBOUI7QUFDQU0sTUFBQUEsRUFBRSxDQUFDQyxlQUFILENBQW1CO0FBQ2ZDLFFBQUFBLE9BQU8sRUFBRSxPQURNO0FBRWZDLFFBQUFBLEtBQUssRUFBRU4sTUFBTSxDQUFDTyx1QkFGQztBQUdmQyxRQUFBQSxRQUFRLEVBQUUsRUFISztBQUlmQyxRQUFBQSxLQUFLLEVBQUUsRUFKUTtBQUtmQyxRQUFBQSxLQUFLLEVBQUU7QUFDUEMsVUFBQUEsU0FBUyxFQUFFaEIsT0FBTyxDQUFDRSxVQURaO0FBQ3dCO0FBQy9CZSxVQUFBQSxXQUFXLEVBQUUsQ0FBQyxXQUFTWixNQUFNLENBQUNPLHVCQUFoQixHQUF3QyxLQUF6QztBQUZOLFNBTFE7QUFTZk0sUUFBQUEsT0FUZSxxQkFTTDtBQUNOcEIsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksUUFBWjtBQUNILFNBWGM7QUFZZm9CLFFBQUFBLElBWmUsZ0JBWVZDLENBWlUsRUFZUDtBQUVKcEIsVUFBQUEsT0FBTyxDQUFDRyxPQUFSLENBQWdCQyxJQUFoQixDQUFxQkMsTUFBTSxDQUFDQyx5QkFBNUIsRUFBdUQ7QUFDbkRDLFlBQUFBLE9BQU8sRUFBRTtBQUQwQyxXQUF2RDtBQUdIO0FBakJjLE9BQW5CO0FBbUJIO0FBQ0osR0FuREk7QUFxRExjLEVBQUFBLEtBckRLLG1CQXFESSxDQUVSLENBdkRJLENBd0RMOztBQXhESyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxudmFyIHJlY29yZGVyO1xyXG52YXIgdmlkZW9QYXRoR2FtZTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMuc2hhcmVCdG5DYWxsQmFjayx0aGlzKTtcclxuICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkJZVEVEQU5DRV9HQU1FKXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGVzdHJveSgpe1xyXG4gICAgfSxcclxuXHJcbiAgICBzaGFyZUJ0bkNhbGxCYWNrKGV2ZW50KXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFwcEdhbWUuaXNDbGlja1wiLGFwcEdhbWUuaXNDbGljaylcclxuICAgICAgICBpZihhcHBHYW1lLnNjcmVlblBhdGg9PW51bGx8fCBhcHBHYW1lLmlzQ2xpY2sgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYXBwR2FtZS5lbWl0dGVyLmVtaXQoY29uc3RzLkxPQ0FMX0VWRU5UX1BPUFVQX0xPQURUSVAsIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwi5b2V5bGP5pe26Ze05aSq55+t77yB77yB77yBXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5CWVRFREFOQ0VfR0FNRSl7IC8v5aS05p2h5bmz5Y+wXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5aS05p2h5bmz5Y+wPT09XCIsYXBwR2FtZS5zY3JlZW5QYXRoKVxyXG4gICAgICAgICAgICB0dC5zaGFyZUFwcE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgY2hhbm5lbDogJ3ZpZGVvJyxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBjb25zdHMuSFRUUF9SRUNPUkRfUEFDS0FHRU5BTUUsXHJcbiAgICAgICAgICAgICAgICBpbWFnZVVybDogJycsXHJcbiAgICAgICAgICAgICAgICBxdWVyeTogJycsXHJcbiAgICAgICAgICAgICAgICBleHRyYToge1xyXG4gICAgICAgICAgICAgICAgdmlkZW9QYXRoOiBhcHBHYW1lLnNjcmVlblBhdGgsIC8vIOWPr+eUqOW9leWxj+W+l+WIsOeahOinhumikeWcsOWdgFxyXG4gICAgICAgICAgICAgICAgdmlkZW9Ub3BpY3M6IFsn5aSn5a625LiA6LW35p2l546pJytjb25zdHMuSFRUUF9SRUNPUkRfUEFDS0FHRU5BTUUrJ++8ge+8ge+8gSddXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5YiG5Lqr6KeG6aKR5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbChlKSB7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcEdhbWUuZW1pdHRlci5lbWl0KGNvbnN0cy5MT0NBTF9FVkVOVF9QT1BVUF9MT0FEVElQLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwi5YiG5Lqr6KeG6aKR5aSx6LSlXCJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19