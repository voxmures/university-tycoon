// GameTime.js

const TIME_THRESHOLD = 1000;

class GameTime {
	
	constructor() {
		this._time = 0;
		this._accumulatedDeltaTime = 0;
	}

	update(dt) {
		this._accumulatedDeltaTime += dt;

		let time = Math.floor(this._accumulatedDeltaTime / TIME_THRESHOLD);
		if (time > 0) {
			this._time += time;
			this._accumulatedDeltaTime = this._accumulatedDeltaTime % TIME_THRESHOLD;
		}
	}

	get current() {
		return this._time;
	}
}

export default GameTime;