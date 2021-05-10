// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onChangeGameBtnCallBack, this);
    },

    start () {

    },

    onChangeGameBtnCallBack(event){
        if(cc.sys.platform == cc.sys.BYTEDANCE_GAME){
            const systemInfo = tt.getSystemInfoSync();
            // iOS 不支持，建议先检测再使用
            if (systemInfo.platform !== "ios") {
                // 打开互跳弹窗
                tt.showMoreGamesModal({
                    appLaunchOptions: [
                    {
                        appId: "tt7fbb0906e080eb91",
                        extraData: {},
                    },
                    {
                        appId: "tt71aa0717ee919412",
                        extraData: {},
                    },
                    {
                        appId: "tt83a9f5141c9278e6",
                        extraData: {},
                    },
                    {
                        appId: "tt1b516dec846adc47",
                        extraData: {},
                    },
                    {
                        appId: "ttcf78b9c550430232",
                        extraData: {},
                    },
                    {
                        appId: "tt62341489fd0f437a",
                        extraData: {},
                    },
                    ],
                    success(res) {
                    console.log("success", res.errMsg);
                    },
                    fail(res) {
                    console.log("fail", res.errMsg);
                    },
                });
            }
        }
    },

    // update (dt) {},
});
