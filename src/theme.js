export const theme = {
	breakpoints: {
		bp01: 541,
		bp02: 750,
		bp03: 990,
		bp04: 1200,
	},
	colors: {
		primary: '#121212',
		secondary: '#121212',
		hover: '#f8f8f8',
		text: {
			secondary: '#ffffff',
		},
	},
	currency: {
		usd: {
			symbol: '$',
			thousandsSeparator: ',',
			decimalPlaces: 2,
		},
		gbp: {
			symbol: '£',
			thousandsSeparator: ',',
			decimalPlaces: 2,
		},
		eu: {
			symbol: '€',
			thousandsSeparator: '.',
			decimalSeparator: ',',
			decimalPlaces: 2,
			symbolAfter: true,
		},
	},
	components: {
		button: {
			style: {
				color: '#121212',
				borderColor: '#121212BF',
			},
		},
		checkbox: {
			size: '14px',
		},
		facets: {
			style: {
				a: {
					color: '#121212',
				},
			},
		},
		facet: {
			color: '#121212bf',
			limit: 12,
		},
		facetPaletteOptions: {
			columns: 6,
		},
		filterSummary: {
			hideFacetLabel: true,
			title: '',
		},
		facetSlider: {
			railColor: '#121212',
			trackColor: '#ccc',
			stickyHandleLabel: true,
		},
	},
};
