// Window.js

import { Container } from "@babylonjs/gui";
import { Rectangle } from "@babylonjs/gui";
import { StackPanel } from "@babylonjs/gui";
import { TextBlock } from "@babylonjs/gui";
import { Button } from "@babylonjs/gui";

import { Control } from "@babylonjs/gui/2D/controls/";

const DEFAULT_WIDTH = 240;
const DEFAULT_HEIGHT = 240;

class Window extends Rectangle {
	constructor(name, options) {
		super(name);

		this._init(options || {});
	}

	_init(options) {
		this.isPointerBlocker = true;

		this.width = (options.width || DEFAULT_WIDTH) + "px";
		this.height = (options.height || DEFAULT_HEIGHT) + "px";
		this.background = "white";
		this.color = "#000078";
		this.thickness = 4;

		const panel = new StackPanel();
		panel.width = (options.width || DEFAULT_WIDTH) + "px";
		panel.height = (options.height || DEFAULT_HEIGHT) + "px";
		panel.panelVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		this.addControl(panel);

		const headerHeight = (options.height || DEFAULT_HEIGHT) / 6;

		const header = new StackPanel();
		header.isVertical = false;
		header.width = (options.width || DEFAULT_WIDTH) + "px";
		header.height = headerHeight + "px";
		header.fontFamily = "Font Awesome 5 Free";
		header.fontWeight = 900;
		panel.addControl(header);

		const textWidth = (options.width || DEFAULT_WIDTH) * 0.9;

	    const title = new TextBlock();
	    title.text = "Modal Title \uf00d";
	    title.color = "black";
	    title.fontSize = 12;
	    title.fontStyle = 'bold';
	    title.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	    title.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
	    title.width = textWidth + 'px';
	    title.height = headerHeight + 'px';
	    title.paddingLeft = ((options.width || DEFAULT_WIDTH) * 0.02) + 'px';
	    title.paddingTop = (headerHeight * 0.35) + 'px';
	    header.addControl(title);

	    var closeButton = new Button.CreateSimpleButton("closeButton", "\uf00d");
	    closeButton.color = "black";
	    closeButton.fontFamily = "'Font Awesome 5 Free'";
	    closeButton.fontWeight = 900;
	    closeButton.width = ((options.width || DEFAULT_WIDTH) - textWidth) + 'px'; // paddingLeft is subtracted
	    closeButton.height = headerHeight + 'px';
	    closeButton.thickness = 0;
	    header.addControl(closeButton)
	}
}

export default Window;