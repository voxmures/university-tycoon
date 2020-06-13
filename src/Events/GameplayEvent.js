// GameplayEvent

import GameEvent from "../Core/GameEvent";

class GameplayEvent extends GameEvent {
	constructor(id, data = {}) {
		super(id);

		this._data = data;
	}

	get data() {
		return this._data;
	}
}

GameplayEvent.TOGGLE_GAME_STATE = "GameplayEvent.TOGGLE_GAME_STATE";

export default GameplayEvent;