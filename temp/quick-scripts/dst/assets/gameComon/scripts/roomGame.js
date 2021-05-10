
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/roomGame.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'beb9925+ZFD6pMLNAwAhYoo', 'roomGame');
// gameComon/scripts/roomGame.js

"use strict";

/*游戏配置文件获取*/
var Room = require('room');

var consts = require('./model/consts');

var RoomGame = cc.Class({
  "extends": Room,
  statics: {
    create: function create(data) {
      var roomObj = new RoomGame();
      roomObj.initWithData(data);
      return roomObj;
    }
  },
  initWithData: function initWithData(data) {
    this._super(data.room); //录屏路径


    this.videoPath = ''; //获取录屏的系统时间

    this.screenTime = 0;
    this.gameConfigData = {};
    this.wordRid = '';
    this.configSuccess2 = false;
    var url = consts.HTTP_GET_PAAS_DATA_SERVER + "?gameId=" + consts.GAME_ID + "&plat=" + appGame.platform + "&version=" + appGame.packageVersion + "&brand=" + '' + "&from=game"; //url = 'https://cs.snmi.cn/game/GetGameValue?gameId=50&plat=baidu&version=1.0.0&brand=&from=game'

    console.log("ad url===" + url);
    util.getUrlSerConfig(url, 'json', 'game', function (data) {
      this.gameConfigData = data;
      console.log("game ==" + JSON.stringify(this.gameConfigData));
      this.configSuccess2 = true;

      if (this.configSuccess2 && this.configSuccess1) {
        appGame.gameServerRoom.emit(consts.CLIENT_GAME_START, {});
      }
    }.bind(this));
  }
});
module.exports = RoomGame;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JpcHRzXFxyb29tR2FtZS5qcyJdLCJuYW1lcyI6WyJSb29tIiwicmVxdWlyZSIsImNvbnN0cyIsIlJvb21HYW1lIiwiY2MiLCJDbGFzcyIsInN0YXRpY3MiLCJjcmVhdGUiLCJkYXRhIiwicm9vbU9iaiIsImluaXRXaXRoRGF0YSIsIl9zdXBlciIsInJvb20iLCJ2aWRlb1BhdGgiLCJzY3JlZW5UaW1lIiwiZ2FtZUNvbmZpZ0RhdGEiLCJ3b3JkUmlkIiwiY29uZmlnU3VjY2VzczIiLCJ1cmwiLCJIVFRQX0dFVF9QQUFTX0RBVEFfU0VSVkVSIiwiR0FNRV9JRCIsImFwcEdhbWUiLCJwbGF0Zm9ybSIsInBhY2thZ2VWZXJzaW9uIiwiY29uc29sZSIsImxvZyIsInV0aWwiLCJnZXRVcmxTZXJDb25maWciLCJKU09OIiwic3RyaW5naWZ5IiwiY29uZmlnU3VjY2VzczEiLCJnYW1lU2VydmVyUm9vbSIsImVtaXQiLCJDTElFTlRfR0FNRV9TVEFSVCIsImJpbmQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFsQjs7QUFDQSxJQUFNQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxnQkFBRCxDQUF0Qjs7QUFDQSxJQUFJRSxRQUFRLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3BCLGFBQVNMLElBRFc7QUFHcEJNLEVBQUFBLE9BQU8sRUFBRTtBQUNMQyxJQUFBQSxNQUFNLEVBQUUsZ0JBQVVDLElBQVYsRUFBZ0I7QUFDcEIsVUFBSUMsT0FBTyxHQUFHLElBQUlOLFFBQUosRUFBZDtBQUNBTSxNQUFBQSxPQUFPLENBQUNDLFlBQVIsQ0FBcUJGLElBQXJCO0FBQ0EsYUFBT0MsT0FBUDtBQUNIO0FBTEksR0FIVztBQVVwQkMsRUFBQUEsWUFBWSxFQUFFLHNCQUFVRixJQUFWLEVBQWdCO0FBQzFCLFNBQUtHLE1BQUwsQ0FBWUgsSUFBSSxDQUFDSSxJQUFqQixFQUQwQixDQUUxQjs7O0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixFQUFqQixDQUgwQixDQUkxQjs7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQixFQUF0QjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQixLQUF0QjtBQUNBLFFBQUlDLEdBQUcsR0FBR2hCLE1BQU0sQ0FBQ2lCLHlCQUFQLEdBQWlDLFVBQWpDLEdBQTRDakIsTUFBTSxDQUFDa0IsT0FBbkQsR0FBMkQsUUFBM0QsR0FBb0VDLE9BQU8sQ0FBQ0MsUUFBNUUsR0FDTixXQURNLEdBQ01ELE9BQU8sQ0FBQ0UsY0FEZCxHQUM2QixTQUQ3QixHQUN1QyxFQUR2QyxHQUMwQyxZQURwRCxDQVQwQixDQVcxQjs7QUFDQUMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWVAsR0FBeEI7QUFDQVEsSUFBQUEsSUFBSSxDQUFDQyxlQUFMLENBQXFCVCxHQUFyQixFQUF5QixNQUF6QixFQUFnQyxNQUFoQyxFQUF1QyxVQUFTVixJQUFULEVBQWM7QUFDakQsV0FBS08sY0FBTCxHQUFzQlAsSUFBdEI7QUFDQWdCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFlBQVVHLElBQUksQ0FBQ0MsU0FBTCxDQUFlLEtBQUtkLGNBQXBCLENBQXRCO0FBQ0EsV0FBS0UsY0FBTCxHQUFzQixJQUF0Qjs7QUFDQSxVQUFHLEtBQUtBLGNBQUwsSUFBdUIsS0FBS2EsY0FBL0IsRUFBOEM7QUFDMUNULFFBQUFBLE9BQU8sQ0FBQ1UsY0FBUixDQUF1QkMsSUFBdkIsQ0FBNEI5QixNQUFNLENBQUMrQixpQkFBbkMsRUFBcUQsRUFBckQ7QUFDSDtBQUNKLEtBUHNDLENBT3JDQyxJQVBxQyxDQU9oQyxJQVBnQyxDQUF2QztBQVFIO0FBL0JtQixDQUFULENBQWY7QUFrQ0FDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmpDLFFBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKua4uOaIj+mFjee9ruaWh+S7tuiOt+WPliovXHJcbnZhciBSb29tID0gcmVxdWlyZSgncm9vbScpO1xyXG5jb25zdCBjb25zdHMgPSByZXF1aXJlKCcuL21vZGVsL2NvbnN0cycpO1xyXG52YXIgUm9vbUdhbWUgPSBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBSb29tLFxyXG5cclxuICAgIHN0YXRpY3M6IHtcclxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCByb29tT2JqID0gbmV3IFJvb21HYW1lKCk7XHJcbiAgICAgICAgICAgIHJvb21PYmouaW5pdFdpdGhEYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gcm9vbU9iajtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW5pdFdpdGhEYXRhOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKGRhdGEucm9vbSk7XHJcbiAgICAgICAgLy/lvZXlsY/ot6/lvoRcclxuICAgICAgICB0aGlzLnZpZGVvUGF0aCA9ICcnO1xyXG4gICAgICAgIC8v6I635Y+W5b2V5bGP55qE57O757uf5pe26Ze0XHJcbiAgICAgICAgdGhpcy5zY3JlZW5UaW1lID0gMDtcclxuICAgICAgICB0aGlzLmdhbWVDb25maWdEYXRhID0ge307XHJcbiAgICAgICAgdGhpcy53b3JkUmlkID0gJyc7XHJcbiAgICAgICAgdGhpcy5jb25maWdTdWNjZXNzMiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB1cmwgPSBjb25zdHMuSFRUUF9HRVRfUEFBU19EQVRBX1NFUlZFUitcIj9nYW1lSWQ9XCIrY29uc3RzLkdBTUVfSUQrXCImcGxhdD1cIithcHBHYW1lLnBsYXRmb3JtXHJcbiAgICAgICAgICAgK1wiJnZlcnNpb249XCIrYXBwR2FtZS5wYWNrYWdlVmVyc2lvbitcIiZicmFuZD1cIisnJytcIiZmcm9tPWdhbWVcIjtcclxuICAgICAgICAvL3VybCA9ICdodHRwczovL2NzLnNubWkuY24vZ2FtZS9HZXRHYW1lVmFsdWU/Z2FtZUlkPTUwJnBsYXQ9YmFpZHUmdmVyc2lvbj0xLjAuMCZicmFuZD0mZnJvbT1nYW1lJ1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWQgdXJsPT09XCIrdXJsKVxyXG4gICAgICAgIHV0aWwuZ2V0VXJsU2VyQ29uZmlnKHVybCwnanNvbicsJ2dhbWUnLGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVDb25maWdEYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJnYW1lID09XCIrSlNPTi5zdHJpbmdpZnkodGhpcy5nYW1lQ29uZmlnRGF0YSkpXHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnU3VjY2VzczIgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZih0aGlzLmNvbmZpZ1N1Y2Nlc3MyICYmIHRoaXMuY29uZmlnU3VjY2VzczEpe1xyXG4gICAgICAgICAgICAgICAgYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5lbWl0KGNvbnN0cy5DTElFTlRfR0FNRV9TVEFSVCx7fSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJvb21HYW1lO1xyXG4iXX0=