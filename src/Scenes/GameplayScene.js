// Gameplay Scene
// Main scene where all the action takes place

import GameScene from "../Core/GameScene";

class GameplayScene extends GameScene {

	preload() {
		this._system.loader.add("greyPanel", "content/images/grey_panel.png");
		this._system.loader.add("blueButton_On", "content/images/blue_button_on.png");
		this._system.loader.add("blueButton_Off", "content/images/blue_button_off.png");
		this._system.loader.add("greenButton_On", "content/images/green_button_on.png");
		this._system.loader.add("greenButton_Off", "content/images/green_button_off.png");
	}

	init() {
		// Start subsystems
		this._system.sceneManager.start("HUD");
		this._system.sceneManager.start("GUI");
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