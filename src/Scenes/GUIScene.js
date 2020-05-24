// GUIScene.js
// Actual user interface to interact with the game

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

		this._focus = null;

		this._system.bus.listenTo(WindowEvent.WINDOW_FOCUS, this._onWindowFocus, this);
		this._system.bus.listenTo(WindowEvent.WINDOW_CLOSE, this._onWindowClose, this);
		this._system.bus.listenTo(WindowEvent.START_MOUSE_MOVE, this._onStartMouseMove, this);

		this._onMouseMoveCallback = this._onMouseMove.bind(this);
		this._onEndMouseMoveCallback = this._onEndMouseMove.bind(this);
	}

	init() {
		// Makes the background transparent
		this._scene.autoClear = false;

		// Camera
		this._camera = new TargetCamera("cameraGUI", new Vector3(0, 0, -5), this._scene);
		this._camera.setTarget(Vector3.Zero());

		this._rootUI = AdvancedDynamicTexture.CreateFullscreenUI("rootUI", true, this._scene);

		const testWindow = new Window("Test", {
			width: this._system.engine.getRenderWidth() / 4,
			height: this._system.engine.getRenderHeight() / 4,
			title: "Window 1",
			isMoveable: true
		}, this);
		testWindow.zIndex = 1;
		this._rootUI.addControl(testWindow);

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

	loadAsset(key) {
		return this._system.loader.getAssetByKey(key);
	}

	_sortWindows(target) {
		const index = this._windows.indexOf(target);
		if (index >= 0) {
			this._windows.splice(index, 1);
			this._windows.unshift(target);

			target.zIndex = this._windows.length;
			for (let i = 1; i <= index; i++) {
				this._windows[i].zIndex -= 1;
			}
		}
	}

	_closeWindow(target) {
		const index = this._windows.indexOf(target);
		if (index >= 0) {
			this._windows.splice(index, 1);
		}

		target.dispose();
	}

	_onWindowFocus(e) {
		this._sortWindows(e.target);
	}

	_onWindowClose(e) {
		this._closeWindow(e.target);
	}

	_onStartMouseMove(e) {
		this._focus = e.target;

		const trackingSphere = Mesh.CreateSphere("trackingSphere1", 1, .1, this._scene);
		trackingSphere.scaling = new Vector3(.1, .1, .1);
		trackingSphere.isVisible = false;

		trackingSphere.position = this._getMousePositionInWorldCoord();

		this._focus.linkWithMesh(trackingSphere);

		this._focus.linkOffsetXInPixels = this._focus.centerX - this._scene.pointerX;
		this._focus.linkOffsetYInPixels = this._focus.centerY - this._scene.pointerY;

		const canvas = this.system.engine.getRenderingCanvas();
		canvas.addEventListener("pointermove", this._onMouseMoveCallback, false);
		canvas.addEventListener("pointerup", this._onEndMouseMoveCallback, false);
	}

	_onEndMouseMove(e) {
		const canvas = this.system.engine.getRenderingCanvas();
		canvas.removeEventListener("pointermove", this._onMouseMoveCallback);
		canvas.removeEventListener("pointerup", this._onEndMouseMoveCallback);

		this._focus.linkedMesh.dispose();
		this._focus.linkWithMesh(null);

		this._focus = null;
	}

	_onMouseMove(e) {
		this._focus.linkedMesh.position = this._getMousePositionInWorldCoord();
	}

	_getMousePositionInWorldCoord() {
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