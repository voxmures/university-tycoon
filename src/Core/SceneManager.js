// SceneManager.js
class SceneManager {

	constructor() {
		this._activeScene = null;
		this._scenes = {};
	}

	add(key, scene) {
		this._scenes[key] = scene;
	}

	load(key) {
		this._activeScene = this._scenes[key];
	}

	get activeScene() {
		return this._activeScene;
	}
}

export default SceneManager;