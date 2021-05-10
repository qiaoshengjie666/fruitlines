
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/GetDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXEdldERpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQTREO0FBQzVELGdDQUErQztBQUcvQywrRUFBMEU7QUFJcEUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQVk7SUFBbkQ7UUFBQSxxRUFnRUM7UUExREcsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFFN0IsV0FBSyxHQUFVLENBQUMsQ0FBQztRQUdqQixnQkFBVSxHQUFZLElBQUksQ0FBQzs7SUFxRC9CLENBQUM7SUE5REcsMEJBQU0sR0FBTixjQUFXLENBQUM7SUFDWix5QkFBSyxHQUFMLGNBQVUsQ0FBQztJQVdYLDZCQUFTLEdBQVQ7UUFFSSxlQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFFLENBQUE7UUFDcEMsZUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLHlDQUF5QztRQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLHFCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBQ2pELENBQUM7SUFFRCxnQ0FBWSxHQUFaO1FBRUksUUFBUTtRQUNSLGVBQWU7UUFDZixtQkFBbUI7UUFDbkIsSUFBSSxNQUFNLEdBQUcsZUFBUSxDQUFDLFNBQVMsQ0FBQyxpQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQy9DLElBQUcsTUFBTSxJQUFJLENBQUMsRUFDZDtTQUVDO2FBQUssSUFBRyxNQUFNLElBQUksQ0FBQyxFQUNwQjtZQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtTQUNuQjthQUFLO1lBQ0YsUUFBUTtTQUVYO0lBQ0wsQ0FBQztJQUVELDJCQUFPLEdBQVAsVUFBUSxLQUFLO1FBRVQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsZ0hBQWdIO1FBQ2hILElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFJLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBRUQsNkJBQVMsR0FBVDtRQUVJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtJQUNqQyxDQUFDO0lBRUQsNEJBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IsZUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUE7UUFDaEMsZUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2YseUNBQXlDO1FBQ3pDLHFCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBQ2pELENBQUM7SUF6REQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDVTtJQUs3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNTO0lBWFYsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQWdFN0I7SUFBRCxnQkFBQztDQWhFRCxBQWdFQyxDQWhFc0MsRUFBRSxDQUFDLFNBQVMsR0FnRWxEO2tCQWhFb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaWV3IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9WaWV3XCI7XG5pbXBvcnQgeyBVc2VySW5mbywgQ2hvaWNlVHlwZSB9IGZyb20gXCIuLi9JbmZvXCI7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9Ub2FzdE1hbmFnZXJcIjtcbmltcG9ydCBMdWNreURpYWxvZyBmcm9tIFwiLi9MdWNreURpYWxvZ1wiO1xuaW1wb3J0IFZpZXdNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9WaWV3TWFuYWdlclwiO1xuaW1wb3J0IERldmljZSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvZ2FtZXN5cy9EZXZpY2VcIjtcblxuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdldERpYWxvZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBvbkxvYWQgKCkge31cbiAgICBzdGFydCAoKSB7fVxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGRpYW1vbmRMYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBjb3VudDpudW1iZXIgPSAwO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbm9kZV9jbG9zZTpjYy5Ob2RlID0gIG51bGw7XG5cblxuICAgIHNoYXJlX3N1YygpXG4gICAge1xuICAgICAgICBVc2VySW5mby5hZGREaWFtb25kKHRoaXMuY291bnQgKiAyIClcbiAgICAgICAgVXNlckluZm8uc2F2ZSgpO1xuICAgICAgICAvLyBEZXZpY2UucGxheUVmZmVjdChSLmF1ZGlvX2dldF9kaWFtb25kKVxuICAgICAgICB0aGlzLmdldENvbXBvbmVudChWaWV3KS5oaWRlKCk7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL0x1Y2t5RGlhbG9nXCIpXG4gICAgfVxuXG4gICAgY2xpY2tfZG91YmxlKClcbiAgICB7XG4gICAgICAgIC8vc2hhcmUgXG4gICAgICAgIC8vaWYgc2hhcmUgc3VjIFxuICAgICAgICAvLyB0aGlzLnNoYXJlX3N1YygpXG4gICAgICAgIGxldCBjaG9pY2UgPSBVc2VySW5mby5nZXRDaG9pY2UoQ2hvaWNlVHlwZS5HZXQpXG4gICAgICAgIGlmKGNob2ljZSA9PSAxKVxuICAgICAgICB7XG4gICAgICBcbiAgICAgICAgfWVsc2UgaWYoY2hvaWNlID09IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcmVfc3VjKClcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgLy92aWRlb1xcXG4gICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2hvd24oY291bnQpXG4gICAge1xuICAgICAgICB0aGlzLmNvdW50ID0gY291bnQ7XG4gICAgICAgIC8vIFNwcml0ZUZyYW1lQ2FjaGUuaW5zdGFuY2UuZ2V0U3ByaXRlRnJhbWUoXCJHYW1lL3RleHR1cmVzL2Nhci9cIiArIGNmZy5pbWcpLnRoZW4oc2Y9PnRoaXMuaWNvbi5zcHJpdGVGcmFtZT0gc2YpO1xuICAgICAgICB0aGlzLmRpYW1vbmRMYWJlbC5zdHJpbmcgPSAgXCIrXCIgKyBjb3VudDtcbiAgICAgICAgdGhpcy5ub2RlX2Nsb3NlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLmRlbGF5U2hvdylcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5kZWxheVNob3csMilcbiAgICB9XG5cbiAgICBkZWxheVNob3coKVxuICAgIHtcbiAgICAgICAgdGhpcy5ub2RlX2Nsb3NlLmFjdGl2ZSA9IHRydWVcbiAgICB9XG5cbiAgICBjbGlja19ubygpXG4gICAge1xuICAgICAgICB0aGlzLmdldENvbXBvbmVudChWaWV3KS5oaWRlKCk7XG4gICAgICAgIFVzZXJJbmZvLmFkZERpYW1vbmQodGhpcy5jb3VudCApXG4gICAgICAgIFVzZXJJbmZvLnNhdmUoKVxuICAgICAgICAvLyBEZXZpY2UucGxheUVmZmVjdChSLmF1ZGlvX2dldF9kaWFtb25kKVxuICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9MdWNreURpYWxvZ1wiKVxuICAgIH1cbn0iXX0=