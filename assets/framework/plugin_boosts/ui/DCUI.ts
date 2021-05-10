import DataCenter from "../misc/DataCenter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DCUI extends cc.Component {

    @property()
    dataBind: string = "";
    onLoad()
    {
    }

    setDCKey(k)
    {
        this.dataBind = k;
        this.setListener()
    }


    setListener()
    {
        DataCenter.off(this.dataBind,this.dataChanged,this)
        DataCenter.on(this.dataBind,this.dataChanged,this)
    }

    onValueChanged(v)
    {
    }

    setDCValue(v)
    {
        DataCenter.set(this.dataBind, v);
    }

    dataChanged(v,old): any {
        this.onValueChanged(v);
    }

    onEnable () {
        this.setListener()
        this.onValueChanged(DataCenter.get(this.dataBind));
    }

    onDisable()
    {
        DataCenter.off(this.dataBind,this.dataChanged,this)
    }
}
