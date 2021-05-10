
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/changeGame.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'afdd0LsL2lP35RKLODURjeW', 'changeGame');
// gameComon/scripts/changeGame.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {// foo: {
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
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_END, this.onChangeGameBtnCallBack, this);
  },
  start: function start() {},
  onChangeGameBtnCallBack: function onChangeGameBtnCallBack(event) {
    if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
      var systemInfo = tt.getSystemInfoSync(); // iOS 不支持，建议先检测再使用

      if (systemInfo.platform !== "ios") {
        // 打开互跳弹窗
        tt.showMoreGamesModal({
          appLaunchOptions: [{
            appId: "tt7fbb0906e080eb91",
            extraData: {}
          }, {
            appId: "tt71aa0717ee919412",
            extraData: {}
          }, {
            appId: "tt83a9f5141c9278e6",
            extraData: {}
          }, {
            appId: "tt1b516dec846adc47",
            extraData: {}
          }, {
            appId: "ttcf78b9c550430232",
            extraData: {}
          }, {
            appId: "tt62341489fd0f437a",
            extraData: {}
          }],
          success: function success(res) {
            console.log("success", res.errMsg);
          },
          fail: function fail(res) {
            console.log("fail", res.errMsg);
          }
        });
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JpcHRzXFxjaGFuZ2VHYW1lLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwibm9kZSIsIm9uIiwiTm9kZSIsIkV2ZW50VHlwZSIsIlRPVUNIX0VORCIsIm9uQ2hhbmdlR2FtZUJ0bkNhbGxCYWNrIiwic3RhcnQiLCJldmVudCIsInN5cyIsInBsYXRmb3JtIiwiQllURURBTkNFX0dBTUUiLCJzeXN0ZW1JbmZvIiwidHQiLCJnZXRTeXN0ZW1JbmZvU3luYyIsInNob3dNb3JlR2FtZXNNb2RhbCIsImFwcExhdW5jaE9wdGlvbnMiLCJhcHBJZCIsImV4dHJhRGF0YSIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZXJyTXNnIiwiZmFpbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLENBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZlEsR0FIUDtBQXFCTDtBQUVBQyxFQUFBQSxNQXZCSyxvQkF1Qks7QUFDTixTQUFLQyxJQUFMLENBQVVDLEVBQVYsQ0FBYU4sRUFBRSxDQUFDTyxJQUFILENBQVFDLFNBQVIsQ0FBa0JDLFNBQS9CLEVBQTBDLEtBQUtDLHVCQUEvQyxFQUF3RSxJQUF4RTtBQUNILEdBekJJO0FBMkJMQyxFQUFBQSxLQTNCSyxtQkEyQkksQ0FFUixDQTdCSTtBQStCTEQsRUFBQUEsdUJBL0JLLG1DQStCbUJFLEtBL0JuQixFQStCeUI7QUFDMUIsUUFBR1osRUFBRSxDQUFDYSxHQUFILENBQU9DLFFBQVAsSUFBbUJkLEVBQUUsQ0FBQ2EsR0FBSCxDQUFPRSxjQUE3QixFQUE0QztBQUN4QyxVQUFNQyxVQUFVLEdBQUdDLEVBQUUsQ0FBQ0MsaUJBQUgsRUFBbkIsQ0FEd0MsQ0FFeEM7O0FBQ0EsVUFBSUYsVUFBVSxDQUFDRixRQUFYLEtBQXdCLEtBQTVCLEVBQW1DO0FBQy9CO0FBQ0FHLFFBQUFBLEVBQUUsQ0FBQ0Usa0JBQUgsQ0FBc0I7QUFDbEJDLFVBQUFBLGdCQUFnQixFQUFFLENBQ2xCO0FBQ0lDLFlBQUFBLEtBQUssRUFBRSxvQkFEWDtBQUVJQyxZQUFBQSxTQUFTLEVBQUU7QUFGZixXQURrQixFQUtsQjtBQUNJRCxZQUFBQSxLQUFLLEVBQUUsb0JBRFg7QUFFSUMsWUFBQUEsU0FBUyxFQUFFO0FBRmYsV0FMa0IsRUFTbEI7QUFDSUQsWUFBQUEsS0FBSyxFQUFFLG9CQURYO0FBRUlDLFlBQUFBLFNBQVMsRUFBRTtBQUZmLFdBVGtCLEVBYWxCO0FBQ0lELFlBQUFBLEtBQUssRUFBRSxvQkFEWDtBQUVJQyxZQUFBQSxTQUFTLEVBQUU7QUFGZixXQWJrQixFQWlCbEI7QUFDSUQsWUFBQUEsS0FBSyxFQUFFLG9CQURYO0FBRUlDLFlBQUFBLFNBQVMsRUFBRTtBQUZmLFdBakJrQixFQXFCbEI7QUFDSUQsWUFBQUEsS0FBSyxFQUFFLG9CQURYO0FBRUlDLFlBQUFBLFNBQVMsRUFBRTtBQUZmLFdBckJrQixDQURBO0FBMkJsQkMsVUFBQUEsT0EzQmtCLG1CQTJCVkMsR0EzQlUsRUEyQkw7QUFDYkMsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksU0FBWixFQUF1QkYsR0FBRyxDQUFDRyxNQUEzQjtBQUNDLFdBN0JpQjtBQThCbEJDLFVBQUFBLElBOUJrQixnQkE4QmJKLEdBOUJhLEVBOEJSO0FBQ1ZDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVosRUFBb0JGLEdBQUcsQ0FBQ0csTUFBeEI7QUFDQztBQWhDaUIsU0FBdEI7QUFrQ0g7QUFDSjtBQUNKLEdBekVJLENBMkVMOztBQTNFSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLy8gZm9vOiB7XHJcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XHJcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXHJcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxyXG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gYmFyOiB7XHJcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xyXG4gICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkNoYW5nZUdhbWVCdG5DYWxsQmFjaywgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2hhbmdlR2FtZUJ0bkNhbGxCYWNrKGV2ZW50KXtcclxuICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkJZVEVEQU5DRV9HQU1FKXtcclxuICAgICAgICAgICAgY29uc3Qgc3lzdGVtSW5mbyA9IHR0LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgICAgIC8vIGlPUyDkuI3mlK/mjIHvvIzlu7rorq7lhYjmo4DmtYvlho3kvb/nlKhcclxuICAgICAgICAgICAgaWYgKHN5c3RlbUluZm8ucGxhdGZvcm0gIT09IFwiaW9zXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIOaJk+W8gOS6kui3s+W8ueeql1xyXG4gICAgICAgICAgICAgICAgdHQuc2hvd01vcmVHYW1lc01vZGFsKHtcclxuICAgICAgICAgICAgICAgICAgICBhcHBMYXVuY2hPcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBJZDogXCJ0dDdmYmIwOTA2ZTA4MGViOTFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmFEYXRhOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwSWQ6IFwidHQ3MWFhMDcxN2VlOTE5NDEyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhRGF0YToge30sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcElkOiBcInR0ODNhOWY1MTQxYzkyNzhlNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRyYURhdGE6IHt9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBJZDogXCJ0dDFiNTE2ZGVjODQ2YWRjNDdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmFEYXRhOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwSWQ6IFwidHRjZjc4YjljNTUwNDMwMjMyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhRGF0YToge30sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcElkOiBcInR0NjIzNDE0ODlmZDBmNDM3YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRyYURhdGE6IHt9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiLCByZXMuZXJyTXNnKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmYWlsXCIsIHJlcy5lcnJNc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=