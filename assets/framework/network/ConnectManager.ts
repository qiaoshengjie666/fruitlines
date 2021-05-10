import { Socket } from "./Socket";
import { Message } from "./Message";


class ConnectManager {
	
	private static _instance: ConnectManager = null;
	public static getInstance(): ConnectManager{
		if(this._instance == null){
			this._instance = new ConnectManager();
		}
		return this._instance;
	}
	
	private _defaultKey: string;
	private _allConns: { [name:string]: Socket} = null;

	public constructor(){
		this._allConns = {};
	}

	public create(name: string, conf: any){
		if(this._allConns[name] == null){
			let socket = new Socket(conf);
			this._allConns[name] = socket;
			if(this._defaultKey == null)
				this._defaultKey = name;
		}
	}

	public setDefaultKey(key: string){
		if(key != null && this._allConns[key]) {
			this._defaultKey = key;
		}
	}

	public getDefault() {
		return this.getConn(this._defaultKey);
	}

	public getConn(name: string){
		if(name == null) return null;
		if(this._allConns[name] != null){
			return this._allConns[name];
		}
		return null;
	}

	public sendMessage(msg: Message, name?: string){
		if(name == null) name = this._defaultKey;
		let conn = this.getConn(name);
		if(conn != null){
			conn.sendMessage(msg);
		}
	}

	public enableHeartbeat(name: string) {
		let conn = this.getConn(name);
		conn.enableHeartbeat(true);
	}

	public sendCustomMessage(msg: Message){
		let conn = this.getConn(this._defaultKey);
		if (conn != null) conn.sendCustomMessage(msg);
	}

	public remove(name: string){
		let conn = this.getConn(name);
		if(conn != null){
			delete this._allConns[name];
			conn.close();
		}
	}
	
}

export var connManager: ConnectManager = ConnectManager.getInstance();