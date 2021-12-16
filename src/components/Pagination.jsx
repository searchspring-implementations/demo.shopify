import { h, Component } from 'preact';
import { observer } from 'mobx-react';
import classnames from 'classnames';

import { withController } from '@searchspring/snap-preact-components';

@withController
@observer
export class Pagination extends Component {
	render() {
		const controller = this.props.controller;
		const {
			store: { pagination },
		} = controller;
		const pages = pagination.getPages(5);

		return (
			pagination.totalPages > 1 && (
				<div class="text-center">
					<ul class="pagination-custom ss__pagination">
						<li class="ss__pagination__prev">
							{pagination.previous ? (
								<a {...pagination.previous.url.link} title="« Previous">
									←
								</a>
							) : (
								<span>←</span>
							)}
						</li>

						{pages.map((page) => (
							<li class={classnames('ss__pagination__page', { active: page.active, ss__pagination__active: page.active })}>
								{page.active ? (
									<span>{page.number}</span>
								) : (
									<a {...page.url.link} title={`page ${page.number}`}>
										{page.number}
									</a>
								)}
							</li>
						))}

						<li class="ss__pagination__next">
							{pagination.next ? (
								<a {...pagination.next.url.link} title="Next »">
									→
								</a>
							) : (
								<span>→</span>
							)}
						</li>
					</ul>
				</div>
			)
		);
	}
}
