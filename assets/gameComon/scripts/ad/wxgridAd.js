var GridAd = cc.Class({
    properties: {
    },
    ctor() {
        this.instance = null;
    },
    statics: {
        create: function (data) {
            if (!this.instance) {
                this.instance = new GridAd();
                this.instance.initWithData(data);
                return this.instance;
            }
        }
    },
    initWithData: function (data) {
        this.targetBannerAdWidth = 200;
        if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'WX') {
            const { windowWidth, windowHeight } = wx.getSystemInfoSync();
            this.width = windowWidth;
            this.height = windowHeight;
            this.adId = 'adunit-144bcfc4f8f3cefe';
            if(appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.gridId && appGame.gameServerRoom.adConfig.gridId.WX){
                this.adId = appGame.gameServerRoom.adConfig.gridId.WX.adUnitId;
            }
            console.log("grid 第一次创建")
            this.globalData = {
                gridAd: wx.createGridAd({
                    adUnitId: this.adId,
                    adIntervals:30,
                    adTheme: 'white',
                    gridCount: 5,
                    style: {
                        // left: 0,
                        // top: 0,
                        // width: 330,
                        width: this.targetBannerAdWidth,
                        top: 0, // 根据系统约定尺寸计算出广告高度
                        left: (this.width - this.targetBannerAdWidth) / 2,
                        opacity: 0.8
                    }
                }),
            }
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'格子广告',content:'创建成功',desc:this.adId},function(){
            });
            this.refreshSize();
        }
    },
    playGridAd: function (isShow) {
        if (this.globalData && this.globalData.gridAd) {
            if(isShow){
                console.log("播放盒子广告");
                this.globalData.gridAd.show().then(() => {
                    console.log("盒子广告展示成功");
                    httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'格子广告',content:'展示成功',desc:this.adId},function(){
                    });
                });
            }else{
                httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'格子广告',content:'隐藏',desc:this.adId},function(){
                });
                this.globalData.gridAd.hide();
            }
        }
    },
    refreshSize(){
        // 尺寸调整时会触发回调，通过回调拿到的广告真实宽高再进行定位适配处理
        // 注意：如果在回调里再次调整尺寸，要确保不要触发死循环！！！
        if(this.globalData && this.globalData.gridAd){
            if(cc.sys.platform == cc.sys.WECHAT_GAME){ //头条平台
                this.globalData.gridAd.onResize((size) => {
                    console.log("grid shezhi大小"+this.height+"   "+this.width)
                    this.globalData.gridAd.style.top = 0;
                    this.globalData.gridAd.style.left = (this.width - size.width) / 2;
                });
            }
            this.globalData.gridAd.onError((listener) => {
                console.log("盒子广告出错")
                httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'格子广告',content:this.adId,desc:listener.errCode+listener.errMsg},function(){
                });
            });
        }
    },

});
module.exports = GridAd;
