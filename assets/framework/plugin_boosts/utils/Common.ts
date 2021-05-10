import SpriteFrameCache from "../misc/SpriteFrameCache";

export default class Common
{
    static loadJson(path)
    {
        return new Promise((resolve,reject)=>{
            cc.loader.loadRes(path ,cc.JsonAsset,(errorcode,data)=>{
                resolve(data.json)
            })
        })
    }

    static sleep(timeout)
    {
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve()
            }, timeout * 1000)
        })
        
    }

    static isGreaterDays(before, num = 7)
    {
        let now = new Date();
        var diff = now.getTime() - before
        if(diff > 86400000 * num) // 24*60*60*1000
        {
            return true;
        }
    }

    static setDisplay(sp,url)
    {
        SpriteFrameCache.instance.getSpriteFrame(url).then(sf=>{sp.spriteFrame = sf})
    }


    static generate_action(params){
        let scale_action = cc.scaleTo(params.time, params.scale_x, params.scale_y)
        return scale_action
    }

    //弹性效果 果冻效果 
    static  jellyJump(node)
    {
        let  spawn_action1 = this.generate_action({time : 0.06, scale_x : 0.7, scale_y : 0.7, scale_z: 1})
        // let  spawn_action2 = this.generate_action({time : 0.12, scale_x : 1.3, scale_y  :1.3, scale_z :1})
        let  spawn_action3 = this.generate_action({time : 0.07, scale_x : 1, scale_y  :1.4, scale_z :1})
        // let  spawn_action4 = this.generate_action({time : 0.07, scale_x : 1.3, scale_y  :1.3, scale_z: 1})
        // let  spawn_action5 = this.generate_action({time : 0.07, scale_x : 1.2, scale_y : 1.2, scale_z : 1})
        let spawn_action5 = cc.scaleTo(0.8, 1.3).easing(cc.easeElasticOut(0.3));
        let  seq_actions = cc.sequence(spawn_action1,
            //  spawn_action2,
                spawn_action3,
                // spawn_action4,
                spawn_action5)
        node.runAction(seq_actions);
    }

    static jellyJump2(node,from,scale)
    {
        node.scale = from;
        let act = cc.scaleTo(0.8, scale,scale).easing(cc.easeElasticOut(0.3));
        node.runAction(act)
    }

    static moveBezier(prefab,from,to,callback = null,dur = 1,delay = 0){
        let sprite = cc.instantiate(prefab)
        sprite.opacity = 255;
        sprite.setPosition(from)

        let bezier = []
        let x = from.x, y = from.y
        let ex = to.x, ey = to.y;
        bezier[0] = cc.v2(x, y)
        bezier[1] = cc.v2(x + Math.abs(ex - x+ 100) * 0.5, y + Math.abs(ey - y+100) * 0.5)
        bezier[2] = cc.v2(ex, ey)

        sprite.runAction(cc.sequence(cc.delayTime(delay),cc.bezierTo(dur, bezier) , cc.fadeOut(0.3),cc.callFunc(callback)))
        return sprite;
    }

}