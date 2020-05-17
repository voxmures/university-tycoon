// HUD Scene

import GameScene from "../Core/GameScene";

import { Vector3 } from "@babylonjs/core/Maths/math";
import { Color3 } from "@babylonjs/core";

import { TargetCamera } from "@babylonjs/core/Cameras";

import { AdvancedDynamicTexture } from "@babylonjs/gui";
import { Rectangle } from "@babylonjs/gui";
import { Image } from "@babylonjs/gui";
import { StackPanel } from "@babylonjs/gui";
import { TextBlock } from "@babylonjs/gui";

import { Control } from "@babylonjs/gui/2D/controls/";

const SCOREBOARD_SIZE = { 
	width: 150,
	height: 50
};

class HUDScene extends GameScene {
	
	setup() {
		this._camera = null;
		this._rootUI = null;

		this._scoreboard = {};
	}

	init() {
		// Makes the background transparent
		this._scene.autoClear = false;

		// Camera
		this._camera = new TargetCamera("cameraHUD", new Vector3(0, 0, -5), this._scene);
		this._camera.setTarget(Vector3.Zero());

		this._rootUI = AdvancedDynamicTexture.CreateFullscreenUI("rootUI", true, this._scene);
	
		this._scoreboard = this._generateScoreboard(this._rootUI);
	}

	_generateScoreboard(parent) {
		// Scoreboard
		const scoreboard = new Rectangle("scoreboard");
		scoreboard.isPointerBlocker = true;
		scoreboard.width = SCOREBOARD_SIZE.width + "px";
		scoreboard.height = SCOREBOARD_SIZE.height + "px";
		scoreboard.thickness = 0;
		scoreboard.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
		scoreboard.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

		const background = new Image("scoreboardBkg", "content/images/grey_panel.png");
		background.stretch = Image.STRETCH_NINE_PATCH;
		background.sliceLeft = 5;
		background.sliceTop = 5;
		background.sliceRight = 95;
		background.sliceBottom = 95;
		scoreboard.addControl(background);

		const panel = new StackPanel("scoreboardPanel");
		scoreboard.addControl(panel);

		const dayField = new StackPanel("dayField");
		dayField.isVertical = false;
		dayField.height = `${Math.floor((SCOREBOARD_SIZE.height - 10) / 2)}px`;
		dayField.paddingLeft = "10px";
		panel.addControl(dayField);

		const dayLabel = new TextBlock("dayLabel");
		dayLabel.text = "Day";
		dayLabel.color = "black";
		dayLabel.fontSize = 12;
		dayLabel.fontStyle = "bold";
		dayLabel.width = `${Math.floor(SCOREBOARD_SIZE.width / 3)}px`;
	    dayLabel.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	    dayLabel.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		dayField.addControl(dayLabel);

		const dayValue = new TextBlock("dayValue");
		dayValue.text = "0";
		dayValue.color = "black";
		dayValue.fontSize = 12;
		dayValue.width = `${SCOREBOARD_SIZE.width - Math.floor(SCOREBOARD_SIZE.width / 3)}px`;
		dayValue.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	    dayValue.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		dayField.addControl(dayValue);

		const cashField = new StackPanel("cashField");
		cashField.isVertical = false;
		cashField.height = `${Math.floor((SCOREBOARD_SIZE.height - 10)  / 2)}px`;
		cashField.paddingLeft = "10px";
		panel.addControl(cashField);

		const cashLabel = new TextBlock("cashLabel");
		cashLabel.text = "Cash";
		cashLabel.color = "black";
		cashLabel.fontSize = 12;
		cashLabel.fontStyle = "bold";
		cashLabel.width = `${Math.floor(SCOREBOARD_SIZE.width / 3)}px`;
		cashLabel.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	    cashLabel.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		cashField.addControl(cashLabel);

		const cashValue = new TextBlock("cashValue");
		cashValue.text = "00000 €";
		cashValue.color = "black";
		cashValue.fontSize = 12;
	    cashValue.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	    cashValue.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		cashValue.width = `${SCOREBOARD_SIZE.width - Math.floor(SCOREBOARD_SIZE.width / 3)}px`;
		cashField.addControl(cashValue);

		parent.addControl(scoreboard);

		return {
			day: dayValue,
			cash: cashValue
		};
	}

	_updateDayValue() {
		this._scoreboard.day.text = `${this._game.time.current}`;
	}

	_updateCashValue() {
		this._scoreboard.cash.text = `${this._game.university.cash} €`;
	}

	update() {
		this._updateDayValue();
		this._updateCashValue();
	}
}

export default HUDScene;