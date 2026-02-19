/* external imports */
import { h, Fragment } from 'preact';
import { observer } from 'mobx-react';

/* searchspring imports */
import { withController, Icon, Button, Slideout as LibrarySlideout } from '@searchspring/snap-preact-components';

/* local imports */
import { CustomFacets } from './Facets';
import { theme } from '../theme';
import '../styles/Slideout.scss';

const buttonStyle = {
	color: '#121212',
	borderColor: '#1212121a',
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
};

export const Slideout = withController(
	observer(({ controller }) => {
		const { pagination, facets } = controller.store;

		const slideoutProps = {
			noButtonWrapper: true,
			buttonContent: <OpenSlideoutButton />,
			displayAt: `(max-width: ${theme.breakpoints.bp02}px)`,
			width: '320px',
			style: {
				padding: '0',
			},
		};

		return (
			facets.length > 0 &&
			pagination.totalResults > 0 && (
				<LibrarySlideout {...slideoutProps}>
					<SlideoutContent />
				</LibrarySlideout>
			)
		);
	})
);

const OpenSlideoutButton = (props) => {
	const { toggleActive } = props;

	return (
		<Button
			onClick={toggleActive}
			style={{
				...buttonStyle,
				margin: '20px 0',
			}}
		>
			<Icon icon="filter" />
			Filters
			<span />
		</Button>
	);
};

const SlideoutContent = withController((props) => {
	const { toggleActive } = props;

	return (
		<div className="ss__slideout__content">
			<SlideoutHeader toggleActive={toggleActive} />
			<CustomFacets />
			<SlideoutFooter toggleActive={toggleActive} />
		</div>
	);
});

export const SlideoutHeader = (props) => {
	const { toggleActive } = props;

	return (
		<div className="ss__slideout__header">
			<Button
				onClick={toggleActive}
				style={{
					...buttonStyle,
					color: '#fff',
					backgroundColor: '#121212',
					border: 0,
					fontSize: '24px',
					padding: '10px 20px',
					textTransform: 'uppercase',
				}}
			>
				Filters
				<Icon color="#fff" icon="close-thin" />
			</Button>
		</div>
	);
};

export const SlideoutFooter = withController(
	observer((props) => {
		const { controller, toggleActive } = props;
		const store = controller.store;
		const { filters } = store;
		const clearAll = controller.urlManager.remove('filter').remove('sort').remove('pageSize').remove('page').remove('rq');

		const footerButtonStyles = {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: '#fff',
			backgroundColor: '#121212',
			border: 0,
			fontSize: '14px',
			textTransform: 'uppercase',
			margin: '0 10px',
			padding: '10px 20px',
			width: '100%',
		};

		return (
			<div className="ss__slideout__footer">
				<Button onClick={toggleActive} disableStyles={true} style={footerButtonStyles}>
					Close
				</Button>

				{filters?.length > 0 ? (
					<Button onClick={(e) => clearAll.link.onClick(e)} disableStyles={true} style={footerButtonStyles}>
						Clear all
					</Button>
				) : null}
			</div>
		);
	})
);
