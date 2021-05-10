
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/platformFun.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '84833vJXhNMwZQ8web99yS6', 'platformFun');
// gameComon/scripts/platformFun.js

"use strict";

module.exports = {
  subscribeService: function subscribeService() {
    if (cc.sys.platform == cc.sys.BAIDU_GAME) {
      swan.subscribeService({
        templateId: '7519c8966fdd442d93cec1e0a30c3521',
        subscribeId: '1234',
        type: 'query',
        success: function success(res) {
          swan.showModal({
            title: 'success',
            content: JSON.stringify(res)
          });
        },
        fail: function fail(err) {
          swan.showModal({
            title: 'fail',
            content: JSON.stringify(err)
          });
        }
      });
    }
  }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JpcHRzXFxwbGF0Zm9ybUZ1bi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic3Vic2NyaWJlU2VydmljZSIsImNjIiwic3lzIiwicGxhdGZvcm0iLCJCQUlEVV9HQU1FIiwic3dhbiIsInRlbXBsYXRlSWQiLCJzdWJzY3JpYmVJZCIsInR5cGUiLCJzdWNjZXNzIiwicmVzIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiSlNPTiIsInN0cmluZ2lmeSIsImZhaWwiLCJlcnIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0FBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNiQyxFQUFBQSxnQkFBZ0IsRUFBRSw0QkFBWTtBQUMxQixRQUFHQyxFQUFFLENBQUNDLEdBQUgsQ0FBT0MsUUFBUCxJQUFtQkYsRUFBRSxDQUFDQyxHQUFILENBQU9FLFVBQTdCLEVBQXdDO0FBQ3BDQyxNQUFBQSxJQUFJLENBQUNMLGdCQUFMLENBQXNCO0FBQ2xCTSxRQUFBQSxVQUFVLEVBQUUsa0NBRE07QUFFbEJDLFFBQUFBLFdBQVcsRUFBRSxNQUZLO0FBR2xCQyxRQUFBQSxJQUFJLEVBQUUsT0FIWTtBQUlsQkMsUUFBQUEsT0FKa0IsbUJBSVZDLEdBSlUsRUFJTDtBQUNUTCxVQUFBQSxJQUFJLENBQUNNLFNBQUwsQ0FBZTtBQUNYQyxZQUFBQSxLQUFLLEVBQUUsU0FESTtBQUVYQyxZQUFBQSxPQUFPLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlTCxHQUFmO0FBRkUsV0FBZjtBQUlILFNBVGlCO0FBVWxCTSxRQUFBQSxJQVZrQixnQkFVYkMsR0FWYSxFQVVSO0FBQ05aLFVBQUFBLElBQUksQ0FBQ00sU0FBTCxDQUFlO0FBQ1hDLFlBQUFBLEtBQUssRUFBRSxNQURJO0FBRVhDLFlBQUFBLE9BQU8sRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWVFLEdBQWY7QUFGRSxXQUFmO0FBSUg7QUFmaUIsT0FBdEI7QUFpQkg7QUFDSjtBQXJCWSxDQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBzdWJzY3JpYmVTZXJ2aWNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5CQUlEVV9HQU1FKXtcclxuICAgICAgICAgICAgc3dhbi5zdWJzY3JpYmVTZXJ2aWNlKHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlSWQ6ICc3NTE5Yzg5NjZmZGQ0NDJkOTNjZWMxZTBhMzBjMzUyMScsXHJcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVJZDogJzEyMzQnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1ZXJ5JyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dhbi5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBKU09OLnN0cmluZ2lmeShyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2FuLnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnZmFpbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IEpTT04uc3RyaW5naWZ5KGVycilcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59Il19