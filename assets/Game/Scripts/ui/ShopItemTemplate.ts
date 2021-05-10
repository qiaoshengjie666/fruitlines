import Signal from "../../../framework/plugin_boosts/misc/Signal";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShopItemTemplate extends cc.Component {

    onLoad () {}
    start () {}


    @property(cc.Label)
    titleLabel:cc.Label = null;

    @property(cc.Node)
    selectedFlag:cc.Node = null;

    @property(cc.Sprite)
    bgmini:cc.Sprite = null;
    @property(cc.Node)
    btnBuyNode:cc.Node = null;

    @property(cc.Node)
    maskNode:cc.Node = null;

    @property(cc.Node)
    borderNode:cc.Node = null;

    @property(cc.Label)
    diamondLabel:cc.Label = null;

    btnSignal:Signal = new Signal();

    data:any = null;
    
    click_unlock()
    {
        this.btnSignal.fire(this.data);
    }
}