export default class SpriteFrameCache
{
    static _instance:SpriteFrameCache;

    static get instance()
    {
        if(this._instance == null)
        {
            this._instance = new SpriteFrameCache();
        }
        return this._instance;
    }

    private frames:{[index:string]:cc.SpriteFrame} = {};
    async getSpriteFrame(url:string):Promise<cc.SpriteFrame>
    {
        let frame = this.frames[url]
        if(frame == null)
        {
            return new Promise<cc.SpriteFrame>((resolve,reject)=>{
                // console.log("[SpriteFrameCache] request image:" + url)
                if(!url ||url == "") {
                    reject("empty-url")
                    return;
                }
                if ( url.indexOf("http") == -1)
                {
                    cc.loader.loadRes(url,cc.SpriteFrame,(error,frame)=>{
                        if(error){reject();return}
                        if(frame)
                        {
                            this.addSpriteFrame(url ,frame)
                            resolve(frame)
                        }else{
                            reject()
                        }
                    })
                }else{
                    cc.loader.load({url: url, type: 'png'}, (error, texture) =>{
                        if(error){reject();return}
                        if(texture)
                        {
                            frame = new cc.SpriteFrame(texture);
                            this.addSpriteFrame(url ,frame)
                            resolve(frame)
                        }else{
                            reject()
                        }
                    });
                }
            })
        }
        return new Promise<cc.SpriteFrame>((resolve,reject)=>resolve(frame));
        
    }

    addSpriteFrame(url: string, frame: any): any {
        this.frames[url] = frame;
        return frame;
    }


    clear()
    {
        for (var k in this.frames)
        {
            let frame =  this.frames[k]
            cc.loader.release(frame);
            delete this.frames[k]
        }
    }

    remove(k)
    {
        let frame =  this.frames[k]
        cc.loader.release(frame);
        delete this.frames[k]
    }

}