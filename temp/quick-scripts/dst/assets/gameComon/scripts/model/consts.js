
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/model/consts.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f36fcCR/lBD/qmR2CZ3f4L4', 'consts');
// gameComon/scripts/model/consts.js

"use strict";

var consts = {
  CLIENT_GAME_START: "client.onGameStart",
  LOCAL_EVENT_POPUP_LOADTIP: "localEventPopupLoadTip",
  //提示框,
  LOCAL_EVENT_POPUP_DIALOG: "localEventPopupDialog",
  //对话框,
  LOCAL_EVENT_POPUP_GAME_COMMON: "localEventPopupGameCommon",
  //公用prefab
  LOCAL_GAME_RESULT_NATIVE_AD: "client.onResultNativeAD",
  //原生广告
  CLIENT_GAME_VIDEO_SHOW: "client.onGameShowVideo",
  CLIENT_GAME_RESULT_VIDEO_SHOW: "client.onGameResultShowVideo",
  CLIENT_GAME_PLAY_VIDEO: "client.onGamePlayVideo",
  HTTP_RECORD_SERVER: "https://l.h5120.com/te/tk/gameapplist",
  HTTP_EVENT_MIDDLE_DESK_CONFIG: "client.onGameMiddleDeskConfig",
  //获取配置

  /*需要修改的配置*/
  HTTP_RECORD_PACKAGE: 'com.snmi.crazyremove',
  //包名
  HTTP_RECORD_PACKAGENAME: '疯狂消消消',
  //游戏名
  GAME_ID: 15,
  HTTP_GET_PAAS_DATA_SERVER: 'https://cs.snmi.cn/game/GetGameValue',
  //获取中台服务器配置
  HTTP_GET_GAME_DATA_SERVER: 'https://cs.snmi.cn/switch/GetGameValue',
  //获取游戏服务器配置

  /*不需要修改的配置*/
  HTTP_SPREAD_WORD: "https://s.snmi.cn/game/kl",
  HTTP_SPREAD_REPORT: "https://t.h5data.com/d/gkl?",
  HTTP_SPREAD_CLOSE: "https://t.h5data.com/d/gclose?rid=" // https://l.h5120.com  //打点
  // https://cs.snmi.cn   //互跳
  // https://t.h5data.com  //互跳
  // https://s.snmi.cn   //配置
  // https://st.h5120.com  //下载

};
module.exports = consts;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JpcHRzXFxtb2RlbFxcY29uc3RzLmpzIl0sIm5hbWVzIjpbImNvbnN0cyIsIkNMSUVOVF9HQU1FX1NUQVJUIiwiTE9DQUxfRVZFTlRfUE9QVVBfTE9BRFRJUCIsIkxPQ0FMX0VWRU5UX1BPUFVQX0RJQUxPRyIsIkxPQ0FMX0VWRU5UX1BPUFVQX0dBTUVfQ09NTU9OIiwiTE9DQUxfR0FNRV9SRVNVTFRfTkFUSVZFX0FEIiwiQ0xJRU5UX0dBTUVfVklERU9fU0hPVyIsIkNMSUVOVF9HQU1FX1JFU1VMVF9WSURFT19TSE9XIiwiQ0xJRU5UX0dBTUVfUExBWV9WSURFTyIsIkhUVFBfUkVDT1JEX1NFUlZFUiIsIkhUVFBfRVZFTlRfTUlERExFX0RFU0tfQ09ORklHIiwiSFRUUF9SRUNPUkRfUEFDS0FHRSIsIkhUVFBfUkVDT1JEX1BBQ0tBR0VOQU1FIiwiR0FNRV9JRCIsIkhUVFBfR0VUX1BBQVNfREFUQV9TRVJWRVIiLCJIVFRQX0dFVF9HQU1FX0RBVEFfU0VSVkVSIiwiSFRUUF9TUFJFQURfV09SRCIsIkhUVFBfU1BSRUFEX1JFUE9SVCIsIkhUVFBfU1BSRUFEX0NMT1NFIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxNQUFNLEdBQUc7QUFDVEMsRUFBQUEsaUJBQWlCLEVBQUMsb0JBRFQ7QUFFVEMsRUFBQUEseUJBQXlCLEVBQUMsd0JBRmpCO0FBRTJDO0FBQ3BEQyxFQUFBQSx3QkFBd0IsRUFBRSx1QkFIakI7QUFHMEM7QUFDbkRDLEVBQUFBLDZCQUE2QixFQUFFLDJCQUp0QjtBQUltRDtBQUM1REMsRUFBQUEsMkJBQTJCLEVBQUUseUJBTHBCO0FBSytDO0FBQ3hEQyxFQUFBQSxzQkFBc0IsRUFBQyx3QkFOZDtBQU9UQyxFQUFBQSw2QkFBNkIsRUFBQyw4QkFQckI7QUFRVEMsRUFBQUEsc0JBQXNCLEVBQUMsd0JBUmQ7QUFTVEMsRUFBQUEsa0JBQWtCLEVBQUMsdUNBVFY7QUFVVEMsRUFBQUEsNkJBQTZCLEVBQUMsK0JBVnJCO0FBVXNEOztBQUUvRDtBQUNBQyxFQUFBQSxtQkFBbUIsRUFBQyxzQkFiWDtBQWFtQztBQUM1Q0MsRUFBQUEsdUJBQXVCLEVBQUMsT0FkZjtBQWN3QjtBQUNqQ0MsRUFBQUEsT0FBTyxFQUFDLEVBZkM7QUFnQlRDLEVBQUFBLHlCQUF5QixFQUFDLHNDQWhCakI7QUFnQndEO0FBQ2pFQyxFQUFBQSx5QkFBeUIsRUFBQyx3Q0FqQmpCO0FBaUIwRDs7QUFDbkU7QUFDQUMsRUFBQUEsZ0JBQWdCLEVBQUMsMkJBbkJSO0FBb0JUQyxFQUFBQSxrQkFBa0IsRUFBQyw2QkFwQlY7QUFxQlRDLEVBQUFBLGlCQUFpQixFQUFDLG9DQXJCVCxDQXVCVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQTNCUyxDQUFiO0FBOEJBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJwQixNQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbnN0cyA9IHtcbiAgICBDTElFTlRfR0FNRV9TVEFSVDpcImNsaWVudC5vbkdhbWVTdGFydFwiLFxuICAgIExPQ0FMX0VWRU5UX1BPUFVQX0xPQURUSVA6XCJsb2NhbEV2ZW50UG9wdXBMb2FkVGlwXCIsIC8v5o+Q56S65qGGLFxuICAgIExPQ0FMX0VWRU5UX1BPUFVQX0RJQUxPRzogXCJsb2NhbEV2ZW50UG9wdXBEaWFsb2dcIiwgLy/lr7nor53moYYsXG4gICAgTE9DQUxfRVZFTlRfUE9QVVBfR0FNRV9DT01NT046IFwibG9jYWxFdmVudFBvcHVwR2FtZUNvbW1vblwiLCAvL+WFrOeUqHByZWZhYlxuICAgIExPQ0FMX0dBTUVfUkVTVUxUX05BVElWRV9BRDogXCJjbGllbnQub25SZXN1bHROYXRpdmVBRFwiLCAvL+WOn+eUn+W5v+WRilxuICAgIENMSUVOVF9HQU1FX1ZJREVPX1NIT1c6XCJjbGllbnQub25HYW1lU2hvd1ZpZGVvXCIsXG4gICAgQ0xJRU5UX0dBTUVfUkVTVUxUX1ZJREVPX1NIT1c6XCJjbGllbnQub25HYW1lUmVzdWx0U2hvd1ZpZGVvXCIsXG4gICAgQ0xJRU5UX0dBTUVfUExBWV9WSURFTzpcImNsaWVudC5vbkdhbWVQbGF5VmlkZW9cIixcbiAgICBIVFRQX1JFQ09SRF9TRVJWRVI6XCJodHRwczovL2wuaDUxMjAuY29tL3RlL3RrL2dhbWVhcHBsaXN0XCIsXG4gICAgSFRUUF9FVkVOVF9NSURETEVfREVTS19DT05GSUc6XCJjbGllbnQub25HYW1lTWlkZGxlRGVza0NvbmZpZ1wiLCAvL+iOt+WPlumFjee9rlxuXG4gICAgLyrpnIDopoHkv67mlLnnmoTphY3nva4qL1xuICAgIEhUVFBfUkVDT1JEX1BBQ0tBR0U6J2NvbS5zbm1pLmNyYXp5cmVtb3ZlJywgLy/ljIXlkI1cbiAgICBIVFRQX1JFQ09SRF9QQUNLQUdFTkFNRTon55av54uC5raI5raI5raIJywgLy/muLjmiI/lkI1cbiAgICBHQU1FX0lEOjE1LFxuICAgIEhUVFBfR0VUX1BBQVNfREFUQV9TRVJWRVI6J2h0dHBzOi8vY3Muc25taS5jbi9nYW1lL0dldEdhbWVWYWx1ZScsLy/ojrflj5bkuK3lj7DmnI3liqHlmajphY3nva5cbiAgICBIVFRQX0dFVF9HQU1FX0RBVEFfU0VSVkVSOidodHRwczovL2NzLnNubWkuY24vc3dpdGNoL0dldEdhbWVWYWx1ZScsLy/ojrflj5bmuLjmiI/mnI3liqHlmajphY3nva5cbiAgICAvKuS4jemcgOimgeS/ruaUueeahOmFjee9riovXG4gICAgSFRUUF9TUFJFQURfV09SRDpcImh0dHBzOi8vcy5zbm1pLmNuL2dhbWUva2xcIixcbiAgICBIVFRQX1NQUkVBRF9SRVBPUlQ6XCJodHRwczovL3QuaDVkYXRhLmNvbS9kL2drbD9cIixcbiAgICBIVFRQX1NQUkVBRF9DTE9TRTpcImh0dHBzOi8vdC5oNWRhdGEuY29tL2QvZ2Nsb3NlP3JpZD1cIixcblxuICAgIC8vIGh0dHBzOi8vbC5oNTEyMC5jb20gIC8v5omT54K5XG4gICAgLy8gaHR0cHM6Ly9jcy5zbm1pLmNuICAgLy/kupLot7NcbiAgICAvLyBodHRwczovL3QuaDVkYXRhLmNvbSAgLy/kupLot7NcbiAgICAvLyBodHRwczovL3Muc25taS5jbiAgIC8v6YWN572uXG4gICAgLy8gaHR0cHM6Ly9zdC5oNTEyMC5jb20gIC8v5LiL6L29XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnN0cztcbiJdfQ==