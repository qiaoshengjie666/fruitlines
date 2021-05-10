
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/ui/ViewManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1aVxcVmlld01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUEwQjtBQUdwQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxJQUFJLEdBQUcsR0FBVSxlQUFlLENBQUE7QUFFaEM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUF5U0M7UUFyU0csZUFBZTtRQUVmLDZCQUE2QjtRQUU3QixZQUFNLEdBQXlCLEVBQUUsQ0FBQTtRQUVyQyxHQUFHO1FBRUMsV0FBSyxHQUFXLElBQUksQ0FBQztRQUdyQixrQkFBWSxHQUFVLEdBQUcsQ0FBQzs7UUF5UjFCLGlCQUFpQjtJQUNyQixDQUFDO29CQXpTb0IsV0FBVztJQWtCNUIsNEJBQU0sR0FBTjtRQUVJLGFBQVcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDeEIsNEJBQTRCO1FBQzVCLHlDQUF5QztRQUN6QywrREFBK0Q7SUFDbkUsQ0FBQztJQUVELDhCQUFRLEdBQVI7SUFHQSxDQUFDO0lBRUQsK0JBQVMsR0FBVDtRQUVJLDRDQUE0QztRQUM1QyxLQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUM7WUFDdkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVELDJCQUFLLEdBQUw7UUFDSSxhQUFhO1FBRWIsNkJBQTZCO1FBQzdCLDZDQUE2QztRQUM3QywyQkFBMkI7SUFDL0IsQ0FBQztJQUNPLHNDQUFnQixHQUF4QjtRQUVJLEtBQUksSUFBSSxJQUFJLElBQUksSUFBSSxD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QUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUVELDZCQUFPLEdBQVA7UUFFSSxLQUFLLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUM7WUFDN0IsbUNBQW1DO1lBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkI7SUFDTCxDQUFDOztJQTFSRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNHO0lBR3JCO1FBREMsUUFBUTtxREFDaUI7SUFmVCxXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBeVMvQjtJQUFELGtCQUFDO0NBelNELEFBeVNDLENBelN3QyxFQUFFLENBQUMsU0FBUyxHQXlTcEQ7a0JBelNvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXcgZnJvbSBcIi4vVmlld1wiO1xuaW1wb3J0IHsgVG9hc3QgfSBmcm9tIFwiLi9Ub2FzdE1hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbnZhciBUQUc6c3RyaW5nID0gXCJbVmlld01hbmFnZXJdXCJcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3TWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcbiAgICBzdGF0aWMgaW5zdGFuY2U6Vmlld01hbmFnZXI7XG4gICAgLy8gb25Mb2FkICgpIHt9XG5cbiAgICAvLyBiYXNlRGlyOnN0cmluZyA9IFwiYXNzZXRzL1wiXG5cbiAgICBfdmlld3M6e1tpbmRleDpzdHJpbmddOlZpZXd9ID0ge31cblxuLy8gXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbW9kYWw6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHlcbiAgICBtb2RhbE9wYWNpdHk6bnVtYmVyID0gMTYwO1xuXG5cbiAgICBvbkxvYWQoKVxuICAgIHtcbiAgICAgICAgVmlld01hbmFnZXIuaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICB0aGlzLm1vZGFsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vZGFsLnpJbmRleCA9IDk5OTtcbiAgICAgICAgLy9nLnNldEdsb2JhbEluc3RhbmNlKHRoaXMpO1xuICAgICAgICAvLyBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudGFyZ2V0ID0gY2MuZmluZChcIkNhbnZhc1wiKVxuICAgIH1cblxuICAgIG9uRW5hYmxlKClcbiAgICB7XG4gICAgICAgIFxuICAgIH1cblxuICAgIG9uRGVzdHJveSgpXG4gICAge1xuICAgICAgICAvLyBjYy5nYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xuICAgICAgICBmb3IodmFyIGtleSBpbiB0aGlzLl92aWV3cyl7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fdmlld3Nba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgLy9sb2FkIHByZWZhYlxuICAgICAgICBcbiAgICAgICAgLy8gdGhpcy5tb2RhbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgLy8gdGhpcy5zcHJpdGUgPSB0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpXG4gICAgICAgIC8vIHRoaXMubW9kYWwuekluZGV4ID0gOTk5O1xuICAgIH1cbiAgICBwcml2YXRlIGdldFZpc2libGVEaWFsb2coKVxuICAgIHtcbiAgICAgICAgZm9yKHZhciBuYW1lIGluIHRoaXMuX3ZpZXdzKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgdmlldyA9IHRoaXMuX3ZpZXdzW25hbWVdXG4gICAgICAgICAgICBpZih2aWV3LmlzRGlhbG9nKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZShuYW1lKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2aWV3O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gICAgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNWaXNpYmxlRGlhbG9nKClcbiAgICB7XG4gICAgICAgIGZvcih2YXIgbmFtZSBpbiB0aGlzLl92aWV3cylcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHZpZXcgPSB0aGlzLl92aWV3c1tuYW1lXVxuICAgICAgICAgICAgaWYodmlldy5pc0RpYWxvZylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUobmFtZSkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gICAgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1Zpc2libGUodmlld25hbWUpXG4gICAge1xuICAgICAgICBsZXQgdmlldyA9IG51bGw7XG4gICAgICAgIGlmICh0eXBlb2Yodmlld25hbWUpID09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICB2aWV3ID0gdGhpcy5fdmlld3Nbdmlld25hbWVdXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHZpZXcgPSB2aWV3bmFtZTtcbiAgICAgICAgLy90b2RvIGNoZWNrIHR5cGUgXG4gICAgICAgIGlmICh2aWV3KVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdmlldy5ub2RlLmFjdGl2ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBwcml2YXRlIGF0dGFjaFZpZXdDb21wKGV4aXN0aW5nVmlldzpjYy5Ob2RlKTpWaWV3XG4gICAge1xuICAgICAgICBsZXQgdmlld0NvbXAgPSBudWxsO1xuICAgICAgICBpZih2aWV3Q29tcCA9PSBudWxsfHwgdmlld0NvbXAgPT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB2aWV3Q29tcCA9IGV4aXN0aW5nVmlldy5nZXRDb21wb25lbnQoVmlldyk7XG4gICAgICAgICAgICBpZih2aWV3Q29tcCA9PSBudWxsKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZpZXdDb21wID0gZXhpc3RpbmdWaWV3LmFkZENvbXBvbmVudChWaWV3KTtcbiAgICAgICAgICAgICAgICB2aWV3Q29tcC5pbml0KGV4aXN0aW5nVmlldy5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3ZpZXdzW2V4aXN0aW5nVmlldy5uYW1lXSA9IHZpZXdDb21wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2aWV3Q29tcDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dWaWV3KHZpZXcsLi4ucGFyYW1zKVxuICAgIHtcbiAgICAgICAgdGhpcy5tb2RhbC5hY3RpdmUgPSB2aWV3LmlzRGlhbG9nO1xuICAgICAgICAvL2NoZWNrIGhhcyBwb3B1cGVkIGRpYWxvZyBhbmQgIGFsbCBjdXJyZW50dmlldyBpcyBkaWFsb2cgc2hvdyBtb2RhbCBmb3JjZWx5LlxuICAgICAgICBpZiAodGhpcy5oYXNWaXNpYmxlRGlhbG9nKCkgfHwgdmlldy5pc0RpYWxvZylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5tb2RhbC5hY3RpdmUgPSAgdHJ1ZTsgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBpZiAodmlldy5pc0RpYWxvZylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5tb2RhbC5vcGFjaXR5ID0gdmlldy5vcGFjaXR5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2aWV3LnNob3coLi4ucGFyYW1zKTtcbiAgICB9XG5cbiAgICBzaG93RnJvbVByZWZhYihwcmVmYWI6Y2MuUHJlZmFiLHByZWZhYlBhdGg6c3RyaW5nICwuLi5wYXJhbXMpXG4gICAge1xuICAgICAgICBsZXQgdmlldyA9IHRoaXMuX3ZpZXdzW3ByZWZhYlBhdGhdO1xuICAgICAgICBpZih2aWV3ID09IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKVxuICAgICAgICAgICAgdmlldyA9IG5vZGUuZ2V0Q29tcG9uZW50KFZpZXcpXG4gICAgICAgICAgICBpZih2aWV3ID09IG51bGwpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmlldyA9IG5vZGUuYWRkQ29tcG9uZW50KFZpZXcpO1xuICAgICAgICAgICAgICAgIHZpZXcuaXNEaWFsb2cgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vZGVmYXVsdCBpcyBkaWFsb2dcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB3aWRnZXQgPSB2aWV3LmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xuICAgICAgICAgICAgaWYod2lkZ2V0KVxuICAgICAgICAgICAgICAgIHdpZGdldC50YXJnZXQgPSBjYy5maW5kKFwiQ2FudmFzXCIpXG4gICAgICAgICAgICB2aWV3LmluaXQocHJlZmFiUGF0aCk7XG4gICAgICAgICAgICB0aGlzLl92aWV3c1twcmVmYWJQYXRoXSA9IHZpZXc7XG4gICAgICAgICAgICBpZih2aWV3LmlzRGlhbG9nKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlLDEwMDApO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUsMTAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBnLmZvcmVhY2hOb2RlKHZpZXcubm9kZSx0aGlzLnVwZGF0ZVdpZGdldHMsdGhpcylcbiAgICAgICAgfVxuICAgICAgICAvLyBub2RlID0gdmlldy5ub2RlO1xuICAgICAgICB0aGlzLm5vZGUuY29sb3Iuc2V0QSgyNTUpO1xuICAgICAgICBjb25zb2xlLmxvZyhUQUcsXCJzaG93IHZpZXc6XCIgKyBwcmVmYWJQYXRoIClcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd1ZpZXcodmlldywuLi5wYXJhbXMpO1xuICAgIH1cblxuICAgIHNob3dGcm9tUHJlZmFiUGF0aChwcmVmYWJQYXRoOnN0cmluZywuLi5wYXJhbXMpXG4gICAge1xuICAgICAgICBsZXQgdmlldyA9IHRoaXMuX3ZpZXdzW3ByZWZhYlBhdGhdXG4gICAgICAgIGlmKHZpZXcgPT0gbnVsbCB8fHZpZXcgPT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0IGxvYWQgcHJlZmFiOlwiICtwcmVmYWJQYXRoKVxuICAgICAgICAgICAgbGV0IGJlZm9yZVRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHByZWZhYlBhdGgsY2MuUHJlZmFiLChlLHByZWZhYjpjYy5QcmVmYWIpID0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFRBRyxcInByZWZhYiBsb2FkZWQgOiBcIisgcHJlZmFiUGF0aCArXCIgXCIrICAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBiZWZvcmVUaW1lKSArXCJtc1wiKVxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Zyb21QcmVmYWIocHJlZmFiLHByZWZhYlBhdGgsLi4ucGFyYW1zKTtcbiAgICAgICAgICAgIH0pIFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vIHRoaXMuc3ByaXRlLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubW9kYWwuYWN0aXZlID0gdmlldy5pc0RpYWxvZztcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1Zpc2libGVEaWFsb2coKSB8fCB2aWV3LmlzRGlhbG9nKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kYWwuYWN0aXZlID0gIHRydWU7ICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsLm9wYWNpdHkgPSB2aWV3Lm9wYWNpdHk7ICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coVEFHLFwic2hvdyB2aWV3OlwiICsgcHJlZmFiUGF0aCAscGFyYW1zKVxuICAgICAgICAgICAgLy8gbGV0IHZpZXdub2RlID0gdmlldy5ub2RlO1xuICAgICAgICAgICAgLy8gdmlldy5ub2RlLnggPSAwO1xuICAgICAgICAgICAgLy8gdmlldy5ub2RlLnkgPSAwO1xuICAgICAgICAgICAgcmV0dXJuICB2aWV3LnNob3coLi4ucGFyYW1zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByZWxvYWQocHJlZmFiUGF0aDpzdHJpbmcpXG4gICAge1xuICAgICAgICBsZXQgdmlldyA9IHRoaXMuX3ZpZXdzW3ByZWZhYlBhdGhdXG4gICAgICAgIGlmKHZpZXcgPT0gbnVsbCB8fHZpZXcgPT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhwcmVmYWJQYXRoLGNjLlByZWZhYiwoZSxwcmVmYWI6Y2MuUHJlZmFiKSA9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhUQUcsXCJwcmVsb2FkIHZpZXdcIisgcHJlZmFiUGF0aClcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYilcbiAgICAgICAgICAgICAgICB2aWV3ID0gbm9kZS5nZXRDb21wb25lbnQoVmlldyk7XG4gICAgICAgICAgICAgICAgbGV0IHdpZGdldCA9IHZpZXcuZ2V0Q29tcG9uZW50KGNjLldpZGdldCk7XG4gICAgICAgICAgICAgICAgaWYod2lkZ2V0KVxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQudGFyZ2V0ID0gY2MuZmluZChcIkNhbnZhc1wiKVxuICAgICAgICAgICAgICAgIHZpZXcuaW5pdChwcmVmYWJQYXRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl92aWV3c1twcmVmYWJQYXRoXSA9IHZpZXc7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoXz0+bm9kZS5hY3RpdmUgPSBmYWxzZSwwKTtcbiAgICAgICAgICAgICAgICBpZiAodmlldy5pc0RpYWxvZylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlLDEwMDApO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSwxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmlldy5oaWRlKCk7XG4gICAgICAgICAgICB9KSBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB3aWxsIGVuYWJsZVRvdWNoIG5leHQgc2hvdyB1cFxuICAgIGRpc2FibGVUb3VjaCh2aWV3Tm9kZSlcbiAgICB7XG4gICAgICAgIGxldCB2aWV3ID0gdmlld05vZGUuZ2V0Q29tcG9uZW50KFZpZXcpXG4gICAgICAgIGlmKHZpZXcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZpZXcudG91Y2hFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmFibGVUb3VjaCh2aWV3Tm9kZSlcbiAgICB7XG4gICAgICAgIGxldCB2aWV3ID0gdmlld05vZGUuZ2V0Q29tcG9uZW50KFZpZXcpXG4gICAgICAgIGlmKHZpZXcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZpZXcudG91Y2hFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc2hvdyh2aWV3LCAuLi5wYXJhbXMpXG4gICAge1xuICAgICAgICAvLyBkaXNhYmxlIGN1cnJlbnQgdmlldyAncyB0b3VjaCAgXG4gICAgICAgIGlmICh0eXBlb2YodmlldykgPT0gXCJzdHJpbmdcIilcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvd0Zyb21QcmVmYWJQYXRoKHZpZXcsLi4ucGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgaWYgKHZpZXcgPT0gbnVsbHx8IHZpZXcgPT0gdW5kZWZpbmVkKSAgcmV0dXJuO1xuICAgICAgICAgICAgaWYodmlldy5ub2RlKSB2aWV3ID0gdmlldy5ub2RlO1xuICAgICAgICAgICAgbGV0IHYgPSB0aGlzLmF0dGFjaFZpZXdDb21wKHZpZXcpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93Vmlldyh2LC4uLnBhcmFtcyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGhpZGUodmlld25hbWUscGxheUhpZGVBbmltID0gdHJ1ZSlcbiAgICB7XG4gICAgICAgIGlmKHR5cGVvZih2aWV3bmFtZSkgIT0gXCJzdHJpbmdcIilcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gZ2V0IHZpZXcgbmFtZSBcbiAgICAgICAgICAgIGlmICh2aWV3bmFtZSA9PSBudWxsfHwgdmlld25hbWUgPT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLmF0dGFjaFZpZXdDb21wKHZpZXduYW1lKVxuICAgICAgICAgICAgdmlld25hbWUgPSB2aWV3bmFtZS5uYW1lO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2aWV3ID0gdGhpcy5fdmlld3Nbdmlld25hbWVdXG4gICAgICAgIGlmKHZpZXcgIT0gbnVsbCAmJiB2aWV3ICE9IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdmlldy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHZpZXcuaXNEaWFsb2cgKXtcbiAgICAgICAgICAgICAgICAvL3RvZG86IHNob3VsZCBzdXBwb3J0IGRpYWxvZyBoaWRlIGFuaW10aW9uICBsYXRlciBcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5oYXNWaXNpYmxlRGlhbG9nKCkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYodmlldy5pc0luSGlkZUFuaW1hdGlvbigpKVxuICAgICAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgICAgIC8vIHZpZXcuaGlkZSgpO1xuICAgICAgICAgICAgaWYocGxheUhpZGVBbmltIClcbiAgICAgICAgICAgICAgICB2aWV3LmRvSGlkZUFuaW1hdGlvbigpO1xuICAgICAgICAgICAgdmlldy5vbkhpZGRlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tWaWV3U3RhY2tzKClcbiAgICB7XG4gICAgICAgIGxldCBkaWFsb2cgPSB0aGlzLmdldFZpc2libGVEaWFsb2coKVxuICAgICAgICBpZihkaWFsb2cpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWwuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubW9kYWwub3BhY2l0eSA9IGRpYWxvZy5vcGFjaXR5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZUFsbCgpXG4gICAge1xuICAgICAgICBmb3IgKHZhciB2aWV3bmFtZSBpbiB0aGlzLl92aWV3cyl7XG4gICAgICAgICAgICAvLyBsZXQgdmlldyA9IHRoaXMuX3ZpZXdzW3ZpZXduYW1lXVxuICAgICAgICAgICAgdGhpcy5oaWRlKHZpZXduYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=