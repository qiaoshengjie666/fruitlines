export default class UIFunctions
{
    
    static getChildrenAnimations(node): cc.Animation[] {
        let animations:cc.Animation[] = []
        var anim = node.getComponent(cc.Animation)
        if(anim)
            animations.push(anim)
        for (var i = 0; i< node.childrenCount; i++)
        {
            let child = node.children[i];
            var anim = child.getComponent(cc.Animation)
            if(anim)
                animations.push(anim)
        }
        return animations
    }

    static stopAnimations(animations)
    {
        animations.forEach((anim:cc.Animation)=>{
            anim.stop();
        })
    }

    static doShowAnimations(animations,finishCallback?:Function,target?)
    {
        let maxDuration = 0 ;
        let maxDurationAnimation:cc.Animation;
        animations.forEach((anim:cc.Animation)=>{
            let clips = anim.getClips()
            if(clips.length > 0)
            {
                let clip = clips[0]
                let animState = anim.play(clip.name)
                animState.wrapMode = cc.WrapMode.Normal
                if (clip.duration > maxDuration)
                {
                    maxDuration  = clip.duration;
                    maxDurationAnimation = anim;
                }
            }
        })
        if (finishCallback)
        {
            let func = function()
            {
                // console.log("finish animations")
                if(maxDurationAnimation)
                    maxDurationAnimation.off("finished",func);
                finishCallback.call(target);
            }
            if(maxDurationAnimation)
                maxDurationAnimation.on("finished",func);
            else 
                finishCallback.call(target);
            
        }
    }

    // static getLongestAnimation(animations)
    // {
    //     animations.forEach((anim:cc.Animation)=>{
    //         let clips = anim.getClips()
    //         for (clips)
            
    //         //以最长的为准
    //     }
    // }

    //TODO:还未实现
    static isAnimationRunning(animations: cc.Animation[]): any {
        return false;
    }

    static doHideAnimations(animations,finishCallback?:Function,target?)
    {
        let hasHideAnimation = false;
        let maxDuration = 0 ;
        let maxDurationAnimation:cc.Animation;
        animations.forEach((anim:cc.Animation)=>{
            let clips = anim.getClips()
            if(clips.length == 2)
            {
                let clip = clips[clips.length-1]
                // anim.on("finished",onHideAnimationFinished)
                hasHideAnimation = true;
                anim.play(clip.name)
                if (clip.duration > maxDuration)
                {
                    maxDuration  = clip.duration;
                    maxDurationAnimation = anim;
                }
            }else if(clips.length == 1)
            {
                let clip = clips[0];
                // clip.wrapMode = cc.WrapMode.Reverse;
                hasHideAnimation = true;
                let animState = anim.play(clip.name)
                animState.wrapMode = cc.WrapMode.Reverse
                if (clip.duration > maxDuration)
                {
                    maxDuration  = clip.duration;
                    maxDurationAnimation = anim;
                }   
            }
        })
        if (maxDurationAnimation && finishCallback)
        {
            let func = function()
            {
                // console.log("finish animations")
                maxDurationAnimation.off("finished",func);
                finishCallback.call(target);
            }
            maxDurationAnimation.on("finished",func);
        }
        return hasHideAnimation;
    }

    static getToggleIndex(toggle:cc.Toggle)
    {
        let container = toggle.node.getParent();
        for (var i = 0 ;i < container.childrenCount;i++)
        {
            let child = container.children[i]
            if(toggle.node == child )
            {
                return i;
            }
        }
        return -1;
    }

    static selectToggleIndex(toggleContainer:cc.Node,index)
    {
        if(toggleContainer == null) {
            console.warn("[UIFunction.selectToggleIndex] : invalid toggleContainer :" )
            return;
        }
        let toggleNode = toggleContainer.children[index]
        if(toggleNode)
        {
            let toggle = toggleNode.getComponent(cc.Toggle)
            if(toggle)
            {
                console.log("[UIFunction.selectToggleIndex] :" + index)
                toggle.check()
            }
        }else{
            console.warn("[UIFunction.selectToggleIndex] :cannot find toggle with index:"+ index)
        }
    }

    // set btn 
    static setTouchEnabled(node,b)
    {
        // g.foreachNode(node,child=>{
        //     let btn:cc.Button = child.getComponent(cc.Button)
        //     if(btn)
        //     {
        //         console.log("[UIFunction] " + child.name + " touch : " + b)
        //         btn.interactable = b;
        //     }
        // })
    }

    static setButtonEnabled(btn,b)
    {
        btn.node.opacity = b?255:125;
        btn.interactable = b
    }

}