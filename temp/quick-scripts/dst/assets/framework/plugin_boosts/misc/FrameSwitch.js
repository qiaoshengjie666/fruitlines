
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/misc/FrameSwitch.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '92ea6+rkJ5BQ7Twyd4FI92I', 'FrameSwitch');
// framework/plugin_boosts/misc/FrameSwitch.ts

Object.defineProperty(exports, "__esModule", { value: true });
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
var FrameSwitcher = /** @class */ (function (_super) {
    __extends(FrameSwitcher, _super);
    function FrameSwitcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.frames = [];
        // LIFE-CYCLE CALLBACKS:
        _this.target = null;
        _this._index = 0;
        _this.randomOnLoad = false;
        return _this;
        // update (dt) {}
    }
    FrameSwitcher.prototype.onLoad = function () {
        if (this.target == null)
            this.target = this.getComponent(cc.Sprite);
        if (this.randomOnLoad)
            this.switchRandom();
    };
    FrameSwitcher.prototype.switchRandom = function () {
        //this.index = g.randomInt(0,this.frames.length);
    };
    Object.defineProperty(FrameSwitcher.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (k) {
            this.switch(k);
        },
        enumerable: false,
        configurable: true
    });
    FrameSwitcher.prototype.switch = function (index) {
        var len = this.frames.length;
        var idx = Math.min(Math.max(0, index), len - 1);
        this.target.spriteFrame = this.frames[idx];
        this._index = idx;
    };
    FrameSwitcher.prototype.start = function () {
    };
    __decorate([
        property([cc.SpriteFrame])
    ], FrameSwitcher.prototype, "frames", void 0);
    __decorate([
        property(cc.Sprite)
    ], FrameSwitcher.prototype, "target", void 0);
    __decorate([
        property
    ], FrameSwitcher.prototype, "randomOnLoad", void 0);
    FrameSwitcher = __decorate([
        ccclass
    ], FrameSwitcher);
    return FrameSwitcher;
}(cc.Component));
exports.default = FrameSwitcher;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxtaXNjXFxGcmFtZVN3aXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsb0JBQW9CO0FBQ3BCLGlGQUFpRjtBQUNqRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFFN0YsSUFBQSxLQUF1QyxFQUFFLENBQUMsVUFBVSxFQUFuRCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBQyxnQkFBZ0Isc0JBQWlCLENBQUM7QUFHM0Q7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUFpREM7UUE5Q0csWUFBTSxHQUFvQixFQUFFLENBQUE7UUFDNUIsd0JBQXdCO1FBRXhCLFlBQU0sR0FBYSxJQUFJLENBQUM7UUFFeEIsWUFBTSxHQUFXLENBQUMsQ0FBQTtRQUdsQixrQkFBWSxHQUFXLEtBQUssQ0FBQzs7UUFxQzdCLGlCQUFpQjtJQUNyQixDQUFDO0lBcENHLDhCQUFNLEdBQU47UUFFSSxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSTtZQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLElBQUcsSUFBSSxDQUFDLFlBQVk7WUFDaEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO0lBQzNCLENBQUM7SUFFRCxvQ0FBWSxHQUFaO1FBRUksaURBQWlEO0lBQ3JELENBQUM7SUFFRCxzQkFBSSxnQ0FBSzthQUtUO1lBRUksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFBO1FBQ3RCLENBQUM7YUFSRCxVQUFVLENBQUM7WUFFUCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLENBQUM7OztPQUFBO0lBT0QsOEJBQU0sR0FBTixVQUFPLEtBQUs7UUFFUixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQyxFQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLENBQUM7SUFFRCw2QkFBSyxHQUFMO0lBRUEsQ0FBQztJQTNDRDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztpREFDQztJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNJO0lBS3hCO1FBREMsUUFBUTt1REFDb0I7SUFYWixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBaURqQztJQUFELG9CQUFDO0NBakRELEFBaURDLENBakQwQyxFQUFFLENBQUMsU0FBUyxHQWlEdEQ7a0JBakRvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVjJDaGFuZ2VBY3Rpb24gfSBmcm9tIFwiLi9Cb29zdHNBY3Rpb25cIjtcblxuLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5LHJlcXVpcmVDb21wb25lbnR9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyYW1lU3dpdGNoZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgZnJhbWVzOmNjLlNwcml0ZUZyYW1lW10gPSBbXVxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgdGFyZ2V0OmNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBfaW5kZXggOm51bWJlciA9IDBcblxuICAgIEBwcm9wZXJ0eVxuICAgIHJhbmRvbU9uTG9hZDpib29sZWFuID0gZmFsc2U7XG5cbiAgICBvbkxvYWQoKVxuICAgIHtcbiAgICAgICAgaWYodGhpcy50YXJnZXQgPT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgaWYodGhpcy5yYW5kb21PbkxvYWQpXG4gICAgICAgICAgICB0aGlzLnN3aXRjaFJhbmRvbSgpXG4gICAgfVxuXG4gICAgc3dpdGNoUmFuZG9tKClcbiAgICB7XG4gICAgICAgIC8vdGhpcy5pbmRleCA9IGcucmFuZG9tSW50KDAsdGhpcy5mcmFtZXMubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBzZXQgaW5kZXgoaylcbiAgICB7XG4gICAgICAgIHRoaXMuc3dpdGNoKGspO1xuICAgIH1cblxuICAgIGdldCBpbmRleCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5kZXhcbiAgICB9XG4gICAgXG4gICAgc3dpdGNoKGluZGV4KVxuICAgIHtcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMuZnJhbWVzLmxlbmd0aDtcbiAgICAgICAgbGV0IGlkeCA9IE1hdGgubWluKE1hdGgubWF4KDAsaW5kZXgpLGxlbi0xKTtcbiAgICAgICAgdGhpcy50YXJnZXQuc3ByaXRlRnJhbWUgPSB0aGlzLmZyYW1lc1tpZHhdXG4gICAgICAgIHRoaXMuX2luZGV4ID0gaWR4O1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=