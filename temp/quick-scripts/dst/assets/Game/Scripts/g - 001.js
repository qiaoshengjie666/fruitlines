
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/g - 001.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bfe6ayXISRPGJZU9+VRaz62', 'g - 001');
// Game/Scripts/g - 001.ts

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = 'hello';
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.randomInt = function (min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        var val = Math.random() * (max - min);
        return Math.floor(val) + min;
    };
    ;
    NewClass.prototype.getRandomInArray = function (arr) {
        if (arr)
            return arr[g.randomInt(0, arr.length)];
    };
    ;
    NewClass.prototype.randomFloat = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    ;
    NewClass.prototype.isNextDay = function (timeSec) {
        return g.isGreaterDate(new Date(), new Date(timeSec));
    };
    ;
    NewClass.prototype.isGreaterDate = function (now, before) {
        var diff = now.getTime() - before.getTime();
        if (diff > 86400000) // 24*60*60*1000
         {
            return true;
        }
        else {
            if (diff > 0)
                return now.getDate() != before.getDate();
            else
                return false;
        }
    };
    ;
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label", void 0);
    __decorate([
        property
    ], NewClass.prototype, "text", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcZyAtIDAwMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7QUFFNUUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUFrREM7UUEvQ0csV0FBSyxHQUFhLElBQUksQ0FBQztRQUd2QixVQUFJLEdBQVcsT0FBTyxDQUFDOztRQTJDdkIsaUJBQWlCO0lBQ3JCLENBQUM7SUExQ0csd0JBQXdCO0lBRXhCLGVBQWU7SUFFZix3QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELDRCQUFTLEdBQVQsVUFBVSxHQUFVLEVBQUUsR0FBVTtRQUM1QixJQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUFDO1FBQ3JDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN0QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ2pDLENBQUM7SUFBQSxDQUFDO0lBQ0gsbUNBQWdCLEdBQWhCLFVBQWtCLEdBQVk7UUFFekIsSUFBRyxHQUFHO1lBQ0YsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDN0MsQ0FBQztJQUFBLENBQUM7SUFFRiw4QkFBVyxHQUFYLFVBQWEsR0FBVSxFQUFDLEdBQVU7UUFFOUIsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQzdDLENBQUM7SUFBQSxDQUFDO0lBRUYsNEJBQVMsR0FBVCxVQUFVLE9BQU87UUFFYixPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQ3hELENBQUM7SUFBQSxDQUFDO0lBQ0YsZ0NBQWEsR0FBYixVQUFjLEdBQUcsRUFBQyxNQUFNO1FBRXBCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDM0MsSUFBRyxJQUFJLEdBQUcsUUFBUSxFQUFFLGdCQUFnQjtTQUNwQztZQUNJLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7YUFBSTtZQUNELElBQUksSUFBSSxHQUFHLENBQUM7Z0JBQ1IsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBOztnQkFFeEMsT0FBTyxLQUFLLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQTdDRjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzJDQUNJO0lBR3ZCO1FBREMsUUFBUTswQ0FDYztJQU5OLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FrRDVCO0lBQUQsZUFBQztDQWxERCxBQWtEQyxDQWxEcUMsRUFBRSxDQUFDLFNBQVMsR0FrRGpEO2tCQWxEb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3Q2xhc3MgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICB0ZXh0OiBzdHJpbmcgPSAnaGVsbG8nO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9XHJcbiAgXHJcbiAgICByYW5kb21JbnQobWluOm51bWJlciwgbWF4Om51bWJlcikge1xyXG4gICAgICAgIGlmKG1heCA9PSBudWxsKSB7bWF4ID0gbWluOyBtaW4gPSAwO31cclxuICAgICAgICB2YXIgdmFsID0gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHZhbCkgKyBtaW47XHJcbiAgICB9O1xyXG4gICBnZXRSYW5kb21JbkFycmF5IChhcnI6bnVtYmVyW10pXHJcbiAgICB7XHJcbiAgICAgICAgaWYoYXJyKVxyXG4gICAgICAgICAgICByZXR1cm4gYXJyW2cucmFuZG9tSW50KDAsYXJyLmxlbmd0aCldXHJcbiAgICB9O1xyXG5cclxuICAgIHJhbmRvbUZsb2F0IChtaW46bnVtYmVyLG1heDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcclxuICAgIH07XHJcblxyXG4gICAgaXNOZXh0RGF5KHRpbWVTZWMpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGcuaXNHcmVhdGVyRGF0ZShuZXcgRGF0ZSgpLG5ldyBEYXRlKHRpbWVTZWMpKVxyXG4gICAgfTtcclxuICAgIGlzR3JlYXRlckRhdGUobm93LGJlZm9yZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgZGlmZiA9IG5vdy5nZXRUaW1lKCkgLSBiZWZvcmUuZ2V0VGltZSgpIFxyXG4gICAgICAgIGlmKGRpZmYgPiA4NjQwMDAwMCkgLy8gMjQqNjAqNjAqMTAwMFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmIChkaWZmID4gMCApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm93LmdldERhdGUoKSAhPSBiZWZvcmUuZ2V0RGF0ZSgpXHJcbiAgICAgICAgICAgIGVsc2UgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==