// SceneManager.js
class SceneManager {

	constructor() {
		this._scenes = {};
		this._loading = null;
		this._activeScene = null;
	}

	get activeScene() {
		return this._activeScene;
	}

	add(key, scene) {
		this._scenes[key] = scene;
	}

	load(key) {
		if (!this._loading) {
			this._loading = this._scenes[key];
			this._scenes[key].preload(this._onLoadedScene.bind(this));
		}
	}

	_onLoadedScene(result) {
		if (result) {
			if (this._activeScene) {
				this._activeScene.dispose();
			}

			this._activeScene = this._loading;
			this._loading = null;

			this._activeScene.init();
		}
	}
}

export default SceneManager;