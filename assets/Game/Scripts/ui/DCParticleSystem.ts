import DCUI from "../../../framework/plugin_boosts/ui/DCUI";
import { UserInfo } from "../Info";
import { R } from "../hex-lines-game/Res";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DCParticleSystem extends DCUI {

    ps:cc.ParticleSystem;
    onLoad()
    {
        
    }

    start () {}

    onValueChanged(v)
    {
        let data = UserInfo.getSkinById(v);
        // data.ps
        if(this.ps && this.ps.node)
            this.ps.node.destroy();
        cc.loader.loadRes("Game/Particles/"+data.ps,cc.ParticleAsset,(err,ps)=>{
            console.log(data.ps,ps);
            let particleNode = new cc.Node();
            this.ps = particleNode.addComponent(cc.ParticleSystem);
            this.ps.file = ps;
            this.node.addChild(particleNode);
        })
        // this.ps.file = cc.url.raw("resources/Game/Particles/" + data.ps+".plist");
        // cc.loader.loadRes("Game/Particles/"+data.ps,cc.ParticleAsset,(err,ps)=>{
        //     console.log(data.ps,ps);
        //     this.ps.file = ps;
        // })
    }
}