
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/ui/View.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e1217OaHDFCEbPP4vjLJXLh', 'View');
// framework/plugin_boosts/ui/View.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UIComponent_1 = require("./UIComponent");
var ViewManager_1 = require("./ViewManager");
var UIFunctions_1 = require("./UIFunctions");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isDialog = false;
        _this.hasWidget = false;
        _this.opacity = 160;
        _this.childrenAnimation = false;
        _this.touchBlocker = null;
        _this.touchBlockerComp = null;
        // @property
        // showAnimationName:string = "";
        // @property
        // hideAnimationName:string = "";
        // @property([cc.Component.EventHandler])
        // onShownEvents:cc.Component.EventHandler[] = [];
        // @property([cc.Component.EventHandler])
        // onHiddenEvents:cc.Component.EventHandler[] = [];
        _this.animations = [];
        _this._isHiding = false;
        return _this;
    }
    // isTouchEnabled: boolean = true;
    View.prototype.emit = function (event, msg) {
        event.emit(msg);
        // this.node.emit(msg);  
    };
    View.prototype.call = function (event, exp) {
        // eval(exp);
        //g.execScript(exp);
    };
    View.prototype.setDelegate = function (target) {
        this.target = target;
    };
    View.prototype.onLoad = function () {
        this.touchBlocker = new cc.Node();
        this.touchBlocker.name = "TouchBlocker";
        this.touchBlocker.width = 2000;
        this.touchBlocker.height = 2000;
        this.touchBlockerComp = this.touchBlocker.addComponent(cc.BlockInputEvents);
        this.node.addChild(this.touchBlocker, 1000);
        if (this.childrenAnimation) {
            this.animations = UIFunctions_1.default.getChildrenAnimations(this.node);
        }
        else {
            var anim = this.node.getComponent(cc.Animation);
            if (anim)
                this.animations.push(anim);
        }
        var components = this.getComponents(cc.Component);
        for (var i = 0; i < components.length; i++) {
            var comp = components[i];
            if (comp != this) {
                if (comp.onShown || comp.onHidden) {
                    this.target = comp;
                    break;
                }
            }
        }
    };
    View.prototype.start = function () {
        this.touchEnabled = true;
    };
    View.prototype.init = function (viewname) {
        this.name = viewname;
    };
    View.prototype.hideAnimationCallback = function () {
        this.node.active = this.visible;
        ViewManager_1.default.instance.checkViewStacks();
    };
    /**
     * //如果 实现了view的animation那么需要 animation 去做隐藏
     * 否则会不会有animtion ，系统 将直接 设置 active 为false
     */
    View.prototype.doHideAnimation = function () {
        // if (!this.isDialog)
        // {
        //todo is in hide animtion return ;
        // if(this.isInHideAnimation())return;
        this.node.active = true;
        this._isHiding = true;
        if (!UIFunctions_1.default.doHideAnimations(this.animations, this.hideAnimationCallback, this)) {
            this.node.active = false;
            this._isHiding = false;
        }
        console.log("[View] hide:", this.name);
        this._visibleDirty = false;
    };
    View.prototype.isInHideAnimation = function () {
        return this._isHiding;
    };
    View.prototype.onHidden = function () {
        this._visibleDirty = false;
        if (this.target && this.target.onHidden)
            this.target.onHidden();
        // cc.Component.EventHandler.emitEvents(this.onHiddenEvents,[params]);
    };
    View.prototype.hide = function (index) {
        if (index === void 0) { index = 0; }
        // super.hide()
        //ViewManager remove dd
        if (index == 1) {
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, { title: '返回界面', content: '点击关闭' }, function () { });
        }
        else if (index == 2) {
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, { title: '关卡选择界面', content: '点击关闭' }, function () { });
        }
        this.touchEnabled = false;
        ViewManager_1.default.instance.hide(this.node);
    };
    Object.defineProperty(View.prototype, "visible", {
        get: function () { return this._visibleDirty; },
        enumerable: false,
        configurable: true
    });
    View.prototype.showAnimationNextFrame = function (callback) {
        var _this = this;
        this.scheduleOnce(function (_) {
            UIFunctions_1.default.doShowAnimations(_this.animations, callback);
        }, 0);
    };
    Object.defineProperty(View.prototype, "touchEnabled", {
        get: function () {
            return !this.touchBlocker.active;
        },
        set: function (b) {
            this.touchBlocker.active = !b;
        },
        enumerable: false,
        configurable: true
    });
    // setTouchEnabled(bEnabled){
    //     this.touchBlockerComp.enabled = bEnabled;
    //     // UIFunctions.setTouchEnabled(this.node,bEnabled);
    // }
    View.prototype.show = function () {
        var _this = this;
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        _super.prototype.show.call(this);
        console.log("[View] show:", this.name, params);
        UIFunctions_1.default.stopAnimations(this.animations);
        // call next frames 
        // this.showAnimationDelay()
        //确保在widget 更新结束后开始动画 ，
        return new Promise(function (resolve, reject) {
            var _a;
            var self = _this;
            var showFinishCallback = function () {
                if (!self.touchEnabled)
                    self.touchEnabled = true;
                resolve();
            };
            if (!_this.hasWidget) {
                UIFunctions_1.default.doShowAnimations(_this.animations, showFinishCallback);
            }
            else {
                _this.showAnimationNextFrame(showFinishCallback);
            }
            _this._visibleDirty = true;
            if (_this.target && _this.target.onShown) {
                (_a = _this.target).onShown.apply(_a, params);
            }
            // cc.Component.EventHandler.emitEvents(this.onShownEvents,[params]);
        });
    };
    __decorate([
        property
    ], View.prototype, "isDialog", void 0);
    __decorate([
        property
    ], View.prototype, "hasWidget", void 0);
    __decorate([
        property
    ], View.prototype, "opacity", void 0);
    __decorate([
        property
    ], View.prototype, "childrenAnimation", void 0);
    View = __decorate([
        ccclass
    ], View);
    return View;
}(UIComponent_1.default));
exports.default = View;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1aVxcVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXdDO0FBQ3hDLDZDQUF3QztBQUV4Qyw2Q0FBd0M7QUFHbEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQVc7SUFBN0M7UUFBQSxxRUErTUM7UUFyTUcsY0FBUSxHQUFXLEtBQUssQ0FBQztRQUd6QixlQUFTLEdBQVcsS0FBSyxDQUFDO1FBSzFCLGFBQU8sR0FBVSxHQUFHLENBQUM7UUFHckIsdUJBQWlCLEdBQVcsS0FBSyxDQUFDO1FBR2xDLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBQzVCLHNCQUFnQixHQUF1QixJQUFJLENBQUM7UUFFNUMsWUFBWTtRQUNaLGlDQUFpQztRQUNqQyxZQUFZO1FBQ1osaUNBQWlDO1FBRWpDLHlDQUF5QztRQUN6QyxrREFBa0Q7UUFFbEQseUNBQXlDO1FBQ3pDLG1EQUFtRDtRQUVuRCxnQkFBVSxHQUFrQixFQUFFLENBQUM7UUErRC9CLGVBQVMsR0FBVyxLQUFLLENBQUM7O0lBMEc5QixDQUFDO0lBOU1HLGtDQUFrQztJQUNsQyxtQkFBSSxHQUFKLFVBQUssS0FBSyxFQUFDLEdBQUc7UUFFVixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2pCLHlCQUF5QjtJQUMzQixDQUFDO0lBa0NELG1CQUFJLEdBQUosVUFBSyxLQUFLLEVBQUMsR0FBVTtRQUVqQixhQUFhO1FBQ2Isb0JBQW9CO0lBQ3hCLENBQUM7SUFFRCwwQkFBVyxHQUFYLFVBQVksTUFBTTtRQUVkLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxxQkFBTSxHQUFOO1FBR0ksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJ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LE1BQU0sRUFBRTthQUNsQztZQUNELHFFQUFxRTtRQUN6RSxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFwTUQ7UUFEQyxRQUFROzBDQUNnQjtJQUd6QjtRQURDLFFBQVE7MkNBQ2lCO0lBSzFCO1FBREMsUUFBUTt5Q0FDWTtJQUdyQjtRQURDLFFBQVE7bURBQ3lCO0lBckJqQixJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBK014QjtJQUFELFdBQUM7Q0EvTUQsQUErTUMsQ0EvTWlDLHFCQUFXLEdBK001QztrQkEvTW9CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4vVUlDb21wb25lbnRcIjtcbmltcG9ydCBWaWV3TWFuYWdlciBmcm9tIFwiLi9WaWV3TWFuYWdlclwiO1xuaW1wb3J0IHsgZXZlbnQgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRNYW5hZ2VyXCI7XG5pbXBvcnQgVUlGdW5jdGlvbnMgZnJvbSBcIi4vVUlGdW5jdGlvbnNcIjtcbmltcG9ydCB7IFRvYXN0IH0gZnJvbSBcIi4vVG9hc3RNYW5hZ2VyXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyBleHRlbmRzIFVJQ29tcG9uZW50IHtcbiAgICAvLyBpc1RvdWNoRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gICAgZW1pdChldmVudCxtc2cpXG4gICAge1xuICAgICAgICBldmVudC5lbWl0KG1zZylcbiAgICAgIC8vIHRoaXMubm9kZS5lbWl0KG1zZyk7ICBcbiAgICB9XG5cbiAgICBuYW1lOnN0cmluZztcbiAgICBAcHJvcGVydHlcbiAgICBpc0RpYWxvZzpib29sZWFuID0gZmFsc2U7XG5cbiAgICBAcHJvcGVydHlcbiAgICBoYXNXaWRnZXQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgdGFyZ2V0OmFueTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIG9wYWNpdHk6bnVtYmVyID0gMTYwO1xuXG4gICAgQHByb3BlcnR5XG4gICAgY2hpbGRyZW5BbmltYXRpb246Ym9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICB0b3VjaEJsb2NrZXI6Y2MuTm9kZSA9IG51bGw7XG4gICAgdG91Y2hCbG9ja2VyQ29tcDpjYy5CbG9ja0lucHV0RXZlbnRzID0gbnVsbDtcblxuICAgIC8vIEBwcm9wZXJ0eVxuICAgIC8vIHNob3dBbmltYXRpb25OYW1lOnN0cmluZyA9IFwiXCI7XG4gICAgLy8gQHByb3BlcnR5XG4gICAgLy8gaGlkZUFuaW1hdGlvbk5hbWU6c3RyaW5nID0gXCJcIjtcblxuICAgIC8vIEBwcm9wZXJ0eShbY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcl0pXG4gICAgLy8gb25TaG93bkV2ZW50czpjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyW10gPSBbXTtcblxuICAgIC8vIEBwcm9wZXJ0eShbY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcl0pXG4gICAgLy8gb25IaWRkZW5FdmVudHM6Y2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcltdID0gW107XG5cbiAgICBhbmltYXRpb25zOmNjLkFuaW1hdGlvbltdID0gW107XG5cbiAgICBjYWxsKGV2ZW50LGV4cDpzdHJpbmcpXG4gICAge1xuICAgICAgICAvLyBldmFsKGV4cCk7XG4gICAgICAgIC8vZy5leGVjU2NyaXB0KGV4cCk7XG4gICAgfVxuXG4gICAgc2V0RGVsZWdhdGUodGFyZ2V0KVxuICAgIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgfVxuXG4gICAgb25Mb2FkKClcbiAgICB7XG5cbiAgICAgICAgdGhpcy50b3VjaEJsb2NrZXIgPSBuZXcgY2MuTm9kZSgpO1xuICAgICAgICB0aGlzLnRvdWNoQmxvY2tlci5uYW1lID0gXCJUb3VjaEJsb2NrZXJcIlxuICAgICAgICB0aGlzLnRvdWNoQmxvY2tlci53aWR0aCA9IDIwMDA7XG4gICAgICAgIHRoaXMudG91Y2hCbG9ja2VyLmhlaWdodCA9IDIwMDA7XG4gICAgICAgIHRoaXMudG91Y2hCbG9ja2VyQ29tcCA9IHRoaXMudG91Y2hCbG9ja2VyLmFkZENvbXBvbmVudChjYy5CbG9ja0lucHV0RXZlbnRzKVxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGhpcy50b3VjaEJsb2NrZXIsMTAwMClcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuY2hpbGRyZW5BbmltYXRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IFVJRnVuY3Rpb25zLmdldENoaWxkcmVuQW5pbWF0aW9ucyh0aGlzLm5vZGUpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmFyIGFuaW0gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbilcbiAgICAgICAgICAgIGlmKGFuaW0pXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLnB1c2goYW5pbSlcbiAgICAgICAgfVxuICAgICAgICBsZXQgY29tcG9uZW50cyA9IHRoaXMuZ2V0Q29tcG9uZW50cyhjYy5Db21wb25lbnQpO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgY29tcG9uZW50cy5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgY29tcDphbnkgPSBjb21wb25lbnRzW2ldXG4gICAgICAgICAgICBpZihjb21wICE9IHRoaXMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoY29tcC5vblNob3dufHxjb21wLm9uSGlkZGVuKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBjb21wO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHN0YXJ0KClcbiAgICB7XG4gICAgICAgIHRoaXMudG91Y2hFbmFibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXduYW1lKVxuICAgIHtcbiAgICAgICAgdGhpcy5uYW1lID0gdmlld25hbWU7XG4gICAgfVxuXG4gICAgaGlkZUFuaW1hdGlvbkNhbGxiYWNrKClcbiAgICB7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0aGlzLnZpc2libGU7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLmNoZWNrVmlld1N0YWNrcygpO1xuICAgIH1cblxuICAgIF9pc0hpZGluZzpib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiAvL+WmguaenCDlrp7njrDkuoZ2aWV355qEYW5pbWF0aW9u6YKj5LmI6ZyA6KaBIGFuaW1hdGlvbiDljrvlgZrpmpDol49cbiAgICAgKiDlkKbliJnkvJrkuI3kvJrmnIlhbmltdGlvbiDvvIzns7vnu58g5bCG55u05o6lIOiuvue9riBhY3RpdmUg5Li6ZmFsc2VcbiAgICAgKi9cbiAgICBkb0hpZGVBbmltYXRpb24oKVxuICAgIHtcbiAgICAgICAgLy8gaWYgKCF0aGlzLmlzRGlhbG9nKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vdG9kbyBpcyBpbiBoaWRlIGFuaW10aW9uIHJldHVybiA7XG4gICAgICAgIC8vIGlmKHRoaXMuaXNJbkhpZGVBbmltYXRpb24oKSlyZXR1cm47XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9pc0hpZGluZyA9IHRydWU7XG4gICAgICAgIGlmKCFVSUZ1bmN0aW9ucy5kb0hpZGVBbmltYXRpb25zKHRoaXMuYW5pbWF0aW9ucyx0aGlzLmhpZGVBbmltYXRpb25DYWxsYmFjayx0aGlzKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faXNIaWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIltWaWV3XSBoaWRlOlwiLHRoaXMubmFtZSk7XG4gICAgICAgIHRoaXMuX3Zpc2libGVEaXJ0eSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlzSW5IaWRlQW5pbWF0aW9uKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0hpZGluZ1xuICAgIH1cbiAgICBcbiAgICBvbkhpZGRlbigpXG4gICAge1xuICAgICAgICB0aGlzLl92aXNpYmxlRGlydHkgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0ICYmIHRoaXMudGFyZ2V0Lm9uSGlkZGVuKVxuICAgICAgICAgICAgdGhpcy50YXJnZXQub25IaWRkZW4oKTtcbiAgICAgICAgLy8gY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMub25IaWRkZW5FdmVudHMsW3BhcmFtc10pO1xuICAgIH1cblxuICAgIGhpZGUoaW5kZXg6bnVtYmVyID0gMCl7XG4gICAgICAgIC8vIHN1cGVyLmhpZGUoKVxuICAgICAgICAvL1ZpZXdNYW5hZ2VyIHJlbW92ZSBkZFxuICAgICAgICBpZihpbmRleD09MSl7XG4gICAgICAgICAgICBodHRwVXRpbHMuaHR0cFBvc3QoY29uc3RzLkhUVFBfUkVDT1JEX1NFUlZFUix7dGl0bGU6J+i/lOWbnueVjOmdoicsY29udGVudDon54K55Ye75YWz6ZetJ30sZnVuY3Rpb24oKXt9KTtcbiAgICAgICAgfWVsc2UgaWYoaW5kZXggPT0gMil7XG4gICAgICAgICAgICBodHRwVXRpbHMuaHR0cFBvc3QoY29uc3RzLkhUVFBfUkVDT1JEX1NFUlZFUix7dGl0bGU6J+WFs+WNoemAieaLqeeVjOmdoicsY29udGVudDon54K55Ye75YWz6ZetJ30sZnVuY3Rpb24oKXt9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvdWNoRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5oaWRlKHRoaXMubm9kZSk7XG4gICAgfVxuXG4gICAgX3Zpc2libGVEaXJ0eTpib29sZWFuO1xuICAgIFxuICAgIGdldCB2aXNpYmxlKCl7cmV0dXJuIHRoaXMuX3Zpc2libGVEaXJ0eTt9XG5cblxuICAgIHNob3dBbmltYXRpb25OZXh0RnJhbWUoY2FsbGJhY2spXG4gICAge1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShfPT57XG4gICAgICAgICAgICBVSUZ1bmN0aW9ucy5kb1Nob3dBbmltYXRpb25zKHRoaXMuYW5pbWF0aW9ucyxjYWxsYmFjaylcbiAgICAgICAgfSwwKVxuICAgIH1cblxuICAgIGdldCB0b3VjaEVuYWJsZWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnRvdWNoQmxvY2tlci5hY3RpdmVcbiAgICB9XG5cbiAgICBzZXQgdG91Y2hFbmFibGVkKGIpXG4gICAge1xuICAgICAgICB0aGlzLnRvdWNoQmxvY2tlci5hY3RpdmUgID0gIWJcbiAgICB9XG5cbiAgICAvLyBzZXRUb3VjaEVuYWJsZWQoYkVuYWJsZWQpe1xuICAgIC8vICAgICB0aGlzLnRvdWNoQmxvY2tlckNvbXAuZW5hYmxlZCA9IGJFbmFibGVkO1xuICAgIC8vICAgICAvLyBVSUZ1bmN0aW9ucy5zZXRUb3VjaEVuYWJsZWQodGhpcy5ub2RlLGJFbmFibGVkKTtcbiAgICAvLyB9XG5cbiAgICBzaG93KC4uLnBhcmFtcylcbiAgICB7XG4gICAgICAgIHN1cGVyLnNob3coKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJbVmlld10gc2hvdzpcIix0aGlzLm5hbWUgLCBwYXJhbXMpO1xuICAgICAgICBVSUZ1bmN0aW9ucy5zdG9wQW5pbWF0aW9ucyh0aGlzLmFuaW1hdGlvbnMpO1xuICAgICAgIFxuICAgICAgICAvLyBjYWxsIG5leHQgZnJhbWVzIFxuICAgICAgICAvLyB0aGlzLnNob3dBbmltYXRpb25EZWxheSgpXG4gICAgICAgIC8v56Gu5L+d5Zyod2lkZ2V0IOabtOaWsOe7k+adn+WQjuW8gOWni+WKqOeUuyDvvIxcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLHJlamVjdCk9PntcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHNob3dGaW5pc2hDYWxsYmFjayA9IGZ1bmN0aW9uKCkgXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoIXNlbGYudG91Y2hFbmFibGVkKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLnRvdWNoRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIXRoaXMuaGFzV2lkZ2V0KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVJRnVuY3Rpb25zLmRvU2hvd0FuaW1hdGlvbnModGhpcy5hbmltYXRpb25zLHNob3dGaW5pc2hDYWxsYmFjaylcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FuaW1hdGlvbk5leHRGcmFtZShzaG93RmluaXNoQ2FsbGJhY2spXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl92aXNpYmxlRGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0ICYmIHRoaXMudGFyZ2V0Lm9uU2hvd24pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQub25TaG93biguLi5wYXJhbXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMub25TaG93bkV2ZW50cyxbcGFyYW1zXSk7XG4gICAgICAgIH0pXG4gICAgfVxufVxuIl19