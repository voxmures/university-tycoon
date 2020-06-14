// GUIScene.js
// Actual user interface to interact with the game

import GameScene from "../Core/GameScene";

import Window from "../GUI/Window";
import WindowEvent from "../GUI/WindowEvent";

import GUIEvent from "../Events/GUIEvent";

import { Vector3 } from "@babylonjs/core/Maths/math";
import { Matrix } from "@babylonjs/core/Maths/math";

import { TargetCamera } from "@babylonjs/core/Cameras";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

import { AdvancedDynamicTexture } from "@babylonjs/gui";
import { TextBlock } from "@babylonjs/gui";
import { Control } from "@babylonjs/gui/2D/controls/";
import { Button } from "@babylonjs/gui";
import { StackPanel } from "@babylonjs/gui";
import { Image } from "@babylonjs/gui";

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";

class GUIScene extends GameScene {
	
	setup() {
		this._camera = null;
		this._rootUI = null;

		this._isMouseEnabled = true;

		this._windows = [];

		this._focus = null;

		this._system.bus.listenTo(WindowEvent.WINDOW_FOCUS, this._onWindowFocus, this);
		this._system.bus.listenTo(WindowEvent.WINDOW_CLOSE, this._onWindowClose, this);
		this._system.bus.listenTo(WindowEvent.START_MOUSE_MOVE, this._onStartMouseMove, this);

		this._system.bus.listenTo(GUIEvent.SHOW_POPUP_MESSAGE, this._onShowPopupMessage, this);

		this._system.bus.listenTo(GUIEvent.TOGGLE_MOUSE, this._onToggleMouse, this);

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

		const background = new Image();
		background.domImage = this._system.loader.getAssetByKey("background");
		background.width = 1;
		background.height = 1;

		this._rootUI.addControl(background);

		this._setupGameplayButtons(this._rootUI);
	}

	_setupGameplayButtons(parent) {
		const buttonsContainer = new StackPanel();
		buttonsContainer.isVertical = false;

		const managementButtonContainer = new StackPanel();
		managementButtonContainer.height = "120px";
		managementButtonContainer.width = "150px";
		buttonsContainer.addControl(managementButtonContainer);

		const managementButton = Button.CreateImageOnlyButton("managementButton", "");
		managementButton.image.domImage = this._system.loader.getAssetByKey("managementIcon");
		managementButton.width = "100px";
		managementButton.height = "100px";
		managementButton.thickness = 0;
		managementButtonContainer.addControl(managementButton);

		managementButton.onPointerClickObservable.add(this._showManagementPanel.bind(this));

		const managementText = new TextBlock();
		managementText.fontSize = 12;
		managementText.text = "Management";
		managementText.width = "100px";
		managementText.height = "20px";
		managementButtonContainer.addControl(managementText);

		const teachersButtonContainer = new StackPanel();
		teachersButtonContainer.height = "120px";
		teachersButtonContainer.width = "150px";
		buttonsContainer.addControl(teachersButtonContainer);

		const teachersButton = Button.CreateImageOnlyButton("teachersButton", "");
		teachersButton.image.domImage = this._system.loader.getAssetByKey("teacherIcon");
		teachersButton.width = "100px";
		teachersButton.height = "100px";
		teachersButton.thickness = 0;
		teachersButtonContainer.addControl(teachersButton);

		teachersButton.onPointerClickObservable.add(this._showTeachersPanel.bind(this));

		const teachersText = new TextBlock();
		teachersText.fontSize = 12;
		teachersText.text = "Teachers";
		teachersText.width = "100px";
		teachersText.height = "20px";
		teachersButtonContainer.addControl(teachersText);

		parent.addControl(buttonsContainer);
	}

	loadAsset(key) {
		return this._system.loader.getAssetByKey(key);
	}

	_onShowPopupMessage(e) {

		const width = this._system.engine.getRenderWidth() / 2;
		const height = this._system.engine.getRenderHeight() / 3;

		const popup = new Window("Popup", {
			width: width,
			height: height,
			title: "Message",
			isMoveable: true
		}, this);

		const text = e.data;

		const message = new TextBlock();
		message.text = text;
		message.textWrapping = true;
		message.fontSize = 12;
		message.width = Math.floor(width * .8) + "px";
		
		popup.body.addControl(message);		

		this._openWindow(popup);

		this._rootUI.addControl(popup);
	}

	_showManagementPanel() {
		console.log("Show Management Panel");
	}

	_showTeachersPanel() {
		console.log("Show Teachers Panel");
	}

	_onToggleMouse() {
		this._isMouseEnabled = !this._isMouseEnabled;
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

	_openWindow(target) {
		target.zIndex = this._windows.length;
		this._windows.unshift(target);
	}

	_closeWindow(target) {
		const index = this._windows.indexOf(target);
		if (index >= 0) {
			this._windows.splice(index, 1);
		}

		target.dispose();
	}

	_onWindowFocus(e) {
		if (this._isMouseEnabled) {
			this._sortWindows(e.target);
		}
	}

	_onWindowClose(e) {
		if (this._isMouseEnabled) {
			this._closeWindow(e.target);
		}
	}

	_onStartMouseMove(e) {
		if (this._isMouseEnabled) {
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