// System.js

import Time from "./Time";
import EventBus from "./EventBus";
import SceneManager from "./SceneManager";
import Loader from "./Loader";

class System {
	
	constructor(engine) {
		this._engine = engine;	// BabylonJS Engine

		this._time = new Time(this);
		this._bus = new EventBus(this);
		this._sceneManager = new SceneManager(this);
		this._loader = new Loader(this);
	}

	get engine() {
		return this._engine;
	}

	get time() {
		return this._time;
	}

	get bus() {
		return this._bus;
	}

	get sceneManager() {
		return this._sceneManager;
	}

	get loader() {
		return this._loader;
	}
}

export default System;