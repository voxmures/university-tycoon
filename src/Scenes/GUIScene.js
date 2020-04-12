// GUIScene.js

import GameScene from "../Core/GameScene";
import Window from "../GUI/Window";
import WindowEvent from "../GUI/WindowEvent";

import { Vector3 } from "@babylonjs/core/Maths/math";
import { Matrix } from "@babylonjs/core/Maths/math";

import { TargetCamera } from "@babylonjs/core/Cameras";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

import { AdvancedDynamicTexture } from "@babylonjs/gui";

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";

class GUIScene extends GameScene {
	
	setup() {
		this._camera = null;
		this._rootUI = null;

		this._windows = [];

		this._target = null;

		this._system.bus.listenTo(WindowEvent.WINDOW_CLICKED, this._onWindowClicked, this);
		this._system.bus.listenTo(WindowEvent.START_MOUSE_MOVE, this._onStartMouseMove, this);

		this._onMouseMoveCallback = this._onMouseMove.bind(this);
		this._onEndMouseMoveCallback = this._onEndMouseMove.bind(this);
	}

	init() {
		// Makes the background transparent
		this._scene.autoClear = false;

		// Camera
		this._camera = new TargetCamera("camera1", new Vector3(0, 0, -5), this._scene);
		this._camera.setTarget(Vector3.Zero());

		this._rootUI = AdvancedDynamicTexture.CreateFullscreenUI("rootUI", true, this._scene);

		const testWindow = new Window("Test", {
			width: this._system.engine.getRenderWidth() / 4,
			height: this._system.engine.getRenderHeight() / 4,
			title: "Window 1"
		}, this);
		testWindow.zIndex = 1;
		this._rootUI.addControl(testWindow);

		const trackingSphere = Mesh.CreateSphere("trackingSphere1", 1, .1, this._scene);
		trackingSphere.scaling = new Vector3(.1, .1, .1);
		trackingSphere.isVisible = false;
		testWindow.linkWithMesh(trackingSphere);

		this._windows.push(testWindow);

		const testWindow2 = new Window("Test2", {
			width: this._system.engine.getRenderWidth() / 4,
			height: this._system.engine.getRenderHeight() / 4,
			title: "Window 2"
		}, this);
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

	_onStartMouseMove(e) {
		this._target = e.target;

		this._target.linkOffsetXInPixels = this._target.centerX - this._scene.pointerX;
		this._target.linkOffsetYInPixels = this._target.centerY - this._scene.pointerY;

		const canvas = this.system.engine.getRenderingCanvas();
		canvas.addEventListener("pointermove", this._onMouseMoveCallback, false);
		canvas.addEventListener("pointerup", this._onEndMouseMoveCallback, false);
	}

	_onEndMouseMove(e) {
		const canvas = this.system.engine.getRenderingCanvas();
		canvas.removeEventListener("pointermove", this._onMouseMoveCallback);
		canvas.removeEventListener("pointerup", this._onEndMouseMoveCallback);

		this._target = null;
	}

	_onMouseMove(e) {
		const position = this._getMousePosition();
		this._target.linkedMesh.position = new Vector3(position.x, position.y, position.z);
	}

	_getMousePosition() {
		const canvas = this.system.engine.getRenderingCanvas();

		const position = Vector3.Unproject(
            new Vector3(this._scene.pointerX, this._scene.pointerY, 0),
            canvas.width,
            canvas.height,
            new Matrix.Identity(),
            this._camera.getViewMatrix(),
            this._camera.getProjectionMatrix()
		);

		return position;
	}
}

export default GUIScene;