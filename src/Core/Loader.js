// Loader.js
// Global Assets Loader

import { Scene } from "@babylonjs/core/scene";

import { AssetsManager } from "@babylonjs/core/Misc";
import { TextureAssetTask } from "@babylonjs/core/Misc";
import { ImageAssetTask } from "@babylonjs/core/Misc";
import { BinaryFileAssetTask } from "@babylonjs/core/Misc";
import { TextFileAssetTask } from "@babylonjs/core/Misc";

import LoaderEvent from "./LoaderEvent";

class Loader {
	constructor(system) {
		this._system = system;

		this._assetsManager = new AssetsManager(new Scene(this._system.engine));
		this._assetsManager.onProgress = this._onProgress.bind(this);
		this._assetsManager.onFinish = this._onFinish.bind(this);

		this._assets = {};

		// Listeners
		this._system.bus.listenTo(LoaderEvent.LOAD, this.load, this);
	}

	_onTaskSuccess(task) {
		switch (task.constructor) {
			case TextureAssetTask:
				this._assets[task.name] = task.texture;
				break;
			case ImageAssetTask:
				this._assets[task.name] = task.image;
				break;
			case BinaryFileAssetTask:
				this._assets[task.name] = task.data;
				break;
			case TextFileAssetTask:
				this._assets[task.name] =  task.text;
				break;
			default:
				console.error("Loader:", `Error loading asset ${task.name}. Unrecognized AssetManager task type.`);
				break;
		}
	}

	_onProgress(remaining, total) {
		console.log("Loader:", `Loaded ${remaining} of ${total} assets.`);
	}

	_onFinish() {
		this._system.bus.dispatch(new LoaderEvent(LoaderEvent.READY))
	}

	add(key, path, options = {}) {
		if (this._assets.hasOwnProperty(key)) {
			console.error("Loader:", `${key} is already used by another asset.`);
			return;
		}

		this._assets[key] = null;

		let assetTask;

		if (options.task) {
			switch (options.task) {
				case ImageAssetTask:
					assetTask = this._assetsManager.addImageTask(key, path);
					break;
				case TextureAssetTask:
					assetTask = this._assetsManager.addTextureTask(key, path);
					break;
				default:
					console.error("Loader:", `Error loading asset ${key}. Unrecognized task type.`);
			}
		} else {
			const fileExt = path.split('.').pop().toLowerCase();
			switch (fileExt) {
				case "png":
					assetTask = this._assetsManager.addTextureTask(key, path);
					break;
				case "ogg":
					assetTask = this._assetsManager.addBinaryFileTask(key, path);
					break;
				case "json":
					assetTask = this._assetsManager.addTextFileTask(key, path);
					break;
				default:
					console.error("Loader:", `Error loading asset ${key}. Unrecognized file extension.`);
					break;
			}
		}

		if (assetTask) {
			assetTask.onSuccess = this._onTaskSuccess.bind(this);
			assetTask.onError = (task, message, exception) => {
				console.error(message, exception);
			};
		}
	}

	load() {
		this._assetsManager.load();
	}

	getAssetByKey(key) {
		if (!this._assets[key]) {
			console.error("Loader:", `${key} does no exist in the collection.`);
			return;
		}

		return this._assets[key];
	}
}

export default Loader;