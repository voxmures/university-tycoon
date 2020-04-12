// Test Scene
import GameScene from "../Core/GameScene";

import { Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { GridMaterial } from "@babylonjs/materials/grid";
import { StandardMaterial } from "@babylonjs/core";

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";

class TestScene extends GameScene {

	setup() {
		this._sphere = null;
	}

	init() {
		// Camera
		const camera = new FreeCamera("camera2", new Vector3(0, 5, -10), this._scene);
		camera.setTarget(Vector3.Zero());
		//camera.attachControl(this._scene.getEngine().getRenderingCanvas(), true);

		// Light
		const light = new HemisphericLight("light1", new Vector3(0, 1, 0), this._scene);
		light.intensity = 0.7;

		// Material
		const sphereMat = new GridMaterial("sphereMat", this._scene);
		
		const groundMat = new StandardMaterial("groundMat", this._scene);
		groundMat.diffuseTexture = this._system.loader.getAssetByKey("logo");
		groundMat.diffuseTexture.hasAlpha = true;

		// Sphere
		this._sphere = Mesh.CreateSphere("sphere1", 16, 2, this._scene);
		this._sphere.position.y = 2;
		this._sphere.material = sphereMat;

		// Ground
		const ground = Mesh.CreateGround("ground1", 6, 6, 2, this._scene);
		ground.material = groundMat;
	}

	update() {
		const dt = this._system.time.deltaTime;
		this._sphere.rotate(new Vector3(0, 1, 0), (Math.PI / 2) * (dt / 1000), 0);
	}
}

export default TestScene;