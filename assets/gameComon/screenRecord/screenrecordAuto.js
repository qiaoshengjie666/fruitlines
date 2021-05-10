// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var recorder;
var screenTime;
var ScreenAuto = cc.Class({
    properties: {
    },
    ctor(){
        this.instance = null;
    },
    statics: {
        create: function (data) {
            if(!this.instance){
                this.instance = new ScreenAuto();
                this.instance.initWithData(data);
                return this.instance;
            }
        }
    },
    onDestroy(){
        clearTimeout(screenTime);
    },
    initWithData(data){
    },

    playScreenCap(caping){
 

    
        if(cc.sys.platform == cc.sys.BYTEDANCE_GAME){ //头条平台
            if(caping){
                appGame.isClick = false;
                screenTime = setTimeout(function() {
                    console.log("setTimeout")
                    appGame.isClick = true;
                    clearTimeout(screenTime);
                }.bind(this), 5000);
        
                if(!recorder) recorder = tt.getGameRecorderManager();
                recorder.start({
                    duration: 10000,
                });
        
                recorder.onStart(res =>{
                    console.log('开始录屏');
                });
        
                recorder.onStop(res =>{
                    console.log('录屏结束=='+res.videoPath);
                    appGame.screenPath = res.videoPath;
                });
            }else{
                clearTimeout(screenTime);
                console.log("clearTimeout")
                if(!recorder) recorder = tt.getGameRecorderManager();
                recorder.stop();
                recorder.onStop((res) => {
                    appGame.screenPath = res.videoPath;
                });
            }
        }
    }
});
module.exports = ScreenAuto;
