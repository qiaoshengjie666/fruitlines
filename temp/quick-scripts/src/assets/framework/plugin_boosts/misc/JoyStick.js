"use strict";
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