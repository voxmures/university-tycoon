// GameScene.js

class GameScene {
	constructor(engine) {
		this._engine = engine;	// Babylon engine
		this._scene = null;	// Babylon Scene object reference
	}

	update(dt) {
		// Should be overwritten. Updates the scene and its game objects
	}

	render(renderer) {
		this._scene.render();
	}
}

export default GameScene;