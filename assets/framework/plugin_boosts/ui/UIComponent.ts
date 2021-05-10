const {ccclass, property} = cc._decorator;

@ccclass
export default class UIComponent extends cc.Component {
    hide(){
        this.node.active = false;
    }
    show()
    {
        this.node.active = true;
    }
}
