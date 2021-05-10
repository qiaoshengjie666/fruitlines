var countDownInterval;
cc.Class({
    extends: cc.Component,

    properties: {
        clockNode:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //注册监听事件
        appGame.gameServerRoom.on("updateCompetitionTime", this.updateTime,this);
        this.clockNode.getComponent(cc.ProgressBar).progress = 1;
        this._count = 0;
    },

    onDestroy () {
       //删除监听事件
       appGame.gameServerRoom.off("updateCompetitionTime", this.updateTime,this);
       clearInterval(countDownInterval);
    },

    start () {

    },

    updateTime(type,count,totalcount){
        if(type==1){//开始倒计时
            count = count*1000;
            totalcount = totalcount*1000;
            let durationtime = 100;
            this._count = count;
            if(this.clockNode){
                this.clockNode.getComponent(cc.ProgressBar).progress = this._count/totalcount;
            }
            clearInterval(countDownInterval);
            countDownInterval = setInterval(function() {
                if(this._count>durationtime){
                    this._count-=durationtime;
                }else{
                    this._count = 0;
                    appGame.gameServerRoom.emit("competitionGameOver", 2);
                    clearInterval(countDownInterval);
                }
                if(this.clockNode){
                    this.clockNode.getComponent(cc.ProgressBar).progress = this._count/totalcount;
                }
            }.bind(this), durationtime);
        }else{//关闭倒计时
            clearInterval(countDownInterval);
        }
    }

    // update (dt) {},
});
