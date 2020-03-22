// Test Scene
import GameScene from "../Core/GameScene";

import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { GridMaterial } from "@babylonjs/materials/grid";

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";

class TestScene extends GameScene {

	constructor(engine) {
		super(engine);

		this._sphere = null;	// Represents a sphere

		this.init();
	}

	init() {
		// Create our first scene.
		this._scene = new Scene(this._engine);

		// Camera
		const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), this._scene);
		camera.setTarget(Vector3.Zero());
		camera.attachControl(this._engine.getRenderingCanvas(), true);

		// Light
		const light = new HemisphericLight("light1", new Vector3(0, 1, 0), this._scene);
		light.intensity = 0.7;

		// Material
		const material = new GridMaterial("grid", this._scene);

		// Sphere
		this._sphere = Mesh.CreateSphere("sphere1", 16, 2, this._scene);
		this._sphere.position.y = 2;
		this._sphere.material = material;

		// Ground
		const ground = Mesh.CreateGround("ground1", 6, 6, 2, this._scene);
		ground.material = material;
	}

	update(dt) {
		this._sphere.rotate(new Vector3(0, 1, 0), (Math.PI / 2) * (dt / 1000), 0);
	}
}

export default TestScene;