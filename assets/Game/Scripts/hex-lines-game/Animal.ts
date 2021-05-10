import { R } from "./Res";
import G from"../g - 001";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Animal extends cc.Component {

    @property(cc.Sprite)
    sprite:cc.Sprite = null;


    animation:cc.Animation = null;
    
    onLoad () {
        this.animation = this.getComponentInChildren(cc.Animation);
        this.animation.on("finished", this.onFinish,this)
    }

    onFinish(s,a:cc.AnimationState)
    {
        if(a.clip.name == "animal_jump")
        {
            this.animation.play("animal_idle")
        }
    }

    start () {
        this.animation.play("animal_idle");
    }

    connected() {
        let state = this.animation.play("animal_jump");
        state.wrapMode = cc.WrapMode.Normal;
    }

    _loopJump()
    {
        let state = this.animation.play("animal_jump")
        state.wrapMode = cc.WrapMode.Loop;
    }

    loopJump(d)
    {
        this.scheduleOnce(this._loopJump, this.randomFloat(0,d))
    }

    randomFloat (min:number,max:number)
    {
        return Math.random() * (max - min) + min;
    };
}