// Transition.js

import { Rectangle } from "@babylonjs/gui";

import { gsap } from "gsap";

class Transition extends Rectangle {

	constructor(color = "black", isHidden = true) {
		super();

		this._init(color, isHidden);
	}

	_init(color, isHidden) {
		this.width = 1;
		this.height = 1;
		this.thickness = 0;
		this.isPointerBlocker = true;

		this.background = color;
		this.alpha = isHidden ? 0 : 1;
	}

	fadeIn(duration, cb) {
		gsap.to(this, {
			duration: duration,
			alpha: 1,
			onComplete: cb
		});
	}
}

export default Transition;