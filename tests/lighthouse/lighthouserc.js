// configuration for lighthouse testing

module.exports = {
	ci: {
		collect: {
			numberOfRuns: 5,
			staticDistDir: './public', // for localhost
			url: ['http://localhost/lighthouse.html'],
		},
		upload: {
			target: 'filesystem',
			outputDir: './tests/lighthouse/runs'
		},
	},
};