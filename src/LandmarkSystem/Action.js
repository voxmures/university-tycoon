// Action

class Action {

	constructor(id, cb) {
		this._id = id;
		this._cb = cb;
	}

	execute(landmark, params) {
		this._cb(landmark, params);
	}
}

export default Action;