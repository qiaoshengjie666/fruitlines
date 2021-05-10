
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/room.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '690ef7tcntLt4eCVVAMIQ0O', 'room');
// gameComon/scripts/room.js

"use strict";

/*中台配置文件获取*/
var Emitter = require('emitter');

var consts = require('./model/consts');

var Room = cc.Class({
  "extends": Emitter,
  initWithData: function initWithData(data) {
    this.adConfig = {};
    this.commonConfig = {};
    this.configSuccess1 = false;
    this.isHadWord = false;
    async.waterfall([function (cb) {
      var url = consts.HTTP_GET_PAAS_DATA_SERVER + "?gameId=" + consts.GAME_ID + "&plat=all" + "&version=all" + "&brand=" + '' + "&from=ad"; //url = 'https://cs.snmi.cn/game/GetGameValue?gameId=50&plat=baidu&version=1.0.0&brand=&from=ad'

      console.log("ad url===" + url);
      util.getUrlSerConfig(url, 'comJson', 'comAdConfig', function (data) {
        this.adConfig = data;
        console.log("ad ==" + JSON.stringify(this.adConfig));
        appGame.emitter.emit(consts.HTTP_EVENT_MIDDLE_DESK_CONFIG, {});
        cb(null);
      }.bind(this));
    }.bind(this), function (cb) {
      var url = consts.HTTP_GET_PAAS_DATA_SERVER + "?gameId=" + consts.GAME_ID + "&plat=all" + "&version=all" + "&brand=" + '' + "&from=MiddleDesk"; //url = 'https://cs.snmi.cn/game/GetGameValue?gameId=50&plat=baidu&version=1.0.0&brand=&from=MiddleDesk'
      //console.log("middledesk url==="+url)

      util.getUrlSerConfig(url, 'comJson', 'comConfig', function (data) {
        this.commonConfig = data; // console.log("MiddleDesk =="+JSON.stringify(this.commonConfig))

        var wordShow = 0;

        if (cc.sys.platform == cc.sys.BAIDU_GAME) {
          wordShow = this.commonConfig.word.baidu;
          this.getPlatformConfig('baidu');
        } else if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'WX') {
          wordShow = this.commonConfig.word.WX;
          this.getPlatformConfig('WX');
        } else if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'QQ') {
          wordShow = this.commonConfig.word.QQ;
          this.getPlatformConfig('QQ');
        } else if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
          wordShow = this.commonConfig.word.toutiao;
          this.getPlatformConfig('toutiao');
        } else {
          this.getPlatformConfig('html5');
        }

        if (wordShow) {
          this.isHadWord = true;
          util.spreadWordFun();
        }

        this.configSuccess1 = true;

        if (this.configSuccess2 && this.configSuccess1) {
          appGame.gameServerRoom.emit(consts.CLIENT_GAME_START, {});
        }
      }.bind(this));
    }.bind(this)], function (err) {
      console.log("读取配置出错了!!");
    });
  },
  getPlatformConfig: function getPlatformConfig(plat) {
    this.commonConfig.sign = this.commonConfig.sign[plat];
    this.commonConfig.revive = this.commonConfig.revive[plat];
    this.commonConfig.result = this.commonConfig.result[plat];
    this.commonConfig.lucky = this.commonConfig.lucky[plat];
  }
});
module.exports = Room;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JpcHRzXFxyb29tLmpzIl0sIm5hbWVzIjpbIkVtaXR0ZXIiLCJyZXF1aXJlIiwiY29uc3RzIiwiUm9vbSIsImNjIiwiQ2xhc3MiLCJpbml0V2l0aERhdGEiLCJkYXRhIiwiYWRDb25maWciLCJjb21tb25Db25maWciLCJjb25maWdTdWNjZXNzMSIsImlzSGFkV29yZCIsImFzeW5jIiwid2F0ZXJmYWxsIiwiY2IiLCJ1cmwiLCJIVFRQX0dFVF9QQUFTX0RBVEFfU0VSVkVSIiwiR0FNRV9JRCIsImNvbnNvbGUiLCJsb2ciLCJ1dGlsIiwiZ2V0VXJsU2VyQ29uZmlnIiwiSlNPTiIsInN0cmluZ2lmeSIsImFwcEdhbWUiLCJlbWl0dGVyIiwiZW1pdCIsIkhUVFBfRVZFTlRfTUlERExFX0RFU0tfQ09ORklHIiwiYmluZCIsIndvcmRTaG93Iiwic3lzIiwicGxhdGZvcm0iLCJCQUlEVV9HQU1FIiwid29yZCIsImJhaWR1IiwiZ2V0UGxhdGZvcm1Db25maWciLCJXRUNIQVRfR0FNRSIsIldYIiwiUVEiLCJCWVRFREFOQ0VfR0FNRSIsInRvdXRpYW8iLCJzcHJlYWRXb3JkRnVuIiwiY29uZmlnU3VjY2VzczIiLCJnYW1lU2VydmVyUm9vbSIsIkNMSUVOVF9HQU1FX1NUQVJUIiwiZXJyIiwicGxhdCIsInNpZ24iLCJyZXZpdmUiLCJyZXN1bHQiLCJsdWNreSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFJQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxTQUFELENBQXJCOztBQUNBLElBQU1DLE1BQU0sR0FBR0QsT0FBTyxDQUFDLGdCQUFELENBQXRCOztBQUNBLElBQUlFLElBQUksR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDaEIsYUFBU0wsT0FETztBQUVoQk0sRUFBQUEsWUFBWSxFQUFFLHNCQUFVQyxJQUFWLEVBQWdCO0FBQzFCLFNBQUtDLFFBQUwsR0FB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O0FBQ0g7QUE1RGUsQ0FBVCxDQUFYO0FBK0RBSyxNQUFNLENBQUNDLE9BQVAsR0FBaUJqRCxJQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyrkuK3lj7DphY3nva7mlofku7bojrflj5YqL1xyXG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2VtaXR0ZXInKTtcclxuY29uc3QgY29uc3RzID0gcmVxdWlyZSgnLi9tb2RlbC9jb25zdHMnKTtcclxudmFyIFJvb20gPSBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBFbWl0dGVyLFxyXG4gICAgaW5pdFdpdGhEYXRhOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuYWRDb25maWcgPSB7fTtcclxuICAgICAgICB0aGlzLmNvbW1vbkNvbmZpZyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY29uZmlnU3VjY2VzczEgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzSGFkV29yZCA9IGZhbHNlO1xyXG4gICAgICAgIGFzeW5jLndhdGVyZmFsbChbZnVuY3Rpb24oY2Ipe1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gY29uc3RzLkhUVFBfR0VUX1BBQVNfREFUQV9TRVJWRVIrXCI/Z2FtZUlkPVwiK2NvbnN0cy5HQU1FX0lEK1wiJnBsYXQ9YWxsXCJcclxuICAgICAgICAgICArXCImdmVyc2lvbj1hbGxcIitcIiZicmFuZD1cIisnJytcIiZmcm9tPWFkXCI7XHJcbiAgICAgICAgICAgIC8vdXJsID0gJ2h0dHBzOi8vY3Muc25taS5jbi9nYW1lL0dldEdhbWVWYWx1ZT9nYW1lSWQ9NTAmcGxhdD1iYWlkdSZ2ZXJzaW9uPTEuMC4wJmJyYW5kPSZmcm9tPWFkJ1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFkIHVybD09PVwiK3VybClcclxuICAgICAgICAgICAgdXRpbC5nZXRVcmxTZXJDb25maWcodXJsLCdjb21Kc29uJywnY29tQWRDb25maWcnLGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZENvbmZpZyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFkID09XCIrSlNPTi5zdHJpbmdpZnkodGhpcy5hZENvbmZpZykpXHJcbiAgICAgICAgICAgICAgICBhcHBHYW1lLmVtaXR0ZXIuZW1pdChjb25zdHMuSFRUUF9FVkVOVF9NSURETEVfREVTS19DT05GSUcse30pO1xyXG4gICAgICAgICAgICAgICAgY2IobnVsbCk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLGZ1bmN0aW9uKGNiKXtcclxuICAgICAgICAgICAgbGV0IHVybCA9IGNvbnN0cy5IVFRQX0dFVF9QQUFTX0RBVEFfU0VSVkVSK1wiP2dhbWVJZD1cIitjb25zdHMuR0FNRV9JRCtcIiZwbGF0PWFsbFwiXHJcbiAgICAgICAgICAgK1wiJnZlcnNpb249YWxsXCIrXCImYnJhbmQ9XCIrJycrXCImZnJvbT1NaWRkbGVEZXNrXCI7XHJcbiAgICAgICAgICAgIC8vdXJsID0gJ2h0dHBzOi8vY3Muc25taS5jbi9nYW1lL0dldEdhbWVWYWx1ZT9nYW1lSWQ9NTAmcGxhdD1iYWlkdSZ2ZXJzaW9uPTEuMC4wJmJyYW5kPSZmcm9tPU1pZGRsZURlc2snXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJtaWRkbGVkZXNrIHVybD09PVwiK3VybClcclxuICAgICAgICAgICAgdXRpbC5nZXRVcmxTZXJDb25maWcodXJsLCdjb21Kc29uJywnY29tQ29uZmlnJyxmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tbW9uQ29uZmlnID0gZGF0YTtcclxuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJNaWRkbGVEZXNrID09XCIrSlNPTi5zdHJpbmdpZnkodGhpcy5jb21tb25Db25maWcpKVxyXG4gICAgICAgICAgICAgICAgbGV0IHdvcmRTaG93ID0gMDtcclxuICAgICAgICAgICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQkFJRFVfR0FNRSl7XHJcbiAgICAgICAgICAgICAgICAgICAgd29yZFNob3cgPSB0aGlzLmNvbW1vbkNvbmZpZy53b3JkLmJhaWR1O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGxhdGZvcm1Db25maWcoJ2JhaWR1Jyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FICYmIGFwcEdhbWUucGxhdGZvcm0gPT0gJ1dYJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgd29yZFNob3cgPSB0aGlzLmNvbW1vbkNvbmZpZy53b3JkLldYO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGxhdGZvcm1Db25maWcoJ1dYJyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FICYmIGFwcEdhbWUucGxhdGZvcm0gPT0gJ1FRJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgd29yZFNob3cgPSB0aGlzLmNvbW1vbkNvbmZpZy53b3JkLlFRO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGxhdGZvcm1Db25maWcoJ1FRJyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkJZVEVEQU5DRV9HQU1FKXtcclxuICAgICAgICAgICAgICAgICAgICB3b3JkU2hvdyA9IHRoaXMuY29tbW9uQ29uZmlnLndvcmQudG91dGlhbztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFBsYXRmb3JtQ29uZmlnKCd0b3V0aWFvJyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFBsYXRmb3JtQ29uZmlnKCdodG1sNScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYod29yZFNob3cpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNIYWRXb3JkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlsLnNwcmVhZFdvcmRGdW4oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnU3VjY2VzczEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jb25maWdTdWNjZXNzMiAmJiB0aGlzLmNvbmZpZ1N1Y2Nlc3MxKXtcclxuICAgICAgICAgICAgICAgICAgICBhcHBHYW1lLmdhbWVTZXJ2ZXJSb29tLmVtaXQoY29uc3RzLkNMSUVOVF9HQU1FX1NUQVJULHt9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9LmJpbmQodGhpcyldLGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K+75Y+W6YWN572u5Ye66ZSZ5LqGISFcIilcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBnZXRQbGF0Zm9ybUNvbmZpZyhwbGF0KXtcclxuICAgICAgICB0aGlzLmNvbW1vbkNvbmZpZy5zaWduID0gdGhpcy5jb21tb25Db25maWcuc2lnbltwbGF0XTtcclxuICAgICAgICB0aGlzLmNvbW1vbkNvbmZpZy5yZXZpdmUgPSB0aGlzLmNvbW1vbkNvbmZpZy5yZXZpdmVbcGxhdF07XHJcbiAgICAgICAgdGhpcy5jb21tb25Db25maWcucmVzdWx0ID0gdGhpcy5jb21tb25Db25maWcucmVzdWx0W3BsYXRdO1xyXG4gICAgICAgIHRoaXMuY29tbW9uQ29uZmlnLmx1Y2t5ID0gdGhpcy5jb21tb25Db25maWcubHVja3lbcGxhdF07XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUm9vbTtcclxuIl19