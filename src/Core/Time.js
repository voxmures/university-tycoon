// Time.js

class Time {
	constructor() {
		this._previousTime = (new Date).getTime();
		this._currentTime = (new Date).getTime();
	}

	get deltaTime() {
		return this._currentTime - this._previousTime;
	}

	get time() {
		return this._currentTime;
	}

	// Update loop, called once per render loop at its beginning
	update() {
		this._previousTime = this._currentTime;
		this._currentTime = (new Date).getTime();
	}
}

export default Time;