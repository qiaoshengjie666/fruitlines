import {SocketTag} from "./MessageType"
import {Message} from "./Message"
import { connManager } from "./ConnectManager";
export class MessageBase {

	private _socketKey: string;
	private _allFuncs: {[cmd: number]: Function};

	Cmd  = {}
	Error = {}
	public constructor() {
		this._allFuncs = {};

		for (var i in game.Command)
        {
            let v = game.Command[i]
            this.Cmd[v] = i;
		}
		for (var i in game.ErrorCode)
        {
            let v = game.ErrorCode[i]
            this.Error[v] = i;
		}
		
	}

	public useSocketKey(key: string){
		this._socketKey = key;
	}

	public addListener(cmd: any, func: Function){
		this._allFuncs[cmd] = func;
	}

	public removeListener(cmd: any){
		if(this._allFuncs[cmd] != null){
			this._allFuncs[cmd] = null;
		}
	}

	public onMessage(obj: any){
		if(obj.type == SocketTag.KSOCKET_MESSAGE){
			let int8a = new Uint8Array(obj.msg);
			let buffer = new flatbuffers.ByteBuffer(int8a);
			let msg:any = game.Package.getRootAsPackage(buffer);
			if(this._allFuncs[msg.cmd()] != null){
				return this._allFuncs[msg.cmd()].call(this, msg);
			}else return this.onHandler(msg);
		} else {
			this.onSocket(obj.type);
			return true;
		}
	}

	/**
	 * 处理socket消息
	 * @param type 
	 */
	public onSocket(type: SocketTag){

	}
	
	/**
	 * 重写消息处理函数
	 * return 消息处理结果，处理完成返回真，否则返回假(消息会入消息队列，等待下次处理)
	 */
	public onHandler(msg: game.Package){
		
		return false;
	}

	public sendMessage(msg: Message){
		connManager.sendMessage(msg, this._socketKey);
	}

	public onDestory(){
		this._allFuncs = null;
	}

	send(cmd,cmdstr="",procedure=null,build = null)
	{
		console.log("Send Message : [" + this.Cmd[cmd] +"]")
        let socket = connManager.getDefault();
		let msg = new Message(cmd);
		let ds = game[cmdstr] 
        if(ds != null)
        {
			if(build == null)
			{
				build = this.createBuilder();
			}
            let startFunc = ds["start" + cmdstr] 
			let endFunc = ds["end" + cmdstr] 
			startFunc.call(ds, build);
            if(procedure)
            {
                procedure(build)
                //game[cmd].addTaskId(build,task_id);
            }
			build.finish(endFunc.call(ds,build))
			msg.addBuilder(build);
		}else{
			msg.addString(cmdstr);
		}
        socket.sendMessage(msg);
    }

    createBuilder()
    {
        return new flatbuffers.Builder();
    }
	
}