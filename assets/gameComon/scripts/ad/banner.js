const AppGame = require("../model/appGame");

var Banner = cc.Class({
    properties: {
    },
    ctor(){
        this.instance = null;
    },
    statics: {
        create: function (data) {
            if(!this.instance){
                this.instance = new Banner();
                this.instance.initWithData(data);
                return this.instance;
            }
        }
    },
    initWithData: function (data) {
        this.targetBannerAdWidth = 200;
        if(cc.sys.platform == cc.sys.BYTEDANCE_GAME){ //头条平台
            const{windowWidth,windowHeight} = tt.getSystemInfoSync();
            this.width = windowWidth;
            this.height = windowHeight;
            this.adId = '3o8m16pp3e54cqcd5t';
            if(appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.bannerId && appGame.gameServerRoom.adConfig.bannerId.toutiao){
                this.adId = appGame.gameServerRoom.adConfig.bannerId.toutiao.adUnitId;
            }
            console.log("banner 第一次创建")
            this.globalData = {
                bannerAd: tt.createBannerAd({
                    adUnitId: this.adId,
                    //adIntervals:30,
                    style: {
                        width: this.targetBannerAdWidth,
                        top: this.height - (this.targetBannerAdWidth / 16) * 9, // 根据系统约定尺寸计算出广告高度
                        left : (this.width - this.targetBannerAdWidth) / 2,
                    },
                }),
            }
            this.refreshSize();
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'广告位banner',content:'创建成功',desc:this.adId},function(){
            });
        }else if(cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'QQ'){
            const { windowWidth, windowHeight } = qq.getSystemInfoSync();
            this.width = windowWidth;
            this.height = windowHeight;
            this.adId = '4ef215ca5af9c3b454e9d22a676f7992';
            if(appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.bannerId && appGame.gameServerRoom.adConfig.bannerId.QQ){
                this.adId = appGame.gameServerRoom.adConfig.bannerId.QQ.adUnitId;
            }
            console.log("banner 第一次创建")
            //this.targetBannerAdWidth = 300;
            this.globalData = {
                bannerAd: qq.createBannerAd({
                    adUnitId: this.adId,
                    style: {
                        //width: this.targetBannerAdWidth,
                        //top: this.height - (this.targetBannerAdWidth / 16) * 9, // 根据系统约定尺寸计算出广告高度
                        //left: (this.width - this.targetBannerAdWidth) / 2,
                        width: this.targetBannerAdWidth,
                        top: this.height - (this.targetBannerAdWidth / 16) * 9, // 根据系统约定尺寸计算出广告高度
                        left: (this.width - this.targetBannerAdWidth) / 2,
                    },
                }),
            }
            this.refreshSize();
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'广告位banner',content:'创建成功',desc:this.adId},function(){
            });
        }
        else if(cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'WX'){
            const { windowWidth, windowHeight } = wx.getSystemInfoSync();
            this.width = windowWidth;
            this.height = windowHeight;
            this.adId = '4ef215ca5af9c3b454e9d22a676f7992';
            if(appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.bannerId && appGame.gameServerRoom.adConfig.bannerId.WX){
                this.adId = appGame.gameServerRoom.adConfig.bannerId.WX.adUnitId;
            }
            console.log("banner 第一次创建")
            this.globalData = {
                bannerAd: wx.createBannerAd({
                    adUnitId: this.adId,
                    style: {
                        width: this.targetBannerAdWidth,
                        top: this.height - (this.targetBannerAdWidth / 16) * 9, // 根据系统约定尺寸计算出广告高度
                        left: (this.width - this.targetBannerAdWidth) / 2,
                    },
                }),
            }
            this.refreshSize();
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'广告位banner',content:'创建成功',desc:this.adId},function(){
            });
        }
    },
    scheduleCallBack:function(){
        console.log("n秒后刷新")
        this.playBanner(3);
        this.playBanner(2);
    },
    /*
    *sceneId 1 普通的展示   2 N秒刷新展示   3 隐藏
    */
    playBanner:function(sceneId,refreshTime = 30){
        if(cc.sys.platform == cc.sys.BYTEDANCE_GAME && appGame.gameServerRoom.gameConfigData&&
            appGame.gameServerRoom.gameConfigData.isbanner){
            console.log("banner return")
            return;
        }
        cc.director.getScheduler().enableForTarget(this);
        if(sceneId!=3){
            if(sceneId==2){
                cc.director.getScheduler().schedule(this.scheduleCallBack,this,refreshTime);
            }else{
                cc.director.getScheduler().unschedule(this.scheduleCallBack,this) 
            }
            
            if(cc.sys.platform == cc.sys.BYTEDANCE_GAME){ //头条平台
                if(this.globalData && this.globalData.bannerAd){
                    console.log("banner 隐藏")
                }else{
                    console.log("banner 创建")
                    this.globalData = {
                        bannerAd: tt.createBannerAd({
                            adUnitId: this.adId,
                            //adIntervals:30,
                            style: {
                                width: this.targetBannerAdWidth,
                                top: this.height - (this.targetBannerAdWidth / 16) * 9, // 根据系统约定尺寸计算出广告高度
                                left : (this.width - this.targetBannerAdWidth) / 2,
                            },
                        }),
                    }
                    this.refreshSize();
                    httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'广告位banner',content:'创建成功',desc:this.adId},function(){
                    });
                }                
            }else if(cc.sys.platform == cc.sys.BAIDU_GAME){//百度
                if(this.globalData && this.globalData.bannerAd){
                    this.globalData.bannerAd.destroy();
                    this.globalData.bannerAd = null;
                }
                const{windowWidth,windowHeight} = swan.getSystemInfoSync();
                this.width = windowWidth;
                this.height = windowHeight;
                if(appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.bannerId && appGame.gameServerRoom.adConfig.bannerId.baidu){
                    this.adId = appGame.gameServerRoom.adConfig.bannerId.baidu.adUnitId;
                }
                if(appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.bannerId && appGame.gameServerRoom.adConfig.bannerId.baidu){
                    this.appId = appGame.gameServerRoom.adConfig.bannerId.baidu.appSid;
                }
                this.globalData = {
                    bannerAd: swan.createBannerAd({
                        adUnitId: this.adId,
                        appSid:this.appId,
                        style: {
                            width: this.width,
                            top: this.height - (this.targetBannerAdWidth / 16) * 9, // 根据系统约定尺寸计算出广告高度
                            left : (this.width - this.targetBannerAdWidth) / 2,
                        },
                    }),
                }
                this.refreshSize();
                httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'广告位banner',content:'创建成功',desc:this.adId},function(){
                });
            }else if(cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'QQ'){//QQ
                if(this.globalData && this.globalData.bannerAd){
                    this.globalData.bannerAd.destroy();
                    this.globalData.bannerAd = null;
                }
                const{windowWidth,windowHeight} = qq.getSystemInfoSync();
                this.width = windowWidth;
                this.height = windowHeight;
                if(appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.bannerId && appGame.gameServerRoom.adConfig.bannerId.QQ){
                    this.adId = appGame.gameServerRoom.adConfig.bannerId.QQ.adUnitId;
                }
                this.globalData = {
                    bannerAd: qq.createBannerAd({
                        adUnitId: this.adId,
                        style: {
                            width: this.width,
                            top: this.height - (this.targetBannerAdWidth / 16) * 9, // 根据系统约定尺寸计算出广告高度
                            left : (this.width - this.targetBannerAdWidth) / 2,
                        },
                    }),
                }
                this.refreshSize();
                httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'广告位banner',content:'创建成功',desc:this.adId},function(){
                });
            }
            if(this.globalData && this.globalData.bannerAd){
                console.log("播放banner广告")
                if(cc.sys.platform == cc.sys.BAIDU_GAME){//百度
                    this.globalData.bannerAd.onLoad(() => {
                        console.log('百度banner 加载完成');
                        this.globalData.bannerAd.show().then(() => {
                            console.log("展示成功")
                            httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'广告位banner',content:'展示成功',desc:this.adId},function(){
                            });
                        }).catch((err) => {
                            console.log("展示失败")
                            httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'广告位banner',content:'展示失败',desc:this.adId},function(){
                            });
                        });
                    });
                }else if(cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'QQ'){
                    this.globalData.bannerAd.onLoad(() => {
                        console.log('qqBanner 加载完成');
                        this.globalData.bannerAd.show();
                        console.log("展示成功")
                        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'广告位banner',content:'展示成功',desc:this.adId},function(){
                        });
                    });
                }else{
                    console.log("开始展示广告")
                    this.globalData.bannerAd.show().then(() => {
                        console.log("展示成功")
                        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'广告位banner',content:'展示成功',desc:this.adId},function(){
                        });
                    }).catch((err) => {
                        console.log("展示失败")
                        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'广告位banner',content:'展示失败',desc:this.adId},function(){
                        });
                    });
                }
            }
        }else{
            cc.director.getScheduler().unschedule(this.scheduleCallBack,this) 
            if(cc.sys.platform == cc.sys.BYTEDANCE_GAME){ //头条平台
                if(this.globalData && this.globalData.bannerAd){
                    this.globalData.bannerAd.hide();
                    this.globalData.bannerAd.destroy();
                    this.globalData.bannerAd = null;
                    console.log("字节平台banner 销毁")
                    this.globalData = {
                        bannerAd: tt.createBannerAd({
                            adUnitId: this.adId,
                            //adIntervals:30,
                            style: {
                                width: this.targetBannerAdWidth,
                                top: this.height - (this.targetBannerAdWidth / 16) * 9, // 根据系统约定尺寸计算出广告高度
                                left : (this.width - this.targetBannerAdWidth) / 2,
                            },
                        }),
                    }
                    this.refreshSize();
                    httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'广告位banner',content:'隐藏创建成功',desc:this.adId},function(){
                    });
                }
            }else if (cc.sys.platform == cc.sys.WECHAT_GAME&& appGame.platform == 'WX') { //微信平台
                if (this.globalData && this.globalData.bannerAd) {
                    this.globalData.bannerAd.hide();
                    this.globalData.bannerAd.destroy();
                    this.globalData.bannerAd = null;
                    console.log("banner 销毁")
                    this.globalData = {
                        bannerAd: wx.createBannerAd({
                            adUnitId: this.adId,
                            style: {
                                width: this.targetBannerAdWidth,
                                top: this.height - (this.targetBannerAdWidth / 16) * 9, // 根据系统约定尺寸计算出广告高度
                                left: (this.width - this.targetBannerAdWidth) / 2,
                            },
                        }),
                    }
                    this.refreshSize();
                    httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'广告位banner',content:'隐藏创建成功',desc:this.adId},function(){
                    });
                }
            }else if(cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'QQ'){
                this.globalData.bannerAd.hide();
                httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'广告位banner',content:'隐藏',desc:this.adId},function(){
                });
            }
        }
    },
    refreshSize(){
        // 尺寸调整时会触发回调，通过回调拿到的广告真实宽高再进行定位适配处理
        // 注意：如果在回调里再次调整尺寸，要确保不要触发死循环！！！
        if(this.globalData && this.globalData.bannerAd){
            if(cc.sys.platform == cc.sys.BYTEDANCE_GAME || cc.sys.platform == cc.sys.WECHAT_GAME|| cc.sys.platform == cc.sys.BAIDU_GAME){ //头条平台
                this.globalData.bannerAd.onResize((size) => {
                    console.log("banner shezhi大小"+this.height+"   "+this.width)
                    this.globalData.bannerAd.style.top = this.height - size.height;
                    this.globalData.bannerAd.style.left = (this.width - size.width) / 2;
                    //this.globalData.bannerAd.offResize();
                });
            }
            this.globalData.bannerAd.onError((listener) => {
                console.log("banner 出错"+listener.errCode+listener.errMsg)
                httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'广告位banner',content:this.adId,desc:listener.errCode+listener.errMsg},function(){
                });
                // appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
                //     content:"出错啦！！！"
                //  });
                //this.globalData.bannerAd.offError();
            });
        }
    },
});
module.exports = Banner;