// GameEvent.js

class GameEvent {
	
	constructor(id) {
		this._id = id;
	}

	get id() {
		return this._id;
	}
}

export default GameEvent;