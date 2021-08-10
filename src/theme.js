export const theme = {
	components: {
		button: {
			style: {
				color: '#403b37',
				borderColor: '#e3e2e1',
			},
		},
		filterSummary: {
			hideFacetLabel: true,
			title: '',
		},
		facets: {
			style: {
				a: {
					color: '#403b37',
				},
			},
			theme: {
				components: {
					dropdown: {
						theme: {
							components: {
								facet: {
									theme: {
										components: {
											facetListOptions: {
												theme: {
													components: {
														checkbox: {
															theme: {
																components: {
																	icon: {
																		native: true,
																	},
																},
															},
														},
													},
												},
											},
										},
									},
								},
							},
						},
					},
				},
			},
		},
	},
};
