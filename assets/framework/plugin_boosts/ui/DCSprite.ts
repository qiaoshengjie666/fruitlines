import DCUI from "./DCUI";
import SpriteFrameCache from "../misc/SpriteFrameCache";

const {ccclass, property,requireComponent} = cc._decorator;


@ccclass
@requireComponent(cc.Sprite)
export default class DCSprite extends DCUI {

    sprite:cc.Sprite;
    onLoad()
    {
        this.sprite = this.getComponent(cc.Sprite);
    }

    refreshSpriteFrame(v)
    {
        // this.sprite.spriteFrame = v;
        let spriteframe = SpriteFrameCache.instance.getSpriteFrame(v).then(sf=>{
            this.sprite.spriteFrame = sf;
        }).catch(_=>{console.log("request imageUrl error :" + v)})
    }

    onValueChanged(v)
    {
        this.refreshSpriteFrame(v);
    }
   
    // update (dt) {}
}
