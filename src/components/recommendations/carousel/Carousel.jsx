/* external imports */
import { h, Fragment } from 'preact';
import { observer } from 'mobx-react';
import { useEffect } from 'preact/hooks';

/* searchspring imports */
import { ControllerProvider, ThemeProvider, Recommendation } from '@searchspring/snap-preact-components';

/* local imports */
import { Result } from '../../Results';
import { theme } from '../../../theme';
import './Carousel.scss';
import '../../../styles/Results.scss';

export const Carousel = observer((props) => {
	const controller = props.controller;
	const store = controller?.store;
	const { results, profile } = store;
	const parameters = profile?.display?.templateParameters;
	const perView = parameters?.perView || 4;

	useEffect(() => {
		// load recommendations on no-results search page
		if (!controller.store.loaded && !controller.store.loading) {
			controller.search();
		}
	}, []);

	const breakpoints = {
		0: {
			slidesPerView: 1,
			slidesPerGroup: 1,
			spaceBetween: 0,
		},
		425: {
			slidesPerView: 2,
			slidesPerGroup: 2,
			spaceBetween: 10,
		},
		750: {
			slidesPerView: 3,
			slidesPerGroup: 3,
			spaceBetween: 10,
		},
		990: {
			slidesPerView: 4,
			slidesPerGroup: 4,
			spaceBetween: 10,
		},
		1200: {
			slidesPerView: perView,
			slidesPerGroup: perView,
			spaceBetween: 10,
		},
	};

	const recommendationProps = {
		controller: controller,
		className: 'ss__results',
		theme: {
			components: {
				carousel: {
					breakpoints: breakpoints,
				},
			},
		},
	};

	return (
		store.results.length > 0 && (
			<ThemeProvider theme={theme}>
				<ControllerProvider controller={controller}>
					<div className={`ss__recommendation--carousel ss__recommendation--${profile.tag}`}>
						{parameters?.title && <h2 className="title inline-richtext h2">{parameters.title}</h2>}
						<Recommendation controller={controller} {...recommendationProps}>
							{results.map((result) => (
								<div className="ss__result" key={result.id}>
									<Result result={result} />
								</div>
							))}
						</Recommendation>
					</div>
				</ControllerProvider>
			</ThemeProvider>
		)
	);
});
