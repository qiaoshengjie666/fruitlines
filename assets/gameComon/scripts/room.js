/*中台配置文件获取*/
var Emitter = require('emitter');
const consts = require('./model/consts');
var Room = cc.Class({
    extends: Emitter,
    initWithData: function (data) {
        this.adConfig = {};
        this.commonConfig = {};
        this.configSuccess1 = false;
        this.isHadWord = false;
        async.waterfall([function(cb){
            let url = consts.HTTP_GET_PAAS_DATA_SERVER+"?gameId="+consts.GAME_ID+"&plat=all"
           +"&version=all"+"&brand="+''+"&from=ad";
            //url = 'https://cs.snmi.cn/game/GetGameValue?gameId=50&plat=baidu&version=1.0.0&brand=&from=ad'
            console.log("ad url==="+url)
            util.getUrlSerConfig(url,'comJson','comAdConfig',function(data){
                this.adConfig = data;
                console.log("ad =="+JSON.stringify(this.adConfig))
                appGame.emitter.emit(consts.HTTP_EVENT_MIDDLE_DESK_CONFIG,{});
                cb(null);
            }.bind(this));
        }.bind(this),function(cb){
            let url = consts.HTTP_GET_PAAS_DATA_SERVER+"?gameId="+consts.GAME_ID+"&plat=all"
           +"&version=all"+"&brand="+''+"&from=MiddleDesk";
            //url = 'https://cs.snmi.cn/game/GetGameValue?gameId=50&plat=baidu&version=1.0.0&brand=&from=MiddleDesk'
            //console.log("middledesk url==="+url)
            util.getUrlSerConfig(url,'comJson','comConfig',function(data){
                this.commonConfig = data;
               // console.log("MiddleDesk =="+JSON.stringify(this.commonConfig))
                let wordShow = 0;
                if(cc.sys.platform == cc.sys.BAIDU_GAME){
                    wordShow = this.commonConfig.word.baidu;
                    this.getPlatformConfig('baidu');
                }else if(cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'WX'){
                    wordShow = this.commonConfig.word.WX;
                    this.getPlatformConfig('WX');
                }else if(cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'QQ'){
                    wordShow = this.commonConfig.word.QQ;
                    this.getPlatformConfig('QQ');
                }else if(cc.sys.platform == cc.sys.BYTEDANCE_GAME){
                    wordShow = this.commonConfig.word.toutiao;
                    this.getPlatformConfig('toutiao');
                }else{
                    this.getPlatformConfig('html5');
                }
                if(wordShow){
                    this.isHadWord = true;
                    util.spreadWordFun();
                }
                this.configSuccess1 = true;
                if(this.configSuccess2 && this.configSuccess1){
                    appGame.gameServerRoom.emit(consts.CLIENT_GAME_START,{});
                }
            }.bind(this));
        }.bind(this)],function(err){
            console.log("读取配置出错了!!")
        });
    },
    getPlatformConfig(plat){
        this.commonConfig.sign = this.commonConfig.sign[plat];
        this.commonConfig.revive = this.commonConfig.revive[plat];
        this.commonConfig.result = this.commonConfig.result[plat];
        this.commonConfig.lucky = this.commonConfig.lucky[plat];
    },
});

module.exports = Room;
