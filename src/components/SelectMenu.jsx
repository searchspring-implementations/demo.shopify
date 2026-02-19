/* external imports */
import { h } from 'preact';

export const SelectMenu = (props) => {
	const { options, type, label } = props;

	const changeOption = (e) => {
		const selectedOption = options.find((opt) => opt.value.toString() === e.target.value);
		selectedOption && selectedOption.url.go();
	};

	return (
		<div className="facet-filters sorting caption">
			<div className="facet-filters__field">
				<h2 className="facet-filters__label caption-large text-body">
					<label for={type}>{label}:</label>
				</h2>
				<div className="select">
					<select onChange={(e) => changeOption(e)} name={type} className="facet-filters__sort select__select caption-large" id={type}>
						{options.map((opt) => (
							<option value={opt.value} selected={opt.value === opt.active} key={opt.value}>
								{opt.label}
							</option>
						))}
					</select>
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
				</div>
			</div>
		</div>
	);
};
