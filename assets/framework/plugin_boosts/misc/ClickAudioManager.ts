import ClickAudio from "./ClickAudio";
const {ccclass, property} = cc._decorator;

@ccclass
export default class ClickAudioManager extends cc.Component {

    @property({type: cc.AudioClip})
    audio :cc.AudioClip = null;

    @property
    elastic:boolean = false;

    onLoad () {
        //window.g = require('g');
        //g.foreachNode(this.node,this.each,this)
    }
    
    each(item:cc.Node)
    {
        //if button 
        if (!item.getComponent(cc.Button)) return;
        let comp = item.getComponent(ClickAudio)
        if(comp == null)
        {
            comp = item.addComponent(ClickAudio);
            comp.elastic = this.elastic
            comp.audio = this.audio;
        }
    }
    start () {

    }

    // update (dt) {}
}
