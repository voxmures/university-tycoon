// Landmark System

import Landmark from "./Landmark";

class LandmarkSystem {
	
	constructor(options = {}) {
		if (!options.conditionFactory) {
			console.error("EventSystem:", "ConditionFactory should be given to the system at creation time.");
			return;
		}
		this._conditionFactory = options.conditionFactory;

		if (!options.actionFactory) {
			console.error("EventSystem:", "ActionFactory should be given to the system at creation time.");
			return;
		}
		this._actionFactory = options.actionFactory;

		this._landmarks = [];
		this._triggered = [];

		this._conditions = [];
		this._actions = [];
	}

	init(data) {

		for (let i = 0; i < data.length; i++) {
			const landmark = new Landmark(data[i].id, data[i].conditions, data[i].actions, this);
			this._landmarks.push(landmark);

			for (let condition of data[i].conditions) {
				
				let id;
				if (Array.isArray(condition)) {
					id = condition[0];
				} else {
					id = condition;
				}

				if (!this._conditions[id]) {
					this._conditions[id] = this._conditionFactory.create(id);
				}

				this._conditions[id].subscribe(landmark);
			}

			for (let action of data[i].actions) {

				let id;
				if (Array.isArray(action)) {
					id = action[0];
				} else {
					id = action;
				}

				if (!this._actions[id]) {
					this._actions[id] = this._actionFactory.create(id);
				}
			}
		}
	}

	unsubscribe(id) {
		const index = this._landmarks.findIndex((landmark) => landmark.id === id);

		if (index === -1) {
			console.error("LandmarkSystem:", `Landmark indentified by ${id} does not exist.`);
			return;
		}

		for (let condition of this._landmarks[index].conditions) {
			this._conditions[condition].unsubscribe(this._landmarks[index].id);
		}

		this._landmarks.splice(index, 1);
	}

	_executeActions() {
		for (let i = 0; i < this._triggered.length; i++) {
			for (let action of this._triggered[i].actions) {
				this._actions[action].execute(this._triggered[i], this._triggered[i].getParamsByActionId(action));
			}
		}
		this._triggered = [];
	}

	update() {
		// Check which events are triggered
		for (let id of Object.keys(this._conditions)) {
			this._conditions[id].check();
		}

		for (let id of Object.keys(this._landmarks)) {
			if (this._landmarks[id].isTriggered()) {
				this._triggered.push(this._landmarks[id]);
			}

			this._landmarks[id].reset();
		}

		this._executeActions();
	}
}

export default LandmarkSystem;