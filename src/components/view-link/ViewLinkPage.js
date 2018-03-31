import React from "react";
import { connect } from "react-redux";

import EnterPassword from "../common/enter-password/EnterPassword"

import * as linksActions from "../../actions/links.actions";

class ViewLinkPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			accessUrl: null,
			link: null
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const linkUrl = nextProps.match.params.linkUrl;
		if (linkUrl && linkUrl !== nextProps.links.linkUrl) {
			prevState.accessUrl = linkUrl;
			// nextProps.getLink(linkUrl);
		}

		return null;
	}

	render() {
		return (
			<div>
				{!this.props.link && <EnterPassword />}
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		links: state.links
	};
}

export default connect(mapStateToProps, { ...linksActions })(ViewLinkPage);