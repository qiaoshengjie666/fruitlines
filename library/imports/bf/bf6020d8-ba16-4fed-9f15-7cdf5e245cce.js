"use strict";
cc._RF.push(module, 'bf602DYuhZP7Z8VfN9eJFzO', 'Signal');
// framework/plugin_boosts/misc/Signal.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Signal = /** @class */ (function () {
    function Signal(c, t) {
        this.add(c, t);
    }
    Signal.prototype.add = function (callback, target) {
        this.callback = callback;
        this.target = target;
    };
    Signal.prototype.fire = function () {
        var _a;
        var ps = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ps[_i] = arguments[_i];
        }
        if (this.callback) {
            (_a = this.callback).call.apply(_a, __spreadArrays([this.target], ps));
        }
    };
    Signal.prototype.on = function (callback, target) {
        this.callback = callback;
        this.target = target;
    };
    Signal.prototype.clear = function () {
        this.callback = null;
    };
    return Signal;
}());
exports.default = Signal;

cc._RF.pop();