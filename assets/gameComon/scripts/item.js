cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //cc.log("item onLoad")
        this.node.active = false;
    },

    start () {
        
    },
    init(id){
        cc.log("item init")
        if(appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.item){
            underscore.each(appGame.gameServerRoom.commonConfig.item,function(key,value){
                if(key.id == id){
                    util.loadBundleSprite(key.bundle,key.sprite,this.node.getComponent(cc.Sprite),function(){
                        this.node.active = true;
                    }.bind(this));
                }
            }.bind(this));
        }
    }

    // update (dt) {},
});
