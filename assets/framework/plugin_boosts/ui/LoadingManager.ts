const {ccclass, property} = cc._decorator;

export var Loading:LoadingManager = null;

@ccclass
export default class LoadingManager extends cc.Component {

    @property(cc.Prefab)
    prefab:cc.Prefab = null;

    loadingNode:cc.Node = null;
    loadingSprite:cc.Sprite = null;
    loadingText:cc.Label = null;
    blockEventComp:cc.BlockInputEvents = null;

    _callback:any = null;
    _target:any = null;
    onLoad()
    {
        this.loadingNode = cc.instantiate(this.prefab);
        this.blockEventComp = this.loadingNode.getComponent(cc.BlockInputEvents);
        this.loadingNode.parent = this.node;
        this.loadingNode.zIndex = 9999;
        this.loadingSprite = this.loadingNode.getComponentInChildren(cc.Sprite);
        this.loadingText = this.loadingNode.getComponentInChildren(cc.Label);
        this.hide();
        Loading = this;
    }

    start () {
        this.loadingSprite.node.runAction(cc.rotateBy(4,360).repeatForever());
    }

    dealyClose()
    {
        this.hide();
        if(this._callback)
        {
            this._callback.call(this._target)
        }
    }

    show(timeout,text=null,modal = true,callback = null,target = null)
    {
        this.loadingNode.active = true;
        this.loadingNode.resumeAllActions();
        this.blockEventComp.enabled = modal
        this._callback = callback 
        this._target = target
        if(text)
            this.loadingText.string = text;
        if(timeout > 0)
        {
            this.unschedule(this.dealyClose);
            this.scheduleOnce(this.dealyClose,timeout)
        }
    }

    hide()
    {
        this.loadingNode.active = false;
        this.loadingNode.pauseAllActions();
    }

    // update (dt) {}
}
