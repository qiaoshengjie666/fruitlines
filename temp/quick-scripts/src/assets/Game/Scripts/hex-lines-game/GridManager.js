"use strict";
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