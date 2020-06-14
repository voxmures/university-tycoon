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

	init(data) {
		this._university.init(data);
	}

	update(dt) {
		const previousTime = this._time.current;

		this._time.update(dt);

		const hasTimeIncreased = this._time.current > previousTime;

		if (hasTimeIncreased) {
			this._university.paySalaries(); // Every month...

			if (this._time.current % 6 === 0) {	// Every semester...
				this._university.earnTuition();
			}
		}
	}
}

export default GameState;