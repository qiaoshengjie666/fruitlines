
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/hex-lines-game/Animal.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ba634us93lPYrBZpOaL4ofo', 'Animal');
// Game/Scripts/hex-lines-game/Animal.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Animal = /** @class */ (function (_super) {
    __extends(Animal, _super);
    function Animal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprite = null;
        _this.animation = null;
        return _this;
    }
    Animal.prototype.onLoad = function () {
        this.animation = this.getComponentInChildren(cc.Animation);
        this.animation.on("finished", this.onFinish, this);
    };
    Animal.prototype.onFinish = function (s, a) {
        if (a.clip.name == "animal_jump") {
            this.animation.play("animal_idle");
        }
    };
    Animal.prototype.start = function () {
        this.animation.play("animal_idle");
    };
    Animal.prototype.connected = function () {
        var state = this.animation.play("animal_jump");
        state.wrapMode = cc.WrapMode.Normal;
    };
    Animal.prototype._loopJump = function () {
        var state = this.animation.play("animal_jump");
        state.wrapMode = cc.WrapMode.Loop;
    };
    Animal.prototype.loopJump = function (d) {
        this.scheduleOnce(this._loopJump, this.randomFloat(0, d));
    };
    Animal.prototype.randomFloat = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    ;
    __decorate([
        property(cc.Sprite)
    ], Animal.prototype, "sprite", void 0);
    Animal = __decorate([
        ccclass
    ], Animal);
    return Animal;
}(cc.Component));
exports.default = Animal;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcaGV4LWxpbmVzLWdhbWVcXEFuaW1hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBRU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQVk7SUFBaEQ7UUFBQSxxRUE2Q0M7UUExQ0csWUFBTSxHQUFhLElBQUksQ0FBQztRQUd4QixlQUFTLEdBQWdCLElBQUksQ0FBQzs7SUF1Q2xDLENBQUM7SUFyQ0csdUJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBRUQseUJBQVEsR0FBUixVQUFTLENBQUMsRUFBQyxDQUFtQjtRQUUxQixJQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLGFBQWEsRUFDL0I7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtTQUNyQztJQUNMLENBQUM7SUFFRCxzQkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELDBCQUFTLEdBQVQ7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvQyxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ3hDLENBQUM7SUFFRCwwQkFBUyxHQUFUO1FBRUksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDOUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUN0QyxDQUFDO0lBRUQseUJBQVEsR0FBUixVQUFTLENBQUM7UUFFTixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUM1RCxDQUFDO0lBRUQsNEJBQVcsR0FBWCxVQUFhLEdBQVUsRUFBQyxHQUFVO1FBRTlCLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUM3QyxDQUFDO0lBQUEsQ0FBQztJQXpDRjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzBDQUNJO0lBSFAsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQTZDMUI7SUFBRCxhQUFDO0NBN0NELEFBNkNDLENBN0NtQyxFQUFFLENBQUMsU0FBUyxHQTZDL0M7a0JBN0NvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUiB9IGZyb20gXCIuL1Jlc1wiO1xuaW1wb3J0IEcgZnJvbVwiLi4vZyAtIDAwMVwiO1xuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbmltYWwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBzcHJpdGU6Y2MuU3ByaXRlID0gbnVsbDtcblxuXG4gICAgYW5pbWF0aW9uOmNjLkFuaW1hdGlvbiA9IG51bGw7XG4gICAgXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24ub24oXCJmaW5pc2hlZFwiLCB0aGlzLm9uRmluaXNoLHRoaXMpXG4gICAgfVxuXG4gICAgb25GaW5pc2gocyxhOmNjLkFuaW1hdGlvblN0YXRlKVxuICAgIHtcbiAgICAgICAgaWYoYS5jbGlwLm5hbWUgPT0gXCJhbmltYWxfanVtcFwiKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5wbGF5KFwiYW5pbWFsX2lkbGVcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheShcImFuaW1hbF9pZGxlXCIpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZCgpIHtcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5hbmltYXRpb24ucGxheShcImFuaW1hbF9qdW1wXCIpO1xuICAgICAgICBzdGF0ZS53cmFwTW9kZSA9IGNjLldyYXBNb2RlLk5vcm1hbDtcbiAgICB9XG5cbiAgICBfbG9vcEp1bXAoKVxuICAgIHtcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5hbmltYXRpb24ucGxheShcImFuaW1hbF9qdW1wXCIpXG4gICAgICAgIHN0YXRlLndyYXBNb2RlID0gY2MuV3JhcE1vZGUuTG9vcDtcbiAgICB9XG5cbiAgICBsb29wSnVtcChkKVxuICAgIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5fbG9vcEp1bXAsIHRoaXMucmFuZG9tRmxvYXQoMCxkKSlcbiAgICB9XG5cbiAgICByYW5kb21GbG9hdCAobWluOm51bWJlcixtYXg6bnVtYmVyKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcbiAgICB9O1xufSJdfQ==