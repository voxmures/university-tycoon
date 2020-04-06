// GUIScene.js

import GameScene from "../Core/GameScene";
import Window from "../GUI/Window";
import WindowEvent from "../GUI/WindowEvent";

import { Vector3 } from "@babylonjs/core/Maths/math";

import { TargetCamera } from "@babylonjs/core/Cameras";

import { AdvancedDynamicTexture } from "@babylonjs/gui";

class GUIScene extends GameScene {
	
	setup() {
		this._rootUI = null;

		this._windows = [];

		this._system.bus.listenTo(WindowEvent.WINDOW_CLICKED, this._onWindowClicked, this);
	}

	init() {
		// Makes the background transparent
		this._scene.autoClear = false;

		// Camera
		const camera = new TargetCamera("camera1", new Vector3(0, 0, -5), this._scene);
		camera.setTarget(Vector3.Zero());

		this._rootUI = AdvancedDynamicTexture.CreateFullscreenUI("rootUI", true, this._scene);

		const testWindow = new Window("Test", {
			width: this._system.engine.getRenderWidth() / 4,
			height: this._system.engine.getRenderHeight() / 4,
			title: "Window 1"
		}, this);
		testWindow.zIndex = 1;
		this._rootUI.addControl(testWindow);

		this._windows.push(testWindow);

		const testWindow2 = new Window("Test2", {
			width: this._system.engine.getRenderWidth() / 4,
			height: this._system.engine.getRenderHeight() / 4,
			title: "Window 2"
		}, this);
		testWindow2.left = "20px";
		testWindow2.zIndex = 0;
		this._rootUI.addControl(testWindow2);

		this._windows.push(testWindow2);
	}

	_onWindowClicked(e) {
		const index = this._windows.indexOf(e.target);
		if (index >= 0) {
			this._windows.splice(index, 1);
			this._windows.unshift(e.target);

			e.target.zIndex = this._windows.length;
			for (let i = 1; i <= index; i++) {
				this._windows[i].zIndex -= 1;
			}
		}
	}
}

export default GUIScene;