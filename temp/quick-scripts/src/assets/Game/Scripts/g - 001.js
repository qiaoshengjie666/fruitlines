"use strict";
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