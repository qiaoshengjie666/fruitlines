import DCUI from "./DCUI";

const {ccclass, property,requireComponent} = cc._decorator;


@ccclass
@requireComponent(cc.Label)
export default class DCLabel extends DCUI {

    label:cc.Label;
    onLoad()
    {
        this.label = this.getComponent(cc.Label);
    }

    onValueChanged(v)
    {
        if(!v){
            console.log("[DCLabel] warn!" , "not found field " + this.dataBind)
            v = "0"
        }
        this.label.string = v;
    }
   
    // update (dt) {}
}
