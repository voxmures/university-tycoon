import { Engine } from "@babylonjs/core/Engines/engine";

import System from "./Core/System";

import SplashScreenScene from "./Scenes/SplashScreenScene";
import TestScene from "./Scenes/TestScene";

// Get the canvas element from the DOM.
const canvas = document.getElementById("game-container");

// Associate a Babylon Engine to it.
const engine = new Engine(canvas);

// Create game system
const system = new System(engine);

const splashScreen = new SplashScreenScene(system);
const test = new TestScene(system);

const sceneManager = system.sceneManager;

sceneManager.add("SplashScreen", splashScreen);
sceneManager.add("Test", test);

sceneManager.load("SplashScreen");

// Render every frame
engine.runRenderLoop(() => {
	system.time.update();

	if (sceneManager.activeScene) {
    	sceneManager.activeScene.update();
    	sceneManager.activeScene.render();
	}
});