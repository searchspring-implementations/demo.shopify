/* external imports */
import { h, Fragment } from 'preact';
import { observer } from 'mobx-react';

export const SearchHeader = observer(({ controller }) => {
	const { pagination, search, loaded } = controller.store;
	const { originalQuery } = search;

	return (
		loaded && (
			<>
				{pagination.totalResults > 0 ? (
					<h1 className="ss__search-header collection-hero__title">
						<span>
							{'Search results'}
							{search?.query && (
								<>
									{` for `}
									<span className="ss__query">"{search.query.string}"</span>
								</>
							)}
						</span>
					</h1>
				) : (
					<h1 className="ss__search-header collection-hero__title">
						{search?.query ? (
							<span>
								No results for <span className="ss__query">"{search.query.string}"</span> found
							</span>
						) : (
							<span>No results found</span>
						)}
					</h1>
				)}

				{originalQuery && (
					<span className="ss__oq collection-hero__description rte">
						Search instead for "<a href={originalQuery.url.href}>{originalQuery.string}</a>"
					</span>
				)}
			</>
		)
	);
});
