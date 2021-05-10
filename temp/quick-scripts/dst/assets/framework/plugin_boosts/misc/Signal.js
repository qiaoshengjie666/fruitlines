
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/misc/Signal.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxtaXNjXFxTaWduYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBSUksZ0JBQVksQ0FBRSxFQUFDLENBQUU7UUFFYixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtJQUNqQixDQUFDO0lBRUQsb0JBQUcsR0FBSCxVQUFJLFFBQWlCLEVBQUcsTUFBTztRQUUzQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQscUJBQUksR0FBSjs7UUFBSyxZQUFLO2FBQUwsVUFBSyxFQUFMLHFCQUFLLEVBQUwsSUFBSztZQUFMLHVCQUFLOztRQUVOLElBQUksSUFBSSxDQUFDLFFBQVEsRUFDakI7WUFDSSxDQUFBLEtBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQSxDQUFDLElBQUksMkJBQUMsSUFBSSxDQUFDLE1BQU0sR0FBSSxFQUFFLEdBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRUQsbUJBQUUsR0FBRixVQUFHLFFBQWlCLEVBQUMsTUFBTztRQUV4QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQsc0JBQUssR0FBTDtRQUVJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FqQ0EsQUFpQ0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpZ25hbFxue1xuICAgIGNhbGxiYWNrOkZ1bmN0aW9uIDtcbiAgICB0YXJnZXQ6YW55O1xuICAgIGNvbnN0cnVjdG9yKGM/LHQ/KVxuICAgIHtcbiAgICAgICAgdGhpcy5hZGQoYyx0KVxuICAgIH1cblxuICAgIGFkZChjYWxsYmFjazpGdW5jdGlvbiAsIHRhcmdldD8pXG4gICAge1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIH1cblxuICAgIGZpcmUoLi4ucHMpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5jYWxsYmFjaylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjay5jYWxsKHRoaXMudGFyZ2V0LC4uLnBzKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb24oY2FsbGJhY2s6RnVuY3Rpb24sdGFyZ2V0PylcbiAgICB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgfVxuXG4gICAgY2xlYXIoKVxuICAgIHtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IG51bGw7XG4gICAgfVxufSJdfQ==