"use strict";
cc._RF.push(module, 'c0f79TopoBICobmtQjrjutG', 'ViewManager');
// framework/plugin_boosts/ui/ViewManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var View_1 = require("./View");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TAG = "[ViewManager]";
var ViewManager = /** @class */ (function (_super) {
    __extends(ViewManager, _super);
    function ViewManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // onLoad () {}
        // baseDir:string = "assets/"
        _this._views = {};
        // 
        _this.modal = null;
        _this.modalOpacity = 160;
        return _this;
        // update (dt) {}
    }
    ViewManager_1 = ViewManager;
    ViewManager.prototype.onLoad = function () {
        ViewManager_1.instance = this;
        this.modal.active = false;
        this.modal.zIndex = 999;
        //g.setGlobalInstance(this);
        // cc.game.addPersistRootNode(this.node);
        // this.node.getComponent(cc.Widget).target = cc.find("Canvas")
    };
    ViewManager.prototype.onEnable = function () {
    };
    ViewManager.prototype.onDestroy = function () {
        // cc.game.removePersistRootNode(this.node);
        for (var key in this._views) {
            delete this._views[key];
        }
    };
    ViewManager.prototype.start = function () {
        //load prefab
        // this.modal.active = false;
        // this.sprite = this.getComponent(cc.Sprite)
        // this.modal.zIndex = 999;
    };
    ViewManager.prototype.getVisibleDialog = function () {
        for (var name in this._views) {
            var view = this._views[name];
            if (view.isDialog) {
                if (this.isVisible(name)) {
                    return view;
                }
            }
        }
        return null;
    };
    ViewManager.prototype.hasVisibleDialog = function () {
        for (var name in this._views) {
            var view = this._views[name];
            if (view.isDialog) {
                if (this.isVisible(name)) {
                    return true;
                }
            }
        }
        return false;
    };
    ViewManager.prototype.isVisible = function (viewname) {
        var view = null;
        if (typeof (viewname) == "string")
            view = this._views[viewname];
        else
            view = viewname;
        //todo check type 
        if (view) {
            return view.node.active;
        }
        return false;
    };
    ViewManager.prototype.attachViewComp = function (existingView) {
        var viewComp = null;
        if (viewComp == null || viewComp == undefined) {
            viewComp = existingView.getComponent(View_1.default);
            if (viewComp == null) {
                viewComp = existingView.addComponent(View_1.default);
                viewComp.init(existingView.name);
            }
            this._views[existingView.name] = viewComp;
        }
        return viewComp;
    };
    ViewManager.prototype.showView = function (view) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.modal.active = view.isDialog;
        //check has popuped dialog and  all currentview is dialog show modal forcely.
        if (this.hasVisibleDialog() || view.isDialog) {
            this.modal.active = true;
        }
        if (view.isDialog) {
            this.modal.opacity = view.opacity;
        }
        return view.show.apply(view, params);
    };
    ViewManager.prototype.showFromPrefab = function (prefab, prefabPath) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        var view = this._views[prefabPath];
        if (view == null) {
            var node = cc.instantiate(prefab);
            view = node.getComponent(View_1.default);
            if (view == null) {
                view = node.addComponent(View_1.default);
                view.isDialog = true;
                //default is dialog
            }
            var widget = view.getComponent(cc.Widget);
            if (widget)
                widget.target = cc.find("Canvas");
            view.init(prefabPath);
            this._views[prefabPath] = view;
            if (view.isDialog) {
                this.node.addChild(node, 1000);
            }
            else {
                this.node.addChild(node, 1000);
            }
            // g.foreachNode(view.node,this.updateWidgets,this)
        }
        // node = view.node;
        this.node.color.setA(255);
        console.log(TAG, "show view:" + prefabPath);
        return this.showView.apply(this, __spreadArrays([view], params));
    };
    ViewManager.prototype.showFromPrefabPath = function (prefabPath) {
        var _this = this;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var view = this._views[prefabPath];
        if (view == null || view == undefined) {
            console.log("start load prefab:" + prefabPath);
            var beforeTime_1 = new Date().getTime();
            cc.loader.loadRes(prefabPath, cc.Prefab, function (e, prefab) {
                console.log(TAG, "prefab loaded : " + prefabPath + " " + (new Date().getTime() - beforeTime_1) + "ms");
                _this.showFromPrefab.apply(_this, __spreadArrays([prefab, prefabPath], params));
            });
        }
        else {
            // this.sprite.enabled = false;
            this.modal.active = view.isDialog;
            if (this.hasVisibleDialog() || view.isDialog) {
                this.modal.active = true;
                this.modal.opacity = view.opacity;
            }
            console.log(TAG, "show view:" + prefabPath, params);
            // let viewnode = view.node;
            // view.node.x = 0;
            // view.node.y = 0;
            return view.show.apply(view, params);
        }
    };
    ViewManager.prototype.preload = function (prefabPath) {
        var _this = this;
        var view = this._views[prefabPath];
        if (view == null || view == undefined) {
            cc.loader.loadRes(prefabPath, cc.Prefab, function (e, prefab) {
                console.log(TAG, "preload view" + prefabPath);
                var node = cc.instantiate(prefab);
                view = node.getComponent(View_1.default);
                var widget = view.getComponent(cc.Widget);
                if (widget)
                    widget.target = cc.find("Canvas");
                view.init(prefabPath);
                _this._views[prefabPath] = view;
                // this.scheduleOnce(_=>node.active = false,0);
                if (view.isDialog) {
                    _this.node.addChild(node, 1000);
                }
                else {
                    _this.node.addChild(node, 1000);
                }
                view.hide();
            });
        }
        else {
        }
    };
    // will enableTouch next show up
    ViewManager.prototype.disableTouch = function (viewNode) {
        var view = viewNode.getComponent(View_1.default);
        if (view) {
            view.touchEnabled = false;
        }
    };
    ViewManager.prototype.enableTouch = function (viewNode) {
        var view = viewNode.getComponent(View_1.default);
        if (view) {
            view.touchEnabled = true;
        }
    };
    ViewManager.prototype.show = function (view) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        // disable current view 's touch  
        if (typeof (view) == "string") {
            return this.showFromPrefabPath.apply(this, __spreadArrays([view], params));
        }
        else {
            if (view == null || view == undefined)
                return;
            if (view.node)
                view = view.node;
            var v = this.attachViewComp(view);
            return this.showView.apply(this, __spreadArrays([v], params));
        }
    };
    ViewManager.prototype.hide = function (viewname, playHideAnim) {
        if (playHideAnim === void 0) { playHideAnim = true; }
        if (typeof (viewname) != "string") {
            // get view name 
            if (viewname == null || viewname == undefined)
                return;
            this.attachViewComp(viewname);
            viewname = viewname.name;
        }
        var view = this._views[viewname];
        if (view != null && view != undefined) {
            view.node.active = false;
            if (view.isDialog) {
                //todo: should support dialog hide animtion  later 
                this.modal.active = false;
            }
            if (this.hasVisibleDialog()) {
                this.modal.active = true;
            }
            // if(view.isInHideAnimation())
            //     return;
            // view.hide();
            if (playHideAnim)
                view.doHideAnimation();
            view.onHidden();
        }
    };
    ViewManager.prototype.checkViewStacks = function () {
        var dialog = this.getVisibleDialog();
        if (dialog) {
            this.modal.active = true;
            this.modal.opacity = dialog.opacity;
        }
    };
    ViewManager.prototype.hideAll = function () {
        for (var viewname in this._views) {
            // let view = this._views[viewname]
            this.hide(viewname);
        }
    };
    var ViewManager_1;
    __decorate([
        property(cc.Node)
    ], ViewManager.prototype, "modal", void 0);
    __decorate([
        property
    ], ViewManager.prototype, "modalOpacity", void 0);
    ViewManager = ViewManager_1 = __decorate([
        ccclass
    ], ViewManager);
    return ViewManager;
}(cc.Component));
exports.default = ViewManager;

cc._RF.pop();