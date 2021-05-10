"use strict";
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