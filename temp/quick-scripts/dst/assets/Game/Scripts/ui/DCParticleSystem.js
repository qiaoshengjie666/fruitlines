
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/DCParticleSystem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXERDUGFydGljbGVTeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUE0RDtBQUM1RCxnQ0FBbUM7QUFHN0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBOEMsb0NBQUk7SUFBbEQ7O0lBNkJBLENBQUM7SUExQkcsaUNBQU0sR0FBTjtJQUdBLENBQUM7SUFFRCxnQ0FBSyxHQUFMLGNBQVUsQ0FBQztJQUVYLHlDQUFjLEdBQWQsVUFBZSxDQUFDO1FBQWhCLGlCQWtCQztRQWhCRyxJQUFJLElBQUksR0FBRyxlQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLFVBQVU7UUFDVixJQUFHLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJO1lBQ3RCLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLGFBQWEsRUFBQyxVQUFDLEdBQUcsRUFBQyxFQUFFO1lBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztZQUN4QixJQUFJLFlBQVksR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNqQyxLQUFJLENBQUMsRUFBRSxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3ZELEtBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNsQixLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQTtRQUNGLDZFQUE2RTtRQUM3RSwyRUFBMkU7UUFDM0UsK0JBQStCO1FBQy9CLHlCQUF5QjtRQUN6QixLQUFLO0lBQ1QsQ0FBQztJQTVCZ0IsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0E2QnBDO0lBQUQsdUJBQUM7Q0E3QkQsQUE2QkMsQ0E3QjZDLGNBQUksR0E2QmpEO2tCQTdCb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERDVUkgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL0RDVUlcIjtcbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSBcIi4uL0luZm9cIjtcbmltcG9ydCB7IFIgfSBmcm9tIFwiLi4vaGV4LWxpbmVzLWdhbWUvUmVzXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRENQYXJ0aWNsZVN5c3RlbSBleHRlbmRzIERDVUkge1xuXG4gICAgcHM6Y2MuUGFydGljbGVTeXN0ZW07XG4gICAgb25Mb2FkKClcbiAgICB7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHN0YXJ0ICgpIHt9XG5cbiAgICBvblZhbHVlQ2hhbmdlZCh2KVxuICAgIHtcbiAgICAgICAgbGV0IGRhdGEgPSBVc2VySW5mby5nZXRTa2luQnlJZCh2KTtcbiAgICAgICAgLy8gZGF0YS5wc1xuICAgICAgICBpZih0aGlzLnBzICYmIHRoaXMucHMubm9kZSlcbiAgICAgICAgICAgIHRoaXMucHMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwiR2FtZS9QYXJ0aWNsZXMvXCIrZGF0YS5wcyxjYy5QYXJ0aWNsZUFzc2V0LChlcnIscHMpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnBzLHBzKTtcbiAgICAgICAgICAgIGxldCBwYXJ0aWNsZU5vZGUgPSBuZXcgY2MuTm9kZSgpO1xuICAgICAgICAgICAgdGhpcy5wcyA9IHBhcnRpY2xlTm9kZS5hZGRDb21wb25lbnQoY2MuUGFydGljbGVTeXN0ZW0pO1xuICAgICAgICAgICAgdGhpcy5wcy5maWxlID0gcHM7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQocGFydGljbGVOb2RlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLy8gdGhpcy5wcy5maWxlID0gY2MudXJsLnJhdyhcInJlc291cmNlcy9HYW1lL1BhcnRpY2xlcy9cIiArIGRhdGEucHMrXCIucGxpc3RcIik7XG4gICAgICAgIC8vIGNjLmxvYWRlci5sb2FkUmVzKFwiR2FtZS9QYXJ0aWNsZXMvXCIrZGF0YS5wcyxjYy5QYXJ0aWNsZUFzc2V0LChlcnIscHMpPT57XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhkYXRhLnBzLHBzKTtcbiAgICAgICAgLy8gICAgIHRoaXMucHMuZmlsZSA9IHBzO1xuICAgICAgICAvLyB9KVxuICAgIH1cbn0iXX0=