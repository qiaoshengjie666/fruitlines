
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/hex-lines-game/ds/IntMap.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcaGV4LWxpbmVzLWdhbWVcXGRzXFxJbnRNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7UUFFSSxNQUFDLEdBQUcsRUFBRSxDQUFBO0lBa0JWLENBQUM7SUFqQkcsb0JBQUcsR0FBSCxVQUFJLENBQUMsRUFBRSxDQUFDO1FBQ0osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDakIsQ0FBQztJQUNELG9CQUFHLEdBQUgsVUFBSSxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3BCLENBQUM7SUFDRCx1QkFBTSxHQUFOLFVBQU8sQ0FBQztRQUNKLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUNELHVCQUFNLEdBQU4sVUFBTyxDQUFDO1FBQ0osT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDakUsQ0FBQztJQUNELHFCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2QsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7WUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1RCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDdEIsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQXBCQSxBQW9CQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50TWFwXG57XG4gICAgaCA9IHt9XG4gICAgc2V0KHQsIGUpIHtcbiAgICAgICAgdGhpcy5oW3RdID0gZVxuICAgIH1cbiAgICBnZXQodCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oW3RdXG4gICAgfVxuICAgIGV4aXN0cyh0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmguaGFzT3duUHJvcGVydHkodClcbiAgICB9XG4gICAgcmVtb3ZlKHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaC5oYXNPd25Qcm9wZXJ0eSh0KSA/IChkZWxldGUgdGhpcy5oW3RdLCAhMCkgOiAhMVxuICAgIH1cbiAgICBrZXlzKCkge1xuICAgICAgICB2YXIgdCwgZSA9IFtdO1xuICAgICAgICBmb3IgKHQgaW4gdGhpcy5oKSB0aGlzLmguaGFzT3duUHJvcGVydHkodCkgJiYgZS5wdXNoKDAgfCB0KTtcbiAgICAgICAgcmV0dXJuIGNvbS5pdGVyKGUpXG4gICAgfVxufSJdfQ==