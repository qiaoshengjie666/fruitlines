// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var recorder;
var videoPathGame;
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_END,this.shareBtnCallBack,this);
        if(cc.sys.platform == cc.sys.BYTEDANCE_GAME){
            this.node.active = true;
        }else{
            this.node.active = false;
        }
    },

    onDestroy(){
    },

    shareBtnCallBack(event){
        console.log("appGame.isClick",appGame.isClick)
        if(appGame.screenPath==null|| appGame.isClick == false){
            
            appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
                content: "录屏时间太短！！！"
            });
            return;
        }
        if(cc.sys.platform == cc.sys.BYTEDANCE_GAME){ //头条平台
            console.log("头条平台===",appGame.screenPath)
            tt.shareAppMessage({
                channel: 'video',
                title: consts.HTTP_RECORD_PACKAGENAME,
                imageUrl: '',
                query: '',
                extra: {
                videoPath: appGame.screenPath, // 可用录屏得到的视频地址
                videoTopics: ['大家一起来玩'+consts.HTTP_RECORD_PACKAGENAME+'！！！']
                },
                success() {
                    console.log('分享视频成功');
                },
                fail(e) {
               
                    appGame.emitter.emit(consts.LOCAL_EVENT_POPUP_LOADTIP, {
                        content: "分享视频失败"
                    });
                }
            });
        }
    },

    start () {

    },
    // update (dt) {},
});
