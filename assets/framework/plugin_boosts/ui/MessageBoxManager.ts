import ViewManager from "./ViewManager";

const {ccclass, property} = cc._decorator;
@ccclass


export default class MessageBoxManager extends cc.Component
{
    @property(cc.Prefab)
    prefab:cc.Prefab = null;
    
    static instance:MessageBoxManager = null;
    onLoad () {
        MessageBoxManager.instance = this;
    }
}

export class MessageBox  {

    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    static OK:number = 1;
    static CANCEL:number = 0;

    static OK_CANCEL:number = 2;

    start () {

    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    // static UIPath:string = "plugin_boosts/ui/MessageBox"
    static show(content ,title?,buttons?,extra?):Promise<number>
    {
        title = (title == null || title == undefined )? "提示" :title
        return new Promise<number>((resolve,reject)=>{
            ViewManager.instance.showFromPrefab(MessageBoxManager.instance.prefab,"MessageBox",{
                title,
                content,
                buttons,
                extra,
                callback:code=>{
                    resolve(code)
                }
            })
        })
    }

    // update (dt) {}
}
