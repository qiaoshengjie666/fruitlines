"use strict";
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