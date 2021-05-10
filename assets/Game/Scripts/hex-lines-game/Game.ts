import { R } from "./Res";
import HexonTile from "./HexonTile";
import GridManager from "./GridManager";
import { Input, InputSystem } from "../../../framework/plugin_boosts/misc/InputSystem";
import { UserInfo } from "../Info";
import Animal from "./Animal";
import ViewManager from "../../../framework/plugin_boosts/ui/ViewManager";

import { Toast } from "../../../framework/plugin_boosts/ui/ToastManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class LineGame extends cc.Component
{
    _levelData:any;
    _tileList:any;

    _isGameOver:boolean = false; 
    _moveCount:number = 0;

    _playTime = 0;
    _colCount = 6;
    _rowCount = 7;

    _pickedTile:HexonTile = null;
    
    static instance:LineGame = null;

    @property(cc.Node)
    tileLayer:cc.Node = null;

    @property(cc.Label)
    levelLabel:cc.Label = null;

    @property(cc.Label)
    timeLabel:cc.Label = null;

    @property(cc.Label)
    stepLabel:cc.Label = null;

    @property(cc.Node)
    focusNode:cc.Node = null;

    _figureList = []

    perfectMoveCount = 0;

    _gridManager:GridManager;

    get_isGameOver() {
        return this._isGameOver
    }
    get_minCol() {
        return this._levelData.mincol
    }
    get_moveCount() {
        return this._moveCount
    }

    loadLevel(t) {
        //test :
        t = Math.min(t, R.levelJson.json.levels.length-1)
        this._levelData = R.levelJson.json.levels[t];
        this.levelLabel.string = t +""
        if(t == 1)
        {
            this.scheduleOnce(this.openGuide,0.1)
        }
    }

    openGuide()
    {
        ViewManager.instance.show("Game/OpenGuide")
    }

    onLoad() {
        var t = this;
        LineGame.instance = this;
        this.loadLevel(UserInfo.currentLevel)
        //this.loadLevel(75)
        this.hideFocus();
        this._tileList = []
        this._rowCount = this._levelData.size
        this._colCount -= 1;
        appGame.gameServerRoom.on(consts.CLIENT_GAME_START, this.onGameStart,this);
        for (var e = 0, n = this._rowCount; n > e;) {
            var i, s = e++ 
            let tmplist = [];
            i = s <= this._rowCount / 2 ? this._levelData.mincol + s : this._levelData.mincol - 1 + this._rowCount - s;
            for (var r = 0; i > r;) {
                var o = r ++
                let node = cc.instantiate(R.TilePrefab)
                let tile = node.getComponent(HexonTile);
                node.parent = this.tileLayer;
                node.zIndex = this._rowCount - s;
                // this._tileLayer.addChild((new g).add(node))
                tile.set_row(s)
                tile.set_col(o)

                //------------------------------------------------------------------------------//
                let shadowNode = cc.instantiate(R.TileShadow)
                let shadow = shadowNode.getComponent(HexonTile);
                shadow.set_row(s)
                shadow.set_col(o)
                shadowNode.y -= 3;
                shadowNode.parent = this.tileLayer;
                shadowNode.zIndex = 0;
                //------------------------------------------------------------------------------//
                tmplist.push(tile)
            }
            this._tileList.push(tmplist)
        }
        
        this._gridManager = this.tileLayer.addComponent(GridManager)
        this._gridManager.init(this._levelData.mincol);
        // this._lineLayer = (new g).add(this._gridManager),
        // this.owner.addChild(this._lineLayer),
        this.setFigure()

        this.addComponent(InputSystem);


        // this._uiLayer = new g,
        // this._uiManager = new ni(this._stageIndex + 1),
        // this.owner.addChild(this._uiLayer.add(this._uiManager))
        if(appGame.platform == 'toutiao'){
            appGame.screenAuto.playScreenCap(true)
        }
        UserInfo.timePassed = 0;
        UserInfo.stepUsed = 0;
        this.schedule(_=>{
            UserInfo.timePassed += 1
            this.timeLabel.string = UserInfo.timePassed + "s";
            this.stepLabel.string = UserInfo.stepUsed +"步"
        },1)
    }

    onDestroy(){
        appGame.gameServerRoom.off(consts.CLIENT_GAME_START, this.onGameStart,this);
    }
    onGameStart(){
                   
        appGame.banner.playBanner(2);    
        //插屏广告
        this.schedule(() => {
            console.log("插屏广告==");
            if(appGame.interstitialAd){
                appGame.interstitialAd.playAd("插屏");
            }   
        }, 60); 
        //积木广告
        this.schedule(()=>{
            console.log("积木广告==");
            if(appGame.qqblockad){
                appGame.qqblockad.playBlockad(true);
            } 
        },30);
       
     
   
    }
    onTouchBegan(e)
    {
        let t = this;
        if (!t._isGameOver) {
            // var n = t.touchXtoScreenX(e.viewX)
            // var e = t.touchYtoScreenY(e.viewY)
            // var i = t.findTileByPos(n, e)
            var p = e.currentTouch.getLocation();
            p = this.node.convertToNodeSpaceAR(p);
            var i:HexonTile = t.findTileByPos(p.x,p.y);
            
            if (null != i && 0 != i.get_animal()) {
                cc.audioEngine.playEffect(R.audio_down,false);
                // jn.playSound(0)
                t._pickedTile = i
                t.removeGridFromTile(t._pickedTile)
                t._pickedTile.connect(null)
                if(null != t._pickedTile.targetTile)
                {
                    t.removeGridFromTile(t._pickedTile.targetTile)
                    t._pickedTile.targetTile.connect(null)
                    t._pickedTile.targetTile.set_isConnecting(false)
                }
                t._pickedTile.set_isConnecting(!0)
                i = t._pickedTile.getHead(); 
                for ( ;null != i;) i.set_isConnecting(!0),
                i = i.connectedTile;
                // t._uiManager.showFocus(t._pickedTile.get_animal()),
                this.showFocus(t._pickedTile.get_animal());
                // t._uiManager.moveFocus(n, e)
                this.moveFocus(p);
            }
            this.checkCompelete()
            // 1 ==  ? 1 == t.checkFillAll() ? t._uiManager.hideFillAllPopup() : t._uiManager.showFillAllPopup() : t._uiManager.hideFillAllPopup()
        }
    }

    checkCompelete()
    {
        if( this.checkConnectedAll())
        {
            if(this.checkFillAll())
            {
                // t._uiManager.hideFillAllPopup()
            }else{
                //  t._uiManager.showFillAllPopup()
                
            }
        }else{
            // _uiManager.hideFillAllPopup()
        }
    }

    isTileConnected(t, e) {
        var n, i = t._row;
        n = t._col + (i <= this._rowCount / 2 ? 0 : t._row - (this._rowCount / 2 | 0));
        var s, a = e._row;
        return s = e._col + (a <= this._rowCount / 2 ? 0 : e._row - (this._rowCount / 2 | 0)),
        i - 1 == a && n - 1 == s || i - 1 == a && n == s || i == a && n - 1 == s || i == a && n + 1 == s || i + 1 == a && n == s || i + 1 == a && n + 1 == s ? true:false
    }


    onTouchMoved(e)
    {
        let t = this;
        if (!t._isGameOver) {
            var p = e.currentTouch.getLocation();
            p = this.node.convertToNodeSpaceAR(p);
            var i:HexonTile = t.findTileByPos(p.x,p.y);

            if (null != t._pickedTile && null != i) if (t.isTileConnected(t._pickedTile, i)) {
                if (0 == i.get_animal())(null == t._pickedTile.targetTile || null == t._pickedTile.reverseConnectedTile) && (t._gridManager.setState(t._pickedTile.get_row(), t._pickedTile.get_col(), i.get_row(), i.get_col(), !0), t._pickedTile.connect(i), t._pickedTile = i, t._pickedTile.set_isConnecting(!0));
                else if (i.get_animal() == t._pickedTile.get_animal()) if (false == i.isChangable && ! i.equals(t._pickedTile.getHead())) null == i.reverseConnectedTile && (t._gridManager.setState(t._pickedTile.get_row(), t._pickedTile.get_col(), i.get_row(), i.get_col(), !0), t._pickedTile.connect(i), t._pickedTile = i);
                else {
                    for (t._pickedTile = i, i = t._pickedTile; null != i && null != i.connectedTile;) t._gridManager.setState(i.get_row(), i.get_col(), i.connectedTile.get_row(), i.connectedTile.get_col(), !1),
                    i = i.connectedTile;
                    t._pickedTile.connect(null)
                }
            } else if (i.get_animal() == t._pickedTile.get_animal() && !i.equals(t._pickedTile) && null != i.connectedTile) {
                for (t._pickedTile = i, i = t._pickedTile; null != i && null != i.connectedTile;) t._gridManager.setState(i.get_row(), i.get_col(), i.connectedTile.get_row(), i.connectedTile.get_col(), !1),
                i = i.connectedTile;
                t._pickedTile.connect(null)
            }
            this.moveFocus(p)
            // t._uiManager.moveFocus(n, e),
            //this.checkCompelete()
        }
    }

    onTouchEnded()
    {
        let t = this;
        var e = false;
        if (!t._isGameOver) {
            if (null != t._pickedTile) {
                var n = t._pickedTile.getHead();
                for (null != t._pickedTile.animalSprite && null != n && null != n.animalSprite && (e = true, t._pickedTile.animalSprite.connected(), n.animalSprite.connected()); null != n;) n.set_isConnecting(false),
                n = n.connectedTile;
                t._moveCount++
                UserInfo.stepUsed ++;
            }
            t._pickedTile = null
            // t._uiManager.hideFocus(),
            this.hideFocus();
            if( t.checkConnectedAll())
            {
                if(t.checkFillAll())
                {
                    // t._uiManager.hideFillAllPopup()
                    t._isGameOver = true;
                    // t._uiManager.showClearPopup(t._moveCount, t.perfectMoveCount)
                    t.danceAll();

                }else{
                    //  t._uiManager.showFillAllPopup()
                    Toast.make("必须填满所有格子")
                }
            }else{
                // _uiManager.hideFillAllPopup()
            }
            if(e== true && !t._isGameOver)
            {
                // jn.playSound(1)
                cc.audioEngine.playEffect(R.audio_link,false);
            }
            // 1 == e && 0 == t._isGameOver && jn.playSound(1)
        }
    }

    showFocus(animal)
    {
        console.log(animal);
        this.focusNode.active = true
        this.focusNode.zIndex = 100;
        this.focusNode.color = R.colors[animal].clone();
    }

    moveFocus(p)
    {
        this.focusNode.position = p;
    }

    hideFocus()
    {
        this.focusNode.active = false
    }

    danceAll() {
        // jn.playSound(3);
        cc.audioEngine.playEffect(R.audio_win,false);
        for (var t = 0,e = this._tileList; t < e.length;) {
            var n = e[t]; ++t;
            for (var i = 0; i < n.length;) {
                var s = n[i]; ++i,
                null != s.animalSprite && s.animalSprite.loopJump(1)
            }
        }

    
        this.scheduleOnce(this.showWinDialog,1)
    }

    showWinDialog()
    {
        ViewManager.instance.show("Game/WinDialog")
    }

    click_pause()
    {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'游戏界面',content:'点击返回'},function(){});
        ViewManager.instance.show("Game/PauseDialog")
    }

    click_share()
    {
      
    }

    setFigure() {
        // this._figureLayer = new g,
        this._figureList = []
        // this.owner.addChild(this._figureLayer);
        for (var t = [], e = 0; 10 > e;) e++, t.push(null);

        for (var e = 0, n = this._levelData.figure; e < n.length;) {
            var i = n[e];
            ++e;
            var s:HexonTile = this._tileList[i[0]][i[1]]
            var a = s.get_borderPosition();

            // s.animalSprite = new $n(i[2], a.get_x(), a.get_y())
            // this.owner.addChild((new g).add(s.animalSprite))
            let type = i[2];
            let node = cc.instantiate(R.animalPrefabs[type-1])
            s.animalSprite = node.getComponent(Animal);
            // s.animalSprite.type = type;
            node.setPosition(a.x,a.y);
            node.parent = this.tileLayer;
            node.zIndex = 110;

            // animal.type = type; 
            // animal.tx = a.x ; 

            s.set_animal(i[2])
            s.isChangable = false 
            this._figureList.push(s)
            null == t[i[2]] ? t[i[2]] = s : (s.targetTile = t[i[2]], t[i[2]].targetTile = s)
        }
        this.perfectMoveCount = this._figureList.length / 2 | 0
    }

    findTileByPos(x, y) {
        var n = null
        var i = 1e6
        var s = cc.v2(x, y)
        var r = this._tileList
        for (var a = 0; a < r.length;++a) {
            var o = r[a];
            for (var _ = 0; _ < o.length;++_) {
                var l = o[_]
                var tp = o[_].node.position;
                var h = s.sub(tp).mag()
                if (h < 50 && h < i ){
                    i = h; 
                    n = l;
                }
                // 40 > h && i > h && (i = h, n = l)
            }
        }
        return n
    }
    removeGridFromTile(t) {
        for (; null != t && null != t.connectedTile;) this._gridManager.setState(t.get_row(), t.get_col(), t.connectedTile.get_row(), t.connectedTile.get_col(), !1), t = t.connectedTile
    }
    checkFillAll() {
        for (var t = 0, e = this._tileList; t < e.length;) {
            var n = e[t];
            ++t;
            for (var i = 0; i < n.length;) {
                var s = n[i];
                if (++i, 0 == s.get_animal()) return !1
            }
        }
        return !0
    }
    checkConnectedAll() {
        for (var t = 0, e = this._tileList; t < e.length;) {
            var n = e[t];
            ++t;
            for (var i = 0; i < n.length;) {
                var s = n[i];
                if (++i, null != s.targetTile) {
                    var a = s.getHead(),
                        r = s.getTail();
                    if (0 == s.targetTile.equals(a) && 0 == s.targetTile.equals(r)) return !1
                }
            }
        }
        return !0
    }
}