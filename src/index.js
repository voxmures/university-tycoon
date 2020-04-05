//import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/solid.css";

import FontFaceObserver from "fontfaceobserver";

import { Engine } from "@babylonjs/core/Engines/engine";

import System from "./Core/System";

import SplashScreenScene from "./Scenes/SplashScreenScene";
import TestScene from "./Scenes/TestScene";
import GUIScene from "./Scenes/GUIScene";

const font = new FontFaceObserver("Font Awesome 5 Free", { weight: 900, style: 'normal' });

// Wait until the font is loaded, so it can be used in our canvas
font.load().then(() => {

	// Get the canvas element from the DOM.
	const canvas = document.getElementById("game-container");

	// Associate a Babylon Engine to it.
	const engine = new Engine(canvas);

	// Create game system
	const system = new System(engine);

	const splashScreen = new SplashScreenScene(system);
	const test = new TestScene(system);
	const gui = new GUIScene(system);

	const sceneManager = system.sceneManager;

	sceneManager.add("SplashScreen", splashScreen);
	sceneManager.add("Test", test);
	sceneManager.add("GUI", gui);

	// Render every frame
	engine.runRenderLoop(() => {
		system.time.update();	// Update time

		sceneManager.update();
		sceneManager.render();
	});

});