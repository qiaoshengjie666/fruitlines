
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/ui/DCUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e4171eQC3dMO4x8/Td1XV1Y', 'DCUI');
// framework/plugin_boosts/ui/DCUI.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DataCenter_1 = require("../misc/DataCenter");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DCUI = /** @class */ (function (_super) {
    __extends(DCUI, _super);
    function DCUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataBind = "";
        return _this;
    }
    DCUI.prototype.onLoad = function () {
    };
    DCUI.prototype.setDCKey = function (k) {
        this.dataBind = k;
        this.setListener();
    };
    DCUI.prototype.setListener = function () {
        DataCenter_1.default.off(this.dataBind, this.dataChanged, this);
        DataCenter_1.default.on(this.dataBind, this.dataChanged, this);
    };
    DCUI.prototype.onValueChanged = function (v) {
    };
    DCUI.prototype.setDCValue = function (v) {
        DataCenter_1.default.set(this.dataBind, v);
    };
    DCUI.prototype.dataChanged = function (v, old) {
        this.onValueChanged(v);
    };
    DCUI.prototype.onEnable = function () {
        this.setListener();
        this.onValueChanged(DataCenter_1.default.get(this.dataBind));
    };
    DCUI.prototype.onDisable = function () {
        DataCenter_1.default.off(this.dataBind, this.dataChanged, this);
    };
    __decorate([
        property()
    ], DCUI.prototype, "dataBind", void 0);
    DCUI = __decorate([
        ccclass
    ], DCUI);
    return DCUI;
}(cc.Component));
exports.default = DCUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1aVxcRENVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQTRDO0FBRXRDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQWtDLHdCQUFZO0lBQTlDO1FBQUEscUVBMkNDO1FBeENHLGNBQVEsR0FBVyxFQUFFLENBQUM7O0lBd0MxQixDQUFDO0lBdkNHLHFCQUFNLEdBQU47SUFFQSxDQUFDO0lBRUQsdUJBQVEsR0FBUixVQUFTLENBQUM7UUFFTixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDdEIsQ0FBQztJQUdELDBCQUFXLEdBQVg7UUFFSSxvQkFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLENBQUE7UUFDbkQsb0JBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3RELENBQUM7SUFFRCw2QkFBYyxHQUFkLFVBQWUsQ0FBQztJQUVoQixDQUFDO0lBRUQseUJBQVUsR0FBVixVQUFXLENBQUM7UUFFUixvQkFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCwwQkFBVyxHQUFYLFVBQVksQ0FBQyxFQUFDLEdBQUc7UUFDYixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCx1QkFBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELHdCQUFTLEdBQVQ7UUFFSSxvQkFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkQsQ0FBQztJQXZDRDtRQURDLFFBQVEsRUFBRTswQ0FDVztJQUhMLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0EyQ3hCO0lBQUQsV0FBQztDQTNDRCxBQTJDQyxDQTNDaUMsRUFBRSxDQUFDLFNBQVMsR0EyQzdDO2tCQTNDb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEYXRhQ2VudGVyIGZyb20gXCIuLi9taXNjL0RhdGFDZW50ZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEQ1VJIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSgpXG4gICAgZGF0YUJpbmQ6IHN0cmluZyA9IFwiXCI7XG4gICAgb25Mb2FkKClcbiAgICB7XG4gICAgfVxuXG4gICAgc2V0RENLZXkoaylcbiAgICB7XG4gICAgICAgIHRoaXMuZGF0YUJpbmQgPSBrO1xuICAgICAgICB0aGlzLnNldExpc3RlbmVyKClcbiAgICB9XG5cblxuICAgIHNldExpc3RlbmVyKClcbiAgICB7XG4gICAgICAgIERhdGFDZW50ZXIub2ZmKHRoaXMuZGF0YUJpbmQsdGhpcy5kYXRhQ2hhbmdlZCx0aGlzKVxuICAgICAgICBEYXRhQ2VudGVyLm9uKHRoaXMuZGF0YUJpbmQsdGhpcy5kYXRhQ2hhbmdlZCx0aGlzKVxuICAgIH1cblxuICAgIG9uVmFsdWVDaGFuZ2VkKHYpXG4gICAge1xuICAgIH1cblxuICAgIHNldERDVmFsdWUodilcbiAgICB7XG4gICAgICAgIERhdGFDZW50ZXIuc2V0KHRoaXMuZGF0YUJpbmQsIHYpO1xuICAgIH1cblxuICAgIGRhdGFDaGFuZ2VkKHYsb2xkKTogYW55IHtcbiAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlZCh2KTtcbiAgICB9XG5cbiAgICBvbkVuYWJsZSAoKSB7XG4gICAgICAgIHRoaXMuc2V0TGlzdGVuZXIoKVxuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VkKERhdGFDZW50ZXIuZ2V0KHRoaXMuZGF0YUJpbmQpKTtcbiAgICB9XG5cbiAgICBvbkRpc2FibGUoKVxuICAgIHtcbiAgICAgICAgRGF0YUNlbnRlci5vZmYodGhpcy5kYXRhQmluZCx0aGlzLmRhdGFDaGFuZ2VkLHRoaXMpXG4gICAgfVxufVxuIl19