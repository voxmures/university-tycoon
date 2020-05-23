// Time.js

const TIME_THRESHOLD = 1000;

class Time {
	
	constructor() {
		this._time = 0;
		this._accumulatedDeltaTime = 0;

		this._isPaused = false;
	}

	get current() {
		return this._time;
	}

	get isPaused() {
		return this._isPaused;
	}

	set isPaused(value) {
		this._isPaused = value;
	}

	update(dt) {
		if (!this._isPaused) {
			this._accumulatedDeltaTime += dt;

			let time = Math.floor(this._accumulatedDeltaTime / TIME_THRESHOLD);
			if (time > 0) {
				this._time += time;
				this._accumulatedDeltaTime = this._accumulatedDeltaTime % TIME_THRESHOLD;
			}
		}
	}
}

export default Time;