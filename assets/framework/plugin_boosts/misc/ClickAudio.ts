import Device from "../gamesys/Device";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ClickAudio extends cc.Component {

    @property({type: cc.AudioClip})
    audio :cc.AudioClip = null;

    @property
    elastic:boolean = false;

    _oldScale:number = 1;

    anim2()
    {
        let act = cc.scaleBy(0.6, 0.9,0.9).easing(cc.easeElasticOut(0.3));
        this.node.runAction(act);
    }
    
    anim2back()
    {
        let act = cc.scaleTo(0.6, this._oldScale,this._oldScale).easing(cc.easeElasticOut(0.3));
        this.node.runAction(act);
    }

    onLoad () {
        if(this.elastic)
        {
            let btn = this.getComponent(cc.Button)
            btn.transition = cc.Button.Transition.COLOR;
            btn.normalColor = cc.Color.WHITE;
            btn.pressedColor = new cc.Color(200,200,200);
            this._oldScale = this.node.scale;
        }
        
        this.node.on('touchstart', _=>{
            //cc.EaseElasticOut:create(
            // this.node.stopAllActions();
            this.elastic && this.anim2();
        }, this.node);

        this.node.on("touchend",_=>{
            Device.playEffect(this.audio,false)
            this.elastic && this.anim2back();
        })
        this.node.on("touchcancel",_=>{
            this.elastic && this.anim2back();
        })
    }

    // update (dt) {}
}
