import Consts from "./Consts";
import LineGame from "./Game";
import { R } from "./Res";

const {ccclass, property} = cc._decorator;

enum TileType
{
    Empty,
    Type1,
    Type2,
    Type3,
    Type4,
    Type5,
    Type6,
    Type7
}


@ccclass
export default class HexonTile extends cc.Component {
    _col: number = 0;
    _row:number = 0;
    _animal:number = 0;
    isChangable = true;
    _isConnecting = false;
    
    connectedTile = null;
    reverseConnectedTile = null;
    targetTile = null;

    @property({type:cc.Sprite,visible:true,displayName:"Animal Sprite"})
    _sprite:cc.Sprite = null;

    @property({type:cc.Sprite,visible:true,displayName:"Base Sprite"})
    _baseSprite = null;

    animalSprite = null;


    _tileType = 0;

    get_col() {
        return this._col
    }
    set_col(t) {
        return this._col = t,
            t = this._col - (this._row <= LineGame.instance._rowCount / 2 ? LineGame.instance.get_minCol() + this._row: LineGame.instance.get_minCol() - 1 + LineGame.instance._rowCount - this._row) / 2 + .5,
            this._baseSprite.node.x = (Consts.CenterX + t * Consts.ColSize),
            this._col
    }
    get_row() {
        return this._row
    }
    set_row(t) {
        this._row = t
        this._baseSprite.node.y = (Consts.CenterY + (this._row - (LineGame.instance._rowCount / 2 | 0)) * Consts.RowSize)
        return this._row
    }
    get_borderPosition() {
        return this._baseSprite.node.position
        // return cc.v2(this._baseSprite.node.x._value, this._baseSprite.node.y._value)
    }
    get_isConnecting() {
        return this._isConnecting
    }
    set_isConnecting(t) {
        return this._isConnecting = t, this.set_tileType(this._tileType), this._isConnecting
    }
    get_animal() {
        return this._animal
    }
    set_animal(t) {
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
                this.set_tileType(TileType.Empty)
        }
        return this._animal
    }
    
    getTileTexture(t, e, n) {
        if(t == 0 )
        {
            return R.tileTextures[0]
        }else{
            // return e ? R.tileTextures[t] : 1 == n ? R.tileTextures[14 + t] : R.tileTextures[7 + t]
            let idx = 0
            if(e)
            {
                idx = t
            }else{
                if (n){
                    idx = 14 +t 
                }else{
                    idx = 7 + t;
                }
            }
            return R.tileTextures[idx];
        }
    }


    set_tileType(t:number) {
        this._tileType = t
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
        if (this.isChangable && this.get_isConnecting() ) 
        {
            this._baseSprite.spriteFrame = this.getTileTexture(this.get_animal(),true, false) 
        }else{
            let tailTile = this.getTail()
            let sp 
            if ( !this.isChangable && null != this.reverseConnectedTile ) 
            {
                sp = this.getTileTexture(this.get_animal(), false, true)
            }else{
                if( null == tailTile || tailTile.isChangable)
                {
                    sp = this.getTileTexture(this.get_animal(), false, false) 
                }else{
                    sp = this.getTileTexture(this.get_animal(), false, true)
                }
            }
            this._baseSprite.spriteFrame = sp
        }
        return this._tileType;
    }
    onAdded() {
        this.set_tileType(TileType.Empty)
    }
    connect(t) {
        null == t ? null != this.connectedTile && (1 == this.connectedTile.isChangable && this.connectedTile.set_animal(0), this.connectedTile.connect(null), this.connectedTile = this.connectedTile.reverseConnectedTile = null) : (this.connectedTile = t, t.set_animal(this.get_animal()), t.reverseConnectedTile = this)
    }
    getTail() {
        for (var t = this.connectedTile, e = null; null != t;) e = t, t = t.connectedTile;
        return e
    }
    getHead() {
        for (var t = this.reverseConnectedTile, e = null; null != t;) e = t, t = t.reverseConnectedTile;
        return e
    }
    equals(t) {
        return null == t ? !1 : this.get_row() == t.get_row() && this.get_col() == t.get_col()
    }

    start () {

    }



    // update (dt) {}
}
