// Teacher

class Teacher {
	
	constructor(name, salary, mood, rank) {
		this._name = name;
		this._salary = salary;
		this._mood = mood;
		this._rank = rank;
	}

	get name() {
		return this._name;
	}

	get salary() {
		return this._salary;
	}

	get mood() {
		return this._mood;
	}

	get rank() {
		return this._rank;
	}
}

export default Teacher;