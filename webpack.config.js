const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: "development",
	entry: "./src/index",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "main.js"
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					// {
					// 	loader: "style-loader",
					// 	options: {
					// 		injectType: "linkTag"
					// 	}
					// },
					// {
					// 	loader: "file-loader",
					// 	options: {
					// 		name: "[name].[ext]",
					// 		outputPath: "./content/css/",
					// 	}
					// }
					{
						loader: MiniCssExtractPlugin.loader
					},
					"css-loader",
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[ext]",
						outputPath: "./content/fonts/"
					}
				}
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "University Tycoon Development Server",
			template: "./src/index.html"
		}),
		new MiniCssExtractPlugin(),
		new WriteFilePlugin(),
		new CopyPlugin([
			{ from: "./content", to: path.resolve(__dirname, "dist/content")}
		]),
	],
	devtool: "inline-source-map"
};