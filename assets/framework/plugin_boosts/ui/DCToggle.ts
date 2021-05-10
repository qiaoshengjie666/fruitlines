import DCUI from "./DCUI";

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
export default class DCToggle extends DCUI {

    toggle:cc.Toggle;
    @property({tooltip:"If reverse is enabled ,checked is false !, unchecked is true"})
    revserse:boolean = false;


    @property({tooltip:" Make sure data bind type should be boolean"})
    autosync:boolean = true;

    isFromSelf:boolean;

    onLoad()
    {
        this.toggle = this.getComponent(cc.Toggle);
        if(this.autosync)
        {
            let listener = new cc.Component.EventHandler();
            listener.component = "DCToggle";
            listener.target = this.node;
            listener.handler = "onChecked";
            this.toggle.checkEvents.push(listener)
        }
    }

    onChecked(v)
    {
        if(this.isFromSelf) return;
        if(this.revserse)
        {
            this.setDCValue(!v.isChecked);
        }else{
            this.setDCValue(v.isChecked);
        }
    }

    setChecked(b)
    {
        this.isFromSelf = true;
        if(b)
            this.toggle.check()
        else
            this.toggle.uncheck();
        this.isFromSelf = false
    }

    onValueChanged(v)
    {
        if(this.revserse)
        {
            this.setChecked(!v)
        }else{
            this.setChecked(v)
        }
        
    }

}
