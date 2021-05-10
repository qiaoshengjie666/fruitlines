"use strict";
cc._RF.push(module, '47da3PXgqdE55aSvY0ox9B4', 'BoostsAction');
// framework/plugin_boosts/misc/BoostsAction.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.Shake = exports.V2ChangeAction = exports.ValueChangeAction = void 0;
var ValueChangeAction = /** @class */ (function (_super) {
    __extends(ValueChangeAction, _super);
    function ValueChangeAction(duration, from, to, callback, target) {
        var _this = _super.call(this) || this;
        _this.delta = _this.sub(to, from);
        _this.setDuration(duration);
        _this.callback = callback;
        _this.start = from;
        _this.end = to;
        _this.callbackTarget = target;
        return _this;
    }
    ValueChangeAction.prototype.sub = function (x, y) {
        return (x - y);
    };
    ValueChangeAction.prototype.add = function (x, y) {
        return x + y;
    };
    ValueChangeAction.prototype.mul = function (x, y) {
        return x * y;
    };
    ValueChangeAction.prototype.update = function (dt) {
        dt = this._computeEaseTime(dt);
        var v = this.add(this.start, this.mul(this.delta, dt));
        this.callback.call(this.callbackTarget, v);
    };
    return ValueChangeAction;
}(cc.ActionInterval));
exports.ValueChangeAction = ValueChangeAction;
var V2ChangeAction = /** @class */ (function (_super) {
    __extends(V2ChangeAction, _super);
    function V2ChangeAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    V2ChangeAction.prototype.sub = function (x, y) {
        return x.sub(x, y);
    };
    V2ChangeAction.prototype.add = function (x, y) {
        return x.add(x, y);
    };
    V2ChangeAction.prototype.mul = function (x, y) {
        return x.mul(x, y);
    };
    return V2ChangeAction;
}(ValueChangeAction));
exports.V2ChangeAction = V2ChangeAction;
var Shake = /** @class */ (function (_super) {
    __extends(Shake, _super);
    function Shake() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._initial_x = 0;
        _this._initial_y = 0;
        _this._strength_x = 0;
        _this._strength_y = 0;
        return _this;
    }
    /**
     *  创建抖动动画
     * @param {number} duration     动画持续时长
     * @param {number} strength_x   抖动幅度： x方向
     * @param {number} strength_y   抖动幅度： y方向
     * @returns {Shake}
     */
    Shake.create = function (duration, strength_x, strength_y) {
        var act = new Shake();
        act.initWithDuration(duration, strength_x, strength_y);
        return act;
    };
    Shake.prototype.initWithDuration = function (duration, strength_x, strength_y) {
        cc.ActionInterval.prototype['initWithDuration'].apply(this, arguments);
        this._strength_x = strength_x;
        this._strength_y = strength_y;
        return true;
    };
    Shake.prototype.fgRangeRand = function (min, max) {
        var rnd = Math.random();
        return rnd * (max - min) + min;
    };
    Shake.prototype.update = function (time) {
        var randx = this.fgRangeRand(-this._strength_x, this._strength_x);
        var randy = this.fgRangeRand(-this._strength_y, this._strength_y);
        this.getTarget().setPosition(randx + this._initial_x, randy + this._initial_y);
    };
    Shake.prototype.startWithTarget = function (target) {
        cc.ActionInterval.prototype['startWithTarget'].apply(this, arguments);
        this._initial_x = target.x;
        this._initial_y = target.y;
    };
    Shake.prototype.stop = function () {
        this.getTarget().setPosition(new cc.Vec2(this._initial_x, this._initial_y));
        cc.ActionInterval.prototype['stop'].apply(this);
    };
    return Shake;
}(cc.ActionInterval));
exports.Shake = Shake;

cc._RF.pop();