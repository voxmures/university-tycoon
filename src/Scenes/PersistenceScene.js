// Persistence Scene
// This scene maintains the persistence layer of the game

import GameScene from "../Core/GameScene";

class PersistenceScene extends GameScene {
	
	update() {
		const dt = this._system.time.deltaTime;
		this._game.time.update(dt);
	}

	render() {
		// NoOp
	}
}

export default PersistenceScene;