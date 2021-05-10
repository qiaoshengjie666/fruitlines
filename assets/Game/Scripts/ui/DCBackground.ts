import DCUI from "../../../framework/plugin_boosts/ui/DCUI";
import SpriteFrameCache from "../../../framework/plugin_boosts/misc/SpriteFrameCache";
import { UserInfo } from "../Info";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DCBackground extends DCUI {

    sprite:cc.Sprite;
    onLoad()
    {
        this.sprite = this.getComponent(cc.Sprite);
    }

    start () {}

    onValueChanged(v)
    {
        // let data = UserInfo.getSkinById(v);
        // console.log(data);
        // SpriteFrameCache.instance.getSpriteFrame("Game/Textures/Bgs/"+data.img+".png").then(sf=>this.sprite.spriteFrame = sf);
    }
}