
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/misc/InputSystem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxtaXNjXFxJbnB1dFN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFrQztBQUU1QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUvQixRQUFBLEtBQUssR0FBZSxJQUFJLENBQUM7QUFHcEM7SUFBaUMsK0JBQVk7SUFBN0M7UUFHSSx1Q0FBdUM7UUFDdkMsdUNBQXVDO1FBSjNDLHFFQWlMQztRQTNLRyxhQUFPLEdBQU8sSUFBSSxDQUFDO1FBSW5CLFVBQUksR0FBNEIsRUFBRSxDQUFBO1FBTWxDLGdCQUFVLEdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFbEMsaUJBQVcsR0FBVSxHQUFHLENBQUM7UUFHekIsY0FBUSxHQUFZLElBQUksQ0FBQztRQWdHekIsaUJBQVcsR0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuQyxnQkFBVSxHQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBcUJsQyxrQkFBWSxHQUFVLENBQUMsQ0FBQyxDQUFDOztJQXNDN0IsQ0FBQztJQTFKRzs7O09BR0c7SUFDSCxpQ0FBVyxHQUFYLFVBQVksTUFBTTtRQUVkLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFJRCw0QkFBTSxHQUFOO1FBRUksYUFBSyxHQUFHLElBQUksQ0FBQztRQUViLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUN4QztZQUNJLElBQUksSUFBSSxHQUFPLFVBQVUsQ0FBQyxDQUFDLENB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UUFFSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsZ0NBQVUsR0FBVjtRQUVJLElBQUcsSUFBSSxDQUFDLE9BQU8sRUFDZjtZQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0wsQ0FBQztJQTNKRDtRQURDLFFBQVEsQ0FBQyxrQkFBUSxDQUFDO2lEQUNNO0lBckJoQixXQUFXO1FBRHZCLE9BQU87T0FDSyxXQUFXLENBaUx2QjtJQUFELGtCQUFDO0NBakxELEFBaUxDLENBakxnQyxFQUFFLENBQUMsU0FBUyxHQWlMNUM7QUFqTFksa0NBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSm95U3RpY2sgZnJvbSBcIi4vSm95U3RpY2tcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbmV4cG9ydCB2YXIgSW5wdXQ6SW5wdXRTeXN0ZW0gPSBudWxsO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGNsYXNzIElucHV0U3lzdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50XG57XG5cbiAgICAvLyBAcHJvcGVydHkoY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcilcbiAgICAvLyBvbktleURvd246Y2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcjtcblxuICAgIF90YXJnZXQ6YW55ID0gbnVsbDtcblxuXG5cbiAgICBrZXlzOntbaW5kZXg6c3RyaW5nXTpib29sZWFufSA9IHt9XG5cbiAgICBfX3RvdWNoOmNjLlZlYzI7XG5cbiAgICBfX3N0YXJ0TG9jYXRpb24gOmNjLlZlYzI7XG5cbiAgICBfX3RvdWNoVmVjOmNjLlZlYzIgPSBjYy5WZWMyLlpFUk87XG5cbiAgICByYWRpdXNfYXhpczpudW1iZXIgPSAyNTY7XG5cbiAgICBAcHJvcGVydHkoSm95U3RpY2spXG4gICAgam95U3RpY2sgOkpveVN0aWNrPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogaWYgdGFyZ2V0IGlzIGEgQ29tcG9uZW50ICx0aGlzIGZ1bmN0aW9uIG11c3QgYmUgY2FsbGVkIGluIG9uTG9hZFxuICAgICAqIEBwYXJhbSB0YXJnZXQgXG4gICAgICovXG4gICAgc2V0RGVsZWdhdGUodGFyZ2V0KVxuICAgIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xuICAgIH1cblxuXG5cbiAgICBvbkxvYWQoKVxuICAgIHtcbiAgICAgICAgSW5wdXQgPSB0aGlzO1xuXG4gICAgICAgIGxldCBjb21wb25lbnRzID0gdGhpcy5nZXRDb21wb25lbnRzKGNjLkNvbXBvbmVudCk7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjb21wb25lbnRzLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBjb21wOmFueSA9IGNvbXBvbmVudHNbaV1cbiAgICAgICAgICAgIGlmKGNvbXAgIT0gdGhpcyAmJiAoY29tcC5vblRvdWNoQmVnYW4gfHwgY29tcC5vblRvdWNoRW5kZWR8fGNvbXAub25Ub3VjaE1vdmVkKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXQgPSBjb21wO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5wdXRTeXN0ZW0gQ29tcG9uZW50IC0+IHRhcmdldDpcIix0aGlzLl90YXJnZXQpXG4gICAgfVxuXG4gICAgLy9Ib3Jpem9udGFsXG4gICAgLy9WZXJ0aWNhbFxuICAgIHN0YXJ0KClcbiAgICB7XG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfRE9XTix0aGlzLnRyaWdnZXJLZXlEb3duLHRoaXMpO1xuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQLHRoaXMudHJpZ2dlcktleVVwLHRoaXMpO1xuICAgICAgICAvLyBpZih0aGlzLl90YXJnZXQpXG4gICAgICAgIC8vIHtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULHRoaXMudHJpZ2dlclRvdWNoQmVnYW4sIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSx0aGlzLnRyaWdnZXJUb3VjaE1vdmVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLnRyaWdnZXJUb3VjaEVuZGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCx0aGlzLnRyaWdnZXJUb3VjaENhbmNlbGVkLCB0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIC8vIH1cbiAgICB9XG5cblxuICAgIGdldCB0b3VjaCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fX3RvdWNoO1xuICAgIH1cblxuICAgIC8vIG9ubHkgdmFsaWQgd2hlbiBqb3lzdGljayBpcyBlbmFibGVkIFxuICAgIGdldCBheGlzKClcbiAgICB7XG4gICAgICAgIGlmKHRoaXMuam95U3RpY2spXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5qb3lTdGljay5heGlzO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3RvdWNoVmVjO1xuICAgIH1cblxuICAgIGdldEtleShrKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5c1trXSBcbiAgICB9XG5cbiAgICBwcml2YXRlIHRyaWdnZXJLZXlVcChlKSB7XG4gICAgICAgIGlmKHRoaXMuX3RhcmdldC5vbktleVVwKVxuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0Lm9uS2V5VXAoZXZlbnQpXG4gICAgICAgIHRoaXMua2V5c1tldmVudFtcImtleVwiXV0gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHRyaWdnZXJLZXlEb3duKGUpOiBhbnkge1xuICAgICAgICBpZih0aGlzLl90YXJnZXQub25LZXlEb3duKVxuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0Lm9uS2V5RG93bihldmVudClcbiAgICAgICAgdGhpcy5rZXlzW2V2ZW50W1wia2V5XCJdXSA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgdHJpZ2dlclRvdWNoRW5kZWQoZSk6IGFueSB7XG4gICAgICAgIGlmKHRoaXMuX19jdXJUb3VjaElkICE9LTEgJiYgZS5nZXRJRCgpICE9IHRoaXMuX19jdXJUb3VjaElkKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX2N1clRvdWNoSWQgPSAtMVxuICAgICAgICBpZih0aGlzLl90YXJnZXQub25Ub3VjaEVuZGVkKVxuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0Lm9uVG91Y2hFbmRlZChlKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5fX3RvdWNoID0gbnVsbCBcbiAgICAgICAgdGhpcy5fX3RvdWNoVmVjID0gY2MuVmVjMi5aRVJPO1xuICAgICAgICBpZihlLmN1cnJlbnRUb3VjaClcbiAgICAgICAgICAgIGlmKHRoaXMuam95U3RpY2spXG4gICAgICAgICAgICAgICAgdGhpcy5qb3lTdGljay50b3VjaEVuZChlLmN1cnJlbnRUb3VjaC5nZXRMb2NhdGlvbigpKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5tb3ZlT2Zmc2V0ID0gY2MuVmVjMi5aRVJPO1xuICAgIH1cblxuICAgIF9fbGFzdFRvdWNoOmNjLlZlYzIgPSBjYy5WZWMyLlpFUk87XG4gICAgbW92ZU9mZnNldDpjYy5WZWMyID0gY2MuVmVjMi5aRVJPO1xuXG4gICAgcHJpdmF0ZSB0cmlnZ2VyVG91Y2hNb3ZlZChlKTogYW55IHtcbiAgICAgICAgaWYodGhpcy5fX2N1clRvdWNoSWQgIT0tMSAmJiBlLmdldElEKCkgIT0gdGhpcy5fX2N1clRvdWNoSWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLl90YXJnZXQub25Ub3VjaE1vdmVkKVxuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0Lm9uVG91Y2hNb3ZlZChlKVxuXG4gICAgICAgIHRoaXMuX190b3VjaCA9IGUuY3VycmVudFRvdWNoLmdldExvY2F0aW9uKCk7XG4gICAgICAgIHRoaXMubW92ZU9mZnNldCA9IHRoaXMuX190b3VjaC5zdWIodGhpcy5fX2xhc3RUb3VjaClcbiAgICAgICAgaWYodGhpcy5fX3RvdWNoICYmIHRoaXMuX19zdGFydExvY2F0aW9uKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9fdG91Y2hWZWMgPSB0aGlzLl9fdG91Y2guc3ViKHRoaXMuX19zdGFydExvY2F0aW9uKTtcbiAgICAgICAgICAgIGlmKHRoaXMuam95U3RpY2spXG4gICAgICAgICAgICAgICAgdGhpcy5qb3lTdGljay50b3VjaE1vdmUodGhpcy5fX3RvdWNoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX19sYXN0VG91Y2ggPSB0aGlzLl9fdG91Y2g7XG4gICAgfVxuXG4gICAgX19jdXJUb3VjaElkOm51bWJlciA9IC0xO1xuXG4gICAgcHJpdmF0ZSB0cmlnZ2VyVG91Y2hCZWdhbihlKTogYW55IHtcbiAgICAgICAgaWYodGhpcy5fX2N1clRvdWNoSWQgIT0tMSAmJiBlLmdldElEKCkgIT0gdGhpcy5fX2N1clRvdWNoSWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5fdGFyZ2V0Lm9uVG91Y2hCZWdhbilcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldC5vblRvdWNoQmVnYW4oZSlcbiAgICAgICAgdGhpcy5fX2N1clRvdWNoSWQgPSBlLmdldElEKCk7XG4gICAgICAgIHRoaXMuX19zdGFydExvY2F0aW9uID0gZS5jdXJyZW50VG91Y2guZ2V0TG9jYXRpb24oKVxuICAgICAgICB0aGlzLl9fdG91Y2ggPSBlLmN1cnJlbnRUb3VjaC5nZXRMb2NhdGlvbigpO1xuICAgICAgICB0aGlzLl9fbGFzdFRvdWNoID0gdGhpcy5fX3RvdWNoO1xuICAgICAgICBpZih0aGlzLmpveVN0aWNrKVxuICAgICAgICAgICAgdGhpcy5qb3lTdGljay50b3VjaFN0YXJ0KHRoaXMuX19zdGFydExvY2F0aW9uKVxuICAgIH1cbiAgICBwcml2YXRlIHRyaWdnZXJUb3VjaENhbmNlbGVkKGUpOiBhbnkge1xuICAgICAgICB0aGlzLnRyaWdnZXJUb3VjaEVuZGVkKGUpO1xuICAgIH1cblxuICAgIG9uRW5hYmxlKClcbiAgICB7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5jaGVja1RvdWNoLDAuMDIpO1xuICAgIH1cblxuICAgIG9uRGlzYWJsZSgpXG4gICAge1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5jaGVja1RvdWNoKTtcbiAgICB9XG5cbiAgICBjaGVja1RvdWNoKClcbiAgICB7XG4gICAgICAgIGlmKHRoaXMuX190b3VjaClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5tb3ZlT2Zmc2V0ID0gdGhpcy5fX3RvdWNoLnN1Yih0aGlzLl9fbGFzdFRvdWNoKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=