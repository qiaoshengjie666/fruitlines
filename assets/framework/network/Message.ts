
export class Message {

	private _cmd: any;
	private _data: any;

	public constructor(cmd: any) {
		this._cmd = cmd;
		this._data = null;
	}

	public addBuilder(data: flatbuffers.Builder) {
		this._data = data.asUint8Array();
	}

	public addString(data: String) {
		this._data = data;
	}

	public pack(): ArrayBuffer {
		let build = this.toString();
		let buf = build.asUint8Array();
		let newBuf = new Uint8Array(buf);
		console.log("send message: " + newBuf);
		return newBuf.buffer;
	}

	private toString(): flatbuffers.Builder {
		let build = new flatbuffers.Builder();
		let data = null;
		if(this._data != null) 
			data = build.createString(this._data);
		game.Package.startPackage(build);
		game.Package.addCmd(build, this._cmd);
		if(this._data != null)
			game.Package.addData(build, data);
		let pack = game.Package.endPackage(build);
		build.finish(pack);
		return build;
	}
}