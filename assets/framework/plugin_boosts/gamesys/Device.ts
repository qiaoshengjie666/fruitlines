

export default class Device 
{

    static isSfxEnabled = true;

    static isBgmEnabled = true;

    static setSoundsEnable(b:boolean)
    {
        Device.setSFXEnable(b)
        Device.setBGMEnable(b);
    }

    static setSFXEnable(b)
    {
        cc.audioEngine.setEffectsVolume(b == true?1:0);
        Device.isSfxEnabled = b;
        if(!b)
        {
            cc.audioEngine.pauseAllEffects()
        }else{
            cc.audioEngine.resumeAllEffects();
        }
    }

    static _useCCAudioEngine = false;

    static useCCAudioEngine()
    {
        this._useCCAudioEngine = true;
    }

    static useDefaultAudioEngine()
    {
        this._useCCAudioEngine = false;
    }

    static setBGMEnable(b)
    {
        cc.audioEngine.setMusicVolume(b == true?1:0);
        Device.isBgmEnabled = b;
        if(!b)
        {
            cc.audioEngine.pauseMusic()
        }else{
            cc.audioEngine.resumeMusic()
        }
    }


    static playEffect(clip,loop = false)
    {
        if(Device.isSfxEnabled)
        {
            if(cc.sys.platform == cc.sys.QQ_PLAY)
            {
                if(this._useCCAudioEngine)
                {
                    return cc.audioEngine.playEffect(clip,loop)
                }else{
                  
                    
                }
            }else
                return cc.audioEngine.playEffect(clip,loop)
        }
    }

    static stopMusic()
    {
        cc.audioEngine.stopMusic();
    }

    static playMusic(clip,loop = true)
    {
        if(Device.isBgmEnabled)
        {
            return cc.audioEngine.playMusic(clip,loop);
        }
    }

    static vibrate()
    {
        if(cc.sys.WECHAT_GAME == cc.sys.platform)
        {
            wx.vibrateShort()
        }else{
            console.log("not support vibrate on except-wx platfrom ")
        }
    }
}