
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/loadTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eec36KS2hZPVbBk7XsJ2C2d', 'loadTip');
// gameComon/scripts/loadTip.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
    contentLabel: cc.Label
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.contentLabel.string = '';
  },
  show: function show(opts) {
    opts = opts || {};

    if (opts.content) {
      this.node.active = true;
      this.contentLabel.string = opts.content;

      this.contentLabel._forceUpdateRenderData(true);

      var spaceWidth = this.contentLabel.node.getContentSize().width;
      var labelWidth = cc.view.getVisibleSize().width - 200;

      if (spaceWidth < labelWidth) {
        this.contentLabel.overflow = cc.Label.Overflow.NONE;
        this.contentLabel.node.width = spaceWidth;
        this.contentLabel.node.height = this.contentLabel.node.getContentSize().height;
        this.node.width = spaceWidth + 30;
        this.node.height = 80;
      } else {
        this.contentLabel.overflow = cc.Label.Overflow.CLAMP;
        this.contentLabel.enableWrapText = true;
        this.contentLabel.node.width = labelWidth;
        this.contentLabel.node.height = this.contentLabel.node.getContentSize().height + Math.floor(spaceWidth / labelWidth) * 40;
        this.node.width = labelWidth + 30;
        this.node.height = 80 + Math.floor(spaceWidth / labelWidth) * 50;
      }
    }

    this.node.opacity = 0;
    this.node.stopAllActions();
    this.node.runAction(cc.sequence(cc.fadeIn(0.5), cc.delayTime(1), cc.callFunc(function () {
      this.node.active = false;
    }.bind(this))));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JpcHRzXFxsb2FkVGlwLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiY29udGVudExhYmVsIiwiTGFiZWwiLCJvbkxvYWQiLCJzdHJpbmciLCJzaG93Iiwib3B0cyIsImNvbnRlbnQiLCJub2RlIiwiYWN0aXZlIiwiX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSIsInNwYWNlV2lkdGgiLCJnZXRDb250ZW50U2l6ZSIsIndpZHRoIiwibGFiZWxXaWR0aCIsInZpZXciLCJnZXRWaXNpYmxlU2l6ZSIsIm92ZXJmbG93IiwiT3ZlcmZsb3ciLCJOT05FIiwiaGVpZ2h0IiwiQ0xBTVAiLCJlbmFibGVXcmFwVGV4dCIsIk1hdGgiLCJmbG9vciIsIm9wYWNpdHkiLCJzdG9wQWxsQWN0aW9ucyIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwiZmFkZUluIiwiZGVsYXlUaW1lIiwiY2FsbEZ1bmMiLCJiaW5kIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxJQUFBQSxZQUFZLEVBQUNKLEVBQUUsQ0FBQ0s7QUFoQlIsR0FIUDtBQXNCTDtBQUVBQyxFQUFBQSxNQXhCSyxvQkF3Qks7QUFDTixTQUFLRixZQUFMLENBQWtCRyxNQUFsQixHQUEyQixFQUEzQjtBQUNILEdBMUJJO0FBNEJMQyxFQUFBQSxJQTVCSyxnQkE0QkFDLElBNUJBLEVBNEJLO0FBQ05BLElBQUFBLElBQUksR0FBR0EsSUFBSSxJQUFJLEVBQWY7O0FBQ0EsUUFBSUEsSUFBSSxDQUFDQyxPQUFULEVBQWtCO0FBQ2QsV0FBS0MsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLElBQW5CO0FBQ0EsV0FBS1IsWUFBTCxDQUFrQkcsTUFBbEIsR0FBMkJFLElBQUksQ0FBQ0MsT0FBaEM7O0FBQ0EsV0FBS04sWUFBTCxDQUFrQlMsc0JBQWxCLENBQXlDLElBQXpDOztBQUNBLFVBQUlDLFVBQVUsR0FBRyxLQUFLVixZQUFMLENBQWtCTyxJQUFsQixDQUF1QkksY0FBdkIsR0FBd0NDLEtBQXpEO0FBQ0EsVUFBSUMsVUFBVSxHQUFHakIsRUFBRSxDQUFDa0IsSUFBSCxDQUFRQyxjQUFSLEdBQXlCSCxLQUF6QixHQUErQixHQUFoRDs7QUFDQSxVQUFHRixVQUFVLEdBQUNHLFVBQWQsRUFBeUI7QUFDckIsYUFBS2IsWUFBTCxDQUFrQmdCLFFBQWxCLEdBQTZCcEIsRUFBRSxDQUFDSyxLQUFILENBQVNnQixRQUFULENBQWtCQyxJQUEvQztBQUNBLGFBQUtsQixZQUFMLENBQWtCTyxJQUFsQixDQUF1QkssS0FBdkIsR0FBK0JGLFVBQS9CO0FBQ0EsYUFBS1YsWUFBTCxDQUFrQk8sSUFBbEIsQ0FBdUJZLE1BQXZCLEdBQWdDLEtBQUtuQixZQUFMLENBQWtCTyxJQUFsQixDQUF1QkksY0FBdkIsR0FBd0NRLE1BQXhFO0FBQ0EsYUFBS1osSUFBTCxDQUFVSyxLQUFWLEdBQWtCRixVQUFVLEdBQUMsRUFBN0I7QUFDQSxhQUFLSCxJQUFMLENBQVVZLE1BQVYsR0FBbUIsRUFBbkI7QUFDSCxPQU5ELE1BTUs7QUFDRCxhQUFLbkIsWUFBTCxDQUFrQmdCLFFBQWxCLEdBQTZCcEIsRUFBRSxDQUFDSyxLQUFILENBQVNnQixRQUFULENBQWtCRyxLQUEvQztBQUNBLGFBQUtwQixZQUFMLENBQWtCcUIsY0FBbEIsR0FBbUMsSUFBbkM7QUFDQSxhQUFLckIsWUFBTCxDQUFrQk8sSUFBbEIsQ0FBdUJLLEtBQXZCLEdBQStCQyxVQUEvQjtBQUNBLGFBQUtiLFlBQUwsQ0FBa0JPLElBQWxCLENBQXVCWSxNQUF2QixHQUFnQyxLQUFLbkIsWUFBTCxDQUFrQk8sSUFBbEIsQ0FBdUJJLGNBQXZCLEdBQXdDUSxNQUF4QyxHQUErQ0csSUFBSSxDQUFDQyxLQUFMLENBQVdiLFVBQVUsR0FBQ0csVUFBdEIsSUFBa0MsRUFBakg7QUFDQSxhQUFLTixJQUFMLENBQVVLLEtBQVYsR0FBa0JDLFVBQVUsR0FBQyxFQUE3QjtBQUNBLGFBQUtOLElBQUwsQ0FBVVksTUFBVixHQUFtQixLQUFLRyxJQUFJLENBQUNDLEtBQUwsQ0FBV2IsVUFBVSxHQUFDRyxVQUF0QixJQUFrQyxFQUExRDtBQUNIO0FBQ0o7O0FBQ0QsU0FBS04sSUFBTCxDQUFVaUIsT0FBVixHQUFvQixDQUFwQjtBQUNBLFNBQUtqQixJQUFMLENBQVVrQixjQUFWO0FBQ0EsU0FBS2xCLElBQUwsQ0FBVW1CLFNBQVYsQ0FBb0I5QixFQUFFLENBQUMrQixRQUFILENBQVkvQixFQUFFLENBQUNnQyxNQUFILENBQVUsR0FBVixDQUFaLEVBQTJCaEMsRUFBRSxDQUFDaUMsU0FBSCxDQUFhLENBQWIsQ0FBM0IsRUFBMkNqQyxFQUFFLENBQUNrQyxRQUFILENBQVksWUFBVTtBQUNqRixXQUFLdkIsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLEtBQW5CO0FBQ0gsS0FGMEUsQ0FFekV1QixJQUZ5RSxDQUVwRSxJQUZvRSxDQUFaLENBQTNDLENBQXBCO0FBR0gsR0F4REk7QUEwRExDLEVBQUFBLEtBMURLLG1CQTBESSxDQUVSLENBNURJLENBOERMOztBQTlESyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLy8gZm9vOiB7XHJcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XHJcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXHJcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxyXG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gYmFyOiB7XHJcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xyXG4gICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgY29udGVudExhYmVsOmNjLkxhYmVsLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudExhYmVsLnN0cmluZyA9ICcnO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaG93KG9wdHMpe1xyXG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xyXG4gICAgICAgIGlmIChvcHRzLmNvbnRlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudExhYmVsLnN0cmluZyA9IG9wdHMuY29udGVudDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50TGFiZWwuX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSh0cnVlKTtcclxuICAgICAgICAgICAgbGV0IHNwYWNlV2lkdGggPSB0aGlzLmNvbnRlbnRMYWJlbC5ub2RlLmdldENvbnRlbnRTaXplKCkud2lkdGg7XHJcbiAgICAgICAgICAgIGxldCBsYWJlbFdpZHRoID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLndpZHRoLTIwMFxyXG4gICAgICAgICAgICBpZihzcGFjZVdpZHRoPGxhYmVsV2lkdGgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50TGFiZWwub3ZlcmZsb3cgPSBjYy5MYWJlbC5PdmVyZmxvdy5OT05FO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50TGFiZWwubm9kZS53aWR0aCA9IHNwYWNlV2lkdGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRMYWJlbC5ub2RlLmhlaWdodCA9IHRoaXMuY29udGVudExhYmVsLm5vZGUuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUud2lkdGggPSBzcGFjZVdpZHRoKzMwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IDgwO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudExhYmVsLm92ZXJmbG93ID0gY2MuTGFiZWwuT3ZlcmZsb3cuQ0xBTVA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRMYWJlbC5lbmFibGVXcmFwVGV4dCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRMYWJlbC5ub2RlLndpZHRoID0gbGFiZWxXaWR0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudExhYmVsLm5vZGUuaGVpZ2h0ID0gdGhpcy5jb250ZW50TGFiZWwubm9kZS5nZXRDb250ZW50U2l6ZSgpLmhlaWdodCtNYXRoLmZsb29yKHNwYWNlV2lkdGgvbGFiZWxXaWR0aCkqNDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUud2lkdGggPSBsYWJlbFdpZHRoKzMwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IDgwICsgTWF0aC5mbG9vcihzcGFjZVdpZHRoL2xhYmVsV2lkdGgpKjUwO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmZhZGVJbigwLjUpLGNjLmRlbGF5VGltZSgxKSxjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKSkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==