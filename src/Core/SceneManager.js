// SceneManager.js

import * as SceneState from "./SceneState";

import LoaderEvent from "./LoaderEvent";

class SceneManager {

	constructor(system) {
		this._system = system;

		this._isBooted = false;

		this._scenes = {};

		this._queued = [];

		this._system.bus.listenTo(LoaderEvent.READY, this._onReady, this);
	}

	// Internal call to boot all the pending scenes
	_boot() {
		for (let i = 0; i < this._queued.length; i++) {
			this._queued[i].state = SceneState.LOADING;
			this._queued[i].preload();
		}

		this._system.bus.dispatch(new LoaderEvent(LoaderEvent.LOAD));
	}

	_onReady() {
		while (this._queued.length > 0) {
			const scene = this._queued.shift();
			scene.init();
			scene.state = SceneState.RUNNING;
		}
	}

	add(key, scene, autostart = false) {
		if (Object.keys(this._scenes).length === 0) {
			// Load the first given scene even if the config says the opposite
			autostart = true;
		}

		scene.state = SceneState.PENDING;
		this._scenes[key] = scene;

		if (autostart) {
			this._queued.push(this._scenes[key]);
		}
	}

	start(key) {
		if (!this._scenes.hasOwnProperty(key)) {
			console.error("SceneManager:", `Scene ${key} does not exist.`);
			return;
		}

		this._queued.push(this._scenes[key]);

		this._boot();
	}

	stop(key) {
		if (!this._scenes.hasOwnProperty(key)) {
			console.error("SceneManager:", `Scene ${key} does not exist.`);
			return;
		}

		this._scenes[key].state === SceneState.STOPPED;

		// TODO: Stopped scenes clean up?
	}

	// Update the active scenes
	update() {
		if (!this._isBooted) {
			this._boot();
			this._isBooted = true;
		}

		for (let scene of Object.values(this._scenes)) {
			if (scene.state === SceneState.RUNNING) {
				scene.update();
			}
		}
	}

	// Render the active scenes
	render() {
		for (let scene of Object.values(this._scenes)) {
			if (scene.state === SceneState.RUNNING) {
				scene.render();
			}
		}
	}
}

export default SceneManager;