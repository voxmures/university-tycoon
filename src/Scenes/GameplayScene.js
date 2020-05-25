// Gameplay Scene
// Main scene where all the action takes place

import GameScene from "../Core/GameScene";

import LandmarkSystem from "../LandmarkSystem/LandmarkSystem";

import ParamsParser from "../Game/ParamsParser";
import ConditionFactory from "../Game/ConditionFactory";
import ActionFactory from "../Game/ActionFactory";

import { ImageAssetTask } from "@babylonjs/core/Misc";

class GameplayScene extends GameScene {

	preload() {
		// Load GUI images
		this._system.loader.add("greyPanel", "content/images/grey_panel.png", { task: ImageAssetTask });
		this._system.loader.add("blueButton_On", "content/images/blue_button_on.png", { task: ImageAssetTask });
		this._system.loader.add("blueButton_Off", "content/images/blue_button_off.png", { task: ImageAssetTask });
		this._system.loader.add("greenButton_On", "content/images/green_button_on.png", { task: ImageAssetTask });
		this._system.loader.add("greenButton_Off", "content/images/green_button_off.png", { task: ImageAssetTask });
		this._system.loader.add("windowPanel", "content/images/window_green.png", { task: ImageAssetTask });
		this._system.loader.add("greyCircle", "content/images/grey_circle.png", { task: ImageAssetTask });

		// Load GUI sounds
		this._system.loader.add("clickSFX", "content/audio/click.ogg");

		// Load Data
		this._system.loader.add("initData", "content/data/init.json");
		this._system.loader.add("landmarksData", "content/data/landmarks.json");

		// Localization
		this._system.loader.add("localization", "content/localization/en.json");
	}

	setup() {
		this._isRunning = false;

		this._landmarkSystem = null;
		this._localization = {};
	}

	init() {
		// Start subsystems
		this._system.sceneManager.start("HUD");
		this._system.sceneManager.start("GUI");

		this._initLandmarkSystem();
		this._initLocalization();

		this.startGame();
	}

	startGame() {
		let data = JSON.parse(this._system.loader.getAssetByKey("initData"));
		this._game.init(data);

		this._isRunning = true;
	}

	_initLandmarkSystem() {

		const paramsParser = new ParamsParser(this._game);
		const conditionFactory = new ConditionFactory({ parser: paramsParser });
		const actionFactory = new ActionFactory({ parser: paramsParser, scene: this });

		this._landmarkSystem = new LandmarkSystem({ 
			conditionFactory: conditionFactory,
			actionFactory: actionFactory
		});

		const data = JSON.parse(this._system.loader.getAssetByKey("landmarksData"));

		this._landmarkSystem.init(data.landmarks);
	}

	_initLocalization() {
		const data = JSON.parse(this._system.loader.getAssetByKey("localization"))["data"];

		for (let i = 0; i < data.length; i++) {
			this._localization[data[i].id] = data[i].text;
		}
	}

	showMessage(id) {
		console.log(this._localization[id]);
	}

	update() {
		if (this._isRunning) {
			const dt = this._system.time.deltaTime;
			this._game.update(dt);

			this._landmarkSystem.update();
		}
	}

	render() {
		// NoOp
	}
}

export default GameplayScene;