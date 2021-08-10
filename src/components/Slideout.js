import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react';
import classnames from 'classnames';

import { withController, Facets, Icon, useMediaQuery, Button, Slideout as LibrarySlideout } from '@searchspring/snap-preact-components';

const buttonStyle = {
	color: '#403b37',
	borderColor: '#e3e2e1',
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
};

@withController
@observer
export class Slideout extends Component {
	render() {
		const controller = this.props.controller;
		const { pagination, facets, custom } = controller.store;

		return (
			facets.length > 0 &&
			pagination.totalResults > 0 && (
				<LibrarySlideout style={{ padding: 0 }} displayAt={custom.respondAt} buttonContent={<OpenButton />}>
					<SlideoutContents />
				</LibrarySlideout>
			)
		);
	}
}

const SlideoutContents = withController((props) => {
	return (
		<>
			<CloseButton toggleActive={props.toggleActive} />
			<Facets facets={props.controller.store.facets} />
		</>
	);
});

const OpenButton = () => {
	return (
		<Button style={buttonStyle}>
			<Icon color="#403b37" icon="filter" />
			Filter Options
			<span></span>
		</Button>
	);
};

const CloseButton = (props) => {
	return (
		<Button
			onClick={props.toggleActive}
			style={{
				...buttonStyle,
				color: '#fff',
				backgroundColor: '#403b36',
				border: 0,
				fontSize: '20px',
				textTransform: 'uppercase',
			}}
		>
			Filter Options
			<Icon color="#fff" icon="close-thin" />
		</Button>
	);
};
