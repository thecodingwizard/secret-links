import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as linksActions from "../../actions/links.actions";

class ViewLinkPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const linkUrl = nextProps.match.params.linkUrl;
		if (linkUrl && linkUrl !== nextProps.links.linkUrl) {
			nextProps.getLink(linkUrl);
		}

		return null;
	}

	render() {
		return (
			<div>
				View Link Page
				<br />
				{this.props.links.linkUrl}
				<Link to="/links/testing">Testing</Link>
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