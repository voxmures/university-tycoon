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
import { Button } from "@babylonjs/gui";

import { Control } from "@babylonjs/gui/2D/controls/";

import { Sound } from "@babylonjs/core";

const SCOREBOARD_SIZE = { 
	width: 150,
	height: 50
};

class HUDScene extends GameScene {
	
	setup() {
		this._camera = null;
		this._rootUI = null;

		this._timeCtrl = {};
		this._scoreboard = {};

		this._clickSFX = null;
	}

	init() {
		// Makes the background transparent
		this._scene.autoClear = false;

		// Camera
		this._camera = new TargetCamera("cameraHUD", new Vector3(0, 0, -5), this._scene);
		this._camera.setTarget(Vector3.Zero());

		this._rootUI = AdvancedDynamicTexture.CreateFullscreenUI("rootUI", true, this._scene);
	
		this._timeCtrl = this._generateTimeCtrl(this._rootUI);
		this._scoreboard = this._generateScoreboard(this._rootUI);

		this._clickSFX = new Sound("clickSFX", this._system.loader.getAssetByKey("clickSFX"), this._scene, null, {
			autoplay: false,
			loop: false
		});
	}

	_generateTimeCtrl(parent) {
		const timeCtrl = new StackPanel();
		timeCtrl.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;

		// Time counter
		const timeCounter = new Rectangle("timeCounter");
		timeCounter.isPointerBlocker = true;
		timeCounter.width = `${SCOREBOARD_SIZE.width}px`;
		timeCounter.height = "30px";
		timeCounter.thickness = 0;
		timeCtrl.addControl(timeCounter);

		const background = new Image("timeCounterBkg", "");
		background.domImage = this._system.loader.getAssetByKey("greyPanel");
		background.stretch = Image.STRETCH_NINE_PATCH;
		background.sliceLeft = 5;
		background.sliceTop = 5;
		background.sliceRight = 95;
		background.sliceBottom = 95;
		timeCounter.addControl(background);

		const timeField = new StackPanel("timeField");
		timeField.isVertical = false;
		timeField.height = "20px";
		timeField.paddingLeft = "10px";
		timeCounter.addControl(timeField);

		const timeLabel = new TextBlock("timeLabel");
		timeLabel.text = "Week";
		timeLabel.color = "black";
		timeLabel.fontSize = 12;
		timeLabel.fontStyle = "bold";
		timeLabel.width = `${Math.floor(SCOREBOARD_SIZE.width / 3)}px`;
	    timeLabel.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	    timeLabel.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		timeField.addControl(timeLabel);

		const timeValue = new TextBlock("timeValue");
		timeValue.text = "0";
		timeValue.color = "black";
		timeValue.fontSize = 12;
		timeValue.width = `${SCOREBOARD_SIZE.width - Math.floor(SCOREBOARD_SIZE.width / 3)}px`;
		timeValue.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	    timeValue.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		timeField.addControl(timeValue);

		// Pause/Play buttons
		const buttonsPanel = new StackPanel();
		buttonsPanel.isVertical = false;
		buttonsPanel.height = "60px";
		timeCtrl.addControl(buttonsPanel);

		const pauseButton = Button.CreateImageWithCenterTextButton("pauseButton", "\uf04c", "");

		if (this._game.time.isPaused) {
			pauseButton.image.domImage = this._system.loader.getAssetByKey("blueButton_On");
			pauseButton.color = "#FFFFFF";
		} else {
			pauseButton.image.domImage = this._system.loader.getAssetByKey("blueButton_Off");
			pauseButton.color = "#1EA7E1";
		}

	    pauseButton.fontFamily = "'Font Awesome 5 Free'";
	    pauseButton.fontWeight = 900;
	    pauseButton.fontSize = 24;
	    pauseButton.thickness = 0;
	    pauseButton.width = "49px";
	    pauseButton.height = "49px";
	    pauseButton.paddingRight = "3px";
		buttonsPanel.addControl(pauseButton);

	    pauseButton.onPointerClickObservable.add(this._onPause.bind(this));

		const playButton = Button.CreateImageWithCenterTextButton("playButton", "\uf04b", "");

		if (this._game.time.isPaused) {
			playButton.image.domImage = this._system.loader.getAssetByKey("greenButton_Off");
			playButton.color = "#85DD5D";
		} else {
			playButton.image.domImage = this._system.loader.getAssetByKey("greenButton_On");
			playButton.color = "#FFFFFF";
		}

	    playButton.fontFamily = "'Font Awesome 5 Free'";
	    playButton.fontWeight = 900;
	    playButton.fontSize = 24;
	    playButton.thickness = 0;
	    playButton.width = "49px";
	    playButton.height = "49px";
	    playButton.paddingLeft = "3px";
	    buttonsPanel.addControl(playButton);

	    playButton.onPointerClickObservable.add(this._onPlay.bind(this));

		parent.addControl(timeCtrl);

		return {
			counter: timeValue,
			pauseButton: pauseButton,
			playButton: playButton
		};
	}

	_generateScoreboard(parent) {
		const scoreboard = new Rectangle("scoreboard");
		scoreboard.isPointerBlocker = true;
		scoreboard.width = SCOREBOARD_SIZE.width + "px";
		scoreboard.height = SCOREBOARD_SIZE.height + "px";
		scoreboard.thickness = 0;
		scoreboard.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
		scoreboard.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

		const background = new Image("scoreboardBkg", "");
		background.domImage = this._system.loader.getAssetByKey("greyPanel");
		background.stretch = Image.STRETCH_NINE_PATCH;
		background.sliceLeft = 5;
		background.sliceTop = 5;
		background.sliceRight = 95;
		background.sliceBottom = 95;
		scoreboard.addControl(background);

		const panel = new StackPanel("scoreboardPanel");
		scoreboard.addControl(panel);		

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
			cash: cashValue
		};
	}

	_onPause() {
		if (!this._game.time.isPaused) {
			this._game.time.isPaused = true;

			this._timeCtrl.playButton.image.domImage = this._system.loader.getAssetByKey("greenButton_Off");
			this._timeCtrl.playButton.color = "#85DD5D";

			this._timeCtrl.pauseButton.image.domImage = this._system.loader.getAssetByKey("blueButton_On");
			this._timeCtrl.pauseButton.color = "#FFFFFF";

			this._clickSFX.play();
		}
	}

	_onPlay() {
		if (this._game.time.isPaused) {
			this._game.time.isPaused = false;

			this._timeCtrl.playButton.image.domImage = this._system.loader.getAssetByKey("greenButton_On");
			this._timeCtrl.playButton.color = "#FFFFFF";

			this._timeCtrl.pauseButton.image.domImage = this._system.loader.getAssetByKey("blueButton_Off");
			this._timeCtrl.pauseButton.color = "#1EA7E1";

			this._clickSFX.play();
		}
	}

	_updateDayValue() {
		this._timeCtrl.counter.text = `${this._game.time.current}`;
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