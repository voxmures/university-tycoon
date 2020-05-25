// Landmark

class Landmark {

	constructor(id, conditions, actions, parent) {
		this._id = id;

		this._conditions = {};
		for (let i = 0; i < conditions.length; i++) {
			const condition = conditions[i];

			if (Array.isArray(condition)) {
				this._conditions[condition[0]] = { isHit: false, params: condition.slice(1) };
			} else {
				this._conditions[condition] = { isHit: false, params: null }
			}
		}

		this._actions = {};
		for (let i = 0; i < actions.length; i++) {
			const action = actions[i];

			if (Array.isArray(action)) {
				this._actions[action[0]] = action.slice(1);
			} else {
				this._actions[action] = [];
			}
		}

		this._parent = parent;
	}

	get id() {
		return this._id;
	}

	get conditions() {
		return Object.keys(this._conditions);
	}

	get actions() {
		return Object.keys(this._actions);
	}

	getParamsByConditionId(id) {
		return this._conditions[id].params;
	}

	getParamsByActionId(id) {
		return this._actions[id];
	}

	hit(id) {
		this._conditions[id].isHit = true;
	}

	isTriggered() {
		for (let id of Object.keys(this._conditions)) {
			if (!this._conditions[id].isHit) {
				return false;
			}
		}

		return true;
	}

	reset() {
		for (let id of Object.keys(this._conditions)) {
			this._conditions[id].isHit = false;
		}
	}

	selfUnsubscribe() {
		this._parent.unsubscribe(this._id);
	}
}

export default Landmark;