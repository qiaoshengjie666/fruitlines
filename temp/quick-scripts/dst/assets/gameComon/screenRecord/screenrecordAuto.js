
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/screenRecord/screenrecordAuto.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '71551ofyTNLwYogYvGLy2hf', 'screenrecordAuto');
// gameComon/screenRecord/screenrecordAuto.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var recorder;
var screenTime;
var ScreenAuto = cc.Class({
  properties: {},
  ctor: function ctor() {
    this.instance = null;
  },
  statics: {
    create: function create(data) {
      if (!this.instance) {
        this.instance = new ScreenAuto();
        this.instance.initWithData(data);
        return this.instance;
      }
    }
  },
  onDestroy: function onDestroy() {
    clearTimeout(screenTime);
  },
  initWithData: function initWithData(data) {},
  playScreenCap: function playScreenCap(caping) {
    if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
      //头条平台
      if (caping) {
        appGame.isClick = false;
        screenTime = setTimeout(function () {
          console.log("setTimeout");
          appGame.isClick = true;
          clearTimeout(screenTime);
        }.bind(this), 5000);
        if (!recorder) recorder = tt.getGameRecorderManager();
        recorder.start({
          duration: 10000
        });
        recorder.onStart(function (res) {
          console.log('开始录屏');
        });
        recorder.onStop(function (res) {
          console.log('录屏结束==' + res.videoPath);
          appGame.screenPath = res.videoPath;
        });
      } else {
        clearTimeout(screenTime);
        console.log("clearTimeout");
        if (!recorder) recorder = tt.getGameRecorderManager();
        recorder.stop();
        recorder.onStop(function (res) {
          appGame.screenPath = res.videoPath;
        });
      }
    }
  }
});
module.exports = ScreenAuto;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JlZW5SZWNvcmRcXHNjcmVlbnJlY29yZEF1dG8uanMiXSwibmFtZXMiOlsicmVjb3JkZXIiLCJzY3JlZW5UaW1lIiwiU2NyZWVuQXV0byIsImNjIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwiY3RvciIsImluc3RhbmNlIiwic3RhdGljcyIsImNyZWF0ZSIsImRhdGEiLCJpbml0V2l0aERhdGEiLCJvbkRlc3Ryb3kiLCJjbGVhclRpbWVvdXQiLCJwbGF5U2NyZWVuQ2FwIiwiY2FwaW5nIiwic3lzIiwicGxhdGZvcm0iLCJCWVRFREFOQ0VfR0FNRSIsImFwcEdhbWUiLCJpc0NsaWNrIiwic2V0VGltZW91dCIsImNvbnNvbGUiLCJsb2ciLCJiaW5kIiwidHQiLCJnZXRHYW1lUmVjb3JkZXJNYW5hZ2VyIiwic3RhcnQiLCJkdXJhdGlvbiIsIm9uU3RhcnQiLCJyZXMiLCJvblN0b3AiLCJ2aWRlb1BhdGgiLCJzY3JlZW5QYXRoIiwic3RvcCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsUUFBSjtBQUNBLElBQUlDLFVBQUo7QUFDQSxJQUFJQyxVQUFVLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3RCQyxFQUFBQSxVQUFVLEVBQUUsRUFEVTtBQUd0QkMsRUFBQUEsSUFIc0Isa0JBR2hCO0FBQ0YsU0FBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNILEdBTHFCO0FBTXRCQyxFQUFBQSxPQUFPLEVBQUU7QUFDTEMsSUFBQUEsTUFBTSxFQUFFLGdCQUFVQyxJQUFWLEVBQWdCO0FBQ3BCLFVBQUcsQ0FBQyxLQUFLSCxRQUFULEVBQWtCO0FBQ2QsYUFBS0EsUUFBTCxHQUFnQixJQUFJTCxVQUFKLEVBQWhCO0FBQ0EsYUFBS0ssUUFBTCxDQUFjSSxZQUFkLENBQTJCRCxJQUEzQjtBQUNBLGVBQU8sS0FBS0gsUUFBWjtBQUNIO0FBQ0o7QUFQSSxHQU5hO0FBZXRCSyxFQUFBQSxTQWZzQix1QkFlWDtBQUNQQyxJQUFBQSxZQUFZLENBQUNaLFVBQUQsQ0FBWjtBQUNILEdBakJxQjtBQWtCdEJVLEVBQUFBLFlBbEJzQix3QkFrQlRELElBbEJTLEVBa0JKLENBQ2pCLENBbkJxQjtBQXFCdEJJLEVBQUFBLGFBckJzQix5QkFxQlJDLE1BckJRLEVBcUJEO0FBSWpCLFFBQUdaLEVBQUUsQ0FBQ2EsR0FBSCxDQUFPQyxRQUFQLElBQW1CZCxFQUFFLENBQUNhLEdBQUgsQ0FBT0UsY0FBN0IsRUFBNEM7QUFBRTtBQUMxQyxVQUFHSCxNQUFILEVBQVU7QUFDTkksUUFBQUEsT0FBTyxDQUFDQyxPQUFSLEdBQWtCLEtBQWxCO0FBQ0FuQixRQUFBQSxVQUFVLEdBQUdvQixVQUFVLENBQUMsWUFBVztBQUMvQkMsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksWUFBWjtBQUNBSixVQUFBQSxPQUFPLENBQUNDLE9BQVIsR0FBa0IsSUFBbEI7QUFDQVAsVUFBQUEsWUFBWSxDQUFDWixVQUFELENBQVo7QUFDSCxTQUp1QixDQUl0QnVCLElBSnNCLENBSWpCLElBSmlCLENBQUQsRUFJVCxJQUpTLENBQXZCO0FBTUEsWUFBRyxDQUFDeEIsUUFBSixFQUFjQSxRQUFRLEdBQUd5QixFQUFFLENBQUNDLHNCQUFILEVBQVg7QUFDZDFCLFFBQUFBLFFBQVEsQ0FBQzJCLEtBQVQsQ0FBZTtBQUNYQyxVQUFBQSxRQUFRLEVBQUU7QUFEQyxTQUFmO0FBSUE1QixRQUFBQSxRQUFRLENBQUM2QixPQUFULENBQWlCLFVBQUFDLEdBQUcsRUFBRztBQUNuQlIsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWjtBQUNILFNBRkQ7QUFJQXZCLFFBQUFBLFFBQVEsQ0FBQytCLE1BQVQsQ0FBZ0IsVUFBQUQsR0FBRyxFQUFHO0FBQ2xCUixVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxXQUFTTyxHQUFHLENBQUNFLFNBQXpCO0FBQ0FiLFVBQUFBLE9BQU8sQ0FBQ2MsVUFBUixHQUFxQkgsR0FBRyxDQUFDRSxTQUF6QjtBQUNILFNBSEQ7QUFJSCxPQXJCRCxNQXFCSztBQUNEbkIsUUFBQUEsWUFBWSxDQUFDWixVQUFELENBQVo7QUFDQXFCLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVo7QUFDQSxZQUFHLENBQUN2QixRQUFKLEVBQWNBLFFBQVEsR0FBR3lCLEVBQUUsQ0FBQ0Msc0JBQUgsRUFBWDtBQUNkMUIsUUFBQUEsUUFBUSxDQUFDa0MsSUFBVDtBQUNBbEMsUUFBQUEsUUFBUSxDQUFDK0IsTUFBVCxDQUFnQixVQUFDRCxHQUFELEVBQVM7QUFDckJYLFVBQUFBLE9BQU8sQ0FBQ2MsVUFBUixHQUFxQkgsR0FBRyxDQUFDRSxTQUF6QjtBQUNILFNBRkQ7QUFHSDtBQUNKO0FBQ0o7QUF6RHFCLENBQVQsQ0FBakI7QUEyREFHLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmxDLFVBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxudmFyIHJlY29yZGVyO1xyXG52YXIgc2NyZWVuVGltZTtcclxudmFyIFNjcmVlbkF1dG8gPSBjYy5DbGFzcyh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICB9LFxyXG4gICAgY3Rvcigpe1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgfSxcclxuICAgIHN0YXRpY3M6IHtcclxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmluc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgU2NyZWVuQXV0bygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5pbml0V2l0aERhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkRlc3Ryb3koKXtcclxuICAgICAgICBjbGVhclRpbWVvdXQoc2NyZWVuVGltZSk7XHJcbiAgICB9LFxyXG4gICAgaW5pdFdpdGhEYXRhKGRhdGEpe1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5U2NyZWVuQ2FwKGNhcGluZyl7XHJcbiBcclxuXHJcbiAgICBcclxuICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkJZVEVEQU5DRV9HQU1FKXsgLy/lpLTmnaHlubPlj7BcclxuICAgICAgICAgICAgaWYoY2FwaW5nKXtcclxuICAgICAgICAgICAgICAgIGFwcEdhbWUuaXNDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc2NyZWVuVGltZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZXRUaW1lb3V0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwR2FtZS5pc0NsaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc2NyZWVuVGltZSk7XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksIDUwMDApO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoIXJlY29yZGVyKSByZWNvcmRlciA9IHR0LmdldEdhbWVSZWNvcmRlck1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHJlY29yZGVyLnN0YXJ0KHtcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMDAsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJlY29yZGVyLm9uU3RhcnQocmVzID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflvIDlp4vlvZXlsY8nKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmVjb3JkZXIub25TdG9wKHJlcyA9PntcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5b2V5bGP57uT5p2fPT0nK3Jlcy52aWRlb1BhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcEdhbWUuc2NyZWVuUGF0aCA9IHJlcy52aWRlb1BhdGg7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc2NyZWVuVGltZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsZWFyVGltZW91dFwiKVxyXG4gICAgICAgICAgICAgICAgaWYoIXJlY29yZGVyKSByZWNvcmRlciA9IHR0LmdldEdhbWVSZWNvcmRlck1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHJlY29yZGVyLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgIHJlY29yZGVyLm9uU3RvcCgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwR2FtZS5zY3JlZW5QYXRoID0gcmVzLnZpZGVvUGF0aDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxubW9kdWxlLmV4cG9ydHMgPSBTY3JlZW5BdXRvO1xyXG4iXX0=