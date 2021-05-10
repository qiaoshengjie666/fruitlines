var WXNativeAd = cc.Class({
    properties: {
    },
    ctor() {
        this.instance = null;
    },
    statics: {
        create: function (data) {
            if (!this.instance) {
                this.instance = new WXNativeAd();
                this.instance.initWithData(data);
                return this.instance;
            }
        }
    },
    initWithData: function (data) {
        this.targetBannerAdWidth = 200;
        if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'WX') { //微信平台 
            const { windowWidth, windowHeight } = wx.getSystemInfoSync();
            this.width = windowWidth;
            this.height = windowHeight;
            this.adId = 'adunit-48fb335e928d3b4d'
            if(appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.gridId && appGame.gameServerRoom.adConfig.nativeId.WX){
                this.adId = appGame.gameServerRoom.adConfig.nativeId.WX.adUnitId;
            }
            this.globalData = {
                nativeAd: wx.createCustomAd({
                    adUnitId: this.adId,
                    adIntervals:30,
                    style: {
                        left:20,
                        top: this.height - (this.targetBannerAdWidth / 16) * 9,
                    }
                }),
            }
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'原生广告',content:'创建成功',desc:this.adId},function(){
            });
        }
        this.refreshSize();
    },
    playNativeAd: function (isShow) {
        if ((cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'WX')) {
            if (this.globalData && this.globalData.nativeAd) {
                if (isShow) {
                    this.globalData.nativeAd.show();
                } else {
                    this.globalData.nativeAd.hide();
                }
            }
        } else {
            if (this.globalData && this.globalData.nativeAd) {
                let nativeAd = this.globalData.nativeAd;
                nativeAd
                    .load()
                    .then(() => {
                        console.log("原生广告显示成功");
                        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'原生广告',content:'展示成功',desc:this.adId},function(){
                        });
                    })
                    .catch((err) => {
                        console.log("原生广告出现问题", err);
                        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'原生广告',content:'展示失败',desc:this.adId},function(){
                        });
                    });
                nativeAd.onLoad(res => {
                    console.log(`加载原生广告成功`, `：${JSON.stringify(res)}`)
                    //res.adList && res.adList.length > 0 && (appGame.nativeAdData = res.adList[0])
                })
            }
        }
    },
    refreshSize(){
        // 尺寸调整时会触发回调，通过回调拿到的广告真实宽高再进行定位适配处理
        // 注意：如果在回调里再次调整尺寸，要确保不要触发死循环！！！
        if(this.globalData && this.globalData.nativeAd){
            this.globalData.nativeAd.onError((listener) => {
                console.log("原生广告出错")
                httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'原生广告',content:this.adId,desc:listener.errCode+listener.errMsg},function(){
                });
            });
        }
    },
});
module.exports = WXNativeAd;
