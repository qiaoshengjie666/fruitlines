
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/item.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '37e7b3Qh2JMQ5/8DSX2ow5C', 'item');
// gameComon/scripts/item.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    //cc.log("item onLoad")
    this.node.active = false;
  },
  start: function start() {},
  init: function init(id) {
    cc.log("item init");

    if (appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.item) {
      underscore.each(appGame.gameServerRoom.commonConfig.item, function (key, value) {
        if (key.id == id) {
          util.loadBundleSprite(key.bundle, key.sprite, this.node.getComponent(cc.Sprite), function () {
            this.node.active = true;
          }.bind(this));
        }
      }.bind(this));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JpcHRzXFxpdGVtLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwibm9kZSIsImFjdGl2ZSIsInN0YXJ0IiwiaW5pdCIsImlkIiwibG9nIiwiYXBwR2FtZSIsImdhbWVTZXJ2ZXJSb29tIiwiY29tbW9uQ29uZmlnIiwiaXRlbSIsInVuZGVyc2NvcmUiLCJlYWNoIiwia2V5IiwidmFsdWUiLCJ1dGlsIiwibG9hZEJ1bmRsZVNwcml0ZSIsImJ1bmRsZSIsInNwcml0ZSIsImdldENvbXBvbmVudCIsIlNwcml0ZSIsImJpbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxFQUhQO0FBT0w7QUFFQUMsRUFBQUEsTUFUSyxvQkFTSztBQUNOO0FBQ0EsU0FBS0MsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLEtBQW5CO0FBQ0gsR0FaSTtBQWNMQyxFQUFBQSxLQWRLLG1CQWNJLENBRVIsQ0FoQkk7QUFpQkxDLEVBQUFBLElBakJLLGdCQWlCQUMsRUFqQkEsRUFpQkc7QUFDSlQsSUFBQUEsRUFBRSxDQUFDVSxHQUFILENBQU8sV0FBUDs7QUFDQSxRQUFHQyxPQUFPLENBQUNDLGNBQVIsQ0FBdUJDLFlBQXZCLElBQXVDRixPQUFPLENBQUNDLGNBQVIsQ0FBdUJDLFlBQXZCLENBQW9DQyxJQUE5RSxFQUFtRjtBQUMvRUMsTUFBQUEsVUFBVSxDQUFDQyxJQUFYLENBQWdCTCxPQUFPLENBQUNDLGNBQVIsQ0FBdUJDLFlBQXZCLENBQW9DQyxJQUFwRCxFQUF5RCxVQUFTRyxHQUFULEVBQWFDLEtBQWIsRUFBbUI7QUFDeEUsWUFBR0QsR0FBRyxDQUFDUixFQUFKLElBQVVBLEVBQWIsRUFBZ0I7QUFDWlUsVUFBQUEsSUFBSSxDQUFDQyxnQkFBTCxDQUFzQkgsR0FBRyxDQUFDSSxNQUExQixFQUFpQ0osR0FBRyxDQUFDSyxNQUFyQyxFQUE0QyxLQUFLakIsSUFBTCxDQUFVa0IsWUFBVixDQUF1QnZCLEVBQUUsQ0FBQ3dCLE1BQTFCLENBQTVDLEVBQThFLFlBQVU7QUFDcEYsaUJBQUtuQixJQUFMLENBQVVDLE1BQVYsR0FBbUIsSUFBbkI7QUFDSCxXQUY2RSxDQUU1RW1CLElBRjRFLENBRXZFLElBRnVFLENBQTlFO0FBR0g7QUFDSixPQU53RCxDQU12REEsSUFOdUQsQ0FNbEQsSUFOa0QsQ0FBekQ7QUFPSDtBQUNKLEdBNUJJLENBOEJMOztBQTlCSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICAvL2NjLmxvZyhcIml0ZW0gb25Mb2FkXCIpXHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgaW5pdChpZCl7XHJcbiAgICAgICAgY2MubG9nKFwiaXRlbSBpbml0XCIpXHJcbiAgICAgICAgaWYoYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5jb21tb25Db25maWcgJiYgYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5jb21tb25Db25maWcuaXRlbSl7XHJcbiAgICAgICAgICAgIHVuZGVyc2NvcmUuZWFjaChhcHBHYW1lLmdhbWVTZXJ2ZXJSb29tLmNvbW1vbkNvbmZpZy5pdGVtLGZ1bmN0aW9uKGtleSx2YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICBpZihrZXkuaWQgPT0gaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWwubG9hZEJ1bmRsZVNwcml0ZShrZXkuYnVuZGxlLGtleS5zcHJpdGUsdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19