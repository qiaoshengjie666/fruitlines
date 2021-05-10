import ViewManager from "../../framework/plugin_boosts/ui/ViewManager";


import Device from "../../framework/plugin_boosts/gamesys/Device";
import { R } from "./hex-lines-game/Res";
import { Toast } from "../../framework/plugin_boosts/ui/ToastManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    static instance: Main = null;


    onLoad() {
        Main.instance = this;

        Device.playMusic(R.audio_bgm);
    }
    isNextDay(timeSec)
    {
        return this.isGreaterDate(new Date(),new Date(timeSec))
    };
    isGreaterDate(now,before)
    {
        var diff = now.getTime() - before.getTime() 
        if(diff > 86400000) // 24*60*60*1000
        {
            return true;
        }else{
            if (diff > 0 )
                return now.getDate() != before.getDate()
            else 
                return false; 
        }
    };
  

    start() { 
        appGame.gameServerRoom.emit(consts.CLIENT_GAME_START,function(){
            appGame.banner.playBanner(2);
        });
        
    }

    click_play() {
        ViewManager.instance.show("Game/LevelDialog")
    }

    toggle_sfx(t) {
        Device.setSoundsEnable(!t.isChecked)
    }

    click_skin() {
        ViewManager.instance.show("Game/ShopDialog")
    }

    click_rank() {
        ViewManager.instance.show("wechat/WxRankDialog")
    }

    onShare() {

    }

    click_share() {
       
    }

    click_luck() {
        ViewManager.instance.show("Game/LuckyDialog")
    }


    click_more() {
        Toast.make("敬请期待")
    }

    // update (dt) {}
}
