import LocalTimeSystem from "./LocalTimeSystem";
import { event } from "../utils/EventManager";
import Signal from "../misc/Signal";
import Platform from "../../Platform";

export class LocalLifeSystem
{
	//生成一颗星需要的时间 
	sec_per_live = 60 * 5 ;
	//最多可得多少颗
	live_free_get = 5;
	
	max_freeLives_seconds = this.live_free_get * this.sec_per_live;

	task_runSpawnLives:number;

	task_checkLives:number;

	livesSeconds:number = 0
	lastLifeSaveTime:number;

	isEnabledAutoRecovery = true;
	
	public recoverySignal = new Signal();
	init(liveSec = null,live_free = null)
	{
		this.sec_per_live = liveSec || this.sec_per_live
		this.live_free_get = live_free || this.live_free_get
		this.max_freeLives_seconds = this.sec_per_live * this.live_free_get;
		this.livesSeconds = 0
		this.lastLifeSaveTime = Number(localStorage.getItem("sys_life_lastLifeSaveTime")|| new Date().getTime())
		//g.setGlobalInstance(LifeSystem,"LocalLifeSystem");

		event.on("onEnterForeground",this.onEnterForeground,this)
		this.onTimeRequested(new Date().getTime());
		console.log("体力系统初始化",this);
	}

	onEnterForeground()
	{
		this.onTimeRequested(new Date().getTime());
	}

	get nextLifeTime()
	{
		return (this.lives + 1) * this.sec_per_live - this.livesSeconds;
	}

	get lives()
	{
		return Math.floor(this.livesSeconds / this.sec_per_live)
	}

	save()
	{
		this.lastLifeSaveTime = new Date().getTime();
		localStorage.setItem("sys_life_lastLifeSaveTime",this.lastLifeSaveTime+"")
	}

	onTimeRequested(time)
	{
		if (this.lastLifeSaveTime)
		{
			let timeElapsed = Math.floor((time - this.lastLifeSaveTime)/1000)
			this.livesSeconds = Math.min(this.max_freeLives_seconds, timeElapsed)
		}
	}

	startCheck(callback,target)
	{
		if(this.task_checkLives) return;
		let lastHeart = callback.call(target);
		this.task_checkLives = setInterval(_=>{
			let heart = callback.call(target);
			if(lastHeart != heart && heart == this.live_free_get - 1)
			{
				this.livesSeconds = 0;
				this.save();
			} 
			if (heart < this.live_free_get) { 
				// this.checkForSpawnLives();
				this.livesSeconds = this.livesSeconds + 1;
				if ( heart + this.lives > heart)
				{
					console.log("获得在线奖励一颗星",this.lives)
					this.recoverySignal.fire(this.lives);
					this.livesSeconds = 0;
					this.save();
				}
			}
			lastHeart = heart;
		},1000)
	}

}

export var LifeSystem = new LocalLifeSystem();
// 
