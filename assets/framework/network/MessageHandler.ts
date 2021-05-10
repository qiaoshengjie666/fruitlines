import { Message } from "./Message";
import {SocketTag} from "./MessageType"
import {MessageDispatch} from "./MessageDispatch"
export class MessageHandler {
	private _webSocket: WebSocket;
	private _writeMessage: Message[] = null;
	private _messages: any[] = null;
	private _heartbeatInterval: number;
	private _heartbeatTime: number;
	private _isEnableHeartbeat: boolean;
	private updateTimer:number;
	public constructor(webSocket: any){
		this._messages = [];
		this._heartbeatTime = 0;
		this._writeMessage = [];
		this._webSocket = webSocket;
		this.setHeartbeatInterval(30);//30秒
		this._isEnableHeartbeat = false;
	}

	public set enableHeartbeat(flag: boolean){
		this._isEnableHeartbeat = flag;
	}

	public get enableHeartbeat(): boolean {
		return this._isEnableHeartbeat;
	}

	public setHeartbeatInterval(time: number){//秒
		if(time <= 0) time = 1;
		this._heartbeatInterval = time * 1000;
	}

	private onUpdate(timeStamp: number): boolean{
		if(this._writeMessage.length > 0){
			let msg = this._writeMessage[0];
			let message = msg.pack();
			if(this._webSocket.readyState == WebSocket.OPEN){
				console.log("size: " + message.byteLength);
				this._webSocket.send(message);
				this._writeMessage.shift();
			}
		}
		if(this._messages.length > 0){
			let msg = this._messages.shift();
			this.dispatchMessage(msg);
		}
		if(this._isEnableHeartbeat)
			this.checkHeartbeat();
		return false;
	}

	private checkHeartbeat(){
		let diff = new Date().getTime() - this._heartbeatTime;
		if( diff >= this._heartbeatInterval){
			this.sendMessage(new Message(game.Command.Heartbeat));
			this._heartbeatTime = new Date().getTime();
		}
	}

	public dispatchMessage(msg: any){
		let dispatch = MessageDispatch.getInstance();
		if(!dispatch.onMessage(msg)) {
			this._messages.push(msg);
		}
	}

	private dispatchSocket(type: SocketTag){
		let obj = {type: type};
		this.dispatchMessage(obj);
	}

	public dispatch(type: SocketTag, msg: any){
		if(type == SocketTag.KSOCKET_OPEN){
			// cc.director.getScheduler().unschedule(this.onUpdate,this)
			// cc.director.getScheduler().schedule(this.onUpdate,this,0);
			clearInterval(this.updateTimer);
			this.updateTimer = setInterval(dt=>this.onUpdate(dt), 1000/60);
			this.dispatchSocket(type);
		}else if(type == SocketTag.KSOCKET_CLOSE){
			clearInterval(this.updateTimer);
			this.dispatchSocket(type);
		}else if(type == SocketTag.KSOCKET_ERROR){
			clearInterval(this.updateTimer);
			this.dispatchSocket(type);
		}else if(type == SocketTag.KSOCKET_MESSAGE){
			let obj = {type: type, msg: msg};
			this.dispatchMessage(obj);
		}
	}

	public clearWriteMessage(){
		this._writeMessage = [];
	}

	public clearMessage(){
		this._messages = [];
	}

	public sendMessage(msg: Message){
		this._writeMessage.push(msg);
	}
}