import IntMap from "./ds/IntMap";
import LineGame from "./Game";
import { R } from "./Res";

export default class GridManager extends cc.Component
{
    _gridList:IntMap

    _minCol = null;

    addGrid(t, e, n) {
        null == this._gridList && (this._gridList = new IntMap)
        if(!this._gridList.exists(t))
            this._gridList.set(t, new IntMap)
        this._gridList.get(t).set(e, n)
    }

    init(t)
    {
        this._minCol = t
    }

    start() {
        var t = LineGame.instance._rowCount
        var e = LineGame.instance._tileList
        this._gridList = new IntMap;
        for (var n = 0; t > n;)
        {
            for (var i = n++, s = 0, a = (t / 2 >= i ? this._minCol + i : this._minCol - 1 + t - i) - 1; a > s;) {
                var r = s++
                var o = e[i][r].get_borderPosition()
                var b = e[i][r + 1].get_borderPosition()
                var c = cc.v2((o.x + b.x) / 2,(o.y + b.y) / 2)
                let line = cc.instantiate(R.Line46)
                line.setPosition(c);
                line.active = false;
                line.parent = this.node;
                line.zIndex = 109
                this.addGrid(i + i, r + r + 1, line)
            }
        }
        for (n = 0, i = t / 2 | 0; i > n;)
            for (s = n++, a = t / 2 >= s ? this._minCol + s : this._minCol - 1 + t - s, r = 0; a > r;)
            {
                o = r ++
                for (let m = 0; 2 > m;m++) {
                    var h = e[s][o].get_borderPosition()
                    var u = e[s + 1][o + m].get_borderPosition()
                    h = cc.v2((h.x + u.x) / 2, (h.y + u.y) / 2)
                    let line = null;
                    if(m == 0)
                    {
                        
                        line = cc.instantiate(R.Line37)
                    }else{
                        line = cc.instantiate(R.Line19)
                    }
                    line.setPosition(h);
                    line.active = false;
                    line.parent = this.node;
                    line.zIndex = 109
                    this.addGrid(s + s + 1, o + o + m, line)
                }
            }
        for (n = 0, i = t / 2 | 0; i > n;)
            for (s = n++, s = t - s - 1, a = t / 2 >= s ? this._minCol + s : this._minCol - 1 + t - s, r = 0; a > r;)
            {
                o = r++
                for (var m  = 0; 2 > m;m++) 
                {
                    h = e[s][o].get_borderPosition()
                    u = e[s - 1][o + m].get_borderPosition()
                    h = cc.v2((h.x + u.x) / 2, (h.y + u.y) / 2)
                    let line = null;
                    if(m == 0)
                    {
                        line = cc.instantiate(R.Line19)
                    }else{
                        
                        line = cc.instantiate(R.Line37)
                    }
                    line.setPosition(h);
                    line.active = false;
                    line.zIndex = 109
                    line.parent = this.node;

                    this.addGrid(s + s - 1, o + o + m, line)
                }
            }
                
    }

    setState(r, c, r1, c1, b) {
        if(this._gridList.exists(r + r1))
        {
            let t = this._gridList.get(r + r1)
            if (t.exists(c + c1))
            {
                let node = t.get(c + c1)
                node.active = b;
            }
        }
    }
}