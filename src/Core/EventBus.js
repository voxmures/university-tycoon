// EventBus.js

class EventBus {
	constructor(system) {
		this._system = system;

		this._listeners = {};
	}

	listenTo(id, callback, context = null) {
		if (!this._listeners[id]) {
			this._listeners[id] = [];
		}

		this._listeners[id].push(callback.bind(context));
	}

	remove(id, callback) {
		if (this._listeners[id]) {
			const index = this._listeners[id].indexOf(callback);

			if (index !== -1) {
				this._listeners.splice(index, 1);
			}
		}
	}

	dispatch(event) {
		if (this._listeners[event.id]) {
			for (let i = 0; i < this._listeners[event.id].length; i++) {
				this._listeners[event.id][i](event);
			}
		}
	}

	reset() {
		this._listeners = {};
	}
}

export default EventBus;