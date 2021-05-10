var NativeAd = cc.Class({
    properties: {
    },
    ctor(){
        this.instance = null;
    },
    statics: {
        create: function (data) {
            if(!this.instance){
                this.instance = new NativeAd();
                this.instance.initWithData(data);
                return this.instance;
            }
        }
    },
    initWithData: function (data) {
        if(cc.sys.platform == cc.sys.OPPO_GAME){//oppo
            this.globalData = {
                nativeAd: qg.createNativeAd({
                    adUnitId: '226783',
                }),
            }
        }
        if(this.globalData && this.globalData.nativeAd){
            // 设置原生广告加载成功回调
            this.globalData.nativeAd.onLoad(res => {
                cc.log(`加载原生广告成功`, `：${JSON.stringify(res)}`)
                res.adList && res.adList.length > 0 && (appGame.nativeAdData = res.adList[0])
                appGame.gameServerRoom.emit(consts.LOCAL_GAME_RESULT_NATIVE_AD,{});
            })
            // 设置原生广告出错回调
            this.globalData.nativeAd.onError(err => {
                cc.log(`设置原生广告出错：${JSON.stringify(err)}`)
            })
        }
        
    },
    playAd: function() {
        console.log("播放原生广告==")
        if(this.globalData && this.globalData.nativeAd){
            let nativeAd = this.globalData.nativeAd;
            nativeAd
            .load()
            .then(() => {
                console.log("原生广告显示成功");
                return nativeAd.show();
            })
            .catch((err) => {
                console.log("原生广告出现问题", err);
            });
        }
    }
});
module.exports = NativeAd;
