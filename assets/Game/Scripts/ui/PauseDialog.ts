

const {ccclass, property} = cc._decorator;

@ccclass
export default class PauseDialog extends cc.Component {

    onLoad () {}
    start () {

        appGame.banner.playBanner(1);
    }


    click_share()
    {
    
        
    }

    click_home()
    {
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'游戏界面',content:'点击返回主界面'},function(){});
        cc.director.loadScene("Main")
    }


    click_restart()
    {
        cc.director.loadScene("Game")
        httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'返回界面',content:'重新开始'},function(){});
        if(appGame.gameServerRoom.gameConfigData &&appGame.gameServerRoom.gameConfigData.PauseDialogRestart){
            appGame.videoBanner.playVideoAd(4,0,function(){
               
            })
        }
       
    }
}