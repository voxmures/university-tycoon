const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "main.js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "University Tycoon Development Server",
			template: "./src/index.html"
		}),
		new CopyPlugin([
			{ from: "./src/Assets", to: path.resolve(__dirname, "dist/content")}
		])
	],
	devtool: "inline-source-map"
};