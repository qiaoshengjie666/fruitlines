var videoId = '';
var BlockAd = cc.Class({
    extends: cc.Component,

    properties: {
    },
    ctor(){
        this.instance = null;
    },
    statics: {
        create: function (data) {
            if(!this.instance){
                this.instance = new BlockAd();
                this.instance.initWithData(data);
                return this.instance;
            }
        }
    },
    initWithData: function (data) {
        this.targetBannerAdWidth = 200;  
    },
    playBlockad:function(show,count = 4){
        if(cc.sys.platform == cc.sys.WECHAT_GAME &&appGame.platform == 'QQ'){ //QQ
          if(show){
            if(this.globalData && this.globalData.blockAd){
              this.globalData.blockAd.destroy();
            }
            const res = qq.getSystemInfoSync();
            this.width = res.windowWidth;
            this.height = res.windowHeight;
            var Version2 = util.compareVersion(res.SDKVersion,"1.15.0");
            //if(Version2 > 0){
                videoId = "672c9551ab8b8b8284a73dde8cf1406a";
                if(appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.blockId && appGame.gameServerRoom.adConfig.blockId.QQ){
                  videoId = appGame.gameServerRoom.adConfig.blockId.QQ.adUnitId;
                }
                this.globalData = {
                    blockAd: qq.createBlockAd({
                      adUnitId: videoId,
                      size: count,
                      orientation: 'landscape',
                      style: {
                        //left: 16,
                        //top: this.height - (this.targetBannerAdWidth / 16) * 9, // 根据系统约定尺寸计算出广告高度,
                        // width: this.targetBannerAdWidth,
                        left:16,
                        top:100,
                      }
                    })
                }
                httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'积木广告',content:'创建成功',desc:videoId},function(){
                });
                //this.refreshSize();
                this.globalData.blockAd.onError(res=>{
                  httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'积木广告',content:videoId,desc:listener.errCode+listener.errMsg},function(){
                  });
                });
                this.globalData.blockAd.onLoad(res=>{
                  console.log('globalData blockAd onLoad',res)
                  this.globalData.blockAd.show().then(()=>{
                    httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'积木广告',content:'展示成功',desc:videoId},function(){
                    });
                  }).catch((res)=>{
                    httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'积木广告',content:'展示失败',desc:videoId},function(){
                    });
                  });
                })
          }else{
              if(this.globalData && this.globalData.blockAd){
                this.globalData.blockAd.destroy();
                httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'积木广告',content:'隐藏',desc:videoId},function(){
                });
              }
          }  
          }
      },
      refreshSize(){
        if(this.globalData && this.globalData.bannerAd){
            if(cc.sys.platform == cc.sys.WECHAT_GAME &&appGame.platform == 'QQ'){ //QQ
                this.globalData.blockAd.onResize((size) => {
                    console.log("积木广告 shezhi大小"+this.height+"   "+this.width)
                    this.globalData.blockAd.style.top = this.height - size.height;
                    this.globalData.blockAd.style.left = (this.width - size.width) / 2;
                });
            }
        }
    },
});
module.exports = BlockAd;
