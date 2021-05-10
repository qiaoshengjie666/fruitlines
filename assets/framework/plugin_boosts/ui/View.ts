import UIComponent from "./UIComponent";
import ViewManager from "./ViewManager";
import { event } from "../utils/EventManager";
import UIFunctions from "./UIFunctions";
import { Toast } from "./ToastManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class View extends UIComponent {
    // isTouchEnabled: boolean = true;
    emit(event,msg)
    {
        event.emit(msg)
      // this.node.emit(msg);  
    }

    name:string;
    @property
    isDialog:boolean = false;

    @property
    hasWidget:boolean = false;

    target:any;

    @property
    opacity:number = 160;

    @property
    childrenAnimation:boolean = false;


    touchBlocker:cc.Node = null;
    touchBlockerComp:cc.BlockInputEvents = null;

    // @property
    // showAnimationName:string = "";
    // @property
    // hideAnimationName:string = "";

    // @property([cc.Component.EventHandler])
    // onShownEvents:cc.Component.EventHandler[] = [];

    // @property([cc.Component.EventHandler])
    // onHiddenEvents:cc.Component.EventHandler[] = [];

    animations:cc.Animation[] = [];

    call(event,exp:string)
    {
        // eval(exp);
        //g.execScript(exp);
    }

    setDelegate(target)
    {
        this.target = target;
    }

    onLoad()
    {

        this.touchBlocker = new cc.Node();
        this.touchBlocker.name = "TouchBlocker"
        this.touchBlocker.width = 2000;
        this.touchBlocker.height = 2000;
        this.touchBlockerComp = this.touchBlocker.addComponent(cc.BlockInputEvents)
        this.node.addChild(this.touchBlocker,1000)
        
        if(this.childrenAnimation)
        {
            this.animations = UIFunctions.getChildrenAnimations(this.node)
        }else{
            var anim = this.node.getComponent(cc.Animation)
            if(anim)
                this.animations.push(anim)
        }
        let components = this.getComponents(cc.Component);
        for(var i = 0; i < components.length;i++)
        {
            let comp:any = components[i]
            if(comp != this)
            {
                if(comp.onShown||comp.onHidden)
                {
                    this.target = comp;
                    break;
                }
            }
        }

    }

    start()
    {
        this.touchEnabled = true;
    }

    init(viewname)
    {
        this.name = viewname;
    }

    hideAnimationCallback()
    {
        this.node.active = this.visible;
        ViewManager.instance.checkViewStacks();
    }

    _isHiding:boolean = false;

    /**
     * //如果 实现了view的animation那么需要 animation 去做隐藏
     * 否则会不会有animtion ，系统 将直接 设置 active 为false
     */
    doHideAnimation()
    {
        // if (!this.isDialog)
        // {
        //todo is in hide animtion return ;
        // if(this.isInHideAnimation())return;
        this.node.active = true;
        this._isHiding = true;
        if(!UIFunctions.doHideAnimations(this.animations,this.hideAnimationCallback,this))
        {
            this.node.active = false;
            this._isHiding = false;
        }
        console.log("[View] hide:",this.name);
        this._visibleDirty = false;
    }

    isInHideAnimation(): any {
        return this._isHiding
    }
    
    onHidden()
    {
        this._visibleDirty = false;
        if (this.target && this.target.onHidden)
            this.target.onHidden();
        // cc.Component.EventHandler.emitEvents(this.onHiddenEvents,[params]);
    }

    hide(index:number = 0){
        // super.hide()
        //ViewManager remove dd
        if(index==1){
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'返回界面',content:'点击关闭'},function(){});
        }else if(index == 2){
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER,{title:'关卡选择界面',content:'点击关闭'},function(){});
        }
        this.touchEnabled = false;
        ViewManager.instance.hide(this.node);
    }

    _visibleDirty:boolean;
    
    get visible(){return this._visibleDirty;}


    showAnimationNextFrame(callback)
    {
        this.scheduleOnce(_=>{
            UIFunctions.doShowAnimations(this.animations,callback)
        },0)
    }

    get touchEnabled()
    {
        return !this.touchBlocker.active
    }

    set touchEnabled(b)
    {
        this.touchBlocker.active  = !b
    }

    // setTouchEnabled(bEnabled){
    //     this.touchBlockerComp.enabled = bEnabled;
    //     // UIFunctions.setTouchEnabled(this.node,bEnabled);
    // }

    show(...params)
    {
        super.show();
        console.log("[View] show:",this.name , params);
        UIFunctions.stopAnimations(this.animations);
       
        // call next frames 
        // this.showAnimationDelay()
        //确保在widget 更新结束后开始动画 ，
        return new Promise<void>((resolve,reject)=>{
            let self = this;
            
            let showFinishCallback = function() 
            {
                if(!self.touchEnabled)
                    self.touchEnabled = true;
                resolve();
            }
            if(!this.hasWidget)
            {
                UIFunctions.doShowAnimations(this.animations,showFinishCallback)
            }else{
                this.showAnimationNextFrame(showFinishCallback)
            }
            this._visibleDirty = true;
            if (this.target && this.target.onShown)
            {
                this.target.onShown(...params);
            }
            // cc.Component.EventHandler.emitEvents(this.onShownEvents,[params]);
        })
    }
}
