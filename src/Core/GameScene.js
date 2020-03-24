// GameScene.js

import { AssetsManager } from "@babylonjs/core";
import { Scene } from "@babylonjs/core/scene";

class GameScene {
	constructor(system) {
		this._system = system;	// Game system

		this._scene = new Scene(this._system.engine);	// Babylon Scene object reference
		this._loader = new AssetsManager(this._scene);	// Babylon Assets Manager
		this._loader.useDefaultLoadingScreen = false;

		this.setup();
	}

	preload(cb) {
		// Should be overwritten. Preloads the assets required to render the scene.
		cb(true);
	}

	setup() {
		// Should be overwritten. Setups the scene, used for declaration of variables and listeners.
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