// Time.js

const TIME_THRESHOLD = 1000;

class Time {
	
	constructor() {
		this._time = 0;
		this._accumulatedDeltaTime = 0;
	}

	get current() {
		return this._time;
	}

	update(dt) {
		this._accumulatedDeltaTime += dt;

		let time = Math.floor(this._accumulatedDeltaTime / TIME_THRESHOLD);
		if (time > 0) {
			this._time += time;
			this._accumulatedDeltaTime = this._accumulatedDeltaTime % TIME_THRESHOLD;
		}
	}
}

export default Time;