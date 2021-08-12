import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react';

@observer
export class SearchHeader extends Component {
	render() {
		const { controller } = this.props;
		const {
			store,
			store: { pagination, search },
		} = controller;
		const originalQuery = search.originalQuery;

		return (
			store.loaded && (
				<>
					{pagination.totalResults ? (
						<>
							{'Search'}
							{search?.query && (
								<span>
									{` for `}
									<span class="ss__search-header__query">"{search.query.string}"</span>
								</span>
							)}
						</>
					) : (
						<>
							{pagination.totalResults === 0 &&
								(search?.query ? (
									<span>
										No results for <span class="ss__search-header__query">"{search.query.string}"</span> found.
									</span>
								) : (
									<span>No results found.</span>
								))}
						</>
					)}

					{originalQuery && (
						<span class="ss__oq">
							Search instead for "<a href={originalQuery.url.href}>{originalQuery.string}</a>"
						</span>
					)}
				</>
			)
		);
	}
}
