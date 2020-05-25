// Params Parser

class ParamsParser {
	constructor(game) {
		this._game = game;
	}

	parse(param) {
		switch (param) {
			case "VARIABLE_CASH":
				return this._game.university.cash;
			default:
				console.error("ParamsParser:", `Parameter defined by ${param} is not mapped to any game variable.`);
				return;
		}
	}
}

export default ParamsParser;