
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/ui/PandoraPoint.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3f36aidibxFPY2TBTu8gRyi', 'PandoraPoint');
// framework/plugin_boosts/ui/PandoraPoint.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PandoraPoint = /** @class */ (function (_super) {
    __extends(PandoraPoint, _super);
    function PandoraPoint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.numberVisible = true;
        return _this;
        // update (dt) {}
    }
    PandoraPoint.prototype.onLoad = function () {
        this.sprite = this.getComponent(cc.Sprite);
        this.label = this.getComponentInChildren(cc.Label);
        this.label.node.active = this.numberVisible;
    };
    PandoraPoint.prototype.start = function () {
    };
    PandoraPoint.prototype.setNumber = function (n) {
        if (this.numberVisible) {
            this.label.string = n + "";
        }
        if (this.numberVisible) {
            this.label.node.active = n != 0;
        }
        this.sprite.enabled = n != 0;
    };
    __decorate([
        property
    ], PandoraPoint.prototype, "numberVisible", void 0);
    PandoraPoint = __decorate([
        ccclass
    ], PandoraPoint);
    return PandoraPoint;
}(cc.Component));
exports.default = PandoraPoint;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1aVxcUGFuZG9yYVBvaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQWlDQztRQTVCRyxtQkFBYSxHQUFXLElBQUksQ0FBQzs7UUEyQjdCLGlCQUFpQjtJQUNyQixDQUFDO0lBeEJHLDZCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUNoRCxDQUFDO0lBRUQsNEJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCxnQ0FBUyxHQUFULFVBQVUsQ0FBUTtRQUVkLElBQUcsSUFBSSxDQUFDLGFBQWEsRUFDckI7WUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUUsRUFBRSxDQUFBO1NBQzVCO1FBQ0QsSUFBRyxJQUFJLENBQUMsYUFBYSxFQUNyQjtZQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBSSxDQUFDLElBQUUsQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBekJEO1FBREMsUUFBUTt1REFDb0I7SUFMWixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBaUNoQztJQUFELG1CQUFDO0NBakNELEFBaUNDLENBakN5QyxFQUFFLENBQUMsU0FBUyxHQWlDckQ7a0JBakNvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYW5kb3JhUG9pbnQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgbGFiZWw6Y2MuTGFiZWw7XG5cbiAgICBAcHJvcGVydHlcbiAgICBudW1iZXJWaXNpYmxlOmJvb2xlYW4gPSB0cnVlO1xuXG4gICAgc3ByaXRlOmNjLlNwcml0ZVxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5zcHJpdGUgPSB0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICB0aGlzLmxhYmVsID0gdGhpcy5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKTtcbiAgICAgICAgdGhpcy5sYWJlbC5ub2RlLmFjdGl2ZSA9IHRoaXMubnVtYmVyVmlzaWJsZTtcbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9XG5cbiAgICBzZXROdW1iZXIobjpudW1iZXIpXG4gICAge1xuICAgICAgICBpZih0aGlzLm51bWJlclZpc2libGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gbiArXCJcIlxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMubnVtYmVyVmlzaWJsZSkgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWwubm9kZS5hY3RpdmUgPSAgbiE9MDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNwcml0ZS5lbmFibGVkID0gbiAhPTA7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==