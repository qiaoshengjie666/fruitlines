
export default class PoolManager
{
    nodePool:any = {}
    
    nodes = {}

    onCreateObject:Function;
    target:any;
    root:cc.Node;

    managed:boolean = false;
    aliveObjects:cc.Node[] = []

    constructor(root?:cc.Node,onCreateObject?,target?)
    {
        this.onCreateObject = onCreateObject;
        this.target = target;
        this.root = root;
        if(root)
        {
            root.on(cc.Node.EventType.CHILD_REMOVED, this.onNodeRemove, this)
        }
    }

    onNodeRemove(node)
    {
        this.put(node);
    }

    objects()
    {
        return this.aliveObjects;
    }

    clearAlives()
    {
        for (var i = 0; i< this.aliveObjects.length;)
        {
            let obj = this.aliveObjects[i]
            obj.removeFromParent()
        }
    }

    getPool(type):cc.NodePool
    {
        if(typeof(type) != "string" || typeof(type)!= "number" )
        {
            type = type._uuid || type.name;
        }
        let pool = this.nodePool[type];
        if(pool == null)
        {
            pool = new cc.NodePool();
            this.nodePool[type] = pool;
        }
        return pool;
    }

    get(type):cc.Node
    {
        let node =  this.getPool(type).get();
        if(this.onCreateObject)
        {
            if(node == null)
            {
                node = this.onCreateObject.call(this.target,type)
                if(this.root)
                    node.setParent(this.root);
                if(!node )
                    console.warn(node,"onCreateObject must return an object")
                if(this.managed)
                    this.aliveObjects.push(node);
                this.nodes[node.uuid] = type;
                return node;
            }
        }
        if(this.root)
            node.setParent(this.root);
        if(this.managed)
            this.aliveObjects.push(node);
        return node;
    }

    tag(node,type)
    {
        this.nodes[node.uuid] = type;
    }

    put(node:cc.Node,type = null)
    {
        if(type == null)
            type = this.nodes[node.uuid];
        this.getPool(type).put(node);
        if(this.managed)
            this.aliveObjects.splice(this.aliveObjects.indexOf(node),1);
    }

    clear(type?)
    {
        if(this.managed)
            this.aliveObjects.splice(0,this.aliveObjects.length);
        if(type)
            this.getPool(type).clear();
        else
        {
            for (var t in this.nodePool)
            {
                let pool = this.nodePool[t]
                pool.clear();
            }
        }
    }

    size(type)
    {
        return this.getPool(type).size();
    }
}