import UIFunctions from "./UIFunctions";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ToastComponent extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    animations:cc.Animation[]

    onLoad()
    {
        this.animations = UIFunctions.getChildrenAnimations(this.node);
    }

    start () {

    }

    hide(callback): any {
        this.node.active = true;
        if(!UIFunctions.doHideAnimations(this.animations,callback))
        {
            this.node.active = false;
            // this.node.removeFromParent();
            if(callback)
            {
                callback(this);
            }
        }
    }
    show(text: any): any {
        this.label.string = text;
        UIFunctions.doShowAnimations(this.animations);
    }
    // update (dt) {}
}
