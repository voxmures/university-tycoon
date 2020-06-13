// GUIEvent

import GameEvent from "../Core/GameEvent";

class GUIEvent extends GameEvent {
	constructor(id, data = {}) {
		super(id);

		this._data = data;
	}

	get data() {
		return this._data;
	}
}

GUIEvent.SHOW_POPUP_MESSAGE = "GUIEvent.SHOW_POPUP_MESSAGE";
GUIEvent.TOGGLE_MOUSE = "GUIEvent.TOGGLE_MOUSE";

export default GUIEvent;