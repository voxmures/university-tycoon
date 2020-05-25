// LoaderEvent.js

import GameEvent from "./GameEvent";

class LoaderEvent extends GameEvent {

	constructor(id) {
		super(id);
	}
}

LoaderEvent.LOAD = "LoaderEvent.LOAD";
LoaderEvent.READY = "LoaderEvent.READY";	

export default LoaderEvent;