// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var recorder;
var videoPathGame;
var countDownTimeOut;
cc.Class({
    extends: cc.Component,

    properties: {
        screenSprite:[cc.SpriteFrame]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //true可点击   false不可点击
        this.isClick = true;
        //1 可以点击录屏   2 正在录屏中   3分享
        this.screenStatus = 1;
        this.node.on(cc.Node.EventType.TOUCH_END,this.screenBtnCallBack,this);
        this.initRefreshUI();
        if(cc.sys.platform == cc.sys.BYTEDANCE_GAME){
            this.node.active = true;
        }else{
            this.node.active = false;
        }
    },

    onDestroy(){
        clearTimeout(countDownTimeOut);
    },

    initRefreshUI(){
        if(this.screenStatus ==3){
            this.node.getChildByName('Background').getComponent(cc.Sprite).spriteFrame = this.screenSprite[2];
        }else if(this.screenStatus ==2){
            this.node.getChildByName('Background').getComponent(cc.Sprite).spriteFrame = this.screenSprite[1];
        }else{
            this.node.getChildByName('Background').getComponent(cc.Sprite).spriteFrame = this.screenSprite[0];
        }
    },

    screenBtnCallBack(event){
        if(!this.isClick){ //录屏时间太短   不能点击
            appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
                content:"录屏时间太短！！！"
            });
            return;
        }
        if(this.screenStatus == 1){//点击录屏
            this.screenStatus = 2;
        }else if(this.screenStatus == 2){//点击录屏中
            this.screenStatus = 3;
        }else if(this.screenStatus == 3){//点击分享
            this.screenStatus = 1;
        }
        if(this.screenStatus==2){
            this.isClick = false;
        }
        countDownTimeOut = setTimeout(function() {
            this.isClick = true;
            clearTimeout(countDownTimeOut);
        }.bind(this), 5000);
        this.initRefreshUI()
        if(cc.sys.platform == cc.sys.BYTEDANCE_GAME){ //头条平台
            if(this.screenStatus==1){
                if(videoPathGame==null){
                    appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
                        content: "录屏时间太短！！！"
                    });
                    return;
                }
                if(cc.sys.platform == cc.sys.BYTEDANCE_GAME){ //头条平台
                    tt.shareAppMessage({
                        channel: 'video',
                        title: consts.HTTP_RECORD_PACKAGENAME,
                        imageUrl: '',
                        query: '',
                        extra: {
                            videoPath: videoPathGame, // 可用录屏得到的视频地址
                            videoTopics: ['大家一起来玩'+consts.HTTP_RECORD_PACKAGENAME+'！！！']
                        },
                        success() {
                            console.log('分享视频成功');
                        },
                        fail(e) {
                            console.log('分享视频失败');
                            appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
                                content: "分享视频失败"
                            });
                        }
                    });
                }
            }else if(this.screenStatus==2){
                if(!recorder) recorder = tt.getGameRecorderManager();
                recorder.start({
                    duration: 100000,
                });

                recorder.onStart(res =>{
                    console.log('开始录屏');
                });
        
                recorder.onStop(res =>{
                    console.log(res.videoPath);
                    videoPathGame = res.videoPath;
                    console.log('录屏结束');
                });
            }else if(this.screenStatus==3){
                if(!recorder) recorder = tt.getGameRecorderManager();
                recorder.stop();
                recorder.onStop((res) => {
                    videoPathGame = res.videoPath;
                    console.log('手动停止录屏==='+ res.videoPath)
                });
            }
        }
    },

    start () {

    },
    // update (dt) {},
});
