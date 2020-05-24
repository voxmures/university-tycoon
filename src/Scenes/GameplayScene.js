// Gameplay Scene
// Main scene where all the action takes place

import GameScene from "../Core/GameScene";

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
	}

	init() {
		// Start subsystems
		this._system.sceneManager.start("HUD");
		this._system.sceneManager.start("GUI");

		this.startGame();
	}

	startGame() {
		const data = JSON.parse(this._system.loader.getAssetByKey("initData"));
		this._game.init(data);
	}

	update() {
		const dt = this._system.time.deltaTime;
		this._game.update(dt);
	}

	render() {
		// NoOp
	}
}

export default GameplayScene;