const {ccclass, property} = cc._decorator;

@ccclass
export default class JoyStick extends cc.Component
{
    @property(cc.Node)
    outterCircle:cc.Node = null;

    @property(cc.Node)
    innerCircle:cc.Node = null;

    @property
    radius:number = 250;

    @property
    innerCircleRadius:number =  20;

    // 超出是否relase 
    @property
    releaseAfterOver:boolean = false;

    // dynamic Joystick
    @property
    dynamicJoystick:boolean = false;

    @property
    autoRadius:boolean = false;

    isReleased = false;
    onLoad()
    {
        if(this.autoRadius)
        {
            this.radius = this.outterCircle.getBoundingBox().height/2;
        }
        this.innerCircle.setPosition(0,0);
        this.node.active = false;
    }

    start()
    {
        this.releaseStick();
    }
    
    releaseStick()
    {
        let move = cc.moveTo(0.5 , cc.Vec2.ZERO);
        let action = move.easing(cc.easeExponentialOut());
        this.innerCircle.runAction(action);
        this.isReleased = true;
        
        if(this.dynamicJoystick)
        {
            this.scheduleOnce( this.delayClose, 1)
        }
    }

    delayClose()
    {
        this.node.active = false;
    }

    get axis()
    {
        if(this.isReleased) return cc.Vec2.ZERO;
        let vec = this.innerCircle.getPosition();
        vec.normalizeSelf()
        return vec;
    }

    move(pos:cc.Vec2)
    {
        let mag = pos.mag();
        if(mag > this.radius)
        {
            if(this.releaseAfterOver)
                this.releaseStick();
            
            pos.normalizeSelf();
            pos.mulSelf(this.radius)
        }
        this.innerCircle.setPosition(pos);
    }

    _startPos:cc.Vec2 = cc.Vec2.ZERO;

    // p : screen position
    touchStart(p)
    {
        if(!this.enabled) return;
        this.isReleased = false;
        this._startPos = p;
        this.unschedule(this.delayClose);
        this.node.active = true;
        if(this.dynamicJoystick)
        {
            // converto screen position
            let pos = this.node.getParent().convertToNodeSpaceAR(p);
            this.node.setPosition(pos);
            // this.node.opacity = 0;
            // this.node.runAction(cc.fadeIn(0.5));
        }
        this.move(cc.Vec2.ZERO);
    }

    touchMove(p)
    {
        if(!this.enabled) return;
        let vec = p.sub(this._startPos);
        this.move(vec);
    }

    touchEnd(p)
    {
        if(!this.enabled) return;
        // this.move(p);
        this.releaseStick();
    }
}