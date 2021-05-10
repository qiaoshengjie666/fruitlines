
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/ui/DCToggle.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f9e52WLze5MBrhxXx/fWqyL', 'DCToggle');
// framework/plugin_boosts/ui/DCToggle.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DCUI_1 = require("./DCUI");
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DCToggle = /** @class */ (function (_super) {
    __extends(DCToggle, _super);
    function DCToggle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.revserse = false;
        _this.autosync = true;
        return _this;
    }
    DCToggle.prototype.onLoad = function () {
        this.toggle = this.getComponent(cc.Toggle);
        if (this.autosync) {
            var listener = new cc.Component.EventHandler();
            listener.component = "DCToggle";
            listener.target = this.node;
            listener.handler = "onChecked";
            this.toggle.checkEvents.push(listener);
        }
    };
    DCToggle.prototype.onChecked = function (v) {
        if (this.isFromSelf)
            return;
        if (this.revserse) {
            this.setDCValue(!v.isChecked);
        }
        else {
            this.setDCValue(v.isChecked);
        }
    };
    DCToggle.prototype.setChecked = function (b) {
        this.isFromSelf = true;
        if (b)
            this.toggle.check();
        else
            this.toggle.uncheck();
        this.isFromSelf = false;
    };
    DCToggle.prototype.onValueChanged = function (v) {
        if (this.revserse) {
            this.setChecked(!v);
        }
        else {
            this.setChecked(v);
        }
    };
    __decorate([
        property({ tooltip: "If reverse is enabled ,checked is false !, unchecked is true" })
    ], DCToggle.prototype, "revserse", void 0);
    __decorate([
        property({ tooltip: " Make sure data bind type should be boolean" })
    ], DCToggle.prototype, "autosync", void 0);
    DCToggle = __decorate([
        ccclass
    ], DCToggle);
    return DCToggle;
}(DCUI_1.default));
exports.default = DCToggle;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1aVxcRENUb2dnbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUEwQjtBQUUxQixvQkFBb0I7QUFDcEIsaUZBQWlGO0FBQ2pGLHlGQUF5RjtBQUN6RixtQkFBbUI7QUFDbkIsMkZBQTJGO0FBQzNGLG1HQUFtRztBQUNuRyw4QkFBOEI7QUFDOUIsMkZBQTJGO0FBQzNGLG1HQUFtRztBQUU3RixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBSTtJQUExQztRQUFBLHFFQXlEQztRQXJERyxjQUFRLEdBQVcsS0FBSyxDQUFDO1FBSXpCLGNBQVEsR0FBVyxJQUFJLENBQUM7O0lBaUQ1QixDQUFDO0lBN0NHLHlCQUFNLEdBQU47UUFFSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUcsSUFBSSxDQUFDLFFBQVEsRUFDaEI7WUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDL0MsUUFBUSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7WUFDaEMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzVCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtTQUN6QztJQUNMLENBQUM7SUFFRCw0QkFBUyxHQUFULFVBQVUsQ0FBQztRQUVQLElBQUcsSUFBSSxDQUFDLFVBQVU7WUFBRSxPQUFPO1FBQzNCLElBQUcsSUFBSSxDQUFDLFFBQVEsRUFDaEI7WUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2pDO2FBQUk7WUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUM7SUFFRCw2QkFBVSxHQUFWLFVBQVcsQ0FBQztRQUVSLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUcsQ0FBQztZQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7O1lBRW5CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUE7SUFDM0IsQ0FBQztJQUVELGlDQUFjLEdBQWQsVUFBZSxDQUFDO1FBRVosSUFBRyxJQUFJLENBQUMsUUFBUSxFQUNoQjtZQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUN0QjthQUFJO1lBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNyQjtJQUVMLENBQUM7SUFuREQ7UUFEQyxRQUFRLENBQUMsRUFBQyxPQUFPLEVBQUMsOERBQThELEVBQUMsQ0FBQzs4Q0FDMUQ7SUFJekI7UUFEQyxRQUFRLENBQUMsRUFBQyxPQUFPLEVBQUMsNkNBQTZDLEVBQUMsQ0FBQzs4Q0FDMUM7SUFSUCxRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBeUQ1QjtJQUFELGVBQUM7Q0F6REQsQUF5REMsQ0F6RHFDLGNBQUksR0F5RHpDO2tCQXpEb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEQ1VJIGZyb20gXCIuL0RDVUlcIjtcblxuLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEQ1RvZ2dsZSBleHRlbmRzIERDVUkge1xuXG4gICAgdG9nZ2xlOmNjLlRvZ2dsZTtcbiAgICBAcHJvcGVydHkoe3Rvb2x0aXA6XCJJZiByZXZlcnNlIGlzIGVuYWJsZWQgLGNoZWNrZWQgaXMgZmFsc2UgISwgdW5jaGVja2VkIGlzIHRydWVcIn0pXG4gICAgcmV2c2Vyc2U6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICBAcHJvcGVydHkoe3Rvb2x0aXA6XCIgTWFrZSBzdXJlIGRhdGEgYmluZCB0eXBlIHNob3VsZCBiZSBib29sZWFuXCJ9KVxuICAgIGF1dG9zeW5jOmJvb2xlYW4gPSB0cnVlO1xuXG4gICAgaXNGcm9tU2VsZjpib29sZWFuO1xuXG4gICAgb25Mb2FkKClcbiAgICB7XG4gICAgICAgIHRoaXMudG9nZ2xlID0gdGhpcy5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKTtcbiAgICAgICAgaWYodGhpcy5hdXRvc3luYylcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IGxpc3RlbmVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcbiAgICAgICAgICAgIGxpc3RlbmVyLmNvbXBvbmVudCA9IFwiRENUb2dnbGVcIjtcbiAgICAgICAgICAgIGxpc3RlbmVyLnRhcmdldCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIGxpc3RlbmVyLmhhbmRsZXIgPSBcIm9uQ2hlY2tlZFwiO1xuICAgICAgICAgICAgdGhpcy50b2dnbGUuY2hlY2tFdmVudHMucHVzaChsaXN0ZW5lcilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2hlY2tlZCh2KVxuICAgIHtcbiAgICAgICAgaWYodGhpcy5pc0Zyb21TZWxmKSByZXR1cm47XG4gICAgICAgIGlmKHRoaXMucmV2c2Vyc2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RENWYWx1ZSghdi5pc0NoZWNrZWQpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc2V0RENWYWx1ZSh2LmlzQ2hlY2tlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRDaGVja2VkKGIpXG4gICAge1xuICAgICAgICB0aGlzLmlzRnJvbVNlbGYgPSB0cnVlO1xuICAgICAgICBpZihiKVxuICAgICAgICAgICAgdGhpcy50b2dnbGUuY2hlY2soKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZS51bmNoZWNrKCk7XG4gICAgICAgIHRoaXMuaXNGcm9tU2VsZiA9IGZhbHNlXG4gICAgfVxuXG4gICAgb25WYWx1ZUNoYW5nZWQodilcbiAgICB7XG4gICAgICAgIGlmKHRoaXMucmV2c2Vyc2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2hlY2tlZCghdilcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLnNldENoZWNrZWQodilcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbn1cbiJdfQ==