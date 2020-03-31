// Event.js

class Event {
	
	constructor(id) {
		this._id = id;
	}

	get id() {
		return this._id;
	}
}

export default Event;