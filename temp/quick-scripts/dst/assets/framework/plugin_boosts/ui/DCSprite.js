
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/ui/DCSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '82b09vMdyFCOb0NEdBTtZHy', 'DCSprite');
// framework/plugin_boosts/ui/DCSprite.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DCUI_1 = require("./DCUI");
var SpriteFrameCache_1 = require("../misc/SpriteFrameCache");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
var DCSprite = /** @class */ (function (_super) {
    __extends(DCSprite, _super);
    function DCSprite() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DCSprite.prototype.onLoad = function () {
        this.sprite = this.getComponent(cc.Sprite);
    };
    DCSprite.prototype.refreshSpriteFrame = function (v) {
        var _this = this;
        // this.sprite.spriteFrame = v;
        var spriteframe = SpriteFrameCache_1.default.instance.getSpriteFrame(v).then(function (sf) {
            _this.sprite.spriteFrame = sf;
        }).catch(function (_) { console.log("request imageUrl error :" + v); });
    };
    DCSprite.prototype.onValueChanged = function (v) {
        this.refreshSpriteFrame(v);
    };
    DCSprite = __decorate([
        ccclass,
        requireComponent(cc.Sprite)
    ], DCSprite);
    return DCSprite;
}(DCUI_1.default));
exports.default = DCSprite;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1aVxcRENTcHJpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUEwQjtBQUMxQiw2REFBd0Q7QUFFbEQsSUFBQSxLQUF1QyxFQUFFLENBQUMsVUFBVSxFQUFuRCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBQyxnQkFBZ0Isc0JBQWlCLENBQUM7QUFLM0Q7SUFBc0MsNEJBQUk7SUFBMUM7O0lBc0JBLENBQUM7SUFuQkcseUJBQU0sR0FBTjtRQUVJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELHFDQUFrQixHQUFsQixVQUFtQixDQUFDO1FBQXBCLGlCQU1DO1FBSkcsK0JBQStCO1FBQy9CLElBQUksV0FBVyxHQUFHLDBCQUFnQixDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUNqRSxLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsQ0FBQyxJQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEdBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0lBRUQsaUNBQWMsR0FBZCxVQUFlLENBQUM7UUFFWixJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQW5CZ0IsUUFBUTtRQUY1QixPQUFPO1FBQ1AsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUNQLFFBQVEsQ0FzQjVCO0lBQUQsZUFBQztDQXRCRCxBQXNCQyxDQXRCcUMsY0FBSSxHQXNCekM7a0JBdEJvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERDVUkgZnJvbSBcIi4vRENVSVwiO1xuaW1wb3J0IFNwcml0ZUZyYW1lQ2FjaGUgZnJvbSBcIi4uL21pc2MvU3ByaXRlRnJhbWVDYWNoZVwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHkscmVxdWlyZUNvbXBvbmVudH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5cbkBjY2NsYXNzXG5AcmVxdWlyZUNvbXBvbmVudChjYy5TcHJpdGUpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEQ1Nwcml0ZSBleHRlbmRzIERDVUkge1xuXG4gICAgc3ByaXRlOmNjLlNwcml0ZTtcbiAgICBvbkxvYWQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5zcHJpdGUgPSB0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgIH1cblxuICAgIHJlZnJlc2hTcHJpdGVGcmFtZSh2KVxuICAgIHtcbiAgICAgICAgLy8gdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSB2O1xuICAgICAgICBsZXQgc3ByaXRlZnJhbWUgPSBTcHJpdGVGcmFtZUNhY2hlLmluc3RhbmNlLmdldFNwcml0ZUZyYW1lKHYpLnRoZW4oc2Y9PntcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gc2Y7XG4gICAgICAgIH0pLmNhdGNoKF89Pntjb25zb2xlLmxvZyhcInJlcXVlc3QgaW1hZ2VVcmwgZXJyb3IgOlwiICsgdil9KVxuICAgIH1cblxuICAgIG9uVmFsdWVDaGFuZ2VkKHYpXG4gICAge1xuICAgICAgICB0aGlzLnJlZnJlc2hTcHJpdGVGcmFtZSh2KTtcbiAgICB9XG4gICBcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19