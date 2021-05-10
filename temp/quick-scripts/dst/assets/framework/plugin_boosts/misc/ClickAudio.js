
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/misc/ClickAudio.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5ee8a8X6jFF5qtYOWlGoNww', 'ClickAudio');
// framework/plugin_boosts/misc/ClickAudio.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Device_1 = require("../gamesys/Device");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ClickAudio = /** @class */ (function (_super) {
    __extends(ClickAudio, _super);
    function ClickAudio() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.audio = null;
        _this.elastic = false;
        _this._oldScale = 1;
        return _this;
        // update (dt) {}
    }
    ClickAudio.prototype.anim2 = function () {
        var act = cc.scaleBy(0.6, 0.9, 0.9).easing(cc.easeElasticOut(0.3));
        this.node.runAction(act);
    };
    ClickAudio.prototype.anim2back = function () {
        var act = cc.scaleTo(0.6, this._oldScale, this._oldScale).easing(cc.easeElasticOut(0.3));
        this.node.runAction(act);
    };
    ClickAudio.prototype.onLoad = function () {
        var _this = this;
        if (this.elastic) {
            var btn = this.getComponent(cc.Button);
            btn.transition = cc.Button.Transition.COLOR;
            btn.normalColor = cc.Color.WHITE;
            btn.pressedColor = new cc.Color(200, 200, 200);
            this._oldScale = this.node.scale;
        }
        this.node.on('touchstart', function (_) {
            //cc.EaseElasticOut:create(
            // this.node.stopAllActions();
            _this.elastic && _this.anim2();
        }, this.node);
        this.node.on("touchend", function (_) {
            Device_1.default.playEffect(_this.audio, false);
            _this.elastic && _this.anim2back();
        });
        this.node.on("touchcancel", function (_) {
            _this.elastic && _this.anim2back();
        });
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], ClickAudio.prototype, "audio", void 0);
    __decorate([
        property
    ], ClickAudio.prototype, "elastic", void 0);
    ClickAudio = __decorate([
        ccclass
    ], ClickAudio);
    return ClickAudio;
}(cc.Component));
exports.default = ClickAudio;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxtaXNjXFxDbGlja0F1ZGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBdUM7QUFFakMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUFnREM7UUE3Q0csV0FBSyxHQUFpQixJQUFJLENBQUM7UUFHM0IsYUFBTyxHQUFXLEtBQUssQ0FBQztRQUV4QixlQUFTLEdBQVUsQ0FBQyxDQUFDOztRQXVDckIsaUJBQWlCO0lBQ3JCLENBQUM7SUF0Q0csMEJBQUssR0FBTDtRQUVJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCw4QkFBUyxHQUFUO1FBRUksSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsMkJBQU0sR0FBTjtRQUFBLGlCQXVCQztRQXRCRyxJQUFHLElBQUksQ0FBQyxPQUFPLEVBQ2Y7WUFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN0QyxHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUM1QyxHQUFHLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ2pDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNwQztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFBLENBQUM7WUFDeEIsMkJBQTJCO1lBQzNCLDhCQUE4QjtZQUM5QixLQUFJLENBQUMsT0FBTyxJQUFJLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFDLFVBQUEsQ0FBQztZQUNyQixnQkFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ25DLEtBQUksQ0FBQyxPQUFPLElBQUksS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFDLFVBQUEsQ0FBQztZQUN4QixLQUFJLENBQUMsT0FBTyxJQUFJLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUExQ0Q7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBQyxDQUFDOzZDQUNKO0lBRzNCO1FBREMsUUFBUTsrQ0FDZTtJQU5QLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FnRDlCO0lBQUQsaUJBQUM7Q0FoREQsQUFnREMsQ0FoRHVDLEVBQUUsQ0FBQyxTQUFTLEdBZ0RuRDtrQkFoRG9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGV2aWNlIGZyb20gXCIuLi9nYW1lc3lzL0RldmljZVwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaWNrQXVkaW8gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOiBjYy5BdWRpb0NsaXB9KVxuICAgIGF1ZGlvIDpjYy5BdWRpb0NsaXAgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5XG4gICAgZWxhc3RpYzpib29sZWFuID0gZmFsc2U7XG5cbiAgICBfb2xkU2NhbGU6bnVtYmVyID0gMTtcblxuICAgIGFuaW0yKClcbiAgICB7XG4gICAgICAgIGxldCBhY3QgPSBjYy5zY2FsZUJ5KDAuNiwgMC45LDAuOSkuZWFzaW5nKGNjLmVhc2VFbGFzdGljT3V0KDAuMykpO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGFjdCk7XG4gICAgfVxuICAgIFxuICAgIGFuaW0yYmFjaygpXG4gICAge1xuICAgICAgICBsZXQgYWN0ID0gY2Muc2NhbGVUbygwLjYsIHRoaXMuX29sZFNjYWxlLHRoaXMuX29sZFNjYWxlKS5lYXNpbmcoY2MuZWFzZUVsYXN0aWNPdXQoMC4zKSk7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0KTtcbiAgICB9XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBpZih0aGlzLmVsYXN0aWMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBidG4gPSB0aGlzLmdldENvbXBvbmVudChjYy5CdXR0b24pXG4gICAgICAgICAgICBidG4udHJhbnNpdGlvbiA9IGNjLkJ1dHRvbi5UcmFuc2l0aW9uLkNPTE9SO1xuICAgICAgICAgICAgYnRuLm5vcm1hbENvbG9yID0gY2MuQ29sb3IuV0hJVEU7XG4gICAgICAgICAgICBidG4ucHJlc3NlZENvbG9yID0gbmV3IGNjLkNvbG9yKDIwMCwyMDAsMjAwKTtcbiAgICAgICAgICAgIHRoaXMuX29sZFNjYWxlID0gdGhpcy5ub2RlLnNjYWxlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoc3RhcnQnLCBfPT57XG4gICAgICAgICAgICAvL2NjLkVhc2VFbGFzdGljT3V0OmNyZWF0ZShcbiAgICAgICAgICAgIC8vIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5lbGFzdGljICYmIHRoaXMuYW5pbTIoKTtcbiAgICAgICAgfSwgdGhpcy5ub2RlKTtcblxuICAgICAgICB0aGlzLm5vZGUub24oXCJ0b3VjaGVuZFwiLF89PntcbiAgICAgICAgICAgIERldmljZS5wbGF5RWZmZWN0KHRoaXMuYXVkaW8sZmFsc2UpXG4gICAgICAgICAgICB0aGlzLmVsYXN0aWMgJiYgdGhpcy5hbmltMmJhY2soKTtcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5ub2RlLm9uKFwidG91Y2hjYW5jZWxcIixfPT57XG4gICAgICAgICAgICB0aGlzLmVsYXN0aWMgJiYgdGhpcy5hbmltMmJhY2soKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19