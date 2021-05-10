
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/ui/UIFunctions.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1aVxcVUlGdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUE2S0EsQ0FBQztJQTFLVSxpQ0FBcUIsR0FBNUIsVUFBNkIsSUFBSTtRQUM3QixJQUFJLFVBQVUsR0FBa0IsRUFBRSxDQUFBO1FBQ2xDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQzFDLElBQUcsSUFBSTtZQUNILFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQzFDO1lBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUMzQyxJQUFHLElBQUk7Z0JBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUM1QjtRQUNELE9BQU8sVUFBVSxDQUFBO0lBQ3JCLENBQUM7SUFFTSwwQkFBYyxHQUFyQixVQUFzQixVQUFVO1FBRTVCLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFpQjtZQUNqQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sNEJBQWdCLEdBQXZCLFVBQXdCLFVBQVUsRUFBQyxjQUF3QixFQUFDLE1BQU87UUFFL0QsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFFO1FBQ3JCLElBQUksb0JBQWlDLENBQUM7UUFDdEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQWlCO1lBQ2pDLElBQUks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QUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLEdBQUcsS0FBSyxDQUFDLENBQUE7Z0JBQ3ZELE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTthQUNqQjtTQUNKO2FBQUk7WUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLGdFQUFnRSxHQUFFLEtBQUssQ0FBQyxDQUFBO1NBQ3hGO0lBQ0wsQ0FBQztJQUVELFdBQVc7SUFDSiwyQkFBZSxHQUF0QixVQUF1QixJQUFJLEVBQUMsQ0FBQztRQUV6Qiw4QkFBOEI7UUFDOUIsd0RBQXdEO1FBQ3hELGNBQWM7UUFDZCxRQUFRO1FBQ1Isc0VBQXNFO1FBQ3RFLGdDQUFnQztRQUNoQyxRQUFRO1FBQ1IsS0FBSztJQUNULENBQUM7SUFFTSw0QkFBZ0IsR0FBdkIsVUFBd0IsR0FBRyxFQUFDLENBQUM7UUFFekIsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQSxHQUFHLENBQUEsQ0FBQyxDQUFBLEdBQUcsQ0FBQztRQUM3QixHQUFHLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQTtJQUN4QixDQUFDO0lBRUwsa0JBQUM7QUFBRCxDQTdLQSxBQTZLQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlGdW5jdGlvbnNcbntcbiAgICBcbiAgICBzdGF0aWMgZ2V0Q2hpbGRyZW5BbmltYXRpb25zKG5vZGUpOiBjYy5BbmltYXRpb25bXSB7XG4gICAgICAgIGxldCBhbmltYXRpb25zOmNjLkFuaW1hdGlvbltdID0gW11cbiAgICAgICAgdmFyIGFuaW0gPSBub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pXG4gICAgICAgIGlmKGFuaW0pXG4gICAgICAgICAgICBhbmltYXRpb25zLnB1c2goYW5pbSlcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGk8IG5vZGUuY2hpbGRyZW5Db3VudDsgaSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgY2hpbGQgPSBub2RlLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgdmFyIGFuaW0gPSBjaGlsZC5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKVxuICAgICAgICAgICAgaWYoYW5pbSlcbiAgICAgICAgICAgICAgICBhbmltYXRpb25zLnB1c2goYW5pbSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYW5pbWF0aW9uc1xuICAgIH1cblxuICAgIHN0YXRpYyBzdG9wQW5pbWF0aW9ucyhhbmltYXRpb25zKVxuICAgIHtcbiAgICAgICAgYW5pbWF0aW9ucy5mb3JFYWNoKChhbmltOmNjLkFuaW1hdGlvbik9PntcbiAgICAgICAgICAgIGFuaW0uc3RvcCgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBkb1Nob3dBbmltYXRpb25zKGFuaW1hdGlvbnMsZmluaXNoQ2FsbGJhY2s/OkZ1bmN0aW9uLHRhcmdldD8pXG4gICAge1xuICAgICAgICBsZXQgbWF4RHVyYXRpb24gPSAwIDtcbiAgICAgICAgbGV0IG1heER1cmF0aW9uQW5pbWF0aW9uOmNjLkFuaW1hdGlvbjtcbiAgICAgICAgYW5pbWF0aW9ucy5mb3JFYWNoKChhbmltOmNjLkFuaW1hdGlvbik9PntcbiAgICAgICAgICAgIGxldCBjbGlwcyA9IGFuaW0uZ2V0Q2xpcHMoKVxuICAgICAgICAgICAgaWYoY2xpcHMubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgY2xpcCA9IGNsaXBzWzBdXG4gICAgICAgICAgICAgICAgbGV0IGFuaW1TdGF0ZSA9IGFuaW0ucGxheShjbGlwLm5hbWUpXG4gICAgICAgICAgICAgICAgYW5pbVN0YXRlLndyYXBNb2RlID0gY2MuV3JhcE1vZGUuTm9ybWFsXG4gICAgICAgICAgICAgICAgaWYgKGNsaXAuZHVyYXRpb24gPiBtYXhEdXJhdGlvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG1heER1cmF0aW9uICA9IGNsaXAuZHVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIG1heER1cmF0aW9uQW5pbWF0aW9uID0gYW5pbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmIChmaW5pc2hDYWxsYmFjaylcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IGZ1bmMgPSBmdW5jdGlvbigpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJmaW5pc2ggYW5pbWF0aW9uc1wiKVxuICAgICAgICAgICAgICAgIGlmKG1heER1cmF0aW9uQW5pbWF0aW9uKVxuICAgICAgICAgICAgICAgICAgICBtYXhEdXJhdGlvbkFuaW1hdGlvbi5vZmYoXCJmaW5pc2hlZFwiLGZ1bmMpO1xuICAgICAgICAgICAgICAgIGZpbmlzaENhbGxiYWNrLmNhbGwodGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKG1heER1cmF0aW9uQW5pbWF0aW9uKVxuICAgICAgICAgICAgICAgIG1heER1cmF0aW9uQW5pbWF0aW9uLm9uKFwiZmluaXNoZWRcIixmdW5jKTtcbiAgICAgICAgICAgIGVsc2UgXG4gICAgICAgICAgICAgICAgZmluaXNoQ2FsbGJhY2suY2FsbCh0YXJnZXQpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzdGF0aWMgZ2V0TG9uZ2VzdEFuaW1hdGlvbihhbmltYXRpb25zKVxuICAgIC8vIHtcbiAgICAvLyAgICAgYW5pbWF0aW9ucy5mb3JFYWNoKChhbmltOmNjLkFuaW1hdGlvbik9PntcbiAgICAvLyAgICAgICAgIGxldCBjbGlwcyA9IGFuaW0uZ2V0Q2xpcHMoKVxuICAgIC8vICAgICAgICAgZm9yIChjbGlwcylcbiAgICAgICAgICAgIFxuICAgIC8vICAgICAgICAgLy/ku6XmnIDplb/nmoTkuLrlh4ZcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIC8vVE9ETzrov5jmnKrlrp7njrBcbiAgICBzdGF0aWMgaXNBbmltYXRpb25SdW5uaW5nKGFuaW1hdGlvbnM6IGNjLkFuaW1hdGlvbltdKTogYW55IHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXRpYyBkb0hpZGVBbmltYXRpb25zKGFuaW1hdGlvbnMsZmluaXNoQ2FsbGJhY2s/OkZ1bmN0aW9uLHRhcmdldD8pXG4gICAge1xuICAgICAgICBsZXQgaGFzSGlkZUFuaW1hdGlvbiA9IGZhbHNlO1xuICAgICAgICBsZXQgbWF4RHVyYXRpb24gPSAwIDtcbiAgICAgICAgbGV0IG1heER1cmF0aW9uQW5pbWF0aW9uOmNjLkFuaW1hdGlvbjtcbiAgICAgICAgYW5pbWF0aW9ucy5mb3JFYWNoKChhbmltOmNjLkFuaW1hdGlvbik9PntcbiAgICAgICAgICAgIGxldCBjbGlwcyA9IGFuaW0uZ2V0Q2xpcHMoKVxuICAgICAgICAgICAgaWYoY2xpcHMubGVuZ3RoID09IDIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IGNsaXAgPSBjbGlwc1tjbGlwcy5sZW5ndGgtMV1cbiAgICAgICAgICAgICAgICAvLyBhbmltLm9uKFwiZmluaXNoZWRcIixvbkhpZGVBbmltYXRpb25GaW5pc2hlZClcbiAgICAgICAgICAgICAgICBoYXNIaWRlQW5pbWF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoY2xpcC5uYW1lKVxuICAgICAgICAgICAgICAgIGlmIChjbGlwLmR1cmF0aW9uID4gbWF4RHVyYXRpb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBtYXhEdXJhdGlvbiAgPSBjbGlwLmR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBtYXhEdXJhdGlvbkFuaW1hdGlvbiA9IGFuaW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2UgaWYoY2xpcHMubGVuZ3RoID09IDEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IGNsaXAgPSBjbGlwc1swXTtcbiAgICAgICAgICAgICAgICAvLyBjbGlwLndyYXBNb2RlID0gY2MuV3JhcE1vZGUuUmV2ZXJzZTtcbiAgICAgICAgICAgICAgICBoYXNIaWRlQW5pbWF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsZXQgYW5pbVN0YXRlID0gYW5pbS5wbGF5KGNsaXAubmFtZSlcbiAgICAgICAgICAgICAgICBhbmltU3RhdGUud3JhcE1vZGUgPSBjYy5XcmFwTW9kZS5SZXZlcnNlXG4gICAgICAgICAgICAgICAgaWYgKGNsaXAuZHVyYXRpb24gPiBtYXhEdXJhdGlvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG1heER1cmF0aW9uICA9IGNsaXAuZHVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIG1heER1cmF0aW9uQW5pbWF0aW9uID0gYW5pbTtcbiAgICAgICAgICAgICAgICB9ICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmIChtYXhEdXJhdGlvbkFuaW1hdGlvbiAmJiBmaW5pc2hDYWxsYmFjaylcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IGZ1bmMgPSBmdW5jdGlvbigpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJmaW5pc2ggYW5pbWF0aW9uc1wiKVxuICAgICAgICAgICAgICAgIG1heER1cmF0aW9uQW5pbWF0aW9uLm9mZihcImZpbmlzaGVkXCIsZnVuYyk7XG4gICAgICAgICAgICAgICAgZmluaXNoQ2FsbGJhY2suY2FsbCh0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF4RHVyYXRpb25BbmltYXRpb24ub24oXCJmaW5pc2hlZFwiLGZ1bmMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYXNIaWRlQW5pbWF0aW9uO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRUb2dnbGVJbmRleCh0b2dnbGU6Y2MuVG9nZ2xlKVxuICAgIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IHRvZ2dsZS5ub2RlLmdldFBhcmVudCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCA7aSA8IGNvbnRhaW5lci5jaGlsZHJlbkNvdW50O2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IGNoaWxkID0gY29udGFpbmVyLmNoaWxkcmVuW2ldXG4gICAgICAgICAgICBpZih0b2dnbGUubm9kZSA9PSBjaGlsZCApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZWxlY3RUb2dnbGVJbmRleCh0b2dnbGVDb250YWluZXI6Y2MuTm9kZSxpbmRleClcbiAgICB7XG4gICAgICAgIGlmKHRvZ2dsZUNvbnRhaW5lciA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJbVUlGdW5jdGlvbi5zZWxlY3RUb2dnbGVJbmRleF0gOiBpbnZhbGlkIHRvZ2dsZUNvbnRhaW5lciA6XCIgKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0b2dnbGVOb2RlID0gdG9nZ2xlQ29udGFpbmVyLmNoaWxkcmVuW2luZGV4XVxuICAgICAgICBpZih0b2dnbGVOb2RlKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgdG9nZ2xlID0gdG9nZ2xlTm9kZS5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKVxuICAgICAgICAgICAgaWYodG9nZ2xlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW1VJRnVuY3Rpb24uc2VsZWN0VG9nZ2xlSW5kZXhdIDpcIiArIGluZGV4KVxuICAgICAgICAgICAgICAgIHRvZ2dsZS5jaGVjaygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiW1VJRnVuY3Rpb24uc2VsZWN0VG9nZ2xlSW5kZXhdIDpjYW5ub3QgZmluZCB0b2dnbGUgd2l0aCBpbmRleDpcIisgaW5kZXgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzZXQgYnRuIFxuICAgIHN0YXRpYyBzZXRUb3VjaEVuYWJsZWQobm9kZSxiKVxuICAgIHtcbiAgICAgICAgLy8gZy5mb3JlYWNoTm9kZShub2RlLGNoaWxkPT57XG4gICAgICAgIC8vICAgICBsZXQgYnRuOmNjLkJ1dHRvbiA9IGNoaWxkLmdldENvbXBvbmVudChjYy5CdXR0b24pXG4gICAgICAgIC8vICAgICBpZihidG4pXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJbVUlGdW5jdGlvbl0gXCIgKyBjaGlsZC5uYW1lICsgXCIgdG91Y2ggOiBcIiArIGIpXG4gICAgICAgIC8vICAgICAgICAgYnRuLmludGVyYWN0YWJsZSA9IGI7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIHNldEJ1dHRvbkVuYWJsZWQoYnRuLGIpXG4gICAge1xuICAgICAgICBidG4ubm9kZS5vcGFjaXR5ID0gYj8yNTU6MTI1O1xuICAgICAgICBidG4uaW50ZXJhY3RhYmxlID0gYlxuICAgIH1cblxufSJdfQ==