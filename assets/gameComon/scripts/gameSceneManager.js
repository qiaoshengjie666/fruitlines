var AppGame = null;
var GameSceneManager = cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function () {
        if(AppGame == null){
            AppGame = require('appGame');
            AppGame.init();
            this.initAppData(function(){
                var RoomGame = require('roomGame');
                appGame.gameServerRoom = RoomGame.create({});
            }.bind(this));
        }
        appGame.emitter.on(consts.HTTP_EVENT_MIDDLE_DESK_CONFIG,this.refreshGameConfig);
        appGame.emitter.on(consts.LOCAL_EVENT_POPUP_LOADTIP,this.showLoadTipFun);
        appGame.emitter.on(consts.LOCAL_EVENT_POPUP_DIALOG,this.showDialogFun);
        appGame.emitter.on(consts.LOCAL_EVENT_POPUP_GAME_COMMON,this.showCommonUIFun);
    },

    onDestroy(){
        appGame.emitter.off(consts.HTTP_EVENT_MIDDLE_DESK_CONFIG,this.refreshGameConfig);
        appGame.emitter.off(consts.LOCAL_EVENT_POPUP_DIALOG,this.showDialogFun);
        appGame.emitter.off(consts.LOCAL_EVENT_POPUP_LOADTIP,this.showLoadTipFun);
        appGame.emitter.off(consts.LOCAL_EVENT_POPUP_GAME_COMMON,this.showCommonUIFun);
    },

    refreshGameConfig(data){
        var VideoBanner = require('videoBanner');
        appGame.videoBanner = VideoBanner.create({});
        var InterstitialAd = require('interstitialAd');
        appGame.interstitialAd = InterstitialAd.create({});
        var Banner = require('banner');
        appGame.banner = Banner.create({});
        var WXNativeAd = require('wxnativeAd');
        appGame.nativeAd = WXNativeAd.create({});
        var WwxgridAd = require('wxgridAd');
        appGame.gridAd = WwxgridAd.create({});
        var AppBoxAd = require('qqAppBox');
        appGame.appBoxAd = AppBoxAd.create({});
        var BlockAd = require('qqBlockAd');
        appGame.blockAd = BlockAd.create({});
        var ScreenrecordAuto = require('screenrecordAuto');
        appGame.screenAuto = ScreenrecordAuto.create({});
    },

    initAppData(cb){
        appGame.userId = cc.sys.localStorage.getItem("snmi_guid");
        if(appGame.userId==null || appGame.userId==''){
            appGame.userId = util.guid();
            cc.sys.localStorage.setItem("snmi_guid",appGame.userId);
        }

        if(cc.sys.platform === cc.sys.VIVO_GAME){
            if(qg){
                qg.getSystemInfo({
                    success: function (data) {
                        appGame.deviceInfo = data;
                    }
                })
            }
        }else if(cc.sys.platform == cc.sys.BAIDU_GAME){
            swan.getSystemInfo({
                success(res) {
                  console.log(res);
                  appGame.deviceInfo = res;
                },
                fail(res) {
                  console.log(`getSystemInfo ????????????`);
                },
              });
        }else if(cc.sys.platform == cc.sys.BYTEDANCE_GAME){
            tt.getSystemInfo({
                success(res) {
                  console.log(res);
                  appGame.deviceInfo = res;
                },
                fail(res) {
                  console.log(`getSystemInfo ????????????`);
                },
              });
        }else if(cc.sys.platform == cc.sys.MOBILE_BROWSER ||cc.sys.platform == cc.sys.DESKTOP_BROWSER){
            appGame.deviceInfo = '';
        }else if(cc.sys.platform == cc.sys.OPPO_GAME){
            qg.getSystemInfo({
                success: function(res) {
                    appGame.deviceInfo = res;
                },
                fail: function(err) {},
                complete: function(res) {}
            })
        }else if(cc.sys.platform == cc.sys.XIAOMI_GAME){
            qg.getSystemInfo({
                success: function(res) {
                    appGame.deviceInfo = res;
                },
                fail: function(err) {},
                complete: function(res) {}
            })
        }else if(cc.sys.platform == cc.sys.ANDROID){
            appGame.deviceInfo = '';
        }else{
            appGame.deviceInfo = '';
        }
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'??????',content:'???????????????'},function(){
        });
        appGame.appStartTime = new Date().getTime();
        
        let countEnter = cc.sys.localStorage.getItem("snmi_entercount");
        if(countEnter==null || countEnter==''){
            countEnter = 1;
            cc.sys.localStorage.setItem("snmi_entercount",1);
        }else{
            countEnter = parseInt(countEnter);
            countEnter++;
            cc.sys.localStorage.setItem("snmi_entercount",countEnter);
        }
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'??????APP',content:'????????????????????????',desc:countEnter},function(){
        });
        cb();
    },

    disConnectFun() {
        appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_DIALOG, {
            title: '??????',
            content: "???????????????\n?????????????????????",
            okLabel:"??????",
            okCB: function () {
                //App.SceneManager.changeScene("Login");
                //App.isReconnect = false;
            }.bind(this),
        });
    },

    showCommonUIFun(opts){
        let popupPanelEventCallback = function (opts, zIndex, cb) {
            if(opts && opts.prefabName){
                cc.log("prefabName=="+opts.prefabName)
                cc.assetManager.loadBundle(opts.bundle, function(err, bundle){
                    bundle.load(opts.prefabName, cc.Prefab, function (error, prefab) {
                        if (error) {
                            cc.error(error);
                            return;
                        }
                        let isShowing = false;
                        let canvasParent = cc.find('Canvas');
                        if(canvasParent.childrenCount>0){
                            for(let i=0;i<canvasParent.children.length;i++){
                                if(canvasParent.children[i].name == opts.prefabName){
                                    isShowing = true;
                                    break;
                                }
                            }
                        }
                        if(isShowing){
                            return;
                        }
                        // let canvasParent = cc.find('Canvas');
                        // if(canvasParent.childrenCount>0){
                        //     for(let i=0;i<canvasParent.children.length;i++){
                        //         if(canvasParent.children[i].name == opts.prefabName){
                        //             cc.log("prefabName==??????")
                        //             canvasParent.children[i].removeFromParent();
                        //         }
                        //     }
                        // }
                        var instance = cc.instantiate(prefab);
                        canvasParent.addChild(instance);
        
                        var controlComponent = instance.getComponent(opts.prefabName);
                        controlComponent && controlComponent.show && controlComponent.show(opts); //????????????????????????????????????????????????????????????????????????????????????????????????????????????
        
                        instance.zIndex = zIndex;
                        instance.active = true;
        
                        cb && cb(null, instance);
                    }.bind(this));
                }.bind(this));
            }
        };
        opts = opts || {};
        popupPanelEventCallback(opts, opts.zIndex ||1300);
    },

    showDialogFun(opts){
        let popupPanelEventCallback = function (prefabName, opts, zIndex, cb) {
            cc.assetManager.loadBundle('comPrefab', function(err, bundle){
                bundle.load(prefabName, cc.Prefab, function (error, prefab) {
                    if (error) {
                        cc.error(error);
                        return;
                    }
                    let canvasParent = cc.find('Canvas');
                    if(canvasParent.childrenCount>0){
                        for(let i=0;i<canvasParent.children.length;i++){
                            if(canvasParent.children[i].name == 'dialogBox'){
                                canvasParent.children[i].removeFromParent();
                            }
                        }
                    }
                    var instance = cc.instantiate(prefab);
                    canvasParent.addChild(instance);
    
                    var controlComponent = instance.getComponent(prefabName);
                    controlComponent && controlComponent.show && controlComponent.show(opts); //????????????????????????????????????????????????????????????????????????????????????????????????????????????
    
                    instance.zIndex = zIndex;
                    instance.active = true;
    
                    cb && cb(null, instance);
                }.bind(this));
            }.bind(this));
        };
        opts = opts || {};
        popupPanelEventCallback('dialogBox', opts, opts.zIndex ||1400);
    },

    showLoadTipFun(opts){
        let popupPanelEventCallback = function (prefabName, opts, zIndex, cb) {
            cc.assetManager.loadBundle('comPrefab', function(err, bundle){
                bundle.load(prefabName, cc.Prefab, function (error, prefab) {
                    if (error) {
                        cc.error(error);
                        return;
                    }
                    let canvasParent = cc.find('Canvas');
                    if(canvasParent.childrenCount>0){
                        for(let i=0;i<canvasParent.children.length;i++){
                            if(canvasParent.children[i].name == 'loadTip'){
                                canvasParent.children[i].removeFromParent();
                            }
                        }
                    }
                    var instance = cc.instantiate(prefab);
                    canvasParent.addChild(instance);
    
                    var controlComponent = instance.getComponent(prefabName);
                    controlComponent && controlComponent.show && controlComponent.show(opts); //????????????????????????????????????????????????????????????????????????????????????????????????????????????
    
                    instance.zIndex = zIndex;
                    instance.active = true;
    
                    cb && cb(null, instance);
                }.bind(this));
            }.bind(this));
        };
        opts = opts || {};
        popupPanelEventCallback('loadTip', opts, opts.zIndex ||1500);
    },

    showGameHelpFun(opts){
        let popupPanelEventCallback = function (prefabName, opts, zIndex, cb) {
            var prefabPath = 'gameComon/prefab/' + prefabName;
            cc.loader.loadRes(prefabPath, cc.Prefab, function (error, prefab) {
                if (error) {
                    cc.error(error);
                    return;
                }
                var instance = cc.instantiate(prefab);
                cc.find('Canvas').addChild(instance);

                //cc.find("Canvas/alert").addChild(instance);
                var controlComponent = instance.getComponent(prefabName);
                controlComponent && controlComponent.show && controlComponent.show(opts); //????????????????????????????????????????????????????????????????????????????????????????????????????????????

                instance.zIndex = zIndex;
                instance.active = true;

                cb && cb(null, instance);
            });
        };
        opts = opts || {};
        popupPanelEventCallback('helpPanel', opts, opts.zIndex ||1000);
    },
});
module.exports = GameSceneManager;
