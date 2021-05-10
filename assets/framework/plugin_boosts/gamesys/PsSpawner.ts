import PsFx from "./PsFx";
import PoolManager from "./PoolManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PsSpawner extends cc.Component {

    static instance:PsSpawner;
    
    poolmgr:PoolManager;
    onLoad()
    {
        this.poolmgr = new PoolManager();
    }

    start () {

    }

    clear()
    {
        if(this.poolmgr)
            this.poolmgr.clear();
    }

    getFx(prefabPath):Promise<PsFx>
    {
        return new Promise<PsFx>((resolve,reject)=>{
            let node = this.poolmgr.get(prefabPath)
            if(node == null)
            {
                if(prefabPath instanceof cc.Prefab )
                {
                    node = cc.instantiate(prefabPath);
                    this.poolmgr.tag(node,prefabPath)
                }else{
                    cc.loader.loadRes(prefabPath,cc.Prefab,(e,prefab:cc.Prefab) =>{
                        node = cc.instantiate(prefab);
                        node.setParent(this.node);
                        let psfx = node.getComponent(PsFx)
                        psfx.name = prefabPath;
                        resolve(psfx);
                    }) 
                    return;
                }
            }
            node.setParent(this.node);
            node.active = false;
            let psfx = node.getComponent(PsFx)
            psfx.reset();
            resolve(psfx);
        })
    }

    onFxFinshPlay(fx:PsFx)
    {
        this.poolmgr.put(fx.node);
    }

    async play(prefabPath,pos = cc.Vec2.ZERO,rotation = 0,audio?,spriteframe?)
    {
        let fx = await this.getFx(prefabPath);
        fx.node.position = pos;
        fx.node.rotation = rotation;
        await fx.play(audio,spriteframe)
        this.onFxFinshPlay(fx);
    }

    async play2(prefabPath,pos = cc.Vec2.ZERO,rotation = 0,scale=0)
    {
        let fx = await this.getFx(prefabPath);
        fx.node.position = pos;
        fx.node.scale = scale;
        fx.node.rotation = rotation;
        await fx.play()
        this.onFxFinshPlay(fx);
    }

    async play3(prefabPath,pos)
    {
        let fx = await this.getFx(prefabPath);
        fx.node.position = pos;
        fx.play().then(_=>this.onFxFinshPlay(fx));
        return fx.node;
    }


    // update (dt) {}
}
