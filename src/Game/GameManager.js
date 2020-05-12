// GameManager.js

import GameTime from "./GameTime";

class GameManager {

	constructor(system) {
		this._system = system;

		this._gameTime = new GameTime();
	}

	get time() {
		return this._gameTime;
	}

	update() {
		const dt = this._system.time.deltaTime;

		this._gameTime.update(dt);
	}
}

export default GameManager;