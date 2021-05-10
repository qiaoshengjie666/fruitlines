var consts = {
    CLIENT_GAME_START:"client.onGameStart",
    LOCAL_EVENT_POPUP_LOADTIP:"localEventPopupLoadTip", //提示框,
    LOCAL_EVENT_POPUP_DIALOG: "localEventPopupDialog", //对话框,
    LOCAL_EVENT_POPUP_GAME_COMMON: "localEventPopupGameCommon", //公用prefab
    LOCAL_GAME_RESULT_NATIVE_AD: "client.onResultNativeAD", //原生广告
    CLIENT_GAME_VIDEO_SHOW:"client.onGameShowVideo",
    CLIENT_GAME_RESULT_VIDEO_SHOW:"client.onGameResultShowVideo",
    CLIENT_GAME_PLAY_VIDEO:"client.onGamePlayVideo",
    HTTP_RECORD_SERVER:"https://l.h5120.com/te/tk/gameapplist",
    HTTP_EVENT_MIDDLE_DESK_CONFIG:"client.onGameMiddleDeskConfig", //获取配置

    /*需要修改的配置*/
    HTTP_RECORD_PACKAGE:'com.snmi.crazyremove', //包名
    HTTP_RECORD_PACKAGENAME:'疯狂消消消', //游戏名
    GAME_ID:15,
    HTTP_GET_PAAS_DATA_SERVER:'https://cs.snmi.cn/game/GetGameValue',//获取中台服务器配置
    HTTP_GET_GAME_DATA_SERVER:'https://cs.snmi.cn/switch/GetGameValue',//获取游戏服务器配置
    /*不需要修改的配置*/
    HTTP_SPREAD_WORD:"https://s.snmi.cn/game/kl",
    HTTP_SPREAD_REPORT:"https://t.h5data.com/d/gkl?",
    HTTP_SPREAD_CLOSE:"https://t.h5data.com/d/gclose?rid=",

    // https://l.h5120.com  //打点
    // https://cs.snmi.cn   //互跳
    // https://t.h5data.com  //互跳
    // https://s.snmi.cn   //配置
    // https://st.h5120.com  //下载
};

module.exports = consts;
