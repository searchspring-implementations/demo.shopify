const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
	mode: 'production',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		chunkFilename: 'snap.chunk.[fullhash:8].[id].js',
	},
	target: 'browserslist:modern',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', {
								browserslistEnv: 'modern',
							}]
						],
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
