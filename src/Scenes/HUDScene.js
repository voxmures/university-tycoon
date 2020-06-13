// HUD Scene

import GameScene from "../Core/GameScene";

import GameplayEvent from "../Events/GameplayEvent";
import GUIEvent from "../Events/GUIEvent";

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
import { Engine } from "@babylonjs/core/Engines/engine";

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
		this._systemMenu = {};

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
		this._systemMenu = this._generateSystemMenu(this._rootUI);

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

	_generateSystemMenu(parent) {

		const systemMenuButton = Button.CreateImageWithCenterTextButton("systemMenuButton", "\uf0c9", "");
		systemMenuButton.image.domImage = this._system.loader.getAssetByKey("greyButton");
	    systemMenuButton.fontFamily = "'Font Awesome 5 Free'";
	    systemMenuButton.fontWeight = 900;
	    systemMenuButton.fontSize = 24;
	    systemMenuButton.thickness = 0;
	    systemMenuButton.width = "49px";
	    systemMenuButton.height = "49px";
	    systemMenuButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	    systemMenuButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
	    systemMenuButton.top = "10px";
	    systemMenuButton.left = "10px";
		parent.addControl(systemMenuButton);

	    systemMenuButton.onPointerClickObservable.add(this._onOpenSystemMenu.bind(this));

		const systemMenuContainer = new Rectangle("systemMenuContainer");
		systemMenuContainer.width = 1;
		systemMenuContainer.height = 1;
		systemMenuContainer.background = "#000000";
		systemMenuContainer.alpha = .8;
		systemMenuContainer.zIndex = Infinity;	// Show at the top of everything
		systemMenuContainer.isPointerBlocker = true;
		systemMenuContainer.isVisible = false;
		systemMenuContainer.thickness = 0;
		parent.addControl(systemMenuContainer);

		const optionsContainer = new StackPanel("systemMenuOptionsContainer");
		systemMenuContainer.addControl(optionsContainer);

		const buttonsCfg = [
			{ name: "systemMenuContinueButton", text: "\uf11b    Continue", onClick: (btn) => this._onCloseSystemMenu(btn) },
			{ name: "systemMenuToggleSoundButton", text: "\uf028    Sound ON", onClick: (btn) => this._onToggleSound(btn) },
			{ name: "systemMenuQuitButton", text: "\uf2f5    Quit", onClick: (btn) => this._onQuitGame(btn) },
		];

		for (let config of buttonsCfg) {

			const button = new Button.CreateImageWithCenterTextButton(config.name, config.text, "");
			button.fontFamily = "'Font Awesome 5 Free'";
		    button.fontWeight = 900;
		    button.fontSize = 24;

			button.image.domImage = this._system.loader.getAssetByKey("greyButton");
			button.image.stretch = Image.STRETCH_NINE_PATCH;
			button.image.sliceLeft = 10;
			button.image.sliceTop = 10;
			button.image.sliceRight = 40;
			button.image.sliceBottom = 40;

			button.width = "200px";
			button.height = "49px";
			button.paddingTop = "5px";
			button.paddingBottom = "5px";
			button.thickness = 0;

			optionsContainer.addControl(button);

		    button.onPointerClickObservable.add(config.onClick.bind(this, button));
		}

		return {
			menu: systemMenuContainer
		};
	}

	_onOpenSystemMenu() {
		this._systemMenu.menu.isVisible = true;

		this._system.bus.dispatch(new GameplayEvent(GameplayEvent.TOGGLE_GAME_STATE));
		this._system.bus.dispatch(new GUIEvent(GUIEvent.TOGGLE_MOUSE));
	}

	_onCloseSystemMenu() {
		this._systemMenu.menu.isVisible = false;

		this._system.bus.dispatch(new GameplayEvent(GameplayEvent.TOGGLE_GAME_STATE));
		this._system.bus.dispatch(new GUIEvent(GUIEvent.TOGGLE_MOUSE));
	}

	_onToggleSound(btn) {
		Engine.audioEngine.setGlobalVolume(1 - Engine.audioEngine.getGlobalVolume());

		if (Engine.audioEngine.getGlobalVolume() > 0) {
			btn.textBlock.text = "\uf028    Sound ON";
		} else {
			btn.textBlock.text = "\uf026    Sound OFF";
		}
	}

	_onQuitGame() {
		this._system.reset();
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

	_updateTimeValue() {
		this._timeCtrl.counter.text = `${this._game.time.current}`;
	}

	_updateCashValue() {
		this._scoreboard.cash.text = `${this._game.university.cash} €`;

		if (this._game.university.cash < 0) {
			this._scoreboard.cash.color = "#FF0000";
		} else {
			this._scoreboard.cash.color = "#000000";
		}
	}

	update() {
		this._updateTimeValue();
		this._updateCashValue();
	}
}

export default HUDScene;