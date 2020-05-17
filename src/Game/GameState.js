// Game State

import Time from "./Time";
import University from "./University";

class GameState {

	constructor() {
		this._time = new Time();
		this._university = new University();
	}

	get time() {
		return this._time;
	}

	get university() {
		return this._university;
	}

	update(dt) {
		const previousTime = this._time.current;

		this._time.update(dt);

		const hasDayPassed = this._time.current > previousTime;

		if (hasDayPassed) {
			// TODO: Apply updates on Management
		}
	}
}

export default GameState;