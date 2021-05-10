export default class LocalTimeSystem
{
    static utc_sec:number
    static timer:number;
    static init(utc_msec:number)
    {
        if(utc_msec == null||utc_msec == undefined)return;
        LocalTimeSystem.utc_sec = utc_msec;
        if(cc.sys.WECHAT_GAME == cc.sys.platform)
        {
            wx.onHide(this.onHidden);
            wx.onShow(this.onShown)
        }
        //g.setGlobalInstance(LocalTimeSystem);
    }

    static startTimer()
    {
        this.timer = setInterval(_=>{
            LocalTimeSystem.utc_sec += 1000;
        },1000);
    }

    static stopTimer(){
        clearInterval(this.timer);
    }

    static getSec():number
    {
        return LocalTimeSystem.utc_sec || new Date().getTime()/1000;
    }

    static getDate()
    {
        if(LocalTimeSystem.utc_sec)
        {
            let date =  new Date()
            date.setTime(LocalTimeSystem.utc_sec*1000);
            return date;
        }
        return new Date();
        
    }
  
    static lastLocalTime:number;
    static onHidden()
    {
        console.log("game enter background")
        // this.stopTimer();
    }
    static onShown()
    {
        console.log("game enter foreground")
        // this.startTimer();
    }
}