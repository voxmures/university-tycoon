// LoaderEvent.js

import Event from "./Event";

class LoaderEvent extends Event {

	constructor(id) {
		super(id);
	}
}

LoaderEvent.LOAD = "LoaderEvent.LOAD";
LoaderEvent.READY = "LoaderEvent.READY";	

export default LoaderEvent;