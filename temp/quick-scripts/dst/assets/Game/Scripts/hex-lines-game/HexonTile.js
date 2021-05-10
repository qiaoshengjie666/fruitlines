
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/hex-lines-game/HexonTile.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcaGV4LWxpbmVzLWdhbWVcXEhleG9uVGlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQThCO0FBQzlCLCtCQUE4QjtBQUM5Qiw2QkFBMEI7QUFFcEIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsSUFBSyxRQVVKO0FBVkQsV0FBSyxRQUFRO0lBRVQseUNBQUssQ0FBQTtJQUNMLHlDQUFLLENBQUE7SUFDTCx5Q0FBSyxDQUFBO0lBQ0wseUNBQUssQ0FBQTtJQUNMLHlDQUFLLENBQUE7SUFDTCx5Q0FBSyxDQUFBO0lBQ0wseUNBQUssQ0FBQTtJQUNMLHlDQUFLLENBQUE7QUFDVCxDQUFDLEVBVkksUUFBUSxLQUFSLFFBQVEsUUFVWjtBQUlEO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBa0tDO1FBaktHLFVBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsVUFBSSxHQUFVLENBQUMsQ0FBQztRQUNoQixhQUFPLEdBQVUsQ0FBQyxDQUFDO1FBQ25CLGlCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLG1CQUFhLEdBQUcsS0FBSyxDQUFDO1FBRXRCLG1CQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLDBCQUFvQixHQUFHLElBQUksQ0FBQztRQUM1QixnQkFBVSxHQUFHLElBQUksQ0FBQztRQUdsQixhQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLGlCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRW5CLGtCQUFZLEdBQUcsSUFBSSxDQUFDO1FBR3BCLGVBQVMsR0FBRyxDQUFDLENBQUM7O1FBNklkLGlCQUFpQjtJQUNyQixDQUFDO0lBNUlHLDJCQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDcEIsQ0FBQztJQUNELDJCQUFPLEdBQVAsVUFBUSxDQUFDO1FBQ0wsT0FBTyxJQUFJLENB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QUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQyxDQUFDO2tEQUMvQztJQWZGLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0FrSzdCO0lBQUQsZ0JBQUM7Q0FsS0QsQUFrS0MsQ0FsS3NDLEVBQUUsQ0FBQyxTQUFTLEdBa0tsRDtrQkFsS29CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29uc3RzIGZyb20gXCIuL0NvbnN0c1wiO1xuaW1wb3J0IExpbmVHYW1lIGZyb20gXCIuL0dhbWVcIjtcbmltcG9ydCB7IFIgfSBmcm9tIFwiLi9SZXNcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbmVudW0gVGlsZVR5cGVcbntcbiAgICBFbXB0eSxcbiAgICBUeXBlMSxcbiAgICBUeXBlMixcbiAgICBUeXBlMyxcbiAgICBUeXBlNCxcbiAgICBUeXBlNSxcbiAgICBUeXBlNixcbiAgICBUeXBlN1xufVxuXG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXhvblRpbGUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIF9jb2w6IG51bWJlciA9IDA7XG4gICAgX3JvdzpudW1iZXIgPSAwO1xuICAgIF9hbmltYWw6bnVtYmVyID0gMDtcbiAgICBpc0NoYW5nYWJsZSA9IHRydWU7XG4gICAgX2lzQ29ubmVjdGluZyA9IGZhbHNlO1xuICAgIFxuICAgIGNvbm5lY3RlZFRpbGUgPSBudWxsO1xuICAgIHJldmVyc2VDb25uZWN0ZWRUaWxlID0gbnVsbDtcbiAgICB0YXJnZXRUaWxlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5TcHJpdGUsdmlzaWJsZTp0cnVlLGRpc3BsYXlOYW1lOlwiQW5pbWFsIFNwcml0ZVwifSlcbiAgICBfc3ByaXRlOmNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuU3ByaXRlLHZpc2libGU6dHJ1ZSxkaXNwbGF5TmFtZTpcIkJhc2UgU3ByaXRlXCJ9KVxuICAgIF9iYXNlU3ByaXRlID0gbnVsbDtcblxuICAgIGFuaW1hbFNwcml0ZSA9IG51bGw7XG5cblxuICAgIF90aWxlVHlwZSA9IDA7XG5cbiAgICBnZXRfY29sKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sXG4gICAgfVxuICAgIHNldF9jb2wodCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sID0gdCxcbiAgICAgICAgICAgIHQgPSB0aGlzLl9jb2wgLSAodGhpcy5fcm93IDw9IExpbmVHYW1lLmluc3RhbmNlLl9yb3dDb3VudCAvIDIgPyBMaW5lR2FtZS5pbnN0YW5jZS5nZXRfbWluQ29sKCkgKyB0aGlzLl9yb3c6IExpbmVHYW1lLmluc3RhbmNlLmdldF9taW5Db2woKSAtIDEgKyBMaW5lR2FtZS5pbnN0YW5jZS5fcm93Q291bnQgLSB0aGlzLl9yb3cpIC8gMiArIC41LFxuICAgICAgICAgICAgdGhpcy5fYmFzZVNwcml0ZS5ub2RlLnggPSAoQ29uc3RzLkNlbnRlclggKyB0ICogQ29uc3RzLkNvbFNpemUpLFxuICAgICAgICAgICAgdGhpcy5fY29sXG4gICAgfVxuICAgIGdldF9yb3coKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3dcbiAgICB9XG4gICAgc2V0X3Jvdyh0KSB7XG4gICAgICAgIHRoaXMuX3JvdyA9IHRcbiAgICAgICAgdGhpcy5fYmFzZVNwcml0ZS5ub2RlLnkgPSAoQ29uc3RzLkNlbnRlclkgKyAodGhpcy5fcm93IC0gKExpbmVHYW1lLmluc3RhbmNlLl9yb3dDb3VudCAvIDIgfCAwKSkgKiBDb25zdHMuUm93U2l6ZSlcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvd1xuICAgIH1cbiAgICBnZXRfYm9yZGVyUG9zaXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iYXNlU3ByaXRlLm5vZGUucG9zaXRpb25cbiAgICAgICAgLy8gcmV0dXJuIGNjLnYyKHRoaXMuX2Jhc2VTcHJpdGUubm9kZS54Ll92YWx1ZSwgdGhpcy5fYmFzZVNwcml0ZS5ub2RlLnkuX3ZhbHVlKVxuICAgIH1cbiAgICBnZXRfaXNDb25uZWN0aW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNDb25uZWN0aW5nXG4gICAgfVxuICAgIHNldF9pc0Nvbm5lY3RpbmcodCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNDb25uZWN0aW5nID0gdCwgdGhpcy5zZXRfdGlsZVR5cGUodGhpcy5fdGlsZVR5cGUpLCB0aGlzLl9pc0Nvbm5lY3RpbmdcbiAgICB9XG4gICAgZ2V0X2FuaW1hbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuaW1hbFxuICAgIH1cbiAgICBzZXRfYW5pbWFsKHQpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9hbmltYWwgPSB0LCB0KSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRfdGlsZVR5cGUoVGlsZVR5cGUuVHlwZTEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0X3RpbGVUeXBlKFRpbGVUeXBlLlR5cGUyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldF90aWxlVHlwZShUaWxlVHlwZS5UeXBlMyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRfdGlsZVR5cGUoVGlsZVR5cGUuVHlwZTQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0X3RpbGVUeXBlKFRpbGVUeXBlLlR5cGU1KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICB0aGlzLnNldF90aWxlVHlwZShUaWxlVHlwZS5UeXBlNik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRfdGlsZVR5cGUoVGlsZVR5cGUuVHlwZTcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLnNldF90aWxlVHlwZShUaWxlVHlwZS5FbXB0eSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fYW5pbWFsXG4gICAgfVxuICAgIFxuICAgIGdldFRpbGVUZXh0dXJlKHQsIGUsIG4pIHtcbiAgICAgICAgaWYodCA9PSAwIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIFIudGlsZVRleHR1cmVzWzBdXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy8gcmV0dXJuIGUgPyBSLnRpbGVUZXh0dXJlc1t0XSA6IDEgPT0gbiA/IFIudGlsZVRleHR1cmVzWzE0ICsgdF0gOiBSLnRpbGVUZXh0dXJlc1s3ICsgdF1cbiAgICAgICAgICAgIGxldCBpZHggPSAwXG4gICAgICAgICAgICBpZihlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkeCA9IHRcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmIChuKXtcbiAgICAgICAgICAgICAgICAgICAgaWR4ID0gMTQgK3QgXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGlkeCA9IDcgKyB0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBSLnRpbGVUZXh0dXJlc1tpZHhdO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzZXRfdGlsZVR5cGUodDpudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdGlsZVR5cGUgPSB0XG4gICAgICAgIC8vIGlmIChudWxsID09IHRoaXMuX2Jhc2VTcHJpdGUgKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICAvLyB0aGlzLl9iYXNlU3ByaXRlID0gbmV3IFlcbiAgICAgICAgLy8gICAgIC8vIHRoaXMuX2Jhc2VTcHJpdGUuc2V0QW5jaG9yKDQyLCA0MilcbiAgICAgICAgLy8gICAgIC8vIHRoaXMub3duZXIuYWRkKHRoaXMuX2Jhc2VTcHJpdGUpXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gaWYgKG51bGwgPT0gdGhpcy5fc3ByaXRlIClcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgLy8gdGhpcy5fc3ByaXRlID0gbmV3IEooam4uSW5zdGFuY2UuZ2V0VGlsZVRleHR1cmUodGhpcy5nZXRfYW5pbWFsKCksICExLCAhMSkpXG4gICAgICAgIC8vICAgICAvLyB0aGlzLm93bmVyLmFkZENoaWxkKChuZXcgZykuYWRkKHRoaXMuX3Nwcml0ZSkpXG4gICAgICAgIC8vIH0gXG4gICAgICAgIGlmICh0aGlzLmlzQ2hhbmdhYmxlICYmIHRoaXMuZ2V0X2lzQ29ubmVjdGluZygpICkgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2Jhc2VTcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmdldFRpbGVUZXh0dXJlKHRoaXMuZ2V0X2FuaW1hbCgpLHRydWUsIGZhbHNlKSBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgdGFpbFRpbGUgPSB0aGlzLmdldFRhaWwoKVxuICAgICAgICAgICAgbGV0IHNwIFxuICAgICAgICAgICAgaWYgKCAhdGhpcy5pc0NoYW5nYWJsZSAmJiBudWxsICE9IHRoaXMucmV2ZXJzZUNvbm5lY3RlZFRpbGUgKSBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzcCA9IHRoaXMuZ2V0VGlsZVRleHR1cmUodGhpcy5nZXRfYW5pbWFsKCksIGZhbHNlLCB0cnVlKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYoIG51bGwgPT0gdGFpbFRpbGUgfHwgdGFpbFRpbGUuaXNDaGFuZ2FibGUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzcCA9IHRoaXMuZ2V0VGlsZVRleHR1cmUodGhpcy5nZXRfYW5pbWFsKCksIGZhbHNlLCBmYWxzZSkgXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNwID0gdGhpcy5nZXRUaWxlVGV4dHVyZSh0aGlzLmdldF9hbmltYWwoKSwgZmFsc2UsIHRydWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYmFzZVNwcml0ZS5zcHJpdGVGcmFtZSA9IHNwXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbGVUeXBlO1xuICAgIH1cbiAgICBvbkFkZGVkKCkge1xuICAgICAgICB0aGlzLnNldF90aWxlVHlwZShUaWxlVHlwZS5FbXB0eSlcbiAgICB9XG4gICAgY29ubmVjdCh0KSB7XG4gICAgICAgIG51bGwgPT0gdCA/IG51bGwgIT0gdGhpcy5jb25uZWN0ZWRUaWxlICYmICgxID09IHRoaXMuY29ubmVjdGVkVGlsZS5pc0NoYW5nYWJsZSAmJiB0aGlzLmNvbm5lY3RlZFRpbGUuc2V0X2FuaW1hbCgwKSwgdGhpcy5jb25uZWN0ZWRUaWxlLmNvbm5lY3QobnVsbCksIHRoaXMuY29ubmVjdGVkVGlsZSA9IHRoaXMuY29ubmVjdGVkVGlsZS5yZXZlcnNlQ29ubmVjdGVkVGlsZSA9IG51bGwpIDogKHRoaXMuY29ubmVjdGVkVGlsZSA9IHQsIHQuc2V0X2FuaW1hbCh0aGlzLmdldF9hbmltYWwoKSksIHQucmV2ZXJzZUNvbm5lY3RlZFRpbGUgPSB0aGlzKVxuICAgIH1cbiAgICBnZXRUYWlsKCkge1xuICAgICAgICBmb3IgKHZhciB0ID0gdGhpcy5jb25uZWN0ZWRUaWxlLCBlID0gbnVsbDsgbnVsbCAhPSB0OykgZSA9IHQsIHQgPSB0LmNvbm5lY3RlZFRpbGU7XG4gICAgICAgIHJldHVybiBlXG4gICAgfVxuICAgIGdldEhlYWQoKSB7XG4gICAgICAgIGZvciAodmFyIHQgPSB0aGlzLnJldmVyc2VDb25uZWN0ZWRUaWxlLCBlID0gbnVsbDsgbnVsbCAhPSB0OykgZSA9IHQsIHQgPSB0LnJldmVyc2VDb25uZWN0ZWRUaWxlO1xuICAgICAgICByZXR1cm4gZVxuICAgIH1cbiAgICBlcXVhbHModCkge1xuICAgICAgICByZXR1cm4gbnVsbCA9PSB0ID8gITEgOiB0aGlzLmdldF9yb3coKSA9PSB0LmdldF9yb3coKSAmJiB0aGlzLmdldF9jb2woKSA9PSB0LmdldF9jb2woKVxuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19