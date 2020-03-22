import { Engine } from "@babylonjs/core/Engines/engine";

import Time from "./Core/Time"; 
import SceneManager from "./Core/SceneManager";

import TestScene from "./Scenes/TestScene";

// Get the canvas element from the DOM.
const canvas = document.getElementById("game-container");

// Associate a Babylon Engine to it.
const engine = new Engine(canvas);

// Creates Time manager
const time = new Time();

// Creates Scene Manager
const sceneManager = new SceneManager();

const scene = new TestScene(engine);

sceneManager.add("TestScene", scene);

sceneManager.load("TestScene");

// Render every frame
engine.runRenderLoop(() => {
	time.update();

    sceneManager.activeScene.update(time.deltaTime);
    sceneManager.activeScene.render();
});