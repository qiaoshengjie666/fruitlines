/*游戏配置文件获取*/
var Room = require('room');
const consts = require('./model/consts');
var RoomGame = cc.Class({
    extends: Room,

    statics: {
        create: function (data) {
            let roomObj = new RoomGame();
            roomObj.initWithData(data);
            return roomObj;
        }
    },
    initWithData: function (data) {
        this._super(data.room);
        //录屏路径
        this.videoPath = '';
        //获取录屏的系统时间
        this.screenTime = 0;
        this.gameConfigData = {};
        this.wordRid = '';
        this.configSuccess2 = false;
        let url = consts.HTTP_GET_PAAS_DATA_SERVER+"?gameId="+consts.GAME_ID+"&plat="+appGame.platform
           +"&version="+appGame.packageVersion+"&brand="+''+"&from=game";
        //url = 'https://cs.snmi.cn/game/GetGameValue?gameId=50&plat=baidu&version=1.0.0&brand=&from=game'
        console.log("ad url==="+url)
        util.getUrlSerConfig(url,'json','game',function(data){
            this.gameConfigData = data;
            console.log("game =="+JSON.stringify(this.gameConfigData))
            this.configSuccess2 = true;
            if(this.configSuccess2 && this.configSuccess1){
                appGame.gameServerRoom.emit(consts.CLIENT_GAME_START,{});
            }
        }.bind(this));
    },
});

module.exports = RoomGame;
