
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/ui/ToastManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '129ed5o6uNHDKhz6KoueBpN', 'ToastManager');
// framework/plugin_boosts/ui/ToastManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.Toast = void 0;
var ToastComponent_1 = require("./ToastComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
exports.Toast = null;
var ToastManager = /** @class */ (function (_super) {
    __extends(ToastManager, _super);
    function ToastManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToastManager.prototype.start = function () {
        this.toastPool = new cc.NodePool();
        exports.Toast = this;
    };
    ToastManager.prototype.onDestroy = function () {
        this.toastPool.clear();
    };
    ToastManager.prototype.make = function (text, dur) {
        if (dur === void 0) { dur = 1.3; }
        //show toast 
        var node = this.toastPool.get();
        var toastComp = null;
        if (node == null) {
            node = cc.instantiate(this.prefab);
            toastComp = node.getComponent(ToastComponent_1.default);
            if (toastComp == null) {
                console.warn("Toast.make : Toast Prefab must contains ToastComponent");
            }
            // ToastManager.toastPool.put(node);
            // node = ToastManager.toastPool.get();
        }
        else {
            toastComp = node.getComponent(ToastComponent_1.default);
        }
        if (node.parent == null)
            this.node.addChild(node, 99999);
        this.show(toastComp, text, dur);
        return toastComp;
    };
    ToastManager.prototype.show = function (toastComp, text, dur) {
        var _this = this;
        toastComp.show(text);
        this.scheduleOnce(function (_) {
            toastComp.hide(function (_) {
                _this.toastPool.put(toastComp.node);
                console.log("Toast.hide toastpool size:", _this.toastPool.size());
            });
        }, dur);
    };
    __decorate([
        property(cc.Prefab)
    ], ToastManager.prototype, "prefab", void 0);
    ToastManager = __decorate([
        ccclass
    ], ToastManager);
    return ToastManager;
}(cc.Component));
exports.default = ToastManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1aVxcVG9hc3RNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBRXhDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRS9CLFFBQUEsS0FBSyxHQUFnQixJQUFJLENBQUM7QUFHckM7SUFBMEMsZ0NBQVk7SUFBdEQ7O0lBb0RBLENBQUM7SUEvQ0csNEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkMsYUFBSyxHQUFHLElBQUksQ0FBQztJQUNqQixDQUFDO0lBRUQsZ0NBQVMsR0FBVDtRQUVJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELDJCQUFJLEdBQUosVUFBSyxJQUFJLEVBQUMsR0FBUztRQUFULG9CQUFBLEVBQUEsU0FBUztRQUVmLGFBQWE7UUFDYixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLElBQUksSUFBSSxJQUFJLEVBQ2hCO1lBQ0ksSUFBSSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLHdCQUFjLENBQUMsQ0FBQztZQUM5QyxJQUFHLFNBQVMsSUFBSSxJQUFJLEVBQ3BCO2dCQUNJLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0RBQXdELENBQUMsQ0FBQTthQUN6RTtZQUNELG9DQUFvQztZQUNwQyx1Q0FBdUM7U0FDMUM7YUFBSTtZQUNELFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLHdCQUFjLENBQUMsQ0FBQztTQUNqRDtRQUNELElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJO1lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxLQUFLLENBQUMsQ0FBQztRQUVuQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUE7UUFDN0IsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVPLDJCQUFJLEdBQVosVUFBYSxTQUF3QixFQUFDLElBQUksRUFBQyxHQUFHO1FBQTlDLGlCQVNDO1FBUEcsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQUEsQ0FBQztZQUNmLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO2dCQUNaLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBQyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDbkUsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUE7SUFDVixDQUFDO0lBOUNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0RBQ0o7SUFIQyxZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBb0RoQztJQUFELG1CQUFDO0NBcERELEFBb0RDLENBcER5QyxFQUFFLENBQUMsU0FBUyxHQW9EckQ7a0JBcERvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRvYXN0Q29tcG9uZW50IGZyb20gXCIuL1RvYXN0Q29tcG9uZW50XCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5leHBvcnQgdmFyIFRvYXN0OlRvYXN0TWFuYWdlciA9IG51bGw7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2FzdE1hbmFnZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIHRvYXN0UG9vbDpjYy5Ob2RlUG9vbDtcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHByZWZhYjpjYy5QcmVmYWJcbiAgICBcbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMudG9hc3RQb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIFRvYXN0ID0gdGhpcztcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKVxuICAgIHtcbiAgICAgICAgdGhpcy50b2FzdFBvb2wuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBtYWtlKHRleHQsZHVyID0gMS4zKVxuICAgIHtcbiAgICAgICAgLy9zaG93IHRvYXN0IFxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMudG9hc3RQb29sLmdldCgpO1xuICAgICAgICBsZXQgdG9hc3RDb21wID0gbnVsbDtcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiKTtcbiAgICAgICAgICAgIHRvYXN0Q29tcCA9IG5vZGUuZ2V0Q29tcG9uZW50KFRvYXN0Q29tcG9uZW50KTtcbiAgICAgICAgICAgIGlmKHRvYXN0Q29tcCA9PSBudWxsKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlRvYXN0Lm1ha2UgOiBUb2FzdCBQcmVmYWIgbXVzdCBjb250YWlucyBUb2FzdENvbXBvbmVudFwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVG9hc3RNYW5hZ2VyLnRvYXN0UG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAvLyBub2RlID0gVG9hc3RNYW5hZ2VyLnRvYXN0UG9vbC5nZXQoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0b2FzdENvbXAgPSBub2RlLmdldENvbXBvbmVudChUb2FzdENvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYobm9kZS5wYXJlbnQgPT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlLDk5OTk5KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2hvdyh0b2FzdENvbXAsdGV4dCxkdXIpXG4gICAgICAgIHJldHVybiB0b2FzdENvbXA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93KHRvYXN0Q29tcDpUb2FzdENvbXBvbmVudCx0ZXh0LGR1cilcbiAgICB7XG4gICAgICAgIHRvYXN0Q29tcC5zaG93KHRleHQpXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKF89PntcbiAgICAgICAgICAgIHRvYXN0Q29tcC5oaWRlKF89PntcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0UG9vbC5wdXQodG9hc3RDb21wLm5vZGUpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUb2FzdC5oaWRlIHRvYXN0cG9vbCBzaXplOlwiLHRoaXMudG9hc3RQb29sLnNpemUoKSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LGR1cilcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19