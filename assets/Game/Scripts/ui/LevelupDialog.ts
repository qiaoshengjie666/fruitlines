import { UserInfo, ChoiceType } from "../Info";
import View from "../../../framework/plugin_boosts/ui/View";


const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelupDialog extends cc.Component {

    @property(cc.Label)
    diamondLabel:cc.Label = null;


    @property(cc.Label)
    btnLabel:cc.Label = null;

    @property(cc.Label)
    tipLabel:cc.Label = null;

    @property(cc.Label)
    levelLabel:cc.Label = null;

    mult:number = 1;

    baseDiamond:number = 0;

    onLoad () {}
    start () {}
    onShown(level,p)
    {
        //给钻石
        p = Math.min(p,1);
        let diamond = Math.floor(Math.max(30 * p,10))
        this.baseDiamond = diamond;
        this.diamondLabel.string = diamond.toString();
        this.levelLabel.string = cc.js.formatStr("- 第 %s 关 - ",level)

        // if(Math.random() > 0.7)
        // {
        //     this.mult = g.randomInt(3,6)
        //     this.btnLabel.string = this.mult +"倍领取"
        // }else{
        //     this.btnLabel.string = "双倍领取"
        //     this.mult = 2
        // }
        //this.tipLabel.string ="恭喜获得" + this.btnLabel.string +"奖励机会"
    }

    click_get()
    {
        UserInfo.addDiamond(this.baseDiamond);
        UserInfo.save();
        this.getComponent(View).hide()
    }

    share_suc()
    {
        UserInfo.addDiamond(this.baseDiamond*this.mult);
        UserInfo.save();
        this.getComponent(View).hide()
    }

    click_getex()
    {
        let choise = UserInfo.getChoice(ChoiceType.Levelup);

        
    }
}