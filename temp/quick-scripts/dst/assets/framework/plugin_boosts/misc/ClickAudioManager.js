
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/misc/ClickAudioManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '679c3x/ZwhD8KnIy6p5lX5y', 'ClickAudioManager');
// framework/plugin_boosts/misc/ClickAudioManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ClickAudio_1 = require("./ClickAudio");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ClickAudioManager = /** @class */ (function (_super) {
    __extends(ClickAudioManager, _super);
    function ClickAudioManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.audio = null;
        _this.elastic = false;
        return _this;
        // update (dt) {}
    }
    ClickAudioManager.prototype.onLoad = function () {
        //window.g = require('g');
        //g.foreachNode(this.node,this.each,this)
    };
    ClickAudioManager.prototype.each = function (item) {
        //if button 
        if (!item.getComponent(cc.Button))
            return;
        var comp = item.getComponent(ClickAudio_1.default);
        if (comp == null) {
            comp = item.addComponent(ClickAudio_1.default);
            comp.elastic = this.elastic;
            comp.audio = this.audio;
        }
    };
    ClickAudioManager.prototype.start = function () {
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], ClickAudioManager.prototype, "audio", void 0);
    __decorate([
        property
    ], ClickAudioManager.prototype, "elastic", void 0);
    ClickAudioManager = __decorate([
        ccclass
    ], ClickAudioManager);
    return ClickAudioManager;
}(cc.Component));
exports.default = ClickAudioManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxtaXNjXFxDbGlja0F1ZGlvTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXNDO0FBQ2hDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQStDLHFDQUFZO0lBQTNEO1FBQUEscUVBOEJDO1FBM0JHLFdBQUssR0FBaUIsSUFBSSxDQUFDO1FBRzNCLGFBQU8sR0FBVyxLQUFLLENBQUM7O1FBdUJ4QixpQkFBaUI7SUFDckIsQ0FBQztJQXRCRyxrQ0FBTSxHQUFOO1FBQ0ksMEJBQTBCO1FBQzFCLHlDQUF5QztJQUM3QyxDQUFDO0lBRUQsZ0NBQUksR0FBSixVQUFLLElBQVk7UUFFYixZQUFZO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUFFLE9BQU87UUFDMUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBVSxDQUFDLENBQUE7UUFDeEMsSUFBRyxJQUFJLElBQUksSUFBSSxFQUNmO1lBQ0ksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQVUsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtZQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBQ0QsaUNBQUssR0FBTDtJQUVBLENBQUM7SUF4QkQ7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBQyxDQUFDO29EQUNKO0lBRzNCO1FBREMsUUFBUTtzREFDZTtJQU5QLGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBOEJyQztJQUFELHdCQUFDO0NBOUJELEFBOEJDLENBOUI4QyxFQUFFLENBQUMsU0FBUyxHQThCMUQ7a0JBOUJvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ2xpY2tBdWRpbyBmcm9tIFwiLi9DbGlja0F1ZGlvXCI7XG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaWNrQXVkaW9NYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTogY2MuQXVkaW9DbGlwfSlcbiAgICBhdWRpbyA6Y2MuQXVkaW9DbGlwID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eVxuICAgIGVsYXN0aWM6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgLy93aW5kb3cuZyA9IHJlcXVpcmUoJ2cnKTtcbiAgICAgICAgLy9nLmZvcmVhY2hOb2RlKHRoaXMubm9kZSx0aGlzLmVhY2gsdGhpcylcbiAgICB9XG4gICAgXG4gICAgZWFjaChpdGVtOmNjLk5vZGUpXG4gICAge1xuICAgICAgICAvL2lmIGJ1dHRvbiBcbiAgICAgICAgaWYgKCFpdGVtLmdldENvbXBvbmVudChjYy5CdXR0b24pKSByZXR1cm47XG4gICAgICAgIGxldCBjb21wID0gaXRlbS5nZXRDb21wb25lbnQoQ2xpY2tBdWRpbylcbiAgICAgICAgaWYoY29tcCA9PSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb21wID0gaXRlbS5hZGRDb21wb25lbnQoQ2xpY2tBdWRpbyk7XG4gICAgICAgICAgICBjb21wLmVsYXN0aWMgPSB0aGlzLmVsYXN0aWNcbiAgICAgICAgICAgIGNvbXAuYXVkaW8gPSB0aGlzLmF1ZGlvO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=