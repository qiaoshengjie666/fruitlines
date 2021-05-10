
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/ui/DCPandoraPoint.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7213alSGlhOObvGLLyQvhtZ', 'DCPandoraPoint');
// framework/plugin_boosts/ui/DCPandoraPoint.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DCUI_1 = require("./DCUI");
var PandoraPoint_1 = require("./PandoraPoint");
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
var DCPandoraPoint = /** @class */ (function (_super) {
    __extends(DCPandoraPoint, _super);
    function DCPandoraPoint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DCPandoraPoint.prototype.onLoad = function () {
        this.point = this.getComponent(PandoraPoint_1.default);
    };
    DCPandoraPoint.prototype.onValueChanged = function (v) {
        this.point.setNumber(v);
    };
    DCPandoraPoint = __decorate([
        ccclass
    ], DCPandoraPoint);
    return DCPandoraPoint;
}(DCUI_1.default));
exports.default = DCPandoraPoint;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1aVxcRENQYW5kb3JhUG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUEwQjtBQUMxQiwrQ0FBMEM7QUFFMUMsb0JBQW9CO0FBQ3BCLGlGQUFpRjtBQUNqRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFFN0YsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNEMsa0NBQUk7SUFBaEQ7O0lBZUEsQ0FBQztJQVpHLCtCQUFNLEdBQU47UUFFSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQVksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCx1Q0FBYyxHQUFkLFVBQWUsQ0FBQztRQUVaLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFYZ0IsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQWVsQztJQUFELHFCQUFDO0NBZkQsQUFlQyxDQWYyQyxjQUFJLEdBZS9DO2tCQWZvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERDVUkgZnJvbSBcIi4vRENVSVwiO1xuaW1wb3J0IFBhbmRvcmFQb2ludCBmcm9tIFwiLi9QYW5kb3JhUG9pbnRcIjtcblxuLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEQ1BhbmRvcmFQb2ludCBleHRlbmRzIERDVUkge1xuXG4gICAgcG9pbnQ6UGFuZG9yYVBvaW50O1xuICAgIG9uTG9hZCgpXG4gICAge1xuICAgICAgICB0aGlzLnBvaW50ID0gdGhpcy5nZXRDb21wb25lbnQoUGFuZG9yYVBvaW50KTtcbiAgICB9XG5cbiAgICBvblZhbHVlQ2hhbmdlZCh2KVxuICAgIHtcbiAgICAgICAgdGhpcy5wb2ludC5zZXROdW1iZXIodik7XG4gICAgfVxuICAgXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19