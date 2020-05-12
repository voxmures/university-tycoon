//import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/solid.css";

import FontFaceObserver from "fontfaceobserver";

import { Engine } from "@babylonjs/core/Engines/engine";

import System from "./Core/System";

import GameManager from "./Game/GameManager";

import SplashScreenScene from "./Scenes/SplashScreenScene";
import PersistenceScene from "./Scenes/PersistenceScene";
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

	const game = new GameManager(system);

	const splashScreen = new SplashScreenScene(system, game);
	const persistence = new PersistenceScene(system, game);
	const gui = new GUIScene(system, game);

	const sceneManager = system.sceneManager;

	sceneManager.add("SplashScreen", splashScreen);
	sceneManager.add("Persistence", persistence);
	sceneManager.add("GUI", gui);

	// Render every frame
	engine.runRenderLoop(() => {
		system.time.update();	// Update time

		sceneManager.update();
		sceneManager.render();
	});

	window.addEventListener("resize", () => {
		engine.resize();
	});

});