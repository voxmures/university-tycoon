// WindowEvent.js

import GameEvent from "../Core/GameEvent";

class WindowEvent extends GameEvent {
	
	constructor(id, target = null) {
		super(id);

		this._target = target;
	}

	get target() {
		return this._target;
	}
}

WindowEvent.WINDOW_FOCUS = "WindowEvent.WINDOW_FOCUS";
WindowEvent.WINDOW_CLOSE = "WindowEvent.WINDOW_CLOSE";
WindowEvent.START_MOUSE_MOVE = "WindowEvent.START_MOUSE_MOVE";

export default WindowEvent;