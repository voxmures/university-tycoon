// Time.js

class Time {
	constructor(system) {
		this._system = system;

		this._previousTime = (new Date).getTime();	// Last fetched time in milliseconds
		this._currentTime = (new Date).getTime();	// Time in milliseconds since the start of the game
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

	reset() {
		this._previousTime = (new Date).getTime();
		this._currentTime = (new Date).getTime();
	}
}

export default Time;