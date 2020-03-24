// System.js

import Time from "./Time"; 
import SceneManager from "./SceneManager";

class System {
	
	constructor(engine) {
		this._engine = engine;	// BabylonJS Engine

		this._time = new Time();
		this._sceneManager = new SceneManager();
	}

	get engine() {
		return this._engine;
	}

	get time() {
		return this._time;
	}

	get sceneManager() {
		return this._sceneManager;
	}
}

export default System;