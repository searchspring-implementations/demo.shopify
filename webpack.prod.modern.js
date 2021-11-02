const path = require('path');
const childProcess = require('child_process');

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const packageJSON = require('./package.json');
const branchName = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const modern = merge(common, {
	mode: 'production',
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'modern.bundle.js',
		chunkFilename: 'snap.modern.chunk.[fullhash:8].[id].js',
		publicPath: `https://snapui.searchspring.io/${packageJSON.searchspring.siteId}/${branchName}/`,
	},
	target: 'web',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
	devServer: {
		client: false,
		https: true,
		port: 3333,
		hot: false,
		allowedHosts: 'all',
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		devMiddleware: {
			publicPath: '/dist/',
		},
	},
});

module.exports = modern;
