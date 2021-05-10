
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/gamesys/PsFx.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5e90fpm8LtO1JagTdF3cTrm', 'PsFx');
// framework/plugin_boosts/gamesys/PsFx.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Device_1 = require("./Device");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PsFx = /** @class */ (function (_super) {
    __extends(PsFx, _super);
    function PsFx() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property([cc.ParticleSystem])
        _this.particles = [];
        // @property([cc.Animation])
        _this.animations = [];
        // armature:dragonBones.ArmatureDisplay = null
        _this.armature = null;
        // name:string = null;
        // _callback:Function;
        // _target:any;
        _this.isPlaying = false;
        _this.sfx = null;
        _this.sprite = null;
        _this.playedTime = 0;
        _this.duration = -1;
        _this.fadeAfterFinish = -1;
        _this.repeatTime = 1;
        _this.removeAfterFinish = false;
        return _this;
        // update (dt) {}
    }
    PsFx.prototype.onLoad = function () {
        if (this.sprite == null) {
            this.sprite = this.getComponent(cc.Sprite);
        }
        var anim = this.getComponent(cc.Animation);
        if (anim) {
            this.animations.push(anim);
        }
        var root_ps = this.getComponent(cc.ParticleSystem);
        root_ps && this.particles.push(root_ps);
        for (var i = 0; i < this.node.childrenCount; i++) {
            var child = this.node.children[i];
            var ps = child.getComponent(cc.ParticleSystem);
            if (ps)
                this.particles.push(ps);
            else {
                var anim_1 = child.getComponent(cc.Animation);
                if (anim_1)
                    this.animations.push(anim_1);
            }
        }
        if (typeof (dragonBones) != "undefined") {
            this.armature = this.getComponent(dragonBones.ArmatureDisplay);
            if (!this.armature)
                this.armature = this.getComponentInChildren(dragonBones.ArmatureDisplay);
        }
    };
    PsFx.prototype.play = function (audio, spriteFrame) {
        var _this = this;
        if (audio === void 0) { audio = null; }
        if (spriteFrame === void 0) { spriteFrame = null; }
        this.isPlaying = true;
        var dur = 0;
        if (audio) {
            this.sfx = audio;
        }
        if (spriteFrame)
            this.sprite.spriteFrame = spriteFrame;
        this.node.active = true;
        for (var i = 0; i < this.particles.length; i++) {
            var element = this.particles[i];
            element.resetSystem();
            if (dur < element.duration) {
                dur = element.duration + element.life + element.lifeVar;
            }
        }
        for (var i = 0; i < this.animations.length; i++) {
            var element = this.animations[i];
            var clips = element.getClips();
            if (clips && clips.length > 0) {
                var clip = clips[0];
                var duration = clip.duration / clip.speed;
                if (duration > dur) {
                    dur = duration;
                }
                element.play(clip.name);
            }
        }
        if (this.sfx) {
            Device_1.default.playEffect(this.sfx, false);
        }
        if (this.armature) {
            this.armature.playAnimation("", this.repeatTime);
            dur = this.duration;
            if (dur <= 0) {
                return new Promise(function (resolve, reject) {
                    // this.armature.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, _=>{
                    //     console.log("loop complete");
                    //     this.fadeOnFinish(resolve)
                    // })
                    _this.armature.addEventListener(dragonBones.EventObject.COMPLETE, function (_) {
                        console.log("armature play complete");
                        if (_this.removeAfterFinish) {
                            _this.node.removeFromParent();
                        }
                        else {
                            _this.fadeOnFinish(resolve);
                        }
                    });
                });
            }
        }
        else {
            dur = dur + 0.1;
        }
        // console.log("[psfx] play : " ,  this.name,  dur);
        return new Promise(function (resolve, reject) {
            setTimeout(function (_) {
                if (!_this.isValid)
                    return;
                if (_this.removeAfterFinish) {
                    _this.node.removeFromParent();
                }
                else {
                    _this.fadeOnFinish(resolve);
                }
            }, dur * 1000);
        });
    };
    PsFx.prototype.fadeOnFinish = function (callback) {
        this.isPlaying = false;
        for (var i = 0; i < this.particles.length; i++) {
            var element = this.particles[i];
            element.stopSystem();
        }
        if (this.fadeAfterFinish > 0) {
            var seq = cc.sequence(cc.fadeOut(this.fadeAfterFinish), cc.callFunc(callback));
            this.node.runAction(seq);
        }
        else {
            callback();
        }
    };
    PsFx.prototype.reset = function () {
        this.playedTime = 0;
    };
    PsFx.prototype.start = function () {
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], PsFx.prototype, "sfx", void 0);
    __decorate([
        property(cc.Sprite)
    ], PsFx.prototype, "sprite", void 0);
    __decorate([
        property
    ], PsFx.prototype, "duration", void 0);
    __decorate([
        property
    ], PsFx.prototype, "fadeAfterFinish", void 0);
    __decorate([
        property
    ], PsFx.prototype, "repeatTime", void 0);
    __decorate([
        property
    ], PsFx.prototype, "removeAfterFinish", void 0);
    PsFx = __decorate([
        ccclass
    ], PsFx);
    return PsFx;
}(cc.Component));
exports.default = PsFx;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxnYW1lc3lzXFxQc0Z4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBOEI7QUFFeEIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUErS0M7UUE3S0csaUNBQWlDO1FBQ2pDLGVBQVMsR0FBdUIsRUFBRSxDQUFBO1FBRWxDLDRCQUE0QjtRQUM1QixnQkFBVSxHQUFrQixFQUFFLENBQUE7UUFFOUIsOENBQThDO1FBQzlDLGNBQVEsR0FBTyxJQUFJLENBQUM7UUFFcEIsc0JBQXNCO1FBRXRCLHNCQUFzQjtRQUN0QixlQUFlO1FBRWYsZUFBUyxHQUFXLEtBQUssQ0FBQztRQUcxQixTQUFHLEdBQWdCLElBQUksQ0FBQTtRQUd2QixZQUFNLEdBQWEsSUFBSSxDQUFBO1FBRXZCLGdCQUFVLEdBQVUsQ0FBQyxDQUFDO1FBR3RCLGNBQVEsR0FBVSxDQUFDLENBQUMsQ0FBRTtRQUd0QixxQkFBZSxHQUFVLENBQUMsQ0FBQyxDQUFDO1FBRzVCLGdCQUFVLEdBQVUsQ0FBQyxDQUFDO1FBR3RCLHVCQUFpQixHQUFXLEtBQUssQ0FBQzs7UUEwSWxDLGlCQUFpQjtJQUNyQixDQUFDO0lBeElHLHFCQUFNLEdBQU47UUFFSSxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUN0QjtZQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUM7UUFDRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUMxQyxJQUFHLElBQUksRUFDUDtZQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUks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O1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUMsQ0FBQztxQ0FDUjtJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3dDQUNHO0lBS3ZCO1FBREMsUUFBUTswQ0FDYTtJQUd0QjtRQURDLFFBQVE7aURBQ21CO0lBRzVCO1FBREMsUUFBUTs0Q0FDYTtJQUd0QjtRQURDLFFBQVE7bURBQ3lCO0lBcENqQixJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBK0t4QjtJQUFELFdBQUM7Q0EvS0QsQUErS0MsQ0EvS2lDLEVBQUUsQ0FBQyxTQUFTLEdBK0s3QztrQkEvS29CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGV2aWNlIGZyb20gXCIuL0RldmljZVwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBzRnggZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIFxuICAgIC8vIEBwcm9wZXJ0eShbY2MuUGFydGljbGVTeXN0ZW1dKVxuICAgIHBhcnRpY2xlczpjYy5QYXJ0aWNsZVN5c3RlbVtdID0gW11cblxuICAgIC8vIEBwcm9wZXJ0eShbY2MuQW5pbWF0aW9uXSlcbiAgICBhbmltYXRpb25zOmNjLkFuaW1hdGlvbltdID0gW11cblxuICAgIC8vIGFybWF0dXJlOmRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSA9IG51bGxcbiAgICBhcm1hdHVyZTphbnkgPSBudWxsO1xuXG4gICAgLy8gbmFtZTpzdHJpbmcgPSBudWxsO1xuXG4gICAgLy8gX2NhbGxiYWNrOkZ1bmN0aW9uO1xuICAgIC8vIF90YXJnZXQ6YW55O1xuXG4gICAgaXNQbGF5aW5nOmJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTogY2MuQXVkaW9DbGlwfSlcbiAgICBzZng6Y2MuQXVkaW9DbGlwID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBzcHJpdGU6Y2MuU3ByaXRlID0gbnVsbFxuXG4gICAgcGxheWVkVGltZTpudW1iZXIgPSAwO1xuXG4gICAgQHByb3BlcnR5XG4gICAgZHVyYXRpb246bnVtYmVyID0gLTEgO1xuXG4gICAgQHByb3BlcnR5XG4gICAgZmFkZUFmdGVyRmluaXNoOm51bWJlciA9IC0xO1xuICAgIFxuICAgIEBwcm9wZXJ0eVxuICAgIHJlcGVhdFRpbWU6bnVtYmVyID0gMTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIHJlbW92ZUFmdGVyRmluaXNoOmJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgb25Mb2FkKClcbiAgICB7XG4gICAgICAgIGlmKHRoaXMuc3ByaXRlID09IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlID0gdGhpcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYW5pbSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbilcbiAgICAgICAgaWYoYW5pbSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLnB1c2goYW5pbSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJvb3RfcHMgPSB0aGlzLmdldENvbXBvbmVudChjYy5QYXJ0aWNsZVN5c3RlbSlcbiAgICAgICAgcm9vdF9wcyAmJiB0aGlzLnBhcnRpY2xlcy5wdXNoKHJvb3RfcHMpXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLm5vZGUuY2hpbGRyZW5baV1cbiAgICAgICAgICAgIGxldCBwcyA9IGNoaWxkLmdldENvbXBvbmVudChjYy5QYXJ0aWNsZVN5c3RlbSkgICBcbiAgICAgICAgICAgIGlmKHBzKVxuICAgICAgICAgICAgICAgIHRoaXMucGFydGljbGVzLnB1c2gocHMpO1xuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBsZXQgYW5pbSA9IGNoaWxkLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pXG4gICAgICAgICAgICAgICAgaWYoYW5pbSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLnB1c2goYW5pbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYodHlwZW9mKGRyYWdvbkJvbmVzKSAhPVwidW5kZWZpbmVkXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuYXJtYXR1cmUgPSB0aGlzLmdldENvbXBvbmVudChkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkpO1xuICAgICAgICAgICAgaWYoIXRoaXMuYXJtYXR1cmUpXG4gICAgICAgICAgICAgICAgdGhpcy5hcm1hdHVyZSA9IHRoaXMuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxheShhdWRpbzpjYy5BdWRpb0NsaXA9IG51bGwsc3ByaXRlRnJhbWUgPSBudWxsKVxuICAgIHtcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xuICAgICAgICBsZXQgZHVyID0gMDtcbiAgICAgICAgaWYoYXVkaW8pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2Z4ID0gYXVkaW9cbiAgICAgICAgfVxuICAgICAgICBpZihzcHJpdGVGcmFtZSlcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMucGFydGljbGVzW2ldO1xuICAgICAgICAgICAgZWxlbWVudC5yZXNldFN5c3RlbSgpO1xuICAgICAgICAgICAgaWYoZHVyIDwgZWxlbWVudC5kdXJhdGlvbilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkdXIgPSBlbGVtZW50LmR1cmF0aW9uICsgZWxlbWVudC5saWZlICsgZWxlbWVudC5saWZlVmFyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFuaW1hdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmFuaW1hdGlvbnNbaV07XG4gICAgICAgICAgICBsZXQgY2xpcHMgPSBlbGVtZW50LmdldENsaXBzKClcbiAgICAgICAgICAgIGlmKGNsaXBzICYmIGNsaXBzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IGNsaXAgPSBjbGlwc1swXVxuICAgICAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGNsaXAuZHVyYXRpb24vY2xpcC5zcGVlZFxuICAgICAgICAgICAgICAgIGlmKGR1cmF0aW9uID4gZHVyKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZHVyID0gZHVyYXRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsZW1lbnQucGxheShjbGlwLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5zZngpXG4gICAgICAgIHtcbiAgICAgICAgICAgIERldmljZS5wbGF5RWZmZWN0KHRoaXMuc2Z4LGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5hcm1hdHVyZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5hcm1hdHVyZS5wbGF5QW5pbWF0aW9uKFwiXCIsdGhpcy5yZXBlYXRUaW1lKTtcbiAgICAgICAgICAgIGR1ciA9IHRoaXMuZHVyYXRpb247XG4gICAgICAgICAgICBpZihkdXIgPD0gMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmFybWF0dXJlLmFkZEV2ZW50TGlzdGVuZXIoZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuTE9PUF9DT01QTEVURSwgXz0+e1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJsb29wIGNvbXBsZXRlXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5mYWRlT25GaW5pc2gocmVzb2x2ZSlcbiAgICAgICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcm1hdHVyZS5hZGRFdmVudExpc3RlbmVyKGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkNPTVBMRVRFLCBfPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFybWF0dXJlIHBsYXkgY29tcGxldGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnJlbW92ZUFmdGVyRmluaXNoKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZhZGVPbkZpbmlzaChyZXNvbHZlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZHVyID0gZHVyICsgMC4xO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiW3BzZnhdIHBsYXkgOiBcIiAsICB0aGlzLm5hbWUsICBkdXIpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xuICAgICAgICAgICAgc2V0VGltZW91dChfPT57XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNWYWxpZCkgcmV0dXJuXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yZW1vdmVBZnRlckZpbmlzaClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFkZU9uRmluaXNoKHJlc29sdmUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxkdXIgKiAxMDAwKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZhZGVPbkZpbmlzaChjYWxsYmFjaylcbiAgICB7XG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wYXJ0aWNsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnBhcnRpY2xlc1tpXTtcbiAgICAgICAgICAgIGVsZW1lbnQuc3RvcFN5c3RlbSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuZmFkZUFmdGVyRmluaXNoID4gMClcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHNlcSA9IGNjLnNlcXVlbmNlKGNjLmZhZGVPdXQodGhpcy5mYWRlQWZ0ZXJGaW5pc2gpLGNjLmNhbGxGdW5jKGNhbGxiYWNrKSlcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oc2VxKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldCgpOiBhbnkge1xuICAgICAgICB0aGlzLnBsYXllZFRpbWUgPSAwO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=