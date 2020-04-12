// Window.js

import { Container } from "@babylonjs/gui";
import { Rectangle } from "@babylonjs/gui";
import { StackPanel } from "@babylonjs/gui";
import { TextBlock } from "@babylonjs/gui";
import { Button } from "@babylonjs/gui";

import { Control } from "@babylonjs/gui/2D/controls/";

import WindowEvent from "./WindowEvent";

const DEFAULT_WIDTH = 240;
const DEFAULT_HEIGHT = 240;

class Window extends Rectangle {
	constructor(name, options, parent) {
		super(name);
		this._parent = parent;	// Parent GameScene

		this._init(options || {});
	}

	_init(options) {
		this.isPointerBlocker = true;
		this.onPointerDownObservable.add(this._onClick.bind(this));

		this.width = (options.width || DEFAULT_WIDTH) + "px";
		this.height = (options.height || DEFAULT_HEIGHT) + "px";
		this.background = "#DCDCDC";
		this.cornerRadius = 2;
		this.color = "#000000";
		this.thickness = 1;

		const panel = new StackPanel();
		panel.width = (options.width || DEFAULT_WIDTH) + "px";
		panel.height = (options.height || DEFAULT_HEIGHT) + "px";
		panel.panelVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		this.addControl(panel);

		const header = this._generateHeader(options);

		if (options.isMoveable) {
			header.isPointerBlocker = true;
			header.onPointerDownObservable.add(this._startMouseMove.bind(this));
		}

		panel.addControl(header);
		panel.addControl(this._generateBody(options));
	}

	_generateHeader(options) {
		const headerHeight = (options.height || DEFAULT_HEIGHT) / 6;

		const header = new StackPanel();
		header.isVertical = false;
		header.width = (options.width || DEFAULT_WIDTH) + "px";
		header.height = headerHeight + "px";

		const textWidth = (options.width || DEFAULT_WIDTH) * 0.95;

	    const title = new TextBlock();
	    title.text = options.title || "Window Title";
	    title.color = "black";
	    title.fontSize = 12;
	    title.fontStyle = "bold";
	    title.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	    title.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
	    title.width = textWidth + "px";
	    title.height = headerHeight + "px";
	    title.paddingLeft = ((options.width || DEFAULT_WIDTH) * 0.02) + "px";
	    title.paddingTop = (headerHeight * 0.35) + "px";

	    var closeButton = new Button.CreateSimpleButton("closeButton", "\uf00d");
	    closeButton.color = "#000000";
	    closeButton.fontFamily = "'Font Awesome 5 Free'";
	    closeButton.fontWeight = 900;
	    closeButton.textBlock.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
		closeButton.textBlock.paddingRight = ((options.width || DEFAULT_WIDTH) * 0.02) + "px";
	    closeButton.width = ((options.width || DEFAULT_WIDTH) - textWidth) + "px"; // paddingLeft is subtracted
	    closeButton.height = headerHeight + "px";
	    closeButton.thickness = 0;

	    closeButton.onPointerClickObservable.add(this._onClose.bind(this));

	   	header.addControl(title);
	    header.addControl(closeButton);

	    return header;
	}

	_generateBody(options) {
		const width = (options.width || DEFAULT_WIDTH) * 0.98;
		const height = ((options.height || DEFAULT_HEIGHT) * 5 / 6) * 0.98;

		const body = new Rectangle();
		body.width = width + "px";
		body.height = height + "px";
		body.left = "1px";
		body.background = "#D3D3D3";
		body.cornerRadius = 2;
		body.color = "#000000";
		body.thickness = 1;

		return body;
	}

	_onClick() {
		this._parent.system.bus.dispatch(new WindowEvent(WindowEvent.WINDOW_FOCUS, this));
	}

	_onClose() {
		this._onClick();
		this._parent.system.bus.dispatch(new WindowEvent(WindowEvent.WINDOW_CLOSE, this));
	}

	_startMouseMove() {
		this._onClick();
		this._parent.system.bus.dispatch(new WindowEvent(WindowEvent.START_MOUSE_MOVE, this));
	}
}

export default Window;