import {MessageBase} from "./MessageBase"
export class MessageDispatch{

	private static _instace: MessageDispatch = null;

	public static getInstance(){
		if(this._instace == null){
			this._instace = new MessageDispatch();
		}
		return this._instace;
	}

	private _handler: any;
	private _allMessageBases: {[key: string]: MessageBase[]};

	constructor(){
		this._handler = null;
		this._allMessageBases = {};
	}

	public register(key: string, msgPro: MessageBase){
		if(key == null) return null;
		if(msgPro == null) return null;
		let allBases = this._allMessageBases[key];
		if(allBases == null)this._allMessageBases[key] = [];
		this._allMessageBases[key].push(msgPro);
		return msgPro;
	}

	public isNull(key: string){
		let allBases = this._allMessageBases[key];
		if(allBases != null && allBases.length > 0)
			return true;
		return false;
	}

	public registerUnique(key: string, msgPro?: MessageBase){
		if(key == null ) return null;
		let allBases = this._allMessageBases[key];
		if(allBases != null && allBases.length > 0)
			return this._allMessageBases[key][0];
		else return this.register(key, msgPro);
	}

	public getBean(key: string) {
		if( key == null ) return null;
		let allBeans = this._allMessageBases[key];
		if(allBeans != null && allBeans.length > 0){
			return <any>allBeans[0];
		}
		return null;
	}

	public unRegister(key: string){
		let allBases = this._allMessageBases[key];
		if(allBases == null) return;
		for(let i = 0; i < allBases.length; i++)
			allBases[i].onDestory();
		this._allMessageBases[key] = null;
		delete this._allMessageBases[key];
	}

	public onMessage(msg: any){
		for(let key in this._allMessageBases){
			if(this._allMessageBases[key]==null)continue;
			let allBases = this._allMessageBases[key];
			for(let i = 0; i < allBases.length; i++)
				if(allBases[i].onMessage(msg)) return true;
		}
		return false;
	}
}