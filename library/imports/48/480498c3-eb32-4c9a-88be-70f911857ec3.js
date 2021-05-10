"use strict";
cc._RF.push(module, '48049jD6zJMmoi+cPkRhX7D', 'LoadingManager');
// framework/plugin_boosts/ui/LoadingManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.Loading = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
exports.Loading = null;
var LoadingManager = /** @class */ (function (_super) {
    __extends(LoadingManager, _super);
    function LoadingManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab = null;
        _this.loadingNode = null;
        _this.loadingSprite = null;
        _this.loadingText = null;
        _this.blockEventComp = null;
        _this._callback = null;
        _this._target = null;
        return _this;
        // update (dt) {}
    }
    LoadingManager.prototype.onLoad = function () {
        this.loadingNode = cc.instantiate(this.prefab);
        this.blockEventComp = this.loadingNode.getComponent(cc.BlockInputEvents);
        this.loadingNode.parent = this.node;
        this.loadingNode.zIndex = 9999;
        this.loadingSprite = this.loadingNode.getComponentInChildren(cc.Sprite);
        this.loadingText = this.loadingNode.getComponentInChildren(cc.Label);
        this.hide();
        exports.Loading = this;
    };
    LoadingManager.prototype.start = function () {
        this.loadingSprite.node.runAction(cc.rotateBy(4, 360).repeatForever());
    };
    LoadingManager.prototype.dealyClose = function () {
        this.hide();
        if (this._callback) {
            this._callback.call(this._target);
        }
    };
    LoadingManager.prototype.show = function (timeout, text, modal, callback, target) {
        if (text === void 0) { text = null; }
        if (modal === void 0) { modal = true; }
        if (callback === void 0) { callback = null; }
        if (target === void 0) { target = null; }
        this.loadingNode.active = true;
        this.loadingNode.resumeAllActions();
        this.blockEventComp.enabled = modal;
        this._callback = callback;
        this._target = target;
        if (text)
            this.loadingText.string = text;
        if (timeout > 0) {
            this.unschedule(this.dealyClose);
            this.scheduleOnce(this.dealyClose, timeout);
        }
    };
    LoadingManager.prototype.hide = function () {
        this.loadingNode.active = false;
        this.loadingNode.pauseAllActions();
    };
    __decorate([
        property(cc.Prefab)
    ], LoadingManager.prototype, "prefab", void 0);
    LoadingManager = __decorate([
        ccclass
    ], LoadingManager);
    return LoadingManager;
}(cc.Component));
exports.default = LoadingManager;

cc._RF.pop();