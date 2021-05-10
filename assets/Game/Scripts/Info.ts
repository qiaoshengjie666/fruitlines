import DataCenter, { dc, field } from "../../framework/plugin_boosts/misc/DataCenter";
import { R } from "./hex-lines-game/Res";
import { Toast } from "../../framework/plugin_boosts/ui/ToastManager";
import Device from "../../framework/plugin_boosts/gamesys/Device";



export enum ChoiceType  {
    DailyGet,
    Levelup,
    Get,
    Shop,
    BannerAdRefresh,
    HB,
}

@dc("Info")
export default class UserInfoClass extends DataCenter
{
    choices:[] = []
    version:string = "6";
    // ret: 0:directly-get 1:share 2:video
    getChoice(slotId)
    {
        return this.choices[slotId] || 0;
    }

    init()
    {

    }
    onGetConfig(data)
    {
        if(data)
        {
            let record = data[0]
            if(record)
            {
                this.choices = JSON.parse(record[this.version])
            }
        } 
     
    }

    @field()
    level:number = 1;

    @field()
    selectedSkin:string = "2";

    @field()
    dailyGetTime:number =  new Date(2018,1,1).getTime();

    @field()
    freedrawTime:number = this.dailyGetTime;

    @field()
    luckyVideoWatchTime:number = this.dailyGetTime

    @field()
    shopFreeDiamondTime:number = this.dailyGetTime;

    @field()
    diamond:number = 0;

    @field()
    sfx_enabled:boolean = true;

    @field()
    firstTimeReach:boolean = false;

    @field()
    luckyVideoWatchCount:number = 0;
    timePassed: number = 0;
    stepUsed:number = 0;

    addDiamond(d,b = true)
    {
        if(typeof(d) == "number") this.diamond += d;
        else this.diamond += parseInt(d);
        if(b)
        {
            Toast.make("获得钻石 x" + d)
            Device.playEffect(R.audio_get_diamond);
        }
        if(!this.firstTimeReach)
        {
            if(this.diamond >= 500)
            {
                Toast.make("哇可以买皮肤了，快去皮肤商店看看吧!",2)
                this.firstTimeReach = true
                UserInfo.save();
            }
        }
    }

    currentLevel:number = 1;

    constructor()
    {
        super();
        this.unlock(this.selectedSkin);
        setTimeout(()=>{
            this.save();
        }, 60 * 1000)
        // onexit game =>save
    }

    isUnlock(skin_id)
    {
        let carUnlocked =  localStorage.getItem("unlocked_"+skin_id);
        if(!carUnlocked)
        {
            return false
        }else
        {
            return carUnlocked == "1"
        }
    }

    isAllUnlocked()
    {
        let c = 0;
        for(var i = 0 ;i <R.skinConfig.json.length;i++)
        {
            var v = R.skinConfig.json[i]
            if(UserInfo.isUnlock(v.id))
            {
                c ++
            }
        }   
        return c == R.skinConfig.json.length
    }


    getSkinById(id: any): any {
        let res = R.skinConfig.json.filter(v=>{return v.id == id});
        return res[0]
    }


    unlock(skin_id)
    {
        localStorage.setItem("unlocked_"+skin_id , "1")
    }

}
export var UserInfo:UserInfoClass = DataCenter.register(UserInfoClass)