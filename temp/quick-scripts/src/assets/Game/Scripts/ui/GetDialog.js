"use strict";
cc._RF.push(module, '714f07aCe9N55KDdTLTUVv8', 'GetDialog');
// Game/Scripts/ui/GetDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var View_1 = require("../../../framework/plugin_boosts/ui/View");
var Info_1 = require("../Info");
var ViewManager_1 = require("../../../framework/plugin_boosts/ui/ViewManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GetDialog = /** @class */ (function (_super) {
    __extends(GetDialog, _super);
    function GetDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.diamondLabel = null;
        _this.count = 0;
        _this.node_close = null;
        return _this;
    }
    GetDialog.prototype.onLoad = function () { };
    GetDialog.prototype.start = function () { };
    GetDialog.prototype.share_suc = function () {
        Info_1.UserInfo.addDiamond(this.count * 2);
        Info_1.UserInfo.save();
        // Device.playEffect(R.audio_get_diamond)
        this.getComponent(View_1.default).hide();
        ViewManager_1.default.instance.show("Game/LuckyDialog");
    };
    GetDialog.prototype.click_double = function () {
        //share 
        //if share suc 
        // this.share_suc()
        var choice = Info_1.UserInfo.getChoice(Info_1.ChoiceType.Get);
        if (choice == 1) {
        }
        else if (choice == 0) {
            this.share_suc();
        }
        else {
            //video\
        }
    };
    GetDialog.prototype.onShown = function (count) {
        this.count = count;
        // SpriteFrameCache.instance.getSpriteFrame("Game/textures/car/" + cfg.img).then(sf=>this.icon.spriteFrame= sf);
        this.diamondLabel.string = "+" + count;
        this.node_close.active = false;
        this.unschedule(this.delayShow);
        this.scheduleOnce(this.delayShow, 2);
    };
    GetDialog.prototype.delayShow = function () {
        this.node_close.active = true;
    };
    GetDialog.prototype.click_no = function () {
        this.getComponent(View_1.default).hide();
        Info_1.UserInfo.addDiamond(this.count);
        Info_1.UserInfo.save();
        // Device.playEffect(R.audio_get_diamond)
        ViewManager_1.default.instance.show("Game/LuckyDialog");
    };
    __decorate([
        property(cc.Label)
    ], GetDialog.prototype, "diamondLabel", void 0);
    __decorate([
        property(cc.Node)
    ], GetDialog.prototype, "node_close", void 0);
    GetDialog = __decorate([
        ccclass
    ], GetDialog);
    return GetDialog;
}(cc.Component));
exports.default = GetDialog;

cc._RF.pop();