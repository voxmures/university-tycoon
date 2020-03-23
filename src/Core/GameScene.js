// GameScene.js

import { AssetsManager } from "@babylonjs/core";
import { Scene } from "@babylonjs/core/scene";

class GameScene {
	constructor(engine) {
		this._engine = engine;	// Babylon engine
		this._scene = new Scene(this._engine);	// Babylon Scene object reference
		this._loader = new AssetsManager(this._scene);	// Babylon Assets Manager
		this._loader.useDefaultLoadingScreen = false;
	}

	preload(cb) {
		// Should be overwritten. Preloads the assets required to render the scene.
		cb(true);
	}

	init() {
		// Should be overwritten. Inits the scene.
	}

	update(dt) {
		// Should be overwritten. Updates the scene and its game objects.
	}

	render(renderer) {
		this._scene.render();
	}
}

export default GameScene;