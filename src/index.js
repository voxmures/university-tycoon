//import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/solid.css";

import FontFaceObserver from "fontfaceobserver";

import { Engine } from "@babylonjs/core/Engines/engine";

import System from "./Core/System";

import GameState from "./Game/GameState";

import SplashScreenScene from "./Scenes/SplashScreenScene";
import GameplayScene from "./Scenes/GameplayScene";
import GUIScene from "./Scenes/GUIScene";
import HUDScene from "./Scenes/HUDScene";

const font = new FontFaceObserver("Font Awesome 5 Free", { weight: 900, style: 'normal' });

// Wait until the font is loaded, so it can be used in our canvas
font.load().then(() => {

	// Get the canvas element from the DOM.
	const canvas = document.getElementById("game-container");

	// Associate a Babylon Engine to it.
	const engine = new Engine(canvas);

	// Create game system
	const system = new System(engine);

	system.onStart = () => {

		const game = new GameState();

		const splashScreen = new SplashScreenScene(system, game);
		const gameplay = new GameplayScene(system, game);
		const hud = new HUDScene(system, game);
		const gui = new GUIScene(system, game);

		const sceneManager = system.sceneManager;

		sceneManager.add("SplashScreen", splashScreen);
		sceneManager.add("Gameplay", gameplay);
		sceneManager.add("GUI", gui);
		sceneManager.add("HUD", hud);
	};

	system.onReset = () => {
		system.start();
	};

	system.start();

	window.addEventListener("resize", () => {
		engine.resize();
	});
});