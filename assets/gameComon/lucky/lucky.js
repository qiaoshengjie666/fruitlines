var unsealtimeOut;
var bannerTimeOut;
cc.Class({
    extends: cc.Component,

    properties: {
        touchHide:cc.Node,
        touch:cc.Node,
        leftBtn:cc.Node,
        rightBtn:cc.Node,
        unsealBtn:cc.Button, //前往关卡
        closeBtn:cc.Button,
        getBtn:cc.Button,
        redDragon:dragonBones.ArmatureDisplay,
        infoLabel:cc.Label,
        itemReward:cc.Node,
        redLabel:cc.Label,
        openTouch:cc.Node,
        unsealBtnCallback: null,
        closeBtnCallback: null,
        redBagBtnCallback: null,
        blankCallback:null,
        getRewardCallBack:null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.touchHide.on(cc.Node.EventType.TOUCH_END, this.clickTouchHideCallBack, this);
        this.touch.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.touch.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.openTouch.active = false;

        this.leftBtn.on(cc.Node.EventType.TOUCH_END, this.onLeftTouchEnd, this);
        this.rightBtn.on(cc.Node.EventType.TOUCH_END, this.onRightTouchEnd, this);

        this.unsealBtn.node.active = false;
        this.getBtn.node.active = false;
        this.closeBtn.node.active = false;
        this.closeBtn.node.on(cc.Node.EventType.TOUCH_END, this.clickTouchCloseCallBack, this);
        this.unsealBtn.node.on(cc.Node.EventType.TOUCH_END, this.onUnsealTouchEnd, this);
        this.getBtn.node.on(cc.Node.EventType.TOUCH_END, this.onGetTouchEnd, this);

        this.redDragon.addEventListener(dragonBones.EventObject.COMPLETE, this.animationEventHandler, this);
        this.infoLabel.string = '';
        this.currentIndex = 1;
        this.itemReward.active = false;
    },
    /** 
     * @param opts
     * backCB 放弃按钮回调
     * reviveCB 复活按钮回调
     */
    show(opts){
        opts = opts || {};
        if(opts.config){
            this.luckyConfig = opts.config;
        }
        if(opts.info){
            this.info = opts.info;
        }
        if(opts.unsealCB){
            this.unsealBtnCallback = opts.unsealCB;
        }
        if(opts.closeCB){
            this.closeBtnCallback = opts.closeCB;
        }
        if(opts.redbagCB){
            this.redBagBtnCallback = opts.redbagCB;
        }
        if(opts.blankCB){
            this.blankCallback = opts.blankCB;
        }
        if(opts.rewardCB){
            this.getRewardCallBack = opts.rewardCB;
        }
        this.currentIndex = 1;
        this.showRefreshUI(this.info.isResult);
    },

    onDestroy(){
    },

    showRefreshUI(showType){
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'幸运大奖',content:'打开幸运大奖界面'},function(){
        });
        this.currentIndex = 1;
        this.level = this.info.level||1;
        //this.tollgateConfig = this.luckyConfig.tollgate;
        this.tollgateConfig = appGame.gameServerRoom.commonConfig.luckytollgate;
        if(showType==3){//是否达到等级  是否已领取
            for(let i=0;i<this.tollgateConfig.length;i++){
                if(this.tollgateConfig[i].level > this.level){
                    break;
                }else if(this.tollgateConfig[i].level <= this.level){
                    let index = i+1;
                    var ready = cc.sys.localStorage.getItem("luckReadyReceive"+index)
                    if(ready ==null || ready==''){
                        cc.sys.localStorage.setItem("luckUnseal"+index,index)
                    }
                    this.currentIndex = index;
                }
            }
        }else if(showType==2){//结算 是否达到等级
            for(let i=0;i<this.tollgateConfig.length;i++){
                if(this.tollgateConfig[i].level == this.level){
                    let index = i+1;
                    var ready = cc.sys.localStorage.getItem("luckReadyReceive"+index)
                    if(ready ==null || ready==''){
                        cc.sys.localStorage.setItem("luckUnseal"+index,index)
                        this.currentIndex = index;
                        break;
                    }
                }
            }
        }else{//点击按钮显示
            for(let i=0;i<this.tollgateConfig.length;i++){
                let index = i+1;
                var ready = cc.sys.localStorage.getItem("luckReadyReceive"+index)
                if(ready ==null || ready==''){
                    this.currentIndex = index;
                    break;
                }
            }
        }
        
        this.refreshItem(this.currentIndex);
        this.node.active = true;
        bannerTimeOut = setTimeout(function(){
            if(appGame.interstitialAd){
                appGame.interstitialAd.playAd();
            }
            appGame.banner.playBanner(2);
        }.bind(this), 3000);
        appGame.appBoxAd.playBox(true);
        appGame.blockAd.playBlockad(true,4);
    },

    refreshItem(index){
        underscore.each(this.tollgateConfig,function(key,value){
            if(value == index-1){
                let ready = cc.sys.localStorage.getItem("luckReadyReceive"+index);  //是否已经领取
                let unseal = cc.sys.localStorage.getItem("luckUnseal"+index);   //是否解封
                if(ready!='' && ready!=null){//已经领取了
                    this.redDragon.playAnimation('dajiang2',1)
                    this.refreshGetReward(index,2);
                }else{  //未领取
                    if(unseal!='' && unseal!=null){  //已经解封
                        this.redDragon.playAnimation('dajiang2',1)
                        this.refreshGetReward(index,3);
                    }else{ //未解封
                        this.redDragon.playAnimation('dajiang',2)
                        this.refreshGetReward(index,4);
                    }
                }
            }
        }.bind(this))
    },

    clickTouchHideCallBack(event){
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'幸运大奖',content:'关闭空白页面',desc:'点击'},function(){
        });
        let onoff = this.luckyConfig.luckyOnOff;
        if(onoff && onoff.length>0 && onoff[1].video == 1){
            appGame.videoBanner.playVideoAd(1,onoff[1].force,function(isSuc){
                console.log("看视频成功")
                this.onClientResultPlayAD({sceneId:7,eventId:2,isSuccess:true})
                this.blankCallback&&this.blankCallback();
            }.bind(this));
        }else{
            this.onClientResultPlayAD({sceneId:7,eventId:2,isSuccess:true});
            this.blankCallback&&this.blankCallback();
        }
    },
    clickTouchCloseCallBack(event){
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'幸运大奖',content:'关闭按钮',desc:'点击'},function(){
        });
        this.onClientResultPlayAD({sceneId:7,eventId:2,isSuccess:true});
        this.closeBtnCallback&&this.closeBtnCallback();
    },

    onTouchStart(event){
        this.startX = event.getLocation().x;
    },

    onTouchEnd(event){
        let moveX = event.getLocation().x;
        let spaceX = moveX - this.startX;
        if(spaceX<=-10){//向左
            this.onLeftTouchEnd({})
        }else if(spaceX>=10){//向右
            this.onRightTouchEnd({})
        }else if(this.openTouch.active){ //点击redDragon
            this.onRedBagTouchEnd({});
        }   
    },

    onLeftTouchEnd(event){
        if(this.currentIndex<=1){
            appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
                content: "您当前已经在第一个了！"
            });
        }else{
            this.currentIndex--;
            this.refreshItem(this.currentIndex);
        }
    },

    onRightTouchEnd(event){
        if(this.currentIndex>=this.tollgateConfig.length){
            appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
                content: "您当前已经在最后一个了！"
            });
        }else{
            this.currentIndex++;
            this.refreshItem(this.currentIndex);
        }
    },
    //立即挑战
    onUnsealTouchEnd(event){
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'幸运大奖',content:'前往关卡',desc:'点击'},function(){
        });
        this.unsealBtnCallback&&this.unsealBtnCallback();
        this.hide();
    },
    //点击红包 看视频领取
    onRedBagTouchEnd(event){
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'幸运大奖',content:'红包看激励视频',desc:'点击'},function(){
        });
        if(this.itemReward.active){
            return;
        }
        let onoff = this.luckyConfig.luckyOnOff;
        if(onoff && onoff.length>0 && onoff[0].video == 1){
            appGame.videoBanner.playVideoAd(1,onoff[0].force,function(isSuc){
                console.log("看视频成功")
                this.onClientResultPlayAD({sceneId:7,eventId:1,isSuccess:true});
                this.redBagBtnCallback && this.redBagBtnCallback();
            }.bind(this));
        }else{
            this.onClientResultPlayAD({sceneId:7,eventId:1,isSuccess:true});
            this.redBagBtnCallback && this.redBagBtnCallback();
        }
    },
    //领取奖励
    onGetTouchEnd(event){
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'幸运大奖',content:'领取奖励',desc:'点击'},function(){
        });
        cc.log("领取====="+this.currentIndex)
        this.refreshGetReward(this.currentIndex,1);
    },
    //领取奖励的刷新  enter 1相当于点击领取  3展示领取界面
    refreshGetReward(index,enter){
        underscore.each(this.tollgateConfig,function(key,value){
            if(value == index-1){
                if(enter==1){
                    this.getRewardCallBack && this.getRewardCallBack(key.reward.itemId,key.reward.count);
                }
                this.itemReward.getChildByName('item').getComponent('item').init(key.reward.itemId)
                this.itemReward.getChildByName('count').getComponent(cc.Label).string = '×'+key.reward.count 
                if(enter==1){
                    cc.log("index==="+index)
                    this.redLabel.node.active = true;
                    this.itemReward.active = false;
                    this.redDragon.playAnimation('dajiang2',1)
                    cc.sys.localStorage.setItem("luckReadyReceive"+index,index)
                    this.infoLabel.string = key.reward.info;
                    for(let i=0;i<this.tollgateConfig.length;i++){
                        let tempIndex = i+1;
                        let seal = cc.sys.localStorage.getItem("luckUnseal"+tempIndex);
                        if(seal=='' || seal==null){
                            this.currentIndex = tempIndex;
                            this.redDragon.playAnimation('dajiang',2)
                            this.refreshGetReward(tempIndex,4);
                            this.hide();
                            return;
                        }
                    }
                    let isHad = 0;
                    for(let i=0;i<this.tollgateConfig.length;i++){
                        let tempIndex = i+1;
                        let receive = cc.sys.localStorage.getItem("luckReadyReceive"+tempIndex);
                        if(receive=='' || receive==null){
                            this.currentIndex = tempIndex;
                            this.redDragon.playAnimation('dajiang2',1)
                            this.refreshGetReward(tempIndex,3);
                            this.hide();
                            return;
                        }else{
                            isHad++;
                        }
                    }
                    if(isHad == this.tollgateConfig.length){
                        for(let i=0;i<this.tollgateConfig.length;i++){
                            let tempIndex = i+1;
                            cc.sys.localStorage.removeItem("luckReadyReceive"+tempIndex);
                            cc.sys.localStorage.removeItem("luckUnseal"+tempIndex);
                        }
                        this.showRefreshUI(1);
                        this.hide();
                    }else{
                        this.hide();
                    }
                }else if(enter == 2){
                    this.openTouch.active = false;
                    this.redLabel.node.active = false;
                    this.itemReward.active = true;
                    this.getBtn.node.active = true;
                    this.closeBtn.node.active = false;
                    this.unsealBtn.node.active = false;
                    this.getBtn.interactable = false;
                    this.getBtn.node.off(cc.Node.EventType.TOUCH_END, this.onGetTouchEnd, this);
                    this.getBtn.node.getChildByName('label').getComponent(cc.Label).string = "已领取";
                    this.infoLabel.string = '奖励已领取';
                }else if(enter == 3){
                    this.openTouch.active = false;
                    this.redLabel.node.active = false;
                    this.itemReward.active = true;
                    this.getBtn.node.active = true;
                    this.closeBtn.node.active = false;
                    this.unsealBtn.node.active = false;
                    this.getBtn.interactable = true;
                    this.getBtn.node.on(cc.Node.EventType.TOUCH_END, this.onGetTouchEnd, this);
                    this.getBtn.node.getChildByName('label').getComponent(cc.Label).string = "领取"
                    this.infoLabel.string = "恭喜获得";
                    httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'幸运大奖',content:'恭喜获得弹窗'},function(){
                    });
                }else if(enter == 4){
                    this.redLabel.node.active = true;
                    this.itemReward.active = false;
                    this.getBtn.node.active = false;
                    this.openTouch.active = true;
                    this.openTouch.scale = 1.4;
                    this.openTouch.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5,1.2),cc.scaleTo(0.5,1.5))))
                    let sealShow = this.luckyConfig.luckUnseal;
                    if(sealShow&& sealShow.show == 1){
                        let time = sealShow.delay*1000;
                        unsealtimeOut = setTimeout(function(){
                            this.closeBtn.node.active = true;
                            this.unsealBtn.node.active = true;
                        }.bind(this), time);
                    }else{
                        this.closeBtn.node.active = false;
                        this.unsealBtn.node.active = false;
                    }
                    this.infoLabel.string = key.reward.info;
                }
            }
        }.bind(this))
    },

    animationEventHandler(event){
        if (event.type === dragonBones.EventObject.COMPLETE) {
            if (event.animationState.name === "dajiang") {
                this.redDragon.playAnimation('dajiang1',0)
            }
        }
    },
    onClientResultPlayAD(data){
        if(data.sceneId==7){
            if(data.isSuccess){
                if(data.eventId==1){
                    httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'幸运大奖',content:'红包看激励视频',desc:'播放完成'},function(){
                    });
                    cc.sys.localStorage.setItem("luckUnseal"+this.currentIndex,this.currentIndex)
                    this.redDragon.playAnimation('dajiang2',1)
                    this.refreshGetReward(this.currentIndex,3);
                }else if(data.eventId==2 ||data.eventId == 3){
                    if(data.eventId == 3){
                        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'幸运大奖',content:'关闭界面',desc:'播放完成'},function(){
                        });
                    }
                    this.hide();
                }
            }
        }
    },
    hide(){
        clearTimeout(unsealtimeOut);
        clearTimeout(bannerTimeOut);
        appGame.banner.playBanner(3);
        appGame.appBoxAd.playBox(false);
        appGame.blockAd.playBlockad(false);
        this.node.removeFromParent();
    },

    start () {

    },

    // update (dt) {},
});
