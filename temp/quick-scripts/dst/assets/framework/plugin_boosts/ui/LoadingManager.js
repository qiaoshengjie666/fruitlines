
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/ui/LoadingManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1aVxcTG9hZGluZ01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUvQixRQUFBLE9BQU8sR0FBa0IsSUFBSSxDQUFDO0FBR3pDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBNERDO1FBekRHLFlBQU0sR0FBYSxJQUFJLENBQUM7UUFFeEIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFDM0IsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFDL0IsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsb0JBQWMsR0FBdUIsSUFBSSxDQUFDO1FBRTFDLGVBQVMsR0FBTyxJQUFJLENBQUM7UUFDckIsYUFBTyxHQUFPLElBQUksQ0FBQzs7UUFnRG5CLGlCQUFpQjtJQUNyQixDQUFDO0lBaERHLCtCQUFNLEdBQU47UUFFSSxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLGVBQU8sR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELDhCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsbUNBQVUsR0FBVjtRQUVJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUcsSUFBSSxDQUFDLFNBQVMsRUFDakI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDcEM7SUFDTCxDQUFDO0lBRUQsNkJBQUksR0FBSixVQUFLLE9BQU8sRUFBQyxJQUFTLEVBQUMsS0FBWSxFQUFDLFFBQWUsRUFBQyxNQUFhO1FBQXBELHFCQUFBLEVBQUEsV0FBUztRQUFDLHNCQUFBLEVBQUEsWUFBWTtRQUFDLHlCQUFBLEVBQUEsZUFBZTtRQUFDLHVCQUFBLEVBQUEsYUFBYTtRQUU3RCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQTtRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQTtRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQTtRQUNyQixJQUFHLElBQUk7WUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkMsSUFBRyxPQUFPLEdBQUcsQ0FBQyxFQUNkO1lBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQzdDO0lBQ0wsQ0FBQztJQUVELDZCQUFJLEdBQUo7UUFFSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBdEREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7a0RBQ0k7SUFIUCxjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBNERsQztJQUFELHFCQUFDO0NBNURELEFBNERDLENBNUQyQyxFQUFFLENBQUMsU0FBUyxHQTREdkQ7a0JBNURvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbmV4cG9ydCB2YXIgTG9hZGluZzpMb2FkaW5nTWFuYWdlciA9IG51bGw7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nTWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHByZWZhYjpjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgbG9hZGluZ05vZGU6Y2MuTm9kZSA9IG51bGw7XG4gICAgbG9hZGluZ1Nwcml0ZTpjYy5TcHJpdGUgPSBudWxsO1xuICAgIGxvYWRpbmdUZXh0OmNjLkxhYmVsID0gbnVsbDtcbiAgICBibG9ja0V2ZW50Q29tcDpjYy5CbG9ja0lucHV0RXZlbnRzID0gbnVsbDtcblxuICAgIF9jYWxsYmFjazphbnkgPSBudWxsO1xuICAgIF90YXJnZXQ6YW55ID0gbnVsbDtcbiAgICBvbkxvYWQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiKTtcbiAgICAgICAgdGhpcy5ibG9ja0V2ZW50Q29tcCA9IHRoaXMubG9hZGluZ05vZGUuZ2V0Q29tcG9uZW50KGNjLkJsb2NrSW5wdXRFdmVudHMpO1xuICAgICAgICB0aGlzLmxvYWRpbmdOb2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgdGhpcy5sb2FkaW5nTm9kZS56SW5kZXggPSA5OTk5O1xuICAgICAgICB0aGlzLmxvYWRpbmdTcHJpdGUgPSB0aGlzLmxvYWRpbmdOb2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuU3ByaXRlKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nVGV4dCA9IHRoaXMubG9hZGluZ05vZGUuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICBMb2FkaW5nID0gdGhpcztcbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMubG9hZGluZ1Nwcml0ZS5ub2RlLnJ1bkFjdGlvbihjYy5yb3RhdGVCeSg0LDM2MCkucmVwZWF0Rm9yZXZlcigpKTtcbiAgICB9XG5cbiAgICBkZWFseUNsb3NlKClcbiAgICB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICBpZih0aGlzLl9jYWxsYmFjaylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2suY2FsbCh0aGlzLl90YXJnZXQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KHRpbWVvdXQsdGV4dD1udWxsLG1vZGFsID0gdHJ1ZSxjYWxsYmFjayA9IG51bGwsdGFyZ2V0ID0gbnVsbClcbiAgICB7XG4gICAgICAgIHRoaXMubG9hZGluZ05vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2FkaW5nTm9kZS5yZXN1bWVBbGxBY3Rpb25zKCk7XG4gICAgICAgIHRoaXMuYmxvY2tFdmVudENvbXAuZW5hYmxlZCA9IG1vZGFsXG4gICAgICAgIHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2sgXG4gICAgICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldFxuICAgICAgICBpZih0ZXh0KVxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nVGV4dC5zdHJpbmcgPSB0ZXh0O1xuICAgICAgICBpZih0aW1lb3V0ID4gMClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuZGVhbHlDbG9zZSk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLmRlYWx5Q2xvc2UsdGltZW91dClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGUoKVxuICAgIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2FkaW5nTm9kZS5wYXVzZUFsbEFjdGlvbnMoKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19