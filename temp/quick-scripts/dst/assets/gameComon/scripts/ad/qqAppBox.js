
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/ad/qqAppBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7f232spqwBHIq9QaGgCxceY', 'qqAppBox');
// gameComon/scripts/ad/qqAppBox.js

"use strict";

var QQAppBOX = cc.Class({
  "extends": cc.Component,
  properties: {},
  ctor: function ctor() {
    this.instance = null;
  },
  statics: {
    create: function create(data) {
      if (!this.instance) {
        this.instance = new QQAppBOX();
        this.instance.initWithData(data);
        return this.instance;
      }
    }
  },
  initWithData: function initWithData(data) {
    this.boxId = '';

    if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'QQ') {
      //QQ  
      var res = qq.getSystemInfoSync();
      this.width = res.windowWidth;
      this.height = res.windowHeight; // var Version2 = util.compareVersion(res.SDKVersion,"1.7.1");
      // if(Version2 > 0){

      this.boxId = "686b9ffc40992b21d352e841f3bb2085";

      if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.boxId && appGame.gameServerRoom.adConfig.boxId.QQ) {
        this.boxId = appGame.gameServerRoom.adConfig.boxId.QQ.adUnitId;
      }

      this.globalData = {
        appbox: qq.createAppBox({
          adUnitId: this.boxId
        })
      };
      httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
        title: '广告盒子',
        content: '创建成功',
        desc: this.boxId
      }, function () {}); // }else{
      //     httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'广告盒子',content:'基础库版本太低不创建广告盒子',desc:''},function(){})
      // }    
    }
  },
  playBox: function playBox(show) {
    var _this = this;

    if (this.globalData && this.globalData.appbox) {
      if (show) {
        this.globalData.appbox.load().then(function () {
          _this.globalData.appbox.show();

          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '广告盒子',
            content: '展示成功',
            desc: _this.boxId
          }, function () {});
        });
      } else {
        this.globalData.appbox.destroy();
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: '广告盒子',
          content: '隐藏',
          desc: this.boxId
        }, function () {});
      }
    }
  }
});
module.exports = QQAppBOX;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JpcHRzXFxhZFxccXFBcHBCb3guanMiXSwibmFtZXMiOlsiUVFBcHBCT1giLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImN0b3IiLCJpbnN0YW5jZSIsInN0YXRpY3MiLCJjcmVhdGUiLCJkYXRhIiwiaW5pdFdpdGhEYXRhIiwiYm94SWQiLCJzeXMiLCJwbGF0Zm9ybSIsIldFQ0hBVF9HQU1FIiwiYXBwR2FtZSIsInJlcyIsInFxIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJ3aWR0aCIsIndpbmRvd1dpZHRoIiwiaGVpZ2h0Iiwid2luZG93SGVpZ2h0IiwiZ2FtZVNlcnZlclJvb20iLCJhZENvbmZpZyIsIlFRIiwiYWRVbml0SWQiLCJnbG9iYWxEYXRhIiwiYXBwYm94IiwiY3JlYXRlQXBwQm94IiwiaHR0cFV0aWxzIiwiaHR0cFBvc3QiLCJjb25zdHMiLCJIVFRQX1JFQ09SRF9TRVJWRVIiLCJ0aXRsZSIsImNvbnRlbnQiLCJkZXNjIiwicGxheUJveCIsInNob3ciLCJsb2FkIiwidGhlbiIsImRlc3Ryb3kiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFFBQVEsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDcEIsYUFBU0QsRUFBRSxDQUFDRSxTQURRO0FBR3BCQyxFQUFBQSxVQUFVLEVBQUUsRUFIUTtBQUtwQkMsRUFBQUEsSUFMb0Isa0JBS2Q7QUFDRixTQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0gsR0FQbUI7QUFRcEJDLEVBQUFBLE9BQU8sRUFBRTtBQUNMQyxJQUFBQSxNQUFNLEVBQUUsZ0JBQVVDLElBQVYsRUFBZ0I7QUFDcEIsVUFBRyxDQUFDLEtBQUtILFFBQVQsRUFBa0I7QUFDZCxhQUFLQSxRQUFMLEdBQWdCLElBQUlOLFFBQUosRUFBaEI7QUFDQSxhQUFLTSxRQUFMLENBQWNJLFlBQWQsQ0FBMkJELElBQTNC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XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgfSxcclxuICAgIGN0b3IoKXtcclxuICAgICAgICB0aGlzLmluc3RhbmNlID0gbnVsbDtcclxuICAgIH0sXHJcbiAgICBzdGF0aWNzOiB7XHJcbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZighdGhpcy5pbnN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IFFRQXBwQk9YKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlLmluaXRXaXRoRGF0YShkYXRhKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGluaXRXaXRoRGF0YTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB0aGlzLmJveElkID0gJyc7XHJcbiAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSAmJmFwcEdhbWUucGxhdGZvcm0gPT0gJ1FRJyl7IC8vUVEgIFxyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBxcS5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gcmVzLndpbmRvd1dpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHJlcy53aW5kb3dIZWlnaHQ7XHJcbiAgICAgICAgICAgIC8vIHZhciBWZXJzaW9uMiA9IHV0aWwuY29tcGFyZVZlcnNpb24ocmVzLlNES1ZlcnNpb24sXCIxLjcuMVwiKTtcclxuICAgICAgICAgICAgLy8gaWYoVmVyc2lvbjIgPiAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm94SWQgPSBcIjY4NmI5ZmZjNDA5OTJiMjFkMzUyZTg0MWYzYmIyMDg1XCI7XHJcbiAgICAgICAgICAgICAgICBpZihhcHBHYW1lLmdhbWVTZXJ2ZXJSb29tLmFkQ29uZmlnICYmIGFwcEdhbWUuZ2FtZVNlcnZlclJvb20uYWRDb25maWcuYm94SWQgJiYgYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5hZENvbmZpZy5ib3hJZC5RUSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3hJZCA9IGFwcEdhbWUuZ2FtZVNlcnZlclJvb20uYWRDb25maWcuYm94SWQuUVEuYWRVbml0SWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwYm94OnFxLmNyZWF0ZUFwcEJveCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiB0aGlzLmJveElkXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGh0dHBVdGlscy5odHRwUG9zdChjb25zdHMuSFRUUF9SRUNPUkRfU0VSVkVSLHt0aXRsZTon5bm/5ZGK55uS5a2QJyxjb250ZW50OifliJvlu7rmiJDlip8nLGRlc2M6dGhpcy5ib3hJZH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gICAgIGh0dHBVdGlscy5odHRwUG9zdChjb25zdHMuSFRUUF9SRUNPUkRfU0VSVkVSLHt0aXRsZTon5bm/5ZGK55uS5a2QJyxjb250ZW50Oifln7rnoYDlupPniYjmnKzlpKrkvY7kuI3liJvlu7rlub/lkYrnm5LlrZAnLGRlc2M6Jyd9LGZ1bmN0aW9uKCl7fSlcclxuICAgICAgICAgICAgLy8gfSAgICBcclxuICAgICAgICB9ICAgICAgIFxyXG4gICAgfSxcclxuICAgIHBsYXlCb3g6ZnVuY3Rpb24oc2hvdyl7XHJcbiAgICAgICAgaWYodGhpcy5nbG9iYWxEYXRhICYmIHRoaXMuZ2xvYmFsRGF0YS5hcHBib3gpe1xyXG4gICAgICAgICAgICBpZihzaG93KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5hcHBib3gubG9hZCgpLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuYXBwYm94LnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICBodHRwVXRpbHMuaHR0cFBvc3QoY29uc3RzLkhUVFBfUkVDT1JEX1NFUlZFUix7dGl0bGU6J+W5v+WRiuebkuWtkCcsY29udGVudDon5bGV56S65oiQ5YqfJyxkZXNjOnRoaXMuYm94SWR9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuYXBwYm94LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIGh0dHBVdGlscy5odHRwUG9zdChjb25zdHMuSFRUUF9SRUNPUkRfU0VSVkVSLHt0aXRsZTon5bm/5ZGK55uS5a2QJyxjb250ZW50OifpmpDol48nLGRlc2M6dGhpcy5ib3hJZH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxubW9kdWxlLmV4cG9ydHMgPSBRUUFwcEJPWDsiXX0=