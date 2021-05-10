"use strict";
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