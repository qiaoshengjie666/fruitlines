import View from "../../../framework/plugin_boosts/ui/View";
import { UserInfo, ChoiceType } from "../Info";
import { Toast } from "../../../framework/plugin_boosts/ui/ToastManager";
import LuckyDialog from "./LuckyDialog";
import ViewManager from "../../../framework/plugin_boosts/ui/ViewManager";
import Device from "../../../framework/plugin_boosts/gamesys/Device";


const {ccclass, property} = cc._decorator;

@ccclass
export default class GetDialog extends cc.Component {

    onLoad () {}
    start () {}

    @property(cc.Label)
    diamondLabel:cc.Label = null;

    count:number = 0;

    @property(cc.Node)
    node_close:cc.Node =  null;


    share_suc()
    {
        UserInfo.addDiamond(this.count * 2 )
        UserInfo.save();
        // Device.playEffect(R.audio_get_diamond)
        this.getComponent(View).hide();
        ViewManager.instance.show("Game/LuckyDialog")
    }

    click_double()
    {
        //share 
        //if share suc 
        // this.share_suc()
        let choice = UserInfo.getChoice(ChoiceType.Get)
        if(choice == 1)
        {
      
        }else if(choice == 0)
        {
            this.share_suc()
        }else {
            //video\
         
        }
    }

    onShown(count)
    {
        this.count = count;
        // SpriteFrameCache.instance.getSpriteFrame("Game/textures/car/" + cfg.img).then(sf=>this.icon.spriteFrame= sf);
        this.diamondLabel.string =  "+" + count;
        this.node_close.active = false
        this.unschedule(this.delayShow)
        this.scheduleOnce(this.delayShow,2)
    }

    delayShow()
    {
        this.node_close.active = true
    }

    click_no()
    {
        this.getComponent(View).hide();
        UserInfo.addDiamond(this.count )
        UserInfo.save()
        // Device.playEffect(R.audio_get_diamond)
        ViewManager.instance.show("Game/LuckyDialog")
    }
}