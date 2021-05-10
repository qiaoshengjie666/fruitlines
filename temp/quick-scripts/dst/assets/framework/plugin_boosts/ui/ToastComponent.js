
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/ui/ToastComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c4ad6Rf0DpFeay8D3aly6IU', 'ToastComponent');
// framework/plugin_boosts/ui/ToastComponent.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UIFunctions_1 = require("./UIFunctions");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ToastComponent = /** @class */ (function (_super) {
    __extends(ToastComponent, _super);
    function ToastComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        return _this;
        // update (dt) {}
    }
    ToastComponent.prototype.onLoad = function () {
        this.animations = UIFunctions_1.default.getChildrenAnimations(this.node);
    };
    ToastComponent.prototype.start = function () {
    };
    ToastComponent.prototype.hide = function (callback) {
        this.node.active = true;
        if (!UIFunctions_1.default.doHideAnimations(this.animations, callback)) {
            this.node.active = false;
            // this.node.removeFromParent();
            if (callback) {
                callback(this);
            }
        }
    };
    ToastComponent.prototype.show = function (text) {
        this.label.string = text;
        UIFunctions_1.default.doShowAnimations(this.animations);
    };
    __decorate([
        property(cc.Label)
    ], ToastComponent.prototype, "label", void 0);
    ToastComponent = __decorate([
        ccclass
    ], ToastComponent);
    return ToastComponent;
}(cc.Component));
exports.default = ToastComponent;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1aVxcVG9hc3RDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUF3QztBQUVsQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE0QyxrQ0FBWTtJQUF4RDtRQUFBLHFFQWlDQztRQS9CRyxXQUFLLEdBQWEsSUFBSSxDQUFDOztRQThCdkIsaUJBQWlCO0lBQ3JCLENBQUM7SUExQkcsK0JBQU0sR0FBTjtRQUVJLElBQUksQ0FBQyxVQUFVLEdBQUcscUJBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELDhCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsNkJBQUksR0FBSixVQUFLLFFBQVE7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBRyxDQUFDLHFCQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxRQUFRLENBQUMsRUFDMUQ7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDekIsZ0NBQWdDO1lBQ2hDLElBQUcsUUFBUSxFQUNYO2dCQUNJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsQjtTQUNKO0lBQ0wsQ0FBQztJQUNELDZCQUFJLEdBQUosVUFBSyxJQUFTO1FBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLHFCQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUE3QkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFDSTtJQUZOLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FpQ2xDO0lBQUQscUJBQUM7Q0FqQ0QsQUFpQ0MsQ0FqQzJDLEVBQUUsQ0FBQyxTQUFTLEdBaUN2RDtrQkFqQ29CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlGdW5jdGlvbnMgZnJvbSBcIi4vVUlGdW5jdGlvbnNcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2FzdENvbXBvbmVudCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG4gICAgLy8gb25Mb2FkICgpIHt9XG4gICAgYW5pbWF0aW9uczpjYy5BbmltYXRpb25bXVxuXG4gICAgb25Mb2FkKClcbiAgICB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IFVJRnVuY3Rpb25zLmdldENoaWxkcmVuQW5pbWF0aW9ucyh0aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuICAgIGhpZGUoY2FsbGJhY2spOiBhbnkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgaWYoIVVJRnVuY3Rpb25zLmRvSGlkZUFuaW1hdGlvbnModGhpcy5hbmltYXRpb25zLGNhbGxiYWNrKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHNob3codGV4dDogYW55KTogYW55IHtcbiAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSB0ZXh0O1xuICAgICAgICBVSUZ1bmN0aW9ucy5kb1Nob3dBbmltYXRpb25zKHRoaXMuYW5pbWF0aW9ucyk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=