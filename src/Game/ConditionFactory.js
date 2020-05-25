// ConditionFactory

import Condition from "../LandmarkSystem/Condition";

const TestsCollection = {
	"CONDITION_GAME_START": function () { return true; },
	"CONDITION_VARIABLE_LESS_THAN": function ([a, b]) { return this.parser.parse(a) < b; }
};

class ConditionFactory {

	constructor(ctx) {
		this._ctx = ctx;
	}

	create(id) {
		if (!TestsCollection[id]) {
			console.error("ConditionFactory:", `Test identified by ${id} is not implemented.`);
			return;
		}

		return new Condition(id, TestsCollection[id].bind(this._ctx));
	}
}

export default ConditionFactory;