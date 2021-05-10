const {ccclass, property} = cc._decorator;

@ccclass
export default class PandoraPoint extends cc.Component {

    label:cc.Label;

    @property
    numberVisible:boolean = true;

    sprite:cc.Sprite

    onLoad () {
        this.sprite = this.getComponent(cc.Sprite);
        this.label = this.getComponentInChildren(cc.Label);
        this.label.node.active = this.numberVisible;
    }

    start () {

    }

    setNumber(n:number)
    {
        if(this.numberVisible)
        {
            this.label.string = n +""
        }
        if(this.numberVisible) 
        {
            this.label.node.active =  n!=0;
        }
        this.sprite.enabled = n !=0;
    }

    // update (dt) {}
}
