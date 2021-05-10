import { UserInfo, ChoiceType } from "../Info";
import View from "../../../framework/plugin_boosts/ui/View";
import { Toast } from "../../../framework/plugin_boosts/ui/ToastManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class DailyGetDialog extends cc.Component {

    onLoad () {}
    start () {}
    diamond:number = 0;

    @property(cc.Label)
    rewardLabel:cc.Label = null;

    onShown()
    {
        this.diamond = g.randomInt(20,50);
        this.rewardLabel.string = cc.js.formatStr("钻石 x " + this.diamond)
    }

    click_get()
    {
        // share or video 
        UserInfo.addDiamond(this.diamond)
        UserInfo.dailyGetTime = new Date().getTime()
        UserInfo.save()
        this.getComponent(View).hide()
    }

    share_succ()
    {
        UserInfo.addDiamond(this.diamond * 2);
        UserInfo.dailyGetTime = new Date().getTime()
        UserInfo.save()
        this.getComponent(View).hide()
    }

    click_get_double()
    {
        //share orvideo
        let choice = UserInfo.getChoice(ChoiceType.DailyGet);
        if (choice == 0)
        {
            this.share_succ();
        }
    }
}