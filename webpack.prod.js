const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const es5 = merge(common, {
	mode: 'production',
	entry: './src/bundle.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		chunkFilename: 'snap.chunk.[fullhash:8].[id].js',
	},
	target: 'browserslist',
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
		static: {
			directory: path.join(__dirname, 'public'),
			publicPath: ['/'],
			watch: false,
		},
		devMiddleware: {
			publicPath: '/dist/',
		},
	},
});

module.exports = es5;
