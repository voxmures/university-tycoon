// Action Factory

import Action from "../LandmarkSystem/Action";

const MethodsCollection = {
	"ACTION_UNSUBSCRIBE_LANDMARK": function (landmark) { landmark.selfUnsubscribe(); },
	"ACTION_SHOW_MESSAGE": function (landmark, [a]) { this.scene.showMessage(a); }
};

class ActionFactory {

	constructor(ctx) {
		this._ctx = ctx;
	}

	create(id) {
		if (!MethodsCollection[id]) {
			console.error("ActionFactory:", `Method identified by ${id} is not implemented.`);
			return;
		}

		return new Action(id, MethodsCollection[id].bind(this._ctx));
	}
}

export default ActionFactory;