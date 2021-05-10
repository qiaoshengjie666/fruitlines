"use strict";
cc._RF.push(module, '11eeadKZERHbLgjtZ/2KsFr', 'IntMap');
// Game/Scripts/hex-lines-game/ds/IntMap.ts

Object.defineProperty(exports, "__esModule", { value: true });
var IntMap = /** @class */ (function () {
    function IntMap() {
        this.h = {};
    }
    IntMap.prototype.set = function (t, e) {
        this.h[t] = e;
    };
    IntMap.prototype.get = function (t) {
        return this.h[t];
    };
    IntMap.prototype.exists = function (t) {
        return this.h.hasOwnProperty(t);
    };
    IntMap.prototype.remove = function (t) {
        return this.h.hasOwnProperty(t) ? (delete this.h[t], !0) : !1;
    };
    IntMap.prototype.keys = function () {
        var t, e = [];
        for (t in this.h)
            this.h.hasOwnProperty(t) && e.push(0 | t);
        return com.iter(e);
    };
    return IntMap;
}());
exports.default = IntMap;

cc._RF.pop();