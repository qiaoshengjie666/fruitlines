/**
 * 模型层根节点
 */
var Emitter = require('emitter');
var AppGame = cc.Class({
    properties: {
    },

    ctor: function () {
        cc.log('create new AppGame start');
        var self = this;
        this.gameServerRoom = {};
        this.videoBanner = {}; //激励视频
        this.interstitialAd = {}; //插屏广告
        this.banner = {}; //banner广告
        this.nativeAd = {}; //原生广告
        this.appBoxAd = {}; //盒子广告
        this.blockAd = {}; //积木广告
        this.gridAd = {};
        this.deviceInfo = ""; //设备信息
        this.userId = "";  //本地生成的玩家userId
        this.nativeAdData = null;
        this.visibleSize = cc.view.getVisibleSize();
        this.platform = ''; //平台
        this.screenAuto={};//录屏
        this.appStartTime = 0;
        this.appFinishTime = 0;
        this.isClick = false;  //录屏时常判断


        if(cc.sys.platform == cc.sys.BYTEDANCE_GAME){ //字节
            this.packageVersion = "1.0.0";
            this.platform = 'toutiao';
        }else if(cc.sys.platform == cc.sys.WECHAT_GAME){ //微信  QQ   WX
            this.packageVersion = "1.0.0";
            this.platform = 'QQ';
        }else if(cc.sys.platform == cc.sys.BAIDU_GAME){ //百度
            this.packageVersion = "1.0.0";
            this.platform = 'baidu';
        }else if(cc.sys.platform == cc.sys.OPPO_GAME){ //oppo
            this.packageVersion = "1.0.0";
            this.platform = 'oppo';
        }else if(cc.sys.platform == cc.sys.XIAOMI_GAME){ //小米
            this.packageVersion = "1.0.0";
            this.platform = 'xiaomi';
        }else if(cc.sys.platform == cc.sys.VIVO_GAME){  //vivo
            this.packageVersion = "1.0.0";
            this.platform = 'vivo';
        }else if(cc.sys.platform == cc.sys.ANDROID){
            this.packageVersion = "1.0.0";
            this.platform = 'android';
        }else{
            this.packageVersion = "1.0.0";
            this.platform = 'QQ';
        }

        var createObj = function (className) {
            var ctorFun = require(className);
            var obj = new ctorFun(self);
            cc.log('初始化AppGame时已创建%s', className);
            return obj;
        };
        this.audioMgr = createObj('audioMgr'); //音效
        this.emitter = new AppEmitter(this); //弹窗、跑马灯等公用事件的注册和触发工具
        cc.log('create new AppGame end');
        this.show2Hide();
    },
    statics: {
        init: function () {
            if (!window.appGame) {
                cc.log('have no window.AppGame');
                window.consts = require('consts');
                window.httpUtils = require('httpUtils');
                window.async = require('async');
                window.underscore = require('underscore');
                window.util = require('util');
                window.platformFun = require('platformFun');
                if(cc.sys.os == cc.sys.OS_ANDROID) {
                    window.androidHelper = require('androidHelper');
                }
                window.appGame = new AppGame();
            } else {
                cc.log('have window.app, so do nothing');
            }
        }
    },

    show2Hide(){
        /* 游戏进入前台 */
        cc.game.on(cc.game.EVENT_SHOW, function () {
            if(appGame.interstitialAd&&appGame.gameServerRoom.gameConfigData&&!appGame.gameServerRoom.gameConfigData.isbanner){
                appGame.interstitialAd.playAd();
            }
            if(appGame.gameServerRoom && appGame.gameServerRoom.isHadWord){
                util.spreadWordFun();
            }
            console.log('game enter fore on');
        });
        /* 游戏进入后台 */
        cc.game.on(cc.game.EVENT_HIDE, function () {
            console.log('game enter back on');
            if(appGame.gameServerRoom && appGame.gameServerRoom.wordRid){
                util.spreadClose(appGame.gameServerRoom.wordRid);
            }
            if(appGame.appStartTime!=0){//超过10分钟的话不用打点
                appGame.appFinishTime = new Date().getTime() - appGame.appStartTime;
                appGame.appFinishTime = util.timeConvertInt(appGame.appFinishTime);
                httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'关闭APP',content:'APP停留时长',desc:appGame.appFinishTime},function(){
                });
            }
        });
    },
});

module.exports = AppGame;

var AppEmitter = function (app) {
    var addEventListener = this.addEventListener;
    this.on =
        this.addEventListener = function (event, fn, obj) {
            //cc.log('添加app本地事件，%s', event);
            addEventListener.call(this, event, fn, obj);
        };
    var removeEventListener = this.removeEventListener;
    this.off =
        this.removeEventListener = function (event, fn) {
            //cc.log('删除app本地事件，%s', event);
            removeEventListener.call(this, event, fn);
        };
};

AppEmitter.prototype = new EventEmitter();