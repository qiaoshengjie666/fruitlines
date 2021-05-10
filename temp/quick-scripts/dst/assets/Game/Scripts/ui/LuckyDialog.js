
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/LuckyDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a94275+JmtMx6iZb18iwKTe', 'LuckyDialog');
// Game/Scripts/ui/LuckyDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ToastManager_1 = require("../../../framework/plugin_boosts/ui/ToastManager");
var ViewManager_1 = require("../../../framework/plugin_boosts/ui/ViewManager");
var View_1 = require("../../../framework/plugin_boosts/ui/View");
var Info_1 = require("../Info");
var Device_1 = require("../../../framework/plugin_boosts/gamesys/Device");
var Res_1 = require("../hex-lines-game/Res");
var UIFunctions_1 = require("../../../framework/plugin_boosts/ui/UIFunctions");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LuckyDialog = /** @class */ (function (_super) {
    __extends(LuckyDialog, _super);
    function LuckyDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._canRotate = true;
        _this.sprites = [];
        _this.labels = [];
        _this.btn_freedraw = null;
        _this.btn_videodraw = null;
        _this.freedrawTip = null;
        _this.drawLabel = null;
        // click_draw()
        // {
        // }
        _this.pool = [];
        _this.isGreaterDate = function (now, before) {
            var diff = now.getTime() - before.getTime();
            if (diff > 86400000) // 24*60*60*1000
             {
                return true;
            }
            else {
                if (diff > 0)
                    return now.getDate() != before.getDate();
                else
                    return false;
            }
        };
        return _this;
    }
    LuckyDialog_1 = LuckyDialog;
    LuckyDialog.prototype.start = function () { };
    LuckyDialog.prototype.share_succ = function () {
        this.startDraw();
        Info_1.UserInfo.freedrawTime = new Date().getTime();
        Info_1.UserInfo.save();
        //  Main.instance.refreshRedpoints()
        this.onShown();
    };
    LuckyDialog.prototype.click_freeedraw = function () {
        // if (g.isNextDay(UserInfo.freedrawTime))
        // {
        //     this.share_succ()
        // }
    };
    LuckyDialog.prototype.onLoad = function () {
        for (var i = 0; i < Res_1.R.luckyConfig.json.length; i++) {
            var cfg = Res_1.R.luckyConfig.json[i];
            var chance = parseFloat(cfg.chance);
            for (var j = 0; j < chance * 2; j++) {
                this.pool.push(i);
            }
        }
        this.pool.shuffle();
        console.log(this.pool);
    };
    LuckyDialog.prototype.startDraw = function () {
        var id = g.getRandomInArray(this.pool);
        this.startWheel(id);
        Device_1.default.playEffect(Res_1.R.audio_draw);
    };
    LuckyDialog.prototype.isNextDay = function (timeSec) {
        return this.isGreaterDate(new Date(), new Date(timeSec));
    };
    // 5次
    LuckyDialog.prototype.click_videodraw = function () {
        if (Info_1.UserInfo.luckyVideoWatchCount >= LuckyDialog_1.MaxVideoCount) {
            if (this.isNextDay(Info_1.UserInfo.luckyVideoWatchTime)) {
                Info_1.UserInfo.luckyVideoWatchCount = 0;
                Info_1.UserInfo.luckyVideoWatchTime = new Date().getTime();
            }
            else {
                return;
            }
        }
        else {
        }
    };
    LuckyDialog.prototype.calculateAngle = function (index) {
        var angle = -(index - 1) * 60 - 30 - 4 * 360 - this.wheelSp.node.rotation % 360;
        return angle;
    };
    LuckyDialog.prototype.onShown = function () {
        if (Info_1.UserInfo.luckyVideoWatchCount >= LuckyDialog_1.MaxVideoCount) {
            this.drawLabel.string = "已用完";
            UIFunctions_1.default.setButtonEnabled(this.btn_videodraw, false);
        }
        else {
            this.drawLabel.string = "看视频抽奖";
            UIFunctions_1.default.setButtonEnabled(this.btn_videodraw, true);
        }
        if (g.isGreaterDate(new Date(), new Date(Info_1.UserInfo.freedrawTime))) {
            //free draw 
            this.btn_freedraw.interactable = true;
            this.btn_freedraw.node.opacity = 255;
            this.freedrawTip.active = false;
        }
        else {
            this.btn_freedraw.interactable = false;
            this.btn_freedraw.node.opacity = 100;
            this.freedrawTip.active = true;
        }
        for (var i = 0; i < Res_1.R.luckyConfig.json.length; i++) {
            var cfg = Res_1.R.luckyConfig.json[i];
            this.labels[i].string = cfg.gold_reward + "";
        }
    };
    LuckyDialog.prototype.startWheel = function (id) {
        console.log("target wheel:", id);
        var angle = this.calculateAngle(id);
        if (!this._canRotate) {
            ToastManager_1.Toast.make('正在给您挑选奖品...');
            return;
        }
        this._canRotate = false;
        var stage3 = cc.rotateBy(Math.abs(angle / 400), angle);
        var callFunc = cc.callFunc(function () {
            this._canRotate = true;
            this.showRes(id);
        }.bind(this));
        var sequence = cc.sequence(stage3, callFunc);
        this.wheelSp.node.runAction(sequence.easing(cc.easeQuadraticActionInOut()));
    };
    LuckyDialog.prototype.showRes = function (id) {
        var cfg = Res_1.R.luckyConfig.json[id];
        var gold = !isNaN((Number(cfg.gold_reward)));
        if (gold) {
            this.getComponent(View_1.default).hide();
            ViewManager_1.default.instance.show("Game/GetDialog", cfg.gold_reward);
        }
        else {
            //神秘
            ToastManager_1.Toast.make("恭喜你抽中了 " + cfg.gold_reward);
            Info_1.UserInfo.unlock(g.randomInt(0, 6));
            // Device.playEffect(R.audio_unlock);
        }
    };
    LuckyDialog.prototype.update = function (dt) {
    };
    LuckyDialog.prototype.click_close = function () {
        if (!this._canRotate) {
            ToastManager_1.Toast.make('正在给您挑选奖品...');
            return;
        }
        this.getComponent(View_1.default).hide();
    };
    var LuckyDialog_1;
    LuckyDialog.MaxVideoCount = 5;
    __decorate([
        property(cc.Sprite)
    ], LuckyDialog.prototype, "wheelSp", void 0);
    __decorate([
        property([cc.Sprite])
    ], LuckyDialog.prototype, "sprites", void 0);
    __decorate([
        property([cc.Label])
    ], LuckyDialog.prototype, "labels", void 0);
    __decorate([
        property(cc.Button)
    ], LuckyDialog.prototype, "btn_freedraw", void 0);
    __decorate([
        property(cc.Button)
    ], LuckyDialog.prototype, "btn_videodraw", void 0);
    __decorate([
        property(cc.Node)
    ], LuckyDialog.prototype, "freedrawTip", void 0);
    __decorate([
        property(cc.Label)
    ], LuckyDialog.prototype, "drawLabel", void 0);
    LuckyDialog = LuckyDialog_1 = __decorate([
        ccclass
    ], LuckyDialog);
    return LuckyDialog;
}(cc.Component));
exports.default = LuckyDialog;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXEx1Y2t5RGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRkFBeUU7QUFDekUsK0VBQTBFO0FBQzFFLGlFQUE0RDtBQUM1RCxnQ0FBbUM7QUFFbkMsMEVBQXFFO0FBQ3JFLDZDQUEwQztBQUMxQywrRUFBMEU7QUFHcEUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUFxTUM7UUE3TEcsZ0JBQVUsR0FBRyxJQUFJLENBQUM7UUFHbEIsYUFBTyxHQUFlLEVBQUUsQ0FBQTtRQUd4QixZQUFNLEdBQWMsRUFBRSxDQUFBO1FBR3RCLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLG1CQUFhLEdBQWEsSUFBSSxDQUFDO1FBRy9CLGlCQUFXLEdBQVcsSUFBSSxDQUFDO1FBSTNCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFJMUIsZUFBZTtRQUNmLElBQUk7UUFFSixJQUFJO1FBRUosVUFBSSxHQUFHLEVBQUUsQ0FBQTtRQTRDVCxtQkFBYSxHQUFHLFVBQVMsR0FBRyxFQUFDLE1BQU07WUFFL0IsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUMzQyxJQUFHLElBQUksR0FBRyxRQUFRLEVBQUUsZ0JBQWdCO2FBQ3BDO2dCQUNJLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7aUJBQUk7Z0JBQ0QsSUFBSSxJQUFJLEdBQUcsQ0FBQztvQkFDUixPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7O29CQUV4QyxPQUFPLEtBQUssQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQzs7SUF5R04sQ0FBQztvQkFyTW9CLFdBQVc7SUFHNUIsMkJBQUssR0FB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Q29udGVudCI6WyJpbXBvcnQgeyBUb2FzdCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9Ub2FzdE1hbmFnZXJcIjtcbmltcG9ydCBWaWV3TWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVmlld01hbmFnZXJcIjtcbmltcG9ydCBWaWV3IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9WaWV3XCI7XG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuLi9JbmZvXCI7XG5cbmltcG9ydCBEZXZpY2UgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL2dhbWVzeXMvRGV2aWNlXCI7XG5pbXBvcnQgeyBSIH0gZnJvbSBcIi4uL2hleC1saW5lcy1nYW1lL1Jlc1wiO1xuaW1wb3J0IFVJRnVuY3Rpb25zIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9VSUZ1bmN0aW9uc1wiO1xuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMdWNreURpYWxvZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBcbiAgICBzdGFydCAoKSB7fVxuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICB3aGVlbFNwOmNjLlNwcml0ZVxuXG4gICAgX2NhblJvdGF0ZSA9IHRydWU7XG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZV0pXG4gICAgc3ByaXRlczpjYy5TcHJpdGVbXSA9IFtdXG5cbiAgICBAcHJvcGVydHkoW2NjLkxhYmVsXSlcbiAgICBsYWJlbHM6Y2MuTGFiZWxbXSA9IFtdXG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIGJ0bl9mcmVlZHJhdzpjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBidG5fdmlkZW9kcmF3OmNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBmcmVlZHJhd1RpcDpjYy5Ob2RlID0gbnVsbDtcblxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGRyYXdMYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBzdGF0aWMgTWF4VmlkZW9Db3VudCA9IDU7XG5cbiAgICAvLyBjbGlja19kcmF3KClcbiAgICAvLyB7XG5cbiAgICAvLyB9XG5cbiAgICBwb29sID0gW11cbiAgICBcblxuICAgIHNoYXJlX3N1Y2MoKVxuICAgIHtcbiAgICAgICAgdGhpcy5zdGFydERyYXcoKTtcbiAgICAgICAgVXNlckluZm8uZnJlZWRyYXdUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgVXNlckluZm8uc2F2ZSgpXG4gICAgICAvLyAgTWFpbi5pbnN0YW5jZS5yZWZyZXNoUmVkcG9pbnRzKClcbiAgICAgICAgdGhpcy5vblNob3duKCk7XG4gICAgfVxuXG4gICAgY2xpY2tfZnJlZWVkcmF3KClcbiAgICB7XG4gICAgICAgIC8vIGlmIChnLmlzTmV4dERheShVc2VySW5mby5mcmVlZHJhd1RpbWUpKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICB0aGlzLnNoYXJlX3N1Y2MoKVxuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAgO2kgPCBSLmx1Y2t5Q29uZmlnLmpzb24ubGVuZ3RoOyBpICsrKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY2ZnID0gUi5sdWNreUNvbmZpZy5qc29uW2ldO1xuICAgICAgICAgICAgbGV0IGNoYW5jZSA9IHBhcnNlRmxvYXQoY2ZnLmNoYW5jZSlcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwIDsgaiA8IGNoYW5jZSAqIDIgOyBqKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb29sLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb29sLnNodWZmbGUoKVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBvb2wpO1xuICAgIH1cblxuICAgIHN0YXJ0RHJhdygpXG4gICAge1xuICAgICAgICBsZXQgaWQgPSBnLmdldFJhbmRvbUluQXJyYXkodGhpcy5wb29sKVxuICAgICAgICB0aGlzLnN0YXJ0V2hlZWwoaWQpXG4gICAgICAgIERldmljZS5wbGF5RWZmZWN0KFIuYXVkaW9fZHJhdyk7XG4gICAgfVxuICAgIGlzTmV4dERheSh0aW1lU2VjKVxuICAgIHtcbiAgICByZXR1cm4gdGhpcy5pc0dyZWF0ZXJEYXRlKG5ldyBEYXRlKCksbmV3IERhdGUodGltZVNlYykpXG4gICAgfVxuICAgIGlzR3JlYXRlckRhdGUgPSBmdW5jdGlvbihub3csYmVmb3JlKVxuICAgIHtcbiAgICAgICAgdmFyIGRpZmYgPSBub3cuZ2V0VGltZSgpIC0gYmVmb3JlLmdldFRpbWUoKSBcbiAgICAgICAgaWYoZGlmZiA+IDg2NDAwMDAwKSAvLyAyNCo2MCo2MCoxMDAwXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGlmIChkaWZmID4gMCApXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vdy5nZXREYXRlKCkgIT0gYmVmb3JlLmdldERhdGUoKVxuICAgICAgICAgICAgZWxzZSBcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IFxuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyA15qyhXG4gICAgY2xpY2tfdmlkZW9kcmF3KClcbiAgICB7XG4gICAgICAgIGlmIChVc2VySW5mby5sdWNreVZpZGVvV2F0Y2hDb3VudCA+PSBMdWNreURpYWxvZy5NYXhWaWRlb0NvdW50KVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih0aGlzLmlzTmV4dERheShVc2VySW5mby5sdWNreVZpZGVvV2F0Y2hUaW1lKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVc2VySW5mby5sdWNreVZpZGVvV2F0Y2hDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgVXNlckluZm8ubHVja3lWaWRlb1dhdGNoVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiBcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICBjYWxjdWxhdGVBbmdsZShpbmRleDpudW1iZXIpey8v5aWW5ZOB55qEaW5kZXjku44w5byA5aeLXG4gICAgICAgIGxldCBhbmdsZSA9IC0oaW5kZXgtMSkgKiA2MCAtIDMwICAtICA0ICogMzYwIC0gIHRoaXMud2hlZWxTcC5ub2RlLnJvdGF0aW9uICUzNjAgXG4gICAgICAgIHJldHVybiBhbmdsZVxuICAgIH1cblxuICAgIG9uU2hvd24oKVxuICAgIHtcbiAgICAgICAgaWYgKFVzZXJJbmZvLmx1Y2t5VmlkZW9XYXRjaENvdW50ID49ICBMdWNreURpYWxvZy5NYXhWaWRlb0NvdW50KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmRyYXdMYWJlbC5zdHJpbmcgPSBcIuW3sueUqOWujFwiXG4gICAgICAgICAgICBVSUZ1bmN0aW9ucy5zZXRCdXR0b25FbmFibGVkKHRoaXMuYnRuX3ZpZGVvZHJhdyxmYWxzZSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmRyYXdMYWJlbC5zdHJpbmcgPSBcIueci+inhumikeaKveWlllwiXG4gICAgICAgICAgICBVSUZ1bmN0aW9ucy5zZXRCdXR0b25FbmFibGVkKHRoaXMuYnRuX3ZpZGVvZHJhdyx0cnVlKVxuICAgICAgICB9XG4gICAgICAgIGlmIChnLmlzR3JlYXRlckRhdGUobmV3IERhdGUoKSwgIG5ldyBEYXRlKFVzZXJJbmZvLmZyZWVkcmF3VGltZSkpIClcbiAgICAgICAge1xuICAgICAgICAgICAgLy9mcmVlIGRyYXcgXG4gICAgICAgICAgICB0aGlzLmJ0bl9mcmVlZHJhdy5pbnRlcmFjdGFibGUgPSB0cnVlXG4gICAgICAgICAgICB0aGlzLmJ0bl9mcmVlZHJhdy5ub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgICAgICB0aGlzLmZyZWVkcmF3VGlwLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5idG5fZnJlZWRyYXcuaW50ZXJhY3RhYmxlID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuYnRuX2ZyZWVkcmF3Lm5vZGUub3BhY2l0eSA9IDEwMDtcbiAgICAgICAgICAgIHRoaXMuZnJlZWRyYXdUaXAuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwIDsgaTwgUi5sdWNreUNvbmZpZy5qc29uLmxlbmd0aDsgaSArKylcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IGNmZyA9IFIubHVja3lDb25maWcuanNvbltpXVxuICAgICAgICAgICAgdGhpcy5sYWJlbHNbaV0uc3RyaW5nID0gY2ZnLmdvbGRfcmV3YXJkICtcIlwiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydFdoZWVsKGlkKVxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0YXJnZXQgd2hlZWw6XCIgLGlkKTtcbiAgICAgICAgbGV0IGFuZ2xlID0gdGhpcy5jYWxjdWxhdGVBbmdsZShpZClcbiAgICAgICAgaWYgKCF0aGlzLl9jYW5Sb3RhdGUpe1xuICAgICAgICAgICAgVG9hc3QubWFrZSgn5q2j5Zyo57uZ5oKo5oyR6YCJ5aWW5ZOBLi4uJyk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jYW5Sb3RhdGUgPSBmYWxzZVxuXG4gICAgICAgIGxldCBzdGFnZTMgPSBjYy5yb3RhdGVCeShNYXRoLmFicyhhbmdsZS80MDApLGFuZ2xlKVxuICAgICAgICBsZXQgY2FsbEZ1bmMgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGhpcy5fY2FuUm90YXRlID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy5zaG93UmVzKGlkKVxuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIGxldCBzZXF1ZW5jZSA9IGNjLnNlcXVlbmNlKHN0YWdlMyxjYWxsRnVuYylcbiAgICAgICAgdGhpcy53aGVlbFNwLm5vZGUucnVuQWN0aW9uKHNlcXVlbmNlLmVhc2luZyhjYy5lYXNlUXVhZHJhdGljQWN0aW9uSW5PdXQoKSkpXG4gICAgfVxuXG4gICAgc2hvd1JlcyhpZClcbiAgICB7XG4gICAgICAgIGxldCBjZmcgPSBSLmx1Y2t5Q29uZmlnLmpzb25baWRdXG4gICAgICAgIGxldCBnb2xkID0gIWlzTmFOKChOdW1iZXIoY2ZnLmdvbGRfcmV3YXJkKSkpXG4gICAgICAgIGlmKGdvbGQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KFZpZXcpLmhpZGUoKVxuICAgICAgICAgICAgVmlld01hbmFnZXIuaW5zdGFuY2Uuc2hvdyhcIkdhbWUvR2V0RGlhbG9nXCIsY2ZnLmdvbGRfcmV3YXJkKVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAvL+elnuenmFxuICAgICAgICAgICAgVG9hc3QubWFrZShcIuaBreWWnOS9oOaKveS4reS6hiBcIiArIGNmZy5nb2xkX3Jld2FyZCk7XG4gICAgICAgICAgICBVc2VySW5mby51bmxvY2soZy5yYW5kb21JbnQoMCw2KSk7XG4gICAgICAgICAgICAvLyBEZXZpY2UucGxheUVmZmVjdChSLmF1ZGlvX3VubG9jayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpIHtcblxuICAgIH1cblxuICAgIGNsaWNrX2Nsb3NlKClcbiAgICB7XG4gICAgICAgIGlmICghdGhpcy5fY2FuUm90YXRlKXtcbiAgICAgICAgICAgIFRvYXN0Lm1ha2UoJ+ato+WcqOe7meaCqOaMkemAieWlluWTgS4uLicpO1xuICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KFZpZXcpLmhpZGUoKVxuICAgIH1cblxuXG59Il19