
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/hex-lines-game/GridManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3b45a0/RCtHwJWRliu8sGTN', 'GridManager');
// Game/Scripts/hex-lines-game/GridManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var IntMap_1 = require("./ds/IntMap");
var Game_1 = require("./Game");
var Res_1 = require("./Res");
var GridManager = /** @class */ (function (_super) {
    __extends(GridManager, _super);
    function GridManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._minCol = null;
        return _this;
    }
    GridManager.prototype.addGrid = function (t, e, n) {
        null == this._gridList && (this._gridList = new IntMap_1.default);
        if (!this._gridList.exists(t))
            this._gridList.set(t, new IntMap_1.default);
        this._gridList.get(t).set(e, n);
    };
    GridManager.prototype.init = function (t) {
        this._minCol = t;
    };
    GridManager.prototype.start = function () {
        var t = Game_1.default.instance._rowCount;
        var e = Game_1.default.instance._tileList;
        this._gridList = new IntMap_1.default;
        for (var n = 0; t > n;) {
            for (var i = n++, s = 0, a = (t / 2 >= i ? this._minCol + i : this._minCol - 1 + t - i) - 1; a > s;) {
                var r = s++;
                var o = e[i][r].get_borderPosition();
                var b = e[i][r + 1].get_borderPosition();
                var c = cc.v2((o.x + b.x) / 2, (o.y + b.y) / 2);
                var line = cc.instantiate(Res_1.R.Line46);
                line.setPosition(c);
                line.active = false;
                line.parent = this.node;
                line.zIndex = 109;
                this.addGrid(i + i, r + r + 1, line);
            }
        }
        for (n = 0, i = t / 2 | 0; i > n;)
            for (s = n++, a = t / 2 >= s ? this._minCol + s : this._minCol - 1 + t - s, r = 0; a > r;) {
                o = r++;
                for (var m_1 = 0; 2 > m_1; m_1++) {
                    var h = e[s][o].get_borderPosition();
                    var u = e[s + 1][o + m_1].get_borderPosition();
                    h = cc.v2((h.x + u.x) / 2, (h.y + u.y) / 2);
                    var line = null;
                    if (m_1 == 0) {
                        line = cc.instantiate(Res_1.R.Line37);
                    }
                    else {
                        line = cc.instantiate(Res_1.R.Line19);
                    }
                    line.setPosition(h);
                    line.active = false;
                    line.parent = this.node;
                    line.zIndex = 109;
                    this.addGrid(s + s + 1, o + o + m_1, line);
                }
            }
        for (n = 0, i = t / 2 | 0; i > n;)
            for (s = n++, s = t - s - 1, a = t / 2 >= s ? this._minCol + s : this._minCol - 1 + t - s, r = 0; a > r;) {
                o = r++;
                for (var m = 0; 2 > m; m++) {
                    h = e[s][o].get_borderPosition();
                    u = e[s - 1][o + m].get_borderPosition();
                    h = cc.v2((h.x + u.x) / 2, (h.y + u.y) / 2);
                    var line = null;
                    if (m == 0) {
                        line = cc.instantiate(Res_1.R.Line19);
                    }
                    else {
                        line = cc.instantiate(Res_1.R.Line37);
                    }
                    line.setPosition(h);
                    line.active = false;
                    line.zIndex = 109;
                    line.parent = this.node;
                    this.addGrid(s + s - 1, o + o + m, line);
                }
            }
    };
    GridManager.prototype.setState = function (r, c, r1, c1, b) {
        if (this._gridList.exists(r + r1)) {
            var t = this._gridList.get(r + r1);
            if (t.exists(c + c1)) {
                var node = t.get(c + c1);
                node.active = b;
            }
        }
    };
    return GridManager;
}(cc.Component));
exports.default = GridManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcaGV4LWxpbmVzLWdhbWVcXEdyaWRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBaUM7QUFDakMsK0JBQThCO0FBQzlCLDZCQUEwQjtBQUUxQjtJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQW1HQztRQS9GRyxhQUFPLEdBQUcsSUFBSSxDQUFDOztJQStGbkIsQ0FBQztJQTdGRyw2QkFBTyxHQUFQLFVBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ1gsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZ0JBQU0sQ0FBQyxDQUFBO1FBQ3ZELElBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksZ0JBQU0sQ0FBQyxDQUFBO1FBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVELDBCQUFJLEdBQUosVUFBSyxDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUE7SUFDcEIsQ0FBQztJQUVELDJCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsR0FBRyxjQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQTtRQUNuQyxJQUFJLENBQUMsR0FBRyxjQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQTtRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZ0JBQU0sQ0FBQztRQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUNyQjtZQUNJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxF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QUUsQ0FBQyxDQUFBO1lBQ2xDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQ3BCO2dCQUNJLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO2dCQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUNuQjtTQUNKO0lBQ0wsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FuR0EsQUFtR0MsQ0FuR3dDLEVBQUUsQ0FBQyxTQUFTLEdBbUdwRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbnRNYXAgZnJvbSBcIi4vZHMvSW50TWFwXCI7XG5pbXBvcnQgTGluZUdhbWUgZnJvbSBcIi4vR2FtZVwiO1xuaW1wb3J0IHsgUiB9IGZyb20gXCIuL1Jlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkTWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudFxue1xuICAgIF9ncmlkTGlzdDpJbnRNYXBcblxuICAgIF9taW5Db2wgPSBudWxsO1xuXG4gICAgYWRkR3JpZCh0LCBlLCBuKSB7XG4gICAgICAgIG51bGwgPT0gdGhpcy5fZ3JpZExpc3QgJiYgKHRoaXMuX2dyaWRMaXN0ID0gbmV3IEludE1hcClcbiAgICAgICAgaWYoIXRoaXMuX2dyaWRMaXN0LmV4aXN0cyh0KSlcbiAgICAgICAgICAgIHRoaXMuX2dyaWRMaXN0LnNldCh0LCBuZXcgSW50TWFwKVxuICAgICAgICB0aGlzLl9ncmlkTGlzdC5nZXQodCkuc2V0KGUsIG4pXG4gICAgfVxuXG4gICAgaW5pdCh0KVxuICAgIHtcbiAgICAgICAgdGhpcy5fbWluQ29sID0gdFxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB2YXIgdCA9IExpbmVHYW1lLmluc3RhbmNlLl9yb3dDb3VudFxuICAgICAgICB2YXIgZSA9IExpbmVHYW1lLmluc3RhbmNlLl90aWxlTGlzdFxuICAgICAgICB0aGlzLl9ncmlkTGlzdCA9IG5ldyBJbnRNYXA7XG4gICAgICAgIGZvciAodmFyIG4gPSAwOyB0ID4gbjspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBuKyssIHMgPSAwLCBhID0gKHQgLyAyID49IGkgPyB0aGlzLl9taW5Db2wgKyBpIDogdGhpcy5fbWluQ29sIC0gMSArIHQgLSBpKSAtIDE7IGEgPiBzOykge1xuICAgICAgICAgICAgICAgIHZhciByID0gcysrXG4gICAgICAgICAgICAgICAgdmFyIG8gPSBlW2ldW3JdLmdldF9ib3JkZXJQb3NpdGlvbigpXG4gICAgICAgICAgICAgICAgdmFyIGIgPSBlW2ldW3IgKyAxXS5nZXRfYm9yZGVyUG9zaXRpb24oKVxuICAgICAgICAgICAgICAgIHZhciBjID0gY2MudjIoKG8ueCArIGIueCkgLyAyLChvLnkgKyBiLnkpIC8gMilcbiAgICAgICAgICAgICAgICBsZXQgbGluZSA9IGNjLmluc3RhbnRpYXRlKFIuTGluZTQ2KVxuICAgICAgICAgICAgICAgIGxpbmUuc2V0UG9zaXRpb24oYyk7XG4gICAgICAgICAgICAgICAgbGluZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBsaW5lLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgICAgICBsaW5lLnpJbmRleCA9IDEwOVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkR3JpZChpICsgaSwgciArIHIgKyAxLCBsaW5lKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobiA9IDAsIGkgPSB0IC8gMiB8IDA7IGkgPiBuOylcbiAgICAgICAgICAgIGZvciAocyA9IG4rKywgYSA9IHQgLyAyID49IHMgPyB0aGlzLl9taW5Db2wgKyBzIDogdGhpcy5fbWluQ29sIC0gMSArIHQgLSBzLCByID0gMDsgYSA+IHI7KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG8gPSByICsrXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbSA9IDA7IDIgPiBtO20rKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaCA9IGVbc11bb10uZ2V0X2JvcmRlclBvc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgdmFyIHUgPSBlW3MgKyAxXVtvICsgbV0uZ2V0X2JvcmRlclBvc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgaCA9IGNjLnYyKChoLnggKyB1LngpIC8gMiwgKGgueSArIHUueSkgLyAyKVxuICAgICAgICAgICAgICAgICAgICBsZXQgbGluZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmKG0gPT0gMClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lID0gY2MuaW5zdGFudGlhdGUoUi5MaW5lMzcpXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZSA9IGNjLmluc3RhbnRpYXRlKFIuTGluZTE5KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxpbmUuc2V0UG9zaXRpb24oaCk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgICAgICAgICBsaW5lLnpJbmRleCA9IDEwOVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEdyaWQocyArIHMgKyAxLCBvICsgbyArIG0sIGxpbmUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBmb3IgKG4gPSAwLCBpID0gdCAvIDIgfCAwOyBpID4gbjspXG4gICAgICAgICAgICBmb3IgKHMgPSBuKyssIHMgPSB0IC0gcyAtIDEsIGEgPSB0IC8gMiA+PSBzID8gdGhpcy5fbWluQ29sICsgcyA6IHRoaXMuX21pbkNvbCAtIDEgKyB0IC0gcywgciA9IDA7IGEgPiByOylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvID0gcisrXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbSAgPSAwOyAyID4gbTttKyspIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaCA9IGVbc11bb10uZ2V0X2JvcmRlclBvc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgdSA9IGVbcyAtIDFdW28gKyBtXS5nZXRfYm9yZGVyUG9zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICBoID0gY2MudjIoKGgueCArIHUueCkgLyAyLCAoaC55ICsgdS55KSAvIDIpXG4gICAgICAgICAgICAgICAgICAgIGxldCBsaW5lID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgaWYobSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lID0gY2MuaW5zdGFudGlhdGUoUi5MaW5lMTkpXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lID0gY2MuaW5zdGFudGlhdGUoUi5MaW5lMzcpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGluZS5zZXRQb3NpdGlvbihoKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS56SW5kZXggPSAxMDlcbiAgICAgICAgICAgICAgICAgICAgbGluZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRHcmlkKHMgKyBzIC0gMSwgbyArIG8gKyBtLCBsaW5lKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShyLCBjLCByMSwgYzEsIGIpIHtcbiAgICAgICAgaWYodGhpcy5fZ3JpZExpc3QuZXhpc3RzKHIgKyByMSkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCB0ID0gdGhpcy5fZ3JpZExpc3QuZ2V0KHIgKyByMSlcbiAgICAgICAgICAgIGlmICh0LmV4aXN0cyhjICsgYzEpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCBub2RlID0gdC5nZXQoYyArIGMxKVxuICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iXX0=