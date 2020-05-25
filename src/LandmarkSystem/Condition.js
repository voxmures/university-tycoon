// Condition

class Condition {

	constructor(id, test) {
		this._id = id;
		this._test = test;

		this._subscriptions = [];
	}

	subscribe(landmark) {
		if (this._subscriptions.find((subscription) => subscription.landmark.id === landmark.id)) {
			console.error("LandmarkSystem:", `Landmark identified by ${landmark.id} is already subscribed to condition ${this._id}.`);
			return;
		}

		this._subscriptions.push(landmark);
	}

	unsubscribe(id) {
		const index = this._subscriptions.findIndex((subscription) => subscription.id === id);

		if (index === -1) {
			console.error("EventSystem:", `Event identified by ${id} does not exist in condition ${this._id}.`);
			return;
		}

		this._subscriptions.splice(index, 1);
	}

	check() {
		for (let i = 0; i < this._subscriptions.length; i++) {
			if (this._test(this._subscriptions[i].getParamsByConditionId(this._id))) {
				this._subscriptions[i].hit(this._id);
			}
		}
	}
}

export default Condition;