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

		this._onStart = null;
		this._onReset = null;
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

	set onStart(handler) {
		this._onStart = handler;
	}

	set onReset(handler) {
		this._onReset = handler;
	}

	start() {
		if (this._onStart) {
			this._onStart();
		}

		// Render every frame
		this.engine.runRenderLoop(() => {
			this.time.update();	// Update time

			this.sceneManager.update();
			this.sceneManager.render();
		});
	}

	reset() {
		this.engine.stopRenderLoop();

		this.time.reset();
		this.bus.reset();
		this.sceneManager.reset();
		this.loader.reset();

		if (this._onReset) {
			this._onReset();
		}
	}
}

export default System;