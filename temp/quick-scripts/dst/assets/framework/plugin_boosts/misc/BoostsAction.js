
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/misc/BoostsAction.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxtaXNjXFxCb29zdHNBY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtJQUF1QyxxQ0FBaUI7SUF3QnBELDJCQUFZLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxNQUFPO1FBQTdDLFlBRUksaUJBQU8sU0FPVjtRQU5HLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUcsSUFBSSxDQUFDLENBQUM7UUFDakMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQixLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixLQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLEtBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDOztJQUNqQyxDQUFDO0lBeEJELCtCQUFHLEdBQUgsVUFBSSxDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sQ0FBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELCtCQUFHLEdBQUgsVUFBSSxDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxHQUFFLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsK0JBQUcsR0FBSCxVQUFJLENBQUMsRUFBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEdBQUMsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQVlELGtDQUFNLEdBQU4sVUFBTyxFQUFFO1FBRUwsRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FB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QUFVLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVNLG9CQUFJLEdBQVg7UUFFSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBRTNFLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQ0wsWUFBQztBQUFELENBeERBLEFBd0RDLENBeEQyQixFQUFFLENBQUMsY0FBYyxHQXdENUM7QUF4RGEsc0JBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcblxuZXhwb3J0IGNsYXNzIFZhbHVlQ2hhbmdlQWN0aW9uIGV4dGVuZHMgY2MuQWN0aW9uSW50ZXJ2YWxcbntcbiAgICBbeDogc3RyaW5nXTogYW55O1xuICAgIHN0YXJ0OmFueTtcbiAgICBlbmQ6YW55O1xuICAgIGRlbHRhOmFueTtcbiAgICBjYWxsYmFjazpGdW5jdGlvbjtcbiAgICBjYWxsYmFja1RhcmdldCA6YW55O1xuXG4gICAgc3ViKHgseSlcbiAgICB7XG4gICAgICAgIHJldHVybiAoIHggLSB5KTtcbiAgICB9XG5cbiAgICBhZGQoeCx5KVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHggK3k7XG4gICAgfVxuXG4gICAgbXVsKHgseSlcbiAgICB7XG4gICAgICAgIHJldHVybiB4Knk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoZHVyYXRpb24sZnJvbSx0byxjYWxsYmFjayx0YXJnZXQ/KVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5kZWx0YSA9IHRoaXMuc3ViKHRvICwgZnJvbSk7XG4gICAgICAgIHRoaXMuc2V0RHVyYXRpb24oZHVyYXRpb24pO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBmcm9tO1xuICAgICAgICB0aGlzLmVuZCA9IHRvO1xuICAgICAgICB0aGlzLmNhbGxiYWNrVGFyZ2V0ID0gdGFyZ2V0O1xuICAgIH1cbiAgICB1cGRhdGUoZHQpXG4gICAge1xuICAgICAgICBkdCA9IHRoaXMuX2NvbXB1dGVFYXNlVGltZShkdCk7XG4gICAgICAgIGxldCB2ID0gdGhpcy5hZGQodGhpcy5zdGFydCx0aGlzLm11bCh0aGlzLmRlbHRhLGR0KSlcbiAgICAgICAgdGhpcy5jYWxsYmFjay5jYWxsKHRoaXMuY2FsbGJhY2tUYXJnZXQsdik7XG4gICAgfVxuICAgXG59XG5cblxuZXhwb3J0IGNsYXNzIFYyQ2hhbmdlQWN0aW9uIGV4dGVuZHMgVmFsdWVDaGFuZ2VBY3Rpb25cbntcbiAgICBzdWIoeCx5KVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHguc3ViKHgseSlcbiAgICB9XG5cbiAgICBhZGQoeCx5KVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHguYWRkKHgseSlcbiAgICB9XG5cbiAgICBtdWwoeCx5KVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHgubXVsKHgseSlcbiAgICB9XG59XG5cblxuZXhwb3J0ICBjbGFzcyBTaGFrZSBleHRlbmRzIGNjLkFjdGlvbkludGVydmFsXG57XG4gXG4gICAgcHJpdmF0ZSBfaW5pdGlhbF94Om51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfaW5pdGlhbF95Om51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfc3RyZW5ndGhfeDpudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3N0cmVuZ3RoX3k6bnVtYmVyID0gMDtcbiBcbiAgICAvKipcbiAgICAgKiAg5Yib5bu65oqW5Yqo5Yqo55S7XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uICAgICDliqjnlLvmjIHnu63ml7bplb9cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RyZW5ndGhfeCAgIOaKluWKqOW5heW6pu+8miB45pa55ZCRXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0cmVuZ3RoX3kgICDmipbliqjluYXluqbvvJogeeaWueWQkVxuICAgICAqIEByZXR1cm5zIHtTaGFrZX1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShkdXJhdGlvbjpudW1iZXIsc3RyZW5ndGhfeDpudW1iZXIsc3RyZW5ndGhfeTpudW1iZXIpOlNoYWtlXG4gICAge1xuICAgICAgICBsZXQgYWN0OlNoYWtlID0gbmV3IFNoYWtlKCk7XG4gICAgICAgIGFjdC5pbml0V2l0aER1cmF0aW9uKCBkdXJhdGlvbixzdHJlbmd0aF94LHN0cmVuZ3RoX3kgKTtcbiAgICAgICAgcmV0dXJuIGFjdDtcbiAgICB9XG4gXG4gICAgcHVibGljIGluaXRXaXRoRHVyYXRpb24oZHVyYXRpb246bnVtYmVyLHN0cmVuZ3RoX3g6bnVtYmVyLHN0cmVuZ3RoX3k6bnVtYmVyKTpib29sZWFuXG4gICAge1xuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGVbJ2luaXRXaXRoRHVyYXRpb24nXS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuX3N0cmVuZ3RoX3ggPSBzdHJlbmd0aF94O1xuICAgICAgICB0aGlzLl9zdHJlbmd0aF95ID0gc3RyZW5ndGhfeTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuIFxuICAgIHB1YmxpYyBmZ1JhbmdlUmFuZChtaW46bnVtYmVyLG1heDpudW1iZXIpOm51bWJlclxuICAgIHtcbiAgICAgICAgbGV0IHJuZDpudW1iZXIgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICByZXR1cm4gcm5kICogKG1heCAtIG1pbikgKyBtaW47XG4gICAgfVxuIFxuICAgIHB1YmxpYyB1cGRhdGUodGltZTpudW1iZXIpOnZvaWRcbiAgICB7XG4gICAgICAgIGxldCByYW5keCA9IHRoaXMuZmdSYW5nZVJhbmQoLXRoaXMuX3N0cmVuZ3RoX3gsdGhpcy5fc3RyZW5ndGhfeCk7XG4gICAgICAgIGxldCByYW5keSA9IHRoaXMuZmdSYW5nZVJhbmQoLXRoaXMuX3N0cmVuZ3RoX3ksdGhpcy5fc3RyZW5ndGhfeSk7XG4gICAgICAgIHRoaXMuZ2V0VGFyZ2V0KCkuc2V0UG9zaXRpb24ocmFuZHggKyB0aGlzLl9pbml0aWFsX3gscmFuZHkgKyB0aGlzLl9pbml0aWFsX3kpO1xuICAgIH1cbiBcbiAgICBwdWJsaWMgc3RhcnRXaXRoVGFyZ2V0KHRhcmdldDpjYy5Ob2RlKTp2b2lkXG4gICAge1xuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGVbJ3N0YXJ0V2l0aFRhcmdldCddLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5faW5pdGlhbF94ID0gdGFyZ2V0Lng7XG4gICAgICAgIHRoaXMuX2luaXRpYWxfeSA9IHRhcmdldC55O1xuICAgIH1cbiBcbiAgICBwdWJsaWMgc3RvcCgpOnZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZ2V0VGFyZ2V0KCkuc2V0UG9zaXRpb24obmV3IGNjLlZlYzIodGhpcy5faW5pdGlhbF94LHRoaXMuX2luaXRpYWxfeSkpO1xuIFxuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGVbJ3N0b3AnXS5hcHBseSh0aGlzKTtcbiAgICB9XG59XG4iXX0=