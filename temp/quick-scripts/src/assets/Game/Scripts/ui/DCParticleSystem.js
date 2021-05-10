"use strict";
cc._RF.push(module, 'f51daFLsqdJ/4k4IuDQeRuR', 'DCParticleSystem');
// Game/Scripts/ui/DCParticleSystem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DCUI_1 = require("../../../framework/plugin_boosts/ui/DCUI");
var Info_1 = require("../Info");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DCParticleSystem = /** @class */ (function (_super) {
    __extends(DCParticleSystem, _super);
    function DCParticleSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DCParticleSystem.prototype.onLoad = function () {
    };
    DCParticleSystem.prototype.start = function () { };
    DCParticleSystem.prototype.onValueChanged = function (v) {
        var _this = this;
        var data = Info_1.UserInfo.getSkinById(v);
        // data.ps
        if (this.ps && this.ps.node)
            this.ps.node.destroy();
        cc.loader.loadRes("Game/Particles/" + data.ps, cc.ParticleAsset, function (err, ps) {
            console.log(data.ps, ps);
            var particleNode = new cc.Node();
            _this.ps = particleNode.addComponent(cc.ParticleSystem);
            _this.ps.file = ps;
            _this.node.addChild(particleNode);
        });
        // this.ps.file = cc.url.raw("resources/Game/Particles/" + data.ps+".plist");
        // cc.loader.loadRes("Game/Particles/"+data.ps,cc.ParticleAsset,(err,ps)=>{
        //     console.log(data.ps,ps);
        //     this.ps.file = ps;
        // })
    };
    DCParticleSystem = __decorate([
        ccclass
    ], DCParticleSystem);
    return DCParticleSystem;
}(DCUI_1.default));
exports.default = DCParticleSystem;

cc._RF.pop();