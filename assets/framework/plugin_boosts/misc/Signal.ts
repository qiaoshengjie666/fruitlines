export default class Signal
{
    callback:Function ;
    target:any;
    constructor(c?,t?)
    {
        this.add(c,t)
    }

    add(callback:Function , target?)
    {
        this.callback = callback;
        this.target = target;
    }

    fire(...ps)
    {
        if (this.callback)
        {
            this.callback.call(this.target,...ps)
        }
    }

    on(callback:Function,target?)
    {
        this.callback = callback;
        this.target = target;
    }

    clear()
    {
        this.callback = null;
    }
}