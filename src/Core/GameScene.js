// GameScene.js

import { AssetsManager } from "@babylonjs/core";
import { Scene } from "@babylonjs/core/scene";

class GameScene {
	constructor(system) {
		this._system = system;	// Game system

		this._scene = new Scene(this._system.engine);	// Babylon Scene object reference

		this._state = null;

		this.setup();
	}

	get system() {
		return this._system;
	}

	get state() {
		return this._state;
	}

	set state(state) {
		this._state = state;
	}

	/* SCENE LIFECYCLE METHODS */
	setup() {
		// Should be overwritten. Setups the scene, used for declaration of variables and listeners.
	}

	preload() {
		// Should be overwritten. Preloads the assets required to render the scene.
	}

	init() {
		// Should be overwritten. Inits the scene.
	}

	update() {
		// Should be overwritten. Updates the scene and its game objects.
	}

	render() {
		this._scene.render();
	}

	dispose() {
		this._scene.dispose();
	}
}

export default GameScene;