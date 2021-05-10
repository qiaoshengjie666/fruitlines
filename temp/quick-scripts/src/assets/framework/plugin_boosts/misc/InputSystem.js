"use strict";
cc._RF.push(module, '4643c14ws5Msox+teVpsIzz', 'InputSystem');
// framework/plugin_boosts/misc/InputSystem.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.InputSystem = exports.Input = void 0;
var JoyStick_1 = require("./JoyStick");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
exports.Input = null;
var InputSystem = /** @class */ (function (_super) {
    __extends(InputSystem, _super);
    function InputSystem() {
        // @property(cc.Component.EventHandler)
        // onKeyDown:cc.Component.EventHandler;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._target = null;
        _this.keys = {};
        _this.__touchVec = cc.Vec2.ZERO;
        _this.radius_axis = 256;
        _this.joyStick = null;
        _this.__lastTouch = cc.Vec2.ZERO;
        _this.moveOffset = cc.Vec2.ZERO;
        _this.__curTouchId = -1;
        return _this;
    }
    /**
     * if target is a Component ,this function must be called in onLoad
     * @param target
     */
    InputSystem.prototype.setDelegate = function (target) {
        this._target = target;
    };
    InputSystem.prototype.onLoad = function () {
        exports.Input = this;
        var components = this.getComponents(cc.Component);
        for (var i = 0; i < components.length; i++) {
            var comp = components[i];
            if (comp != this && (comp.onTouchBegan || comp.onTouchEnded || comp.onTouchMoved)) {
                this._target = comp;
                break;
            }
        }
        console.log("InputSystem Component -> target:", this._target);
    };
    //Horizontal
    //Vertical
    InputSystem.prototype.start = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.triggerKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.triggerKeyUp, this);
        // if(this._target)
        // {
        this.node.on(cc.Node.EventType.TOUCH_START, this.triggerTouchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.triggerTouchMoved, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.triggerTouchEnded, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.triggerTouchCanceled, this);
        // }
    };
    Object.defineProperty(InputSystem.prototype, "touch", {
        get: function () {
            return this.__touch;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputSystem.prototype, "axis", {
        // only valid when joystick is enabled 
        get: function () {
            if (this.joyStick)
                return this.joyStick.axis;
            else
                return this.__touchVec;
        },
        enumerable: false,
        configurable: true
    });
    InputSystem.prototype.getKey = function (k) {
        return this.keys[k];
    };
    InputSystem.prototype.triggerKeyUp = function (e) {
        if (this._target.onKeyUp)
            this._target.onKeyUp(event);
        this.keys[event["key"]] = false;
    };
    InputSystem.prototype.triggerKeyDown = function (e) {
        if (this._target.onKeyDown)
            this._target.onKeyDown(event);
        this.keys[event["key"]] = true;
    };
    InputSystem.prototype.triggerTouchEnded = function (e) {
        if (this.__curTouchId != -1 && e.getID() != this.__curTouchId) {
            return;
        }
        this.__curTouchId = -1;
        if (this._target.onTouchEnded)
            this._target.onTouchEnded(e);
        this.__touch = null;
        this.__touchVec = cc.Vec2.ZERO;
        if (e.currentTouch)
            if (this.joyStick)
                this.joyStick.touchEnd(e.currentTouch.getLocation());
        this.moveOffset = cc.Vec2.ZERO;
    };
    InputSystem.prototype.triggerTouchMoved = function (e) {
        if (this.__curTouchId != -1 && e.getID() != this.__curTouchId) {
            return;
        }
        if (this._target.onTouchMoved)
            this._target.onTouchMoved(e);
        this.__touch = e.currentTouch.getLocation();
        this.moveOffset = this.__touch.sub(this.__lastTouch);
        if (this.__touch && this.__startLocation) {
            this.__touchVec = this.__touch.sub(this.__startLocation);
            if (this.joyStick)
                this.joyStick.touchMove(this.__touch);
        }
        this.__lastTouch = this.__touch;
    };
    InputSystem.prototype.triggerTouchBegan = function (e) {
        if (this.__curTouchId != -1 && e.getID() != this.__curTouchId) {
            return;
        }
        if (this._target.onTouchBegan)
            this._target.onTouchBegan(e);
        this.__curTouchId = e.getID();
        this.__startLocation = e.currentTouch.getLocation();
        this.__touch = e.currentTouch.getLocation();
        this.__lastTouch = this.__touch;
        if (this.joyStick)
            this.joyStick.touchStart(this.__startLocation);
    };
    InputSystem.prototype.triggerTouchCanceled = function (e) {
        this.triggerTouchEnded(e);
    };
    InputSystem.prototype.onEnable = function () {
        this.schedule(this.checkTouch, 0.02);
    };
    InputSystem.prototype.onDisable = function () {
        this.unschedule(this.checkTouch);
    };
    InputSystem.prototype.checkTouch = function () {
        if (this.__touch) {
            this.moveOffset = this.__touch.sub(this.__lastTouch);
        }
    };
    __decorate([
        property(JoyStick_1.default)
    ], InputSystem.prototype, "joyStick", void 0);
    InputSystem = __decorate([
        ccclass
    ], InputSystem);
    return InputSystem;
}(cc.Component));
exports.InputSystem = InputSystem;

cc._RF.pop();