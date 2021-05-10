import { V2ChangeAction } from "./BoostsAction";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property,requireComponent} = cc._decorator;

@ccclass
export default class FrameSwitcher extends cc.Component {

    @property([cc.SpriteFrame])
    frames:cc.SpriteFrame[] = []
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Sprite)
    target:cc.Sprite = null;

    _index :number = 0

    @property
    randomOnLoad:boolean = false;

    onLoad()
    {
        if(this.target == null)
            this.target = this.getComponent(cc.Sprite);
        if(this.randomOnLoad)
            this.switchRandom()
    }

    switchRandom()
    {
        //this.index = g.randomInt(0,this.frames.length);
    }

    set index(k)
    {
        this.switch(k);
    }

    get index()
    {
        return this._index
    }
    
    switch(index)
    {
        let len = this.frames.length;
        let idx = Math.min(Math.max(0,index),len-1);
        this.target.spriteFrame = this.frames[idx]
        this._index = idx;
    }

    start () {

    }

    // update (dt) {}
}
