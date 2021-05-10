// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class InfiniteBackground extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}

    @property(cc.Node)
    bgNode:cc.Node = null;

    @property(cc.Camera)
    camera:cc.Camera= null;

    next:cc.Node;
    prev:cc.Node;
    pre_prev :cc.Node;
    currentNode:cc.Node = null;
    repeatCount = 0;

    size : cc.Size;

    nodepool:cc.NodePool;
    onLoad()
    {
        this.currentNode = this.bgNode;
        this.size = this.currentNode.getContentSize();
        this.nodepool = new cc.NodePool();
    }

    start () {
        if(this.prev == null)
        {
            this.prev = cc.instantiate(this.bgNode);
            this.node.addChild(this.prev);
            this.prev.y =  - this.size.height;
        }
    }

    reset()
    {
        this.repeatCount = 0;
        //todo :remove all 
        //todo:init all
    }
    
    update (dt) {

        if(this.currentNode == null)return
        let pos = cc.Vec2.ZERO;
        this.camera.getWorldToCameraPoint(this.currentNode.position,pos)
        let prev = this.prev;
        if (pos.y < 10)
        {
            // check has next 
            if(this.next == null)
            {
                this.pre_prev = this.prev;
                this.prev = this.currentNode;
                let road = this.nodepool.get()
                if(road == null)
                    road = cc.instantiate(this.currentNode);
                road.setPosition(0,this.size.height * ++this.repeatCount);
                this.node.addChild(road);
                this.currentNode = road;
                this.camera.getWorldToCameraPoint(road.position,pos)
                this.next = null;
                // console.log("create new road")
            }
        }
        if(pos.y > this.size.height - 10)
        {
            //remove previous
            if(this.pre_prev)
            {
                this.nodepool.put(this.pre_prev);
                // console.log("InfiniteBackground : recycle background:" ,this.nodepool.size())
            }
        }
        //todo remove 
    }
}
