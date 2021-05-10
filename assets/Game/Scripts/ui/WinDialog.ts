import { UserInfo, ChoiceType } from "../Info";

import ViewManager from "../../../framework/plugin_boosts/ui/ViewManager";
import Consts from "../hex-lines-game/Consts";


const {ccclass, property} = cc._decorator;

@ccclass
export default class WinDialog extends cc.Component {


    @property(cc.ParticleSystem)
    ps:cc.ParticleSystem = null;

    @property(cc.Label)
    levelLabel:cc.Label = null;

    @property(cc.Node)
    screenShareAuto:cc.Node = null;
    
    onLoad () {}
    start () {}
    decreaseFomula (max,min,t,d)
    {
        return max - (t/ ( t + d) * (max - min) )
    };
    onShown()
    {
        this.screenShareAuto.active =  false;
        if(appGame.platform == "toutiao"){
            appGame.screenAuto.playScreenCap(false)
            this.screenShareAuto.active =  true;
        }
        this.ps.resetSystem();
        

        this.levelLabel.string = cc.js.formatStr("关卡 "+UserInfo.currentLevel)

        let p = this.decreaseFomula(0.99,0.3,UserInfo.timePassed + UserInfo.stepUsed,UserInfo.currentLevel + 50 )

        
        if(UserInfo.level == UserInfo.currentLevel)
        {
            let lv = UserInfo.level
            let choise = UserInfo.getChoice(ChoiceType.Levelup);
            // if(choise > 0 && Math.random() > 0.5 && lv >= 3)
            // {
            //     this.scheduleOnce(_=>{
            //         ViewManager.instance.show("Game/LevelupDialog",lv,p)
            //     },1)
                
            // }else{
               
            //     p = Math.min(p,1);
            //     let diamond = Math.floor(Math.max(30 * p,10))
          
            //     UserInfo.addDiamond(diamond);
            // }
            UserInfo.level = lv + 1
         
            UserInfo.save();
 
        }
        let choise = UserInfo.getChoice(ChoiceType.HB);
        if(choise == 1)
        {
            if(UserInfo.level >= 3)
            {
                if(!UserInfo.isUnlock(Consts.FreeSkinId))
                {
                    ViewManager.instance.show("Game/HbDialog")
                }
            }
        }
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'结算界面',content:'第'+UserInfo.level+"关"},function(){});
        appGame.banner.playBanner(1);
    }

    click_rank()
    {
        ViewManager.instance.show("wechat/WxRankDialog")
    }
    //修改成开始当前游戏
    click_shop()
    {
        cc.director.loadScene("Game")
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'结算界面',content:'点击重玩'},function(){});
        if(appGame.gameServerRoom.gameConfigData &&appGame.gameServerRoom.gameConfigData.winAgain){
            appGame.videoBanner.playVideoAd(3,0,function(){
              //  UserInfo.currentLevel = UserInfo.currentLevel ;
               
            })
        }

        //ViewManager.instance.show("Game/ShopDialog");
    }

    click_next()
    {
        var btn3 = this.node.getChildByName("btn3").getComponent(cc.Button);
        btn3.enabled = false;
        this.scheduleOnce(function(){
            btn3.enabled = true;
        }.bind(this),2);
        UserInfo.currentLevel = UserInfo.currentLevel +1;
        cc.director.loadScene("Game")
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'结算界面',content:'点击下一关'},function(){});
        if(appGame.gameServerRoom.gameConfigData &&appGame.gameServerRoom.gameConfigData.winNextLevel){
            appGame.videoBanner.playVideoAd(2,0,function(){
                cc.log("win1");
                btn3.enabled = true;
            }.bind(this))
        }
      
    }

    click_home()
    {
        cc.director.loadScene("Main")
    }

    click_share()
    {

    }
}