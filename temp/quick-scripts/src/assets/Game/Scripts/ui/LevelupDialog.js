"use strict";
cc._RF.push(module, '192e1nHc39B4b1vo/mjTFG2', 'LevelupDialog');
// Game/Scripts/ui/LevelupDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Info_1 = require("../Info");
var View_1 = require("../../../framework/plugin_boosts/ui/View");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelupDialog = /** @class */ (function (_super) {
    __extends(LevelupDialog, _super);
    function LevelupDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.diamondLabel = null;
        _this.btnLabel = null;
        _this.tipLabel = null;
        _this.levelLabel = null;
        _this.mult = 1;
        _this.baseDiamond = 0;
        return _this;
    }
    LevelupDialog.prototype.onLoad = function () { };
    LevelupDialog.prototype.start = function () { };
    LevelupDialog.prototype.onShown = function (level, p) {
        //给钻石
        p = Math.min(p, 1);
        var diamond = Math.floor(Math.max(30 * p, 10));
        this.baseDiamond = diamond;
        this.diamondLabel.string = diamond.toString();
        this.levelLabel.string = cc.js.formatStr("- 第 %s 关 - ", level);
        // if(Math.random() > 0.7)
        // {
        //     this.mult = g.randomInt(3,6)
        //     this.btnLabel.string = this.mult +"倍领取"
        // }else{
        //     this.btnLabel.string = "双倍领取"
        //     this.mult = 2
        // }
        //this.tipLabel.string ="恭喜获得" + this.btnLabel.string +"奖励机会"
    };
    LevelupDialog.prototype.click_get = function () {
        Info_1.UserInfo.addDiamond(this.baseDiamond);
        Info_1.UserInfo.save();
        this.getComponent(View_1.default).hide();
    };
    LevelupDialog.prototype.share_suc = function () {
        Info_1.UserInfo.addDiamond(this.baseDiamond * this.mult);
        Info_1.UserInfo.save();
        this.getComponent(View_1.default).hide();
    };
    LevelupDialog.prototype.click_getex = function () {
        var choise = Info_1.UserInfo.getChoice(Info_1.ChoiceType.Levelup);
    };
    __decorate([
        property(cc.Label)
    ], LevelupDialog.prototype, "diamondLabel", void 0);
    __decorate([
        property(cc.Label)
    ], LevelupDialog.prototype, "btnLabel", void 0);
    __decorate([
        property(cc.Label)
    ], LevelupDialog.prototype, "tipLabel", void 0);
    __decorate([
        property(cc.Label)
    ], LevelupDialog.prototype, "levelLabel", void 0);
    LevelupDialog = __decorate([
        ccclass
    ], LevelupDialog);
    return LevelupDialog;
}(cc.Component));
exports.default = LevelupDialog;

cc._RF.pop();