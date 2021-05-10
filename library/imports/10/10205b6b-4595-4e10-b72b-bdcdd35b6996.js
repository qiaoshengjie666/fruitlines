"use strict";
cc._RF.push(module, '10205trRZVOELcrvc3TW2mW', 'UIFunctions');
// framework/plugin_boosts/ui/UIFunctions.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UIFunctions = /** @class */ (function () {
    function UIFunctions() {
    }
    UIFunctions.getChildrenAnimations = function (node) {
        var animations = [];
        var anim = node.getComponent(cc.Animation);
        if (anim)
            animations.push(anim);
        for (var i = 0; i < node.childrenCount; i++) {
            var child = node.children[i];
            var anim = child.getComponent(cc.Animation);
            if (anim)
                animations.push(anim);
        }
        return animations;
    };
    UIFunctions.stopAnimations = function (animations) {
        animations.forEach(function (anim) {
            anim.stop();
        });
    };
    UIFunctions.doShowAnimations = function (animations, finishCallback, target) {
        var maxDuration = 0;
        var maxDurationAnimation;
        animations.forEach(function (anim) {
            var clips = anim.getClips();
            if (clips.length > 0) {
                var clip = clips[0];
                var animState = anim.play(clip.name);
                animState.wrapMode = cc.WrapMode.Normal;
                if (clip.duration > maxDuration) {
                    maxDuration = clip.duration;
                    maxDurationAnimation = anim;
                }
            }
        });
        if (finishCallback) {
            var func_1 = function () {
                // console.log("finish animations")
                if (maxDurationAnimation)
                    maxDurationAnimation.off("finished", func_1);
                finishCallback.call(target);
            };
            if (maxDurationAnimation)
                maxDurationAnimation.on("finished", func_1);
            else
                finishCallback.call(target);
        }
    };
    // static getLongestAnimation(animations)
    // {
    //     animations.forEach((anim:cc.Animation)=>{
    //         let clips = anim.getClips()
    //         for (clips)
    //         //以最长的为准
    //     }
    // }
    //TODO:还未实现
    UIFunctions.isAnimationRunning = function (animations) {
        return false;
    };
    UIFunctions.doHideAnimations = function (animations, finishCallback, target) {
        var hasHideAnimation = false;
        var maxDuration = 0;
        var maxDurationAnimation;
        animations.forEach(function (anim) {
            var clips = anim.getClips();
            if (clips.length == 2) {
                var clip = clips[clips.length - 1];
                // anim.on("finished",onHideAnimationFinished)
                hasHideAnimation = true;
                anim.play(clip.name);
                if (clip.duration > maxDuration) {
                    maxDuration = clip.duration;
                    maxDurationAnimation = anim;
                }
            }
            else if (clips.length == 1) {
                var clip = clips[0];
                // clip.wrapMode = cc.WrapMode.Reverse;
                hasHideAnimation = true;
                var animState = anim.play(clip.name);
                animState.wrapMode = cc.WrapMode.Reverse;
                if (clip.duration > maxDuration) {
                    maxDuration = clip.duration;
                    maxDurationAnimation = anim;
                }
            }
        });
        if (maxDurationAnimation && finishCallback) {
            var func_2 = function () {
                // console.log("finish animations")
                maxDurationAnimation.off("finished", func_2);
                finishCallback.call(target);
            };
            maxDurationAnimation.on("finished", func_2);
        }
        return hasHideAnimation;
    };
    UIFunctions.getToggleIndex = function (toggle) {
        var container = toggle.node.getParent();
        for (var i = 0; i < container.childrenCount; i++) {
            var child = container.children[i];
            if (toggle.node == child) {
                return i;
            }
        }
        return -1;
    };
    UIFunctions.selectToggleIndex = function (toggleContainer, index) {
        if (toggleContainer == null) {
            console.warn("[UIFunction.selectToggleIndex] : invalid toggleContainer :");
            return;
        }
        var toggleNode = toggleContainer.children[index];
        if (toggleNode) {
            var toggle = toggleNode.getComponent(cc.Toggle);
            if (toggle) {
                console.log("[UIFunction.selectToggleIndex] :" + index);
                toggle.check();
            }
        }
        else {
            console.warn("[UIFunction.selectToggleIndex] :cannot find toggle with index:" + index);
        }
    };
    // set btn 
    UIFunctions.setTouchEnabled = function (node, b) {
        // g.foreachNode(node,child=>{
        //     let btn:cc.Button = child.getComponent(cc.Button)
        //     if(btn)
        //     {
        //         console.log("[UIFunction] " + child.name + " touch : " + b)
        //         btn.interactable = b;
        //     }
        // })
    };
    UIFunctions.setButtonEnabled = function (btn, b) {
        btn.node.opacity = b ? 255 : 125;
        btn.interactable = b;
    };
    return UIFunctions;
}());
exports.default = UIFunctions;

cc._RF.pop();