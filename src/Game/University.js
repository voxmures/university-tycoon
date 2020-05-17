// University

const INITIAL_CASH = 1000;

class University {
	
	constructor() {
		this._cash = 0;

		this._teachers = [];
		this._students = [];

		this._init();
	}

	_init() {
		this._cash = INITIAL_CASH;
	}

	get cash() {
		return this._cash;
	}

	update(dt) {
		// NoOp
	}
}

export default University;