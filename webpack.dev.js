const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const es5 = merge(common, {
	mode: 'development',
	entry: './src/universal.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		chunkFilename: 'snap.chunk.[fullhash:8].[id].js',
		publicPath: '/dist/',
	},
	target: 'browserslist',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},
	devServer: {
		https: true,
		port: 3333,
		hot: true,
		allowedHosts: 'all',
		client: {
			overlay: {
				errors: true,
				warnings: false,
			},
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		static: {
			directory: path.join(__dirname, 'public'),
			publicPath: ['/'],
			watch: true,
		},
		devMiddleware: {
			publicPath: '/dist/',
		},
	},
});

const modern = merge(common, {
	mode: 'development',
	entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'modern.bundle.js',
		chunkFilename: 'snap.modern.chunk.[fullhash:8].[id].js',
		publicPath: '/dist/',
	},
	target: 'web',
	devtool: 'source-map',
});

module.exports = [es5, modern];
