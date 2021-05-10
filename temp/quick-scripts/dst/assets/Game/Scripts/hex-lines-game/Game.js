
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/hex-lines-game/Game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4c9b5SEXlhDAqXGat0NcWmI', 'Game');
// Game/Scripts/hex-lines-game/Game.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Res_1 = require("./Res");
var HexonTile_1 = require("./HexonTile");
var GridManager_1 = require("./GridManager");
var InputSystem_1 = require("../../../framework/plugin_boosts/misc/InputSystem");
var Info_1 = require("../Info");
var Animal_1 = require("./Animal");
var ViewManager_1 = require("../../../framework/plugin_boosts/ui/ViewManager");
var ToastManager_1 = require("../../../framework/plugin_boosts/ui/ToastManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LineGame = /** @class */ (function (_super) {
    __extends(LineGame, _super);
    function LineGame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isGameOver = false;
        _this._moveCount = 0;
        _this._playTime = 0;
        _this._colCount = 6;
        _this._rowCount = 7;
        _this._pickedTile = null;
        _this.tileLayer = null;
        _this.levelLabel = null;
        _this.timeLabel = null;
        _this.stepLabel = null;
        _this.focusNode = null;
        _this._figureList = [];
        _this.perfectMoveCount = 0;
        return _this;
    }
    LineGame_1 = LineGame;
    LineGame.prototype.get_isGameOver = function () {
        return this._isGameOver;
    };
    LineGame.prototype.get_minCol = function () {
        return this._levelData.mincol;
    };
    LineGame.prototype.get_moveCount = function () {
        return this._moveCount;
    };
    LineGame.prototype.loadLevel = function (t) {
        //test :
        t = Math.min(t, Res_1.R.levelJson.json.levels.length - 1);
        this._levelData = Res_1.R.levelJson.json.levels[t];
        this.levelLabel.string = t + "";
        if (t == 1) {
            this.scheduleOnce(this.openGuide, 0.1);
        }
    };
    LineGame.prototype.openGuide = function () {
        ViewManager_1.default.instance.show("Game/OpenGuide");
    };
    LineGame.prototype.onLoad = function () {
        var _this = this;
        var t = this;
        LineGame_1.instance = this;
        this.loadLevel(Info_1.UserInfo.currentLevel);
        //this.loadLevel(75)
        this.hideFocus();
        this._tileList = [];
        this._rowCount = this._levelData.size;
        this._colCount -= 1;
        appGame.gameServerRoom.on(consts.CLIENT_GAME_START, this.onGameStart, this);
        for (var e = 0, n = this._rowCount; n > e;) {
            var i, s = e++;
            var tmplist = [];
            i = s <= this._rowCount / 2 ? this._levelData.mincol + s : this._levelData.mincol - 1 + this._rowCount - s;
            for (var r = 0; i > r;) {
                var o = r++;
                var node = cc.instantiate(Res_1.R.TilePrefab);
                var tile = node.getComponent(HexonTile_1.default);
                node.parent = this.tileLayer;
                node.zIndex = this._rowCount - s;
                // this._tileLayer.addChild((new g).add(node))
                tile.set_row(s);
                tile.set_col(o);
                //------------------------------------------------------------------------------//
                var shadowNode = cc.instantiate(Res_1.R.TileShadow);
                var shadow = shadowNode.getComponent(HexonTile_1.default);
                shadow.set_row(s);
                shadow.set_col(o);
                shadowNode.y -= 3;
                shadowNode.parent = this.tileLayer;
                shadowNode.zIndex = 0;
                //------------------------------------------------------------------------------//
                tmplist.push(tile);
            }
            this._tileList.push(tmplist);
        }
        this._gridManager = this.tileLayer.addComponent(GridManager_1.default);
        this._gridManager.init(this._levelData.mincol);
        // this._lineLayer = (new g).add(this._gridManager),
        // this.owner.addChild(this._lineLayer),
        this.setFigure();
        this.addComponent(InputSystem_1.InputSystem);
        // this._uiLayer = new g,
        // this._uiManager = new ni(this._stageIndex + 1),
        // this.owner.addChild(this._uiLayer.add(this._uiManager))
        if (appGame.platform == 'toutiao') {
            appGame.screenAuto.playScreenCap(true);
        }
        Info_1.UserInfo.timePassed = 0;
        Info_1.UserInfo.stepUsed = 0;
        this.schedule(function (_) {
            Info_1.UserInfo.timePassed += 1;
            _this.timeLabel.string = Info_1.UserInfo.timePassed + "s";
            _this.stepLabel.string = Info_1.UserInfo.stepUsed + "步";
        }, 1);
    };
    LineGame.prototype.onDestroy = function () {
        appGame.gameServerRoom.off(consts.CLIENT_GAME_START, this.onGameStart, this);
    };
    LineGame.prototype.onGameStart = function () {
        appGame.banner.playBanner(2);
        //插屏广告
        this.schedule(function () {
            console.log("插屏广告==");
            if (appGame.interstitialAd) {
                appGame.interstitialAd.playAd("插屏");
            }
        }, 60);
        //积木广告
        this.schedule(function () {
            console.log("积木广告==");
            if (appGame.qqblockad) {
                appGame.qqblockad.playBlockad(true);
            }
        }, 30);
    };
    LineGame.prototype.onTouchBegan = function (e) {
        var t = this;
        if (!t._isGameOver) {
            // var n = t.touchXtoScreenX(e.viewX)
            // var e = t.touchYtoScreenY(e.viewY)
            // var i = t.findTileByPos(n, e)
            var p = e.currentTouch.getLocation();
            p = this.node.convertToNodeSpaceAR(p);
            var i = t.findTileByPos(p.x, p.y);
            if (null != i && 0 != i.get_animal()) {
                cc.audioEngine.playEffect(Res_1.R.audio_down, false);
                // jn.playSound(0)
                t._pickedTile = i;
                t.removeGridFromTile(t._pickedTile);
                t._pickedTile.connect(null);
                if (null != t._pickedTile.targetTile) {
                    t.removeGridFromTile(t._pickedTile.targetTile);
                    t._pickedTile.targetTile.connect(null);
                    t._pickedTile.targetTile.set_isConnecting(false);
                }
                t._pickedTile.set_isConnecting(!0);
                i = t._pickedTile.getHead();
                for (; null != i;)
                    i.set_isConnecting(!0),
                        i = i.connectedTile;
                // t._uiManager.showFocus(t._pickedTile.get_animal()),
                this.showFocus(t._pickedTile.get_animal());
                // t._uiManager.moveFocus(n, e)
                this.moveFocus(p);
            }
            this.checkCompelete();
            // 1 ==  ? 1 == t.checkFillAll() ? t._uiManager.hideFillAllPopup() : t._uiManager.showFillAllPopup() : t._uiManager.hideFillAllPopup()
        }
    };
    LineGame.prototype.checkCompelete = function () {
        if (this.checkConnectedAll()) {
            if (this.checkFillAll()) {
                // t._uiManager.hideFillAllPopup()
            }
            else {
                //  t._uiManager.showFillAllPopup()
            }
        }
        else {
            // _uiManager.hideFillAllPopup()
        }
    };
    LineGame.prototype.isTileConnected = function (t, e) {
        var n, i = t._row;
        n = t._col + (i <= this._rowCount / 2 ? 0 : t._row - (this._rowCount / 2 | 0));
        var s, a = e._row;
        return s = e._col + (a <= this._rowCount / 2 ? 0 : e._row - (this._rowCount / 2 | 0)),
            i - 1 == a && n - 1 == s || i - 1 == a && n == s || i == a && n - 1 == s || i == a && n + 1 == s || i + 1 == a && n == s || i + 1 == a && n + 1 == s ? true : false;
    };
    LineGame.prototype.onTouchMoved = function (e) {
        var t = this;
        if (!t._isGameOver) {
            var p = e.currentTouch.getLocation();
            p = this.node.convertToNodeSpaceAR(p);
            var i = t.findTileByPos(p.x, p.y);
            if (null != t._pickedTile && null != i)
                if (t.isTileConnected(t._pickedTile, i)) {
                    if (0 == i.get_animal())
                        (null == t._pickedTile.targetTile || null == t._pickedTile.reverseConnectedTile) && (t._gridManager.setState(t._pickedTile.get_row(), t._pickedTile.get_col(), i.get_row(), i.get_col(), !0), t._pickedTile.connect(i), t._pickedTile = i, t._pickedTile.set_isConnecting(!0));
                    else if (i.get_animal() == t._pickedTile.get_animal())
                        if (false == i.isChangable && !i.equals(t._pickedTile.getHead()))
                            null == i.reverseConnectedTile && (t._gridManager.setState(t._pickedTile.get_row(), t._pickedTile.get_col(), i.get_row(), i.get_col(), !0), t._pickedTile.connect(i), t._pickedTile = i);
                        else {
                            for (t._pickedTile = i, i = t._pickedTile; null != i && null != i.connectedTile;)
                                t._gridManager.setState(i.get_row(), i.get_col(), i.connectedTile.get_row(), i.connectedTile.get_col(), !1),
                                    i = i.connectedTile;
                            t._pickedTile.connect(null);
                        }
                }
                else if (i.get_animal() == t._pickedTile.get_animal() && !i.equals(t._pickedTile) && null != i.connectedTile) {
                    for (t._pickedTile = i, i = t._pickedTile; null != i && null != i.connectedTile;)
                        t._gridManager.setState(i.get_row(), i.get_col(), i.connectedTile.get_row(), i.connectedTile.get_col(), !1),
                            i = i.connectedTile;
                    t._pickedTile.connect(null);
                }
            this.moveFocus(p);
            // t._uiManager.moveFocus(n, e),
            //this.checkCompelete()
        }
    };
    LineGame.prototype.onTouchEnded = function () {
        var t = this;
        var e = false;
        if (!t._isGameOver) {
            if (null != t._pickedTile) {
                var n = t._pickedTile.getHead();
                for (null != t._pickedTile.animalSprite && null != n && null != n.animalSprite && (e = true, t._pickedTile.animalSprite.connected(), n.animalSprite.connected()); null != n;)
                    n.set_isConnecting(false),
                        n = n.connectedTile;
                t._moveCount++;
                Info_1.UserInfo.stepUsed++;
            }
            t._pickedTile = null;
            // t._uiManager.hideFocus(),
            this.hideFocus();
            if (t.checkConnectedAll()) {
                if (t.checkFillAll()) {
                    // t._uiManager.hideFillAllPopup()
                    t._isGameOver = true;
                    // t._uiManager.showClearPopup(t._moveCount, t.perfectMoveCount)
                    t.danceAll();
                }
                else {
                    //  t._uiManager.showFillAllPopup()
                    ToastManager_1.Toast.make("必须填满所有格子");
                }
            }
            else {
                // _uiManager.hideFillAllPopup()
            }
            if (e == true && !t._isGameOver) {
                // jn.playSound(1)
                cc.audioEngine.playEffect(Res_1.R.audio_link, false);
            }
            // 1 == e && 0 == t._isGameOver && jn.playSound(1)
        }
    };
    LineGame.prototype.showFocus = function (animal) {
        console.log(animal);
        this.focusNode.active = true;
        this.focusNode.zIndex = 100;
        this.focusNode.color = Res_1.R.colors[animal].clone();
    };
    LineGame.prototype.moveFocus = function (p) {
        this.focusNode.position = p;
    };
    LineGame.prototype.hideFocus = function () {
        this.focusNode.active = false;
    };
    LineGame.prototype.danceAll = function () {
        // jn.playSound(3);
        cc.audioEngine.playEffect(Res_1.R.audio_win, false);
        for (var t = 0, e = this._tileList; t < e.length;) {
            var n = e[t];
            ++t;
            for (var i = 0; i < n.length;) {
                var s = n[i];
                ++i,
                    null != s.animalSprite && s.animalSprite.loopJump(1);
            }
        }
        this.scheduleOnce(this.showWinDialog, 1);
    };
    LineGame.prototype.showWinDialog = function () {
        ViewManager_1.default.instance.show("Game/WinDialog");
    };
    LineGame.prototype.click_pause = function () {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, { title: '游戏界面', content: '点击返回' }, function () { });
        ViewManager_1.default.instance.show("Game/PauseDialog");
    };
    LineGame.prototype.click_share = function () {
    };
    LineGame.prototype.setFigure = function () {
        // this._figureLayer = new g,
        this._figureList = [];
        // this.owner.addChild(this._figureLayer);
        for (var t = [], e = 0; 10 > e;)
            e++, t.push(null);
        for (var e = 0, n = this._levelData.figure; e < n.length;) {
            var i = n[e];
            ++e;
            var s = this._tileList[i[0]][i[1]];
            var a = s.get_borderPosition();
            // s.animalSprite = new $n(i[2], a.get_x(), a.get_y())
            // this.owner.addChild((new g).add(s.animalSprite))
            var type = i[2];
            var node = cc.instantiate(Res_1.R.animalPrefabs[type - 1]);
            s.animalSprite = node.getComponent(Animal_1.default);
            // s.animalSprite.type = type;
            node.setPosition(a.x, a.y);
            node.parent = this.tileLayer;
            node.zIndex = 110;
            // animal.type = type; 
            // animal.tx = a.x ; 
            s.set_animal(i[2]);
            s.isChangable = false;
            this._figureList.push(s);
            null == t[i[2]] ? t[i[2]] = s : (s.targetTile = t[i[2]], t[i[2]].targetTile = s);
        }
        this.perfectMoveCount = this._figureList.length / 2 | 0;
    };
    LineGame.prototype.findTileByPos = function (x, y) {
        var n = null;
        var i = 1e6;
        var s = cc.v2(x, y);
        var r = this._tileList;
        for (var a = 0; a < r.length; ++a) {
            var o = r[a];
            for (var _ = 0; _ < o.length; ++_) {
                var l = o[_];
                var tp = o[_].node.position;
                var h = s.sub(tp).mag();
                if (h < 50 && h < i) {
                    i = h;
                    n = l;
                }
                // 40 > h && i > h && (i = h, n = l)
            }
        }
        return n;
    };
    LineGame.prototype.removeGridFromTile = function (t) {
        for (; null != t && null != t.connectedTile;)
            this._gridManager.setState(t.get_row(), t.get_col(), t.connectedTile.get_row(), t.connectedTile.get_col(), !1), t = t.connectedTile;
    };
    LineGame.prototype.checkFillAll = function () {
        for (var t = 0, e = this._tileList; t < e.length;) {
            var n = e[t];
            ++t;
            for (var i = 0; i < n.length;) {
                var s = n[i];
                if (++i, 0 == s.get_animal())
                    return !1;
            }
        }
        return !0;
    };
    LineGame.prototype.checkConnectedAll = function () {
        for (var t = 0, e = this._tileList; t < e.length;) {
            var n = e[t];
            ++t;
            for (var i = 0; i < n.length;) {
                var s = n[i];
                if (++i, null != s.targetTile) {
                    var a = s.getHead(), r = s.getTail();
                    if (0 == s.targetTile.equals(a) && 0 == s.targetTile.equals(r))
                        return !1;
                }
            }
        }
        return !0;
    };
    var LineGame_1;
    LineGame.instance = null;
    __decorate([
        property(cc.Node)
    ], LineGame.prototype, "tileLayer", void 0);
    __decorate([
        property(cc.Label)
    ], LineGame.prototype, "levelLabel", void 0);
    __decorate([
        property(cc.Label)
    ], LineGame.prototype, "timeLabel", void 0);
    __decorate([
        property(cc.Label)
    ], LineGame.prototype, "stepLabel", void 0);
    __decorate([
        property(cc.Node)
    ], LineGame.prototype, "focusNode", void 0);
    LineGame = LineGame_1 = __decorate([
        ccclass
    ], LineGame);
    return LineGame;
}(cc.Component));
exports.default = LineGame;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcaGV4LWxpbmVzLWdhbWVcXEdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUEwQjtBQUMxQix5Q0FBb0M7QUFDcEMsNkNBQXdDO0FBQ3hDLGlGQUF1RjtBQUN2RixnQ0FBbUM7QUFDbkMsbUNBQThCO0FBQzlCLCtFQUEwRTtBQUUxRSxpRkFBeUU7QUFHbkUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUF5WkM7UUFwWkcsaUJBQVcsR0FBVyxLQUFLLENBQUM7UUFDNUIsZ0JBQVUsR0FBVSxDQUFDLENBQUM7UUFFdEIsZUFBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGVBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRWQsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFLN0IsZUFBUyxHQUFXLElBQUksQ0FBQztRQUd6QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUczQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFXLElBQUksQ0FBQztRQUV6QixpQkFBVyxHQUFHLEVBQUUsQ0FBQTtRQUVoQixzQkFBZ0IsR0FBRyxDQUFDLENBQUM7O0lBd1h6QixDQUFDO2lCQXpab0IsUUFBUTtJQXFDekIsaUNBQWMsR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQTtJQUMzQixDQUFDO0lBQ0QsNkJBQVUsR0FBVjtRQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUE7SUFDakMsQ0FBQztJQUNELGdDQUFhLEdBQWI7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUE7SUFDMUIsQ0FBQztJQUVELDRCQUFTLEdBQVQsVUFBVSxDQUFDO1FB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L1Jlc1wiO1xuaW1wb3J0IEhleG9uVGlsZSBmcm9tIFwiLi9IZXhvblRpbGVcIjtcbmltcG9ydCBHcmlkTWFuYWdlciBmcm9tIFwiLi9HcmlkTWFuYWdlclwiO1xuaW1wb3J0IHsgSW5wdXQsIElucHV0U3lzdGVtIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL21pc2MvSW5wdXRTeXN0ZW1cIjtcbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSBcIi4uL0luZm9cIjtcbmltcG9ydCBBbmltYWwgZnJvbSBcIi4vQW5pbWFsXCI7XG5pbXBvcnQgVmlld01hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1ZpZXdNYW5hZ2VyXCI7XG5cbmltcG9ydCB7IFRvYXN0IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1RvYXN0TWFuYWdlclwiO1xuXG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZUdhbWUgZXh0ZW5kcyBjYy5Db21wb25lbnRcbntcbiAgICBfbGV2ZWxEYXRhOmFueTtcbiAgICBfdGlsZUxpc3Q6YW55O1xuXG4gICAgX2lzR2FtZU92ZXI6Ym9vbGVhbiA9IGZhbHNlOyBcbiAgICBfbW92ZUNvdW50Om51bWJlciA9IDA7XG5cbiAgICBfcGxheVRpbWUgPSAwO1xuICAgIF9jb2xDb3VudCA9IDY7XG4gICAgX3Jvd0NvdW50ID0gNztcblxuICAgIF9waWNrZWRUaWxlOkhleG9uVGlsZSA9IG51bGw7XG4gICAgXG4gICAgc3RhdGljIGluc3RhbmNlOkxpbmVHYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRpbGVMYXllcjpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsZXZlbExhYmVsOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB0aW1lTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHN0ZXBMYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBmb2N1c05vZGU6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBfZmlndXJlTGlzdCA9IFtdXG5cbiAgICBwZXJmZWN0TW92ZUNvdW50ID0gMDtcblxuICAgIF9ncmlkTWFuYWdlcjpHcmlkTWFuYWdlcjtcblxuICAgIGdldF9pc0dhbWVPdmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNHYW1lT3ZlclxuICAgIH1cbiAgICBnZXRfbWluQ29sKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGV2ZWxEYXRhLm1pbmNvbFxuICAgIH1cbiAgICBnZXRfbW92ZUNvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW92ZUNvdW50XG4gICAgfVxuXG4gICAgbG9hZExldmVsKHQpIHtcbiAgICAgICAgLy90ZXN0IDpcbiAgICAgICAgdCA9IE1hdGgubWluKHQsIFIubGV2ZWxKc29uLmpzb24ubGV2ZWxzLmxlbmd0aC0xKVxuICAgICAgICB0aGlzLl9sZXZlbERhdGEgPSBSLmxldmVsSnNvbi5qc29uLmxldmVsc1t0XTtcbiAgICAgICAgdGhpcy5sZXZlbExhYmVsLnN0cmluZyA9IHQgK1wiXCJcbiAgICAgICAgaWYodCA9PSAxKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLm9wZW5HdWlkZSwwLjEpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuR3VpZGUoKVxuICAgIHtcbiAgICAgICAgVmlld01hbmFnZXIuaW5zdGFuY2Uuc2hvdyhcIkdhbWUvT3Blbkd1aWRlXCIpXG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB2YXIgdCA9IHRoaXM7XG4gICAgICAgIExpbmVHYW1lLmluc3RhbmNlID0gdGhpcztcbiAgICAgICAgdGhpcy5sb2FkTGV2ZWwoVXNlckluZm8uY3VycmVudExldmVsKVxuICAgICAgICAvL3RoaXMubG9hZExldmVsKDc1KVxuICAgICAgICB0aGlzLmhpZGVGb2N1cygpO1xuICAgICAgICB0aGlzLl90aWxlTGlzdCA9IFtdXG4gICAgICAgIHRoaXMuX3Jvd0NvdW50ID0gdGhpcy5fbGV2ZWxEYXRhLnNpemVcbiAgICAgICAgdGhpcy5fY29sQ291bnQgLT0gMTtcbiAgICAgICAgYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5vbihjb25zdHMuQ0xJRU5UX0dBTUVfU1RBUlQsIHRoaXMub25HYW1lU3RhcnQsdGhpcyk7XG4gICAgICAgIGZvciAodmFyIGUgPSAwLCBuID0gdGhpcy5fcm93Q291bnQ7IG4gPiBlOykge1xuICAgICAgICAgICAgdmFyIGksIHMgPSBlKysgXG4gICAgICAgICAgICBsZXQgdG1wbGlzdCA9IFtdO1xuICAgICAgICAgICAgaSA9IHMgPD0gdGhpcy5fcm93Q291bnQgLyAyID8gdGhpcy5fbGV2ZWxEYXRhLm1pbmNvbCArIHMgOiB0aGlzLl9sZXZlbERhdGEubWluY29sIC0gMSArIHRoaXMuX3Jvd0NvdW50IC0gcztcbiAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyBpID4gcjspIHtcbiAgICAgICAgICAgICAgICB2YXIgbyA9IHIgKytcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKFIuVGlsZVByZWZhYilcbiAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IG5vZGUuZ2V0Q29tcG9uZW50KEhleG9uVGlsZSk7XG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLnRpbGVMYXllcjtcbiAgICAgICAgICAgICAgICBub2RlLnpJbmRleCA9IHRoaXMuX3Jvd0NvdW50IC0gcztcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl90aWxlTGF5ZXIuYWRkQ2hpbGQoKG5ldyBnKS5hZGQobm9kZSkpXG4gICAgICAgICAgICAgICAgdGlsZS5zZXRfcm93KHMpXG4gICAgICAgICAgICAgICAgdGlsZS5zZXRfY29sKG8pXG5cbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG4gICAgICAgICAgICAgICAgbGV0IHNoYWRvd05vZGUgPSBjYy5pbnN0YW50aWF0ZShSLlRpbGVTaGFkb3cpXG4gICAgICAgICAgICAgICAgbGV0IHNoYWRvdyA9IHNoYWRvd05vZGUuZ2V0Q29tcG9uZW50KEhleG9uVGlsZSk7XG4gICAgICAgICAgICAgICAgc2hhZG93LnNldF9yb3cocylcbiAgICAgICAgICAgICAgICBzaGFkb3cuc2V0X2NvbChvKVxuICAgICAgICAgICAgICAgIHNoYWRvd05vZGUueSAtPSAzO1xuICAgICAgICAgICAgICAgIHNoYWRvd05vZGUucGFyZW50ID0gdGhpcy50aWxlTGF5ZXI7XG4gICAgICAgICAgICAgICAgc2hhZG93Tm9kZS56SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cbiAgICAgICAgICAgICAgICB0bXBsaXN0LnB1c2godGlsZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RpbGVMaXN0LnB1c2godG1wbGlzdClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5fZ3JpZE1hbmFnZXIgPSB0aGlzLnRpbGVMYXllci5hZGRDb21wb25lbnQoR3JpZE1hbmFnZXIpXG4gICAgICAgIHRoaXMuX2dyaWRNYW5hZ2VyLmluaXQodGhpcy5fbGV2ZWxEYXRhLm1pbmNvbCk7XG4gICAgICAgIC8vIHRoaXMuX2xpbmVMYXllciA9IChuZXcgZykuYWRkKHRoaXMuX2dyaWRNYW5hZ2VyKSxcbiAgICAgICAgLy8gdGhpcy5vd25lci5hZGRDaGlsZCh0aGlzLl9saW5lTGF5ZXIpLFxuICAgICAgICB0aGlzLnNldEZpZ3VyZSgpXG5cbiAgICAgICAgdGhpcy5hZGRDb21wb25lbnQoSW5wdXRTeXN0ZW0pO1xuXG5cbiAgICAgICAgLy8gdGhpcy5fdWlMYXllciA9IG5ldyBnLFxuICAgICAgICAvLyB0aGlzLl91aU1hbmFnZXIgPSBuZXcgbmkodGhpcy5fc3RhZ2VJbmRleCArIDEpLFxuICAgICAgICAvLyB0aGlzLm93bmVyLmFkZENoaWxkKHRoaXMuX3VpTGF5ZXIuYWRkKHRoaXMuX3VpTWFuYWdlcikpXG4gICAgICAgIGlmKGFwcEdhbWUucGxhdGZvcm0gPT0gJ3RvdXRpYW8nKXtcbiAgICAgICAgICAgIGFwcEdhbWUuc2NyZWVuQXV0by5wbGF5U2NyZWVuQ2FwKHRydWUpXG4gICAgICAgIH1cbiAgICAgICAgVXNlckluZm8udGltZVBhc3NlZCA9IDA7XG4gICAgICAgIFVzZXJJbmZvLnN0ZXBVc2VkID0gMDtcbiAgICAgICAgdGhpcy5zY2hlZHVsZShfPT57XG4gICAgICAgICAgICBVc2VySW5mby50aW1lUGFzc2VkICs9IDFcbiAgICAgICAgICAgIHRoaXMudGltZUxhYmVsLnN0cmluZyA9IFVzZXJJbmZvLnRpbWVQYXNzZWQgKyBcInNcIjtcbiAgICAgICAgICAgIHRoaXMuc3RlcExhYmVsLnN0cmluZyA9IFVzZXJJbmZvLnN0ZXBVc2VkICtcIuatpVwiXG4gICAgICAgIH0sMSlcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKXtcbiAgICAgICAgYXBwR2FtZS5nYW1lU2VydmVyUm9vbS5vZmYoY29uc3RzLkNMSUVOVF9HQU1FX1NUQVJULCB0aGlzLm9uR2FtZVN0YXJ0LHRoaXMpO1xuICAgIH1cbiAgICBvbkdhbWVTdGFydCgpe1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICBhcHBHYW1lLmJhbm5lci5wbGF5QmFubmVyKDIpOyAgICBcbiAgICAgICAgLy/mj5LlsY/lub/lkYpcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaPkuWxj+W5v+WRij09XCIpO1xuICAgICAgICAgICAgaWYoYXBwR2FtZS5pbnRlcnN0aXRpYWxBZCl7XG4gICAgICAgICAgICAgICAgYXBwR2FtZS5pbnRlcnN0aXRpYWxBZC5wbGF5QWQoXCLmj5LlsY9cIik7XG4gICAgICAgICAgICB9ICAgXG4gICAgICAgIH0sIDYwKTsgXG4gICAgICAgIC8v56ev5pyo5bm/5ZGKXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi56ev5pyo5bm/5ZGKPT1cIik7XG4gICAgICAgICAgICBpZihhcHBHYW1lLnFxYmxvY2thZCl7XG4gICAgICAgICAgICAgICAgYXBwR2FtZS5xcWJsb2NrYWQucGxheUJsb2NrYWQodHJ1ZSk7XG4gICAgICAgICAgICB9IFxuICAgICAgICB9LDMwKTtcbiAgICAgICBcbiAgICAgXG4gICBcbiAgICB9XG4gICAgb25Ub3VjaEJlZ2FuKGUpXG4gICAge1xuICAgICAgICBsZXQgdCA9IHRoaXM7XG4gICAgICAgIGlmICghdC5faXNHYW1lT3Zlcikge1xuICAgICAgICAgICAgLy8gdmFyIG4gPSB0LnRvdWNoWHRvU2NyZWVuWChlLnZpZXdYKVxuICAgICAgICAgICAgLy8gdmFyIGUgPSB0LnRvdWNoWXRvU2NyZWVuWShlLnZpZXdZKVxuICAgICAgICAgICAgLy8gdmFyIGkgPSB0LmZpbmRUaWxlQnlQb3MobiwgZSlcbiAgICAgICAgICAgIHZhciBwID0gZS5jdXJyZW50VG91Y2guZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgIHAgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocCk7XG4gICAgICAgICAgICB2YXIgaTpIZXhvblRpbGUgPSB0LmZpbmRUaWxlQnlQb3MocC54LHAueSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChudWxsICE9IGkgJiYgMCAhPSBpLmdldF9hbmltYWwoKSkge1xuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoUi5hdWRpb19kb3duLGZhbHNlKTtcbiAgICAgICAgICAgICAgICAvLyBqbi5wbGF5U291bmQoMClcbiAgICAgICAgICAgICAgICB0Ll9waWNrZWRUaWxlID0gaVxuICAgICAgICAgICAgICAgIHQucmVtb3ZlR3JpZEZyb21UaWxlKHQuX3BpY2tlZFRpbGUpXG4gICAgICAgICAgICAgICAgdC5fcGlja2VkVGlsZS5jb25uZWN0KG51bGwpXG4gICAgICAgICAgICAgICAgaWYobnVsbCAhPSB0Ll9waWNrZWRUaWxlLnRhcmdldFRpbGUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0LnJlbW92ZUdyaWRGcm9tVGlsZSh0Ll9waWNrZWRUaWxlLnRhcmdldFRpbGUpXG4gICAgICAgICAgICAgICAgICAgIHQuX3BpY2tlZFRpbGUudGFyZ2V0VGlsZS5jb25uZWN0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHQuX3BpY2tlZFRpbGUudGFyZ2V0VGlsZS5zZXRfaXNDb25uZWN0aW5nKGZhbHNlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0Ll9waWNrZWRUaWxlLnNldF9pc0Nvbm5lY3RpbmcoITApXG4gICAgICAgICAgICAgICAgaSA9IHQuX3BpY2tlZFRpbGUuZ2V0SGVhZCgpOyBcbiAgICAgICAgICAgICAgICBmb3IgKCA7bnVsbCAhPSBpOykgaS5zZXRfaXNDb25uZWN0aW5nKCEwKSxcbiAgICAgICAgICAgICAgICBpID0gaS5jb25uZWN0ZWRUaWxlO1xuICAgICAgICAgICAgICAgIC8vIHQuX3VpTWFuYWdlci5zaG93Rm9jdXModC5fcGlja2VkVGlsZS5nZXRfYW5pbWFsKCkpLFxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZvY3VzKHQuX3BpY2tlZFRpbGUuZ2V0X2FuaW1hbCgpKTtcbiAgICAgICAgICAgICAgICAvLyB0Ll91aU1hbmFnZXIubW92ZUZvY3VzKG4sIGUpXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMocCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoZWNrQ29tcGVsZXRlKClcbiAgICAgICAgICAgIC8vIDEgPT0gID8gMSA9PSB0LmNoZWNrRmlsbEFsbCgpID8gdC5fdWlNYW5hZ2VyLmhpZGVGaWxsQWxsUG9wdXAoKSA6IHQuX3VpTWFuYWdlci5zaG93RmlsbEFsbFBvcHVwKCkgOiB0Ll91aU1hbmFnZXIuaGlkZUZpbGxBbGxQb3B1cCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0NvbXBlbGV0ZSgpXG4gICAge1xuICAgICAgICBpZiggdGhpcy5jaGVja0Nvbm5lY3RlZEFsbCgpKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih0aGlzLmNoZWNrRmlsbEFsbCgpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIHQuX3VpTWFuYWdlci5oaWRlRmlsbEFsbFBvcHVwKClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vICB0Ll91aU1hbmFnZXIuc2hvd0ZpbGxBbGxQb3B1cCgpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy8gX3VpTWFuYWdlci5oaWRlRmlsbEFsbFBvcHVwKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzVGlsZUNvbm5lY3RlZCh0LCBlKSB7XG4gICAgICAgIHZhciBuLCBpID0gdC5fcm93O1xuICAgICAgICBuID0gdC5fY29sICsgKGkgPD0gdGhpcy5fcm93Q291bnQgLyAyID8gMCA6IHQuX3JvdyAtICh0aGlzLl9yb3dDb3VudCAvIDIgfCAwKSk7XG4gICAgICAgIHZhciBzLCBhID0gZS5fcm93O1xuICAgICAgICByZXR1cm4gcyA9IGUuX2NvbCArIChhIDw9IHRoaXMuX3Jvd0NvdW50IC8gMiA/IDAgOiBlLl9yb3cgLSAodGhpcy5fcm93Q291bnQgLyAyIHwgMCkpLFxuICAgICAgICBpIC0gMSA9PSBhICYmIG4gLSAxID09IHMgfHwgaSAtIDEgPT0gYSAmJiBuID09IHMgfHwgaSA9PSBhICYmIG4gLSAxID09IHMgfHwgaSA9PSBhICYmIG4gKyAxID09IHMgfHwgaSArIDEgPT0gYSAmJiBuID09IHMgfHwgaSArIDEgPT0gYSAmJiBuICsgMSA9PSBzID8gdHJ1ZTpmYWxzZVxuICAgIH1cblxuXG4gICAgb25Ub3VjaE1vdmVkKGUpXG4gICAge1xuICAgICAgICBsZXQgdCA9IHRoaXM7XG4gICAgICAgIGlmICghdC5faXNHYW1lT3Zlcikge1xuICAgICAgICAgICAgdmFyIHAgPSBlLmN1cnJlbnRUb3VjaC5nZXRMb2NhdGlvbigpO1xuICAgICAgICAgICAgcCA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwKTtcbiAgICAgICAgICAgIHZhciBpOkhleG9uVGlsZSA9IHQuZmluZFRpbGVCeVBvcyhwLngscC55KTtcblxuICAgICAgICAgICAgaWYgKG51bGwgIT0gdC5fcGlja2VkVGlsZSAmJiBudWxsICE9IGkpIGlmICh0LmlzVGlsZUNvbm5lY3RlZCh0Ll9waWNrZWRUaWxlLCBpKSkge1xuICAgICAgICAgICAgICAgIGlmICgwID09IGkuZ2V0X2FuaW1hbCgpKShudWxsID09IHQuX3BpY2tlZFRpbGUudGFyZ2V0VGlsZSB8fCBudWxsID09IHQuX3BpY2tlZFRpbGUucmV2ZXJzZUNvbm5lY3RlZFRpbGUpICYmICh0Ll9ncmlkTWFuYWdlci5zZXRTdGF0ZSh0Ll9waWNrZWRUaWxlLmdldF9yb3coKSwgdC5fcGlja2VkVGlsZS5nZXRfY29sKCksIGkuZ2V0X3JvdygpLCBpLmdldF9jb2woKSwgITApLCB0Ll9waWNrZWRUaWxlLmNvbm5lY3QoaSksIHQuX3BpY2tlZFRpbGUgPSBpLCB0Ll9waWNrZWRUaWxlLnNldF9pc0Nvbm5lY3RpbmcoITApKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpLmdldF9hbmltYWwoKSA9PSB0Ll9waWNrZWRUaWxlLmdldF9hbmltYWwoKSkgaWYgKGZhbHNlID09IGkuaXNDaGFuZ2FibGUgJiYgISBpLmVxdWFscyh0Ll9waWNrZWRUaWxlLmdldEhlYWQoKSkpIG51bGwgPT0gaS5yZXZlcnNlQ29ubmVjdGVkVGlsZSAmJiAodC5fZ3JpZE1hbmFnZXIuc2V0U3RhdGUodC5fcGlja2VkVGlsZS5nZXRfcm93KCksIHQuX3BpY2tlZFRpbGUuZ2V0X2NvbCgpLCBpLmdldF9yb3coKSwgaS5nZXRfY29sKCksICEwKSwgdC5fcGlja2VkVGlsZS5jb25uZWN0KGkpLCB0Ll9waWNrZWRUaWxlID0gaSk7XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodC5fcGlja2VkVGlsZSA9IGksIGkgPSB0Ll9waWNrZWRUaWxlOyBudWxsICE9IGkgJiYgbnVsbCAhPSBpLmNvbm5lY3RlZFRpbGU7KSB0Ll9ncmlkTWFuYWdlci5zZXRTdGF0ZShpLmdldF9yb3coKSwgaS5nZXRfY29sKCksIGkuY29ubmVjdGVkVGlsZS5nZXRfcm93KCksIGkuY29ubmVjdGVkVGlsZS5nZXRfY29sKCksICExKSxcbiAgICAgICAgICAgICAgICAgICAgaSA9IGkuY29ubmVjdGVkVGlsZTtcbiAgICAgICAgICAgICAgICAgICAgdC5fcGlja2VkVGlsZS5jb25uZWN0KG51bGwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpLmdldF9hbmltYWwoKSA9PSB0Ll9waWNrZWRUaWxlLmdldF9hbmltYWwoKSAmJiAhaS5lcXVhbHModC5fcGlja2VkVGlsZSkgJiYgbnVsbCAhPSBpLmNvbm5lY3RlZFRpbGUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHQuX3BpY2tlZFRpbGUgPSBpLCBpID0gdC5fcGlja2VkVGlsZTsgbnVsbCAhPSBpICYmIG51bGwgIT0gaS5jb25uZWN0ZWRUaWxlOykgdC5fZ3JpZE1hbmFnZXIuc2V0U3RhdGUoaS5nZXRfcm93KCksIGkuZ2V0X2NvbCgpLCBpLmNvbm5lY3RlZFRpbGUuZ2V0X3JvdygpLCBpLmNvbm5lY3RlZFRpbGUuZ2V0X2NvbCgpLCAhMSksXG4gICAgICAgICAgICAgICAgaSA9IGkuY29ubmVjdGVkVGlsZTtcbiAgICAgICAgICAgICAgICB0Ll9waWNrZWRUaWxlLmNvbm5lY3QobnVsbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKHApXG4gICAgICAgICAgICAvLyB0Ll91aU1hbmFnZXIubW92ZUZvY3VzKG4sIGUpLFxuICAgICAgICAgICAgLy90aGlzLmNoZWNrQ29tcGVsZXRlKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVG91Y2hFbmRlZCgpXG4gICAge1xuICAgICAgICBsZXQgdCA9IHRoaXM7XG4gICAgICAgIHZhciBlID0gZmFsc2U7XG4gICAgICAgIGlmICghdC5faXNHYW1lT3Zlcikge1xuICAgICAgICAgICAgaWYgKG51bGwgIT0gdC5fcGlja2VkVGlsZSkge1xuICAgICAgICAgICAgICAgIHZhciBuID0gdC5fcGlja2VkVGlsZS5nZXRIZWFkKCk7XG4gICAgICAgICAgICAgICAgZm9yIChudWxsICE9IHQuX3BpY2tlZFRpbGUuYW5pbWFsU3ByaXRlICYmIG51bGwgIT0gbiAmJiBudWxsICE9IG4uYW5pbWFsU3ByaXRlICYmIChlID0gdHJ1ZSwgdC5fcGlja2VkVGlsZS5hbmltYWxTcHJpdGUuY29ubmVjdGVkKCksIG4uYW5pbWFsU3ByaXRlLmNvbm5lY3RlZCgpKTsgbnVsbCAhPSBuOykgbi5zZXRfaXNDb25uZWN0aW5nKGZhbHNlKSxcbiAgICAgICAgICAgICAgICBuID0gbi5jb25uZWN0ZWRUaWxlO1xuICAgICAgICAgICAgICAgIHQuX21vdmVDb3VudCsrXG4gICAgICAgICAgICAgICAgVXNlckluZm8uc3RlcFVzZWQgKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0Ll9waWNrZWRUaWxlID0gbnVsbFxuICAgICAgICAgICAgLy8gdC5fdWlNYW5hZ2VyLmhpZGVGb2N1cygpLFxuICAgICAgICAgICAgdGhpcy5oaWRlRm9jdXMoKTtcbiAgICAgICAgICAgIGlmKCB0LmNoZWNrQ29ubmVjdGVkQWxsKCkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYodC5jaGVja0ZpbGxBbGwoKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHQuX3VpTWFuYWdlci5oaWRlRmlsbEFsbFBvcHVwKClcbiAgICAgICAgICAgICAgICAgICAgdC5faXNHYW1lT3ZlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIC8vIHQuX3VpTWFuYWdlci5zaG93Q2xlYXJQb3B1cCh0Ll9tb3ZlQ291bnQsIHQucGVyZmVjdE1vdmVDb3VudClcbiAgICAgICAgICAgICAgICAgICAgdC5kYW5jZUFsbCgpO1xuXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIC8vICB0Ll91aU1hbmFnZXIuc2hvd0ZpbGxBbGxQb3B1cCgpXG4gICAgICAgICAgICAgICAgICAgIFRvYXN0Lm1ha2UoXCLlv4Xpobvloavmu6HmiYDmnInmoLzlrZBcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAvLyBfdWlNYW5hZ2VyLmhpZGVGaWxsQWxsUG9wdXAoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZT09IHRydWUgJiYgIXQuX2lzR2FtZU92ZXIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gam4ucGxheVNvdW5kKDEpXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdChSLmF1ZGlvX2xpbmssZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gMSA9PSBlICYmIDAgPT0gdC5faXNHYW1lT3ZlciAmJiBqbi5wbGF5U291bmQoMSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dGb2N1cyhhbmltYWwpXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhhbmltYWwpO1xuICAgICAgICB0aGlzLmZvY3VzTm9kZS5hY3RpdmUgPSB0cnVlXG4gICAgICAgIHRoaXMuZm9jdXNOb2RlLnpJbmRleCA9IDEwMDtcbiAgICAgICAgdGhpcy5mb2N1c05vZGUuY29sb3IgPSBSLmNvbG9yc1thbmltYWxdLmNsb25lKCk7XG4gICAgfVxuXG4gICAgbW92ZUZvY3VzKHApXG4gICAge1xuICAgICAgICB0aGlzLmZvY3VzTm9kZS5wb3NpdGlvbiA9IHA7XG4gICAgfVxuXG4gICAgaGlkZUZvY3VzKClcbiAgICB7XG4gICAgICAgIHRoaXMuZm9jdXNOb2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgfVxuXG4gICAgZGFuY2VBbGwoKSB7XG4gICAgICAgIC8vIGpuLnBsYXlTb3VuZCgzKTtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdChSLmF1ZGlvX3dpbixmYWxzZSk7XG4gICAgICAgIGZvciAodmFyIHQgPSAwLGUgPSB0aGlzLl90aWxlTGlzdDsgdCA8IGUubGVuZ3RoOykge1xuICAgICAgICAgICAgdmFyIG4gPSBlW3RdOyArK3Q7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG4ubGVuZ3RoOykge1xuICAgICAgICAgICAgICAgIHZhciBzID0gbltpXTsgKytpLFxuICAgICAgICAgICAgICAgIG51bGwgIT0gcy5hbmltYWxTcHJpdGUgJiYgcy5hbmltYWxTcHJpdGUubG9vcEp1bXAoMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuc2hvd1dpbkRpYWxvZywxKVxuICAgIH1cblxuICAgIHNob3dXaW5EaWFsb2coKVxuICAgIHtcbiAgICAgICAgVmlld01hbmFnZXIuaW5zdGFuY2Uuc2hvdyhcIkdhbWUvV2luRGlhbG9nXCIpXG4gICAgfVxuXG4gICAgY2xpY2tfcGF1c2UoKVxuICAgIHtcbiAgICAgICAgaHR0cFV0aWxzLmh0dHBQb3N0KGNvbnN0cy5IVFRQX1JFQ09SRF9TRVJWRVIse3RpdGxlOifmuLjmiI/nlYzpnaInLGNvbnRlbnQ6J+eCueWHu+i/lOWbnid9LGZ1bmN0aW9uKCl7fSk7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL1BhdXNlRGlhbG9nXCIpXG4gICAgfVxuXG4gICAgY2xpY2tfc2hhcmUoKVxuICAgIHtcbiAgICAgIFxuICAgIH1cblxuICAgIHNldEZpZ3VyZSgpIHtcbiAgICAgICAgLy8gdGhpcy5fZmlndXJlTGF5ZXIgPSBuZXcgZyxcbiAgICAgICAgdGhpcy5fZmlndXJlTGlzdCA9IFtdXG4gICAgICAgIC8vIHRoaXMub3duZXIuYWRkQ2hpbGQodGhpcy5fZmlndXJlTGF5ZXIpO1xuICAgICAgICBmb3IgKHZhciB0ID0gW10sIGUgPSAwOyAxMCA+IGU7KSBlKyssIHQucHVzaChudWxsKTtcblxuICAgICAgICBmb3IgKHZhciBlID0gMCwgbiA9IHRoaXMuX2xldmVsRGF0YS5maWd1cmU7IGUgPCBuLmxlbmd0aDspIHtcbiAgICAgICAgICAgIHZhciBpID0gbltlXTtcbiAgICAgICAgICAgICsrZTtcbiAgICAgICAgICAgIHZhciBzOkhleG9uVGlsZSA9IHRoaXMuX3RpbGVMaXN0W2lbMF1dW2lbMV1dXG4gICAgICAgICAgICB2YXIgYSA9IHMuZ2V0X2JvcmRlclBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgIC8vIHMuYW5pbWFsU3ByaXRlID0gbmV3ICRuKGlbMl0sIGEuZ2V0X3goKSwgYS5nZXRfeSgpKVxuICAgICAgICAgICAgLy8gdGhpcy5vd25lci5hZGRDaGlsZCgobmV3IGcpLmFkZChzLmFuaW1hbFNwcml0ZSkpXG4gICAgICAgICAgICBsZXQgdHlwZSA9IGlbMl07XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKFIuYW5pbWFsUHJlZmFic1t0eXBlLTFdKVxuICAgICAgICAgICAgcy5hbmltYWxTcHJpdGUgPSBub2RlLmdldENvbXBvbmVudChBbmltYWwpO1xuICAgICAgICAgICAgLy8gcy5hbmltYWxTcHJpdGUudHlwZSA9IHR5cGU7XG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKGEueCxhLnkpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLnRpbGVMYXllcjtcbiAgICAgICAgICAgIG5vZGUuekluZGV4ID0gMTEwO1xuXG4gICAgICAgICAgICAvLyBhbmltYWwudHlwZSA9IHR5cGU7IFxuICAgICAgICAgICAgLy8gYW5pbWFsLnR4ID0gYS54IDsgXG5cbiAgICAgICAgICAgIHMuc2V0X2FuaW1hbChpWzJdKVxuICAgICAgICAgICAgcy5pc0NoYW5nYWJsZSA9IGZhbHNlIFxuICAgICAgICAgICAgdGhpcy5fZmlndXJlTGlzdC5wdXNoKHMpXG4gICAgICAgICAgICBudWxsID09IHRbaVsyXV0gPyB0W2lbMl1dID0gcyA6IChzLnRhcmdldFRpbGUgPSB0W2lbMl1dLCB0W2lbMl1dLnRhcmdldFRpbGUgPSBzKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGVyZmVjdE1vdmVDb3VudCA9IHRoaXMuX2ZpZ3VyZUxpc3QubGVuZ3RoIC8gMiB8IDBcbiAgICB9XG5cbiAgICBmaW5kVGlsZUJ5UG9zKHgsIHkpIHtcbiAgICAgICAgdmFyIG4gPSBudWxsXG4gICAgICAgIHZhciBpID0gMWU2XG4gICAgICAgIHZhciBzID0gY2MudjIoeCwgeSlcbiAgICAgICAgdmFyIHIgPSB0aGlzLl90aWxlTGlzdFxuICAgICAgICBmb3IgKHZhciBhID0gMDsgYSA8IHIubGVuZ3RoOysrYSkge1xuICAgICAgICAgICAgdmFyIG8gPSByW2FdO1xuICAgICAgICAgICAgZm9yICh2YXIgXyA9IDA7IF8gPCBvLmxlbmd0aDsrK18pIHtcbiAgICAgICAgICAgICAgICB2YXIgbCA9IG9bX11cbiAgICAgICAgICAgICAgICB2YXIgdHAgPSBvW19dLm5vZGUucG9zaXRpb247XG4gICAgICAgICAgICAgICAgdmFyIGggPSBzLnN1Yih0cCkubWFnKClcbiAgICAgICAgICAgICAgICBpZiAoaCA8IDUwICYmIGggPCBpICl7XG4gICAgICAgICAgICAgICAgICAgIGkgPSBoOyBcbiAgICAgICAgICAgICAgICAgICAgbiA9IGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIDQwID4gaCAmJiBpID4gaCAmJiAoaSA9IGgsIG4gPSBsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuXG4gICAgfVxuICAgIHJlbW92ZUdyaWRGcm9tVGlsZSh0KSB7XG4gICAgICAgIGZvciAoOyBudWxsICE9IHQgJiYgbnVsbCAhPSB0LmNvbm5lY3RlZFRpbGU7KSB0aGlzLl9ncmlkTWFuYWdlci5zZXRTdGF0ZSh0LmdldF9yb3coKSwgdC5nZXRfY29sKCksIHQuY29ubmVjdGVkVGlsZS5nZXRfcm93KCksIHQuY29ubmVjdGVkVGlsZS5nZXRfY29sKCksICExKSwgdCA9IHQuY29ubmVjdGVkVGlsZVxuICAgIH1cbiAgICBjaGVja0ZpbGxBbGwoKSB7XG4gICAgICAgIGZvciAodmFyIHQgPSAwLCBlID0gdGhpcy5fdGlsZUxpc3Q7IHQgPCBlLmxlbmd0aDspIHtcbiAgICAgICAgICAgIHZhciBuID0gZVt0XTtcbiAgICAgICAgICAgICsrdDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbi5sZW5ndGg7KSB7XG4gICAgICAgICAgICAgICAgdmFyIHMgPSBuW2ldO1xuICAgICAgICAgICAgICAgIGlmICgrK2ksIDAgPT0gcy5nZXRfYW5pbWFsKCkpIHJldHVybiAhMVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAhMFxuICAgIH1cbiAgICBjaGVja0Nvbm5lY3RlZEFsbCgpIHtcbiAgICAgICAgZm9yICh2YXIgdCA9IDAsIGUgPSB0aGlzLl90aWxlTGlzdDsgdCA8IGUubGVuZ3RoOykge1xuICAgICAgICAgICAgdmFyIG4gPSBlW3RdO1xuICAgICAgICAgICAgKyt0O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuLmxlbmd0aDspIHtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IG5baV07XG4gICAgICAgICAgICAgICAgaWYgKCsraSwgbnVsbCAhPSBzLnRhcmdldFRpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSBzLmdldEhlYWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHIgPSBzLmdldFRhaWwoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT0gcy50YXJnZXRUaWxlLmVxdWFscyhhKSAmJiAwID09IHMudGFyZ2V0VGlsZS5lcXVhbHMocikpIHJldHVybiAhMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gITBcbiAgICB9XG59Il19