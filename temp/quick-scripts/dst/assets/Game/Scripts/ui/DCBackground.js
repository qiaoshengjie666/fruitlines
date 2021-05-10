
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/DCBackground.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4d867LSTWNEB7LUL3KAjVve', 'DCBackground');
// Game/Scripts/ui/DCBackground.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DCUI_1 = require("../../../framework/plugin_boosts/ui/DCUI");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DCBackground = /** @class */ (function (_super) {
    __extends(DCBackground, _super);
    function DCBackground() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DCBackground.prototype.onLoad = function () {
        this.sprite = this.getComponent(cc.Sprite);
    };
    DCBackground.prototype.start = function () { };
    DCBackground.prototype.onValueChanged = function (v) {
        // let data = UserInfo.getSkinById(v);
        // console.log(data);
        // SpriteFrameCache.instance.getSpriteFrame("Game/Textures/Bgs/"+data.img+".png").then(sf=>this.sprite.spriteFrame = sf);
    };
    DCBackground = __decorate([
        ccclass
    ], DCBackground);
    return DCBackground;
}(DCUI_1.default));
exports.default = DCBackground;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXERDQmFja2dyb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQTREO0FBSXRELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBDLGdDQUFJO0lBQTlDOztJQWdCQSxDQUFDO0lBYkcsNkJBQU0sR0FBTjtRQUVJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELDRCQUFLLEdBQUwsY0FBVSxDQUFDO0lBRVgscUNBQWMsR0FBZCxVQUFlLENBQUM7UUFFWixzQ0FBc0M7UUFDdEMscUJBQXFCO1FBQ3JCLHlIQUF5SDtJQUM3SCxDQUFDO0lBZmdCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FnQmhDO0lBQUQsbUJBQUM7Q0FoQkQsQUFnQkMsQ0FoQnlDLGNBQUksR0FnQjdDO2tCQWhCb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEQ1VJIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9EQ1VJXCI7XG5pbXBvcnQgU3ByaXRlRnJhbWVDYWNoZSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvbWlzYy9TcHJpdGVGcmFtZUNhY2hlXCI7XG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuLi9JbmZvXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRENCYWNrZ3JvdW5kIGV4dGVuZHMgRENVSSB7XG5cbiAgICBzcHJpdGU6Y2MuU3ByaXRlO1xuICAgIG9uTG9hZCgpXG4gICAge1xuICAgICAgICB0aGlzLnNwcml0ZSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgfVxuXG4gICAgc3RhcnQgKCkge31cblxuICAgIG9uVmFsdWVDaGFuZ2VkKHYpXG4gICAge1xuICAgICAgICAvLyBsZXQgZGF0YSA9IFVzZXJJbmZvLmdldFNraW5CeUlkKHYpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgLy8gU3ByaXRlRnJhbWVDYWNoZS5pbnN0YW5jZS5nZXRTcHJpdGVGcmFtZShcIkdhbWUvVGV4dHVyZXMvQmdzL1wiK2RhdGEuaW1nK1wiLnBuZ1wiKS50aGVuKHNmPT50aGlzLnNwcml0ZS5zcHJpdGVGcmFtZSA9IHNmKTtcbiAgICB9XG59Il19