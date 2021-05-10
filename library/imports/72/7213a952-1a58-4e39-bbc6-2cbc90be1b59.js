"use strict";
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