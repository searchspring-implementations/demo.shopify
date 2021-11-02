module.exports = {
	ci: {
		collect: {
			numberOfRuns: 25,
			// staticDistDir: './public', // for localhost
			url: ['https://searchspring-shop.myshopify.com/collections/shop?_bt=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaVJ6WldGeVkyaHpjSEpwYm1jdGMyaHZjQzV0ZVhOb2IzQnBabmt1WTI5dEJqb0dSVlE9IiwiZXhwIjoiMjAyMS0xMS0wMlQxNTozNTo1Ni45MzdaIiwicHVyIjoicGVybWFuZW50X3Bhc3N3b3JkX2J5cGFzcyJ9fQ%3D%3D--1d27e94de9ec11095188945967228e42c0c7a624'],
		},
		upload: {
			target: 'filesystem',
			outputDir: 'lighthouse'
		},
	},
};