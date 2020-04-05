// GUIScene.js

import GameScene from "../Core/GameScene";
import Window from "../GUI/Window";

import { Vector3 } from "@babylonjs/core/Maths/math";

import { TargetCamera } from "@babylonjs/core/Cameras";

import { AdvancedDynamicTexture } from "@babylonjs/gui";

class GUIScene extends GameScene {
	
	setup() {
		this._rootUI = null;

		this._windows = [];
	}

	init() {
		this._scene.autoClear = false;

		// Camera
		const camera = new TargetCamera("camera1", new Vector3(0, 0, -5), this._scene);
		camera.setTarget(Vector3.Zero());

		this._rootUI = AdvancedDynamicTexture.CreateFullscreenUI("rootUI", true, this._scene);

		const testWindow = new Window("Test", {
			width: this._system.engine.getRenderWidth() / 4,
			height: this._system.engine.getRenderHeight() / 4
		});
		this._rootUI.addControl(testWindow);
	}
}

export default GUIScene;