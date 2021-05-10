
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/ShopDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1b7cbT64WtHxpoRfvlVr4EN', 'ShopDialog');
// Game/Scripts/ui/ShopDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ShopItemTemplate_1 = require("./ShopItemTemplate");
var SpriteFrameCache_1 = require("../../../framework/plugin_boosts/misc/SpriteFrameCache");
var Res_1 = require("../hex-lines-game/Res");
var Info_1 = require("../Info");
var ToastManager_1 = require("../../../framework/plugin_boosts/ui/ToastManager");
var Device_1 = require("../../../framework/plugin_boosts/gamesys/Device");
var Main_1 = require("../Main");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShopDialog = /** @class */ (function (_super) {
    __extends(ShopDialog, _super);
    function ShopDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollview = null;
        _this.freeDiamondLabel = null;
        _this.freeDiamondBtn = null;
        return _this;
    }
    ShopDialog.prototype.onLoad = function () {
        // this.scrollview
    };
    ShopDialog.prototype.start = function () {
    };
    ShopDialog.prototype.onShown = function () {
        var _this = this;
        // {"id":"1","mini_img":"a1","img":"a2","cost":"100"},
        this.scrollview.showlist(function (node, data, i) {
            // console.log(i,data);
            var item = node.getComponent(ShopItemTemplate_1.default);
            item.data = data;
            item.diamondLabel.string = data.cost;
            var isLocked = !Info_1.UserInfo.isUnlock(data.id);
            item.btnBuyNode.active = isLocked;
            item.maskNode.active = isLocked;
            item.borderNode.color = cc.Color.WHITE;
            item.titleLabel.string = data.text;
            item.selectedFlag.active = Info_1.UserInfo.selectedSkin == data.id;
            item.btnSignal.add(_this.click_unlock, _this);
            SpriteFrameCache_1.default.instance.getSpriteFrame("Game/Textures/ThumbBgs/" + data.mini_img + ".jpg").then(function (sf) { return item.bgmini.spriteFrame = sf; });
        }, Res_1.R.skinConfig.json);
        // this.refreshBtnStatus();
    };
    ShopDialog.prototype.refreshBtnStatus = function () {
        // if (G.isNextDay(UserInfo.shopFreeDiamondTime)) {
        //     this.freeDiamondLabel.string = "免费得50"
        //     UIFunctions.setButtonEnabled(this.freeDiamondBtn, true)
        // } else {
        //     this.freeDiamondLabel.string = "已领取"
        //     UIFunctions.setButtonEnabled(this.freeDiamondBtn, false)
        // }
    };
    ShopDialog.prototype.click_close = function () {
    };
    ShopDialog.prototype.share_succ = function () {
        Info_1.UserInfo.addDiamond(50);
        Info_1.UserInfo.shopFreeDiamondTime = new Date().getTime();
        Info_1.UserInfo.save();
        this.refreshBtnStatus();
    };
    ShopDialog.prototype.click_free = function () {
        var choice = Info_1.UserInfo.getChoice(Info_1.ChoiceType.Shop);
        if (choice == 1) {
        }
        else if (choice == 0) {
            this.share_succ();
        }
        else {
            //video
        }
    };
    ShopDialog.prototype.selectBg = function (data) {
        Info_1.UserInfo.selectedSkin = data.id;
        Info_1.UserInfo.save();
        this.onShown();
    };
    ShopDialog.prototype.click_unlock = function (data) {
        if (Info_1.UserInfo.isUnlock(data.id)) {
            //select 
            this.selectBg(data);
            ToastManager_1.Toast.make("已选择 " + data.text);
            return;
        }
        if (Info_1.UserInfo.diamond >= data.cost) {
            Info_1.UserInfo.diamond -= data.cost;
            Info_1.UserInfo.unlock(data.id);
            this.selectBg(data);
            ToastManager_1.Toast.make(cc.js.formatStr("%s已解锁", data.text));
            Device_1.default.playEffect(Res_1.R.audio_unlock);
            if (Main_1.default.instance)
                Main_1.default.instance.refreshRedpoints();
        }
        else {
            ToastManager_1.Toast.make("钻石不足");
            Device_1.default.playEffect(Res_1.R.audio_invalid);
        }
    };
    __decorate([
        property(cc.ScrollView)
    ], ShopDialog.prototype, "scrollview", void 0);
    __decorate([
        property(cc.Label)
    ], ShopDialog.prototype, "freeDiamondLabel", void 0);
    __decorate([
        property(cc.Button)
    ], ShopDialog.prototype, "freeDiamondBtn", void 0);
    ShopDialog = __decorate([
        ccclass
    ], ShopDialog);
    return ShopDialog;
}(cc.Component));
exports.default = ShopDialog;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXFNob3BEaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFrRDtBQUNsRCwyRkFBc0Y7QUFDdEYsNkNBQTBDO0FBRTFDLGdDQUErQztBQUMvQyxpRkFBeUU7QUFFekUsMEVBQXFFO0FBQ3JFLGdDQUEyQjtBQUlyQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQW1HQztRQWhHRyxnQkFBVSxHQUFrQixJQUFJLENBQUM7UUFHakMsc0JBQWdCLEdBQWEsSUFBSSxDQUFDO1FBR2xDLG9CQUFjLEdBQWMsSUFBSSxDQUFDOztJQTBGckMsQ0FBQztJQXhGRywyQkFBTSxHQUFOO1FBQ0ksa0JBQWtCO0lBQ3RCLENBQUM7SUFFRCwwQkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELDRCQUFPLEdBQVA7UUFBQSxpQkFrQkM7UUFqQkcsc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQUMsSUFBYSxFQUFFLElBQVMsRUFBRSxDQUFTO1lBQ3pELHVCQUF1QjtZQUN2QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLDBCQUFnQixDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNyQyxJQUFJLFFBQVEsR0FBRyxDQUFDLGVBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQTtZQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFD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QUMsZ0JBQWdCLEVBQUUsQ0FBQTtTQUN2QzthQUFNO1lBQ0gsb0JBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDbEIsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsT0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1NBQ3JDO0lBQ0wsQ0FBQztJQTlGRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO2tEQUNTO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ2U7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztzREFDYTtJQVRoQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBbUc5QjtJQUFELGlCQUFDO0NBbkdELEFBbUdDLENBbkd1QyxFQUFFLENBQUMsU0FBUyxHQW1HbkQ7a0JBbkdvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNob3BJdGVtVGVtcGxhdGUgZnJvbSBcIi4vU2hvcEl0ZW1UZW1wbGF0ZVwiO1xuaW1wb3J0IFNwcml0ZUZyYW1lQ2FjaGUgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL21pc2MvU3ByaXRlRnJhbWVDYWNoZVwiO1xuaW1wb3J0IHsgUiB9IGZyb20gXCIuLi9oZXgtbGluZXMtZ2FtZS9SZXNcIjtcblxuaW1wb3J0IHsgVXNlckluZm8sIENob2ljZVR5cGUgfSBmcm9tIFwiLi4vSW5mb1wiO1xuaW1wb3J0IHsgVG9hc3QgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVG9hc3RNYW5hZ2VyXCI7XG5pbXBvcnQgVUlGdW5jdGlvbnMgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1VJRnVuY3Rpb25zXCI7XG5pbXBvcnQgRGV2aWNlIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy9nYW1lc3lzL0RldmljZVwiO1xuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcbmltcG9ydCBHIGZyb21cIi4uL2cgLSAwMDFcIjtcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcERpYWxvZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuU2Nyb2xsVmlldylcbiAgICBzY3JvbGx2aWV3OiBjYy5TY3JvbGxWaWV3ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBmcmVlRGlhbW9uZExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIGZyZWVEaWFtb25kQnRuOiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICAvLyB0aGlzLnNjcm9sbHZpZXdcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIG9uU2hvd24oKSB7XG4gICAgICAgIC8vIHtcImlkXCI6XCIxXCIsXCJtaW5pX2ltZ1wiOlwiYTFcIixcImltZ1wiOlwiYTJcIixcImNvc3RcIjpcIjEwMFwifSxcbiAgICAgICAgdGhpcy5zY3JvbGx2aWV3LnNob3dsaXN0KChub2RlOiBjYy5Ob2RlLCBkYXRhOiBhbnksIGk6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaSxkYXRhKTtcbiAgICAgICAgICAgIGxldCBpdGVtID0gbm9kZS5nZXRDb21wb25lbnQoU2hvcEl0ZW1UZW1wbGF0ZSk7XG4gICAgICAgICAgICBpdGVtLmRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgaXRlbS5kaWFtb25kTGFiZWwuc3RyaW5nID0gZGF0YS5jb3N0O1xuICAgICAgICAgICAgbGV0IGlzTG9ja2VkID0gIVVzZXJJbmZvLmlzVW5sb2NrKGRhdGEuaWQpO1xuICAgICAgICAgICAgaXRlbS5idG5CdXlOb2RlLmFjdGl2ZSA9IGlzTG9ja2VkXG4gICAgICAgICAgICBpdGVtLm1hc2tOb2RlLmFjdGl2ZSA9IGlzTG9ja2VkO1xuICAgICAgICAgICAgaXRlbS5ib3JkZXJOb2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XG4gICAgICAgICAgICBpdGVtLnRpdGxlTGFiZWwuc3RyaW5nID0gZGF0YS50ZXh0O1xuICAgICAgICAgICAgaXRlbS5zZWxlY3RlZEZsYWcuYWN0aXZlID0gVXNlckluZm8uc2VsZWN0ZWRTa2luID09IGRhdGEuaWQ7XG4gICAgICAgICAgICBpdGVtLmJ0blNpZ25hbC5hZGQodGhpcy5jbGlja191bmxvY2ssIHRoaXMpXG4gICAgICAgICAgICBTcHJpdGVGcmFtZUNhY2hlLmluc3RhbmNlLmdldFNwcml0ZUZyYW1lKFwiR2FtZS9UZXh0dXJlcy9UaHVtYkJncy9cIiArIGRhdGEubWluaV9pbWcgKyBcIi5qcGdcIikudGhlbihzZiA9PiBpdGVtLmJnbWluaS5zcHJpdGVGcmFtZSA9IHNmKVxuICAgICAgICB9LCBSLnNraW5Db25maWcuanNvbilcblxuICAgICAgIC8vIHRoaXMucmVmcmVzaEJ0blN0YXR1cygpO1xuICAgIH1cblxuICAgIHJlZnJlc2hCdG5TdGF0dXMoKSB7XG4gICAgICAgIC8vIGlmIChHLmlzTmV4dERheShVc2VySW5mby5zaG9wRnJlZURpYW1vbmRUaW1lKSkge1xuICAgICAgICAvLyAgICAgdGhpcy5mcmVlRGlhbW9uZExhYmVsLnN0cmluZyA9IFwi5YWN6LS55b6XNTBcIlxuICAgICAgICAvLyAgICAgVUlGdW5jdGlvbnMuc2V0QnV0dG9uRW5hYmxlZCh0aGlzLmZyZWVEaWFtb25kQnRuLCB0cnVlKVxuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgdGhpcy5mcmVlRGlhbW9uZExhYmVsLnN0cmluZyA9IFwi5bey6aKG5Y+WXCJcbiAgICAgICAgLy8gICAgIFVJRnVuY3Rpb25zLnNldEJ1dHRvbkVuYWJsZWQodGhpcy5mcmVlRGlhbW9uZEJ0biwgZmFsc2UpXG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBjbGlja19jbG9zZSgpIHtcblxuICAgIH1cblxuICAgIHNoYXJlX3N1Y2MoKSB7XG4gICAgICAgIFVzZXJJbmZvLmFkZERpYW1vbmQoNTApO1xuICAgICAgICBVc2VySW5mby5zaG9wRnJlZURpYW1vbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIFVzZXJJbmZvLnNhdmUoKVxuICAgICAgICB0aGlzLnJlZnJlc2hCdG5TdGF0dXMoKTtcbiAgICB9XG5cbiAgICBjbGlja19mcmVlKCkge1xuICAgICAgICBsZXQgY2hvaWNlID0gVXNlckluZm8uZ2V0Q2hvaWNlKENob2ljZVR5cGUuU2hvcClcbiAgICAgICAgaWYgKGNob2ljZSA9PSAxKSB7XG4gICAgICAgIFxuICAgICAgICB9IGVsc2UgaWYgKGNob2ljZSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXJlX3N1Y2MoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy92aWRlb1xuICAgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdEJnKGRhdGEpIHtcbiAgICAgICAgVXNlckluZm8uc2VsZWN0ZWRTa2luID0gZGF0YS5pZDtcbiAgICAgICAgVXNlckluZm8uc2F2ZSgpXG4gICAgICAgIHRoaXMub25TaG93bigpO1xuICAgIH1cblxuICAgIGNsaWNrX3VubG9jayhkYXRhKSB7XG4gICAgICAgIGlmIChVc2VySW5mby5pc1VubG9jayhkYXRhLmlkKSkge1xuICAgICAgICAgICAgLy9zZWxlY3QgXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEJnKGRhdGEpO1xuICAgICAgICAgICAgVG9hc3QubWFrZShcIuW3sumAieaLqSBcIiArIGRhdGEudGV4dClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVXNlckluZm8uZGlhbW9uZCA+PSBkYXRhLmNvc3QpIHtcbiAgICAgICAgICAgIFVzZXJJbmZvLmRpYW1vbmQgLT0gZGF0YS5jb3N0O1xuICAgICAgICAgICAgVXNlckluZm8udW5sb2NrKGRhdGEuaWQpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RCZyhkYXRhKVxuICAgICAgICAgICAgVG9hc3QubWFrZShjYy5qcy5mb3JtYXRTdHIoXCIlc+W3suino+mUgVwiLCBkYXRhLnRleHQpKVxuICAgICAgICAgICAgRGV2aWNlLnBsYXlFZmZlY3QoUi5hdWRpb191bmxvY2spXG4gICAgICAgICAgICBpZiAoTWFpbi5pbnN0YW5jZSlcbiAgICAgICAgICAgICAgICBNYWluLmluc3RhbmNlLnJlZnJlc2hSZWRwb2ludHMoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgVG9hc3QubWFrZShcIumSu+efs+S4jei2s1wiKVxuICAgICAgICAgICAgRGV2aWNlLnBsYXlFZmZlY3QoUi5hdWRpb19pbnZhbGlkKVxuICAgICAgICB9XG4gICAgfVxuXG59Il19