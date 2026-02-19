/* external imports */
import { h, Fragment } from 'preact';
import { observer } from 'mobx-react';

/* searchspring imports */
import { withController } from '@searchspring/snap-preact-components';

export const Pagination = withController(
	observer(({ controller }) => {
		const { pagination } = controller.store;
		const pages = pagination.getPages(5);

		return (
			pagination.totalPages > 1 && (
				<div className="pagination-wrapper">
					<nav className="pagination" role="navigation" aria-label="Pagination">
						<ul className="pagination__list list-unstyled" role="list">
							{pagination.previous ? (
								<li>
									<a
										{...pagination.previous.url.link}
										className="ss__pagination--prev pagination__item pagination__item--next pagination__item-arrow link motion-reduce"
										aria-label="Previous page"
									>
										<span className="svg-wrapper">
											<svg className="icon icon-caret" viewBox="0 0 10 6">
												<path
													fill="currentColor"
													fill-rule="evenodd"
													d="M9.354.646a.5.5 0 0 0-.708 0L5 4.293 1.354.646a.5.5 0 0 0-.708.708l4 4a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708"
													clip-rule="evenodd"
												/>
											</svg>
										</span>
									</a>
								</li>
							) : null}

							{pages.map((page) => (
								<li>
									{page.active ? (
										<a
											role="link"
											aria-disabled="true"
											className="pagination__item pagination__item--current light"
											aria-current="page"
											aria-label={`Page ${page.number}`}
										>
											{page.number}
										</a>
									) : (
										<a {...page.url.link} className="pagination__item link" aria-label={`Page ${page.number}`}>
											{page.number}
										</a>
									)}
								</li>
							))}

							{pagination.next ? (
								<li>
									<a
										{...pagination.next.url.link}
										className="ss__pagination--next pagination__item pagination__item--prev pagination__item-arrow link motion-reduce"
										aria-label="Next page"
									>
										<span className="svg-wrapper">
											<svg className="icon icon-caret" viewBox="0 0 10 6">
												<path
													fill="currentColor"
													fill-rule="evenodd"
													d="M9.354.646a.5.5 0 0 0-.708 0L5 4.293 1.354.646a.5.5 0 0 0-.708.708l4 4a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708"
													clip-rule="evenodd"
												/>
											</svg>
										</span>
									</a>
								</li>
							) : null}
						</ul>
					</nav>
				</div>
			)
		);
	})
);
