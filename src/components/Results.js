import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react';
import { FilterSummary, Price, InlineBanner, withController } from '@searchspring/snap-preact-components';
import classnames from 'classnames';

@withController
@observer
export class Results extends Component {
	componentDidMount() {
		// custom JS integration code
	}
	componentDidUpdate() {
		// custom JS integration code
	}

	render() {
		const controller = this.props.controller;
		const { results } = controller.store;

		return (
			<div class="grid-uniform grid-link__container">
				{results.map((result) => (
					<div key={result.id} class="grid__item wide--one-quarter large--one-third medium-down--one-half">
						{{
							banner: <InlineBanner banner={result} />,
						}[result.type] || <Result result={result} />}
					</div>
				))}
			</div>
		);
	}
}

@withController
@observer
class Result extends Component {
	render() {
		const { result } = this.props;
		const {
			custom,
			attributes,
			mappings: { core },
		} = result;
		const intellisuggest = (e) => controller.track.product.click(e, result);
		const onSale = Boolean(attributes.ss_on_sale);

		return (
			result && (
				<div>
					<div class={classnames({ 'on-sale': onSale })}>
						<a href="/products/chain-bracelet" class="grid-link" onClick={intellisuggest}>
							<span class="grid-link__image grid-link__image-loading grid-link__image-sold-out grid-link__image--product" data-image-wrapper>
								{onSale && (
									<span class="badge badge--sale">
										<span class="badge__text">Sale</span>
									</span>
								)}

								<span class="grid-link__image-centered">
									<div id={`ProductImageWrapper-${result.id}`} class="product__img-wrapper supports-js">
										<div style="padding-top: 66.81081081081082%">
											<img
												id={`ProductImage-${result.id}`}
												alt={core.name}
												class="product__img lazyload"
												data-src={custom.srcSet}
												data-widths="[150, 220, 360, 470, 600, 750, 940, 1080, 1296, 1512, 1728, 2048]"
												data-aspectratio="1.4967637540453074"
												data-sizes="auto"
												data-image
											/>
										</div>
									</div>

									<noscript>
										<img src={core.imageUrl} alt={core.name} class="product__img" />
									</noscript>
								</span>
							</span>
							<ResultDetails result={result} />
						</a>
					</div>
				</div>
			)
		);
	}
}

export const ResultDetails = ({ result }) => {
	const {
		custom,
		attributes,
		mappings: { core },
	} = result;
	const onSale = Boolean(attributes.ss_on_sale);

	return (
		<>
			<p class="grid-link__title">{core.name}</p>

			<p class="grid-link__meta">
				{onSale && core.msrp > 0 && (
					<s class="grid-link__sale_price">
						<Price raw value={core.msrp} />
					</s>
				)}{' '}
				<Price value={core.price} />
			</p>
		</>
	);
};

@withController
@observer
export class NoResults extends Component {
	render() {
		const controller = this.props.controller;
		const store = controller.store;
		const dym = store.search.didYouMean;
		const contactEmail = 'contact@thesite.com';

		return (
			<div class="ss__no-results">
				<FilterSummary
					style={{ marginBottom: '20px' }}
					filters={store.filters}
					onClearAllClick={() => {
						controller.urlManager.remove('filter').go();
					}}
				/>

				<div class="ss__no-results__container">
					{dym && (
						<p class="ss__did-you-mean">
							Did you mean <a href={dym.url.href}>{dym.string}</a>?
						</p>
					)}
				</div>

				<div class="ss__no-results__container">
					<h4 style="margin-bottom: 5px;">Suggestions</h4>

					<ul class="ss__no-results__suggestions">
						<li>Check for misspellings.</li>
						<li>Remove possible redundant keywords (ie. "products").</li>
						<li>Use other words to describe what you are searching for.</li>
					</ul>

					<p>
						Still can't find what you're looking for?{' '}
						<a href="https://searchspring.com/contact/" style="font-size: 14px;">
							Contact us
						</a>
						.
					</p>

					<hr />

					<div class="ss__no-results__container">
						<div class="ss__no-results__contact">
							<div class="ss__no-results__contact__phone">
								<h4 style="margin-bottom: 5px;">Call Us</h4>
								<p>555-555-5555</p>
							</div>

							<div class="ss__no-results__contact__email">
								<h4 style="margin-bottom: 5px;">Email Us</h4>
								<p>
									<a href={`mailto:${contactEmail}`} style="font-size: 14px;">
										{contactEmail}
									</a>
								</p>
							</div>

							<div class="ss__no-results__contact__location">
								<h4 style="margin-bottom: 5px;">Physical Address</h4>
								<p>
									123 Street Address
									<br />
									City, State, Zipcode
								</p>
							</div>

							<div class="ss__no-results__contact__hours">
								<h4 style="margin-bottom: 5px;">Hours</h4>
								<p>Monday - Friday: 8am - 9pm MDT</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
