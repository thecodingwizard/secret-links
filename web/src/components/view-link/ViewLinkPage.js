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
		if (nextProps.match.params.linkUrl) {
			console.log(nextProps);
		}

		return null;
	}

	render() {
		return (
			<div>
				View Link Page
				<br />
				{this.props.match.params.linkUrl}
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