// WindowEvent.js

import Event from "../Core/Event";

class WindowEvent extends Event {
	
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