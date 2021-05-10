"use strict";
cc._RF.push(module, '64d50rBFZhG5qLba7sOg6x9', 'HexonTile');
// Game/Scripts/hex-lines-game/HexonTile.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Consts_1 = require("./Consts");
var Game_1 = require("./Game");
var Res_1 = require("./Res");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TileType;
(function (TileType) {
    TileType[TileType["Empty"] = 0] = "Empty";
    TileType[TileType["Type1"] = 1] = "Type1";
    TileType[TileType["Type2"] = 2] = "Type2";
    TileType[TileType["Type3"] = 3] = "Type3";
    TileType[TileType["Type4"] = 4] = "Type4";
    TileType[TileType["Type5"] = 5] = "Type5";
    TileType[TileType["Type6"] = 6] = "Type6";
    TileType[TileType["Type7"] = 7] = "Type7";
})(TileType || (TileType = {}));
var HexonTile = /** @class */ (function (_super) {
    __extends(HexonTile, _super);
    function HexonTile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._col = 0;
        _this._row = 0;
        _this._animal = 0;
        _this.isChangable = true;
        _this._isConnecting = false;
        _this.connectedTile = null;
        _this.reverseConnectedTile = null;
        _this.targetTile = null;
        _this._sprite = null;
        _this._baseSprite = null;
        _this.animalSprite = null;
        _this._tileType = 0;
        return _this;
        // update (dt) {}
    }
    HexonTile.prototype.get_col = function () {
        return this._col;
    };
    HexonTile.prototype.set_col = function (t) {
        return this._col = t,
            t = this._col - (this._row <= Game_1.default.instance._rowCount / 2 ? Game_1.default.instance.get_minCol() + this._row : Game_1.default.instance.get_minCol() - 1 + Game_1.default.instance._rowCount - this._row) / 2 + .5,
            this._baseSprite.node.x = (Consts_1.default.CenterX + t * Consts_1.default.ColSize),
            this._col;
    };
    HexonTile.prototype.get_row = function () {
        return this._row;
    };
    HexonTile.prototype.set_row = function (t) {
        this._row = t;
        this._baseSprite.node.y = (Consts_1.default.CenterY + (this._row - (Game_1.default.instance._rowCount / 2 | 0)) * Consts_1.default.RowSize);
        return this._row;
    };
    HexonTile.prototype.get_borderPosition = function () {
        return this._baseSprite.node.position;
        // return cc.v2(this._baseSprite.node.x._value, this._baseSprite.node.y._value)
    };
    HexonTile.prototype.get_isConnecting = function () {
        return this._isConnecting;
    };
    HexonTile.prototype.set_isConnecting = function (t) {
        return this._isConnecting = t, this.set_tileType(this._tileType), this._isConnecting;
    };
    HexonTile.prototype.get_animal = function () {
        return this._animal;
    };
    HexonTile.prototype.set_animal = function (t) {
        switch (this._animal = t, t) {
            case 1:
                this.set_tileType(TileType.Type1);
                break;
            case 2:
                this.set_tileType(TileType.Type2);
                break;
            case 3:
                this.set_tileType(TileType.Type3);
                break;
            case 4:
                this.set_tileType(TileType.Type4);
                break;
            case 5:
                this.set_tileType(TileType.Type5);
                break;
            case 6:
                this.set_tileType(TileType.Type6);
                break;
            case 7:
                this.set_tileType(TileType.Type7);
                break;
            default:
                this.set_tileType(TileType.Empty);
        }
        return this._animal;
    };
    HexonTile.prototype.getTileTexture = function (t, e, n) {
        if (t == 0) {
            return Res_1.R.tileTextures[0];
        }
        else {
            // return e ? R.tileTextures[t] : 1 == n ? R.tileTextures[14 + t] : R.tileTextures[7 + t]
            var idx = 0;
            if (e) {
                idx = t;
            }
            else {
                if (n) {
                    idx = 14 + t;
                }
                else {
                    idx = 7 + t;
                }
            }
            return Res_1.R.tileTextures[idx];
        }
    };
    HexonTile.prototype.set_tileType = function (t) {
        this._tileType = t;
        // if (null == this._baseSprite )
        // {
        //     // this._baseSprite = new Y
        //     // this._baseSprite.setAnchor(42, 42)
        //     // this.owner.add(this._baseSprite)
        // }
        // if (null == this._sprite )
        // {
        //     // this._sprite = new J(jn.Instance.getTileTexture(this.get_animal(), !1, !1))
        //     // this.owner.addChild((new g).add(this._sprite))
        // } 
        if (this.isChangable && this.get_isConnecting()) {
            this._baseSprite.spriteFrame = this.getTileTexture(this.get_animal(), true, false);
        }
        else {
            var tailTile = this.getTail();
            var sp = void 0;
            if (!this.isChangable && null != this.reverseConnectedTile) {
                sp = this.getTileTexture(this.get_animal(), false, true);
            }
            else {
                if (null == tailTile || tailTile.isChangable) {
                    sp = this.getTileTexture(this.get_animal(), false, false);
                }
                else {
                    sp = this.getTileTexture(this.get_animal(), false, true);
                }
            }
            this._baseSprite.spriteFrame = sp;
        }
        return this._tileType;
    };
    HexonTile.prototype.onAdded = function () {
        this.set_tileType(TileType.Empty);
    };
    HexonTile.prototype.connect = function (t) {
        null == t ? null != this.connectedTile && (1 == this.connectedTile.isChangable && this.connectedTile.set_animal(0), this.connectedTile.connect(null), this.connectedTile = this.connectedTile.reverseConnectedTile = null) : (this.connectedTile = t, t.set_animal(this.get_animal()), t.reverseConnectedTile = this);
    };
    HexonTile.prototype.getTail = function () {
        for (var t = this.connectedTile, e = null; null != t;)
            e = t, t = t.connectedTile;
        return e;
    };
    HexonTile.prototype.getHead = function () {
        for (var t = this.reverseConnectedTile, e = null; null != t;)
            e = t, t = t.reverseConnectedTile;
        return e;
    };
    HexonTile.prototype.equals = function (t) {
        return null == t ? !1 : this.get_row() == t.get_row() && this.get_col() == t.get_col();
    };
    HexonTile.prototype.start = function () {
    };
    __decorate([
        property({ type: cc.Sprite, visible: true, displayName: "Animal Sprite" })
    ], HexonTile.prototype, "_sprite", void 0);
    __decorate([
        property({ type: cc.Sprite, visible: true, displayName: "Base Sprite" })
    ], HexonTile.prototype, "_baseSprite", void 0);
    HexonTile = __decorate([
        ccclass
    ], HexonTile);
    return HexonTile;
}(cc.Component));
exports.default = HexonTile;

cc._RF.pop();