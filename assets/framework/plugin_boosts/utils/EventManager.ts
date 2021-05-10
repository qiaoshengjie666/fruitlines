/**
* name 
*/
	class EventManager {

		private _eventList: {[key:string]:Array<{listen:Function, target: any}>};

		public constructor() {
			this._eventList = {};
		}

		public on(key:string, listen: Function, target?:any){
			if(this._eventList[key] != null){
				let array = this._eventList[key];
				array.push({listen: listen, target:target});
			}else{
				let array = new Array<any>();
				array.push({listen:listen, target:target});
				this._eventList[key] = array;
			}
		}

		public off(key: string, listener?:any, target?:any){
			if(listener != null && !(listener instanceof Function)){
                target = listener;
                listener = null;
            }
			if(this._eventList[key] != null){
				if(listener == null && target == null){
					delete this._eventList[key];
				}else{
					let array = this._eventList[key];
					for(let i = array.length - 1; i >= 0; i--){
						if(listener != null && target != null){
							if(array[i].listen == listener && array[i].target == target){
								array.splice(i, 1);
							}
						}else if(listener != null && array[i].listen == listener){
							array.splice(i, 1);
						}else if(target != null && array[i].target == target){
							array.splice(i, 1);
						}
					}
				}
			}
		}

		public emit(tag: string, ...params: any[]){
			let sendOk:boolean = false;
			if(this._eventList[tag] != null){
				let array = this._eventList[tag];
				console.log("emit message: " ,tag, array.length);
				for(let i = 0; i < array.length; i++){
					let obj = array[i];
					if(obj.target != null){
						if(obj.listen.apply(obj.target, params))
							sendOk = true
					}
					else{
						if(obj.listen.apply(this, params))
							sendOk = true
					}
				}
			}
			return sendOk 
		}

	}

	export var event = new EventManager();