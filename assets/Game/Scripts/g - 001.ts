// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
  
    randomInt(min:number, max:number) {
        if(max == null) {max = min; min = 0;}
        var val = Math.random() * (max - min);
        return Math.floor(val) + min;
    };
   getRandomInArray (arr:number[])
    {
        if(arr)
            return arr[g.randomInt(0,arr.length)]
    };

    randomFloat (min:number,max:number)
    {
        return Math.random() * (max - min) + min;
    };

    isNextDay(timeSec)
    {
        return g.isGreaterDate(new Date(),new Date(timeSec))
    };
    isGreaterDate(now,before)
    {
        var diff = now.getTime() - before.getTime() 
        if(diff > 86400000) // 24*60*60*1000
        {
            return true;
        }else{
            if (diff > 0 )
                return now.getDate() != before.getDate()
            else 
                return false; 
        }
    };
    // update (dt) {}
}
