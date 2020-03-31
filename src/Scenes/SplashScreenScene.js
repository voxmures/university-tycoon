// SplashScreenScene.js

import GameScene from "../Core/GameScene";
import Transition from "../GUI/Transition";

import { Vector3 } from "@babylonjs/core/Maths/math";
import { Color3 } from "@babylonjs/core";

import { TargetCamera } from "@babylonjs/core/Cameras";
import { StandardMaterial } from "@babylonjs/core";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

import { Texture } from "@babylonjs/core";

import { AdvancedDynamicTexture } from "@babylonjs/gui";

import { gsap } from "gsap";

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";

class SplashScreenScene extends GameScene {

	setup() {
		this._transition = null;	// Transition panel
	}

	preload() {
		this._system.loader.add("logo", "content/uoc_logo.png");
	}

	init() {
		// Background
		this._scene.clearColor = new Color3(1, 1, 1);
		this._scene.ambientColor = new Color3(1, 1, 1);

		// Camera
		const camera = new TargetCamera("camera1", new Vector3(0, 0, -5), this._scene);
		camera.setTarget(Vector3.Zero());

		// Logo
		const logoMat = new StandardMaterial("logoMat", this._scene);
		logoMat.ambientColor = new Color3(1, 1, 1);
		logoMat.diffuseTexture = this._system.loader.getAssetByKey("logo");
		logoMat.diffuseTexture.hasAlpha = true;
		logoMat.diffuseTexture.vScale = 3.87;	// Image size: 1394 x 360 
		logoMat.diffuseTexture.vOffset = -1.5;
		logoMat.diffuseTexture.wrapV = Texture.CLAMP_ADDRESSMODE;
		logoMat.backFaceCulling = true;

		const logo = Mesh.CreatePlane("logo", 3, this._scene);
		logo.material = logoMat;
		logo.visibility = 0;

		gsap.to(logo, {
			delay: 1,
			duration: 1,
			visibility: 1
		});

		// Transition Panel
		const rootUI = AdvancedDynamicTexture.CreateFullscreenUI("rootUI", true, this._scene);
		
		this._transition = new Transition();

		rootUI.addControl(this._transition);

		// Go to MenuScene
		gsap.delayedCall(4, this._goToMenuScene.bind(this));
	}

	_goToMenuScene() {
		this._transition.fadeIn(2, () => {
			this._system.sceneManager.stop("SplashScreen");
			this._system.sceneManager.start("Test");
		});
	}
}

export default SplashScreenScene;