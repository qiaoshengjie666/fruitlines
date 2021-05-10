import Device from "./Device";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PsFx extends cc.Component {
    
    // @property([cc.ParticleSystem])
    particles:cc.ParticleSystem[] = []

    // @property([cc.Animation])
    animations:cc.Animation[] = []

    // armature:dragonBones.ArmatureDisplay = null
    armature:any = null;

    // name:string = null;

    // _callback:Function;
    // _target:any;

    isPlaying:boolean = false;

    @property({type: cc.AudioClip})
    sfx:cc.AudioClip = null

    @property(cc.Sprite)
    sprite:cc.Sprite = null

    playedTime:number = 0;

    @property
    duration:number = -1 ;

    @property
    fadeAfterFinish:number = -1;
    
    @property
    repeatTime:number = 1;

    @property
    removeAfterFinish:boolean = false;


    onLoad()
    {
        if(this.sprite == null)
        {
            this.sprite = this.getComponent(cc.Sprite);
        }
        let anim = this.getComponent(cc.Animation)
        if(anim)
        {
            this.animations.push(anim);
        }
        let root_ps = this.getComponent(cc.ParticleSystem)
        root_ps && this.particles.push(root_ps)
        for (let i = 0; i < this.node.childrenCount; i++) {
            const child = this.node.children[i]
            let ps = child.getComponent(cc.ParticleSystem)   
            if(ps)
                this.particles.push(ps);
            else{
                let anim = child.getComponent(cc.Animation)
                if(anim)
                    this.animations.push(anim);
            }
        }
        if(typeof(dragonBones) !="undefined")
        {
            this.armature = this.getComponent(dragonBones.ArmatureDisplay);
            if(!this.armature)
                this.armature = this.getComponentInChildren(dragonBones.ArmatureDisplay);
        }
    }

    play(audio:cc.AudioClip= null,spriteFrame = null)
    {
        this.isPlaying = true;
        let dur = 0;
        if(audio)
        {
            this.sfx = audio
        }
        if(spriteFrame)
            this.sprite.spriteFrame = spriteFrame;
        
        this.node.active = true;
        for (let i = 0; i < this.particles.length; i++) {
            const element = this.particles[i];
            element.resetSystem();
            if(dur < element.duration)
            {
                dur = element.duration + element.life + element.lifeVar
            }
        }
        for (let i = 0; i < this.animations.length; i++) {
            const element = this.animations[i];
            let clips = element.getClips()
            if(clips && clips.length > 0)
            {
                let clip = clips[0]
                let duration = clip.duration/clip.speed
                if(duration > dur)
                {
                    dur = duration;
                }
                element.play(clip.name);
            }
        }

        if(this.sfx)
        {
            Device.playEffect(this.sfx,false);
        }
        
        if(this.armature)
        {
            this.armature.playAnimation("",this.repeatTime);
            dur = this.duration;
            if(dur <= 0)
            {
                return new Promise((resolve,reject)=>{
                    // this.armature.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, _=>{
                    //     console.log("loop complete");
                    //     this.fadeOnFinish(resolve)
                    // })
                    this.armature.addEventListener(dragonBones.EventObject.COMPLETE, _=>{
                        console.log("armature play complete");
                        if(this.removeAfterFinish)
                        {
                            this.node.removeFromParent();
                        }else{
                            this.fadeOnFinish(resolve)
                        }
                    })
                })
            }
        }else{
            dur = dur + 0.1;
        }
        // console.log("[psfx] play : " ,  this.name,  dur);
        return new Promise((resolve,reject)=>{
            setTimeout(_=>{
                if(!this.isValid) return
                if(this.removeAfterFinish)
                {
                    this.node.removeFromParent();
                }else{
                    this.fadeOnFinish(resolve)
                }
            },dur * 1000)
        })
    }

    fadeOnFinish(callback)
    {
        this.isPlaying = false;
        for (let i = 0; i < this.particles.length; i++) {
            const element = this.particles[i];
            element.stopSystem();
        }
        if(this.fadeAfterFinish > 0)
        {
            let seq = cc.sequence(cc.fadeOut(this.fadeAfterFinish),cc.callFunc(callback))
            this.node.runAction(seq)
        }else{
            callback();
        }
    }

    reset(): any {
        this.playedTime = 0;
    }

    start () {

    }

    // update (dt) {}
}
