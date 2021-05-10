
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/misc/JoyStick.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '297d6dgG6ZIJJ+ZjeNWq2ub', 'JoyStick');
// framework/plugin_boosts/misc/JoyStick.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var JoyStick = /** @class */ (function (_super) {
    __extends(JoyStick, _super);
    function JoyStick() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.outterCircle = null;
        _this.innerCircle = null;
        _this.radius = 250;
        _this.innerCircleRadius = 20;
        // 超出是否relase 
        _this.releaseAfterOver = false;
        // dynamic Joystick
        _this.dynamicJoystick = false;
        _this.autoRadius = false;
        _this.isReleased = false;
        _this._startPos = cc.Vec2.ZERO;
        return _this;
    }
    JoyStick.prototype.onLoad = function () {
        if (this.autoRadius) {
            this.radius = this.outterCircle.getBoundingBox().height / 2;
        }
        this.innerCircle.setPosition(0, 0);
        this.node.active = false;
    };
    JoyStick.prototype.start = function () {
        this.releaseStick();
    };
    JoyStick.prototype.releaseStick = function () {
        var move = cc.moveTo(0.5, cc.Vec2.ZERO);
        var action = move.easing(cc.easeExponentialOut());
        this.innerCircle.runAction(action);
        this.isReleased = true;
        if (this.dynamicJoystick) {
            this.scheduleOnce(this.delayClose, 1);
        }
    };
    JoyStick.prototype.delayClose = function () {
        this.node.active = false;
    };
    Object.defineProperty(JoyStick.prototype, "axis", {
        get: function () {
            if (this.isReleased)
                return cc.Vec2.ZERO;
            var vec = this.innerCircle.getPosition();
            vec.normalizeSelf();
            return vec;
        },
        enumerable: false,
        configurable: true
    });
    JoyStick.prototype.move = function (pos) {
        var mag = pos.mag();
        if (mag > this.radius) {
            if (this.releaseAfterOver)
                this.releaseStick();
            pos.normalizeSelf();
            pos.mulSelf(this.radius);
        }
        this.innerCircle.setPosition(pos);
    };
    // p : screen position
    JoyStick.prototype.touchStart = function (p) {
        if (!this.enabled)
            return;
        this.isReleased = false;
        this._startPos = p;
        this.unschedule(this.delayClose);
        this.node.active = true;
        if (this.dynamicJoystick) {
            // converto screen position
            var pos = this.node.getParent().convertToNodeSpaceAR(p);
            this.node.setPosition(pos);
            // this.node.opacity = 0;
            // this.node.runAction(cc.fadeIn(0.5));
        }
        this.move(cc.Vec2.ZERO);
    };
    JoyStick.prototype.touchMove = function (p) {
        if (!this.enabled)
            return;
        var vec = p.sub(this._startPos);
        this.move(vec);
    };
    JoyStick.prototype.touchEnd = function (p) {
        if (!this.enabled)
            return;
        // this.move(p);
        this.releaseStick();
    };
    __decorate([
        property(cc.Node)
    ], JoyStick.prototype, "outterCircle", void 0);
    __decorate([
        property(cc.Node)
    ], JoyStick.prototype, "innerCircle", void 0);
    __decorate([
        property
    ], JoyStick.prototype, "radius", void 0);
    __decorate([
        property
    ], JoyStick.prototype, "innerCircleRadius", void 0);
    __decorate([
        property
    ], JoyStick.prototype, "releaseAfterOver", void 0);
    __decorate([
        property
    ], JoyStick.prototype, "dynamicJoystick", void 0);
    __decorate([
        property
    ], JoyStick.prototype, "autoRadius", void 0);
    JoyStick = __decorate([
        ccclass
    ], JoyStick);
    return JoyStick;
}(cc.Component));
exports.default = JoyStick;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxtaXNjXFxKb3lTdGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUFtSEM7UUFoSEcsa0JBQVksR0FBVyxJQUFJLENBQUM7UUFHNUIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFHM0IsWUFBTSxHQUFVLEdBQUcsQ0FBQztRQUdwQix1QkFBaUIsR0FBVyxFQUFFLENBQUM7UUFFL0IsY0FBYztRQUVkLHNCQUFnQixHQUFXLEtBQUssQ0FBQztRQUVqQyxtQkFBbUI7UUFFbkIscUJBQWUsR0FBVyxLQUFLLENBQUM7UUFHaEMsZ0JBQVUsR0FBVyxLQUFLLENBQUM7UUFFM0IsZ0JBQVUsR0FBRyxLQUFLLENBQUM7UUF3RG5CLGVBQVMsR0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7SUFrQ3JDLENBQUM7SUF6RkcseUJBQU0sR0FBTjtRQUVJLElBQUcsSUFBSSxDQUFDLFVBQVUsRUFDbEI7WUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztTQUM3RDtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVELHdCQUFLLEdBQUw7UUFFSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELCtCQUFZLEdBQVo7UUFFSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRyxFQUFF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USxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ1M7SUFHM0I7UUFEQyxRQUFROzRDQUNXO0lBR3BCO1FBREMsUUFBUTt1REFDc0I7SUFJL0I7UUFEQyxRQUFRO3NEQUN3QjtJQUlqQztRQURDLFFBQVE7cURBQ3VCO0lBR2hDO1FBREMsUUFBUTtnREFDa0I7SUF2QlYsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQW1INUI7SUFBRCxlQUFDO0NBbkhELEFBbUhDLENBbkhxQyxFQUFFLENBQUMsU0FBUyxHQW1IakQ7a0JBbkhvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb3lTdGljayBleHRlbmRzIGNjLkNvbXBvbmVudFxue1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG91dHRlckNpcmNsZTpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGlubmVyQ2lyY2xlOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5XG4gICAgcmFkaXVzOm51bWJlciA9IDI1MDtcblxuICAgIEBwcm9wZXJ0eVxuICAgIGlubmVyQ2lyY2xlUmFkaXVzOm51bWJlciA9ICAyMDtcblxuICAgIC8vIOi2heWHuuaYr+WQpnJlbGFzZSBcbiAgICBAcHJvcGVydHlcbiAgICByZWxlYXNlQWZ0ZXJPdmVyOmJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vIGR5bmFtaWMgSm95c3RpY2tcbiAgICBAcHJvcGVydHlcbiAgICBkeW5hbWljSm95c3RpY2s6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQHByb3BlcnR5XG4gICAgYXV0b1JhZGl1czpib29sZWFuID0gZmFsc2U7XG5cbiAgICBpc1JlbGVhc2VkID0gZmFsc2U7XG4gICAgb25Mb2FkKClcbiAgICB7XG4gICAgICAgIGlmKHRoaXMuYXV0b1JhZGl1cylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSB0aGlzLm91dHRlckNpcmNsZS5nZXRCb3VuZGluZ0JveCgpLmhlaWdodC8yO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5uZXJDaXJjbGUuc2V0UG9zaXRpb24oMCwwKTtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXJ0KClcbiAgICB7XG4gICAgICAgIHRoaXMucmVsZWFzZVN0aWNrKCk7XG4gICAgfVxuICAgIFxuICAgIHJlbGVhc2VTdGljaygpXG4gICAge1xuICAgICAgICBsZXQgbW92ZSA9IGNjLm1vdmVUbygwLjUgLCBjYy5WZWMyLlpFUk8pO1xuICAgICAgICBsZXQgYWN0aW9uID0gbW92ZS5lYXNpbmcoY2MuZWFzZUV4cG9uZW50aWFsT3V0KCkpO1xuICAgICAgICB0aGlzLmlubmVyQ2lyY2xlLnJ1bkFjdGlvbihhY3Rpb24pO1xuICAgICAgICB0aGlzLmlzUmVsZWFzZWQgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5keW5hbWljSm95c3RpY2spXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCB0aGlzLmRlbGF5Q2xvc2UsIDEpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxheUNsb3NlKClcbiAgICB7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXQgYXhpcygpXG4gICAge1xuICAgICAgICBpZih0aGlzLmlzUmVsZWFzZWQpIHJldHVybiBjYy5WZWMyLlpFUk87XG4gICAgICAgIGxldCB2ZWMgPSB0aGlzLmlubmVyQ2lyY2xlLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIHZlYy5ub3JtYWxpemVTZWxmKClcbiAgICAgICAgcmV0dXJuIHZlYztcbiAgICB9XG5cbiAgICBtb3ZlKHBvczpjYy5WZWMyKVxuICAgIHtcbiAgICAgICAgbGV0IG1hZyA9IHBvcy5tYWcoKTtcbiAgICAgICAgaWYobWFnID4gdGhpcy5yYWRpdXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHRoaXMucmVsZWFzZUFmdGVyT3ZlcilcbiAgICAgICAgICAgICAgICB0aGlzLnJlbGVhc2VTdGljaygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBwb3Mubm9ybWFsaXplU2VsZigpO1xuICAgICAgICAgICAgcG9zLm11bFNlbGYodGhpcy5yYWRpdXMpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbm5lckNpcmNsZS5zZXRQb3NpdGlvbihwb3MpO1xuICAgIH1cblxuICAgIF9zdGFydFBvczpjYy5WZWMyID0gY2MuVmVjMi5aRVJPO1xuXG4gICAgLy8gcCA6IHNjcmVlbiBwb3NpdGlvblxuICAgIHRvdWNoU3RhcnQocClcbiAgICB7XG4gICAgICAgIGlmKCF0aGlzLmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgdGhpcy5pc1JlbGVhc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3N0YXJ0UG9zID0gcDtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuZGVsYXlDbG9zZSk7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBpZih0aGlzLmR5bmFtaWNKb3lzdGljaylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gY29udmVydG8gc2NyZWVuIHBvc2l0aW9uXG4gICAgICAgICAgICBsZXQgcG9zID0gdGhpcy5ub2RlLmdldFBhcmVudCgpLmNvbnZlcnRUb05vZGVTcGFjZUFSKHApO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgICAgICAvLyB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAvLyB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLmZhZGVJbigwLjUpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vdmUoY2MuVmVjMi5aRVJPKTtcbiAgICB9XG5cbiAgICB0b3VjaE1vdmUocClcbiAgICB7XG4gICAgICAgIGlmKCF0aGlzLmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgbGV0IHZlYyA9IHAuc3ViKHRoaXMuX3N0YXJ0UG9zKTtcbiAgICAgICAgdGhpcy5tb3ZlKHZlYyk7XG4gICAgfVxuXG4gICAgdG91Y2hFbmQocClcbiAgICB7XG4gICAgICAgIGlmKCF0aGlzLmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgLy8gdGhpcy5tb3ZlKHApO1xuICAgICAgICB0aGlzLnJlbGVhc2VTdGljaygpO1xuICAgIH1cbn0iXX0=