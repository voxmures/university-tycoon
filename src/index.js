import { Engine } from "@babylonjs/core/Engines/engine";

import Time from "./Core/Time"; 
import SceneManager from "./Core/SceneManager";

import SplashScreenScene from "./Scenes/SplashScreenScene";

// Get the canvas element from the DOM.
const canvas = document.getElementById("game-container");

// Associate a Babylon Engine to it.
const engine = new Engine(canvas);

// Creates Time manager
const time = new Time();

// Creates Scene Manager
const sceneManager = new SceneManager();

const scene = new SplashScreenScene(engine);

sceneManager.add("SplashScreen", scene);

sceneManager.load("SplashScreen");

// Render every frame
engine.runRenderLoop(() => {
	time.update();

	if (sceneManager.activeScene) {
    	sceneManager.activeScene.update(time.deltaTime);
    	sceneManager.activeScene.render();
	}
});