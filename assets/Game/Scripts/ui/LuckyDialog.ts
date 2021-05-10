import { Toast } from "../../../framework/plugin_boosts/ui/ToastManager";
import ViewManager from "../../../framework/plugin_boosts/ui/ViewManager";
import View from "../../../framework/plugin_boosts/ui/View";
import { UserInfo } from "../Info";

import Device from "../../../framework/plugin_boosts/gamesys/Device";
import { R } from "../hex-lines-game/Res";
import UIFunctions from "../../../framework/plugin_boosts/ui/UIFunctions";
import Main from "../Main";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LuckyDialog extends cc.Component {

    
    start () {}

    @property(cc.Sprite)
    wheelSp:cc.Sprite

    _canRotate = true;

    @property([cc.Sprite])
    sprites:cc.Sprite[] = []

    @property([cc.Label])
    labels:cc.Label[] = []

    @property(cc.Button)
    btn_freedraw:cc.Button = null;

    @property(cc.Button)
    btn_videodraw:cc.Button = null;

    @property(cc.Node)
    freedrawTip:cc.Node = null;


    @property(cc.Label)
    drawLabel:cc.Label = null;

    static MaxVideoCount = 5;

    // click_draw()
    // {

    // }

    pool = []
    

    share_succ()
    {
        this.startDraw();
        UserInfo.freedrawTime = new Date().getTime()
        UserInfo.save()
      //  Main.instance.refreshRedpoints()
        this.onShown();
    }

    click_freeedraw()
    {
        // if (g.isNextDay(UserInfo.freedrawTime))
        // {
        //     this.share_succ()
        // }
    }

    onLoad () {
        for (var i = 0 ;i < R.luckyConfig.json.length; i ++)
        {
            var cfg = R.luckyConfig.json[i];
            let chance = parseFloat(cfg.chance)
            for (var j = 0 ; j < chance * 2 ; j++)
            {
                this.pool.push(i);
            }
        }
        this.pool.shuffle()
        console.log(this.pool);
    }

    startDraw()
    {
        let id = g.getRandomInArray(this.pool)
        this.startWheel(id)
        Device.playEffect(R.audio_draw);
    }
    isNextDay(timeSec)
    {
    return this.isGreaterDate(new Date(),new Date(timeSec))
    }
    isGreaterDate = function(now,before)
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
    // 5次
    click_videodraw()
    {
        if (UserInfo.luckyVideoWatchCount >= LuckyDialog.MaxVideoCount)
        {
            if(this.isNextDay(UserInfo.luckyVideoWatchTime))
            {
                UserInfo.luckyVideoWatchCount = 0;
                UserInfo.luckyVideoWatchTime = new Date().getTime();
            }else{
    
                return;
            }
        }else{
 
        }

    }


    calculateAngle(index:number){//奖品的index从0开始
        let angle = -(index-1) * 60 - 30  -  4 * 360 -  this.wheelSp.node.rotation %360 
        return angle
    }

    onShown()
    {
        if (UserInfo.luckyVideoWatchCount >=  LuckyDialog.MaxVideoCount)
        {
            this.drawLabel.string = "已用完"
            UIFunctions.setButtonEnabled(this.btn_videodraw,false)
        }else{
            this.drawLabel.string = "看视频抽奖"
            UIFunctions.setButtonEnabled(this.btn_videodraw,true)
        }
        if (g.isGreaterDate(new Date(),  new Date(UserInfo.freedrawTime)) )
        {
            //free draw 
            this.btn_freedraw.interactable = true
            this.btn_freedraw.node.opacity = 255;
            this.freedrawTip.active = false
        }else{
            this.btn_freedraw.interactable = false
            this.btn_freedraw.node.opacity = 100;
            this.freedrawTip.active = true;
        }

        for (var i = 0 ; i< R.luckyConfig.json.length; i ++)
        {
            let cfg = R.luckyConfig.json[i]
            this.labels[i].string = cfg.gold_reward +""
        }
    }

    startWheel(id)
    {
        console.log("target wheel:" ,id);
        let angle = this.calculateAngle(id)
        if (!this._canRotate){
            Toast.make('正在给您挑选奖品...');
            return
        }
        this._canRotate = false

        let stage3 = cc.rotateBy(Math.abs(angle/400),angle)
        let callFunc = cc.callFunc(function(){
            this._canRotate = true
            this.showRes(id)
        }.bind(this))
        let sequence = cc.sequence(stage3,callFunc)
        this.wheelSp.node.runAction(sequence.easing(cc.easeQuadraticActionInOut()))
    }

    showRes(id)
    {
        let cfg = R.luckyConfig.json[id]
        let gold = !isNaN((Number(cfg.gold_reward)))
        if(gold)
        {
            this.getComponent(View).hide()
            ViewManager.instance.show("Game/GetDialog",cfg.gold_reward)
        }
        else{
            //神秘
            Toast.make("恭喜你抽中了 " + cfg.gold_reward);
            UserInfo.unlock(g.randomInt(0,6));
            // Device.playEffect(R.audio_unlock);
        }
    }

    update(dt) {

    }

    click_close()
    {
        if (!this._canRotate){
            Toast.make('正在给您挑选奖品...');
            return 
        }
        this.getComponent(View).hide()
    }


}