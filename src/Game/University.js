// University

import Teacher from "./Teacher";

class University {
	
	constructor() {
		this._cash = 0;
		this._tuition = 0;
		this._students = 0;

		this._teachers = [];
	}

	get cash() {
		return this._cash;
	}

	get tuition() {
		return this._tuition;
	}

	get students() {
		return this._students;
	}

	get teachers() {
		return this._teachers;
	}

	init(data) {
		this._cash = data.cash;
		this._tuition = data.tuition;
		this._students = data.students;

		for (let i = 0; i < data.teachers.length; i++) {
			const teacher = data.teachers[i];
			this._teachers.push(new Teacher(teacher.name, teacher.salary, teacher.mood, teacher.rank));
		}
	}

	paySalaries() {
		const salaries = this._teachers.map((teacher) => teacher.salary).reduce((acc, cur) => acc + cur);
		this._cash -= salaries;
	}

	earnTuition() {
		const tuition = this._students * this._tuition;
		this._cash += tuition;
	}
}

export default University;